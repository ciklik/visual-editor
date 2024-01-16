"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[128],{3233:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var n=i(5250),s=i(347),l=i(5715);const o={sidebar_position:1},r="Text",a={id:"Fields/Text",title:"Text",description:"Generate a simple text field",source:"@site/docs/Fields/Text.mdx",sourceDirName:"Fields",slug:"/Fields/Text",permalink:"/visual-editor/docs/Fields/Text",draft:!1,unlisted:!1,editUrl:"https://github.com/boxraiser/visual-editor/tree/main/docs/docs/Fields/Text.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Defining your components",permalink:"/visual-editor/docs/component"},next:{title:"HTMLText",permalink:"/visual-editor/docs/Fields/HTMLText"}},d={},c=[{value:"Options",id:"options",level:2},{value:"Preview",id:"preview",level:2}];function p(e){const t={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h1,{id:"text",children:"Text"}),"\n",(0,n.jsx)(t.p,{children:"Generate a simple text field"}),"\n",(0,n.jsx)(t.h2,{id:"options",children:"Options"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"Text('fieldName', {\n  label: 'Label of the field',          // (optional)\n  help: 'Some additional informations', // (optional)\n  multiline: true,                      // default to false (optional)\n  default: 'Default value'              // default to ''\n})\n"})}),"\n",(0,n.jsx)(t.h2,{id:"preview",children:"Preview"}),"\n","\n","\n",(0,n.jsx)(l.n,{type:"Text",args:{label:"Single line of text",help:"With some help"}})]})}function u(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(p,{...e})}):p(e)}},5715:(e,t,i)=>{i.d(t,{n:()=>a});var n=i(2925),s=i(79),l=i(7299),o=i(5250);const r={Text:n.xv,HTMLText:n.Jv,Number:n.Mr,Checkbox:n.XZ,Color:n.Il,ImageUrl:n.ef,Range:n.e6,Select:n.Ph,Alignment:n.v2,TextAlign:n.PH,DatePicker:n.Mt};function a(e){let{type:t,args:i,defaultValue:n=""}=e;const[a,d]=(0,s.useState)(n),c=r[t](i).render;return(0,o.jsx)(l.T,{children:c&&(0,o.jsx)(c,{value:a,onChange:d,options:i})})}}}]);