import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{"date":"2024-03-24 08:34:52"},"headers":[],"relativePath":"devops/loadbalance/keepalived/index.md","filePath":"devops/loadbalance/keepalived/index.md"}'),p={name:"devops/loadbalance/keepalived/index.md"},e=l(`<p><img src="http://pic.justdoiit.top/imgs/2024-03-18-1710746170.webp" alt="" loading="lazy"></p><p>主页：<a href="https://keepalived.org" target="_blank" rel="noreferrer">https://keepalived.org</a></p><h2 id="软件设计" tabindex="-1">软件设计 <a class="header-anchor" href="#软件设计" aria-label="Permalink to &quot;软件设计&quot;">​</a></h2><p><a href="https://keepalived-doc.readthedocs.io/zh-cn/latest/%E8%BD%AF%E4%BB%B6%E8%AE%BE%E8%AE%A1.html" target="_blank" rel="noreferrer">https://keepalived-doc.readthedocs.io/zh-cn/latest/软件设计.html</a></p><blockquote><p>Keepalived是用纯ANSI/ISO C编写的。该软件围绕一个中央I/O多路复用器进行连接，以提供实时网络设计。</p></blockquote><p>为了确保健壮性和稳定性，守护进程被切分为3个不同进程：</p><ul><li>一个极简的父进程，负责fork和监控子进程</li><li>两个子进程，一个负责VRRP框架，另一个负责健康检查</li></ul><h2 id="包安装" tabindex="-1">包安装 <a class="header-anchor" href="#包安装" aria-label="Permalink to &quot;包安装&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="编译安装" tabindex="-1">编译安装 <a class="header-anchor" href="#编译安装" aria-label="Permalink to &quot;编译安装&quot;">​</a></h2><p>下载页面：<a href="https://keepalived.org/download.html" target="_blank" rel="noreferrer">https://keepalived.org/download.html</a></p><p>github下载：<a href="https://github.com/acassen/keepalived/tags" target="_blank" rel="noreferrer">https://github.com/acassen/keepalived/tags</a></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 依赖rhel</span></span>
<span class="line"><span style="color:#E2931D;">dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> curl</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> make</span><span style="color:#91B859;"> openssl-devel</span><span style="color:#91B859;"> libnl3-devel</span><span style="color:#91B859;"> net-snmp-devel</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 依赖debian</span></span>
<span class="line"><span style="color:#E2931D;">apt</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> curl</span><span style="color:#91B859;"> gcc</span><span style="color:#91B859;"> libssl-dev</span><span style="color:#91B859;"> libnl-3-dev</span><span style="color:#91B859;"> libnl-genl-3-dev</span><span style="color:#91B859;"> libsnmp-dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 下载二进制包</span></span>
<span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://keepalived.org/software/keepalived-2.2.8.tar.gz</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">tar</span><span style="color:#91B859;"> xf</span><span style="color:#91B859;"> keepalived-2.2.8.tar.gz</span><span style="color:#91B859;"> -C</span><span style="color:#91B859;"> /usr/local/src</span></span>
<span class="line"><span style="color:#6182B8;">cd</span><span style="color:#91B859;"> /usr/local/src/keepalived-2.2.8/</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 编译</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#选项--disable-fwmark 可用于禁用iptables规则,可访止VIP无法访问,无此选项默认会启用iptables规则</span></span>
<span class="line"><span style="color:#E2931D;">./configure</span><span style="color:#91B859;"> --prefix=/usr/local/keepalived</span><span style="color:#90A4AE;font-style:italic;"> #--disable-fwmark</span></span>
<span class="line"><span style="color:#E2931D;">make</span><span style="color:#39ADB5;"> &amp;&amp;</span><span style="color:#E2931D;"> make</span><span style="color:#91B859;"> install</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># service 文件</span></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Unit</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Description</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">LVS</span><span style="color:#E2931D;"> and</span><span style="color:#91B859;"> VRRP</span><span style="color:#91B859;"> High</span><span style="color:#91B859;"> Availability</span><span style="color:#91B859;"> Monitor</span></span>
<span class="line"><span style="color:#90A4AE;">After</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">network-online.target</span><span style="color:#E2931D;"> syslog.target</span></span>
<span class="line"><span style="color:#90A4AE;">Wants</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Service</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">Type</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">forking</span></span>
<span class="line"><span style="color:#90A4AE;">PIDFile</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/var/run/keepalived.pid</span></span>
<span class="line"><span style="color:#90A4AE;">KillMode</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">process</span></span>
<span class="line"><span style="color:#90A4AE;">EnvironmentFile</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">-/etc/sysconfig/keepalived</span></span>
<span class="line"><span style="color:#90A4AE;">ExecStart</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/usr/sbin/keepalived</span><span style="color:#90A4AE;"> $KEEPALIVED_OPTIONS</span></span>
<span class="line"><span style="color:#90A4AE;">ExecReload</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">/bin/kill</span><span style="color:#E2931D;"> -HUP</span><span style="color:#90A4AE;"> $MAINPID</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#90A4AE;">Install</span><span style="color:#39ADB5;">]</span></span>
<span class="line"><span style="color:#90A4AE;">WantedBy</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">multi-user.target</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h2 id="修改内核参数" tabindex="-1">修改内核参数 <a class="header-anchor" href="#修改内核参数" aria-label="Permalink to &quot;修改内核参数&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">vim</span><span style="color:#91B859;"> /etc/sysctl.conf</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">net.ipv4.ip_nonlocal_bind</span><span style="color:#91B859;"> =</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">sysctl</span><span style="color:#91B859;"> -p</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="全局配置" tabindex="-1">全局配置 <a class="header-anchor" href="#全局配置" aria-label="Permalink to &quot;全局配置&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#/etc/keepalived/keepalived.conf</span></span>
<span class="line"><span style="color:#E2931D;">global_defs</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">	notification_email</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">		root@localhost</span><span style="color:#90A4AE;font-style:italic;"> #keepalived 发生故障切换时邮件发送的目标邮箱，可以按行区分写多个</span></span>
<span class="line"><span style="color:#E2931D;">		root@wangxiaochun.com</span></span>
<span class="line"><span style="color:#E2931D;">		29308620@qq.com</span></span>
<span class="line"><span style="color:#90A4AE;">	}</span></span>
<span class="line"><span style="color:#E2931D;">	notification_email_from</span><span style="color:#91B859;"> keepalived@localhost</span><span style="color:#90A4AE;font-style:italic;"> #发邮件的地址</span></span>
<span class="line"><span style="color:#E2931D;">	smtp_server</span><span style="color:#F76D47;"> 127.0.0.1</span><span style="color:#90A4AE;font-style:italic;"> #邮件服务器地址</span></span>
<span class="line"><span style="color:#E2931D;">	smtp_connect_timeout</span><span style="color:#F76D47;"> 30</span><span style="color:#90A4AE;font-style:italic;"> #邮件服务器连接timeout</span></span>
<span class="line"><span style="color:#E2931D;">	router_id</span><span style="color:#91B859;"> ka1.example.com</span><span style="color:#90A4AE;font-style:italic;"> #每个keepalived主机唯一标识，建议使用当前主机名，如果多节点重名可能会影响切换脚本执行</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">	vrrp_skip_check_adv_addr</span><span style="color:#90A4AE;font-style:italic;"> #对所有通告报文都检查，会比较消耗性能，启用此配置后，如果收到的通告报文和上一个报文是同一个路由器，则跳过检查，默认值为全检查</span></span>
<span class="line"><span style="color:#E2931D;">	vrrp_strict</span><span style="color:#90A4AE;font-style:italic;"> #严格遵守VRRP协议,启用此项后以下状况将无法启动服务:1.无VIP地址 2.配置了单播邻居 3.在VRRP版本2中有IPv6地址，开启动此项并且没有配置vrrp_iptables时会自动开启iptables防火墙规则，默认导致VIP无法访问,建议不加此项配置</span></span>
<span class="line"><span style="color:#E2931D;">	vrrp_garp_interval</span><span style="color:#F76D47;"> 0</span><span style="color:#90A4AE;font-style:italic;"> #gratuitous ARP messages 报文发送延迟，0表示不延迟</span></span>
<span class="line"><span style="color:#E2931D;">	vrrp_gna_interval</span><span style="color:#F76D47;"> 0</span><span style="color:#90A4AE;font-style:italic;"> #unsolicited NA messages （不请自来）消息发送延迟</span></span>
<span class="line"><span style="color:#E2931D;">	vrrp_mcast_group4</span><span style="color:#F76D47;"> 224.0.0.18</span><span style="color:#90A4AE;font-style:italic;"> #指定组播IP地址范围：224.0.0.0到239.255.255.255,默认值：224.0.0.18</span></span>
<span class="line"><span style="color:#E2931D;">	vrrp_iptables</span><span style="color:#90A4AE;font-style:italic;"> #此项和vrrp_strict同时开启时，则不会添加防火墙规则,如果无配置vrrp_strict项,则无需启用此项配置</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="配置虚拟路由器" tabindex="-1">配置虚拟路由器 <a class="header-anchor" href="#配置虚拟路由器" aria-label="Permalink to &quot;配置虚拟路由器&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">vrrp_instance</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">STRIN</span><span style="color:#90A4AE;">G</span><span style="color:#39ADB5;">&gt;</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #&lt;String&gt;为vrrp的实例名,一般为业务名称</span></span>
<span class="line"><span style="color:#E2931D;">	配置参数</span></span>
<span class="line"><span style="color:#6182B8;">	......</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#配置参数：</span></span>
<span class="line"><span style="color:#E2931D;">state</span><span style="color:#91B859;"> MASTER</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">BACKUP#当前节点在此虚拟路由器上的初始状态，状态为MASTER或者BACKUP</span></span>
<span class="line"><span style="color:#E2931D;">interface</span><span style="color:#91B859;"> IFACE_NAME</span><span style="color:#90A4AE;font-style:italic;"> #绑定为当前虚拟路由器使用的物理接口，如：eth0,bond0,br0,可以和VIP不</span></span>
<span class="line"><span style="color:#E2931D;">在一个网卡</span></span>
<span class="line"><span style="color:#E2931D;">virtual_router_id</span><span style="color:#91B859;"> VRID</span><span style="color:#90A4AE;font-style:italic;"> #每个虚拟路由器唯一标识，范围：0-255，每个虚拟路由器此值必须唯一，否</span></span>
<span class="line"><span style="color:#E2931D;">则服务无法启动，同属一个虚拟路由器的多个keepalived节点必须相同,务必要确认在同一网络中此值必须唯</span></span>
<span class="line"><span style="color:#E2931D;">一</span></span>
<span class="line"><span style="color:#E2931D;">priority</span><span style="color:#F76D47;"> 100</span><span style="color:#90A4AE;font-style:italic;"> #当前物理节点在此虚拟路由器的优先级，范围：1-254，每个keepalived主机节点此</span></span>
<span class="line"><span style="color:#E2931D;">值不同</span></span>
<span class="line"><span style="color:#E2931D;">advert_int</span><span style="color:#F76D47;"> 1</span><span style="color:#90A4AE;font-style:italic;"> #vrrp通告的时间间隔，默认1s</span></span>
<span class="line"><span style="color:#E2931D;">authentication</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #认证机制</span></span>
<span class="line"><span style="color:#E2931D;">	auth_type</span><span style="color:#91B859;"> AH</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">PASS</span><span style="color:#90A4AE;font-style:italic;"> #AH为IPSEC认证(不推荐),PASS为简单密码(建议使用)</span></span>
<span class="line"><span style="color:#E2931D;">	auth_pass</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">PASSWOR</span><span style="color:#90A4AE;">D</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;"> #预共享密钥，仅前8位有效，同一个虚拟路由器的多个keepalived节点必须一样</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"><span style="color:#E2931D;">virtual_ipaddress</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #虚拟IP,生产环境可能指定上百个IP地址</span></span>
<span class="line"><span style="color:#39ADB5;">	&lt;</span><span style="color:#E2931D;">IPADDR</span><span style="color:#90A4AE;">&gt;</span><span style="color:#91B859;">/</span><span style="color:#90A4AE;">&lt;MASK&gt; </span><span style="color:#91B859;">brd</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">IPADD</span><span style="color:#90A4AE;">R</span><span style="color:#39ADB5;">&gt;</span><span style="color:#91B859;"> dev</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">STRIN</span><span style="color:#90A4AE;">G</span><span style="color:#39ADB5;">&gt;</span><span style="color:#91B859;"> scope</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">SCOP</span><span style="color:#90A4AE;">E</span><span style="color:#39ADB5;">&gt;</span><span style="color:#91B859;"> label</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">LABE</span><span style="color:#90A4AE;">L</span><span style="color:#39ADB5;">&gt;</span></span>
<span class="line"><span style="color:#E2931D;">	192.168.200.100</span><span style="color:#90A4AE;font-style:italic;"> #指定VIP，不指定网卡，默认为eth0,注意：不指定/prefix,默认为/32</span></span>
<span class="line"><span style="color:#E2931D;">	192.168.200.101/24</span><span style="color:#91B859;"> dev</span><span style="color:#91B859;"> eth1</span><span style="color:#90A4AE;font-style:italic;"> #指定VIP的网卡，建议和interface指令指定的网卡不在一个网卡</span></span>
<span class="line"><span style="color:#E2931D;">	192.168.200.102/24</span><span style="color:#91B859;"> dev</span><span style="color:#91B859;"> eth2</span><span style="color:#91B859;"> label</span><span style="color:#91B859;"> eth2:1</span><span style="color:#90A4AE;font-style:italic;"> #指定VIP的网卡label</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"><span style="color:#E2931D;">track_interface</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #配置监控网络接口，一旦出现故障，则转为FAULT状态实现地址转移</span></span>
<span class="line"><span style="color:#E2931D;">	eth0</span></span>
<span class="line"><span style="color:#E2931D;">	eth1</span></span>
<span class="line"><span style="color:#E2931D;">	…</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="使用独立子配置文件" tabindex="-1">使用独立子配置文件 <a class="header-anchor" href="#使用独立子配置文件" aria-label="Permalink to &quot;使用独立子配置文件&quot;">​</a></h2><blockquote><p>当生产环境复杂时， /etc/keepalived/keepalived.conf 文件中内容过多，不易管理，可以将不同集 群的配置，比如：不同集群的VIP配置放在独立的子配置文件中</p></blockquote><p>利用<code>include</code> 指令可以实现包含子配置文件</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#在主配置文件 /etc/keepalived/keepalived.conf 最后加入</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">include</span><span style="color:#91B859;"> /etc/keepalived/conf.d/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="抢占模式和非抢占模式" tabindex="-1">抢占模式和非抢占模式 <a class="header-anchor" href="#抢占模式和非抢占模式" aria-label="Permalink to &quot;抢占模式和非抢占模式&quot;">​</a></h2><p>默认为抢占模式 preempt，即当高优先级的主机恢复在线后，会抢占低先级的主机的master角色，造成网络抖动，建议设置为非抢占模式 nopreempt ，即高优先级主机恢复后，并不会抢占低优先级主机的 master 角色</p><p>非抢占模式下,如果原主机down机, VIP迁移至的新主机, 后续新主机也发生down时,仍会将VIP迁移回原主机</p><p><strong>要关闭 VIP抢占，必须将各 Keepalived 服务器 state 配置为 BACKUP</strong></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;"># 主机1配置</span></span>
<span class="line"><span style="color:#E2931D;">vrrp_instance</span><span style="color:#91B859;"> VI_1</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">	state</span><span style="color:#91B859;"> BACKUP</span><span style="color:#90A4AE;font-style:italic;"> #都为BACKUP</span></span>
<span class="line"><span style="color:#E2931D;">	interface</span><span style="color:#91B859;"> eth0</span></span>
<span class="line"><span style="color:#E2931D;">	virtual_router_id</span><span style="color:#F76D47;"> 66</span></span>
<span class="line"><span style="color:#E2931D;">	priority</span><span style="color:#F76D47;"> 100</span><span style="color:#90A4AE;font-style:italic;"> #优先级高</span></span>
<span class="line"><span style="color:#E2931D;">	advert_int</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"><span style="color:#90A4AE;">	</span></span>
<span class="line"><span style="color:#E2931D;">	nopreempt</span><span style="color:#90A4AE;font-style:italic;"> #添加此行，设为nopreempt</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#主机2配置</span></span>
<span class="line"><span style="color:#E2931D;">vrrp_instance</span><span style="color:#91B859;"> VI_2</span><span style="color:#91B859;"> {</span></span>
<span class="line"><span style="color:#E2931D;">	state</span><span style="color:#91B859;"> BACKUP</span><span style="color:#90A4AE;font-style:italic;"> #都为BACKUP</span></span>
<span class="line"><span style="color:#E2931D;">	interface</span><span style="color:#91B859;"> eth0</span></span>
<span class="line"><span style="color:#E2931D;">	virtual_router_id</span><span style="color:#F76D47;"> 66</span></span>
<span class="line"><span style="color:#E2931D;">	priority</span><span style="color:#F76D47;"> 80</span><span style="color:#90A4AE;font-style:italic;"> #优先级低</span></span>
<span class="line"><span style="color:#E2931D;">	advert_int</span><span style="color:#F76D47;"> 1</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">	#nopreempt #生产中此主机是抢占式，不添加此行,否则会导致ka1即使优先级降低，也不会切换至ka2</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="实现lvs的高可用" tabindex="-1">实现LVS的高可用 <a class="header-anchor" href="#实现lvs的高可用" aria-label="Permalink to &quot;实现LVS的高可用&quot;">​</a></h2><h3 id="虚拟服务器配置" tabindex="-1">虚拟服务器配置 <a class="header-anchor" href="#虚拟服务器配置" aria-label="Permalink to &quot;虚拟服务器配置&quot;">​</a></h3><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">virtual_server</span><span style="color:#91B859;"> IP</span><span style="color:#91B859;"> port</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #VIP和PORT</span></span>
<span class="line"><span style="color:#E2931D;">	delay_loop</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">IN</span><span style="color:#90A4AE;">T</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;"> #检查后端服务器的时间间隔</span></span>
<span class="line"><span style="color:#E2931D;">	lb_algo</span><span style="color:#91B859;"> rr</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">wrr</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">lc</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">wlc</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">lblc</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">sh</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">dh</span><span style="color:#90A4AE;font-style:italic;"> #定义调度方法</span></span>
<span class="line"><span style="color:#E2931D;">	lb_kind</span><span style="color:#91B859;"> NAT</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">DR</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">TUN</span><span style="color:#90A4AE;font-style:italic;"> #集群的类型,注意要大写</span></span>
<span class="line"><span style="color:#E2931D;">	persistence_timeout</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">IN</span><span style="color:#90A4AE;">T</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;"> #持久连接时长</span></span>
<span class="line"><span style="color:#E2931D;">	protocol</span><span style="color:#91B859;"> TCP</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">UDP</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">SCTP</span><span style="color:#90A4AE;font-style:italic;"> #指定服务协议,一般为TCP</span></span>
<span class="line"><span style="color:#E2931D;">	sorry_server</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">IPADD</span><span style="color:#90A4AE;">R</span><span style="color:#39ADB5;">&gt;</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">POR</span><span style="color:#90A4AE;">T</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;"> #所有RS故障时，备用服务器地址</span></span>
<span class="line"><span style="color:#E2931D;">	real_server</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">IPADD</span><span style="color:#90A4AE;">R</span><span style="color:#39ADB5;">&gt;</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">POR</span><span style="color:#90A4AE;">T</span><span style="color:#39ADB5;">&gt;</span><span style="color:#91B859;"> {</span><span style="color:#90A4AE;font-style:italic;"> #RS的IP和PORT</span></span>
<span class="line"><span style="color:#E2931D;">	weight</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">IN</span><span style="color:#90A4AE;">T</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;"> #RS权重</span></span>
<span class="line"><span style="color:#E2931D;">	notify_up</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">STRIN</span><span style="color:#90A4AE;">G</span><span style="color:#39ADB5;">&gt;|&lt;</span><span style="color:#90A4AE;">QUOTED-STRING</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;"> #RS上线通知脚本</span></span>
<span class="line"><span style="color:#E2931D;">	notify_down</span><span style="color:#39ADB5;"> &lt;</span><span style="color:#91B859;">STRIN</span><span style="color:#90A4AE;">G</span><span style="color:#39ADB5;">&gt;|&lt;</span><span style="color:#90A4AE;">QUOTED-STRING</span><span style="color:#39ADB5;">&gt;</span><span style="color:#90A4AE;font-style:italic;"> #RS下线通知脚本</span></span>
<span class="line"><span style="color:#E2931D;">	HTTP_GET</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">SSL_GET</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">TCP_CHECK</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">SMTP_CHECK</span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;">MISC_CHECK</span><span style="color:#91B859;"> {</span><span style="color:#91B859;"> ...</span><span style="color:#91B859;"> }</span><span style="color:#90A4AE;font-style:italic;"> #定义当前主机健康状态检测方法</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span>
<span class="line"><span style="color:#90A4AE;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="实现haproxy的高可用" tabindex="-1">实现HAProxy的高可用 <a class="header-anchor" href="#实现haproxy的高可用" aria-label="Permalink to &quot;实现HAProxy的高可用&quot;">​</a></h2>`,32),o=[e];function t(r,c,i,y,b,A){return a(),n("div",null,o)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
