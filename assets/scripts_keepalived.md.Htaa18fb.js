import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"date":"2024-03-26 13:04:43"},"headers":[],"relativePath":"scripts/keepalived.md","filePath":"scripts/keepalived.md"}'),p={name:"scripts/keepalived.md"},e=l(`<div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">2.2.8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> /etc/redhat-release </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#E2931D;">    dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> net-snmp-devel</span><span style="color:#91B859;"> openssl-devel</span><span style="color:#91B859;"> libnl3-devel</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">else</span></span>
<span class="line"><span style="color:#E2931D;">    apt</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> libnl-3-dev</span><span style="color:#91B859;"> libnl-genl-3-dev</span><span style="color:#91B859;"> libssl-dev</span><span style="color:#91B859;"> libnm-dev</span><span style="color:#91B859;"> libkmod-dev</span><span style="color:#91B859;"> libsnmp35</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;"> https://keepalived.org/software/keepalived-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">taf</span><span style="color:#91B859;"> xf</span><span style="color:#91B859;"> keepalived-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.tar.gz</span><span style="color:#91B859;"> -C</span><span style="color:#91B859;"> /usr/local/src</span></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> /usr/local/src/keepalived-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 默认/usr/local/etc</span></span>
<span class="line"><span style="color:#E2931D;">./configure</span><span style="color:#91B859;"> --prefix=/usr/local/keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">make</span></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#91B859;"> install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">mkdir</span><span style="color:#91B859;"> /etc/keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/keepalived/keepalived.conf</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">! Configuration File for keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">global_defs {</span></span>
<span class="line"><span style="color:#91B859;">   router_id LVS_DEVEL</span></span>
<span class="line"><span style="color:#91B859;">   vrrp_skip_check_adv_addr</span></span>
<span class="line"><span style="color:#91B859;">   vrrp_strict</span></span>
<span class="line"><span style="color:#91B859;">   vrrp_garp_interval 0</span></span>
<span class="line"><span style="color:#91B859;">   vrrp_gna_interval 0</span></span>
<span class="line"><span style="color:#91B859;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">vrrp_instance VI_1 {</span></span>
<span class="line"><span style="color:#91B859;">    state MASTER</span></span>
<span class="line"><span style="color:#91B859;">    interface ens32</span></span>
<span class="line"><span style="color:#91B859;">    virtual_router_id 51</span></span>
<span class="line"><span style="color:#91B859;">    priority 100</span></span>
<span class="line"><span style="color:#91B859;">    advert_int 1</span></span>
<span class="line"><span style="color:#91B859;">    authentication {</span></span>
<span class="line"><span style="color:#91B859;">        auth_type PASS</span></span>
<span class="line"><span style="color:#91B859;">        auth_pass 1111</span></span>
<span class="line"><span style="color:#91B859;">    }</span></span>
<span class="line"><span style="color:#91B859;">    virtual_ipaddress {</span></span>
<span class="line"><span style="color:#91B859;">        192.168.200.18</span></span>
<span class="line"><span style="color:#91B859;">    }</span></span>
<span class="line"><span style="color:#91B859;">}</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#91B859;"> run</span><span style="color:#91B859;"> systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> keepalived</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#systemctl status keepalived</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div>`,1),r=[e];function c(o,t,i,b,y,B){return a(),n("div",null,r)}const d=s(p,[["render",c]]);export{m as __pageData,d as default};
