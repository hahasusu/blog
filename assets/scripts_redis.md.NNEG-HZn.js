import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"scripts/redis.md","filePath":"scripts/redis.md"}'),p={name:"scripts/redis.md"},e=l(`<div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># Date: 2024-07-06 20:11:12</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">set</span><span style="color:#91B859;"> -e</span></span>
<span class="line"><span style="color:#90A4AE;">redis_version</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">redis-7.2.0</span></span>
<span class="line"><span style="color:#90A4AE;">redis_dir</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/local/redis</span></span>
<span class="line"><span style="color:#90A4AE;">cpus</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">nproc</span><span style="color:#39ADB5;">\`</span></span>
<span class="line"><span style="color:#90A4AE;">PASSWORD</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">123456</span></span>
<span class="line"><span style="color:#90A4AE;">PORT</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">6379</span></span>
<span class="line"><span style="color:#90A4AE;">CONFIG</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">redis_</span><span style="color:#90A4AE;">$PORT</span><span style="color:#91B859;">.conf</span></span>
<span class="line"><span style="color:#90A4AE;">PIDFILE</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">redis_</span><span style="color:#90A4AE;">$PORT</span><span style="color:#91B859;">.pid</span></span>
<span class="line"><span style="color:#90A4AE;">LOGFILE</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">redis_</span><span style="color:#90A4AE;">$PORT</span><span style="color:#91B859;">.log</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">color</span><span style="color:#39ADB5;">()</span><span style="color:#39ADB5;"> {</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#91B859;"> -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">\\e[32m</span><span style="color:#90A4AE;">$*</span><span style="color:#91B859;">\\e[0m</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#39ADB5;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 安装依赖...</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> jemalloc-devel</span><span style="color:#91B859;"> systemd-devel</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> -nc</span><span style="color:#91B859;"> https://download.redis.io/releases/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">redis_version</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.tar.gz</span><span style="color:#91B859;"> -P</span><span style="color:#91B859;"> /opt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">tar</span><span style="color:#91B859;"> xf</span><span style="color:#91B859;"> /opt/</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">redis_version</span><span style="color:#39ADB5;">}</span><span style="color:#91B859;">.tar.gz</span><span style="color:#91B859;"> -C</span><span style="color:#91B859;"> /usr/local/src</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> /usr/local/src/</span><span style="color:#90A4AE;">$redis_version</span></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#91B859;"> -j</span><span style="color:#90A4AE;"> $cpus </span><span style="color:#91B859;">USE_SYSTEMD=yes</span><span style="color:#91B859;"> PREFIX=</span><span style="color:#39ADB5;">\${</span><span style="color:#90A4AE;">redis_dir</span><span style="color:#39ADB5;">}</span><span style="color:#39ADB5;"> &amp;&amp;</span><span style="color:#E2931D;"> make</span><span style="color:#91B859;"> install</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#make -j $cpus USE_SYSTEMD=yes &amp;&amp; make install</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#ln -sv \${redis_dir}/bin/redis-* /usr/local/bin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 默认安装位置 /usr/local/bin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">mkdir</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;"> $redis_dir</span><span style="color:#91B859;">/{log,data,run}</span></span>
<span class="line"><span style="color:#E2931D;">cp</span><span style="color:#91B859;"> redis.conf</span><span style="color:#90A4AE;"> $redis_dir</span><span style="color:#91B859;">/</span><span style="color:#90A4AE;">$CONFIG</span></span>
<span class="line"><span style="color:#E2931D;">id</span><span style="color:#91B859;"> redis</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#E2931D;"> useradd</span><span style="color:#91B859;"> -s</span><span style="color:#91B859;"> /sbin/nologin</span><span style="color:#91B859;"> -r</span><span style="color:#91B859;"> redis</span></span>
<span class="line"><span style="color:#E2931D;">chown</span><span style="color:#91B859;"> -R</span><span style="color:#91B859;"> redis:redis</span><span style="color:#90A4AE;"> $redis_dir</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改配置</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># daemonize yes</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -ri</span><span style="color:#91B859;"> -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">s/(^daemonize ).*/\\1yes/</span><span style="color:#39ADB5;">&quot;</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">        -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">s/(^bind ).*/\\10.0.0.0/</span><span style="color:#39ADB5;">&quot;</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">        -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/^pidfile/c pidfile </span><span style="color:#90A4AE;">$redis_dir</span><span style="color:#91B859;">/</span><span style="color:#90A4AE;">$PIDFILE</span><span style="color:#39ADB5;">&quot;</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">        -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/^logfile/c logfile </span><span style="color:#90A4AE;">$redis_dir</span><span style="color:#91B859;">/</span><span style="color:#90A4AE;">$LOGFILE</span><span style="color:#39ADB5;">&quot;</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#91B859;">        -e</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">/# requirepass/a requirepass </span><span style="color:#90A4AE;">$PASSWORD</span><span style="color:#39ADB5;">&quot;</span><span style="color:#90A4AE;"> \\</span></span>
<span class="line"><span style="color:#90A4AE;">        $redis_dir</span><span style="color:#91B859;">/</span><span style="color:#90A4AE;">$CONFIG</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 消除 memory overcommit警告，可选</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">vm.overcommit_memory = 1</span><span style="color:#39ADB5;">&quot;</span><span style="color:#39ADB5;"> &gt;&gt;</span><span style="color:#91B859;"> /etc/sysctl.conf</span></span>
<span class="line"><span style="color:#E2931D;">sysctl</span><span style="color:#91B859;"> -p</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># service文件</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /lib/systemd/system/redis.service</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">[Unit]</span></span>
<span class="line"><span style="color:#91B859;">Description=Redis data structure server</span></span>
<span class="line"><span style="color:#91B859;">Documentation=https://redis.io/documentation</span></span>
<span class="line"><span style="color:#91B859;">Wants=network-online.target</span></span>
<span class="line"><span style="color:#91B859;">After=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Service]</span></span>
<span class="line"><span style="color:#91B859;">ExecStart=/usr/local/bin/redis-server </span><span style="color:#90A4AE;">$redis_dir</span><span style="color:#91B859;">/</span><span style="color:#90A4AE;">$CONFIG</span><span style="color:#91B859;"> --supervised systemd --daemonize no</span></span>
<span class="line"><span style="color:#91B859;">ExecStop=/bin/kill -s QUIT </span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">MAINPID</span></span>
<span class="line"><span style="color:#91B859;">LimitNOFILE=10032</span></span>
<span class="line"><span style="color:#91B859;">NoNewPrivileges=yes</span></span>
<span class="line"><span style="color:#91B859;">#OOMScoreAdjust=-900</span></span>
<span class="line"><span style="color:#91B859;">#PrivateTmp=yes</span></span>
<span class="line"><span style="color:#91B859;">Type=notify</span></span>
<span class="line"><span style="color:#91B859;">TimeoutStartSec=infinity</span></span>
<span class="line"><span style="color:#91B859;">TimeoutStopSec=infinity</span></span>
<span class="line"><span style="color:#91B859;">UMask=0077</span></span>
<span class="line"><span style="color:#91B859;">User=redis</span></span>
<span class="line"><span style="color:#91B859;">Group=redis</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[Install]</span></span>
<span class="line"><span style="color:#91B859;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 启动服务端</span></span>
<span class="line"><span style="color:#E2931D;">color</span><span style="color:#91B859;"> 启动redis_server...</span></span>
<span class="line"><span style="color:#E2931D;">systemctl</span><span style="color:#91B859;"> daemon-reload</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#systemctl enable --now redis</span></span>
<span class="line"><span style="color:#E2931D;">sleep</span><span style="color:#F76D47;"> 2</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 连接</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 或者进入验证 auth password</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># redis-cli -a password</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#redis-cli -a $PASSWORD INFO Server</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#redis-cli -a $PASSWORD info server &amp;&amp; color 安装完成 || echo error install</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div>`,1),o=[e];function r(c,t,i,y,b,A){return a(),n("div",null,o)}const B=s(p,[["render",r]]);export{u as __pageData,B as default};
