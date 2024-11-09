import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"scripts/haproxy.md","filePath":"scripts/haproxy.md"}'),p={name:"scripts/haproxy.md"},e=l(`<div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> make</span><span style="color:#91B859;">  pcre-devel</span><span style="color:#91B859;"> openssl-devel</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># wget -nc http://www.haproxy.org/download/2.8/src/haproxy-2.8.10.tar.gz -P /opt</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;"> https://mirrors.huaweicloud.com/haproxy/2.8/src/haproxy-2.8.10.tar.gz</span><span style="color:#91B859;"> -P</span><span style="color:#91B859;"> /opt</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> /usr/local/src/haproxy-2.8.10 </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;">then</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> haproxy</span><span style="color:#91B859;"> 已安装</span></span>
<span class="line"><span style="color:#6182B8;">    exit</span><span style="color:#F76D47;"> 0</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">tar</span><span style="color:#91B859;"> xf</span><span style="color:#91B859;"> /opt/haproxy-2.8.10.tar.gz</span><span style="color:#91B859;"> -C</span><span style="color:#91B859;"> /usr/local/src</span></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> /usr/local/src/haproxy-2.8.10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#91B859;"> TARGET=linux-glibc</span><span style="color:#91B859;"> USE_PCRE=</span><span style="color:#F76D47;">1</span><span style="color:#91B859;"> USE_OPENSSL=</span><span style="color:#F76D47;">1</span><span style="color:#91B859;"> USE_ZLIB=</span><span style="color:#F76D47;">1</span><span style="color:#91B859;"> USE_CRYPT_H=</span><span style="color:#F76D47;">1</span><span style="color:#91B859;"> USE_THREAD=</span><span style="color:#F76D47;">1</span></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#91B859;"> install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">mkdir</span><span style="color:#91B859;"> -p</span><span style="color:#91B859;"> /etc/haproxy/conf.d</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 验证</span></span>
<span class="line"><span style="color:#E2931D;">haproxy</span><span style="color:#91B859;"> -v</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#准备socket文件目录</span></span>
<span class="line"><span style="color:#E2931D;">mkdir</span><span style="color:#91B859;"> /var/lib/haproxy</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#设置用户和目录权限</span></span>
<span class="line"><span style="color:#E2931D;">useradd</span><span style="color:#91B859;"> -r</span><span style="color:#91B859;"> -s</span><span style="color:#91B859;"> /sbin/nologin</span><span style="color:#91B859;"> -d</span><span style="color:#91B859;"> /var/lib/haproxy</span><span style="color:#91B859;"> haproxy</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /lib/systemd/system/haproxy.service</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">[Unit]</span></span>
<span class="line"><span style="color:#91B859;">Description=HAProxy Load Balancer</span></span>
<span class="line"><span style="color:#91B859;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Service]</span></span>
<span class="line"><span style="color:#91B859;">ExecStartPre=/usr/local/sbin/haproxy -f /etc/haproxy/haproxy.cfg -f /etc/haproxy/conf.d/ -c -q</span></span>
<span class="line"><span style="color:#91B859;">ExecStart=/usr/local/sbin/haproxy -f /etc/haproxy/haproxy.cfg  -f /etc/haproxy/conf.d/ -p /run/haproxy.pid</span></span>
<span class="line"><span style="color:#91B859;">ExecReload=/bin/kill -USR2 </span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">MAINPID</span></span>
<span class="line"><span style="color:#91B859;">Type=forking</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Install]</span></span>
<span class="line"><span style="color:#91B859;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#echo systemctl enable --now haproxy</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div>`,1),r=[e];function o(c,t,i,y,b,m){return a(),n("div",null,r)}const h=s(p,[["render",o]]);export{B as __pageData,h as default};
