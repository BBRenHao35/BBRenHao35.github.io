# PVE macOS安裝紀錄

::: tip 建立時間：2025/03/16
- PVE macOS 安裝紀錄
- PVE 版本 8、Python3.8 以上
:::

## :pushpin: 1.下載 ISO檔、上傳PVE
- https://github.com/thenickdude/KVM-Opencore/releases
- 下載 OpenCore-v21.iso.gz、解壓縮 OpenCore-v21.iso
- 上傳 OpenCore-v21.iso 到 PVE

## :pushpin: 2.下載 OpenCore
- https://github.com/acidanthera/OpenCorePkg
- PVE進入shell
``` shell
git https://github.com/acidanthera/OpenCorePkg.git # 下載OpenCore
cd OpenCorePkg/Utilities/macrecovery # 進入Folder
# 版本對應的命令 : `recovery_urls.txt`
# EX: `macOS Sonoma 14.5 (23F79)`
./macrecovery.py -b Mac-7BA5B2D9E42DDD94 -m 00000000000000000 -os latest download
```

- 下載後當前目錄出現並進入 com.apple.recovery.boot
``` shell
cd com.apple.recovery.boot
```

- BaseSystem.dmg 依選擇版本重新命名: BaseSystem-mac-14.5.dmg
``` shell
cp BaseSystem.dmg BaseSystem-mac-14.5.dmg
```

- dmg 格式轉為 img
``` shell
qemu-img convert -f dmg -O raw BaseSystem-mac-14.5.dmg BaseSystem-mac-14.5.img
```

- img 格式轉為 `qcow2`
``` shell
qemu-img convert -f dmg -O qcow2 BaseSystem-mac-14.5.dmg BaseSystem-mac-14.5.qcow2
```

## :pushpin: 3. PVE 設定 KVM 支援 macOS
- ignore_msrs=Y 讓 KVM 忽略 macOS 需要的 MSR 指令（避免 macOS 在虛擬機裡當機）。
- update-initramfs -k all -u 更新 initramfs（初始 RAM 磁碟），確保變更生效。
``` shell
echo "options kvm ignore_msrs=Y" >> /etc/modprobe.d/kvm.conf && update-initramfs -k all -u
```

- 執行上述如果出現以下 GRUB 錯誤，表示系統偵測到 UEFI 模式 但 GRUB 沒有正確安裝 EFI bootloader
``` shell
Removable bootloader found at '/boot/efi/EFI/BOOT/BOOTX64.efi', but GRUB packages not set up to update it!
Run the following command:

echo 'grub-efi-amd64 grub2/force_efi_extra_removable boolean true' | debconf-set-selections -v -u

Then reinstall GRUB with 'apt install --reinstall grub-efi-amd64'
```

- 手動強制設定 grub-efi-amd64，然後重新安裝 GRUB。
    - 告訴 Debian 不要阻止 GRUB 設置可移動啟動 (EFI/BOOT/BOOTX64.efi)。
    - 重新安裝 GRUB EFI 版本 來確保 UEFI 開機正常。
    - 更新 GRUB 設置 確保 /boot/grub/grub.cfg 是最新的。
``` shell
echo 'grub-efi-amd64 grub2/force_efi_extra_removable boolean true' | debconf-set-selections -v -u
apt install --reinstall grub-efi-amd64
update-grub
```

## :pushpin: 4. PVE 建立 macOS 虛擬機
- General
    - 填寫 VM ID、Name
    ![pve_general](/public/macos/pve_general.png)
- OS
    - ISO Image: OpenCore-v21.iso
    - Type: Other
    ![pve_os](/public/macos/pve_os.png)
- System
    - Graphic card: VMware compatible
    - Machine: q35
    - BIOS: OVMF (UEFI)
    - EFI Storage: 選擇儲存位置
    - Pre-Enroll keys: false
    - SCSI Controller: VirtIO SCSI single # 單磁碟VM兼容性較佳
    - Qemu Agent: true
    ![pve_system](/public/macos/pve_system.png)
- Disks
    - Bus/Device: VirtIO Block
    - Disk size (GiB): 200 (建議至少60G以上)
    - Cache: Write back (unsafe)
    ![pve_disks](/public/macos/pve_disks.png)
- CPU
    - Cores: 4 核心
    - Type: Penryn # Mac虛擬環境需要Intel CPU，Penryn兼容macOS CPU
        - 額外補充: host # 直接使用宿主機 (PVE) 的 CPU，較能較高、兼容性較低，適合Windows / Linux 虛擬機
    - Enable NUMA: true # 每個CPU都有自己一部分RAM，VM會依據NUMA架構，優先使用與CPU最近的RAM最近的RAM
    ![pve_cpu](/public/macos/pve_cpu.png)
- Memory
    - Memory: 8192  # 建議至少8G以上
    - Ballooning Device: false # VM 會始終使用固定記憶體，不會動態調整(如Nginx、Web Server)
    ![pve_memory](/public/macos/pve_memory.png)
- Network
    - Model: VirtIO (paravirtualized)
    - Firewall: false
    ![pve_network](/public/macos/pve_network.png)

- 回到 PVE Shell，將 qcow2 匯入至你指定的虛擬機(VM ID)
``` shell
qm importdisk 204 BaseSystem-mac-14.5.qcow2 local-lvm
```

- 匯入後確認 PVE UI Hardware: Hard Disk 要確認硬碟設定為 VirtIO、Wirte back
- 去更改 nano /etc/pve/qemu-server/204.conf
    - 其中 (DVD光碟屬性) `media=cdrom` 改為 `cache=unsafe`
    - 增加下面這一段到最後面 (該參數只有在 Intel CPU 才可以使用)
``` shell
args: -device isa-applesmc,osk="ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc" -smbios type=2 -device usb-kbd,bus=ehci.0,port=2 -global nec-usb-xhci.msi=off -global ICH9-LPC.acpi-pci-hotplug-with-bridge-support=off -cpu host,vendor=GenuineIntel,+invtsc,+hypervisor,kvm=on,vmware-cpuid-freq=on
```
- PVE調整啟動順序 (Options > Boot Order)
    - OpenCore > BaseSystem-mac-14.5.qcow2

## :pushpin: 5. 啟動 macOS VM
- 啟動後進入安裝介面，選擇第四個選項磁碟工具
- 下拉選擇顯示所有設備
- 選擇磁碟(200G) > Erashes(抹除)
    - 輸入磁碟名稱、格式: APFS、方案: GUID > 點擊抹除 > 關閉磁碟工具
- 選擇第二個安裝macOS > 選擇剛抹掉的磁碟安裝macOS
- 安裝成功，進行系統設定
    ![pve_desktop.png](/public/macos/pve_desktop.png)
- 如果出現桌面白屏狀況，則隨便下載張圖片，並將該圖片設定桌布
    ![pve_imgdesktop.png](/public/macos/pve_imgdesktop.png)


