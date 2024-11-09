import{_ as a,c as e,o as s,a4 as l}from"./chunks/framework.GYzjcnJh.js";const m=JSON.parse('{"title":"第二周","description":"","frontmatter":{"title":"第二周","deep":true},"headers":[],"relativePath":"other/task/second.md","filePath":"other/task/second.md"}'),o={name:"other/task/second.md"},n=l(`<h2 id="_1-linux安全模型" tabindex="-1">1 Linux安全模型 <a class="header-anchor" href="#_1-linux安全模型" aria-label="Permalink to &quot;1 Linux安全模型&quot;">​</a></h2><p>通过3A（Authentication 认证，Authrization 授权，Aduition 审计）实现资源分配。</p><p>认证：登录Linux需要用户名和密码</p><p>授权：Linux的文件都拥有各自的权限</p><p>审计：系统日志记录了操作系统各个动作和事件</p><h2 id="_2-权限及acl相关命令" tabindex="-1">2 权限及ACL相关命令 <a class="header-anchor" href="#_2-权限及acl相关命令" aria-label="Permalink to &quot;2 权限及ACL相关命令&quot;">​</a></h2><p>文件的权限主要针对三类对象进行定义：<br> owner所属主, u；<br> group所属组, g；<br> other其他, o；<br> 每个文件针对每类访问者都定义了三种常用权限：<br> r Readable 4；<br> w Writable 2；<br> x eXcutable 1；<br> ACL相关命令：setfacl 可设置ACL权限；getfacl 可查看设置的ACL权限 ；</p><h3 id="acl和ugo" tabindex="-1">acl和ugo <a class="header-anchor" href="#acl和ugo" aria-label="Permalink to &quot;acl和ugo&quot;">​</a></h3><blockquote><p>UGO基本权限：只能一个用户、一个组合、其他人这三个对象进行授权</p><p>ACL文件权限管理：设置不同用户，不同的基本权限（r、w、x），对象数量不同</p></blockquote><h2 id="_3-vim的使用" tabindex="-1">3 vim的使用 <a class="header-anchor" href="#_3-vim的使用" aria-label="Permalink to &quot;3 vim的使用&quot;">​</a></h2><ol><li>如何打开文件。并在打开文件（命令模式）之后如何退出文件。</li></ol><p>打开文件：vim + 文件名<br> 打开文件（命令模式）退出：<br> 退出 ：q 保存退出 ：wq 强制退出 ：!q</p><ol start="2"><li>打开文件（命令模式）之后，进入插入模式。并在插入模式中如何回到打开文件的状态（命令模式），并在命令模式之后如何退出文件。 进入插入模式: <code>i</code> 当前光标位置处插入<br><code>I</code> 当前行首 非空位置插入<br><code>a</code> 当前光标后面插入<br><code>o</code> 当前行下新增一行插入</li></ol><p>插入模式返回命令模式： 输入Esc 命令模式退出<br> 退出 ：q<br> 保存退出 ：wq<br> 强制退出 ：!q</p><ol start="3"><li>打开文件（命令模式）之后，进入插入模式，编写一段话，&quot;马哥出品，必属精品&quot;, 之后从插入模式中如何回到打开文件的状态（命令模式），并在命令模式之后如何退出文件。</li></ol><p>vim a.txt 打开文件，输入i 进入插入模式，输入 马哥出品，必属精品， 输入Esc切换回命令模式，输入：wq 保存退出文件。</p><h2 id="_4-shell示例" tabindex="-1">4 shell示例 <a class="header-anchor" href="#_4-shell示例" aria-label="Permalink to &quot;4 shell示例&quot;">​</a></h2><p>通过shell编程完成，30鸡和兔的头，80鸡和兔的脚，分别有几只鸡，几只兔？</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#6182B8;">read</span><span style="color:#91B859;"> -p</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">头的数量: </span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;"> head</span></span>
<span class="line"><span style="color:#6182B8;">read</span><span style="color:#91B859;"> -p</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">脚的数量: </span><span style="color:#39ADB5;">&quot;</span><span style="color:#91B859;"> foot</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">rabbit</span><span style="color:#39ADB5;">=</span><span style="color:#90A4AE;">$</span><span style="color:#91B859;">[foot/2-head</span><span style="color:#90A4AE;">]</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#91B859;"> 兔子的数量是：</span><span style="color:#90A4AE;">$rabbit</span></span>
<span class="line"><span style="color:#6182B8;">echo</span><span style="color:#39ADB5;"> &quot;</span><span style="color:#91B859;">鸡的数量是 $[head - rabbit]</span><span style="color:#39ADB5;">&quot;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="_5-mbr-和-gpt" tabindex="-1">5 MBR 和 GPT <a class="header-anchor" href="#_5-mbr-和-gpt" aria-label="Permalink to &quot;5 MBR 和 GPT&quot;">​</a></h2><h3 id="mbr" tabindex="-1">MBR <a class="header-anchor" href="#mbr" aria-label="Permalink to &quot;MBR&quot;">​</a></h3><p>MBR：Master Boot Record，主分区引导记录。最早在1983年在IBM PC DOS 2.0中提出。<br> 每个扇区/区块都被分配了一个逻辑块地址，即LBA，而引导扇区则是每个分区的第一扇区，而主引导扇区则是整个硬盘的第一扇区（主分区的第一个扇区）。 MBR就保存在主引导扇区中。 另外，这个扇区里还包含了硬盘分区表DPT（Disk Partition Table），和结束标志字（Magic number）。 扇区总计512字节，MBR占446字节（0000H - 01BDH），DPT占据64个字节（01BEH - 01FDH），最后的magic number占2字节（01FEH – 01FFH）。 0磁道0扇区：512bytes 446bytes: boot loader 启动相关 64bytes：分区表，其中每16bytes标识一个分区 2bytes: 55AA，标识位 MBR分区中一块硬盘最多有4个主分区，也可以3主分区+1扩展(N个逻辑分区) MBR分区：主和扩展分区对应的1--4，/dev/sda3，逻辑分区从5开始，/dev/sda5</p><h3 id="gpt" tabindex="-1">GPT <a class="header-anchor" href="#gpt" aria-label="Permalink to &quot;GPT&quot;">​</a></h3><p>GPT：GUID（Globals Unique Identiﬁers） partition table 支持128个分区，使用64位，支持8Z（ 512Byte/block ）64Z （ 4096Byte/block） 使用128位UUID(Universally Unique Identiﬁer) 表示磁盘和分区 GPT分区表自动备份在头和尾两份，并有CRC校验位 UEFI (Uniﬁed Extensible Firmware Interface 统一可扩展固件接口)硬件支持GPT，使得操作系统可以启动</p><p>相较于<code>MBR</code>，<code>GPT</code>具有以下优点：</p><ol><li>得益于LBA提升至64位，以及分区表中每项128位设定，GPT可管理的空间近乎无限大，假设一个扇区大小仍为512字节，可表示扇区数为，算下来，可管理的硬盘容量=18EB(1EB=1024PB=1,048,576TB)，2T在它面前完全不在话下。按目前的硬盘技术来看，确实近乎无限，不过，以后的事谁知道呢。</li><li>分区数量几乎没有限制，由于可在表头中设置分区数量的大小，如果愿意，设置个分区也可以（有人愿意管理这么多分区吗），不过，目前windows仅支持最大128个分区。</li><li>自带保险，由于在磁盘的首尾部分各带一个GPT表头，任何一个受到破坏后都可以通过另一份恢复，极大地提高了磁盘的抗性（两个一起坏的请出门买彩票）。</li><li>循环冗余检验值针对关键数据结构而计算，提高了数据崩溃的检测几率。</li><li>尽管目前分区类型不超过百数（十数也没有吧。），GPT仍提供了16字节的GUID来标识分区类型，使其更不容易产生冲突。</li><li>每个分区都可以拥有一个特别的名字，最长72字节，足够写一首七律了。满足你的各种奇葩起名需求。</li><li>完美支持UEFI，毕竟它就是UEFI规范的衍生品。在将来全行业UEFI的情境下，GPT必将更快淘汰MBR。</li></ol><h2 id="_6-磁盘存储" tabindex="-1">6 磁盘存储 <a class="header-anchor" href="#_6-磁盘存储" aria-label="Permalink to &quot;6 磁盘存储&quot;">​</a></h2><p><strong>磁盘存储术语总结: head, track, sector, sylinder.</strong><br> head 磁头 磁头数=盘面数<br> track 磁道 = 柱面数<br> sector 扇区，512bytes<br> cylinder 柱面 1柱面=512 * sector数/track<em>head数=512</em>63*255=7.84M</p>`,28),r=[n];function t(i,p,c,d,b,h){return s(),e("div",null,r)}const B=a(o,[["render",t]]);export{m as __pageData,B as default};
