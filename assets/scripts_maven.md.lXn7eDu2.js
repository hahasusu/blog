import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"scripts/maven.md","filePath":"scripts/maven.md"}'),p={name:"scripts/maven.md"},e=l(`<h2 id="二进制安装" tabindex="-1">二进制安装 <a class="header-anchor" href="#二进制安装" aria-label="Permalink to &quot;二进制安装&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">3.9.5</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#90A4AE;">TAR</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">apache-maven-</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">-bin.tar.gz</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#90A4AE;">URL</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">https://mirrors.tuna.tsinghua.edu.cn/apache/maven/maven-3/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">VERSION</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">/binaries/</span><span style="color:#90A4AE;">$TAR</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> /opt</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#90A4AE;"> $URL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> /opt/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">TAR</span><span style="color:#39ADB5;">}</span><span style="color:#39ADB5;"> ];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#E2931D;">    tar</span><span style="color:#91B859;"> xf</span><span style="color:#90A4AE;"> $TAR </span><span style="color:#91B859;">-C</span><span style="color:#91B859;"> /usr/local</span></span>
<span class="line"><span style="color:#6182B8;">    cd</span><span style="color:#91B859;"> /usr/local</span></span>
<span class="line"><span style="color:#E2931D;">    ln</span><span style="color:#91B859;"> -sv</span><span style="color:#39ADB5;"> \${</span><span style="color:#90A4AE;">TAR</span><span style="color:#39ADB5;">%</span><span style="color:#90A4AE;">-bin.tar.gz</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;"> maven</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">PATH=/usr/local/maven/bin:$PATH</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/profile.d/maven.sh</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">export MAVEN_HOME=/usr/local/maven</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> /etc/profile.d/maven.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">    .</span><span style="color:#91B859;"> /etc/profile.d/maven.sh</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">run . /etc/profile.d/maven.sh</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">else</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/opt/</span><span style="color:#90A4AE;">$TAR</span><span style="color:#91B859;"> 不存在</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h2 id="镜像加速" tabindex="-1">镜像加速 <a class="header-anchor" href="#镜像加速" aria-label="Permalink to &quot;镜像加速&quot;">​</a></h2><p><code>conf/setting.xml</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">  &lt;</span><span style="color:#E2931D;">mirror</span><span style="color:#90A4AE;">&gt;</span></span>
<span class="line"><span style="color:#39ADB5;">    &lt;</span><span style="color:#E2931D;">id</span><span style="color:#90A4AE;">&gt;</span><span style="color:#91B859;">aliyunmaven</span><span style="color:#90A4AE;">&lt;/id&gt;</span></span>
<span class="line"><span style="color:#39ADB5;">    &lt;</span><span style="color:#E2931D;">mirrorOf</span><span style="color:#90A4AE;">&gt;</span><span style="color:#91B859;">*</span><span style="color:#90A4AE;">&lt;/mirrorOf&gt;</span></span>
<span class="line"><span style="color:#39ADB5;">    &lt;</span><span style="color:#E2931D;">name</span><span style="color:#90A4AE;">&gt;</span><span style="color:#91B859;">阿里云公共仓库</span><span style="color:#90A4AE;">&lt;/name&gt;</span></span>
<span class="line"><span style="color:#39ADB5;">    &lt;</span><span style="color:#E2931D;">url</span><span style="color:#90A4AE;">&gt;</span><span style="color:#91B859;">https://maven.aliyun.com/repository/public</span><span style="color:#90A4AE;">&lt;/url&gt;</span></span>
<span class="line"><span style="color:#39ADB5;">  &lt;</span><span style="color:#E2931D;">/mirror</span><span style="color:#90A4AE;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,5),o=[e];function r(t,c,i,y,A,b){return a(),n("div",null,o)}const u=s(p,[["render",r]]);export{B as __pageData,u as default};
