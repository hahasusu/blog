import{_ as s,c as a,o as n,a4 as p}from"./chunks/framework.GYzjcnJh.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"python/fastapi/index.md","filePath":"backend/python/fastapi/index.md"}'),l={name:"python/fastapi/index.md"},e=p(`<div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">pip</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> fastapi</span></span>
<span class="line"><span style="color:#E2931D;">pip</span><span style="color:#91B859;"> install</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">uvicorn[standard]</span><span style="color:#39ADB5;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>最简单的 FastAPI 文件可能像下面这样</p><div class="language-python line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#39ADB5;font-style:italic;">from</span><span style="color:#90A4AE;"> fastapi </span><span style="color:#39ADB5;font-style:italic;">import</span><span style="color:#90A4AE;"> FastAPI</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">app </span><span style="color:#39ADB5;">=</span><span style="color:#6182B8;"> FastAPI</span><span style="color:#39ADB5;">()</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">@</span><span style="color:#6182B8;">app</span><span style="color:#39ADB5;">.</span><span style="color:#6182B8;">get</span><span style="color:#39ADB5;">(</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">/</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;">)</span></span>
<span class="line"><span style="color:#9C3EDA;">async</span><span style="color:#9C3EDA;"> def</span><span style="color:#6182B8;"> root</span><span style="color:#39ADB5;">():</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">    return</span><span style="color:#39ADB5;"> {</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">message</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">Hello World</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><code>uvicorn main:app --reload</code></p><div class="warning custom-block"><p class="custom-block-title">Note</p><p>uvicorn main:app 命令含义如下:</p><ul><li>main：main.py 文件（一个 Python「模块」）。</li><li>app：在 main.py 文件中通过 app = FastAPI() 创建的对象。</li><li>--reload：让服务器在更新代码后重新启动。仅在开发时使用该选项。</li></ul></div>`,5),o=[e];function t(c,r,i,y,d,u){return n(),a("div",null,o)}const b=s(l,[["render",t]]);export{A as __pageData,b as default};
