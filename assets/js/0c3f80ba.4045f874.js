"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[210],{9003:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var o=n(5250),i=n(347),a=n(1719);const r={sidebar_position:4},s="Create templates",l={id:"templates",title:"Create templates",description:"To help user bootstrap their content you can define page templates that can be selected from the editor. A template is easy to define since you have to use the content of the page you want to clone.",source:"@site/docs/templates.mdx",sourceDirName:".",slug:"/templates",permalink:"/visual-editor/docs/templates",draft:!1,unlisted:!1,editUrl:"https://github.com/boxraiser/visual-editor/tree/main/docs/docs/templates.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Laravel",permalink:"/visual-editor/docs/Examples/Laravel"},next:{title:"Server Side preview",permalink:"/visual-editor/docs/Preview/preview-server"}},c={},d=[];function p(e){const t={code:"code",h1:"h1",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"create-templates",children:"Create templates"}),"\n",(0,o.jsx)(t.p,{children:"To help user bootstrap their content you can define page templates that can be selected from the editor. A template is easy to define since you have to use the content of the page you want to clone."}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-js",children:"// Register a component / block\neditor.registerTemplate({\n  name: '<COMPONENT_IDENTIFIER>',\n  image: '<COMPONENT_PREVIEW_URL>',\n  description: '<TEMPLATE_DESCRIPTION>',\n  data: '<PAGE_DATA>'\n})\n"})}),"\n",(0,o.jsx)(t.p,{children:"Here is an empty version of the editor so you can see the template selection"}),"\n","\n","\n",(0,o.jsx)(a.I,{withoutContent:!0,title:"Test the template system"}),"\n",(0,o.jsx)(t.p,{children:"You can also fetch the template on demand using a function in the data property"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-js",children:"// Register a component / block\neditor.registerTemplate({\n  name: '<COMPONENT_IDENTIFIER>',\n  image: '<COMPONENT_PREVIEW_URL>',\n  description: '<TEMPLATE_DESCRIPTION>',\n  data: () => fetchTemplateFromApi()\n})\n"})})]})}function u(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},1719:(e,t,n)=>{n.d(t,{I:()=>s});var o=n(79),i=n(9581);const a=JSON.parse('[{"title":"Album example","titleAlign":"center","content":"<p>Something short and leading about the collection below\u2014its contents, the creator, etc. Make it short and sweet, but not too short so folks don\'t simply skip over it entirely.</p>","buttons":[{"label":"Main call to action","url":"#","type":"primary"},{"label":"Secondary action","url":"#","type":"secondary"}],"backgroundSize":"cover","backgroundRepeat":"no-repeat","backgroundXPosition":"center","backgroundYPosition":"center","padding":5,"_name":"hero","backgroundColor":null,"textColor":"--bs-primary","background":"","backgroundMobile":""},{"icons":[{"title":"First title","content":"<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p><p><br></p>"},{"title":"Second title","content":"<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>"},{"title":"Third title","content":"<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>"}],"backgroundSize":"cover","backgroundRepeat":"no-repeat","backgroundXPosition":"center","backgroundYPosition":"center","padding":5,"_name":"icons-columns"},{"title":"Pricing","titleAlign":"center","content":"<p>Quickly build an effective pricing table for your potential customers with this Bootstrap example. It\u2019s built with default Bootstrap components and utilities with little customization.</p>","prices":[{"title":"Free","price":"0\u20ac","features":"10 users included\\n2 GB of storage\\nEmail support\\nHelp center access","label":"Sign up for free","url":"#","type":"secondary"},{"title":"Pro","price":"15\u20ac","features":"20 users included\\n10 GB of storage\\nPriority email support\\nHelp center access","label":"Get started","url":"#","type":"primary"},{"title":"Enterprise","price":"29\u20ac","features":"30 users included\\n15 GB of storage\\nPhone and email support\\nHelp center access","label":"Contact us","url":"#","type":"primary"}],"backgroundSize":"cover","backgroundRepeat":"no-repeat","backgroundXPosition":"center","backgroundYPosition":"center","padding":5,"_name":"pricing"},{"title":"Lorem ipsum dolor sit amet","titleAlign":"right","content":"<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>","buttons":[{"label":"Call to action","url":"","type":"primary"},{"label":"Call to action","url":"","type":"secondary"}],"backgroundSize":"cover","backgroundRepeat":"no-repeat","backgroundXPosition":"center","backgroundYPosition":"center","padding":3,"_name":"hero","backgroundColor":null}]');var r=n(5250);function s(e){let{className:t,withoutContent:s,title:l}=e;const[c,d]=(0,o.useState)("hidden"),p=(0,o.useRef)();return(0,o.useEffect)((()=>{Promise.all([n.e(592),n.e(2)]).then(n.bind(n,3002)),p.current.addEventListener("close",(()=>d("hidden")))}),[p.current]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{className:`button button--secondary ${t}`,onClick:()=>d((e=>void 0===e?"hidden":void 0)),children:l??"Test the editor"}),"undefined"!=typeof document&&i.createPortal((0,r.jsx)("div",{style:{zIndex:9999,position:"relative",isolation:"isolate"},children:(0,r.jsx)("visual-editor",{hidden:c,name:"content",preview:"https://x6475apkns.preview.infomaniak.website",iconsUrl:"/visual-editor/img/[name].svg",value:s?"[]":JSON.stringify(a),ref:p})}),document.body)]})}}}]);