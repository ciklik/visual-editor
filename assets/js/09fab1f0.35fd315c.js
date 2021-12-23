"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[276],{4852:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return f}});var n=r(9231);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),d=c(r),f=a,y=d["".concat(u,".").concat(f)]||d[f]||p[f]||o;return r?n.createElement(y,i(i({ref:t},s),{},{components:r})):n.createElement(y,i({ref:t},s))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8630:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return s},default:function(){return d}});var n=r(5339),a=r(7318),o=(r(9231),r(4852)),i=["components"],l={sidebar_position:2},u="Repeater",c={unversionedId:"Fields/Layout/Repeater",id:"Fields/Layout/Repeater",title:"Repeater",description:"Create a repeatable field",source:"@site/docs/Fields/Layout/Repeater.mdx",sourceDirName:"Fields/Layout",slug:"/Fields/Layout/Repeater",permalink:"/visual-editor/docs/Fields/Layout/Repeater",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/Fields/Layout/Repeater.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Row",permalink:"/visual-editor/docs/Fields/Layout/Row"},next:{title:"Tabs",permalink:"/visual-editor/docs/Fields/Layout/Tabs"}},s=[{value:"Usage",id:"usage",children:[],level:2}],p={toc:s};function d(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"repeater"},"Repeater"),(0,o.kt)("p",null,"Create a repeatable field"),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("p",null,"If you want to create equal columns you can simply use an array of fields"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"  new Repeater('buttons', {\n    title: 'Boutons',\n    addLabel: 'Ajouter un bouton',\n    fields: [\n      new Text('label', { label: 'Button Label', default: 'Call to action' }),\n      new Text('url', { label: 'Link' }),\n      new Select('type', {\n        default: 'primary',\n        label: 'type',\n        options: [\n          { label: 'Primary', value: 'primary' },\n          { label: 'Secondary', value: 'secondary' },\n        ],\n      })\n    ],\n  })\n")))}d.isMDXComponent=!0}}]);