import{_ as s,c as a,o as n,a4 as e}from"./chunks/framework.GYzjcnJh.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"k8s/web界面/dashboard.md","filePath":"k8s/web界面/dashboard.md"}'),l={name:"k8s/web界面/dashboard.md"},o=e(`<h2 id="设置token登录会话保持时间" tabindex="-1">设置token登录会话保持时间 <a class="header-anchor" href="#设置token登录会话保持时间" aria-label="Permalink to &quot;设置token登录会话保持时间&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">vim</span><span style="color:#91B859;"> dashboard.yaml</span></span>
<span class="line"><span style="color:#E2931D;">sepc:</span></span>
<span class="line"><span style="color:#E2931D;">  containers:</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span></span>
<span class="line"><span style="color:#E2931D;">      args:</span></span>
<span class="line"><span style="color:#E2931D;">        -</span><span style="color:#91B859;"> --token-ttl=86400</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,2),t=[o];function p(r,c,i,d,b,_){return n(),a("div",null,t)}const u=s(l,[["render",p]]);export{h as __pageData,u as default};
