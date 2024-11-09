import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{"date":"2024-03-09 13:04:43"},"headers":[],"relativePath":"scripts/dns.md","filePath":"scripts/dns.md"}'),p={name:"scripts/dns.md"},e=l(`<div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">example.com</span></span>
<span class="line"><span style="color:#90A4AE;">email</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">zaiboluo.gmail.com</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> bind</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> -q</span><span style="color:#91B859;"> bind</span><span style="color:#91B859;"> bind-utils</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 1 更改dns主配置文件</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/localhost;/any;/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/named.conf</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/127.0.0.1/any/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/named.conf</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 配置检查</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># named-checkconf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 2 创建区域记录文件</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /var/named/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">}</span><span style="color:#E2931D;">.zone</span></span>
<span class="line"><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">TTL 1D</span></span>
<span class="line"><span style="color:#91B859;">@   IN  SOA    @    </span><span style="color:#90A4AE;">$email</span><span style="color:#91B859;">(</span></span>
<span class="line"><span style="color:#91B859;">               1       ; Serial</span></span>
<span class="line"><span style="color:#91B859;">               1D      ; Refresh</span></span>
<span class="line"><span style="color:#91B859;">               10M     ; Retry</span></span>
<span class="line"><span style="color:#91B859;">               1D      ; Expire</span></span>
<span class="line"><span style="color:#91B859;">               1H      ; Minium TTL</span></span>
<span class="line"><span style="color:#91B859;">               )</span></span>
<span class="line"><span style="color:#91B859;">        NS     @</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">        A      10.0.0.10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">;www   IN      A      10.0.0.10</span></span>
<span class="line"><span style="color:#91B859;">www     A      10.0.0.10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">; *     A      10.0.0.10</span></span>
<span class="line"><span style="color:#91B859;">; “*”代表所有，就是泛域名解析</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 更改权限和组</span></span>
<span class="line"><span style="color:#E2931D;">chmod</span><span style="color:#F76D47;"> 640</span><span style="color:#91B859;"> /var/named/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.zone</span></span>
<span class="line"><span style="color:#E2931D;">chgrp</span><span style="color:#91B859;"> named</span><span style="color:#91B859;"> /var/named/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.zone</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 3 加入配置</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> \`</span><span style="color:#E2931D;">grep</span><span style="color:#91B859;"> -c </span><span style="color:#90A4AE;">$domain</span><span style="color:#91B859;">  /etc/named.rfc1912.zones</span><span style="color:#39ADB5;">\`</span><span style="color:#39ADB5;"> -eq</span><span style="color:#F76D47;"> 0</span><span style="color:#39ADB5;"> ];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    cat</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;"> EOF</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> /etc/named.rfc1912.zones</span></span>
<span class="line"><span style="color:#91B859;">zone &quot;</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">&quot; IN {</span></span>
<span class="line"><span style="color:#91B859;">    type master;</span></span>
<span class="line"><span style="color:#91B859;">    file &quot;</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">domain</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.zone&quot;;</span></span>
<span class="line"><span style="color:#91B859;">};</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">else</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#90A4AE;"> $domain </span><span style="color:#91B859;">已添加</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [[</span><span style="color:#39ADB5;"> \`</span><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> is-active named</span><span style="color:#39ADB5;">\`</span><span style="color:#39ADB5;"> ==</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">active</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> ]];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#E2931D;">    rndc</span><span style="color:#91B859;"> reload</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">else</span></span>
<span class="line"><span style="color:#E2931D;">    systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> named</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#91B859;"> success</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div>`,1),o=[e];function c(r,t,i,y,b,m){return a(),n("div",null,o)}const u=s(p,[["render",c]]);export{A as __pageData,u as default};
