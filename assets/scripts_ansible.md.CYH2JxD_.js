import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"","description":"","frontmatter":{"date":"2024-03-24 12:23:14"},"headers":[],"relativePath":"scripts/ansible.md","filePath":"scripts/ansible.md"}'),p={name:"scripts/ansible.md"},e=l(`<h2 id="ssh批量认证" tabindex="-1">ssh批量认证 <a class="header-anchor" href="#ssh批量认证" aria-label="Permalink to &quot;ssh批量认证&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 利用sshpass批量实现基于key验证脚本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">password</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">123456</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#91B859;"> -v</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">install sshpass</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;">;</span><span style="color:#E2931D;"> dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#39ADB5;"> -f</span><span style="color:#39ADB5;"> ~</span><span style="color:#90A4AE;">/.ssh/id_rsa </span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> ssh-keygen</span><span style="color:#91B859;"> -N</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">ips</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.1</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.2</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.11</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.12</span></span>
<span class="line"><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $ips</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#90A4AE;"> $i</span></span>
<span class="line"><span style="color:#39ADB5;">    {</span><span style="color:#E2931D;"> sshpass</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;"> $password </span><span style="color:#91B859;">ssh-copy-id</span><span style="color:#91B859;"> -o</span><span style="color:#91B859;"> StrictHostKeyChecking=no</span><span style="color:#90A4AE;"> $i</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span><span style="color:#39ADB5;"> &amp;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"><span style="color:#6182B8;">wait</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="修改主机名" tabindex="-1">修改主机名 <a class="header-anchor" href="#修改主机名" aria-label="Permalink to &quot;修改主机名&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># hosts</span></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">servers</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#E2931D;">master[1:2].test.com</span></span>
<span class="line"><span style="color:#E2931D;">node[1:2].test.com</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> servers</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 修改主机名</span></span>
<span class="line"><span style="color:#E53935;">      hostname</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> name={{ inventory_hostname.split(&#39;.&#39;)[0] }}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="添加yum-仓库" tabindex="-1">添加yum 仓库 <a class="header-anchor" href="#添加yum-仓库" aria-label="Permalink to &quot;添加yum 仓库&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 添加阿里仓库</span></span>
<span class="line"><span style="color:#E53935;">  hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> cluster</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
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
<span class="line"><span style="color:#E53935;">        gpgcheck</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="修改内核参数等" tabindex="-1">修改内核参数等 <a class="header-anchor" href="#修改内核参数等" aria-label="Permalink to &quot;修改内核参数等&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> cluster</span></span>
<span class="line"><span style="color:#E53935;">  remote_user</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> root</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
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
<span class="line"><span style="color:#91B859;">          sysctl -p</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h2 id="安装docker" tabindex="-1">安装docker <a class="header-anchor" href="#安装docker" aria-label="Permalink to &quot;安装docker&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 安装docker</span></span>
<span class="line"><span style="color:#E53935;">  hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> cluster</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span>
<span class="line"><span style="color:#E53935;">  vars</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    docker_version</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">24.0.0</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> check docker is or not installed</span></span>
<span class="line"><span style="color:#E53935;">      shell</span><span style="color:#39ADB5;">:</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E53935;">        cmd</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> docker -v</span></span>
<span class="line"><span style="color:#E53935;">      register</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> is_install</span></span>
<span class="line"><span style="color:#E53935;">      failed_when</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> is_install.stderr != &#39;&#39;</span></span>
<span class="line"><span style="color:#E53935;">      ignore_errors</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> yes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      #</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #- debug: msg=is_install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 卸载docker</span></span>
<span class="line"><span style="color:#E53935;">      dnf</span><span style="color:#39ADB5;">:</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">{{ item }}</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E53935;">        loop</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> [</span><span style="color:#91B859;"> docker</span><span style="color:#39ADB5;">,</span><span style="color:#91B859;"> docker-client</span><span style="color:#39ADB5;">,</span><span style="color:#91B859;"> docker-common</span><span style="color:#39ADB5;">,</span><span style="color:#91B859;"> docker-engine</span><span style="color:#39ADB5;">,</span><span style="color:#91B859;"> docker-client-latest</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#E53935;">        state</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> absent</span></span>
<span class="line"><span style="color:#E53935;">      ignore_errors</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> yes</span></span>
<span class="line"><span style="color:#E53935;">      when</span><span style="color:#39ADB5;">:</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#39ADB5;">        -</span><span style="color:#91B859;"> is_install.stdout != &#39;&#39;</span></span>
<span class="line"><span style="color:#39ADB5;">        -</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">docker_version not in is_install.stdout</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #    - name: 停止docker</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #      systemd_service:</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #        name: docker</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #        state: stopped</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #        ignore_errors: yes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #        daemon_reload: yes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #        daemon_reexec: yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #- fail: msg=手动退出</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 添加docker仓库</span></span>
<span class="line"><span style="color:#E53935;">      get_url</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        url</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span>
<span class="line"><span style="color:#E53935;">        dest</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /etc/yum.repos.d/docker-ce.repo</span></span>
<span class="line"><span style="color:#E53935;">        force</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 安装docker及其依赖</span></span>
<span class="line"><span style="color:#E53935;">      dnf</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> name={{ item }}</span></span>
<span class="line"><span style="color:#E53935;">      loop</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">        -</span><span style="color:#91B859;"> docker-ce-{{ docker_version }}</span></span>
<span class="line"><span style="color:#39ADB5;">        -</span><span style="color:#91B859;"> docker-ce-cli-{{ docker_version }}</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #- docker-buildx-plugin</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">          #- docker-compose-plugin</span></span>
<span class="line"><span style="color:#E53935;">      when</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">docker_version not in is_install.stdout</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 添加用户</span></span>
<span class="line"><span style="color:#E53935;">      user</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> docker</span></span>
<span class="line"><span style="color:#E53935;">        group</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 创建daemon.json</span></span>
<span class="line"><span style="color:#E53935;">      shell</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        cmd</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;font-style:italic;"> |</span></span>
<span class="line"><span style="color:#91B859;">          cat &gt; /etc/docker/daemon.json &lt;&lt;EOF</span></span>
<span class="line"><span style="color:#91B859;">          {</span></span>
<span class="line"><span style="color:#91B859;">            &quot;registry-mirrors&quot;: [&quot;https://qmaqgl5w.mirror.aliyuncs.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">            &quot;insecure-registries&quot;: [&quot;harbor.zbluo.com&quot;, &quot;10.0.0.30&quot;],</span></span>
<span class="line"><span style="color:#91B859;">            &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]</span></span>
<span class="line"><span style="color:#91B859;">          }</span></span>
<span class="line"><span style="color:#91B859;">          EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 设置开机启动</span></span>
<span class="line"><span style="color:#E53935;">      systemd_service</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> docker</span></span>
<span class="line"><span style="color:#E53935;">        enabled</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">        state</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> started</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> check docker status</span></span>
<span class="line"><span style="color:#E53935;">      shell</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        cmd</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> systemctl is-active docker</span></span>
<span class="line"><span style="color:#E53935;">      register</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> status</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      #register: status</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> debug</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> msg={{ status.stdout }}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br></div></div><h2 id="安装cri-dockerd" tabindex="-1">安装cri-dockerd <a class="header-anchor" href="#安装cri-dockerd" aria-label="Permalink to &quot;安装cri-dockerd&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> all</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"><span style="color:#E53935;">  vars</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    cri</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">cri-dockerd-0.3.11-3.el8.x86_64.rpm</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 下载cri-dockerd 到本机</span></span>
<span class="line"><span style="color:#E53935;">      get_url</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        url</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.11/{{ cri }}</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E53935;">        dest</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /opt/{{ cri }}</span></span>
<span class="line"><span style="color:#E53935;">        force</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> scp到其它主机</span></span>
<span class="line"><span style="color:#E53935;">      copy</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        src</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /opt/{{ cri }}</span></span>
<span class="line"><span style="color:#E53935;">        dest</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> /opt/{{ cri }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> install cri-docker</span></span>
<span class="line"><span style="color:#E53935;">      shell</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        cmd</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> rpm -ivh /opt/{{ cri }}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="重启服务" tabindex="-1">重启服务 <a class="header-anchor" href="#重启服务" aria-label="Permalink to &quot;重启服务&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">-</span><span style="color:#E53935;"> hosts</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> all</span></span>
<span class="line"><span style="color:#E53935;">  gather_facts</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> no</span></span>
<span class="line"><span style="color:#E53935;">  vars</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    service</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> chronyd</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  tasks</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> restart {{ service }}</span></span>
<span class="line"><span style="color:#E53935;">      systemd_service</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">        name</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">{{ service }}</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E53935;">        state</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> restarted</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>`,15),o=[e];function r(c,t,i,y,b,m){return a(),n("div",null,o)}const d=s(p,[["render",r]]);export{B as __pageData,d as default};
