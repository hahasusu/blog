import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{"date":"2024-03-26 10:51:42"},"headers":[],"relativePath":"k8s/kubeasz部署k8s.md","filePath":"k8s/kubeasz部署k8s.md"}'),p={name:"k8s/kubeasz部署k8s.md"},e=l(`<h2 id="网络环境" tabindex="-1">网络环境 <a class="header-anchor" href="#网络环境" aria-label="Permalink to &quot;网络环境&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">节点网络:</span><span style="color:#91B859;"> 10.1.0.0/16</span></span>
<span class="line"><span style="color:#E2931D;">pod网络:</span><span style="color:#91B859;"> 10.244.0.0/16</span></span>
<span class="line"><span style="color:#E2931D;">service网络:</span><span style="color:#91B859;"> 10.96.0.0/16</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><table tabindex="0"><thead><tr><th>IP</th><th>主机名</th><th>角色</th></tr></thead><tbody><tr><td>10.1.1.1</td><td>master1.zbluo.com</td><td>主节点1，Master、etcd</td></tr><tr><td>10.1.1.2</td><td>master2.zbluo.com</td><td>主节点2，Master 和 etcd</td></tr><tr><td>10.1.1.11</td><td>node1.zbluo.com</td><td>工作节点1</td></tr><tr><td>10.1.1.12</td><td>node2.zbluo.com</td><td>工作节点2</td></tr><tr><td>10.1.1.13</td><td>node3.zbluo.com</td><td>工作节点3</td></tr><tr><td>10.0.0.30</td><td>harbor.zbluo.com</td><td>容器镜像仓库</td></tr></tbody></table><p>| 10.0.0.10 | | Ansible |</p><h2 id="配置ssh认证" tabindex="-1">配置ssh认证 <a class="header-anchor" href="#配置ssh认证" aria-label="Permalink to &quot;配置ssh认证&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 利用sshpass批量实现基于key验证脚本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">password</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">luozaibo</span></span>
<span class="line"><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">zbluo.com</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#91B859;"> -v</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">install sshpass</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;">;</span><span style="color:#E2931D;"> dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#39ADB5;"> -f</span><span style="color:#39ADB5;"> ~</span><span style="color:#90A4AE;">/.ssh/id_rsa </span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> ssh-keygen</span><span style="color:#91B859;"> -N</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">ips</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.1</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.2</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.11</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.12</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.13</span></span>
<span class="line"><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $ips</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#90A4AE;"> $i</span></span>
<span class="line"><span style="color:#39ADB5;">    {</span><span style="color:#E2931D;"> sshpass</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;"> $password </span><span style="color:#91B859;">ssh-copy-id</span><span style="color:#91B859;"> -o</span><span style="color:#91B859;"> StrictHostKeyChecking=no</span><span style="color:#90A4AE;"> $i</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span><span style="color:#39ADB5;"> &amp;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"><span style="color:#6182B8;">wait</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 添加yum 仓库</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> base.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
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
<span class="line"><span style="color:#91B859;">name=EPEL</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.ustc.edu.cn/epel/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever/Everything/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">basearch</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $ips</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#E2931D;">    scp</span><span style="color:#91B859;"> base.repo</span><span style="color:#90A4AE;"> $i</span><span style="color:#91B859;">:/etc/yum.repos.d/base.repo</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # 安装Python3.11(可选)</span></span>
<span class="line"><span style="color:#E2931D;">    ssh</span><span style="color:#90A4AE;"> $i </span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">find /etc/yum.repos.d -type f -name &quot;*.repo&quot; ! -name &quot;base.repo&quot; | xargs -r rename repo &quot;repo.bak&quot; \\</span></span>
<span class="line"><span style="color:#91B859;">            &amp;&amp; dnf makecache \\</span></span>
<span class="line"><span style="color:#91B859;">            &amp;&amp; dnf install -y python3.11 python3.11-pip &gt; /dev/null \\</span></span>
<span class="line"><span style="color:#91B859;">            &amp;&amp; pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">rm</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> base.repo</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div>`,6),o=[e];function r(c,t,i,b,y,m){return a(),n("div",null,o)}const A=s(p,[["render",r]]);export{d as __pageData,A as default};
