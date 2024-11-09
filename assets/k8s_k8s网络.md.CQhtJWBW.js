import{_ as e,c as o,o as a,a4 as r}from"./chunks/framework.GYzjcnJh.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"k8s/k8s网络.md","filePath":"k8s/k8s网络.md"}'),t={name:"k8s/k8s网络.md"},s=r('<h2 id="通信" tabindex="-1">通信 <a class="header-anchor" href="#通信" aria-label="Permalink to &quot;通信&quot;">​</a></h2><h2 id="pod-间通信" tabindex="-1">Pod 间通信 <a class="header-anchor" href="#pod-间通信" aria-label="Permalink to &quot;Pod 间通信&quot;">​</a></h2><ul><li><strong>同一节点上的 Pod 通信</strong>：在同一节点上的 Pod 通常通过节点上的网络命名空间进行通信。它们可以使用 localhost 或本地网络接口进行通信。</li><li><strong>不同节点上的 Pod 通信</strong>：跨节点的 Pod 通信需要集群网络解决方案来实现。常用的 Kubernetes 网络插件（如 Calico、Flannel、Weave Net）通过创建一个覆盖网络来实现跨节点的 Pod 通信，使得每个 Pod 都好像在同一个网络内，即使它们位于不同的物理节点上。</li></ul><h2 id="节点间通信" tabindex="-1">节点间通信 <a class="header-anchor" href="#节点间通信" aria-label="Permalink to &quot;节点间通信&quot;">​</a></h2><ul><li><strong>节点和 Pod 之间的通信</strong>：节点可以直接与其上运行的 Pod 通信。这通常通过每个 Pod 分配的特定网络接口实现。</li><li><strong>不同节点之间的通信</strong>：节点间通信，如控制平面节点与工作节点之间的通信，通常通过底层物理网络实现。</li></ul><h2 id="服务网络" tabindex="-1">服务网络 <a class="header-anchor" href="#服务网络" aria-label="Permalink to &quot;服务网络&quot;">​</a></h2><ul><li><strong>Kubernetes 服务（Service）</strong>：Service 是 Kubernetes 的抽象，它定义了一组 Pod 的逻辑集合和访问它们的策略。Service 通过选择器（Selector）与 Pod 连接，并提供一个稳定的 IP 地址和 DNS 名称。</li><li><strong>服务发现和负载均衡</strong>：当 Pod 通过 Service 访问时，服务发现机制会根据服务的定义将请求路由到正确的 Pod。Kubernetes Service 通过 kube-proxy 组件在每个节点上运行，使用 IPTables 或 IPVS 规则来进行网络流量的转发。</li></ul><h2 id="外部访问" tabindex="-1">外部访问 <a class="header-anchor" href="#外部访问" aria-label="Permalink to &quot;外部访问&quot;">​</a></h2><ul><li><strong>Ingress 控制器</strong>：Ingress 是管理外部访问 Pod 的规则集。<code>ingress controller</code>负责实现这些规则，并允许外部请求访问服务。</li><li><strong>NodePort 和 LoadBalancer 服务</strong>：NodePort 服务通过在每个节点的特定端口上暴露服务来允许外部访问，而 LoadBalancer 服务通常由云服务商提供，它在集群前面提供一个负载均衡器来分发进入的外部流量到后端的 Pod。</li></ul><h2 id="service" tabindex="-1">service <a class="header-anchor" href="#service" aria-label="Permalink to &quot;service&quot;">​</a></h2><p><img src="http://pic.justdoiit.top/imgs/2024-03-17-1710648757.webp" alt="" loading="lazy"></p>',11),l=[s];function i(n,d,c,h,P,u){return a(),o("div",null,l)}const p=e(t,[["render",i]]);export{g as __pageData,p as default};
