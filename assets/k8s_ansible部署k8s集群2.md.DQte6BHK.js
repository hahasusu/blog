import{_ as s,c as n,o as a,a4 as l}from"./chunks/framework.GYzjcnJh.js";const B=JSON.parse('{"title":"1ssh key 认证和安装python","description":"","frontmatter":{"date":"2024-04-10 16:24:53"},"headers":[],"relativePath":"k8s/ansible部署k8s集群2.md","filePath":"k8s/ansible部署k8s集群2.md"}'),p={name:"k8s/ansible部署k8s集群2.md"},e=l(`<h1 id="_1ssh-key-认证和安装python" tabindex="-1">1ssh key 认证和安装python <a class="header-anchor" href="#_1ssh-key-认证和安装python" aria-label="Permalink to &quot;1ssh key 认证和安装python&quot;">​</a></h1><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 利用sshpass批量实现基于key验证脚本</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">password</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">luozaibo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6182B8;">command</span><span style="color:#91B859;"> -v</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null </span><span style="color:#39ADB5;">||</span><span style="color:#6182B8;"> echo</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">install sshpass</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;">;</span><span style="color:#E2931D;"> dnf</span><span style="color:#91B859;"> install</span><span style="color:#91B859;"> -y</span><span style="color:#91B859;"> sshpass</span><span style="color:#39ADB5;"> &amp;&gt;</span><span style="color:#90A4AE;"> /dev/null</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;">[</span><span style="color:#39ADB5;"> -f</span><span style="color:#39ADB5;"> ~</span><span style="color:#90A4AE;">/.ssh/id_rsa </span><span style="color:#39ADB5;">]</span><span style="color:#39ADB5;"> ||</span><span style="color:#E2931D;"> ssh-keygen</span><span style="color:#91B859;"> -N</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">ips</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.1</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.2</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.3</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.11</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.12</span></span>
<span class="line"><span style="color:#91B859;">10.1.1.13</span></span>
<span class="line"><span style="color:#39ADB5;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $ips</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#6182B8;">    echo</span><span style="color:#90A4AE;"> $i</span></span>
<span class="line"><span style="color:#39ADB5;">    {</span><span style="color:#E2931D;"> sshpass</span><span style="color:#91B859;"> -p</span><span style="color:#90A4AE;"> $password </span><span style="color:#91B859;">ssh-copy-id</span><span style="color:#91B859;"> -o</span><span style="color:#91B859;"> StrictHostKeyChecking=no</span><span style="color:#90A4AE;"> $i</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;"> }</span><span style="color:#39ADB5;"> &amp;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"><span style="color:#6182B8;">wait</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 添加yum 仓库</span></span>
<span class="line"><span style="color:#E2931D;">cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> base.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">[BaseOS]</span></span>
<span class="line"><span style="color:#91B859;">name=BaseOS</span></span>
<span class="line"><span style="color:#91B859;">baseurl=http://10.0.0.9/repos/BaseOS</span></span>
<span class="line"><span style="color:#91B859;">#baseurl=https://mirrors.ustc.edu.cn/rocky/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever/BaseOS/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">arch/os/</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[AppStream]</span></span>
<span class="line"><span style="color:#91B859;">name=AppStream</span></span>
<span class="line"><span style="color:#91B859;">baseurl=http://10.0.0.9/repos/AppStream</span></span>
<span class="line"><span style="color:#91B859;">#baseurl=https://mirrors.ustc.edu.cn/rocky/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever/AppStream/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">arch/os/</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">[EPEL]</span></span>
<span class="line"><span style="color:#91B859;">name=EPEL</span></span>
<span class="line"><span style="color:#91B859;">baseurl=http://10.0.0.9/repos/EPEL</span></span>
<span class="line"><span style="color:#91B859;">#baseurl=https://mirrors.ustc.edu.cn/epel/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">releasever/Everything/</span><span style="color:#90A4AE;">\\$</span><span style="color:#91B859;">basearch</span></span>
<span class="line"><span style="color:#91B859;">gpgcheck=0</span></span>
<span class="line"><span style="color:#39ADB5;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $ips</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#E2931D;">    scp</span><span style="color:#91B859;"> base.repo</span><span style="color:#90A4AE;"> $i</span><span style="color:#91B859;">:/etc/yum.repos.d/base.repo</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # 安装Python3.11(可选)</span></span>
<span class="line"><span style="color:#E2931D;">    ssh</span><span style="color:#90A4AE;"> $i </span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">find /etc/yum.repos.d -type f -name &quot;*.repo&quot; ! -name &quot;base.repo&quot; | xargs -r rename repo &quot;repo.bak&quot; \\</span></span>
<span class="line"><span style="color:#91B859;">            &amp;&amp; dnf makecache \\</span></span>
<span class="line"><span style="color:#91B859;">            &amp;&amp; dnf install -y python3.11 python3.11-pip &gt; /dev/null \\</span></span>
<span class="line"><span style="color:#91B859;">            &amp;&amp; pip3 config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">rm</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> base.repo</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><h2 id="_2docker和cri-dockerd安装" tabindex="-1">2docker和cri-dockerd安装 <a class="header-anchor" href="#_2docker和cri-dockerd安装" aria-label="Permalink to &quot;2docker和cri-dockerd安装&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">-</span><span style="color:#91B859;"> hosts:</span><span style="color:#91B859;"> cluster</span></span>
<span class="line"><span style="color:#E2931D;">  gather_facts:</span><span style="color:#91B859;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">  vars:</span></span>
<span class="line"><span style="color:#E2931D;">    docker_version:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">24.0.0</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E2931D;">    cri:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">cri-dockerd-0.3.11-3.el8.x86_64.rpm</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">  tasks:</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> debug:</span><span style="color:#91B859;"> msg={{</span><span style="color:#91B859;"> inventory_hostname</span><span style="color:#91B859;"> }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      #- fail: msg=&#39;exit&#39;</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 下载cri-dockerd</span><span style="color:#91B859;"> 到本机</span></span>
<span class="line"><span style="color:#E2931D;">      get_url:</span></span>
<span class="line"><span style="color:#E2931D;">        url:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">https://github.com/Mirantis/cri-dockerd/releases/download/v0.3.11/{{ cri }}</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E2931D;">        dest:</span><span style="color:#91B859;"> /opt/{{</span><span style="color:#91B859;"> cri</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">      when:</span><span style="color:#91B859;"> inventory_hostname</span><span style="color:#91B859;"> ==</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">master1.zbluo.com</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> block:</span></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> scp到其它主机</span></span>
<span class="line"><span style="color:#E2931D;">        copy:</span></span>
<span class="line"><span style="color:#E2931D;">          src:</span><span style="color:#91B859;"> /opt/{{</span><span style="color:#91B859;"> cri</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">          dest:</span><span style="color:#91B859;"> /opt/{{</span><span style="color:#91B859;"> cri</span><span style="color:#91B859;"> }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> check</span><span style="color:#91B859;"> docker</span><span style="color:#91B859;"> is</span><span style="color:#91B859;"> or</span><span style="color:#91B859;"> not</span><span style="color:#91B859;"> installed</span></span>
<span class="line"><span style="color:#E2931D;">        shell:</span></span>
<span class="line"><span style="color:#E2931D;">          cmd:</span><span style="color:#91B859;"> docker</span><span style="color:#91B859;"> -v</span></span>
<span class="line"><span style="color:#E2931D;">        register:</span><span style="color:#91B859;"> is_install</span></span>
<span class="line"><span style="color:#E2931D;">        failed_when:</span><span style="color:#91B859;"> is_install.stderr</span><span style="color:#91B859;"> !=</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"><span style="color:#E2931D;">        ignore_errors:</span><span style="color:#91B859;"> yes</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">        #</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">      #- debug: msg=is_install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 卸载docker</span></span>
<span class="line"><span style="color:#E2931D;">        dnf:</span></span>
<span class="line"><span style="color:#E2931D;">          name:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">{{ item }}</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"><span style="color:#E2931D;">          loop:</span><span style="color:#90A4AE;"> [ </span><span style="color:#91B859;">docker,</span><span style="color:#91B859;"> docker-client,</span><span style="color:#91B859;"> docker-common,</span><span style="color:#91B859;"> docker-engine,</span><span style="color:#91B859;"> docker-client-latest]</span></span>
<span class="line"><span style="color:#E2931D;">          state:</span><span style="color:#91B859;"> absent</span></span>
<span class="line"><span style="color:#E2931D;">        ignore_errors:</span><span style="color:#91B859;"> yes</span></span>
<span class="line"><span style="color:#E2931D;">        when:</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#91B859;"> is_install.stdout</span><span style="color:#91B859;"> !=</span><span style="color:#39ADB5;"> &#39;&#39;</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">docker_version not in is_install.stdout</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 添加docker仓库</span></span>
<span class="line"><span style="color:#E2931D;">        get_url:</span></span>
<span class="line"><span style="color:#E2931D;">          url:</span><span style="color:#91B859;"> https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo</span></span>
<span class="line"><span style="color:#E2931D;">          dest:</span><span style="color:#91B859;"> /etc/yum.repos.d/docker-ce.repo</span></span>
<span class="line"><span style="color:#E2931D;">          force:</span><span style="color:#91B859;"> no</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 安装docker及其依赖</span></span>
<span class="line"><span style="color:#E2931D;">        dnf:</span><span style="color:#91B859;"> name={{</span><span style="color:#91B859;"> item</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">        loop:</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#91B859;"> docker-ce-{{</span><span style="color:#91B859;"> docker_version</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#E2931D;">          -</span><span style="color:#91B859;"> docker-ce-cli-{{</span><span style="color:#91B859;"> docker_version</span><span style="color:#91B859;"> }}</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #- docker-buildx-plugin</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">            #- docker-compose-plugin</span></span>
<span class="line"><span style="color:#E2931D;">        when:</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">docker_version not in is_install.stdout</span><span style="color:#39ADB5;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 添加用户</span></span>
<span class="line"><span style="color:#E2931D;">        user:</span></span>
<span class="line"><span style="color:#E2931D;">          name:</span><span style="color:#91B859;"> docker</span></span>
<span class="line"><span style="color:#E2931D;">          group:</span><span style="color:#91B859;"> docker</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">      -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 创建daemon.json</span></span>
<span class="line"><span style="color:#E2931D;">        shell:</span></span>
<span class="line"><span style="color:#E2931D;">          cmd:</span><span style="color:#39ADB5;"> |</span></span>
<span class="line"><span style="color:#E2931D;">            cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/docker/daemon.json</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">            {</span></span>
<span class="line"><span style="color:#91B859;">              &quot;registry-mirrors&quot;: [&quot;https://qmaqgl5w.mirror.aliyuncs.com&quot;],</span></span>
<span class="line"><span style="color:#91B859;">              &quot;insecure-registries&quot;: [&quot;harbor.zbluo.com&quot;, &quot;10.0.0.30&quot;],</span></span>
<span class="line"><span style="color:#91B859;">              &quot;exec-opts&quot;: [&quot;native.cgroupdriver=systemd&quot;]</span></span>
<span class="line"><span style="color:#91B859;">            }</span></span>
<span class="line"><span style="color:#91B859;">            EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: 设置开机启动</span></span>
<span class="line"><span style="color:#91B859;">        systemd_service:</span></span>
<span class="line"><span style="color:#91B859;">          name: docker</span></span>
<span class="line"><span style="color:#91B859;">          enabled: true</span></span>
<span class="line"><span style="color:#91B859;">          state: started</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: check docker status</span></span>
<span class="line"><span style="color:#91B859;">        shell:</span></span>
<span class="line"><span style="color:#91B859;">          cmd: systemctl is-active docker</span></span>
<span class="line"><span style="color:#91B859;">        register: status</span></span>
<span class="line"><span style="color:#91B859;">        #register: status</span></span>
<span class="line"><span style="color:#91B859;">      - debug: msg={{ status.stdout }}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: 判断cri-docker是否安装</span></span>
<span class="line"><span style="color:#91B859;">        stat:</span></span>
<span class="line"><span style="color:#91B859;">          path: /usr/bin/cri-dockerd</span></span>
<span class="line"><span style="color:#91B859;">        register: cri_stat</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: install cri-docker</span></span>
<span class="line"><span style="color:#91B859;">        shell:</span></span>
<span class="line"><span style="color:#91B859;">          cmd: rpm -i /opt/{{ cri }}</span></span>
<span class="line"><span style="color:#91B859;">        when: not cri_stat.stat.exists</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: 修改pod基础镜像的仓库</span></span>
<span class="line"><span style="color:#91B859;">        lineinfile:</span></span>
<span class="line"><span style="color:#91B859;">          path: /lib/systemd/system/cri-docker.service</span></span>
<span class="line"><span style="color:#91B859;">          regex: &#39;^(Exec.*fd://)&#39;</span></span>
<span class="line"><span style="color:#91B859;">          line: &#39;\\1 --pod-infra-container-image=harbor.zbluo.com/google_containers/pause:3.9&#39;</span></span>
<span class="line"><span style="color:#91B859;">          backrefs: yes</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">      - name: 启动cri-dockerd</span></span>
<span class="line"><span style="color:#91B859;">        systemd_service:</span></span>
<span class="line"><span style="color:#91B859;">          name: cri-docker</span></span>
<span class="line"><span style="color:#91B859;">          state: started</span></span>
<span class="line"><span style="color:#91B859;">          daemon_reload: yes</span></span>
<span class="line"><span style="color:#91B859;">          enabled: yes</span></span>
<span class="line"><span style="color:#91B859;">        </span></span>
<span class="line"><span style="color:#91B859;">          #when:</span></span>
<span class="line"><span style="color:#91B859;">        #- inventory_hostname != &#39;localhost&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br></div></div><h2 id="_3安装kubeadm-kubectl-kubelet" tabindex="-1">3安装kubeadm kubectl kubelet <a class="header-anchor" href="#_3安装kubeadm-kubectl-kubelet" aria-label="Permalink to &quot;3安装kubeadm kubectl kubelet&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">-</span><span style="color:#91B859;"> hosts:</span><span style="color:#91B859;"> cluster</span></span>
<span class="line"><span style="color:#E2931D;">  gather_facts:</span><span style="color:#91B859;"> no</span></span>
<span class="line"><span style="color:#E2931D;">  vars:</span></span>
<span class="line"><span style="color:#E2931D;">    version:</span><span style="color:#91B859;"> v1.26</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">  tasks:</span></span>
<span class="line"><span style="color:#E2931D;">    -</span><span style="color:#91B859;"> name:</span><span style="color:#91B859;"> 添加k8s仓库</span></span>
<span class="line"><span style="color:#E2931D;">      shell:</span><span style="color:#39ADB5;"> |</span></span>
<span class="line"><span style="color:#E2931D;">        cat</span><span style="color:#39ADB5;"> &gt;</span><span style="color:#91B859;"> /etc/yum.repos.d/kubernetes.repo</span><span style="color:#39ADB5;"> &lt;&lt;</span><span style="color:#39ADB5;">EOF</span></span>
<span class="line"><span style="color:#91B859;">        [kubernetes]</span></span>
<span class="line"><span style="color:#91B859;">        name=Kubernetes</span></span>
<span class="line"><span style="color:#91B859;">        baseurl=https://mirrors.aliyun.com/kubernetes-new/core/stable/{{ version }}/rpm/</span></span>
<span class="line"><span style="color:#91B859;">        enabled=1</span></span>
<span class="line"><span style="color:#91B859;">        gpgcheck=0</span></span>
<span class="line"><span style="color:#91B859;">        gpgkey=https://mirrors.aliyun.com/kubernetes-new/core/stable/{{ version }}/rpm/repodata/repomd.xml.key</span></span>
<span class="line"><span style="color:#91B859;">        EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">    - name: 安装kubeadm,kubectl,kubelet</span></span>
<span class="line"><span style="color:#91B859;">      dnf: name={{ item }}</span></span>
<span class="line"><span style="color:#91B859;">      loop:</span></span>
<span class="line"><span style="color:#91B859;">        - kubeadm-1.26.10</span></span>
<span class="line"><span style="color:#91B859;">        - kubectl-1.26.10</span></span>
<span class="line"><span style="color:#91B859;">        - kubelet-1.26.10</span></span>
<span class="line"><span style="color:#91B859;">        - iproute-tc</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B859;">    - name: 启动kubelet</span></span>
<span class="line"><span style="color:#91B859;">      systemd_service:</span></span>
<span class="line"><span style="color:#91B859;">        name: kubelet</span></span>
<span class="line"><span style="color:#91B859;">        enabled: yes</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><h2 id="_4预先下载所需镜像" tabindex="-1">4预先下载所需镜像 <a class="header-anchor" href="#_4预先下载所需镜像" aria-label="Permalink to &quot;4预先下载所需镜像&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#90A4AE;font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">server</span><span style="color:#39ADB5;">=</span><span style="color:#91B859;">10.0.0.9:1080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">docker</span><span style="color:#91B859;"> login</span><span style="color:#91B859;"> -uadmin</span><span style="color:#91B859;"> -pluozaibo</span><span style="color:#90A4AE;"> $server</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">images</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> config images list  </span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;"> awk</span><span style="color:#91B859;"> -F/ </span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">{print $NF}</span><span style="color:#39ADB5;">&#39;\`</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">#images=\`kubeadm config images list --kubernetes-version=1.25.0 | awk -F/ &#39;{print $NF}&#39;\`</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $images</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> pull</span><span style="color:#91B859;"> registry.aliyuncs.com/google_containers/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> tag</span><span style="color:#91B859;"> registry.aliyuncs.com/google_containers/</span><span style="color:#90A4AE;">$i $server</span><span style="color:#91B859;">/google_containers/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> push</span><span style="color:#90A4AE;"> $server</span><span style="color:#91B859;">/google_containers/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;">    # docker rmi registry.aliyuncs.com/google_containers/$i</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="_5kubeadm-初始化" tabindex="-1">5kubeadm 初始化 <a class="header-anchor" href="#_5kubeadm-初始化" aria-label="Permalink to &quot;5kubeadm 初始化&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">kubeadm</span><span style="color:#91B859;"> init</span><span style="color:#91B859;"> --control-plane-endpoint</span><span style="color:#91B859;"> k8s.zbluo.com</span><span style="color:#91B859;"> --apiserver-advertise-address</span><span style="color:#F76D47;"> 10.1.1.1</span><span style="color:#91B859;"> --kubernetes-version</span><span style="color:#F76D47;"> 1.26.15</span><span style="color:#91B859;"> --pod-network-cidr</span><span style="color:#91B859;"> 10.244.0.0/16</span><span style="color:#91B859;"> --image-repository</span><span style="color:#91B859;"> harbor.zbluo.com:1080/google_containers</span><span style="color:#91B859;"> --cri-socket</span><span style="color:#91B859;"> unix:///run/cri-dockerd.sock</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_6网络插件flannel" tabindex="-1">6网络插件flannel <a class="header-anchor" href="#_6网络插件flannel" aria-label="Permalink to &quot;6网络插件flannel&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-lighter vp-code" tabindex="0"><code><span class="line"><span style="color:#E2931D;">wget</span><span style="color:#91B859;"> https://github.com/flannel-io/flannel/releases/latest/download/kube-flannel.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 检查部署状态</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> get</span><span style="color:#91B859;"> pods</span><span style="color:#91B859;"> -n</span><span style="color:#91B859;"> kube-system</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E2931D;">docker</span><span style="color:#91B859;"> login</span><span style="color:#91B859;"> -uadmin</span><span style="color:#91B859;"> -pluozaibo</span><span style="color:#91B859;"> harbor.zbluo.com:1080</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;">images</span><span style="color:#39ADB5;">=</span><span style="color:#39ADB5;">\`</span><span style="color:#E2931D;">awk</span><span style="color:#91B859;"> -F</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;">docker.io/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">/image:/{print $2}</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> kube-flannel.yml </span><span style="color:#39ADB5;">|</span><span style="color:#E2931D;"> head</span><span style="color:#91B859;"> -2</span><span style="color:#39ADB5;">\`</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">for</span><span style="color:#90A4AE;"> i </span><span style="color:#39ADB5;font-style:italic;">in</span><span style="color:#90A4AE;"> $images</span><span style="color:#39ADB5;">;</span><span style="color:#39ADB5;font-style:italic;"> do</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> pull</span><span style="color:#90A4AE;"> $i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> tag</span><span style="color:#90A4AE;"> $i </span><span style="color:#91B859;">harbor.zbluo.com:1080/k8s/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#E2931D;">    docker</span><span style="color:#91B859;"> push</span><span style="color:#91B859;"> harbor.k8s.com:1080/k8s/</span><span style="color:#90A4AE;">$i</span></span>
<span class="line"><span style="color:#39ADB5;font-style:italic;">done</span></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 修改为自己的仓库</span></span>
<span class="line"><span style="color:#E2931D;">sed</span><span style="color:#91B859;"> -i</span><span style="color:#39ADB5;"> &#39;</span><span style="color:#91B859;">s/docker.io\\/harbor.k8s.com:1080\\/k8s/</span><span style="color:#39ADB5;">&#39;</span><span style="color:#91B859;"> kube-flannel.yml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#90A4AE;font-style:italic;"># 应用配置文件</span></span>
<span class="line"><span style="color:#E2931D;">kubectl</span><span style="color:#91B859;"> apply</span><span style="color:#91B859;"> -f</span><span style="color:#91B859;"> kube-flannel.yml</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div>`,12),o=[e];function r(c,t,i,b,y,u){return a(),n("div",null,o)}const d=s(p,[["render",r]]);export{B as __pageData,d as default};
