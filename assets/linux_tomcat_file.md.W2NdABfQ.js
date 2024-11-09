import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"linux/tomcat/file.md","filePath":"linux/tomcat/file.md"}'),e={name:"linux/tomcat/file.md"},p=l(`<ul><li>bin 服务启动、停止等相关程序和文件</li><li>conf 配置文件</li><li>lib 库目录</li><li>logs 日志目录</li><li>webapps 应用程序，应用部署目录</li><li>work jsp编译后的结果文件，建议提前预热访问，升级应用后，删除此目录数据才能更新</li></ul><h2 id="配置文件" tabindex="-1">配置文件 <a class="header-anchor" href="#配置文件" aria-label="Permalink to &quot;配置文件&quot;">​</a></h2><p><strong>conf</strong>目录</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">文件名</span></span>
<span class="line"><span style="color:#E2931D;">说明</span></span>
<span class="line"><span style="color:#E2931D;">server.xml</span></span>
<span class="line"><span style="color:#E2931D;">主配置文件</span></span>
<span class="line"><span style="color:#E2931D;">web.xml</span></span>
<span class="line"><span style="color:#E2931D;">每个webapp只有“部署”后才能被访问，它的部署方式通常由web.xml进行</span></span>
<span class="line"><span style="color:#E2931D;">定义，其存放位置为WEB-INF/目录中；此文件为所有的webapps提供默认</span></span>
<span class="line"><span style="color:#E2931D;">部署相关的配置,每个web应用也可以使用专用配置文件,来覆盖全局文件</span></span>
<span class="line"><span style="color:#E2931D;">context.xml</span></span>
<span class="line"><span style="color:#E2931D;">用于定义所有web应用均需加载的Context配置，此文件为所有的</span></span>
<span class="line"><span style="color:#E2931D;">webapps提供默认配置，每个web应用也可以使用自已专用的配置，它通</span></span>
<span class="line"><span style="color:#E2931D;">常由专用的配置文件context.xml来定义，其存放位置为WEB-INF/目录中,</span></span>
<span class="line"><span style="color:#E2931D;">覆盖全局的文件</span></span>
<span class="line"><span style="color:#E2931D;">tomcat-users.xml</span></span>
<span class="line"><span style="color:#E2931D;">用户认证的账号和密码文件</span></span>
<span class="line"><span style="color:#E2931D;">catalina.policy</span></span>
<span class="line"><span style="color:#E2931D;">当使用security选项启动tomcat时，用于为tomcat设置安全策略</span></span>
<span class="line"><span style="color:#E2931D;">catalina.properties</span></span>
<span class="line"><span style="color:#E2931D;">Tomcat</span><span style="color:#91B859;"> 环境变量的配置，用于设定类加载器路径，以及一些与JVM调优相</span></span>
<span class="line"><span style="color:#E2931D;">关参数</span></span>
<span class="line"><span style="color:#E2931D;">logging.properties</span></span>
<span class="line"><span style="color:#E2931D;">Tomcat</span><span style="color:#91B859;"> 日志系统相关的配置，可以修改日志级别和日志路径等</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="核心组件" tabindex="-1">核心组件 <a class="header-anchor" href="#核心组件" aria-label="Permalink to &quot;核心组件&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">Tomcat启动一个Server进程。可以启动多个Server，即tomcat的多实例,</span><span style="color:#91B859;"> 但一般只启动一个</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">创建一个Service提供服务。可以创建多个Service，但一般也只创建一个</span></span>
<span class="line"><span style="color:#E2931D;">每个Service中，是Engine和其连接器Connector的关联配置</span></span>
<span class="line"><span style="color:#E2931D;">可以为这个Service提供多个连接器Connector，这些Connector使用了不同的协议，绑定了不同的</span></span>
<span class="line"><span style="color:#E2931D;">端口。其作用就是处理来自客户端的不同的连接请求或响应</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">Service</span><span style="color:#91B859;"> 内部还定义了Engine，引擎才是真正的处理请求的入口，其内部定义多个虚拟主机Host</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">Engine对请求头做了分析，将请求发送给相应的虚拟主机</span></span>
<span class="line"><span style="color:#E2931D;">如果没有匹配，数据就发往Engine上的defaultHost缺省虚拟主机</span></span>
<span class="line"><span style="color:#E2931D;">Engine上的缺省虚拟主机可以修改</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">Host</span><span style="color:#91B859;"> 定义虚拟主机，虚拟主机有name名称，通过名称匹配</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">Context</span><span style="color:#91B859;"> 定义应用程序单独的路径映射和配置</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,6),r=[p];function c(i,o,t,b,m,u){return a(),n("div",null,r)}const E=s(e,[["render",c]]);export{d as __pageData,E as default};
