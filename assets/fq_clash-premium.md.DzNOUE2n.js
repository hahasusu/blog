import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{"date":"2024-04-03 18:28:47"},"headers":[],"relativePath":"fq/clash-premium.md","filePath":"fq/clash-premium.md"}'),p={name:"fq/clash-premium.md"},e=l(`<h2 id="dns说明" tabindex="-1">DNS说明 <a class="header-anchor" href="#dns说明" aria-label="Permalink to &quot;DNS说明&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E53935;">dns</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">  enable</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">  listen</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 0.0.0.0:53</span></span>
<span class="line"><span style="color:#E53935;">  ipv6</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">  default-nameserver</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 114.114.114.114</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 8.8.8.8</span></span>
<span class="line"><span style="color:#E53935;">  nameserver</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 114.114.114.114</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> https://doh.pub/dns-query</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> tls://dns.alidns.com:853</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>访问 <code>www.google.com</code>，Clash 会向 nameserver 字段中的 DNS 服务地址发送查询请求来查询 <code>www.google.com</code> 的 IP 地址，这些请求是并发查询的，谁最先返回查询结果就用谁的结果。</p><p><code>default-nameserver</code>用来解析 <code>nameserver</code> DNS域名，比如 <code>https://doh.pub/dns-query</code>, <strong>值必须为ip地址</strong></p><h2 id="分流" tabindex="-1">分流 <a class="header-anchor" href="#分流" aria-label="Permalink to &quot;分流&quot;">​</a></h2><blockquote><p>解决 DNS 污染的基本思路就是分流，解析国内的域名用阿里和腾讯的 DNS，解析国外的域名用国外的 DNS。</p></blockquote><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E53935;">dns</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">  enable</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">  listen</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 0.0.0.0:53</span></span>
<span class="line"><span style="color:#E53935;">  ipv6</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">  default-nameserver</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 1.1.1.1</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 8.8.8.8</span></span>
<span class="line"><span style="color:#E53935;">  nameserver</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> https://doh.pub/dns-query</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> https://dns.alidns.com/dns-query</span></span>
<span class="line"><span style="color:#E53935;">  fallback</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> https://cloudflare-dns.com/dns-query</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> https://dns.google/dns-query</span></span>
<span class="line"><span style="color:#E53935;">  fallback-filter</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    geoip</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">    geoip-code</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> CN</span></span>
<span class="line"><span style="color:#E53935;">    ipcidr</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> 240.0.0.0/4</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # domain:</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      # - &#39;+.google.com&#39;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      # - &#39;+.facebook.com&#39;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      # - &#39;+.youtube.com&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># default-nameserver 是用来解析 nameserver 和 fallback 里面的域名的</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># nameserver 是用来解析规则没有命中（也就是墙内域名）的</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># fallback 是用来解析墙外域名的</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># fallback-filter 是用来直接让这些域名走 fallback 解析的（也就是放在这里的默认就是需要翻墙解析）</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><code>fallback-filter</code> 字段就是分流规则。</p><ul><li>当匹配分流规则时,就用 <code>fallback</code> 字段中的 DNS，</li><li>如果不匹配分流规则,就用 <code>nameserver</code> 字段中的 DNS。</li></ul><h2 id="fake-ip" tabindex="-1">Fake-IP <a class="header-anchor" href="#fake-ip" aria-label="Permalink to &quot;Fake-IP&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"> # 此列表中的主机名将不会使用 Fake IP 解析</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # 即, 对这些域名的请求将始终使用其真实 IP 地址进行响应</span></span>
<span class="line"><span style="color:#E53935;">fake-ip-filter</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">     -</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">*.lan</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#39ADB5;">     -</span><span style="color:#91B859;"> localhost.ptlogin2.qq.com</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h2><div class="language-yaml line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E53935;">mixed-port</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 7890</span></span>
<span class="line"><span style="color:#E53935;">mode</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> rule</span></span>
<span class="line"><span style="color:#E53935;">log-level</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> info</span></span>
<span class="line"><span style="color:#E53935;">allow-lan</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">external-controller</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 0.0.0.0:9090</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 如果RESTful API在 0.0.0.0 上监听, 务必设置一个 secret 密钥.</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># secret: &quot;&quot;</span></span>
<span class="line"><span style="color:#E53935;">external-ui</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> folder</span></span>
<span class="line"><span style="color:#E53935;">profile</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">  store-selected</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">dns</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">  enable</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">  listen</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 0.0.0.0:53</span></span>
<span class="line"><span style="color:#E53935;">  ipv6</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> false</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # 默认 dns, 用于解析 DNS 服务器 的域名</span></span>
<span class="line"><span style="color:#E53935;">  default-nameserver</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 223.6.6.6</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #- 223.5.5.5</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 8.8.8.8</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #- tls://223.5.5.5:853</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #- https://223.5.5.5/dns-query</span></span>
<span class="line"><span style="color:#E53935;">  enhanced-mode</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> fake-ip</span></span>
<span class="line"><span style="color:#E53935;">  fake-ip-range</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 198.18.0.1/16</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  #use-hosts: true</span></span>
<span class="line"><span style="color:#E53935;">  fake-ip-filter</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">*.lan</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> localhost.ptlogin2.qq.com</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # 默认的域名解析服务器</span></span>
<span class="line"><span style="color:#E53935;">  nameserver</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #- 10.0.0.10</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 223.6.6.6</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #- 223.5.5.5</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 119.29.29.29</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> tls://dns.rubyfish.cn:853</span><span style="color:#90A4AE;font-style:italic;"> # DNS over TLS</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#91B859;"> https://1.1.1.1/dns-query</span><span style="color:#90A4AE;font-style:italic;"> # DNS over HTTPS</span></span>
<span class="line"><span style="color:#E53935;">  fallback</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    -</span><span style="color:#F76D47;"> 223.5.5.5</span></span>
<span class="line"><span style="color:#E53935;">  fallback-filter</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    geoip</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">    geoip-code</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> CN</span></span>
<span class="line"><span style="color:#E53935;">    ipcidr</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> 240.0.0.0/4</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">p</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;font-style:italic;"> &amp;</span><span style="color:#E2931D;">p</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  #type: http</span></span>
<span class="line"><span style="color:#E53935;">  type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> file</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  #interval: 36000</span></span>
<span class="line"><span style="color:#E53935;">  health-check</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    enable</span><span style="color:#39ADB5;">:</span><span style="color:#FF5370;"> true</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> https://www.gstatic.com/generate_204</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 600</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">proxy-providers</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">  xfss</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    &lt;&lt;:</span><span style="color:#39ADB5;font-style:italic;"> *</span><span style="color:#90A4AE;">p</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #    url: &#39;&#39;</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> providers/xfss.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  fly</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    &lt;&lt;:</span><span style="color:#39ADB5;font-style:italic;"> *</span><span style="color:#90A4AE;">p</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #url: &#39;&#39;</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> providers/fly.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">  ouo</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">    &lt;&lt;:</span><span style="color:#39ADB5;font-style:italic;"> *</span><span style="color:#90A4AE;">p</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #url: &#39;&#39;</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> providers/ouo.yaml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">proxy-groups</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 🚀 节点选择</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> select</span></span>
<span class="line"><span style="color:#E53935;">    proxies</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      # - h2</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> ♻️ 自动选择</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> DIRECT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ♻️ 自动选择</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> url-test</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> http://www.gstatic.com/generate_204</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 600</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # proxies:</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      # - h2</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # tolerance: 50</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # proxies:</span></span>
<span class="line"><span style="color:#E53935;">    use</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> ouo</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      #- douzi</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">     #filter: &#39;JP|HK|SG|CN|日|港|新|台&#39;</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 🎯 全球直连</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> select</span></span>
<span class="line"><span style="color:#E53935;">    proxies</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> DIRECT</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> 🚀 节点选择</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> ♻️ 自动选择</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> 🐟 漏网之鱼</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> select</span></span>
<span class="line"><span style="color:#E53935;">    proxies</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> ♻️ 自动选择</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> 🎯 全球直连</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> 🚀 节点选择</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#E53935;"> name</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> GPT</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> select</span></span>
<span class="line"><span style="color:#E53935;">    use</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">      -</span><span style="color:#91B859;"> xfss</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #filter: &#39;USA-03&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">rule-providers</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">  direct</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E53935;">    behavior</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> domain</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ruleset/direct.yaml</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 86400</span></span>
<span class="line"><span style="color:#E53935;">  gfw</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E53935;">    behavior</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> domain</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ruleset/gfw.yaml</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 86400</span></span>
<span class="line"><span style="color:#E53935;">  proxy</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E53935;">    behavior</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> domain</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ./ruleset/proxy.yaml</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 86400</span></span>
<span class="line"><span style="color:#E53935;">  private</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E53935;">    behavior</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> domain</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ./ruleset/private.yaml</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 86400</span></span>
<span class="line"><span style="color:#E53935;">  cncidr</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E53935;">    behavior</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ipcidr</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ./ruleset/cncidr.yaml</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 86400</span></span>
<span class="line"><span style="color:#E53935;">  lancidr</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#E53935;">    type</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> http</span></span>
<span class="line"><span style="color:#E53935;">    behavior</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ipcidr</span></span>
<span class="line"><span style="color:#E53935;">    url</span><span style="color:#39ADB5;">:</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E53935;">    path</span><span style="color:#39ADB5;">:</span><span style="color:#91B859;"> ./ruleset/lancidr.yaml</span></span>
<span class="line"><span style="color:#E53935;">    interval</span><span style="color:#39ADB5;">:</span><span style="color:#F76D47;"> 86400</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E53935;">rules</span><span style="color:#39ADB5;">:</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> DOMAIN-KEYWORD,wangxiaochun,DIRECT</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> DOMAIN-SUFFIX,zbluo.com,DIRECT</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> DOMAIN-KEYWORD,cloudfront,♻️ 自动选择</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> DOMAIN-KEYWORD,openai,GPT</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> DOMAIN-SUFFIX,cloudfront.net,GPT</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> RULE-SET,private,DIRECT,no-resolve</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> IP-CIDR,10.0.0.0/8,DIRECT,no-resolve</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> IP-CIDR,192.168.0.0/16,DIRECT,no-resolve</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> DOMAIN-KEYWORD,justdoiit,DIRECT</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> RULE-SET,lancidr,DIRECT,no-resolve</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> RULE-SET,cncidr,DIRECT,no-resolve</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> RULE-SET,proxy,♻️ 自动选择</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN,btrace.qq.com,REJECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-KEYWORD,btrace,🚀 节点选择</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-KEYWORD,bulianglin,🚀 节点选择</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-KEYWORD,openai,GPT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-KEYWORD,ldqk,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-KEYWORD,wegame,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-SUFFIX,wegame.com.cn,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN,pingfore.wegame.com.cn,DIRECT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,WeChat.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,browser.exe,🚀 节点选择</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,browser.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,LeagueofLegends,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,EduWebHelper.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,LeagueofLegends.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,League of Legends.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,LeagueClient.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,LeagueClientUx.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,LeagueClientUxRender.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,LeagueCrashHandler.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,wegame.exe,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - PROCESS-NAME,lx-music-desktop.exe,DIRECT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-SUFFIX,iq.com,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-SUFFIX,wegame.com,DIRECT</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">  # - DOMAIN-SUFFIX,qq.com,DIRECT</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> RULE-SET,direct,🎯 全球直连</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> RULE-SET,gfw,🚀 节点选择</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> GEOIP,CN,🎯 全球直连,no-resolve</span></span>
<span class="line"><span style="color:#39ADB5;">  -</span><span style="color:#91B859;"> MATCH,🐟 漏网之鱼</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br></div></div>`,13),o=[e];function r(c,t,i,y,b,u){return a(),n("div",null,o)}const B=s(p,[["render",r]]);export{A as __pageData,B as default};
