import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"scripts/compile-php.md","filePath":"scripts/compile-php.md"}'),p={name:"scripts/compile-php.md"},e=l(`<div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;">CPU</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">nproc</span><span style="color:#39ADB5;">\`</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 1安装依赖</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> sqlite</span><span style="color:#91B859;"> sqlite-devel</span><span style="color:#91B859;"> libxml2-devel</span><span style="color:#91B859;"> openssl-devel</span><span style="color:#91B859;"> curl-devel</span><span style="color:#91B859;"> libpng-devel</span><span style="color:#91B859;"> libjpeg-devel</span><span style="color:#91B859;"> freetype-devel</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://dl.rockylinux.org/pub/rocky/8/Devel/x86_64/os/Packages/o/oniguruma-6.8.2-2.1.el8_9.x86_64.rpm</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://dl.rockylinux.org/pub/rocky/8/Devel/x86_64/os/Packages/o/oniguruma-devel-6.8.2-2.1.el8_9.x86_64.rpm</span><span style="color:#90A4AE;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">rpm</span><span style="color:#91B859;"> -iv</span><span style="color:#91B859;"> oniguruma-6.8.2-2.1.el8_9.x86_64.rpm</span><span style="color:#90A4AE;"> </span></span>
<span class="line"><span style="color:#E2931D;">rpm</span><span style="color:#91B859;"> -iv</span><span style="color:#91B859;"> oniguruma-devel-6.8.2-2.1.el8_9.x86_64.rpm</span><span style="color:#90A4AE;"> </span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">./configure</span><span style="color:#91B859;"> --prefix=/usr/local/php</span><span style="color:#91B859;"> --with-mysqli=mysqlnd</span><span style="color:#91B859;"> --with-pdo-mysql=mysqlnd</span><span style="color:#91B859;"> --with-openssl</span><span style="color:#91B859;"> --with-zlib</span><span style="color:#91B859;"> --with-curl</span><span style="color:#91B859;"> --enable-mbstring</span><span style="color:#91B859;"> --enable-fpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#90A4AE;"> $CPU </span><span style="color:#39ADB5;">&amp;&amp;</span><span style="color:#E2931D;"> make</span><span style="color:#91B859;"> install</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 配置PHP-FPM</span></span>
<span class="line"><span style="color:#E2931D;">cp</span><span style="color:#91B859;"> sapi/fpm/php-fpm.conf</span><span style="color:#91B859;"> /usr/local/php/etc/php-fpm.conf</span></span>
<span class="line"><span style="color:#E2931D;">cp</span><span style="color:#91B859;"> sapi/fpm/www.conf</span><span style="color:#91B859;"> /usr/local/php/etc/php-fpm.d/www.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 创建用户和组</span></span>
<span class="line"><span style="color:#E2931D;">id</span><span style="color:#91B859;"> www-data</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#39ADB5;"> {</span><span style="color:#E2931D;"> groupadd</span><span style="color:#91B859;"> www-data</span><span style="color:#39ADB5;">;</span><span style="color:#E2931D;"> useradd</span><span style="color:#91B859;"> -g</span><span style="color:#91B859;"> www-data</span><span style="color:#91B859;"> www-data</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 启动php</span></span>
<span class="line"><span style="color:#E2931D;">ln</span><span style="color:#91B859;"> -s</span><span style="color:#91B859;"> /usr/local/php/sbin/php-fpm</span><span style="color:#91B859;"> /usr/local/bin/php-fpm</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#91B859;"> 正在启动php</span></span>
<span class="line"><span style="color:#E2931D;">sleep</span><span style="color:#F76D47;"> 3</span></span>
<span class="line"><span style="color:#E2931D;">php-fpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 配置nginx支持php</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># location ~ \\.php$ {</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # include fastcgi_params;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # fastcgi_pass 127.0.0.1:9000;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # include fastcgi_params;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div>`,1),o=[e];function c(r,t,i,y,b,m){return a(),n("div",null,o)}const B=s(p,[["render",c]]);export{d as __pageData,B as default};
