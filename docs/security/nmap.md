# Nmap

::: tip 建立時間：2025/03/14
- 連接埠掃描、分析網路拓樸、查看連接埠服務
:::

## :pushpin: Nmap 常用指令
- Nmap 常用指令

``` powershell
nmap -F 10.1.1.4 # 掃描常用的ports
nmap -sS 10.1.1.4 # TCP SYN 掃描（隱形掃描）
nmap -sT 10.1.1.4 # TCP Connect 掃描（完整連線）

nmap -sA 10.1.1.4 # TCP ACK 掃描（測試防火牆規則）
nmap -Pn 10.1.1.4 # 測試防火牆是否有封鎖特定端口或服務

nmap -sV 10.1.1.4 # 開放端口運行的服務及版本

nmap -sU -p 53,67,161 10.1.1.4 # UDP掃描端口開放情況

nmap --script=auth 10.1.1.4 # 嘗試測試常見的身份驗證漏洞
nmap --script=firewalk 10.1.1.4 # 分析防火牆規則

nmap -O 10.1.1.4 # 偵測作業系統
nmap --script=vuln 10.1.1.4 # 用於掃描已知的安全漏洞
```


## :pushpin: Nmap 指令片段畫面
- 指令片段畫面

![pgadmin](/public/nmap/nmap.png)

## :pushpin: Nmap 說明
- 說明

| 常用測試類型 | 說明 | 測試參數 |
|----------|----------|----------|
| 網路與連接埠安全 | 開放端口掃描 | `nmap -F`、`nmap -sS`、`nmap -sT` | 
| 防火牆與存取控制 | 防火牆規則檢測 | `nmap -sA`、`nmap -Pn` | 
| 服務與協議偵測 | 服務版本掃描 | `nmap -sV` | 
| UDP 服務安全 | DNS/DHCP/SNMP 掃描 | `nmap -sU -p 53,67,161` | 
| 身份驗證與存取控制 | 身份驗證漏洞測試 | `nmap --script=auth` | 
| 防火牆策略測試 | 防火牆規則分析 | `nmap --script=firewalk` | 
| 作業系統與設備資訊 | OS 指紋識別 | `nmap -O` | 
| 已知漏洞掃描 | CVE 漏洞掃描 | `nmap --script=vuln` | 
