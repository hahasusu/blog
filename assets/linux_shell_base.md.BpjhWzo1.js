import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"shell编程","description":"","frontmatter":{},"headers":[],"relativePath":"linux/shell_base.md","filePath":"linux/shell_base.md"}'),p={name:"linux/shell_base.md"},e=l(`<h1 id="shell编程" tabindex="-1">shell编程 <a class="header-anchor" href="#shell编程" aria-label="Permalink to &quot;shell编程&quot;">​</a></h1><h2 id="运行shell-脚本-两种方式" tabindex="-1">运行shell 脚本(两种方式) <a class="header-anchor" href="#运行shell-脚本-两种方式" aria-label="Permalink to &quot;运行shell 脚本(两种方式)&quot;">​</a></h2><ol><li><strong>作为可执行程序</strong></li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">chmod</span><span style="color:#91B859;"> +x</span><span style="color:#91B859;"> ./test.sh</span><span style="color:#90A4AE;font-style:italic;">  #使脚本具有执行权限</span></span>
<span class="line"><span style="color:#E2931D;">./test.sh</span><span style="color:#90A4AE;font-style:italic;">  #执行脚本</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="2"><li><strong>作为解释器参数</strong></li></ol><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">/bin/sh</span><span style="color:#91B859;"> test.sh</span></span>
<span class="line"><span style="color:#E2931D;">bash</span><span style="color:#91B859;"> test.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="字符串" tabindex="-1">字符串 <a class="header-anchor" href="#字符串" aria-label="Permalink to &quot;字符串&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>字符串可以用单引号，也可以用双引号，也可以不用引号</p><p>双引号里可以有变量<br> 双引号里可以出现转义字符</p></div><div class="warning custom-block"><p class="custom-block-title"><strong>单引号字符串的限制</strong></p><p>单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；<br> 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。</p></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">字符串默认值</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 变量未定义或者为空，返回默认值，并且变量被替换</span></span>
<span class="line"><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">变量=默认值</span><span style="color:#39ADB5;">}</span></span>
<span class="line"><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">变量</span><span style="color:#39ADB5;">:=</span><span style="color:#90A4AE;">默认值</span><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 变量未定义或者为空，返回默认值，并且变量不会被替换</span></span>
<span class="line"><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">变量-默认值</span><span style="color:#39ADB5;">}</span></span>
<span class="line"><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">变量</span><span style="color:#39ADB5;">:-</span><span style="color:#90A4AE;">默认值</span><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">字符串长度</span></span>
<span class="line"><span style="color:#39ADB5;">\${#</span><span style="color:#90A4AE;">string</span><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">从后面截取</span></span>
<span class="line"><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">string</span><span style="color:#39ADB5;">%</span><span style="color:#90A4AE;">substring</span><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">提取子字符串</span></span>
<span class="line"><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">string</span><span style="color:#39ADB5;">:</span><span style="color:#90A4AE;">1</span><span style="color:#39ADB5;">:</span><span style="color:#90A4AE;">4</span><span style="color:#39ADB5;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h2 id="数组" tabindex="-1">数组 <a class="header-anchor" href="#数组" aria-label="Permalink to &quot;数组&quot;">​</a></h2><p>在 Shell 中，用括号来表示数组，数组元素用&quot;空格&quot;符号分割开。定义数组的一般形式为 <code>数组名=(值1 值2 ... 值n)</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">读取数组元素值</span></span>
<span class="line"><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">array_name</span><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">index</span><span style="color:#39ADB5;">]}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">关联数组</span></span>
<span class="line"><span style="color:#9C3EDA;">declare</span><span style="color:#91B859;"> -A</span><span style="color:#90A4AE;"> array_name</span></span>
<span class="line"><span style="color:#9C3EDA;">declare</span><span style="color:#91B859;"> -A</span><span style="color:#90A4AE;"> site</span><span style="color:#39ADB5;">=([</span><span style="color:#9C3EDA;">&quot;google&quot;</span><span style="color:#39ADB5;">]=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">www.google.com</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;"> [</span><span style="color:#9C3EDA;">&quot;runoob&quot;</span><span style="color:#39ADB5;">]=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">www.runoob.com</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;"> [</span><span style="color:#9C3EDA;">&quot;taobao&quot;</span><span style="color:#39ADB5;">]=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">www.taobao.com</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">使用</span><span style="color:#91B859;"> @</span><span style="color:#91B859;"> 或</span><span style="color:#90A4AE;"> *</span><span style="color:#91B859;"> 可以获取数组中的所有元素</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">数组的元素为: </span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">my_array</span><span style="color:#39ADB5;">[*]}&quot;</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">数组的元素为: </span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">my_array</span><span style="color:#39ADB5;">[@]}&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="shell-函数" tabindex="-1">Shell 函数 <a class="header-anchor" href="#shell-函数" aria-label="Permalink to &quot;Shell 函数&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#9C3EDA;">function</span><span style="color:#6182B8;"> demo</span><span style="color:#39ADB5;">(){</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> hello</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">demo</span><span style="color:#39ADB5;">()</span><span style="color:#39ADB5;"> {</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> hello</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">1.</span><span style="color:#91B859;"> 可以带function</span><span style="color:#91B859;"> fun</span><span style="color:#39ADB5;">()</span><span style="color:#91B859;"> 定义，也可以直接fun</span><span style="color:#39ADB5;">()</span><span style="color:#91B859;"> 定义,不带任何参数。</span></span>
<span class="line"><span style="color:#E2931D;">2.</span><span style="color:#91B859;"> 参数返回，可以显示加：return</span><span style="color:#91B859;"> 返回，如果不加，将以最后一条命令运行结果，作为返回值。</span><span style="color:#91B859;"> return后跟数值n</span><span style="color:#39ADB5;">(</span><span style="color:#E2931D;">0-255</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="shell-输入-输出重定向" tabindex="-1">Shell 输入/输出重定向 <a class="header-anchor" href="#shell-输入-输出重定向" aria-label="Permalink to &quot;Shell 输入/输出重定向&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">将</span><span style="color:#91B859;"> stdout</span><span style="color:#91B859;"> 和</span><span style="color:#91B859;"> stderr</span><span style="color:#91B859;"> 合并后重定向到</span><span style="color:#91B859;"> file</span></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> file</span><span style="color:#39ADB5;"> 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> file</span><span style="color:#39ADB5;"> 2&gt;&amp;1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># Here Document 是 Shell 中的一种特殊的重定向方式，用来将输入重定向到一个交互式 Shell 脚本或程序</span></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> delimiter</span></span>
<span class="line"><span style="color:#91B859;">    document</span></span>
<span class="line"><span style="color:#39ADB5;">delimiter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">欢迎来到</span></span>
<span class="line"><span style="color:#91B859;">菜鸟教程</span></span>
<span class="line"><span style="color:#91B859;">www.runoob.com</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="dev-null-文件" tabindex="-1">/dev/null 文件 <a class="header-anchor" href="#dev-null-文件" aria-label="Permalink to &quot;/dev/null 文件&quot;">​</a></h3><p><strong>如果希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#6182B8;">command</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"><span style="color:#E2931D;">/dev/null</span><span style="color:#91B859;"> 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。</span></span>
<span class="line"><span style="color:#E2931D;">但是</span><span style="color:#91B859;"> /dev/null</span><span style="color:#91B859;"> 文件非常有用，将命令的输出重定向到它，会起到</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">禁止输出</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">的效果。</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">如果希望屏蔽</span><span style="color:#91B859;"> stdout</span><span style="color:#91B859;"> 和</span><span style="color:#91B859;"> stderr，可以这样写：</span></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span><span style="color:#39ADB5;"> 2&gt;&amp;1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="shell-文件包含" tabindex="-1">Shell 文件包含 <a class="header-anchor" href="#shell-文件包含" aria-label="Permalink to &quot;Shell 文件包含&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#6182B8;">.</span><span style="color:#91B859;"> filename</span><span style="color:#90A4AE;font-style:italic;">   # 注意点号(.)和文件名中间有一空格</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">或</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">source</span><span style="color:#91B859;"> filename</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>`,22),o=[e];function r(c,t,i,b,y,u){return a(),n("div",null,o)}const h=s(p,[["render",r]]);export{m as __pageData,h as default};
