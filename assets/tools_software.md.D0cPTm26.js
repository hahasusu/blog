import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tools/software.md","filePath":"tools/software.md"}'),p={name:"tools/software.md"},o=l(`<h2 id="scoop-软件管理" tabindex="-1">Scoop 软件管理 <a class="header-anchor" href="#scoop-软件管理" aria-label="Permalink to &quot;Scoop 软件管理&quot;">​</a></h2><p><a href="https://github.com/ScoopInstaller/Install#scoop-uninstaller" target="_blank" rel="noreferrer">安装说明</a></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>PowerShell 版本不低于 PowerShell 5<br> 首先请找个代理，不然真的不好用，很多软件来自国外网站和Github</p></div><ol><li><p>典型安装</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># Optional: Needed to run a remote script the first time</span></span>
<span class="line"><span style="color:#E2931D;">Set-ExecutionPolicy</span><span style="color:#91B859;"> RemoteSigned</span><span style="color:#91B859;"> -Scope</span><span style="color:#91B859;"> CurrentUser</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">irm</span><span style="color:#91B859;"> get.scoop.sh</span><span style="color:#39ADB5;"> |</span><span style="color:#E2931D;"> iex</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># You can use proxies if you have network trouble in accessing GitHub, e.g.</span></span>
<span class="line"><span style="color:#E2931D;">irm</span><span style="color:#91B859;"> get.scoop.sh</span><span style="color:#91B859;"> -Proxy</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">http://&lt;ip:port&gt;</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> |</span><span style="color:#E2931D;"> iex</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li><li><p>高级安装</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">irm</span><span style="color:#91B859;"> get.scoop.sh</span><span style="color:#91B859;"> -outfile</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">install.ps1</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 自定义安装位置，默认 C:\\Users\\&lt;YOUR USERNAME&gt;\\scoop</span></span>
<span class="line"><span style="color:#6182B8;">.</span><span style="color:#90A4AE;">\\</span><span style="color:#91B859;">install.ps1</span><span style="color:#91B859;"> -ScoopDir</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">D:\\Applications\\Scoop</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> -ScoopGlobalDir</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">F:\\GlobalScoopApps</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> -NoProxy</span></span>
<span class="line"><span style="color:#6182B8;">.</span><span style="color:#90A4AE;">\\</span><span style="color:#91B859;">install.ps1</span><span style="color:#91B859;"> -ScoopDir</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">D:\\Applications\\Scoop</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> -ScoopGlobalDir</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">F:\\GlobalScoopApps</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> -Proxy</span><span style="color:#91B859;"> http://ip:port</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li></ol><p><strong>多线程下载 Aria2</strong><br><code>scoop install aria2</code><br> 默认情况下，在启用 aria2 的情况下运行 scoop install 或 scoop update 时，scoop 会显示警告。可以通过运行 scoop config aria2-warning-enabled false 来抑制此警告。</p><p><strong>scoop 命令</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> help</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> config</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> install</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> uninstall</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> list</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> which</span><span style="color:#91B859;"> xxx</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>使用</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 设置代理</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> config</span><span style="color:#91B859;"> proxy</span><span style="color:#91B859;"> 127.0.0.1:7890</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 添加第三库，很多软件才能安装</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> bucket</span><span style="color:#91B859;"> add</span><span style="color:#91B859;"> extras</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> git</span><span style="color:#90A4AE;font-style:italic;">  # scoop依赖git</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> 7zip</span><span style="color:#90A4AE;font-style:italic;"> # scoop依赖7zip解压</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> scoop-search</span><span style="color:#90A4AE;font-style:italic;">  # 搜索包更快</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> wechat</span><span style="color:#91B859;"> vscode</span><span style="color:#91B859;"> chrome</span><span style="color:#91B859;"> snipaste</span><span style="color:#91B859;"> alacritty</span><span style="color:#91B859;"> geekuninstaller</span><span style="color:#91B859;"> lazygit</span><span style="color:#91B859;"> listary</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E2931D;">              lsd</span><span style="color:#91B859;"> neovim</span><span style="color:#91B859;"> picgo</span><span style="color:#91B859;"> pnpm</span><span style="color:#91B859;"> nodejs-lts</span><span style="color:#91B859;"> curl</span><span style="color:#91B859;"> xh</span><span style="color:#91B859;"> python</span><span style="color:#91B859;"> fzf</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>多版本</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> git@2.19.0.windows.1</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> git@2.23.0.windows.1</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 切换版本</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> reset</span><span style="color:#91B859;"> python@3.9</span></span>
<span class="line"><span style="color:#E2931D;">scoop</span><span style="color:#91B859;"> reset</span><span style="color:#91B859;"> python@3.10</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>迁移备份</strong></p><ul><li>scoop export &gt; scoop.json</li><li>scoop reset *</li></ul><h2 id="traffic-monitor" tabindex="-1">Traffic Monitor <a class="header-anchor" href="#traffic-monitor" aria-label="Permalink to &quot;Traffic Monitor&quot;">​</a></h2><blockquote><p>Traffic Monitor是一款用于Windows平台的网速监控悬浮窗软件<br> 可以显示当前网速、CPU及内存利用率，支持嵌入到任务栏显示，支持更换皮肤、历史流量统计等功能。</p><p>下载地址：<a href="https://github.com/zhongyang219/TrafficMonitor/releases/latest" target="_blank" rel="noreferrer">https://github.com/zhongyang219/TrafficMonitor/releases/latest</a></p></blockquote>`,15),e=[o];function t(r,c,i,y,b,u){return a(),n("div",null,e)}const B=s(p,[["render",t]]);export{m as __pageData,B as default};
