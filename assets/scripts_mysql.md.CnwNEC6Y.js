import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"mysql安装","description":"VitePress","frontmatter":{"date":"2024-03-09 10:57:17","description":"VitePress","title":"mysql安装","sidebar":true},"headers":[],"relativePath":"scripts/mysql.md","filePath":"scripts/mysql.md"}'),p={name:"scripts/mysql.md"},e=l(`<p><a href="http://rocky8.com:5173/script-file/mysql.sh" target="_blank" rel="noreferrer">http://rocky8.com:5173/script-file/mysql.sh</a></p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">tar_name</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">mysql-8.0.36-linux-glibc2.28-x86_64.tar.xz</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># MySQL 二进制包下载链接</span></span>
<span class="line"><span style="color:#90A4AE;">mysql_download_url</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">https://dev.mysql.com/get/Downloads/MySQL-8.0/</span><span style="color:#90A4AE;">$tar_name</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#mysql_download_url=&quot;https://mirrors.aliyun.com/mysql/MySQL-8.0/mysql-8.0.28-linux-glibc2.12-x86_64.tar.xz&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># MySQL 二进制包存放目录</span></span>
<span class="line"><span style="color:#90A4AE;">mysql_tar_dir</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">/opt</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># MySQL 安装目录</span></span>
<span class="line"><span style="color:#90A4AE;">mysql_install_dir</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">tar_name</span><span style="color:#39ADB5;">%</span><span style="color:#90A4AE;">.tar.xz</span><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># MySQL 数据目录</span></span>
<span class="line"><span style="color:#90A4AE;">mysql_data_dir</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">/data/mysql</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># MySQL 配置文件路径</span></span>
<span class="line"><span style="color:#90A4AE;">mysql_conf</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;">/etc/my.cnf</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 设置密码</span></span>
<span class="line"><span style="color:#90A4AE;">mysql_root_password</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">123456</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">color</span><span style="color:#39ADB5;">()</span><span style="color:#39ADB5;"> {</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">\\033[32m</span><span style="color:#90A4AE;">$*</span><span style="color:#91B859;">\\033[0m</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 检查当前用户是否为 root</span></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;"> $UID </span><span style="color:#39ADB5;">-ne</span><span style="color:#F76D47;"> 0</span><span style="color:#39ADB5;"> ]</span><span style="color:#39ADB5;"> &amp;&amp;</span><span style="color:#39ADB5;"> {</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">please use root run this script</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;">;</span><span style="color:#6182B8;"> exit</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 检查 MySQL 安装目录是否存在</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> !</span><span style="color:#39ADB5;"> -d</span><span style="color:#90A4AE;"> $mysql_install_dir </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # 下载 MySQL 二进制包</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">Downloading MySQL binary package...</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">    wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;">  -P</span><span style="color:#90A4AE;"> $mysql_tar_dir $mysql_download_url</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # 解压 MySQL 二进制包</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">Extracting MySQL binary package...</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#E2931D;">    tar</span><span style="color:#91B859;"> xf</span><span style="color:#90A4AE;"> $mysql_tar_dir</span><span style="color:#91B859;">/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">tar_name</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;"> -C</span><span style="color:#91B859;"> /usr/local</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #ln -s /usr/local/$mysql_dir /usr/local/mysql</span></span>
<span class="line"><span style="color:#E2931D;">    chown</span><span style="color:#91B859;"> -R</span><span style="color:#91B859;"> root:root</span><span style="color:#90A4AE;"> $mysql_install_dir</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # 加入环境变量</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #echo &quot;PATH=$mysql_install_dir/bin:$PATH&quot; &gt; /etc/profile.d/mysql.sh</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    #. /etc/profile.d/mysql.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">ln</span><span style="color:#91B859;"> -s</span><span style="color:#90A4AE;"> $mysql_install_dir</span><span style="color:#91B859;">/bin/mysql</span><span style="color:#90A4AE;">*</span><span style="color:#91B859;"> /usr/local/bin</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 设置 MySQL 数据目录权限</span></span>
<span class="line"><span style="color:#E2931D;">id</span><span style="color:#91B859;"> mysql</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#E2931D;"> useradd</span><span style="color:#91B859;"> -r</span><span style="color:#91B859;"> -s</span><span style="color:#91B859;"> /sbin/nologin</span><span style="color:#91B859;"> mysql</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#chown -R mysql:mysql $mysql_data_dir</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 写入 MySQL 配置文件</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#90A4AE;"> $mysql_conf</span></span>
<span class="line"><span style="color:#91B859;">[mysqld]</span></span>
<span class="line"><span style="color:#91B859;">basedir=</span><span style="color:#90A4AE;">$mysql_install_dir</span></span>
<span class="line"><span style="color:#91B859;">datadir=</span><span style="color:#90A4AE;">$mysql_data_dir</span></span>
<span class="line"><span style="color:#91B859;">socket=</span><span style="color:#90A4AE;">$mysql_data_dir</span><span style="color:#91B859;">/mysql.sock</span></span>
<span class="line"><span style="color:#91B859;">pid-file=</span><span style="color:#90A4AE;">$mysql_data_dir</span><span style="color:#91B859;">/mysql.pid</span></span>
<span class="line"><span style="color:#91B859;">log-error=</span><span style="color:#90A4AE;">$mysql_data_dir</span><span style="color:#91B859;">/mysql.log</span></span>
<span class="line"><span style="color:#91B859;">log-bin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[client]</span></span>
<span class="line"><span style="color:#91B859;">socket=</span><span style="color:#90A4AE;">$mysql_data_dir</span><span style="color:#91B859;">/mysql.sock</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 初始化 MySQL 数据库</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 初始化数据库</span></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#39ADB5;"> -d</span><span style="color:#90A4AE;"> /data </span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> mkdir</span><span style="color:#91B859;"> /data</span></span>
<span class="line"><span style="color:#E2931D;">mysqld</span><span style="color:#91B859;"> --initialize</span><span style="color:#91B859;"> --user=mysql</span><span style="color:#91B859;"> --datadir=</span><span style="color:#90A4AE;">$mysql_data_dir</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 启用 MySQL 服务自启动</span></span>
<span class="line"><span style="color:#E2931D;">cp</span><span style="color:#90A4AE;"> $mysql_install_dir</span><span style="color:#91B859;">/support-files/mysql.server</span><span style="color:#91B859;"> /etc/init.d/mysqld</span></span>
<span class="line"><span style="color:#E2931D;">chkconfig</span><span style="color:#91B859;"> --add</span><span style="color:#91B859;"> mysqld</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 启动MySQL...</span></span>
<span class="line"><span style="color:#E2931D;">service</span><span style="color:#91B859;"> mysqld</span><span style="color:#91B859;"> start</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;"> $? </span><span style="color:#39ADB5;">-ne</span><span style="color:#F76D47;"> 0</span><span style="color:#39ADB5;"> ]</span><span style="color:#39ADB5;"> &amp;&amp;</span><span style="color:#39ADB5;"> {</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">MySQL启动失败，退出</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;">;</span><span style="color:#6182B8;"> exit</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 等待 MySQL 启动</span></span>
<span class="line"><span style="color:#E2931D;">sleep</span><span style="color:#F76D47;"> 3</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">mysql_oldpassword</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">awk</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/A temporary password/{print $NF}</span><span style="color:#39ADB5;">&#39;</span><span style="color:#90A4AE;"> $mysql_data_dir</span><span style="color:#91B859;">/mysql.log</span><span style="color:#39ADB5;">\`</span></span>
<span class="line"><span style="color:#E2931D;">mysqladmin</span><span style="color:#91B859;"> -uroot</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;">$mysql_oldpassword</span><span style="color:#91B859;"> password</span><span style="color:#90A4AE;"> $mysql_root_password </span><span style="color:#39ADB5;">&amp;&gt;</span><span style="color:#90A4AE;">/dev/null  </span><span style="color:#39ADB5;">&amp;&amp;</span><span style="color:#E2931D;"> color</span><span style="color:#91B859;"> 密码修改完成</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">MySQL安装完成</span><span style="color:#39ADB5;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br></div></div><h2 id="离线安装mysql" tabindex="-1">离线安装mysql <a class="header-anchor" href="#离线安装mysql" aria-label="Permalink to &quot;离线安装mysql&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">MYSQL</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">mysql-8.0.36-linux-glibc2.28-x86_64.tar.xz</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">ROOT_PASSWORD</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">luozaibo</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> /opt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">if</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> !</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> $MYSQL </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/opt/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">MYSQL</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">不存在</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#6182B8;">    exit</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">elif</span><span style="color:#39ADB5;"> [</span><span style="color:#39ADB5;"> -e</span><span style="color:#90A4AE;"> /usr/local/mysql </span><span style="color:#39ADB5;">];</span><span style="color:#39ADB5;font-style:italic;"> then</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/usr/local/mysql</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> 已存在</span></span>
<span class="line"><span style="color:#6182B8;">    exit</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">else</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">开始安装Mysql...</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">fi</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">install_mysql</span><span style="color:#39ADB5;">(){</span></span>
<span class="line"><span style="color:#E2931D;">    dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> -q</span><span style="color:#91B859;"> libaio</span><span style="color:#91B859;"> numactl-libs</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    tar</span><span style="color:#91B859;"> xf</span><span style="color:#90A4AE;"> $MYSQL </span><span style="color:#91B859;">-C</span><span style="color:#91B859;"> /usr/local</span></span>
<span class="line"><span style="color:#90A4AE;">    MYSQL_DIR</span><span style="color:#39ADB5;">=\${</span><span style="color:#90A4AE;">MYSQL</span><span style="color:#39ADB5;">%</span><span style="color:#90A4AE;">.tar.xz</span><span style="color:#39ADB5;">}</span></span>
<span class="line"><span style="color:#E2931D;">    ln</span><span style="color:#91B859;"> -sv</span><span style="color:#91B859;"> /usr/local/</span><span style="color:#90A4AE;">$MYSQL_DIR </span><span style="color:#91B859;">/usr/local/mysql</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    chown</span><span style="color:#91B859;"> -R</span><span style="color:#91B859;"> root.root</span><span style="color:#91B859;"> /usr/local/mysql/</span></span>
<span class="line"><span style="color:#E2931D;">    id</span><span style="color:#91B859;"> mysql</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#39ADB5;"> {</span><span style="color:#E2931D;"> useradd</span><span style="color:#91B859;"> -s</span><span style="color:#91B859;"> /sbin/nologin</span><span style="color:#91B859;"> -r</span><span style="color:#91B859;"> mysql</span><span style="color:#39ADB5;"> ;</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">创建 mysql用户</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">PATH=/usr/local/mysql/bin/:$PATH</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/profile.d/mysql.sh</span></span>
<span class="line"><span style="color:#6182B8;">    .</span><span style="color:#91B859;"> /etc/profile.d/mysql.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/my.cnf</span><span style="color:#39ADB5;"> &lt;&lt;-</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">[mysqld]</span></span>
<span class="line"><span style="color:#91B859;">server-id=1</span></span>
<span class="line"><span style="color:#91B859;">log-bin</span></span>
<span class="line"><span style="color:#91B859;">datadir=/data/mysql</span></span>
<span class="line"><span style="color:#91B859;">socket=/data/mysql/mysql.sock</span></span>
<span class="line"><span style="color:#91B859;">log-error=/data/mysql/mysql.log</span></span>
<span class="line"><span style="color:#91B859;">pid-file=/data/mysql/mysql.pid</span></span>
<span class="line"><span style="color:#91B859;">[client]</span></span>
<span class="line"><span style="color:#91B859;">socket=/data/mysql/mysql.sock</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">    [</span><span style="color:#39ADB5;"> -d</span><span style="color:#90A4AE;"> /data </span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> mkdir</span><span style="color:#91B859;"> /data</span></span>
<span class="line"><span style="color:#E2931D;">    mysqld</span><span style="color:#91B859;"> --initialize</span><span style="color:#91B859;"> --user=mysql</span><span style="color:#91B859;"> --datadir=/data/mysql</span></span>
<span class="line"><span style="color:#E2931D;">    cp</span><span style="color:#91B859;"> /usr/local/mysql/support-files/mysql.server</span><span style="color:#91B859;"> /etc/init.d/mysqld</span></span>
<span class="line"><span style="color:#E2931D;">    chkconfig</span><span style="color:#91B859;"> --add</span><span style="color:#91B859;"> mysqld</span></span>
<span class="line"><span style="color:#E2931D;">    chkconfig</span><span style="color:#91B859;"> mysqld</span><span style="color:#91B859;"> on</span></span>
<span class="line"><span style="color:#E2931D;">    systemctl</span><span style="color:#91B859;"> start</span><span style="color:#91B859;"> mysqld</span></span>
<span class="line"><span style="color:#39ADB5;">    [</span><span style="color:#90A4AE;"> $? </span><span style="color:#39ADB5;">-ne</span><span style="color:#F76D47;"> 0</span><span style="color:#39ADB5;"> ]</span><span style="color:#39ADB5;"> &amp;&amp;</span><span style="color:#39ADB5;"> {</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">数据库启动失败，退出!</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;">;</span><span style="color:#6182B8;"> exit</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span></span>
<span class="line"><span style="color:#E2931D;">    sleep</span><span style="color:#F76D47;"> 3</span></span>
<span class="line"><span style="color:#90A4AE;">    MYSQL_OLDPASSWORD</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">awk</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/A temporary password/{print $NF}</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> /data/mysql/mysql.log</span><span style="color:#39ADB5;">\`</span></span>
<span class="line"><span style="color:#E2931D;">    mysqladmin</span><span style="color:#91B859;"> -uroot</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;">$MYSQL_OLDPASSWORD</span><span style="color:#91B859;"> password</span><span style="color:#90A4AE;"> $MYSQL_ROOT_PASSWORD </span><span style="color:#39ADB5;">&amp;&gt;</span><span style="color:#90A4AE;">/dev/null</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">MySQL安装完成</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">run . /etc/profile.d/mysql.sh 更新PATH</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">install_mysql</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div>`,4),o=[e];function r(c,t,y,i,b,A){return a(),n("div",null,o)}const u=s(p,[["render",r]]);export{B as __pageData,u as default};
