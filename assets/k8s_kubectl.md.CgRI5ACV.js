import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"命令行工具 (kubectl)","description":"","frontmatter":{},"headers":[],"relativePath":"k8s/kubectl.md","filePath":"k8s/kubectl.md"}'),e={name:"k8s/kubectl.md"},p=l(`<p><a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/" target="_blank" rel="noreferrer">官方安装文档</a></p><h1 id="命令行工具-kubectl" tabindex="-1">命令行工具 (kubectl) <a class="header-anchor" href="#命令行工具-kubectl" aria-label="Permalink to &quot;命令行工具 (kubectl)&quot;">​</a></h1><blockquote><p>kubectl 是使用 Kubernetes API 与 Kubernetes 集群的<a href="https://kubernetes.io/zh-cn/docs/reference/glossary/?all=true#term-control-plane" target="_blank" rel="noreferrer">控制面</a>进行通信的命令行工具。</p></blockquote><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><p><code>kubectl</code> 在 <code>$HOME/.kube</code> 目录中查找一个名为 <code>config</code> 的配置文件。</p><p>你也可以设置 <code>KUBECONFIG</code> 环境变量或设置 <code>--kubeconfig</code></p><h2 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h2><p><strong>格式：</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#90A4AE;"> [command] </span><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">TYPE</span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> [</span><span style="color:#90A4AE;">NAME</span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> [</span><span style="color:#90A4AE;">flags</span><span style="color:#39ADB5;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li><code>command</code>：指定要对一个或多个资源执行的操作，例如 <code>create</code>、<code>get</code></li><li>[TYPE](指定要对一个或多个资源执行的操作，例如 <code>create</code>、<code>get</code>): 指定资源类型,不区分大小写， 可以指定单数、复数或缩写形式</li><li><code>NAME</code>：指定资源的名称。名称区分大小写</li><li><code>flags</code>： 可选的参数。可以使用 -s 或 --server 参数指定 Kubernetes API 服务器的地址和端口</li></ul><p><strong>格式化输出</strong></p><p><a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/quick-reference/#formatting-output" target="_blank" rel="noreferrer">https://kubernetes.io/zh-cn/docs/reference/kubectl/quick-reference/#formatting-output</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">-o</span><span style="color:#91B859;"> custom-columns=</span><span style="color:#39ADB5;">&lt;</span><span style="color:#91B859;">spe</span><span style="color:#90A4AE;">c</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;">	# 使用逗号分隔的自定义列列表打印表。</span></span>
<span class="line"><span style="color:#E2931D;">-o</span><span style="color:#91B859;"> json</span><span style="color:#90A4AE;font-style:italic;">	# 输出 JSON 格式的 API 对象</span></span>
<span class="line"><span style="color:#E2931D;">-o</span><span style="color:#91B859;"> yaml</span><span style="color:#90A4AE;font-style:italic;">	# 输出 YAML 格式的 API 对象。</span></span>
<span class="line"><span style="color:#E2931D;">-o</span><span style="color:#91B859;"> name</span><span style="color:#90A4AE;font-style:italic;">	# 仅打印资源名称而不打印任何其他内容。</span></span>
<span class="line"><span style="color:#E2931D;">-o</span><span style="color:#91B859;"> wide</span><span style="color:#90A4AE;font-style:italic;">	# 以纯文本格式输出，包含所有附加信息。对于 Pod 包含节点名。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="常用操作" tabindex="-1">常用操作 <a class="header-anchor" href="#常用操作" aria-label="Permalink to &quot;常用操作&quot;">​</a></h2><p><a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/quick-reference/#viewing-finding-resources" target="_blank" rel="noreferrer">https://kubernetes.io/zh-cn/docs/reference/kubectl/quick-reference/#viewing-finding-resources</a></p><p><a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/quick-reference/#updating-resources" target="_blank" rel="noreferrer">更新资源</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 使用 example-service.yaml 中的定义创建 Service。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> apply</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> example-service.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 使用 example-controller.yaml 中的定义创建 replication controller。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> apply</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> example-controller.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 使用 &lt;directory&gt; 路径下的任意 .yaml、.yml 或 .json 文件 创建对象。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> apply</span><span style="color:#91B859;"> -f</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">director</span><span style="color:#90A4AE;">y</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 以纯文本输出格式列出所有 Pod。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> get</span><span style="color:#91B859;"> pods</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 以纯文本输出格式列出所有 Pod，并包含附加信息(如节点名)。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> get</span><span style="color:#91B859;"> pods</span><span style="color:#91B859;"> -o</span><span style="color:#91B859;"> wide</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 以纯文本输出格式列出所有副本控制器和 Service。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> get</span><span style="color:#91B859;"> rc,services</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 列出在节点 server01 上运行的所有 Pod</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> get</span><span style="color:#91B859;"> pods</span><span style="color:#91B859;"> --field-selector=spec.nodeName=server01</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 显示名为 &lt;pod-name&gt; 的 Pod 的详细信息。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> describe</span><span style="color:#91B859;"> nodes</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">node-nam</span><span style="color:#90A4AE;">e</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 显示名为 &lt;pod-name&gt; 的 Pod 的详细信息。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> describe</span><span style="color:#91B859;"> pods/</span><span style="color:#39ADB5;">&lt;</span><span style="color:#91B859;">pod-nam</span><span style="color:#90A4AE;">e</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 使用 pod.yaml 文件中指定的类型和名称删除 Pod。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> delete</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> pod.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 删除所有带有 &#39;&lt;label-key&gt;=&lt;label-value&gt;&#39; 标签的 Pod 和 Service。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> delete</span><span style="color:#91B859;"> pods,services</span><span style="color:#91B859;"> -l</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">label-ke</span><span style="color:#90A4AE;">y</span><span style="color:#39ADB5;">&gt;</span><span style="color:#91B859;">=</span><span style="color:#39ADB5;">&lt;</span><span style="color:#91B859;">label-valu</span><span style="color:#90A4AE;">e</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 删除所有 Pod，包括未初始化的 Pod。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> delete</span><span style="color:#91B859;"> pods</span><span style="color:#91B859;"> --all</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 返回 Pod &lt;pod-name&gt; 的日志快照。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> logs</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">pod-nam</span><span style="color:#90A4AE;">e</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 从 Pod &lt;pod-name&gt; 开始流式传输日志。这类似于 &#39;tail -f&#39; Linux 命令。</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> logs</span><span style="color:#91B859;"> -f</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">pod-nam</span><span style="color:#90A4AE;">e</span><span style="color:#39ADB5;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h2 id="一、curl安装" tabindex="-1">一、curl安装 <a class="header-anchor" href="#一、curl安装" aria-label="Permalink to &quot;一、curl安装&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">   # 下载最新版本</span></span>
<span class="line"><span style="color:#E2931D;">   curl</span><span style="color:#91B859;"> -LO</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">https://dl.k8s.io/release/</span><span style="color:#39ADB5;">$(</span><span style="color:#E2931D;">curl</span><span style="color:#91B859;"> -L -s https://dl.k8s.io/release/stable.txt</span><span style="color:#39ADB5;">)</span><span style="color:#91B859;">/bin/linux/amd64/kubectl</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#90A4AE;">   </span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">   # 下载特定版本</span></span>
<span class="line"><span style="color:#E2931D;">   curl</span><span style="color:#91B859;"> -LO</span><span style="color:#91B859;"> https://dl.k8s.io/release/v1.29.2/bin/linux/amd64/kubectl</span></span>
<span class="line"><span style="color:#90A4AE;">   </span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">   # 安装</span></span>
<span class="line"><span style="color:#E2931D;">   sudo</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -o</span><span style="color:#91B859;"> root</span><span style="color:#91B859;"> -g</span><span style="color:#91B859;"> root</span><span style="color:#91B859;"> -m</span><span style="color:#F76D47;"> 0755</span><span style="color:#91B859;"> kubectl</span><span style="color:#91B859;"> /usr/local/bin/kubectl</span></span>
<span class="line"><span style="color:#90A4AE;">   </span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">   # 查看版本</span></span>
<span class="line"><span style="color:#E2931D;">   kubectl</span><span style="color:#91B859;"> version</span><span style="color:#91B859;"> --client</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="二、-仓库安装" tabindex="-1">二、 仓库安装 <a class="header-anchor" href="#二、-仓库安装" aria-label="Permalink to &quot;二、 仓库安装&quot;">​</a></h2><p>阿里云源可用版本：<a href="https://mirrors.aliyun.com/kubernetes-new/core/stable/" target="_blank" rel="noreferrer">https://mirrors.aliyun.com/kubernetes-new/core/stable/</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;"> cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/yum.repos.d/kubernetes.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span></span>
<span class="line"><span style="color:#91B859;">[kubernetes]</span></span>
<span class="line"><span style="color:#91B859;">name=Kubernetes</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/rpm/</span></span>
<span class="line"><span style="color:#91B859;">enabled=1</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#91B859;">gpgkey=https://mirrors.aliyun.com/kubernetes-new/core/stable/v1.28/rpm/repodata/repomd.xml.key</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> kubectl</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="bash补全" tabindex="-1">bash补全 <a class="header-anchor" href="#bash补全" aria-label="Permalink to &quot;bash补全&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">source &lt;(kubectl completion bash)</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 还可以在补全时为 kubectl 使用一个速记别名</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">alias k=kubectl</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">complete -o default -F __start_kubectl k</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;">~/.bashrc</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="zsh补全" tabindex="-1">zsh补全 <a class="header-anchor" href="#zsh补全" aria-label="Permalink to &quot;zsh补全&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">source &lt;(kubectl completion zsh)</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> ~/.zshrc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 出现 command not found: compdef</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># vim ~/.zshrc</span></span>
<span class="line"><span style="color:#6182B8;">autoload</span><span style="color:#91B859;"> -Uz</span><span style="color:#91B859;"> compinit</span></span>
<span class="line"><span style="color:#E2931D;">compinit</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div>`,26),o=[p];function r(c,t,i,b,y,u){return a(),n("div",null,o)}const B=s(e,[["render",r]]);export{m as __pageData,B as default};
