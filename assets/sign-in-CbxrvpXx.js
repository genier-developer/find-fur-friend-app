import{b as e,q as D,x as F,j as s,y as k,z as A,A as O}from"./index-Ck53RUPS.js";import{H as T,C as V,I as B}from"./header-3lHnjUwq.js";import{I as M,V as z,a as L}from"./VisibilityOff-BLI9Y02q.js";import{M as H}from"./Modal-BkP7Fk2E.js";import{e as R,f as q}from"./Button-D39eFoVw.js";import{T as t}from"./Typography-Cfk_e0lX.js";import{F as p,h as u,O as x}from"./OutlinedInput-DpwUxvjp.js";import{L as N}from"./Link-BVsmx9RE.js";const Y=()=>{const[o,g]=e.useState(""),[n,j]=e.useState(""),[w,r]=e.useState(!0),[i,f]=e.useState(!1),[l,b]=e.useState(null),d=D(),v=F(),c=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o),y=c&&n.length>=6,I=async a=>{a.preventDefault();try{const h=(await k(A,o,n)).user;v(O({uid:h.uid,email:h.email})),r(!1),d("/")}catch(m){b("Invalid email or password. Please try again."),console.log(m)}},S=()=>{r(!1),d("/")},C=()=>f(a=>!a),P=a=>{a.preventDefault()},E={position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:350,bgcolor:"background.paper",boxShadow:24,p:4,borderRadius:2,textAlign:"center"};return s.jsxs(s.Fragment,{children:[s.jsx(T,{}),s.jsx(H,{open:w,onClose:S,children:s.jsx(R,{sx:E,children:s.jsxs("form",{onSubmit:I,children:[s.jsx(t,{variant:"h5",children:"Sign In"}),s.jsxs(V,{sx:{marginTop:2},children:[s.jsxs(p,{size:"small",sx:{m:1,width:"25ch"},variant:"outlined",children:[s.jsx(u,{htmlFor:"outlined-adornment-email",children:"Email"}),s.jsx(x,{id:"outlined-adornment-email",label:"Email",onChange:a=>g(a.target.value),type:"email"}),!c&&o&&s.jsx(t,{color:"error",variant:"caption",children:"Please enter a valid email."})]}),s.jsxs(p,{size:"small",sx:{m:1,width:"25ch"},variant:"outlined",children:[s.jsx(u,{htmlFor:"outlined-adornment-password",children:"Password"}),s.jsx(x,{id:"outlined-adornment-password",label:"Password",onChange:a=>j(a.target.value),type:i?"text":"password",endAdornment:s.jsx(M,{position:"end",children:s.jsx(B,{"aria-label":"toggle password visibility",onClick:C,onMouseDown:P,edge:"end",children:i?s.jsx(z,{}):s.jsx(L,{})})})}),n&&n.length<6&&s.jsx(t,{color:"error",variant:"caption",children:"Password must be at least 6 characters."})]}),l&&s.jsx(t,{color:"error",variant:"caption",sx:{display:"block",mt:1},children:l}),s.jsx(q,{sx:{marginTop:2},type:"submit",variant:"contained",disabled:!y,children:"Sign In"}),s.jsx(t,{sx:{marginBottom:1,marginTop:4},children:"Don't have an account?"}),s.jsx(N,{href:"/signup",children:"Create an account"})]})]})})})]})};export{Y as default};
