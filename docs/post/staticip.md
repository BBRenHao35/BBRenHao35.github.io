# Static IP

::: tip 建立時間：2024/11/03
Linux 設定固定 IP 方式
:::

## :pushpin: Static IP
``` bash
cd /etc/netplay/50-cloud-init.yaml
# 設定以下 
dhcp4 :false
addresses: [192.168.1.101/16]
gateway4: 192.168.1.1
nameservers:
  addresses: [8.8.8.8]
# 設定後測試
netplan try
ifconfig # 確認Ip更改ok
```