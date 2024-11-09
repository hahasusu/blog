import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"k8s/rancher部署.md","filePath":"k8s/rancher部署.md"}'),p={name:"k8s/rancher部署.md"},e=l(`<h2 id="主机" tabindex="-1">主机 <a class="header-anchor" href="#主机" aria-label="Permalink to &quot;主机&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#90A4AE;">hosts</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.1 master1 master1.zbluo.com</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.2 master2 master2.zbluo.com</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.11 node1 node1.zbluo.com</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.12 node2 node2.zbluo.com</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.30 harbor harbor.zbluo.com</span></span>
<span class="line"><span style="color:#39ADB5;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="初始化系统环境" tabindex="-1">初始化系统环境 <a class="header-anchor" href="#初始化系统环境" aria-label="Permalink to &quot;初始化系统环境&quot;">​</a></h2><blockquote><p>master1 主机操作</p></blockquote><p><code>init_system.sh</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> /etc/yum.repos.d</span></span>
<span class="line"><span style="color:#E2931D;">rename</span><span style="color:#91B859;"> repo</span><span style="color:#91B859;"> repo.bak</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;">.repo</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> base.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">[BaseOS]</span></span>
<span class="line"><span style="color:#91B859;">name=BaseOS</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.ustc.edu.cn/rocky/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever/BaseOS/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">arch/os/</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[AppStream]</span></span>
<span class="line"><span style="color:#91B859;">name=AppStream</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.ustc.edu.cn/rocky/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever/AppStream/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">arch/os/</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[EPEL]</span></span>
<span class="line"><span style="color:#91B859;">name=Extra Packages for Enterprise Linux </span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever - </span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">basearch</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.ustc.edu.cn/epel/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever/Everything/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">basearch</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> makecache</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 关闭防火墙</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> disable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> firewalld</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 关闭selinux,这是允许容器访问主机文件系统所必需的</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/^SELINUX=/c SELINUX=disabled</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/selinux/config</span><span style="color:#90A4AE;font-style:italic;">  # 永久</span></span>
<span class="line"><span style="color:#E2931D;">setenforce</span><span style="color:#F76D47;"> 0</span><span style="color:#90A4AE;font-style:italic;">  # 临时</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 关闭交换空间</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 临时</span></span>
<span class="line"><span style="color:#E2931D;">swapoff</span><span style="color:#91B859;"> -a</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 永久</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/.*swap.*/#&amp;/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/fstab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 时间同步</span></span>
<span class="line"><span style="color:#E2931D;">timedatectl</span><span style="color:#91B859;"> set-timezone</span><span style="color:#91B859;"> Asia/Shanghai</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> chrony</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> chronyd</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> start</span><span style="color:#91B859;"> chronyd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/modules-load.d/k8s.conf</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">hoverlay</span></span>
<span class="line"><span style="color:#91B859;">br_netfilter</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#E2931D;">modprobe</span><span style="color:#91B859;"> overlay</span></span>
<span class="line"><span style="color:#E2931D;">modprobe</span><span style="color:#91B859;"> br_netfilter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 设置必需的 sysctl 参数，这些参数在重新启动后仍然存在。</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/sysctl.d/k8s.conf</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="color:#91B859;">net.bridge.bridge-nf-call-ip6tables = 1</span></span>
<span class="line"><span style="color:#91B859;">net.bridge.bridge-nf-call-iptables = 1</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 应用 sysctl 参数而无需重新启动</span></span>
<span class="line"><span style="color:#E2931D;">sysctl</span><span style="color:#91B859;"> -p</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><p><code>init.sh</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#! /bin/bash</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">hosts</span><span style="color:#39ADB5;">=(</span></span>
<span class="line"><span style="color:#91B859;">master1.zbluo.com</span></span>
<span class="line"><span style="color:#91B859;">master2.zbluo.com</span></span>
<span class="line"><span style="color:#91B859;">node1.zbluo.com</span></span>
<span class="line"><span style="color:#91B859;">node2.zbluo.com</span></span>
<span class="line"><span style="color:#39ADB5;">)</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#echo $hosts</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">color</span><span style="color:#39ADB5;">()</span><span style="color:#39ADB5;"> {</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">\\e[32m</span><span style="color:#90A4AE;">$*</span><span style="color:#91B859;">\\e[0m</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> !</span><span style="color:#39ADB5;"> -f</span><span style="color:#39ADB5;"> ~</span><span style="color:#90A4AE;">/.ssh/id_rsa </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#E2931D;">    color</span><span style="color:#91B859;"> 创建ssh密钥</span></span>
<span class="line"><span style="color:#E2931D;">    ssh-keygen</span><span style="color:#91B859;">  -N</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#91B859;"> -v</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#E2931D;"> dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> sshpass</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#39ADB5;"> \${</span><span style="color:#90A4AE;">hosts</span><span style="color:#39ADB5;">[@]:</span><span style="color:#90A4AE;">1</span><span style="color:#39ADB5;">};</span><span style="color:#39ADB5;font-style:italic;"> do</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> \${</span><span style="color:#90A4AE;">i</span><span style="color:#39ADB5;">%%</span><span style="color:#90A4AE;">.</span><span style="color:#39ADB5;">*}</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # 拷贝公钥</span></span>
<span class="line"><span style="color:#90A4AE;">    </span></span>
<span class="line"><span style="color:#39ADB5;">    (</span></span>
<span class="line"><span style="color:#E2931D;">    sshpass</span><span style="color:#91B859;"> -p</span><span style="color:#91B859;"> luozaibo</span><span style="color:#91B859;"> ssh-copy-id</span><span style="color:#91B859;"> -o</span><span style="color:#91B859;"> StrictHostKeyChecking=no</span><span style="color:#90A4AE;"> $i </span><span style="color:#39ADB5;">2&gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    scp</span><span style="color:#91B859;"> init_system.sh</span><span style="color:#90A4AE;"> $i</span><span style="color:#91B859;">:/opt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    ssh</span><span style="color:#90A4AE;"> $i </span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">hostnamectl set-hostname </span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">i</span><span style="color:#39ADB5;">%%</span><span style="color:#91B859;">.</span><span style="color:#39ADB5;">*}&quot;</span></span>
<span class="line"><span style="color:#E2931D;">    ssh</span><span style="color:#90A4AE;"> $i </span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">/opt/init_system.sh</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;">    )</span><span style="color:#39ADB5;"> &amp;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #ssh $i &quot;hostnamectl set-hostname \${i%%.*}&quot; &quot;/opt/init_system.sh&quot;</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">wait</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> done</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br></div></div><h2 id="下载rke" tabindex="-1">下载RKE <a class="header-anchor" href="#下载rke" aria-label="Permalink to &quot;下载RKE&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://github.com/rancher/rke/releases/download/v1.5.6/rke_linux-amd64</span><span style="color:#91B859;"> -O</span><span style="color:#91B859;"> /usr/local/bin/rke</span></span>
<span class="line"><span style="color:#E2931D;">chmod</span><span style="color:#91B859;"> +x</span><span style="color:#91B859;"> /usr/local/bin/rke</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 查看可使用的kubnetes版本</span></span>
<span class="line"><span style="color:#E2931D;">rke</span><span style="color:#91B859;"> config</span><span style="color:#91B859;"> -a</span><span style="color:#91B859;"> -l</span><span style="color:#90A4AE;font-style:italic;"> # -a</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="cluster-yaml" tabindex="-1">cluster.yaml <a class="header-anchor" href="#cluster-yaml" aria-label="Permalink to &quot;cluster.yaml&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">private_registries:</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> url:</span><span style="color:#91B859;"> registry.com</span></span>
<span class="line"><span style="color:#E2931D;">      user:</span><span style="color:#91B859;"> Username</span></span>
<span class="line"><span style="color:#E2931D;">      password:</span><span style="color:#91B859;"> password</span></span>
<span class="line"><span style="color:#E2931D;">      is_default:</span><span style="color:#39ADB5;"> true</span><span style="color:#90A4AE;font-style:italic;"> # All system images will be pulled using this registry.</span></span>
<span class="line"><span style="color:#90A4AE;">      </span></span>
<span class="line"><span style="color:#E2931D;"> cluster_name:</span><span style="color:#91B859;"> mycluster</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,12),o=[e];function r(c,t,i,b,y,m){return a(),n("div",null,o)}const A=s(p,[["render",r]]);export{B as __pageData,A as default};
