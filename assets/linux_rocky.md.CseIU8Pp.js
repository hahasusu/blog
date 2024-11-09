import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"linux/rocky.md","filePath":"linux/rocky.md"}'),p={name:"linux/rocky.md"},e=l(`<h2 id="rocky8-使用" tabindex="-1">Rocky8 使用 <a class="header-anchor" href="#rocky8-使用" aria-label="Permalink to &quot;Rocky8 使用&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">简介</p><p>Rocky Linux是CentOS的一个分支，它位于Red Hat Enterprise Linux（RHEL）的下游。与CentOS一样，它提供了非常适合服务器的稳定版Linux。它旨在作为CentOS的完全兼容替代品。</p></div><p>下载主页: <a href="https://www.rockylinux.org/download/" target="_blank" rel="noreferrer">https://www.rockylinux.org/download/</a></p><p><a href="https://download.rockylinux.org/pub/rocky/8.8/isos/x86_64/Rocky-8.8-x86_64-minimal.iso" target="_blank" rel="noreferrer">Rocky8.8下载</a></p><p>命令行下载：</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://download.rockylinux.org/pub/rocky/8.8/isos/x86_64/Rocky-8.8-x86_64-minimal.iso</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="网络配置" tabindex="-1">网络配置 <a class="header-anchor" href="#网络配置" aria-label="Permalink to &quot;网络配置&quot;">​</a></h2><p><code>systemctl status NetworkManager</code></p><blockquote><p>NetworkManager 将从以下位置读取配置： /etc/sysconfig/network-scripts/ifcfg-&lt;IFACE_NAME&gt;. 每个网络接口都有自己的配置文件。</p></blockquote><p>以下是服务器默认的配置示例</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;">TYPE</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">Ethernet</span></span>
<span class="line"><span style="color:#90A4AE;">PROXY_METHOD</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">none</span></span>
<span class="line"><span style="color:#90A4AE;">BROWSER_ONLY</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">no</span></span>
<span class="line"><span style="color:#90A4AE;">BOOTPROTO</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">none</span></span>
<span class="line"><span style="color:#90A4AE;">DEFROUTE</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">yes</span></span>
<span class="line"><span style="color:#90A4AE;">IPV4_FAILURE_FATAL</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">no</span></span>
<span class="line"><span style="color:#90A4AE;">IPV6INIT</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">no</span></span>
<span class="line"><span style="color:#90A4AE;">NAME</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">enp1s0</span></span>
<span class="line"><span style="color:#90A4AE;">UUID</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">74c5ccee-c1f4-4f45-883f-fc4f765a8477</span></span>
<span class="line"><span style="color:#90A4AE;">DEVICE</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">enp1s0</span></span>
<span class="line"><span style="color:#90A4AE;">ONBOOT</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">yes</span></span>
<span class="line"><span style="color:#90A4AE;">IPADDR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">10.0.0.10</span></span>
<span class="line"><span style="color:#90A4AE;">PREFIX</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">24</span></span>
<span class="line"><span style="color:#90A4AE;">GATEWAY</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">10.0.0.1</span></span>
<span class="line"><span style="color:#90A4AE;">DNS1</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">10.0.0.1</span></span>
<span class="line"><span style="color:#90A4AE;">DNS2</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">1.1.1.1</span></span>
<span class="line"><span style="color:#90A4AE;">IPV6_DISABLED</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改</span></span>
<span class="line"><span style="color:#90A4AE;">BOOTPROTO</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">static</span></span>
<span class="line"><span style="color:#90A4AE;">ONBOOT</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">yes</span></span>
<span class="line"><span style="color:#90A4AE;">IPADDR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">192.168.1.100</span></span>
<span class="line"><span style="color:#90A4AE;">PREFIX</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">24</span></span>
<span class="line"><span style="color:#90A4AE;">GATEWAY</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">192.168.1.1</span></span>
<span class="line"><span style="color:#90A4AE;">DNS1</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">223.5.5.5</span></span>
<span class="line"><span style="color:#90A4AE;">DNS2</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">8.8.8.8</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="仓库源" tabindex="-1">仓库源 <a class="header-anchor" href="#仓库源" aria-label="Permalink to &quot;仓库源&quot;">​</a></h2><p><strong>中科大</strong></p><p>centos 各版本：<a href="https://mirrors.ustc.edu.cn/centos/" target="_blank" rel="noreferrer">https://mirrors.ustc.edu.cn/centos/</a></p><p>epel: <a href="https://mirrors.ustc.edu.cn/epel/" target="_blank" rel="noreferrer">https://mirrors.ustc.edu.cn/epel/</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">BaseOS</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">name</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">BaseOS</span></span>
<span class="line"><span style="color:#90A4AE;">baseurl</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">https://mirrors.ustc.edu.cn/centos/8-stream/BaseOS/x86_64/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">AppStream</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">name</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">AppStream</span></span>
<span class="line"><span style="color:#90A4AE;">baseurl</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">https://mirrors.ustc.edu.cn/centos/8-stream/AppStream/x86_64/os/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">EPEL</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">name</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">EPEL</span></span>
<span class="line"><span style="color:#90A4AE;">baseurl</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">https://mirrors.ustc.edu.cn/epel/8/Everything/x86_64/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>阿里云</strong> centos 各版本：<a href="https://mirrors.aliyun.com/centos/" target="_blank" rel="noreferrer">https://mirrors.aliyun.com/centos/</a></p><p>epel: <a href="https://mirrors.aliyun.com/epel/" target="_blank" rel="noreferrer">https://mirrors.aliyun.com/epel/</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">BaseOS</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">name</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">BaseOS</span></span>
<span class="line"><span style="color:#90A4AE;">baseurl</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">https://mirrors.aliyun.com/centos/8-stream/BaseOS/x86_64/os/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">AppStream</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">name</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">AppStream</span></span>
<span class="line"><span style="color:#90A4AE;">baseurl</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">https://mirrors.aliyun.com/centos/8-stream/AppStream/x86_64/os/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">EPEL</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">name</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">EPEL</span></span>
<span class="line"><span style="color:#90A4AE;">baseurl</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">https://mirrors.aliyun.com/epel/8/Everything/x86_64/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>以上命令只替换了默认启用的仓库。替换之后请运行 <code>dnf makecache</code> 更新缓存。</p>`,20),r=[e];function o(c,t,i,y,A,b){return a(),n("div",null,r)}const B=s(p,[["render",o]]);export{m as __pageData,B as default};
