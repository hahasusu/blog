import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{"date":"2024-03-25 20:33:33","outline":[1,2,3]},"headers":[],"relativePath":"devops/loadbalance/keepalived/install.md","filePath":"devops/loadbalance/keepalived/install.md"}'),p={name:"devops/loadbalance/keepalived/install.md"},e=l(`<h2 id="源码编译安装" tabindex="-1">源码编译安装 <a class="header-anchor" href="#源码编译安装" aria-label="Permalink to &quot;源码编译安装&quot;">​</a></h2><p>源码包下载：<a href="https://keepalived.org/download.html" target="_blank" rel="noreferrer">https://keepalived.org/download.html</a></p><p>安装说明：<a href="https://github.com/acassen/keepalived/blob/master/INSTALL" target="_blank" rel="noreferrer">https://github.com/acassen/keepalived/blob/master/INSTALL</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># RHEL依赖</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> net-snmp-devel</span><span style="color:#91B859;"> openssl-devel</span><span style="color:#91B859;"> libnl3-devel</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># Debain</span></span>
<span class="line"><span style="color:#E2931D;">apt</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> libnl-3-dev</span><span style="color:#91B859;"> libnl-genl-3-dev</span><span style="color:#91B859;"> libssl-dev</span><span style="color:#91B859;"> libnm-dev</span><span style="color:#91B859;"> libkmod-dev</span><span style="color:#91B859;"> libsnmp35</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://keepalived.org/software/keepalived-2.2.8.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">taf</span><span style="color:#91B859;"> xf</span><span style="color:#91B859;"> keepalived-2.2.8.tar.gz</span></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> keepalived-2.2.8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 默认/usr/local/etc</span></span>
<span class="line"><span style="color:#E2931D;">./configure</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#91B859;"> install</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="service文件" tabindex="-1">service文件 <a class="header-anchor" href="#service文件" aria-label="Permalink to &quot;service文件&quot;">​</a></h2><p><strong>默认会生成</strong> <code>/lib/systemd/system/keepalived.service</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Unit</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Description</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">LVS</span><span style="color:#E2931D;"> and</span><span style="color:#91B859;"> VRRP</span><span style="color:#91B859;"> High</span><span style="color:#91B859;"> Availability</span><span style="color:#91B859;"> Monitor</span></span>
<span class="line"><span style="color:#90A4AE;">After</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">network-online.target</span><span style="color:#E2931D;"> syslog.target</span></span>
<span class="line"><span style="color:#90A4AE;">Wants</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Service</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Type</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">forking</span></span>
<span class="line"><span style="color:#90A4AE;">PIDFile</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/run/keepalived.pid</span></span>
<span class="line"><span style="color:#90A4AE;">KillMode</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">process</span></span>
<span class="line"><span style="color:#90A4AE;">EnvironmentFile</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">-/usr/local/keepalived/etc/sysconfig/keepalived</span></span>
<span class="line"><span style="color:#90A4AE;">ExecStart</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/keepalived/sbin/keepalived</span><span style="color:#90A4AE;"> $KEEPALIVED_OPTIONS</span></span>
<span class="line"><span style="color:#90A4AE;">ExecReload</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/bin/kill</span><span style="color:#E2931D;"> -HUP</span><span style="color:#90A4AE;"> $MAINPID</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Install</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">WantedBy</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">multi-user.target</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><p><strong>默认无法启动</strong>，需要一个配置文件</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">mkdir</span><span style="color:#91B859;"> /etc/keepalived</span></span>
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
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> keepalived</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> status</span><span style="color:#91B859;"> keepalived</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="github仓库" tabindex="-1">github仓库 <a class="header-anchor" href="#github仓库" aria-label="Permalink to &quot;github仓库&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">git</span><span style="color:#91B859;"> clone</span><span style="color:#91B859;"> https://github.com/acassen/keepalived.git</span></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> keepalived</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="安装脚本" tabindex="-1">安装脚本 <a class="header-anchor" href="#安装脚本" aria-label="Permalink to &quot;安装脚本&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">2.2.8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> /etc/redhat-release </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#E2931D;">    dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> net-snmp-devel</span><span style="color:#91B859;"> openssl-devel</span><span style="color:#91B859;"> libnl3-devel</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">else</span></span>
<span class="line"><span style="color:#E2931D;">    apt</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> libnl-3-dev</span><span style="color:#91B859;"> libnl-genl-3-dev</span><span style="color:#91B859;"> libssl-dev</span><span style="color:#91B859;"> libnm-dev</span><span style="color:#91B859;"> libkmod-dev</span><span style="color:#91B859;"> libsnmp35</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://keepalived.org/software/keepalived-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.tar.gz</span></span>
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
<span class="line"><span style="color:#90A4AE;font-style:italic;">#systemctl status keepalived</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div>`,14),r=[e];function o(c,t,i,b,y,u){return a(),n("div",null,r)}const B=s(p,[["render",o]]);export{m as __pageData,B as default};
