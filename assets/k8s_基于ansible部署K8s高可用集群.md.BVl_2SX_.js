import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"","description":"","frontmatter":{"kdate":"2024-03-03 13:42:09"},"headers":[],"relativePath":"k8s/基于ansible部署K8s高可用集群.md","filePath":"k8s/基于ansible部署K8s高可用集群.md"}'),p={name:"k8s/基于ansible部署K8s高可用集群.md"},e=l(`<h2 id="kubenetes1-27-11高可用集群的搭建" tabindex="-1">kubenetes1.27.11高可用集群的搭建 <a class="header-anchor" href="#kubenetes1-27-11高可用集群的搭建" aria-label="Permalink to &quot;kubenetes1.27.11高可用集群的搭建&quot;">​</a></h2><h2 id="网络环境" tabindex="-1">网络环境 <a class="header-anchor" href="#网络环境" aria-label="Permalink to &quot;网络环境&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">节点网络:</span><span style="color:#91B859;"> 10.1.0.0/16</span></span>
<span class="line"><span style="color:#E2931D;">pod网络:</span><span style="color:#91B859;"> 10.244.0.0/16</span></span>
<span class="line"><span style="color:#E2931D;">service网络:</span><span style="color:#91B859;"> 10.96.0.0/16</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><table tabindex="0"><thead><tr><th>IP</th><th>主机名</th><th>角色</th></tr></thead><tbody><tr><td>10.1.1.1</td><td>master1.zbluo.com</td><td>主节点1，Master、etcd</td></tr><tr><td>10.1.1.2</td><td>master2.zbluo.com</td><td>主节点2，Master 和 etcd</td></tr><tr><td>10.1.1.11</td><td>node1.zbluo.com</td><td>工作节点1</td></tr><tr><td>10.1.1.12</td><td>node2.zbluo.com</td><td>工作节点2</td></tr><tr><td>10.1.1.13</td><td>node3.zbluo.com</td><td>工作节点3</td></tr><tr><td>10.1.1.21</td><td>ha1.zbluo.com</td><td>提供高可用和负载均衡</td></tr><tr><td>10.1.1.22</td><td>ha2.zbluo.com</td><td>提供高可用和负载均衡</td></tr><tr><td>10.0.0.30</td><td>harbor.zbluo.com</td><td>容器镜像仓库</td></tr><tr><td>10.0.0.10</td><td></td><td>Ansible 和 CoreDNS</td></tr><tr><td>10.1.1.100</td><td>ha.zbluo.com</td><td>VIP，ha1和ha2主机实现</td></tr></tbody></table><h2 id="安装coredns和ansible-配置" tabindex="-1">安装CoreDNS和Ansible 配置 <a class="header-anchor" href="#安装coredns和ansible-配置" aria-label="Permalink to &quot;安装CoreDNS和Ansible 配置&quot;">​</a></h2><p><code>10.0.0.10</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://github.com/coredns/coredns/releases/download/v1.11.1/coredns_1.11.1_linux_amd64.tgz</span></span>
<span class="line"><span style="color:#E2931D;">tar</span><span style="color:#91B859;"> xf</span><span style="color:#91B859;"> coredns_1.11.1_linux_amd64.tgz</span><span style="color:#91B859;"> -C</span><span style="color:#91B859;"> /usr/local/bin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">mkdir</span><span style="color:#91B859;"> /etc/coredns</span></span>
<span class="line"><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">zbluo.com</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/coredns/hosts</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.1  master1.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.2  master2.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.11 node1.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.12 node2.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.13 node3.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.21 ha1.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.22 ha2.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.30 harbor.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#  Corefile</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;">  /etc/coredns/Corefile</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">zbluo.com {</span></span>
<span class="line"><span style="color:#91B859;">    hosts /etc/coredns/hosts</span></span>
<span class="line"><span style="color:#91B859;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">. {</span></span>
<span class="line"><span style="color:#91B859;">    forward . 223.5.5.5</span></span>
<span class="line"><span style="color:#91B859;">}</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># service</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /lib/systemd/system/coredns.service</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">[Unit]</span></span>
<span class="line"><span style="color:#91B859;">Description=CoreDNS</span></span>
<span class="line"><span style="color:#91B859;">Documentation=https://coredns.io/manual/toc/</span></span>
<span class="line"><span style="color:#91B859;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Service]</span></span>
<span class="line"><span style="color:#91B859;">Type=simple</span></span>
<span class="line"><span style="color:#91B859;">User=root</span></span>
<span class="line"><span style="color:#91B859;"># 指定运行端口和读取的配置文件</span></span>
<span class="line"><span style="color:#91B859;">ExecStart=/usr/local/bin/coredns -conf /etc/coredns/Corefile</span></span>
<span class="line"><span style="color:#91B859;">Restart=on-failure</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Install]</span></span>
<span class="line"><span style="color:#91B859;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> daemon-reload</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> coredns</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><p><code>10.0.0.30</code>安装Ansible及配置</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">pip3</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> ansible</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">mkdir</span><span style="color:#91B859;"> ansible-k8s</span></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> ansible-k8s</span></span>
<span class="line"><span style="color:#E2931D;">ansible-config</span><span style="color:#91B859;"> init</span><span style="color:#91B859;"> --disabled</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> ansible.cfg</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/^;inventory=/c inventory=\\.\\/hosts</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> ansible.cfg</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 主机清单hosts</span></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">master</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#E2931D;">master[1:2].zbluo.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">node</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#E2931D;">node[1:3].zbluo.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">ha</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#E2931D;">ha[1:2].zbluo.com</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="_1配置ssh认证" tabindex="-1">1配置ssh认证 <a class="header-anchor" href="#_1配置ssh认证" aria-label="Permalink to &quot;1配置ssh认证&quot;">​</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 利用sshpass批量实现基于key验证脚本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">password</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">123456</span></span>
<span class="line"><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">zbluo.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#91B859;"> -v</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">install sshpass</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;">;</span><span style="color:#E2931D;"> dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#39ADB5;"> -f</span><span style="color:#39ADB5;"> ~</span><span style="color:#90A4AE;">/.ssh/id_rsa </span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> ssh-keygen</span><span style="color:#91B859;"> -N</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">ips</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#91B859;">master1.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">master2.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">node1.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">node2.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">node3.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">ha1.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#91B859;">ha2.</span><span style="color:#90A4AE;">$domain</span></span>
<span class="line"><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $ips</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#90A4AE;"> $i</span></span>
<span class="line"><span style="color:#39ADB5;">    {</span><span style="color:#E2931D;"> sshpass</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;"> $password </span><span style="color:#91B859;">ssh-copy-id</span><span style="color:#91B859;"> -o</span><span style="color:#91B859;"> StrictHostKeyChecking=no</span><span style="color:#90A4AE;"> $i</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span><span style="color:#39ADB5;"> &amp;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"><span style="color:#6182B8;">wait</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><code>bash push_key.sh</code></p><h3 id="_2各主机环境初始化" tabindex="-1">2各主机环境初始化 <a class="header-anchor" href="#_2各主机环境初始化" aria-label="Permalink to &quot;2各主机环境初始化&quot;">​</a></h3><p><code>10.0.0.10</code></p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> all</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 修改主机名</span></span>
<span class="line"><span style="color:#E53935;">      hostname</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> name={{ inventory_hostname.split(&#39;.&#39;)[0] }}</span></span>
<span class="line"><span style="color:#90A4AE;">      </span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> add epel repository</span></span>
<span class="line"><span style="color:#E53935;">      yum_repository</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> EPEL</span></span>
<span class="line"><span style="color:#E53935;">        description</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> epel ustc</span></span>
<span class="line"><span style="color:#E53935;">        file</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> base</span></span>
<span class="line"><span style="color:#E53935;">        baseurl</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> https://mirrors.ustc.edu.cn/epel/$releasever/Everything/$basearch</span></span>
<span class="line"><span style="color:#E53935;">        gpgcheck</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> add baseos repository</span></span>
<span class="line"><span style="color:#E53935;">      yum_repository</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> BaseOS</span></span>
<span class="line"><span style="color:#E53935;">        description</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> base os ustc</span></span>
<span class="line"><span style="color:#E53935;">        file</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> base</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        #baseurl: &#39;https://download.docker.com/linux/centos/docker-ce.repo&#39;</span></span>
<span class="line"><span style="color:#E53935;">        baseurl</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> https://mirrors.ustc.edu.cn/rocky/$releasever/BaseOS/$arch/os/</span></span>
<span class="line"><span style="color:#E53935;">        gpgcheck</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> add AppStream repository</span></span>
<span class="line"><span style="color:#E53935;">      yum_repository</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> AppStream</span></span>
<span class="line"><span style="color:#E53935;">        description</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> appstream os ustc</span></span>
<span class="line"><span style="color:#E53935;">        file</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> base</span></span>
<span class="line"><span style="color:#E53935;">        baseurl</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">https://mirrors.ustc.edu.cn/rocky/$releasever/AppStream/$arch/os/</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E53935;">        gpgcheck</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span>
<span class="line"><span style="color:#90A4AE;">        </span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> disable firewall</span></span>
<span class="line"><span style="color:#E53935;">      systemd_service</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> firewalld</span></span>
<span class="line"><span style="color:#E53935;">        enabled</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span>
<span class="line"><span style="color:#E53935;">        state</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> stopped</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 修改内核参数等</span></span>
<span class="line"><span style="color:#E53935;">      shell</span><span style="color:#39ADB5;">:</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E53935;">        cmd</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;font-style:italic;"> |</span></span>
<span class="line"><span style="color:#91B859;">          setenforce 0</span></span>
<span class="line"><span style="color:#91B859;">          sed -i &#39;/^SELINUX=/c SELINUX=disabled&#39; /etc/selinux/config  # 永久</span></span>
<span class="line"><span style="color:#91B859;">          swapoff -a</span></span>
<span class="line"><span style="color:#91B859;">          sed -ri &#39;s/.*swap.*/#&amp;/&#39; /etc/fstab</span></span>
<span class="line"><span style="color:#91B859;">          timedatectl set-timezone Asia/Shanghai</span></span>
<span class="line"><span style="color:#91B859;">          dnf install -y chrony</span></span>
<span class="line"><span style="color:#91B859;">          systemctl enable chronyd</span></span>
<span class="line"><span style="color:#91B859;">          systemctl start chronyd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">          cat &gt; /etc/modules-load.d/k8s.conf &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#91B859;">          hoverlay</span></span>
<span class="line"><span style="color:#91B859;">          br_netfilter</span></span>
<span class="line"><span style="color:#91B859;">          EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">          modprobe overlay</span></span>
<span class="line"><span style="color:#91B859;">          modprobe br_netfilter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">          cat &gt; /etc/sysctl.d/k8s.conf &lt;&lt; EOF</span></span>
<span class="line"><span style="color:#91B859;">          net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#91B859;">          net.bridge.bridge-nf-call-ip6tables = 1</span></span>
<span class="line"><span style="color:#91B859;">          net.bridge.bridge-nf-call-iptables = 1</span></span>
<span class="line"><span style="color:#91B859;">          EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">          sysctl -p</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><h3 id="_3harproxy" tabindex="-1">3harproxy <a class="header-anchor" href="#_3harproxy" aria-label="Permalink to &quot;3harproxy&quot;">​</a></h3><p><code>haproxy.cfg</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">global</span></span>
<span class="line"><span style="color:#E2931D;">	maxconn</span><span style="color:#F76D47;"> 100000</span></span>
<span class="line"><span style="color:#E2931D;">	chroot</span><span style="color:#91B859;"> /etc/haproxy</span></span>
<span class="line"><span style="color:#E2931D;">	stats</span><span style="color:#91B859;"> socket</span><span style="color:#91B859;"> /var/lib/haproxy/haproxy.sock</span><span style="color:#91B859;"> mode</span><span style="color:#F76D47;"> 600</span><span style="color:#91B859;"> level</span><span style="color:#91B859;"> admin</span></span>
<span class="line"><span style="color:#E2931D;">	pidfile</span><span style="color:#91B859;"> /var/lib/haproxy/haproxy.pid</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#uid 99</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#gid 99</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#user haproxy</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#group haproxy</span></span>
<span class="line"><span style="color:#E2931D;">	daemon</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#nbproc 4</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#cpu-map 1 0</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#cpu-map 2 1</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#cpu-map 3 2</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#cpu-map 4 3</span></span>
<span class="line"><span style="color:#90A4AE;">	</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	# log 127.0.0.1 local2 info</span></span>
<span class="line"><span style="color:#90A4AE;">	</span></span>
<span class="line"><span style="color:#90A4AE;">	</span></span>
<span class="line"><span style="color:#E2931D;">defaults</span></span>
<span class="line"><span style="color:#E2931D;">	option</span><span style="color:#91B859;"> http-keep-alive</span></span>
<span class="line"><span style="color:#E2931D;">	option</span><span style="color:#91B859;"> forwardfor</span></span>
<span class="line"><span style="color:#E2931D;">	maxconn</span><span style="color:#F76D47;"> 100000</span></span>
<span class="line"><span style="color:#E2931D;">	mode</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E2931D;">	timeout</span><span style="color:#91B859;"> connect</span><span style="color:#91B859;"> 300000ms</span></span>
<span class="line"><span style="color:#E2931D;">	timeout</span><span style="color:#91B859;"> client</span><span style="color:#91B859;"> 300000ms</span></span>
<span class="line"><span style="color:#E2931D;">	timeout</span><span style="color:#91B859;"> server</span><span style="color:#91B859;"> 300000ms</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">listen</span><span style="color:#91B859;"> stats</span></span>
<span class="line"><span style="color:#E2931D;">    mode</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E2931D;">    bind</span><span style="color:#91B859;"> 0.0.0.0:8888</span></span>
<span class="line"><span style="color:#E2931D;">    stats</span><span style="color:#91B859;"> enable</span></span>
<span class="line"><span style="color:#E2931D;">    stats</span><span style="color:#91B859;"> uri</span><span style="color:#91B859;"> /ha_status</span></span>
<span class="line"><span style="color:#E2931D;">    stats</span><span style="color:#91B859;"> auth</span><span style="color:#91B859;"> admin:123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">listen</span><span style="color:#91B859;"> k8s-6433</span></span>
<span class="line"><span style="color:#E2931D;">    bind</span><span style="color:#91B859;"> 10.1.1.100:6443</span></span>
<span class="line"><span style="color:#E2931D;">    mode</span><span style="color:#91B859;"> tcp</span></span>
<span class="line"><span style="color:#E2931D;">    server</span><span style="color:#91B859;"> master1</span><span style="color:#91B859;"> 10.1.1.1:6443</span><span style="color:#91B859;"> check</span><span style="color:#91B859;"> inter</span><span style="color:#91B859;"> 3s</span><span style="color:#91B859;"> fall</span><span style="color:#F76D47;"> 3</span><span style="color:#91B859;"> rise</span><span style="color:#F76D47;"> 3</span></span>
<span class="line"><span style="color:#E2931D;">    server</span><span style="color:#91B859;"> master2</span><span style="color:#91B859;"> 10.1.1.2:6443</span><span style="color:#91B859;"> check</span><span style="color:#91B859;"> inter</span><span style="color:#91B859;"> 3s</span><span style="color:#91B859;"> fall</span><span style="color:#F76D47;"> 3</span><span style="color:#91B859;"> rise</span><span style="color:#F76D47;"> 3</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><p><code>ansible yaml for haproxy</code></p><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ha</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> install gcc make</span></span>
<span class="line"><span style="color:#E53935;">      dnf</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> name={{ item }}</span></span>
<span class="line"><span style="color:#E53935;">      loop</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> [</span><span style="color:#91B859;">gcc</span><span style="color:#39ADB5;">,</span><span style="color:#91B859;"> make</span><span style="color:#39ADB5;">,</span><span style="color:#91B859;"> pcre-devel</span><span style="color:#39ADB5;">,</span><span style="color:#91B859;"> openssl-devel</span><span style="color:#39ADB5;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> scp to ha</span></span>
<span class="line"><span style="color:#E53935;">      unarchive</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        src</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> haproxy-2.8.0.tar.gz</span></span>
<span class="line"><span style="color:#E53935;">        dest</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /usr/local/src/</span></span>
<span class="line"><span style="color:#E53935;">        creates</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /usr/local/src/harproxy-2.8.0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> isinstall</span></span>
<span class="line"><span style="color:#E53935;">      stat</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> path=/etc/haproxy</span></span>
<span class="line"><span style="color:#E53935;">      register</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> is_install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 编译安装</span></span>
<span class="line"><span style="color:#E53935;">      shell</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        cmd</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;font-style:italic;"> |</span></span>
<span class="line"><span style="color:#91B859;">          make TARGET=linux-glibc USE_PCRE=1 USE_OPENSSL=1 USE_ZLIB=1 USE_CRYPT_H=1 USE_THREAD=1</span></span>
<span class="line"><span style="color:#91B859;">          make install</span></span>
<span class="line"><span style="color:#91B859;">          mkdir -p /etc/haproxy/conf.d</span></span>
<span class="line"><span style="color:#E53935;">        chdir</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /usr/local/src/haproxy-2.8.0</span></span>
<span class="line"><span style="color:#E53935;">      when</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> not is_install.stat.exists</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 配置文件</span></span>
<span class="line"><span style="color:#E53935;">      copy</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        src</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> haproxy.cfg</span></span>
<span class="line"><span style="color:#E53935;">        dest</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /etc/haproxy/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 创建目录</span></span>
<span class="line"><span style="color:#E53935;">      file</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /var/lib/haproxy</span></span>
<span class="line"><span style="color:#E53935;">        state</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> directory</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 创建用户haproxy</span></span>
<span class="line"><span style="color:#E53935;">      user</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> haproxy</span></span>
<span class="line"><span style="color:#E53935;">        shell</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /sbin/nologin</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> service 文件</span></span>
<span class="line"><span style="color:#E53935;">      shell</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        cmd</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;font-style:italic;"> |</span></span>
<span class="line"><span style="color:#91B859;">          cat &gt; /lib/systemd/system/haproxy.service &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#91B859;">          [Unit]</span></span>
<span class="line"><span style="color:#91B859;">          Description=HAProxy Load Balancer</span></span>
<span class="line"><span style="color:#91B859;">          After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">          [Service]</span></span>
<span class="line"><span style="color:#91B859;">          ExecStartPre=/usr/local/sbin/haproxy -f /etc/haproxy/haproxy.cfg -f /etc/haproxy/conf.d/ -c -q</span></span>
<span class="line"><span style="color:#91B859;">          ExecStart=/usr/local/sbin/haproxy -f /etc/haproxy/haproxy.cfg  -f /etc/haproxy/conf.d/ -p /run/haproxy.pid</span></span>
<span class="line"><span style="color:#91B859;">          ExecReload=/bin/kill -USR2 $MAINPID</span></span>
<span class="line"><span style="color:#91B859;">          Type=forking</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">          [Install]</span></span>
<span class="line"><span style="color:#91B859;">          WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#91B859;">          EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 修改内核参数</span></span>
<span class="line"><span style="color:#E53935;">      sysctl</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> net.ipv4.ip_nonlocal_bind</span></span>
<span class="line"><span style="color:#E53935;">        value</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 启动haproxy</span></span>
<span class="line"><span style="color:#E53935;">      systemd_service</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> haproxy</span></span>
<span class="line"><span style="color:#E53935;">        state</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> started</span></span>
<span class="line"><span style="color:#E53935;">        enabled</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> yes</span></span>
<span class="line"><span style="color:#E53935;">        daemon_reload</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> yes</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br></div></div><h3 id="_4keepalived" tabindex="-1">4keepalived <a class="header-anchor" href="#_4keepalived" aria-label="Permalink to &quot;4keepalived&quot;">​</a></h3><p><strong>检查haproxy健康脚本</strong> <code>/etc/keepalived/check_haproxy.sh</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"><span style="color:#E2931D;">/usr/bin/killall</span><span style="color:#91B859;"> -O</span><span style="color:#91B859;"> haproxy</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> systemctl</span><span style="color:#91B859;"> restart</span><span style="color:#91B859;"> haproxy</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>ha1 keepalived.conf</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">!</span><span style="color:#E2931D;"> Configuration</span><span style="color:#91B859;"> File</span><span style="color:#91B859;"> for</span><span style="color:#91B859;"> keepalived</span></span>
<span class="line"><span style="color:#E2931D;">global_defs</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">        notification_email</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                root@localhost</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#E2931D;">        notification_email_from</span><span style="color:#91B859;"> kaadmin@localhost</span></span>
<span class="line"><span style="color:#E2931D;">        smtp_server</span><span style="color:#F76D47;"> 127.0.0.1</span></span>
<span class="line"><span style="color:#E2931D;">        smtp_connect_timeout</span><span style="color:#F76D47;"> 30</span></span>
<span class="line"><span style="color:#E2931D;">        router_id</span><span style="color:#91B859;"> ha1.zbluo.com</span><span style="color:#90A4AE;font-style:italic;"> # 在另一个节点为ha2.zbluo.com</span></span>
<span class="line"><span style="color:#E2931D;">        vrrp_mcast_group4</span><span style="color:#F76D47;"> 224.0.100.100</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">vrrp_script</span><span style="color:#91B859;"> check_haproxy</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #定义脚本</span></span>
<span class="line"><span style="color:#E2931D;">        script</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/check_haproxy.sh</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        interval</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"><span style="color:#E2931D;">        weight</span><span style="color:#91B859;"> -30</span></span>
<span class="line"><span style="color:#E2931D;">        fall</span><span style="color:#F76D47;"> 3</span></span>
<span class="line"><span style="color:#E2931D;">        rise</span><span style="color:#F76D47;"> 2</span></span>
<span class="line"><span style="color:#E2931D;">        timeout</span><span style="color:#F76D47;"> 2</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">vrrp_instance</span><span style="color:#91B859;"> VI_1</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">        state</span><span style="color:#91B859;"> MASTER</span><span style="color:#90A4AE;font-style:italic;"> #在另一个节点为BACKUP</span></span>
<span class="line"><span style="color:#E2931D;">        interface</span><span style="color:#91B859;"> ens32</span></span>
<span class="line"><span style="color:#E2931D;">        virtual_router_id</span><span style="color:#F76D47;"> 66</span></span>
<span class="line"><span style="color:#E2931D;">        priority</span><span style="color:#F76D47;"> 100</span><span style="color:#90A4AE;font-style:italic;"> #在另一个节点为80</span></span>
<span class="line"><span style="color:#E2931D;">        advert_int</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"><span style="color:#E2931D;">        authentication</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                auth_type</span><span style="color:#91B859;"> PASS</span></span>
<span class="line"><span style="color:#E2931D;">                auth_pass</span><span style="color:#F76D47;"> 123456</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">        virtual_ipaddress</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                10.1.1.100/24</span><span style="color:#91B859;"> dev</span><span style="color:#91B859;"> ens32</span><span style="color:#91B859;"> label</span><span style="color:#91B859;"> ens32:1</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#E2931D;">        track_interface</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                ens32</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#E2931D;">        notify_master</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/notify.sh master</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        notify_backup</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/notify.sh backup</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        notify_fault</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/notify.sh fault</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        track_script</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                check_haproxy</span><span style="color:#90A4AE;font-style:italic;"> #调用上面定义的脚本</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p><strong>ha2 keepalived.confg</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">!</span><span style="color:#E2931D;"> Configuration</span><span style="color:#91B859;"> File</span><span style="color:#91B859;"> for</span><span style="color:#91B859;"> keepalived</span></span>
<span class="line"><span style="color:#E2931D;">global_defs</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">        notification_email</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                root@localhost</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#E2931D;">        notification_email_from</span><span style="color:#91B859;"> kaadmin@localhost</span></span>
<span class="line"><span style="color:#E2931D;">        smtp_server</span><span style="color:#F76D47;"> 127.0.0.1</span></span>
<span class="line"><span style="color:#E2931D;">        smtp_connect_timeout</span><span style="color:#F76D47;"> 30</span></span>
<span class="line"><span style="color:#E2931D;">        router_id</span><span style="color:#91B859;"> ha2.zbluo.com</span></span>
<span class="line"><span style="color:#E2931D;">        vrrp_mcast_group4</span><span style="color:#F76D47;"> 224.0.100.100</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">vrrp_script</span><span style="color:#91B859;"> check_haproxy</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #定义脚本</span></span>
<span class="line"><span style="color:#E2931D;">        script</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/check_haproxy.sh</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        interval</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"><span style="color:#E2931D;">        weight</span><span style="color:#91B859;"> -30</span></span>
<span class="line"><span style="color:#E2931D;">        fall</span><span style="color:#F76D47;"> 3</span></span>
<span class="line"><span style="color:#E2931D;">        rise</span><span style="color:#F76D47;"> 2</span></span>
<span class="line"><span style="color:#E2931D;">        timeout</span><span style="color:#F76D47;"> 2</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">vrrp_instance</span><span style="color:#91B859;"> VI_1</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">        state</span><span style="color:#91B859;"> BACKUP</span></span>
<span class="line"><span style="color:#E2931D;">        interface</span><span style="color:#91B859;"> ens32</span></span>
<span class="line"><span style="color:#E2931D;">        virtual_router_id</span><span style="color:#F76D47;"> 66</span></span>
<span class="line"><span style="color:#E2931D;">        priority</span><span style="color:#F76D47;"> 80</span></span>
<span class="line"><span style="color:#E2931D;">        advert_int</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"><span style="color:#E2931D;">        authentication</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                auth_type</span><span style="color:#91B859;"> PASS</span></span>
<span class="line"><span style="color:#E2931D;">                auth_pass</span><span style="color:#F76D47;"> 123456</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">        virtual_ipaddress</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                10.1.1.100/24</span><span style="color:#91B859;"> dev</span><span style="color:#91B859;"> ens32</span><span style="color:#91B859;"> label</span><span style="color:#91B859;"> ens32:1</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#E2931D;">        track_interface</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                ens32</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#E2931D;">        notify_master</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/notify.sh master</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        notify_backup</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/notify.sh backup</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        notify_fault</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/etc/keepalived/notify.sh fault</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">        track_script</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                check_haproxy</span><span style="color:#90A4AE;font-style:italic;"> #调用上面定义的脚本</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p><strong>ansible yaml</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">-</span><span style="color:#91B859;"> hosts:</span><span style="color:#91B859;"> ha</span></span>
<span class="line"><span style="color:#E2931D;">  gather_facts:</span><span style="color:#91B859;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">  tasks:</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> keepalived</span></span>
<span class="line"><span style="color:#E2931D;">      dnf:</span><span style="color:#91B859;"> name=keepalived</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> script</span><span style="color:#91B859;"> for</span><span style="color:#91B859;"> check</span><span style="color:#91B859;"> haproxy</span></span>
<span class="line"><span style="color:#E2931D;">      copy:</span></span>
<span class="line"><span style="color:#E2931D;">        content:</span><span style="color:#39ADB5;"> |</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #!/bin/bash</span></span>
<span class="line"><span style="color:#E2931D;">          /usr/bin/killall</span><span style="color:#91B859;"> -O</span><span style="color:#91B859;"> haproxy</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> systemctl</span><span style="color:#91B859;"> restart</span><span style="color:#91B859;"> haproxy</span></span>
<span class="line"><span style="color:#E2931D;">        dest:</span><span style="color:#91B859;"> /etc/keepalived/check_haproxy.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> modify</span></span>
<span class="line"><span style="color:#E2931D;">      file:</span></span>
<span class="line"><span style="color:#E2931D;">        path:</span><span style="color:#91B859;"> /etc/keepalived/check_haproxy.sh</span></span>
<span class="line"><span style="color:#E2931D;">        mode:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">0755</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> copy</span><span style="color:#91B859;"> to</span><span style="color:#91B859;"> h1</span></span>
<span class="line"><span style="color:#E2931D;">      copy:</span></span>
<span class="line"><span style="color:#E2931D;">        src:</span><span style="color:#91B859;"> keepalived1.conf</span></span>
<span class="line"><span style="color:#E2931D;">        dest:</span><span style="color:#91B859;"> /etc/keepalived/keepalived.conf</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> copy</span><span style="color:#91B859;"> to</span><span style="color:#91B859;"> h2</span></span>
<span class="line"><span style="color:#E2931D;">      copy:</span></span>
<span class="line"><span style="color:#E2931D;">        src:</span><span style="color:#91B859;"> keepalived2.conf</span></span>
<span class="line"><span style="color:#E2931D;">        dest:</span><span style="color:#91B859;"> /etc/keepalived/keepalived.conf</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> start</span><span style="color:#91B859;"> keepalived</span></span>
<span class="line"><span style="color:#E2931D;">      systemd_service:</span></span>
<span class="line"><span style="color:#E2931D;">        name:</span><span style="color:#91B859;"> keepalived</span></span>
<span class="line"><span style="color:#E2931D;">        state:</span><span style="color:#91B859;"> started</span></span>
<span class="line"><span style="color:#E2931D;">        daemon_reload:</span><span style="color:#91B859;"> yes</span></span>
<span class="line"><span style="color:#E2931D;">        enabled:</span><span style="color:#91B859;"> yes</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="_5安装docker-cri-dockerd" tabindex="-1">5安装docker,cri-dockerd <a class="header-anchor" href="#_5安装docker-cri-dockerd" aria-label="Permalink to &quot;5安装docker,cri-dockerd&quot;">​</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">-</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 安装docker</span></span>
<span class="line"><span style="color:#E2931D;">  hosts:</span><span style="color:#91B859;"> all</span></span>
<span class="line"><span style="color:#E2931D;">  gather_facts:</span><span style="color:#91B859;"> no</span></span>
<span class="line"><span style="color:#E2931D;">  vars:</span></span>
<span class="line"><span style="color:#E2931D;">    docker_version:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">24.0.0</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E2931D;">    cri:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">cri-dockerd-0.3.11-3.el8.x86_64.rpm</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">  tasks:</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 下载cri-dockerd</span><span style="color:#91B859;"> 到本机</span></span>
<span class="line"><span style="color:#E2931D;">      get_url:</span></span>
<span class="line"><span style="color:#E2931D;">        url:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.11/{{ cri }}</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E2931D;">        dest:</span><span style="color:#91B859;"> /opt/{{</span><span style="color:#91B859;"> cri</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">        force:</span><span style="color:#91B859;"> no</span></span>
<span class="line"><span style="color:#E2931D;">      when:</span><span style="color:#91B859;"> inventory_hostname</span><span style="color:#91B859;"> ==</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">localhost</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> block:</span></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> scp到其它主机</span></span>
<span class="line"><span style="color:#E2931D;">        copy:</span></span>
<span class="line"><span style="color:#E2931D;">          src:</span><span style="color:#91B859;"> /opt/{{</span><span style="color:#91B859;"> cri</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">          dest:</span><span style="color:#91B859;"> /opt/{{</span><span style="color:#91B859;"> cri</span><span style="color:#91B859;"> }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> check</span><span style="color:#91B859;"> docker</span><span style="color:#91B859;"> is</span><span style="color:#91B859;"> or</span><span style="color:#91B859;"> not</span><span style="color:#91B859;"> installed</span></span>
<span class="line"><span style="color:#E2931D;">        shell:</span></span>
<span class="line"><span style="color:#E2931D;">          cmd:</span><span style="color:#91B859;"> docker</span><span style="color:#91B859;"> -v</span></span>
<span class="line"><span style="color:#E2931D;">        register:</span><span style="color:#91B859;"> is_install</span></span>
<span class="line"><span style="color:#E2931D;">        failed_when:</span><span style="color:#91B859;"> is_install.stderr</span><span style="color:#91B859;"> !=</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"><span style="color:#E2931D;">        ignore_errors:</span><span style="color:#91B859;"> yes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        #</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      #- debug: msg=is_install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 卸载docker</span></span>
<span class="line"><span style="color:#E2931D;">        dnf:</span></span>
<span class="line"><span style="color:#E2931D;">          name:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">{{ item }}</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E2931D;">          loop:</span><span style="color:#90A4AE;"> [ </span><span style="color:#91B859;">docker,</span><span style="color:#91B859;"> docker-client,</span><span style="color:#91B859;"> docker-common,</span><span style="color:#91B859;"> docker-engine,</span><span style="color:#91B859;"> docker-client-latest]</span></span>
<span class="line"><span style="color:#E2931D;">          state:</span><span style="color:#91B859;"> absent</span></span>
<span class="line"><span style="color:#E2931D;">        ignore_errors:</span><span style="color:#91B859;"> yes</span></span>
<span class="line"><span style="color:#E2931D;">        when:</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#91B859;"> is_install.stdout</span><span style="color:#91B859;"> !=</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">docker_version not in is_install.stdout</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #    - name: 停止docker</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #      systemd_service:</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #        name: docker</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #        state: stopped</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #        ignore_errors: yes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #        daemon_reload: yes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #        daemon_reexec: yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #- fail: msg=手动退出</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 添加docker仓库</span></span>
<span class="line"><span style="color:#E2931D;">        get_url:</span></span>
<span class="line"><span style="color:#E2931D;">          url:</span><span style="color:#91B859;"> https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span>
<span class="line"><span style="color:#E2931D;">          dest:</span><span style="color:#91B859;"> /etc/yum.repos.d/docker-ce.repo</span></span>
<span class="line"><span style="color:#E2931D;">          force:</span><span style="color:#91B859;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 安装docker及其依赖</span></span>
<span class="line"><span style="color:#E2931D;">        dnf:</span><span style="color:#91B859;"> name={{</span><span style="color:#91B859;"> item</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">        loop:</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#91B859;"> docker-ce-{{</span><span style="color:#91B859;"> docker_version</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#91B859;"> docker-ce-cli-{{</span><span style="color:#91B859;"> docker_version</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #- docker-buildx-plugin</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #- docker-compose-plugin</span></span>
<span class="line"><span style="color:#E2931D;">        when:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">docker_version not in is_install.stdout</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 添加用户</span></span>
<span class="line"><span style="color:#E2931D;">        user:</span></span>
<span class="line"><span style="color:#E2931D;">          name:</span><span style="color:#91B859;"> docker</span></span>
<span class="line"><span style="color:#E2931D;">          group:</span><span style="color:#91B859;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 创建daemon.json</span></span>
<span class="line"><span style="color:#E2931D;">        shell:</span></span>
<span class="line"><span style="color:#E2931D;">          cmd:</span><span style="color:#39ADB5;"> |</span></span>
<span class="line"><span style="color:#E2931D;">            cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/docker/daemon.json</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">            {</span></span>
<span class="line"><span style="color:#91B859;">              &quot;registry-mirrors&quot;: [&quot;https://qmaqgl5w.mirror.aliyuncs.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">              &quot;insecure-registries&quot;: [&quot;harbor.zbluo.com&quot;, &quot;10.0.0.30&quot;],</span></span>
<span class="line"><span style="color:#91B859;">              &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]</span></span>
<span class="line"><span style="color:#91B859;">            }</span></span>
<span class="line"><span style="color:#91B859;">            EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: 设置开机启动</span></span>
<span class="line"><span style="color:#91B859;">        systemd_service:</span></span>
<span class="line"><span style="color:#91B859;">          name: docker</span></span>
<span class="line"><span style="color:#91B859;">          enabled: true</span></span>
<span class="line"><span style="color:#91B859;">          state: started</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: check docker status</span></span>
<span class="line"><span style="color:#91B859;">        shell:</span></span>
<span class="line"><span style="color:#91B859;">          cmd: systemctl is-active docker</span></span>
<span class="line"><span style="color:#91B859;">        register: status</span></span>
<span class="line"><span style="color:#91B859;">        #register: status</span></span>
<span class="line"><span style="color:#91B859;">      - debug: msg={{ status.stdout }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: install cri-docker</span></span>
<span class="line"><span style="color:#91B859;">        shell:</span></span>
<span class="line"><span style="color:#91B859;">          cmd: rpm -ivh /opt/{{ cri }}</span></span>
<span class="line"><span style="color:#91B859;">      when:</span></span>
<span class="line"><span style="color:#91B859;">        - inventory_hostname != &#39;localhost&#39;</span></span>
<span class="line"><span style="color:#91B859;">        - inventory_hostname != &#39;ha1&#39;</span></span>
<span class="line"><span style="color:#91B859;">        - inventory_hostname != &#39;ha2&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br></div></div><h3 id="_6kubeadm-kubectl-kubelet" tabindex="-1">6kubeadm,kubectl,kubelet <a class="header-anchor" href="#_6kubeadm-kubectl-kubelet" aria-label="Permalink to &quot;6kubeadm,kubectl,kubelet&quot;">​</a></h3><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_7init-cluster" tabindex="-1">7init-cluster <a class="header-anchor" href="#_7init-cluster" aria-label="Permalink to &quot;7init-cluster&quot;">​</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> init</span><span style="color:#91B859;"> --control-plane-endpoint</span><span style="color:#91B859;"> ha.zbluo.com</span><span style="color:#91B859;"> --apiserver-advertise-address</span><span style="color:#F76D47;"> 10.1.1.1</span><span style="color:#91B859;"> --kubernetes-version</span><span style="color:#F76D47;"> 1.27.12</span><span style="color:#91B859;"> --pod-network-cidr</span><span style="color:#91B859;"> 10.244.0.0/16</span><span style="color:#91B859;"> --image-repository</span><span style="color:#91B859;"> harbor.zbluo.com/google_containers</span><span style="color:#91B859;"> --cri-socket</span><span style="color:#91B859;"> unix:///run/cri-dockerd.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> init</span><span style="color:#91B859;"> --control-plane-endpoint</span><span style="color:#91B859;"> ha.zbluo.com</span><span style="color:#91B859;"> --apiserver-advertise-address</span><span style="color:#F76D47;"> 10.1.1.1</span><span style="color:#91B859;"> --kubernetes-version</span><span style="color:#F76D47;"> 1.27.12</span><span style="color:#91B859;"> --pod-network-cidr</span><span style="color:#91B859;"> 10.244.0.0/16</span><span style="color:#91B859;"> --image-repository</span><span style="color:#91B859;"> registry.aliyuncs.com/google_containers</span><span style="color:#91B859;"> --cri-socket</span><span style="color:#91B859;"> unix:///run/cri-dockerd.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,36),o=[e];function r(c,t,i,b,y,m){return a(),n("div",null,o)}const d=s(p,[["render",r]]);export{B as __pageData,d as default};
