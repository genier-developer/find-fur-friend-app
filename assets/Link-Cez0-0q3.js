import{g as $,a as j,D as y,k as M,s as _,f as h,_ as a,b as x,u as N,c as P,j as U,h as z,e as W}from"./index-COZfaRaw.js";import{T as E,b as H,a as I}from"./Typography-DrJ6Zj9y.js";function O(o){return j("MuiLink",o)}const q=$("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]),g={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},w=o=>g[o]||o,G=({theme:o,ownerState:e})=>{const n=w(e.color),s=y(o,`palette.${n}`,!1)||e.color,r=y(o,`palette.${n}Channel`);return"vars"in o&&r?`rgba(${r} / 0.4)`:M(s,.4)},J=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],K=o=>{const{classes:e,component:n,focusVisible:s,underline:r}=o,t={root:["root",`underline${h(r)}`,n==="button"&&"button",s&&"focusVisible"]};return W(t,O,e)},Q=_(E,{name:"MuiLink",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:n}=o;return[e.root,e[`underline${h(n.underline)}`],n.component==="button"&&e.button]}})(({theme:o,ownerState:e})=>a({},e.underline==="none"&&{textDecoration:"none"},e.underline==="hover"&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},e.underline==="always"&&a({textDecoration:"underline"},e.color!=="inherit"&&{textDecorationColor:G({theme:o,ownerState:e})},{"&:hover":{textDecorationColor:"inherit"}}),e.component==="button"&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${q.focusVisible}`]:{outline:"auto"}})),Y=x.forwardRef(function(e,n){const s=N({props:e,name:"MuiLink"}),{className:r,color:t="primary",component:c="a",onBlur:u,onFocus:p,TypographyClasses:C,underline:k="always",variant:d="inherit",sx:l}=s,V=P(s,J),{isFocusVisibleRef:f,onBlur:D,onFocus:F,ref:L}=H(),[R,b]=x.useState(!1),v=I(n,L),T=i=>{D(i),f.current===!1&&b(!1),u&&u(i)},A=i=>{F(i),f.current===!0&&b(!0),p&&p(i)},m=a({},s,{color:t,component:c,focusVisible:R,underline:k,variant:d}),B=K(m);return U.jsx(Q,a({color:t,className:z(B.root,r),classes:C,component:c,onBlur:T,onFocus:A,ref:v,ownerState:m,variant:d,sx:[...Object.keys(g).includes(t)?[]:[{color:t}],...Array.isArray(l)?l:[l]]},V))});export{Y as L};