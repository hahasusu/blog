import{_ as e,c as a,o as s,a4 as o}from"./chunks/framework.GYzjcnJh.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"devops/prometheus/install.md","filePath":"devops/prometheus/install.md"}'),r={name:"devops/prometheus/install.md"},t=o('<h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><h3 id="二进制" tabindex="-1">二进制 <a class="header-anchor" href="#二进制" aria-label="Permalink to &quot;二进制&quot;">​</a></h3><p>下载地址: <a href="https://prometheus.io/download/" target="_blank" rel="noreferrer">https://prometheus.io/download/</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">https://github.com/prometheus/prometheus/releases/download/v2.53.0/prometheus-2.53.0.linux-amd64.tar.gz</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h2><p>镜像地址: <a href="https://hub.docker.com/r/prom/prometheus/" target="_blank" rel="noreferrer">https://hub.docker.com/r/prom/prometheus/</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">docker</span><span style="color:#91B859;"> run</span><span style="color:#91B859;"> --name</span><span style="color:#91B859;"> prometheus</span><span style="color:#91B859;"> -d</span><span style="color:#91B859;"> -p</span><span style="color:#91B859;"> 127.0.0.1:9090:9090</span><span style="color:#91B859;"> prom/prometheus</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>',7),n=[t];function l(p,c,i,d,h,m){return s(),a("div",null,n)}const _=e(r,[["render",l]]);export{b as __pageData,_ as default};
