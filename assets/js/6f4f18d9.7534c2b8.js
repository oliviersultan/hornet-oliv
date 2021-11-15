(self.webpackChunkdoc_ops=self.webpackChunkdoc_ops||[]).push([[528],{5274:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return c},default:function(){return u}});var r=n(2122),i=n(9756),a=(n(7294),n(3905)),o=["components"],l={keywords:["IOTA Node","Hornet Node","verifier","Chrysalis Phase 2","receipts"],description:"How to configure a Hornet node as a verifier node.",image:"/img/logo/HornetLogo.png"},s="How to Run Hornet as a Verifier Node",d={unversionedId:"post_installation/run_as_a_verifier",id:"post_installation/run_as_a_verifier",isDocsHomePage:!1,title:"How to Run Hornet as a Verifier Node",description:"How to configure a Hornet node as a verifier node.",source:"@site/docs/post_installation/run_as_a_verifier.md",sourceDirName:"post_installation",slug:"/post_installation/run_as_a_verifier",permalink:"/post_installation/run_as_a_verifier",editUrl:"https://github.com/iotaledger/hornet/tree/main/documentation/docs/post_installation/run_as_a_verifier.md",tags:[],version:"current",frontMatter:{keywords:["IOTA Node","Hornet Node","verifier","Chrysalis Phase 2","receipts"],description:"How to configure a Hornet node as a verifier node.",image:"/img/logo/HornetLogo.png"},sidebar:"mySidebar",previous:{title:"Peering Configuration",permalink:"/post_installation/peering"},next:{title:"API Reference",permalink:"/api_reference"}},c=[],p={toc:c};function u(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"how-to-run-hornet-as-a-verifier-node"},"How to Run Hornet as a Verifier Node"),(0,a.kt)("p",null," A verifier node is a node which validates receipts. Receipts are an integral component of the migration mechanism used to migrate funds from the legacy into the new Chrysalis Phase 2 network. You can find a more detailed explanation on how the migration mechanism works in the ",(0,a.kt)("a",{parentName:"p",href:"https://chrysalis.docs.iota.org/guides/migration-mechanism"},"Chrysalis documentation"),"."),(0,a.kt)("p",null,"This guide explains how to configure a Hornet node as a verifier node:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Make sure you enabled the ",(0,a.kt)("inlineCode",{parentName:"li"},"Receipts")," plugin under ",(0,a.kt)("inlineCode",{parentName:"li"},"node.enablePlugins"),"."),(0,a.kt)("li",{parentName:"ol"},"Set :",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"receipts.validator.validate")," to ",(0,a.kt)("inlineCode",{parentName:"li"},"true"),". This enables the verification logic in your node."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"receipts.validator.ignoreSoftErrors")," to ",(0,a.kt)("inlineCode",{parentName:"li"},"true")," or ",(0,a.kt)("inlineCode",{parentName:"li"},"false"),". ",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Set it to  ",(0,a.kt)("inlineCode",{parentName:"li"},"true"),", if you don't want the verifier node to panic if it can not query a legacy node for data. "),(0,a.kt)("li",{parentName:"ul"},"Set it to ",(0,a.kt)("inlineCode",{parentName:"li"},"false")," if you want to make sure that your verifier node panics if it can not query for data from a legacy node. "),(0,a.kt)("li",{parentName:"ul"},"An invalid receipt will always result in a panic. ",(0,a.kt)("inlineCode",{parentName:"li"},"ignoreSoftErrors")," only controls API call failures to the legacy node."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"receipts.validator.api.timeout")," to something sensible like ",(0,a.kt)("inlineCode",{parentName:"li"},"10s")," (meaning 10 seconds)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"receipts.validator.api.address")," to the URI of your legacy node. Note that this legacy node must have the ",(0,a.kt)("inlineCode",{parentName:"li"},"getWhiteFlagConfirmation")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"getNodeInfo")," API commands whitelisted."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"receipts.validator.coordinator.address")," to the Coordinator address in the legacy network."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"receipts.validator.coordinator.merkleTreeDepth")," to the correct used Merkle tree depth in the legacy network."))),(0,a.kt)("li",{parentName:"ol"},"Run your Hornet verifier node and let it validate receipts.")),(0,a.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"We recommend that you use a load balanced endpoint to multiple legacy nodes for ",(0,a.kt)("inlineCode",{parentName:"p"},"receipts.validator.api.address")," in order to obtain high availability."))),(0,a.kt)("p",null,"After this, if your verifier node panics because of an invalid receipt, it is clear that a one of the produced receipts is not valid. In this case, as a verifier node operator, you are invited to inform the community and the IOTA Foundation of your findings. This is, by the way, the same result as when the Coordinator issues a milestone, which diverges from a consistent ledger state."))}u.isMDXComponent=!0},3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),d=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=d(n),m=i,f=u["".concat(s,".").concat(m)]||u[m]||p[m]||a;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var d=2;d<a;d++)o[d]=n[d];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);