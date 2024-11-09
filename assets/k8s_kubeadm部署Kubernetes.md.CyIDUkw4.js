import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"kubeadm部署Kubernetes","description":"","frontmatter":{},"headers":[],"relativePath":"k8s/kubeadm部署Kubernetes.md","filePath":"k8s/kubeadm部署Kubernetes.md"}'),p={name:"k8s/kubeadm部署Kubernetes.md"},e=l(`<h1 id="kubeadm部署kubernetes" tabindex="-1">kubeadm部署Kubernetes <a class="header-anchor" href="#kubeadm部署kubernetes" aria-label="Permalink to &quot;kubeadm部署Kubernetes&quot;">​</a></h1><h2 id="系统初始化" tabindex="-1">系统初始化 <a class="header-anchor" href="#系统初始化" aria-label="Permalink to &quot;系统初始化&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 根据规划设置主机名</span></span>
<span class="line"><span style="color:#E2931D;">hostnamectl</span><span style="color:#91B859;"> set-hostname</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">hostnam</span><span style="color:#90A4AE;">e</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 在master添加hosts</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> /etc/hosts</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">192.168.44.146 k8s-master</span></span>
<span class="line"><span style="color:#91B859;">192.168.44.145 k8s-node1</span></span>
<span class="line"><span style="color:#91B859;">192.168.44.144 k8s-node2</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 关闭防火墙</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> disable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> firewalld</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 关闭selinux,这是允许容器访问主机文件系统所必需的</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/^SELINUX=/c SELINUX=disabled</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/selinux/config</span><span style="color:#90A4AE;font-style:italic;">  # 永久</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># setenforce 0  # 临时</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 关闭交换空间</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 临时</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># swapoff -a</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 永久</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/.*swap.*/#&amp;/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/fstab</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 时间同步</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> chronyd</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> chronyd</span></span>
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
<span class="line"><span style="color:#E2931D;">sysctl</span><span style="color:#91B859;"> --system</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 验证</span></span>
<span class="line"><span style="color:#E2931D;">lsmod</span><span style="color:#39ADB5;"> |</span><span style="color:#E2931D;"> grep</span><span style="color:#91B859;"> br_netfilter</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h2 id="安装docker环境" tabindex="-1">安装docker环境 <a class="header-anchor" href="#安装docker环境" aria-label="Permalink to &quot;安装docker环境&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://mirrors.aliyun.com/docker-ce/linux/rhel/docker-ce.repo</span><span style="color:#91B859;"> -O</span><span style="color:#91B859;"> /etc/yum.repos.d/docker-ce.repo</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> docker-ce</span><span style="color:#91B859;"> docker-ce-cli</span><span style="color:#91B859;"> docker-buildx-plugin</span><span style="color:#91B859;"> docker-compose</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改配置</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/docker/daemon.json</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">{</span></span>
<span class="line"><span style="color:#91B859;">  &quot;registry-mirrors&quot;: [&quot;https://qmaqgl5w.mirror.aliyuncs.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">  &quot;insecure-registries&quot;: [&quot;harbor.zbluo.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">  &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]</span></span>
<span class="line"><span style="color:#91B859;">}</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> docker</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># docker info | grep -i cgroup</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="设置容器运行时docker" tabindex="-1">设置容器运行时docker <a class="header-anchor" href="#设置容器运行时docker" aria-label="Permalink to &quot;设置容器运行时docker&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.11/cri-dockerd-0.3.11-3.el8.x86_64.rpm</span></span>
<span class="line"><span style="color:#E2931D;">rpm</span><span style="color:#91B859;"> -ivh</span><span style="color:#91B859;"> cri-dockerd-0.3.11-3.el8.x86_64.rpm</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> daemon-reload</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> cri-docker</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="安装kubeadm-kubelet-kubectl" tabindex="-1">安装kubeadm,kubelet,kubectl <a class="header-anchor" href="#安装kubeadm-kubelet-kubectl" aria-label="Permalink to &quot;安装kubeadm,kubelet,kubectl&quot;">​</a></h2><blockquote><p>在所有主机上安装kubeadm，kubelet，kubectl。最好版本与需要安装的k8s的版本一致。</p><p><a href="https://developer.aliyun.com/mirror/kubernetes" target="_blank" rel="noreferrer">https://developer.aliyun.com/mirror/kubernetes</a></p><p>目前该源支持 v1.24 - v1.29 版本</p></blockquote><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/yum.repos.d/kubernetes.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">[kubernetes]</span></span>
<span class="line"><span style="color:#91B859;">name=Kubernetes</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.27/rpm/</span></span>
<span class="line"><span style="color:#91B859;">enabled=1</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#91B859;">gpgkey=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.27/rpm/repodata/repomd.xml.key</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># dnf install -y kubelet kubeadm kubectl</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> kubeadm-1.27.12</span><span style="color:#91B859;"> kubectl-1.27.12</span><span style="color:#91B859;"> kubelet-1.27.12</span><span style="color:#91B859;"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果警告 tc not found in system path</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> iproute-tc</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="配置harbor仓库" tabindex="-1">配置Harbor仓库 <a class="header-anchor" href="#配置harbor仓库" aria-label="Permalink to &quot;配置Harbor仓库&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;">server</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">10.0.0.30:80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">docker</span><span style="color:#91B859;"> login</span><span style="color:#91B859;"> -uadmin</span><span style="color:#91B859;"> -pHarbor12345</span><span style="color:#90A4AE;"> $server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">images</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> config images list --kubernetes-version=1.25.0 </span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;"> awk</span><span style="color:#91B859;"> -F/ </span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">{print $NF}</span><span style="color:#39ADB5;">&#39;\`</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $images</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> pull</span><span style="color:#91B859;"> registry.aliyuncs.com/google_containers/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> tag</span><span style="color:#91B859;"> registry.aliyuncs.com/google_containers/</span><span style="color:#90A4AE;">$i $server</span><span style="color:#91B859;">/google_containers/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> push</span><span style="color:#90A4AE;"> $server</span><span style="color:#91B859;">/google_containers/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # docker rmi registry.aliyuncs.com/google_containers/$i</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="使用kubeadm初始化" tabindex="-1">使用kubeadm初始化 <a class="header-anchor" href="#使用kubeadm初始化" aria-label="Permalink to &quot;使用kubeadm初始化&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 预先拉取所需镜像</span></span>
<span class="line"><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> config</span><span style="color:#91B859;"> images</span><span style="color:#91B859;"> pull</span><span style="color:#91B859;"> --image-repository</span><span style="color:#91B859;"> registry.aliyuncs.com/google_containers</span><span style="color:#91B859;"> --cri-socket</span><span style="color:#91B859;"> unix:///run/cri-dockerd.sock</span></span>
<span class="line"><span style="color:#90A4AE;">	</span></span>
<span class="line"><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> init</span><span style="color:#91B859;"> --pod-network-cidr=10.244.0.0/16</span><span style="color:#91B859;"> --image-repository=harbor.zbluo.com/google_containers</span><span style="color:#91B859;"> --cri-socket=unix:///run/cri-dockerd.sock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 初始化完成后</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 普通用户</span></span>
<span class="line"><span style="color:#E2931D;"> mkdir</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;"> $HOME</span><span style="color:#91B859;">/.kube</span></span>
<span class="line"><span style="color:#E2931D;"> sudo</span><span style="color:#91B859;"> cp</span><span style="color:#91B859;"> -i</span><span style="color:#91B859;"> /etc/kubernetes/admin.conf</span><span style="color:#90A4AE;"> $HOME</span><span style="color:#91B859;">/.kube/config</span></span>
<span class="line"><span style="color:#E2931D;"> sudo</span><span style="color:#91B859;"> chown</span><span style="color:#39ADB5;"> $(</span><span style="color:#E2931D;">id</span><span style="color:#91B859;"> -u</span><span style="color:#39ADB5;">)</span><span style="color:#91B859;">:</span><span style="color:#39ADB5;">$(</span><span style="color:#E2931D;">id</span><span style="color:#91B859;"> -g</span><span style="color:#39ADB5;">)</span><span style="color:#90A4AE;"> $HOME</span><span style="color:#91B859;">/.kube/config</span></span>
<span class="line"><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># root用户</span></span>
<span class="line"><span style="color:#9C3EDA;">export</span><span style="color:#90A4AE;"> KUBECONFIG</span><span style="color:#39ADB5;">=</span><span style="color:#90A4AE;">/etc/kubernetes/admin.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># node上运行</span></span>
<span class="line"><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> join</span><span style="color:#91B859;"> 10.1.1.1:6443</span><span style="color:#91B859;"> --token</span><span style="color:#91B859;"> 5hesag.gfycno0v21e9aded</span><span style="color:#91B859;"> --discovery-token-ca-cert-hash</span><span style="color:#91B859;"> sha256:14ddac021157b997541d43acd08145df9b11e3185d2c1d4f63d0a7bb5bffe192</span><span style="color:#91B859;"> cri-socket</span><span style="color:#91B859;"> unix:///var/run/cri-dockerd.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="安装网络插件fannel" tabindex="-1">安装网络插件Fannel <a class="header-anchor" href="#安装网络插件fannel" aria-label="Permalink to &quot;安装网络插件Fannel&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># Deploying Flannel with kubectl</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># kubectl apply -f https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 确认集群状态</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> get</span><span style="color:#91B859;"> nodes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 下载 Flannel 配置</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 检查部署状态</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> get</span><span style="color:#91B859;"> pods</span><span style="color:#91B859;"> -n</span><span style="color:#91B859;"> kube-system</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">docker</span><span style="color:#91B859;"> login</span><span style="color:#91B859;"> -uadmin</span><span style="color:#91B859;"> -pHarbor12345</span><span style="color:#91B859;"> harbor.k8s.com</span></span>
<span class="line"><span style="color:#90A4AE;">images</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">awk</span><span style="color:#91B859;"> -F</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">docker.io/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/image:/{print $2}</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> kube-flannel.yml </span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;"> head</span><span style="color:#91B859;"> -2</span><span style="color:#39ADB5;">\`</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $images</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> pull</span><span style="color:#90A4AE;"> $i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> tag</span><span style="color:#90A4AE;"> $i </span><span style="color:#91B859;">harbor.k8s.com/k8s/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> push</span><span style="color:#91B859;"> harbor.k8s.com/k8s/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改为自己的仓库</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/docker.io\\/harbor.k8s.com\\/k8s/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> kube-flannel.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 应用配置文件</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> apply</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> kube-flannel.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#namespace/kube-flannel created</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#serviceaccount/flannel created</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#clusterrole.rbac.authorization.k8s.io/flannel created</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#clusterrolebinding.rbac.authorization.k8s.io/flannel created</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#configmap/kube-flannel-cfg created</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#daemonset.apps/kube-flannel-ds created</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="master安装脚本" tabindex="-1">master安装脚本 <a class="header-anchor" href="#master安装脚本" aria-label="Permalink to &quot;master安装脚本&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">color</span><span style="color:#39ADB5;">(){</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">\\033[32m</span><span style="color:#90A4AE;">$*</span><span style="color:#91B859;">\\033[0m</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># set -e</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 系统环境设置</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 根据规划设置主机名</span></span>
<span class="line"><span style="color:#E2931D;">hostnamectl</span><span style="color:#91B859;"> set-hostname</span><span style="color:#91B859;"> k8s-master</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 在master添加hosts</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> /etc/hosts</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.11 k8s-master</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.12 k8s-node1</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.13 k8s-node2</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.30 harbor.k8s.com</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
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
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> chrony</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> chronyd</span></span>
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
<span class="line"><span style="color:#E2931D;">sysctl</span><span style="color:#91B859;"> --system</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># docker安装</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装docker</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;"> -nv</span><span style="color:#91B859;"> https://mirrors.aliyun.com/docker-ce/linux/rhel/docker-ce.repo</span><span style="color:#91B859;"> -O</span><span style="color:#91B859;"> /etc/yum.repos.d/docker-ce.repo</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> docker-ce</span><span style="color:#91B859;"> docker-ce-cli</span><span style="color:#91B859;"> docker-buildx-plugin</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改配置</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/docker/daemon.json</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">{</span></span>
<span class="line"><span style="color:#91B859;">  &quot;registry-mirrors&quot;: [&quot;https://qmaqgl5w.mirror.aliyuncs.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">  &quot;insecure-registries&quot;: [&quot;harbor.k8s.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">  &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]</span></span>
<span class="line"><span style="color:#91B859;">}</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装cri-dockerd</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># cri</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># wget https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.11/cri-dockerd-0.3.11-3.el8.x86_64.rpm</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;"> -nv</span><span style="color:#91B859;"> http://10.0.0.10/linux/cri-dockerd-0.3.11-3.el8.x86_64.rpm</span></span>
<span class="line"><span style="color:#E2931D;">rpm</span><span style="color:#91B859;"> -ivh</span><span style="color:#91B859;"> cri-dockerd-0.3.11-3.el8.x86_64.rpm</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/(^ExecStart.*$)/\\1 --pod-infra-container-image harbor.k8s.com\\/google_containers\\/pause:3.9/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /lib/systemd/system/cri-docker.service</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> daemon-reload</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> cri-docker</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 安装kubeadm,kubelet,kubectl</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装kubeadm</span><span style="color:#91B859;"> kubelet</span><span style="color:#91B859;"> kubectl</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/yum.repos.d/kubernetes.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">[kubernetes]</span></span>
<span class="line"><span style="color:#91B859;">name=Kubernetes</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/rpm/</span></span>
<span class="line"><span style="color:#91B859;">enabled=1</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#91B859;">gpgkey=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/rpm/repodata/repomd.xml.key</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> kubelet-1.28.0</span><span style="color:#91B859;"> kubeadm-1.28.0</span><span style="color:#91B859;"> kubectl-1.28.0</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> kubelet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># bash补全</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">source &lt;(kubectl completion bash)</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 还可以在补全时为 kubectl 使用一个速记别名</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">alias k=kubectl</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">complete -o default -F __start_kubectl k</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"><span style="color:#6182B8;">source</span><span style="color:#91B859;"> ~/.bashrc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果警告 tc not found in system path</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> iproute-tc</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># master初始化</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 预先拉取所需镜像</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 拉取镜像</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#kubeadm config images pull --image-repository registry.aliyuncs.com/google_containers --cri-socket unix:///run/cri-dockerd.sock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 设置pause镜像,否则还是会从 registry.k8s.io 来拉取</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#docker tag registry.aliyuncs.com/google_containers/pause:3.9 registry.k8s.io/pause:3.9</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 初始化master节点</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#kubeadm init --pod-network-cidr=10.244.0.0/16 --image-repository=registry.aliyuncs.com/google_containers --cri-socket=unix:///run/cri-dockerd.sock</span></span>
<span class="line"><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> init</span><span style="color:#91B859;"> --apiserver-advertise-address</span><span style="color:#F76D47;"> 10.0.0.11</span><span style="color:#91B859;"> --kubernetes-version</span><span style="color:#F76D47;"> 1.28.0</span><span style="color:#91B859;"> --pod-network-cidr</span><span style="color:#91B859;"> 10.244.0.0/16</span><span style="color:#91B859;"> --image-repository</span><span style="color:#91B859;"> harbor.k8s.com/google_containers</span><span style="color:#91B859;"> --cri-socket</span><span style="color:#91B859;"> unix:///run/cri-dockerd.sock</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;"> mkdir</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;"> $HOME</span><span style="color:#91B859;">/.kube</span></span>
<span class="line"><span style="color:#E2931D;"> cp</span><span style="color:#91B859;"> -i</span><span style="color:#91B859;"> /etc/kubernetes/admin.conf</span><span style="color:#90A4AE;"> $HOME</span><span style="color:#91B859;">/.kube/config</span></span>
<span class="line"><span style="color:#E2931D;"> chown</span><span style="color:#39ADB5;"> $(</span><span style="color:#E2931D;">id</span><span style="color:#91B859;"> -u</span><span style="color:#39ADB5;">)</span><span style="color:#91B859;">:</span><span style="color:#39ADB5;">$(</span><span style="color:#E2931D;">id</span><span style="color:#91B859;"> -g</span><span style="color:#39ADB5;">)</span><span style="color:#90A4AE;"> $HOME</span><span style="color:#91B859;">/.kube/config</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br></div></div><h2 id="node安装" tabindex="-1">node安装 <a class="header-anchor" href="#node安装" aria-label="Permalink to &quot;node安装&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">color</span><span style="color:#39ADB5;">(){</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">\\033[32m</span><span style="color:#90A4AE;">$*</span><span style="color:#91B859;">\\033[0m</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># set -e</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 系统环境设置</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 根据规划设置主机名</span></span>
<span class="line"><span style="color:#E2931D;">hostnamectl</span><span style="color:#91B859;"> set-hostname</span><span style="color:#91B859;"> k8s-node1</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 在master添加hosts</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> /etc/hosts</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.11 k8s-master</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.12 k8s-node1</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.13 k8s-node2</span></span>
<span class="line"><span style="color:#91B859;">10.0.0.30 harbor.k8s.com</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
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
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> chrony</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> chronyd</span></span>
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
<span class="line"><span style="color:#E2931D;">sysctl</span><span style="color:#91B859;"> --system</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># docker安装</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装docker</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;"> -nv</span><span style="color:#91B859;"> https://mirrors.aliyun.com/docker-ce/linux/rhel/docker-ce.repo</span><span style="color:#91B859;"> -O</span><span style="color:#91B859;"> /etc/yum.repos.d/docker-ce.repo</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> docker-ce</span><span style="color:#91B859;"> docker-ce-cli</span><span style="color:#91B859;"> docker-buildx-plugin</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改配置</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/docker/daemon.json</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">{</span></span>
<span class="line"><span style="color:#91B859;">  &quot;registry-mirrors&quot;: [&quot;https://qmaqgl5w.mirror.aliyuncs.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">  &quot;insecure-registries&quot;: [&quot;harbor.k8s.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">  &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]</span></span>
<span class="line"><span style="color:#91B859;">}</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装cri-dockerd</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># cri</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># wget https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.11/cri-dockerd-0.3.11-3.el8.x86_64.rpm</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;"> -nv</span><span style="color:#91B859;"> http://10.0.0.10/linux/cri-dockerd-0.3.11-3.el8.x86_64.rpm</span></span>
<span class="line"><span style="color:#E2931D;">rpm</span><span style="color:#91B859;"> -ivh</span><span style="color:#91B859;"> cri-dockerd-0.3.11-3.el8.x86_64.rpm</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/(^ExecStart.*$)/\\1 --pod-infra-container-image harbor.k8s.com\\/google_containers\\/pause:3.9/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /lib/systemd/system/cri-docker.service</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> daemon-reload</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> cri-docker</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 安装kubeadm,kubelet,kubectl</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装kubeadm</span><span style="color:#91B859;"> kubelet</span><span style="color:#91B859;"> kubectl</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/yum.repos.d/kubernetes.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">[kubernetes]</span></span>
<span class="line"><span style="color:#91B859;">name=Kubernetes</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/rpm/</span></span>
<span class="line"><span style="color:#91B859;">enabled=1</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#91B859;">gpgkey=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/rpm/repodata/repomd.xml.key</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> kubelet-1.28.0</span><span style="color:#91B859;"> kubeadm-1.28.0</span><span style="color:#91B859;"> kubectl-1.28.0</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> kubelet</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># bash补全</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">source &lt;(kubectl completion bash)</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 还可以在补全时为 kubectl 使用一个速记别名</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">alias k=kubectl</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">complete -o default -F __start_kubectl k</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"><span style="color:#6182B8;">source</span><span style="color:#91B859;"> ~/.bashrc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># --cri-socket unix:///run/cri-dockerd.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br></div></div>`,20),o=[e];function r(c,t,i,b,y,u){return a(),n("div",null,o)}const d=s(p,[["render",r]]);export{B as __pageData,d as default};
