import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"Nginx","description":"","frontmatter":{"title":"Nginx","date":"2023-10-14T14:33:17.000Z","tags":["nginx"],"categories":[],"deep":true},"headers":[],"relativePath":"nginx/install.md","filePath":"backend/nginx/install.md"}'),p={name:"nginx/install.md"},e=l(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h1><blockquote><p>文档: <a href="http://nginx.org/en/docs/" target="_blank" rel="noreferrer">http://nginx.org/en/docs/</a></p></blockquote><h2 id="_1-简单安装" tabindex="-1">1 简单安装 <a class="header-anchor" href="#_1-简单安装" aria-label="Permalink to &quot;1 简单安装&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">yum</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> nginx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_2-添加yum源仓库包安装" tabindex="-1">2 添加yum源仓库包安装 <a class="header-anchor" href="#_2-添加yum源仓库包安装" aria-label="Permalink to &quot;2 添加yum源仓库包安装&quot;">​</a></h2><p><a href="http://nginx.org/en/linux_packages.html" target="_blank" rel="noreferrer">http://nginx.org/en/linux_packages.html</a></p><ol><li><a href="http://nginx.org/en/linux_packages.html#Ubuntu" target="_blank" rel="noreferrer">Ubuntu</a></li><li><a href="http://nginx.org/en/linux_packages.html#RHEL" target="_blank" rel="noreferrer">RHEL</a></li></ol><h2 id="_3-源码编译安装" tabindex="-1">3 源码编译安装 <a class="header-anchor" href="#_3-源码编译安装" aria-label="Permalink to &quot;3 源码编译安装&quot;">​</a></h2><p>源码包地址: <a href="http://nginx.org/en/download.html" target="_blank" rel="noreferrer">http://nginx.org/en/download.html</a></p><p><a href="http://nginx.org/download/nginx-1.24.0.tar.gz" target="_blank" rel="noreferrer">http://nginx.org/download/nginx-1.24.0.tar.gz</a><br><code>.configure 参数</code>: <a href="http://nginx.org/en/docs/configure.html" target="_blank" rel="noreferrer">http://nginx.org/en/docs/configure.html</a></p><p><strong>安装所需依赖</strong>:<br><code>yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel</code></p><p><code>一些编译选项</code>:</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;">--prefix</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">path</span><span style="color:#90A4AE;font-style:italic;">   # default: /usr/local/nginx</span></span>
<span class="line"><span style="color:#90A4AE;">--sbin-path</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">path</span><span style="color:#90A4AE;font-style:italic;">    # default: prefix/sbin/nginx</span></span>
<span class="line"><span style="color:#90A4AE;">--conf-path</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">path</span><span style="color:#90A4AE;font-style:italic;">    # default: prefix/conf/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">./configure</span><span style="color:#91B859;"> --user=nginx</span><span style="color:#91B859;"> --group-nginx</span><span style="color:#91B859;"> --with-http_ssl_modul</span><span style="color:#91B859;"> --with-http_v2_module</span><span style="color:#91B859;"> --with-http_stub_module</span><span style="color:#91B859;"> --with-http_gzip_static_module</span><span style="color:#91B859;"> --with-pcre</span><span style="color:#91B859;"> --with-stream</span><span style="color:#91B859;"> --with-stream_ssl_module</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_3-1-一键安装脚本" tabindex="-1">3.1 一键安装脚本 <a class="header-anchor" href="#_3-1-一键安装脚本" aria-label="Permalink to &quot;3.1 一键安装脚本&quot;">​</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">1.24.0</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 默认安装路径/usr/local</span></span>
<span class="line"><span style="color:#90A4AE;">INSTALL_DIR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 源码包存放路径</span></span>
<span class="line"><span style="color:#90A4AE;">SRC_DIR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/src</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># tar包url和存放路径</span></span>
<span class="line"><span style="color:#90A4AE;">TAR_URL</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">http://10.0.0.10/linux/nginx-</span><span style="color:#90A4AE;">$VERSION</span><span style="color:#91B859;">.tar.gz</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># TAR_URL=http://nginx.org/download/nginx-$VERSION.tar.gz</span></span>
<span class="line"><span style="color:#90A4AE;">TAR_DIR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/opt</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># cpu核数</span></span>
<span class="line"><span style="color:#90A4AE;">CPUS</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">nproc</span><span style="color:#39ADB5;">\`</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">color</span><span style="color:#39ADB5;">()</span><span style="color:#39ADB5;"> {</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">\\033[32m</span><span style="color:#90A4AE;">$*</span><span style="color:#91B859;">\\033[0m</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装nginx依赖包...</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> -q</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> zlib</span><span style="color:#91B859;"> zlib-devel</span><span style="color:#91B859;"> gcc-c++</span><span style="color:#91B859;"> libtool</span><span style="color:#91B859;">  pcre</span><span style="color:#91B859;"> openssl</span><span style="color:#91B859;"> openssl-devel</span><span style="color:#91B859;"> wget</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> !</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> $TAR_DIR/nginx-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#90A4AE;">.tar.gz </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#E2931D;">    color</span><span style="color:#91B859;"> 下载源码包</span></span>
<span class="line"><span style="color:#E2931D;">    wget</span><span style="color:#90A4AE;"> $TAR_URL </span><span style="color:#91B859;">-P</span><span style="color:#90A4AE;"> $TAR_DIR</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> !</span><span style="color:#39ADB5;"> -d</span><span style="color:#90A4AE;"> $SRC_DIR/nginx-$VERSION </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#E2931D;">    tar</span><span style="color:#91B859;"> xf</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#90A4AE;">$TAR_DIR</span><span style="color:#91B859;">/nginx-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.tar.gz</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;"> -C</span><span style="color:#90A4AE;"> $SRC_DIR</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#90A4AE;"> $SRC_DIR</span><span style="color:#91B859;">/nginx-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 创建用户和组</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># groupadd nginx</span></span>
<span class="line"><span style="color:#E2931D;">id</span><span style="color:#91B859;"> nginx</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#E2931D;"> useradd</span><span style="color:#91B859;"> -r</span><span style="color:#91B859;"> -s</span><span style="color:#91B859;"> /sbin/nologin</span><span style="color:#91B859;"> nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 正在编译</span></span>
<span class="line"><span style="color:#E2931D;">./configure</span><span style="color:#91B859;"> --user=nginx</span><span style="color:#91B859;"> --group=nginx</span><span style="color:#91B859;"> --with-http_ssl_module</span><span style="color:#91B859;"> --with-http_v2_module</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#90A4AE;">--with-http_stub_status_module </span><span style="color:#91B859;">--with-http_gzip_static_module</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#90A4AE;">--with-pcre </span><span style="color:#91B859;">--with-stream</span><span style="color:#91B859;"> --with-stream_ssl_module</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#91B859;"> -j</span><span style="color:#90A4AE;"> $CPUS </span><span style="color:#39ADB5;">&gt;</span><span style="color:#91B859;"> /dev/null</span><span style="color:#39ADB5;"> &amp;&amp;</span><span style="color:#E2931D;"> make</span><span style="color:#91B859;"> install</span></span>
<span class="line"><span style="color:#E2931D;">ln</span><span style="color:#91B859;"> -s</span><span style="color:#90A4AE;"> $INSTALL_DIR</span><span style="color:#91B859;">/sbin/nginx</span><span style="color:#91B859;"> /usr/sbin/nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改默认配置文件</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/^#pid/a pid    /run/nginx.pid;</span><span style="color:#39ADB5;">&#39;</span><span style="color:#90A4AE;"> $INSTALL_DIR</span><span style="color:#91B859;">/conf/nginx.conf</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/^(worker_process.*)1;/\\1auto;/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#90A4AE;"> $INSTALL_DIR</span><span style="color:#91B859;">/conf/nginx.conf</span></span>
<span class="line"><span style="color:#39ADB5;">[[</span><span style="color:#39ADB5;"> !</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> /usr/local/nginx/conf/conf.d </span><span style="color:#39ADB5;">]]</span><span style="color:#39ADB5;"> &amp;&amp;</span><span style="color:#E2931D;"> mkdir</span><span style="color:#90A4AE;"> $INSTALL_DIR</span><span style="color:#91B859;">/conf/conf.d</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">$i \\    include conf.d/*.conf;</span><span style="color:#39ADB5;">&#39;</span><span style="color:#90A4AE;"> $INSTALL_DIR</span><span style="color:#91B859;">/conf/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 创建nginx启动脚本,参考yum安装时的配置文件</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /lib/systemd/system/nginx.service</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">[Unit]</span></span>
<span class="line"><span style="color:#91B859;">Description=The NGINX HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#91B859;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Service]</span></span>
<span class="line"><span style="color:#91B859;">Type=forking</span></span>
<span class="line"><span style="color:#91B859;">PIDFile=/run/nginx.pid</span></span>
<span class="line"><span style="color:#91B859;">ExecStartPre=/usr/bin/rm -f /run/nginx.pid</span></span>
<span class="line"><span style="color:#91B859;">ExecStartPre=</span><span style="color:#90A4AE;">$INSTALL_DIR</span><span style="color:#91B859;">/sbin/nginx -t</span></span>
<span class="line"><span style="color:#91B859;">ExecStart=</span><span style="color:#90A4AE;">$INSTALL_DIR</span><span style="color:#91B859;">/sbin/nginx</span></span>
<span class="line"><span style="color:#91B859;">ExecStop=</span><span style="color:#90A4AE;">$INSTALL_DIR</span><span style="color:#91B859;">/sbin/nginx -s stop</span></span>
<span class="line"><span style="color:#91B859;">ExecReload=</span><span style="color:#90A4AE;">$INSTALL_DIR</span><span style="color:#91B859;">/sbin/nginx -s reload</span></span>
<span class="line"><span style="color:#91B859;">PrivateTmp=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Install]</span></span>
<span class="line"><span style="color:#91B859;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">\\n安装完成\\n</span><span style="color:#39ADB5;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br></div></div><h2 id="卸载nginx" tabindex="-1">卸载nginx <a class="header-anchor" href="#卸载nginx" aria-label="Permalink to &quot;卸载nginx&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">1.24.0</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 默认安装路径/usr/local</span></span>
<span class="line"><span style="color:#90A4AE;">INSTALL_DIR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 源码包存放路径</span></span>
<span class="line"><span style="color:#90A4AE;">SRC_DIR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/src</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># tar包存放路径</span></span>
<span class="line"><span style="color:#90A4AE;">TAR_DIR</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/opt</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">nginx</span><span style="color:#91B859;"> -s</span><span style="color:#91B859;"> stop</span></span>
<span class="line"><span style="color:#E2931D;">rm</span><span style="color:#91B859;"> -rf</span><span style="color:#90A4AE;"> $INSTALL_DIR</span><span style="color:#91B859;">/nginx</span><span style="color:#90A4AE;"> $SRC_DIR</span><span style="color:#91B859;">/nginx-</span><span style="color:#90A4AE;">$VERSION $TAR_DIR</span><span style="color:#91B859;">/nginx-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.tar.gz</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">userdel</span><span style="color:#91B859;"> -r</span><span style="color:#91B859;"> nginx</span></span>
<span class="line"><span style="color:#E2931D;">groupdel</span><span style="color:#91B859;"> nginx</span></span>
<span class="line"><span style="color:#E2931D;">unlink</span><span style="color:#91B859;"> /usr/sbin/nginx</span></span>
<span class="line"><span style="color:#E2931D;">rm</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> /lib/systemd/system/nginx.service</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="安装成系统服务" tabindex="-1">安装成系统服务 <a class="header-anchor" href="#安装成系统服务" aria-label="Permalink to &quot;安装成系统服务&quot;">​</a></h2><p><code>vim /lib/systemd/system/nginx.service</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Unit</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Description</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">The</span><span style="color:#E2931D;"> NGINX</span><span style="color:#91B859;"> HTTP</span><span style="color:#91B859;"> and</span><span style="color:#91B859;"> reverse</span><span style="color:#91B859;"> proxy</span><span style="color:#91B859;"> server</span></span>
<span class="line"><span style="color:#90A4AE;">After</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">network.target</span><span style="color:#E2931D;"> remote-fs.target</span><span style="color:#91B859;"> nss-lookup.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Service</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Type</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">forking</span></span>
<span class="line"><span style="color:#90A4AE;">ExecStart</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/nginx/sbin/nginx</span></span>
<span class="line"><span style="color:#90A4AE;">ExecStop</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/nginx/sbin/nginx</span><span style="color:#E2931D;"> -s</span><span style="color:#91B859;"> stop</span></span>
<span class="line"><span style="color:#90A4AE;">ExecReload</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/nginx/sbin/nginx</span><span style="color:#E2931D;"> -s</span><span style="color:#91B859;"> reload</span></span>
<span class="line"><span style="color:#90A4AE;">PrivateTmp</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Install</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">WantedBy</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">multi-user.target</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><details class="details custom-block"><summary>Details</summary><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /lib/systemd/system/nginx.service</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">[Unit]</span></span>
<span class="line"><span style="color:#91B859;">Description=The NGINX HTTP and reverse proxy server</span></span>
<span class="line"><span style="color:#91B859;">After=network.target remote-fs.target nss-lookup.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Service]</span></span>
<span class="line"><span style="color:#91B859;">Type=forking</span></span>
<span class="line"><span style="color:#91B859;">ExecStart=/usr/local/nginx/sbin/nginx</span></span>
<span class="line"><span style="color:#91B859;">ExecStop=/usr/local/nginx/sbin/nginx -s stop</span></span>
<span class="line"><span style="color:#91B859;">ExecReload=/usr/local/nginx/sbin/nginx -s reload</span></span>
<span class="line"><span style="color:#91B859;">PrivateTmp=true</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Install]</span></span>
<span class="line"><span style="color:#91B859;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></details><p><strong>重新加载系统服务</strong><br><code>systemctl daemon-reload</code></p><p><strong>启动</strong><br><code>systemctl start nginx</code></p><p><strong>开机启动</strong><br><code>systemctl enable nginx</code></p>`,24),o=[e];function r(c,t,i,y,b,u){return a(),n("div",null,o)}const B=s(p,[["render",r]]);export{m as __pageData,B as default};
