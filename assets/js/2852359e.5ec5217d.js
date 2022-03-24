"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[603],{9979:function(e,t,i){i.d(t,{n:function(){return l}});var n=i(8385),r=i(9231),a=i(5775),o={Text:n.xv,HTMLText:n.Jv,Number:n.Mr,Checkbox:n.XZ,Color:n.Il,ImageUrl:n.ef,Range:n.e6,Select:n.Ph,Alignment:n.v2,TextAlign:n.PH,DatePicker:n.Mt};function l(e){var t=e.type,i=e.args,n=e.defaultValue,l=void 0===n?"":n,s=(0,r.useState)(l),d=s[0],c=s[1],u=o[t](i).render;return r.createElement(a.T,null,u&&r.createElement(u,{value:d,onChange:c,options:i}))}},9034:function(e,t,i){i.r(t),i.d(t,{assets:function(){return u},contentTitle:function(){return d},default:function(){return f},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return p}});var n=i(5086),r=i(9126),a=(i(9231),i(4852)),o=i(9979),l=["components"],s={sidebar_position:102},d="DatePicker",c={unversionedId:"Fields/DatePicker",id:"Fields/DatePicker",title:"DatePicker",description:"Generate a datepicker field based on react-datepicker.",source:"@site/docs/Fields/DatePicker.mdx",sourceDirName:"Fields",slug:"/Fields/DatePicker",permalink:"/visual-editor/docs/Fields/DatePicker",editUrl:"https://github.com/boxraiser/visual-editor/tree/main/docs/docs/Fields/DatePicker.mdx",tags:[],version:"current",sidebarPosition:102,frontMatter:{sidebar_position:102},sidebar:"tutorialSidebar",previous:{title:"TextAlign",permalink:"/visual-editor/docs/Fields/TextAlign"},next:{title:"Custom Field",permalink:"/visual-editor/docs/Fields/CustomField"}},u={},p=[{value:"Options",id:"options",level:2},{value:"Preview",id:"preview",level:2}],k={toc:p};function f(e){var t=e.components,i=(0,r.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},k,i,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"datepicker"},"DatePicker"),(0,a.kt)("p",null,"Generate a datepicker field based on ",(0,a.kt)("a",{parentName:"p",href:"https://reactdatepicker.com"},"react-datepicker"),"."),(0,a.kt)("h2",{id:"options"},"Options"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"DatePicker('fieldName', {\n  label: 'Label of the field',          // (optional)\n  help: 'Some additional informations', // (optional)\n  time: false,                          // default to false (optional)\n  default: 'Default value',             // default to '' (optional)\n})\n")),(0,a.kt)("h2",{id:"preview"},"Preview"),(0,a.kt)(o.n,{type:"DatePicker",args:{label:"Single line of text",help:"With some help",time:!0},mdxType:"FieldPreview"}))}f.isMDXComponent=!0}}]);