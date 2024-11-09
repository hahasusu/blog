import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"Caddy","description":"","frontmatter":{},"headers":[],"relativePath":"backend/caddy.md","filePath":"backend/caddy.md"}'),p={name:"backend/caddy.md"},e=l(`<h1 id="caddy" tabindex="-1">Caddy <a class="header-anchor" href="#caddy" aria-label="Permalink to &quot;Caddy&quot;">​</a></h1><h2 id="手动安装" tabindex="-1">手动安装 <a class="header-anchor" href="#手动安装" aria-label="Permalink to &quot;手动安装&quot;">​</a></h2><p><a href="https://github.com/caddyserver/caddy/releases" target="_blank" rel="noreferrer">Github release</a></p><p>下载地址 <a href="https://github.com/caddyserver/caddy/releases/download/v2.7.5/caddy_2.7.5_linux_amd64.tar.gz" target="_blank" rel="noreferrer">https://github.com/caddyserver/caddy/releases/download/v2.7.5/caddy_2.7.5_linux_amd64.tar.gz</a></p><h3 id="作为服务运行" tabindex="-1">作为服务运行 <a class="header-anchor" href="#作为服务运行" aria-label="Permalink to &quot;作为服务运行&quot;">​</a></h3><p>通常保存服务文件的地方是： <code>/etc/systemd/system/caddy.service</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Unit</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Description</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">Caddy</span></span>
<span class="line"><span style="color:#90A4AE;">Documentation</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">https://caddyserver.com/docs/</span></span>
<span class="line"><span style="color:#90A4AE;">After</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">network.target</span><span style="color:#E2931D;"> network-online.target</span></span>
<span class="line"><span style="color:#90A4AE;">Requires</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Service</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Type</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">notify</span></span>
<span class="line"><span style="color:#90A4AE;">User</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">caddy</span></span>
<span class="line"><span style="color:#90A4AE;">Group</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">caddy</span></span>
<span class="line"><span style="color:#90A4AE;">ExecStart</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/bin/caddy</span><span style="color:#E2931D;"> run</span><span style="color:#91B859;"> --environ</span><span style="color:#91B859;"> --config</span><span style="color:#91B859;"> /etc/caddy/Caddyfile</span></span>
<span class="line"><span style="color:#90A4AE;">ExecReload</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/bin/caddy</span><span style="color:#E2931D;"> reload</span><span style="color:#91B859;"> --config</span><span style="color:#91B859;"> /etc/caddy/Caddyfile</span><span style="color:#91B859;"> --force</span></span>
<span class="line"><span style="color:#90A4AE;">TimeoutStopSec</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">5s</span></span>
<span class="line"><span style="color:#90A4AE;">LimitNOFILE</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">1048576</span></span>
<span class="line"><span style="color:#90A4AE;">LimitNPROC</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">512</span></span>
<span class="line"><span style="color:#90A4AE;">PrivateTmp</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">true</span></span>
<span class="line"><span style="color:#90A4AE;">ProtectSystem</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">full</span></span>
<span class="line"><span style="color:#90A4AE;">AmbientCapabilities</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">CAP_NET_ADMIN</span><span style="color:#E2931D;"> CAP_NET_BIND_SERVICE</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Install</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">WantedBy</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">multi-user.target</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>把caddy二进制文件移到$PATH目录，比如</p><blockquote><p>sudo mv caddy /usr/bin/</p></blockquote><p>创建一个叫caddy的群组</p><blockquote><p>sudo groupadd --system caddy</p></blockquote><p>创建一个有可写权限家目录的caddy用户</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">sudo</span><span style="color:#91B859;"> useradd</span><span style="color:#91B859;"> --system</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">    --gid</span><span style="color:#91B859;"> caddy</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">    --create-home</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">    --home-dir</span><span style="color:#91B859;"> /var/lib/caddy</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">    --shell</span><span style="color:#91B859;"> /usr/sbin/nologin</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">    --comment</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">Caddy web server</span><span style="color:#39ADB5;">&quot;</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">    caddy</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote><p>caddy run 交互式 caddy start 后台</p></blockquote><h2 id="caddyfile" tabindex="-1">Caddyfile <a class="header-anchor" href="#caddyfile" aria-label="Permalink to &quot;Caddyfile&quot;">​</a></h2><p><strong>简单使用</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">localhost</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">respond</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">Hello, world!</span><span style="color:#39ADB5;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>多个站点</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">localhost</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;"> respond</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">Hello, world!</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">localhost:2016</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;"> respond</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">Goodbye, world!</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="静态文件" tabindex="-1">静态文件 <a class="header-anchor" href="#静态文件" aria-label="Permalink to &quot;静态文件&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">caddy</span><span style="color:#91B859;"> file-server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果你收到权限错误，这可能意味着你的操作系统不允许你绑定到低端口——因此请改用高端口2</span></span>
<span class="line"><span style="color:#E2931D;">caddy</span><span style="color:#91B859;"> file-server</span><span style="color:#91B859;"> --listen</span><span style="color:#91B859;"> :2015</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果你没有索引文件但想要显示文件列表，请使用以下--browse选项</span></span>
<span class="line"><span style="color:#E2931D;">caddy</span><span style="color:#91B859;"> file-server</span><span style="color:#91B859;"> --browse</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 可以使用另一个文件夹作为站点根目录</span></span>
<span class="line"><span style="color:#E2931D;">caddy</span><span style="color:#91B859;"> file-server</span><span style="color:#91B859;"> --root</span><span style="color:#91B859;"> ~/mysite</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># Caddyfile</span></span>
<span class="line"><span style="color:#E2931D;">localhost</span></span>
<span class="line"><span style="color:#E2931D;">root</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> /home/me/mysite</span></span>
<span class="line"><span style="color:#E2931D;">file_server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果没有index.html 索引文件，加上browse</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># file_server browse</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h2><p>假设你有一个运行在127.0.0.1:9000的HTTP后端服务</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">caddy</span><span style="color:#91B859;"> reverse-proxy</span><span style="color:#91B859;"> --to</span><span style="color:#91B859;"> 127.0.0.1:9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果你没有绑定到低端口的权限，则可以从较高的端口进行代理</span></span>
<span class="line"><span style="color:#E2931D;">caddy</span><span style="color:#91B859;"> reverse-proxy</span><span style="color:#91B859;"> --from</span><span style="color:#91B859;"> :2016</span><span style="color:#91B859;"> --to</span><span style="color:#91B859;"> 127.0.0.1:9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">## Caddyfile</span></span>
<span class="line"><span style="color:#E2931D;">:2016</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">reverse_proxy</span><span style="color:#91B859;"> 127.0.0.1:9000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 1. 代理所有的请求</span></span>
<span class="line"><span style="color:#E2931D;">example.com</span></span>
<span class="line"><span style="color:#E2931D;">reverse_proxy</span><span style="color:#91B859;"> localhost:5000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 2. 只代理以/api/开头的请求，并为其他所有内容提供静态文件</span></span>
<span class="line"><span style="color:#E2931D;">example.com</span></span>
<span class="line"><span style="color:#E2931D;">root</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> /var/www</span></span>
<span class="line"><span style="color:#E2931D;">reverse_proxy</span><span style="color:#91B859;"> /api/</span><span style="color:#90A4AE;">*</span><span style="color:#91B859;"> localhost:5000</span></span>
<span class="line"><span style="color:#E2931D;">file_server</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="指令" tabindex="-1">指令 <a class="header-anchor" href="#指令" aria-label="Permalink to &quot;指令&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">directive</span><span style="color:#90A4AE;"> [&lt;matcher&gt;] </span><span style="color:#39ADB5;">&lt;</span><span style="color:#90A4AE;">args...</span><span style="color:#39ADB5;">&gt;</span><span style="color:#39ADB5;"> {</span></span>
<span class="line"><span style="color:#E2931D;"> subdirective</span><span style="color:#90A4AE;"> [&lt;args...&gt;]</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>匹配器</strong><br> 在Caddyfile中，紧跟在<strong>指令</strong>后面的匹配器标记可以限制该指令的范围</p><ol><li><ul><li>匹配所有请求（通配符；默认）。</li></ul></li><li>/path 以正斜杠开头以匹配请求路径。</li><li>@name 指定一个命名匹配器。</li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果省略匹配器标记，则它与通配符匹配器（*）相同</span></span>
<span class="line"><span style="color:#E2931D;">reverse_proxy</span><span style="color:#91B859;"> localhost:9000</span></span>
<span class="line"><span style="color:#E2931D;">reverse_proxy</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> localhost:9000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>要匹配路径以外的任何内容，请定义一个命名匹配器并使用<code>@name</code>引用它:</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">@postfoo</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;"> method</span><span style="color:#91B859;"> POST</span></span>
<span class="line"><span style="color:#E2931D;"> path</span><span style="color:#91B859;"> /foo/</span><span style="color:#90A4AE;">*</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"><span style="color:#E2931D;">reverse_proxy</span><span style="color:#91B859;"> @postfoo</span><span style="color:#91B859;"> localhost:9000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>通配符匹配器</strong><br> 通配符（或“catch-all”）匹配器*匹配所有请求，并且仅在需要匹配器标记时才需要。<br> 例如，如果你要给出指令的第一个参数也恰好是路径，那么它看起来就像一个路径匹配器！因此，你可以使用通配符匹配器来消除歧义，例如：</p><blockquote><p>root * /home/www/mysite</p></blockquote><p><strong>路径匹配器</strong><br> 路径匹配器标记必须以正斜杠<code>/</code>开头<br> 默认为精确匹配；你必须附加*以进行快速前缀匹配。请注意，<code>/foo*</code>将匹配/foo、/foo/和/foobar；你可能实际是想要<code>/foo/*</code></p><h2 id="重写和重定向" tabindex="-1">重写和重定向 <a class="header-anchor" href="#重写和重定向" aria-label="Permalink to &quot;重写和重定向&quot;">​</a></h2><h3 id="rewrite" tabindex="-1">rewrite <a class="header-anchor" href="#rewrite" aria-label="Permalink to &quot;rewrite&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>对请求进行内部重写<br><code>rewrite</code> 指令意味着接受请求的意图，但要进行修改。它与同一区块中的其他<code>rewrite</code>指令是相互排斥的，因此可以安全地定义重写，否则会相互串联，因为只有第一个匹配的<code>rewrite</code>才会被执行</p></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 重写所有请求到foo.html, 保留任何查询字符串不变</span></span>
<span class="line"><span style="color:#E2931D;">rewrite</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> /foo.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 用\`a=b&#39;替换API请求中的查询字符串，保留路径不变</span></span>
<span class="line"><span style="color:#E2931D;">rewrite</span><span style="color:#91B859;"> /api/</span><span style="color:#90A4AE;">*</span><span style="color:#91B859;"> ?a=b</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 同时改变路径和查询字符串，保留原来的查询字符串，同时添加原来的路径作为p参数</span></span>
<span class="line"><span style="color:#E2931D;">rewrite</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> /index.php?{query}</span><span style="color:#39ADB5;">&amp;</span><span style="color:#90A4AE;">p</span><span style="color:#39ADB5;">=</span><span style="color:#90A4AE;">{</span><span style="color:#E2931D;">path}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="try-files" tabindex="-1">try_files <a class="header-anchor" href="#try-files" aria-label="Permalink to &quot;try_files&quot;">​</a></h3><blockquote><p>根据文件的存在重写请求</p></blockquote><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果请求没有匹配任何静态文件，则重写到一个索引/路由文件</span></span>
<span class="line"><span style="color:#E2931D;">try_files</span><span style="color:#91B859;"> {path}</span><span style="color:#91B859;"> /index.php</span></span>
<span class="line"><span style="color:#E2931D;">try_files</span><span style="color:#91B859;"> {path}</span><span style="color:#91B859;"> {path}.html</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 同样的，但在查询字符串中加入原始路径</span></span>
<span class="line"><span style="color:#E2931D;">try_files</span><span style="color:#91B859;"> {path}</span><span style="color:#91B859;"> /index.php?{query}</span><span style="color:#39ADB5;">&amp;</span><span style="color:#90A4AE;">p</span><span style="color:#39ADB5;">=</span><span style="color:#90A4AE;">{</span><span style="color:#E2931D;">path}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 相同的，但也要匹配目录</span></span>
<span class="line"><span style="color:#E2931D;">try_files</span><span style="color:#91B859;"> {path}</span><span style="color:#91B859;"> {path}/</span><span style="color:#91B859;"> /index.php?{query}</span><span style="color:#39ADB5;">&amp;</span><span style="color:#90A4AE;">p</span><span style="color:#39ADB5;">=</span><span style="color:#90A4AE;">{</span><span style="color:#E2931D;">path}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="uri" tabindex="-1">uri <a class="header-anchor" href="#uri" aria-label="Permalink to &quot;uri&quot;">​</a></h3><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>处理一个请求的URI。它可以剥离路径前缀/后缀或替换整个URI的子串。</p><p>这个指令与rewrite不同，uri是有区别地改变URI，而不是像rewrite那样把它重设为完全不同的东西。虽然rewrite被特别视为内部重定向，但uri只是另一个中间件。</p></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">uri</span><span style="color:#90A4AE;"> [&lt;matcher&gt;] strip_prefix </span><span style="color:#39ADB5;">&lt;</span><span style="color:#90A4AE;">target</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"><span style="color:#E2931D;">uri</span><span style="color:#90A4AE;"> [&lt;matcher&gt;] strip_suffix </span><span style="color:#39ADB5;">&lt;</span><span style="color:#90A4AE;">target</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"><span style="color:#E2931D;">uri</span><span style="color:#90A4AE;"> [&lt;matcher&gt;] replace      </span><span style="color:#39ADB5;">&lt;</span><span style="color:#90A4AE;">target</span><span style="color:#39ADB5;">&gt;</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#90A4AE;">replacement</span><span style="color:#39ADB5;">&gt;</span><span style="color:#39ADB5;"> [&lt;</span><span style="color:#90A4AE;">limit</span><span style="color:#39ADB5;">&gt;]</span></span>
<span class="line"><span style="color:#E2931D;">uri</span><span style="color:#90A4AE;"> [&lt;matcher&gt;] path_regexp  </span><span style="color:#39ADB5;">&lt;</span><span style="color:#90A4AE;">target</span><span style="color:#39ADB5;">&gt;</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#90A4AE;">replacement</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 将/api从所有请求路径的开头剥离</span></span>
<span class="line"><span style="color:#E2931D;">uri</span><span style="color:#91B859;"> strip_prefix</span><span style="color:#91B859;"> /api</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 从所有请求路径的结尾去除.php</span></span>
<span class="line"><span style="color:#E2931D;">uri</span><span style="color:#91B859;"> strip_suffix</span><span style="color:#91B859;"> .php</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 在任何请求URI中用&quot;/v1/docs/&quot;替换&quot;/docs/</span></span>
<span class="line"><span style="color:#E2931D;">uri</span><span style="color:#91B859;"> replace</span><span style="color:#91B859;"> /docs/</span><span style="color:#91B859;"> /v1/docs/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><details class="details custom-block"><summary>caddyfile blog</summary><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;">{</span></span>
<span class="line"><span style="color:#E2931D;">        debug</span></span>
<span class="line"><span style="color:#E2931D;">        log</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                output</span><span style="color:#91B859;"> file</span><span style="color:#91B859;"> /home/zbluo/.config/caddy/access.log</span></span>
<span class="line"><span style="color:#E2931D;">                format</span><span style="color:#91B859;"> console</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                        time_format</span><span style="color:#91B859;"> wall</span></span>
<span class="line"><span style="color:#39ADB5;">                }</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">justdoiit.top</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">        root</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> /home/zbluo/Documents</span></span>
<span class="line"><span style="color:#E2931D;">        file_server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">        handle_path</span><span style="color:#91B859;"> /resources/</span><span style="color:#90A4AE;">*</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                file_server</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                        root</span><span style="color:#91B859;"> /home/zbluo/Documents/resources</span></span>
<span class="line"><span style="color:#E2931D;">                        browse</span></span>
<span class="line"><span style="color:#90A4AE;">                }</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">        handle_path</span><span style="color:#91B859;"> /apis/</span><span style="color:#90A4AE;">*</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                file_server</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                        root</span><span style="color:#91B859;"> /home/zbluo/Documents/apis</span></span>
<span class="line"><span style="color:#E2931D;">                        browse</span></span>
<span class="line"><span style="color:#90A4AE;">                }</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">        handle_path</span><span style="color:#91B859;"> /blog/</span><span style="color:#90A4AE;">*</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                file_server</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                        root</span><span style="color:#91B859;"> /home/zbluo/blog</span></span>
<span class="line"><span style="color:#E2931D;">                        browse</span></span>
<span class="line"><span style="color:#90A4AE;">                }</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">        handle_errors</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                respond</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">{err.status_code} {err.status_text}</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">doc.justdoiit.top</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">        root</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> /home/zbluo/blog</span></span>
<span class="line"><span style="color:#E2931D;">        try_files</span><span style="color:#91B859;"> {path}</span><span style="color:#91B859;"> {path}.html</span></span>
<span class="line"><span style="color:#E2931D;">        rewrite</span><span style="color:#91B859;"> /other/task/first</span><span style="color:#91B859;"> {path}/index.html</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        # rewrite /other/task/fourth.html {path}</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        # rewrite /linux/* {path}.html</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        # rewrite /front/* {path}.html</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        # rewrite /backend/* {path}.html</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        # rewrite /other/* {path}.html</span></span>
<span class="line"><span style="color:#E2931D;">        file_server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">        handle_errors</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">                rewrite</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> /404.html</span></span>
<span class="line"><span style="color:#E2931D;">                file_server</span></span>
<span class="line"><span style="color:#90A4AE;">        }</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br></div></div></details>`,47),r=[e];function o(c,t,i,b,y,d){return a(),n("div",null,r)}const A=s(p,[["render",o]]);export{m as __pageData,A as default};
