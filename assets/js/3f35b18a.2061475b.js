"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[842],{931:function(e,t,l){l.r(t),l.d(t,{contentTitle:function(){return m},default:function(){return v},frontMatter:function(){return p},metadata:function(){return b},toc:function(){return y}});var a=l(5339),n=l(7318),o=l(9231),r=l(4852),i=l(159),s=l(1791);function u(){var e=(0,i.X2)([(0,i.xv)("label",{label:"Button Label",default:"Call to action"}),(0,i.xv)("url",{label:"Link"}),(0,i.Ph)("type",{default:"primary",label:"type",options:[{label:"Primary",value:"primary"},{label:"Secondary",value:"secondary"}]})]);return o.createElement(s.T,null,o.createElement(e.render,{options:{}},e.fields.map((function(e){return o.createElement(d,{key:e,field:e})}))))}function d(e){var t=e.field,l=(0,o.useState)(""),a=l[0],n=l[1],r=t.render;return o.createElement(r,{value:a,onChange:n,options:t.options})}var c=["components"],p={sidebar_position:1},m="Row",b={unversionedId:"Fields/Layout/Row",id:"Fields/Layout/Row",title:"Row",description:"Group field on a single row",source:"@site/docs/Fields/Layout/Row.mdx",sourceDirName:"Fields/Layout",slug:"/Fields/Layout/Row",permalink:"/visual-editor/docs/Fields/Layout/Row",editUrl:"https://github.com/boxraiser/visual-editor/tree/main/docs/docs/Fields/Layout/Row.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Custom Field",permalink:"/visual-editor/docs/Fields/CustomField"},next:{title:"Tabs",permalink:"/visual-editor/docs/Fields/Layout/Tabs"}},y=[{value:"Usage",id:"usage",children:[],level:2},{value:"Preview",id:"preview",children:[],level:2}],f={toc:y};function v(e){var t=e.components,l=(0,n.Z)(e,c);return(0,r.kt)("wrapper",(0,a.Z)({},f,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"row"},"Row"),(0,r.kt)("p",null,"Group field on a single row"),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("p",null,"If you want to create equal columns you can simply use an array of fields"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"Row([\n  Text('label', { label: 'Label', default: 'Call to action' }),\n  Text('url', { label: 'Link' }),\n  Select('type', {\n    default: 'primary',\n    label: 'type',\n    options: [\n      { label: 'Primary', value: 'primary' },\n      { label: 'Secondary', value: 'secondary' },\n    ],\n  }),\n])\n")),(0,r.kt)("p",null,"You can also specify the ratio of each column using a string that works like the grid-template-columns CSS"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"Row([\n  Text('label', { label: 'Label', default: 'Call to action' }),\n  Text('url', { label: 'Link' }),\n], {\n  label: 'Button',\n  columns: '30% 70%' // uses https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns\n})\n")),(0,r.kt)("h2",{id:"preview"},"Preview"),(0,r.kt)(u,{mdxType:"RowPreview"}))}v.isMDXComponent=!0}}]);