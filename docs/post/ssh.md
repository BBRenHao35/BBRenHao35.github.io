# SSH

::: tip 建立時間：2024/11/03
Linux Ubuntu 產生 SSH Key Copy To 另一台
:::

## :pushpin: Linux Ubuntu 產生 SSH Key Copy To 另一台
``` bash
ssh-keygen -t rsa -b 4096 => 產生金鑰，如果沒的話再用
ssh-copy-id example@192.168.1.101 => 給指定ip
ssh example@192.168.1.101 => 連線
sudo su -
cat ~example/.ssh/authorized_keys >> ~/.ssh/authorized_keys
```