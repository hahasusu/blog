import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const d=JSON.parse('{"title":"zabbix","description":"","frontmatter":{"date":"2024-03-09 14:01:05","title":"zabbix"},"headers":[],"relativePath":"scripts/zabbix.md","filePath":"scripts/zabbix.md"}'),p={name:"scripts/zabbix.md"},e=l(`<div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 1 安装 Zabbix 存储库</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># rpm -Uvh https://repo.zabbix.com/zabbix/6.0/rhel/8/x86_64/zabbix-release-6.0-4.el8.noarch.rpm</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># sed -i &#39;s/repo.zabbix.com/mirrors.aliyun.com\\/zabbix/&#39; /etc/yum.repos.d/zabbix.repo</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># sed -i &#39;s/repo.zabbix.com/mirrors.cloud.tencent.com\\/zabbix/&#39; /etc/yum.repos.d/zabbix.repo</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># dnf clean all</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;">/etc/yum.repos.d/zabbix.repo</span></span>
<span class="line"><span style="color:#91B859;">[zabbix]</span></span>
<span class="line"><span style="color:#91B859;">name=Zabbix Repository - Huaweiyun</span></span>
<span class="line"><span style="color:#91B859;">baseurl=https://mirrors.huaweicloud.com/zabbix/zabbix/6.0/rhel/8/x86_64/</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 2 安装 Zabbix server, frontend, agent</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> zabbix-server-mysql</span><span style="color:#91B859;"> zabbix-web-mysql</span><span style="color:#91B859;"> zabbix-nginx-conf</span><span style="color:#91B859;"> zabbix-sql-scripts</span><span style="color:#91B859;"> zabbix-selinux-policy</span><span style="color:#91B859;"> zabbix-agent2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 3 创建初始数据库</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 安装mysql,确保数据库服务器已启动并正在运行。</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> mysql-server</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> mysqld</span></span>
<span class="line"><span style="color:#E2931D;">mysqladmin</span><span style="color:#91B859;"> -uroot</span><span style="color:#91B859;"> password</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">luozaibo</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># mysql -uroot -p password</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># mysql</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span><span style="color:#39ADB5;"> |</span><span style="color:#E2931D;"> mysql</span><span style="color:#91B859;"> -uroot</span><span style="color:#91B859;"> -pluozaibo</span></span>
<span class="line"><span style="color:#91B859;">create database zabbix character set utf8mb4 collate utf8mb4_bin;</span></span>
<span class="line"><span style="color:#91B859;">create user zabbix@localhost identified by &#39;luozaibo&#39;;</span></span>
<span class="line"><span style="color:#91B859;">grant all privileges on zabbix.* to zabbix@localhost;</span></span>
<span class="line"><span style="color:#91B859;">set global log_bin_trust_function_creators = 1;</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 4 在 Zabbix 服务器主机上导入初始架构和数据</span></span>
<span class="line"><span style="color:#E2931D;">zcat</span><span style="color:#91B859;"> /usr/share/zabbix-sql-scripts/mysql/server.sql.gz</span><span style="color:#39ADB5;"> |</span><span style="color:#E2931D;"> mysql</span><span style="color:#91B859;"> --default-character-set=utf8mb4</span><span style="color:#91B859;"> -uzabbix</span><span style="color:#91B859;"> -pluozaibo</span><span style="color:#91B859;"> zabbix</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 导入数据库模式后禁用 log_bin_trust_function_creators 选项</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span><span style="color:#39ADB5;"> |</span><span style="color:#E2931D;"> mysql</span><span style="color:#91B859;"> -uroot</span><span style="color:#91B859;"> -pluozaibo</span></span>
<span class="line"><span style="color:#91B859;">set global log_bin_trust_function_creators = 0;</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 5 为Zabbix服务器配置数据库</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># vim /etc/zabbix/zabbix_server.conf</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/# DBPassword/a DBPassword=luozaibo</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/zabbix_server.conf</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># DBPassword=password</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 6 编辑文件 /etc/nginx/conf.d/zabbix.conf 取消注释并设置“listen”和“server_name”指令。</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># listen 8080;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># server_name test.com;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># test.com为服务器ip地址，需要DNS解析</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">1a\\        listen          8080;\\n        server_name     10.0.0.100;</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /etc/nginx/conf.d/zabbix.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 7 启动 Zabbix 服务器</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> enable</span><span style="color:#91B859;"> --now</span><span style="color:#91B859;"> zabbix-server</span><span style="color:#91B859;"> zabbix-agent2</span><span style="color:#91B859;"> nginx</span><span style="color:#91B859;"> php-fpm</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 8 打开 test.com:8080</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 默认用户名 Admin</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 默认密码 zabbix</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-PUoHG" id="tab-kj79OGf" checked><label for="tab-kj79OGf">Zabbix服务器</label><input type="radio" name="group-PUoHG" id="tab-5l1-QUX"><label for="tab-5l1-QUX">aaa</label></div><div class="blocks"><div class="language-bash active line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="color:#39ADB5;">&lt;&lt;&lt;</span><span style="color:#91B859;"> @/script-files/zabbix.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></div></div>`,2),o=[e];function r(c,t,i,b,y,m){return a(),n("div",null,o)}const B=s(p,[["render",r]]);export{d as __pageData,B as default};
