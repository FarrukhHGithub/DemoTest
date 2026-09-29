import{r as o,R as F,_ as be,a as Fi,c as zi,m as ca,j as T}from"./index-rNWyTYCo.js";import{D as ki}from"./DashboardLayout-CDWm1SdA.js";import{aa as un,g as zt,u as B,Q as $i,D as kt,af as Ni,m as $t,ac as Ii,h as Ye,j as ka,c as Y,ag as Mi,R as Di,G as Ri,ah as Oi,ae as Li,ai as ji,U as Pi,aj as Bi,ak as Ai,S as Ui,f as qe,al as Ti,am as _i,an as Hi,ao as Vi,I as wn,e as Je,Y as qi,ap as vn,aq as Ne,a5 as $a,a6 as Na,a7 as Ia,a8 as ze,a9 as Ma,d as Wi,X as Gi,N as Da,t as Ra,ar as ua,C as Oa,as as Xi,H as da,W as Zi,l as Ki}from"./baseUrl-Cs6p-tp9.js";import{f as Ji,e as Yi,P as Qi,d as er,c as nr,g as tr,C as fa}from"./index-DBxsgzCF.js";import{u as ar,r as ma,a as ir}from"./useBreakpoint-CPHtkY2C.js";import{D as rr,T as or}from"./index-CBIpNU4H.js";import{c as bt,u as lr,o as sr,B as Mn}from"./button-DWoe1Qbl.js";import{a as cr,u as ur}from"./useId-BoGU__hj.js";import{i as dr}from"./index-D0dj4_Dc.js";import{b as fr}from"./EyeOutlined-YiKOq7Fm.js";import{P as mr}from"./progress-dzT8x67W.js";import{u as pr}from"./PurePanel-6CINPwYK.js";import{M as gr}from"./index-ie5AwQO6.js";import"./Header-DB_47UC5.js";import"./Footer-Bs1h8Nnu.js";import"./Skeleton-D7aafYvQ.js";const vr=e=>{const{componentCls:n,notificationMarginEdge:t,animationMaxHeight:a}=e,i=`${n}-notice`,r=new un("antNotificationFadeIn",{"0%":{transform:"translate3d(100%, 0, 0)",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",opacity:1}}),s=new un("antNotificationTopFadeIn",{"0%":{top:-a,opacity:0},"100%":{top:0,opacity:1}}),l=new un("antNotificationBottomFadeIn",{"0%":{bottom:e.calc(a).mul(-1).equal(),opacity:0},"100%":{bottom:0,opacity:1}}),c=new un("antNotificationLeftFadeIn",{"0%":{transform:"translate3d(-100%, 0, 0)",opacity:0},"100%":{transform:"translate3d(0, 0, 0)",opacity:1}});return{[n]:{[`&${n}-top, &${n}-bottom`]:{marginInline:0,[i]:{marginInline:"auto auto"}},[`&${n}-top`]:{[`${n}-fade-enter${n}-fade-enter-active, ${n}-fade-appear${n}-fade-appear-active`]:{animationName:s}},[`&${n}-bottom`]:{[`${n}-fade-enter${n}-fade-enter-active, ${n}-fade-appear${n}-fade-appear-active`]:{animationName:l}},[`&${n}-topRight, &${n}-bottomRight`]:{[`${n}-fade-enter${n}-fade-enter-active, ${n}-fade-appear${n}-fade-appear-active`]:{animationName:r}},[`&${n}-topLeft, &${n}-bottomLeft`]:{marginRight:{value:0,_skip_check_:!0},marginLeft:{value:t,_skip_check_:!0},[i]:{marginInlineEnd:"auto",marginInlineStart:0},[`${n}-fade-enter${n}-fade-enter-active, ${n}-fade-appear${n}-fade-appear-active`]:{animationName:c}}}}},hr=["top","topLeft","topRight","bottom","bottomLeft","bottomRight"],br={topLeft:"left",topRight:"right",bottomLeft:"left",bottomRight:"right",top:"left",bottom:"left"},xr=(e,n)=>{const{componentCls:t}=e;return{[`${t}-${n}`]:{[`&${t}-stack > ${t}-notice-wrapper`]:{[n.startsWith("top")?"top":"bottom"]:0,[br[n]]:{value:0,_skip_check_:!0}}}}},yr=e=>{const n={};for(let t=1;t<e.notificationStackLayer;t++)n[`&:nth-last-child(${t+1})`]={overflow:"hidden",[`& > ${e.componentCls}-notice`]:{opacity:0,transition:`opacity ${e.motionDurationMid}`}};return Object.assign({[`&:not(:nth-last-child(-n+${e.notificationStackLayer}))`]:{opacity:0,overflow:"hidden",color:"transparent",pointerEvents:"none"}},n)},wr=e=>{const n={};for(let t=1;t<e.notificationStackLayer;t++)n[`&:nth-last-child(${t+1})`]={background:e.colorBgBlur,backdropFilter:"blur(10px)","-webkit-backdrop-filter":"blur(10px)"};return Object.assign({},n)},Er=e=>{const{componentCls:n}=e;return Object.assign({[`${n}-stack`]:{[`& > ${n}-notice-wrapper`]:Object.assign({transition:`all ${e.motionDurationSlow}, backdrop-filter 0s`,position:"absolute"},yr(e))},[`${n}-stack:not(${n}-stack-expanded)`]:{[`& > ${n}-notice-wrapper`]:Object.assign({},wr(e))},[`${n}-stack${n}-stack-expanded`]:{[`& > ${n}-notice-wrapper`]:{"&:not(:nth-last-child(-n + 1))":{opacity:1,overflow:"unset",color:"inherit",pointerEvents:"auto",[`& > ${e.componentCls}-notice`]:{opacity:1}},"&:after":{content:'""',position:"absolute",height:e.margin,width:"100%",insetInline:0,bottom:e.calc(e.margin).mul(-1).equal(),background:"transparent",pointerEvents:"auto"}}}},hr.map(t=>xr(e,t)).reduce((t,a)=>Object.assign(Object.assign({},t),a),{}))},La=e=>{const{iconCls:n,componentCls:t,boxShadow:a,fontSizeLG:i,notificationMarginBottom:r,borderRadiusLG:s,colorSuccess:l,colorInfo:c,colorWarning:u,colorError:d,colorTextHeading:f,notificationBg:m,notificationPadding:g,notificationMarginEdge:p,notificationProgressBg:v,notificationProgressHeight:b,fontSize:y,lineHeight:x,width:S,notificationIconSize:w,colorText:h}=e,C=`${t}-notice`;return{position:"relative",marginBottom:r,marginInlineStart:"auto",background:m,borderRadius:s,boxShadow:a,[C]:{padding:g,width:S,maxWidth:`calc(100vw - ${B(e.calc(p).mul(2).equal())})`,overflow:"hidden",lineHeight:x,wordWrap:"break-word"},[`${C}-message`]:{marginBottom:e.marginXS,color:f,fontSize:i,lineHeight:e.lineHeightLG},[`${C}-description`]:{fontSize:y,color:h},[`${C}-closable ${C}-message`]:{paddingInlineEnd:e.paddingLG},[`${C}-with-icon ${C}-message`]:{marginBottom:e.marginXS,marginInlineStart:e.calc(e.marginSM).add(w).equal(),fontSize:i},[`${C}-with-icon ${C}-description`]:{marginInlineStart:e.calc(e.marginSM).add(w).equal(),fontSize:y},[`${C}-icon`]:{position:"absolute",fontSize:w,lineHeight:1,[`&-success${n}`]:{color:l},[`&-info${n}`]:{color:c},[`&-warning${n}`]:{color:u},[`&-error${n}`]:{color:d}},[`${C}-close`]:Object.assign({position:"absolute",top:e.notificationPaddingVertical,insetInlineEnd:e.notificationPaddingHorizontal,color:e.colorIcon,outline:"none",width:e.notificationCloseButtonSize,height:e.notificationCloseButtonSize,borderRadius:e.borderRadiusSM,transition:`background-color ${e.motionDurationMid}, color ${e.motionDurationMid}`,display:"flex",alignItems:"center",justifyContent:"center","&:hover":{color:e.colorIconHover,backgroundColor:e.colorBgTextHover},"&:active":{backgroundColor:e.colorBgTextActive}},$i(e)),[`${C}-progress`]:{position:"absolute",display:"block",appearance:"none",WebkitAppearance:"none",inlineSize:`calc(100% - ${B(s)} * 2)`,left:{_skip_check_:!0,value:s},right:{_skip_check_:!0,value:s},bottom:0,blockSize:b,border:0,"&, &::-webkit-progress-bar":{borderRadius:s,backgroundColor:"rgba(0, 0, 0, 0.04)"},"&::-moz-progress-bar":{background:v},"&::-webkit-progress-value":{borderRadius:s,background:v}},[`${C}-btn`]:{float:"right",marginTop:e.marginSM}}},Cr=e=>{const{componentCls:n,notificationMarginBottom:t,notificationMarginEdge:a,motionDurationMid:i,motionEaseInOut:r}=e,s=`${n}-notice`,l=new un("antNotificationFadeOut",{"0%":{maxHeight:e.animationMaxHeight,marginBottom:t},"100%":{maxHeight:0,marginBottom:0,paddingTop:0,paddingBottom:0,opacity:0}});return[{[n]:Object.assign(Object.assign({},kt(e)),{position:"fixed",zIndex:e.zIndexPopup,marginRight:{value:a,_skip_check_:!0},[`${n}-hook-holder`]:{position:"relative"},[`${n}-fade-appear-prepare`]:{opacity:"0 !important"},[`${n}-fade-enter, ${n}-fade-appear`]:{animationDuration:e.motionDurationMid,animationTimingFunction:r,animationFillMode:"both",opacity:0,animationPlayState:"paused"},[`${n}-fade-leave`]:{animationTimingFunction:r,animationFillMode:"both",animationDuration:i,animationPlayState:"paused"},[`${n}-fade-enter${n}-fade-enter-active, ${n}-fade-appear${n}-fade-appear-active`]:{animationPlayState:"running"},[`${n}-fade-leave${n}-fade-leave-active`]:{animationName:l,animationPlayState:"running"},"&-rtl":{direction:"rtl",[`${s}-btn`]:{float:"left"}}})},{[n]:{[`${s}-wrapper`]:Object.assign({},La(e))}}]},ja=e=>({zIndexPopup:e.zIndexPopupBase+Ni+50,width:384}),Pa=e=>{const n=e.paddingMD,t=e.paddingLG;return $t(e,{notificationBg:e.colorBgElevated,notificationPaddingVertical:n,notificationPaddingHorizontal:t,notificationIconSize:e.calc(e.fontSizeLG).mul(e.lineHeightLG).equal(),notificationCloseButtonSize:e.calc(e.controlHeightLG).mul(.55).equal(),notificationMarginBottom:e.margin,notificationPadding:`${B(e.paddingMD)} ${B(e.paddingContentHorizontalLG)}`,notificationMarginEdge:e.marginLG,animationMaxHeight:150,notificationStackLayer:3,notificationProgressHeight:2,notificationProgressBg:`linear-gradient(90deg, ${e.colorPrimaryBorderHover}, ${e.colorPrimary})`})},Ba=zt("Notification",e=>{const n=Pa(e);return[Cr(n),vr(n),Er(n)]},ja),Sr=Ii(["Notification","PurePanel"],e=>{const n=`${e.componentCls}-notice`,t=Pa(e);return{[`${n}-pure-panel`]:Object.assign(Object.assign({},La(t)),{width:t.width,maxWidth:`calc(100vw - ${B(e.calc(t.notificationMarginEdge).mul(2).equal())})`,margin:0})}},ja);var Fr=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(e);i<a.length;i++)n.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(t[a[i]]=e[a[i]]);return t};function Nt(e,n){return n===null||n===!1?null:n||o.createElement(Di,{className:`${e}-close-icon`})}const zr={success:Ri,info:Oi,error:Li,warning:ji},Aa=e=>{const{prefixCls:n,icon:t,type:a,message:i,description:r,btn:s,role:l="alert"}=e;let c=null;return t?c=o.createElement("span",{className:`${n}-icon`},t):a&&(c=o.createElement(zr[a]||null,{className:Y(`${n}-icon`,`${n}-icon-${a}`)})),o.createElement("div",{className:Y({[`${n}-with-icon`]:c}),role:l},c,o.createElement("div",{className:`${n}-message`},i),o.createElement("div",{className:`${n}-description`},r),s&&o.createElement("div",{className:`${n}-btn`},s))},kr=e=>{const{prefixCls:n,className:t,icon:a,type:i,message:r,description:s,btn:l,closable:c=!0,closeIcon:u,className:d}=e,f=Fr(e,["prefixCls","className","icon","type","message","description","btn","closable","closeIcon","className"]),{getPrefixCls:m}=o.useContext(Ye),g=n||m("notification"),p=`${g}-notice`,v=ka(g),[b,y,x]=Ba(g,v);return b(o.createElement("div",{className:Y(`${p}-pure-panel`,y,t,x,v)},o.createElement(Sr,{prefixCls:g}),o.createElement(Mi,Object.assign({},f,{prefixCls:g,eventKey:"pure",duration:null,closable:c,className:Y({notificationClassName:d}),closeIcon:Nt(g,u),content:o.createElement(Aa,{prefixCls:p,icon:a,type:i,message:r,description:s,btn:l})}))))};function $r(e,n,t){let a;switch(e){case"top":a={left:"50%",transform:"translateX(-50%)",right:"auto",top:n,bottom:"auto"};break;case"topLeft":a={left:0,top:n,bottom:"auto"};break;case"topRight":a={right:0,top:n,bottom:"auto"};break;case"bottom":a={left:"50%",transform:"translateX(-50%)",right:"auto",top:"auto",bottom:t};break;case"bottomLeft":a={left:0,top:"auto",bottom:t};break;default:a={right:0,top:"auto",bottom:t};break}return a}function Nr(e){return{motionName:`${e}-fade`}}var Ir=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(e);i<a.length;i++)n.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(t[a[i]]=e[a[i]]);return t};const pa=24,Mr=4.5,Dr="topRight",Rr=e=>{let{children:n,prefixCls:t}=e;const a=ka(t),[i,r,s]=Ba(t,a);return i(F.createElement(Ai,{classNames:{list:Y(r,s,a)}},n))},Or=(e,n)=>{let{prefixCls:t,key:a}=n;return F.createElement(Rr,{prefixCls:t,key:a},e)},Lr=F.forwardRef((e,n)=>{const{top:t,bottom:a,prefixCls:i,getContainer:r,maxCount:s,rtl:l,onAllRemoved:c,stack:u,duration:d,pauseOnHover:f=!0,showProgress:m}=e,{getPrefixCls:g,getPopupContainer:p,notification:v,direction:b}=o.useContext(Ye),[,y]=Pi(),x=i||g("notification"),S=z=>$r(z,t??pa,a??pa),w=()=>Y({[`${x}-rtl`]:l??b==="rtl"}),h=()=>Nr(x),[C,E]=Bi({prefixCls:x,style:S,className:w,motion:h,closable:!0,closeIcon:Nt(x),duration:d??Mr,getContainer:()=>(r==null?void 0:r())||(p==null?void 0:p())||document.body,maxCount:s,pauseOnHover:f,showProgress:m,onAllRemoved:c,renderNotifications:Or,stack:u===!1?!1:{threshold:typeof u=="object"?u==null?void 0:u.threshold:void 0,offset:8,gap:y.margin}});return F.useImperativeHandle(n,()=>Object.assign(Object.assign({},C),{prefixCls:x,notification:v})),E});function Ua(e){const n=F.useRef(null);return Ui(),[F.useMemo(()=>{const a=l=>{var c;if(!n.current)return;const{open:u,prefixCls:d,notification:f}=n.current,m=`${d}-notice`,{message:g,description:p,icon:v,type:b,btn:y,className:x,style:S,role:w="alert",closeIcon:h,closable:C}=l,E=Ir(l,["message","description","icon","type","btn","className","style","role","closeIcon","closable"]),z=Nt(m,typeof h<"u"?h:f==null?void 0:f.closeIcon);return u(Object.assign(Object.assign({placement:(c=e==null?void 0:e.placement)!==null&&c!==void 0?c:Dr},E),{content:F.createElement(Aa,{prefixCls:m,icon:v,type:b,message:g,description:p,btn:y,role:w}),className:Y(b&&`${m}-${b}`,x,f==null?void 0:f.className),style:Object.assign(Object.assign({},f==null?void 0:f.style),S),closeIcon:z,closable:C??!!z}))},r={open:a,destroy:l=>{var c,u;l!==void 0?(c=n.current)===null||c===void 0||c.close(l):(u=n.current)===null||u===void 0||u.destroy()}};return["success","info","warning","error"].forEach(l=>{r[l]=c=>a(Object.assign(Object.assign({},c),{type:l}))}),r},[]),F.createElement(Lr,Object.assign({key:"notification-holder"},e,{ref:n}))]}function jr(e){return Ua(e)}const It=F.createContext({});It.Consumer;var Ta=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(e);i<a.length;i++)n.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(t[a[i]]=e[a[i]]);return t};const Pr=e=>{var{prefixCls:n,className:t,avatar:a,title:i,description:r}=e,s=Ta(e,["prefixCls","className","avatar","title","description"]);const{getPrefixCls:l}=o.useContext(Ye),c=l("list",n),u=Y(`${c}-item-meta`,t),d=F.createElement("div",{className:`${c}-item-meta-content`},i&&F.createElement("h4",{className:`${c}-item-meta-title`},i),r&&F.createElement("div",{className:`${c}-item-meta-description`},r));return F.createElement("div",Object.assign({},s,{className:u}),a&&F.createElement("div",{className:`${c}-item-meta-avatar`},a),(i||r)&&d)},Br=F.forwardRef((e,n)=>{const{prefixCls:t,children:a,actions:i,extra:r,styles:s,className:l,classNames:c,colStyle:u}=e,d=Ta(e,["prefixCls","children","actions","extra","styles","className","classNames","colStyle"]),{grid:f,itemLayout:m}=o.useContext(It),{getPrefixCls:g,list:p}=o.useContext(Ye),v=E=>{var z,k;return Y((k=(z=p==null?void 0:p.item)===null||z===void 0?void 0:z.classNames)===null||k===void 0?void 0:k[E],c==null?void 0:c[E])},b=E=>{var z,k;return Object.assign(Object.assign({},(k=(z=p==null?void 0:p.item)===null||z===void 0?void 0:z.styles)===null||k===void 0?void 0:k[E]),s==null?void 0:s[E])},y=()=>{let E=!1;return o.Children.forEach(a,z=>{typeof z=="string"&&(E=!0)}),E&&o.Children.count(a)>1},x=()=>m==="vertical"?!!r:!y(),S=g("list",t),w=i&&i.length>0&&F.createElement("ul",{className:Y(`${S}-item-action`,v("actions")),key:"actions",style:b("actions")},i.map((E,z)=>F.createElement("li",{key:`${S}-item-action-${z}`},E,z!==i.length-1&&F.createElement("em",{className:`${S}-item-action-split`})))),h=f?"div":"li",C=F.createElement(h,Object.assign({},d,f?{}:{ref:n},{className:Y(`${S}-item`,{[`${S}-item-no-flex`]:!x()},l)}),m==="vertical"&&r?[F.createElement("div",{className:`${S}-item-main`,key:"content"},a,w),F.createElement("div",{className:Y(`${S}-item-extra`,v("extra")),key:"extra",style:b("extra")},r)]:[a,w,bt(r,{key:"extra"})]);return f?F.createElement(Ji,{ref:n,flex:1,style:u},C):C}),_a=Br;_a.Meta=Pr;const Ar=e=>{const{listBorderedCls:n,componentCls:t,paddingLG:a,margin:i,itemPaddingSM:r,itemPaddingLG:s,marginLG:l,borderRadiusLG:c}=e;return{[n]:{border:`${B(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:c,[`${t}-header,${t}-footer,${t}-item`]:{paddingInline:a},[`${t}-pagination`]:{margin:`${B(i)} ${B(l)}`}},[`${n}${t}-sm`]:{[`${t}-item,${t}-header,${t}-footer`]:{padding:r}},[`${n}${t}-lg`]:{[`${t}-item,${t}-header,${t}-footer`]:{padding:s}}}},Ur=e=>{const{componentCls:n,screenSM:t,screenMD:a,marginLG:i,marginSM:r,margin:s}=e;return{[`@media screen and (max-width:${a}px)`]:{[n]:{[`${n}-item`]:{[`${n}-item-action`]:{marginInlineStart:i}}},[`${n}-vertical`]:{[`${n}-item`]:{[`${n}-item-extra`]:{marginInlineStart:i}}}},[`@media screen and (max-width: ${t}px)`]:{[n]:{[`${n}-item`]:{flexWrap:"wrap",[`${n}-action`]:{marginInlineStart:r}}},[`${n}-vertical`]:{[`${n}-item`]:{flexWrap:"wrap-reverse",[`${n}-item-main`]:{minWidth:e.contentWidth},[`${n}-item-extra`]:{margin:`auto auto ${B(s)}`}}}}}},Tr=e=>{const{componentCls:n,antCls:t,controlHeight:a,minHeight:i,paddingSM:r,marginLG:s,padding:l,itemPadding:c,colorPrimary:u,itemPaddingSM:d,itemPaddingLG:f,paddingXS:m,margin:g,colorText:p,colorTextDescription:v,motionDurationSlow:b,lineWidth:y,headerBg:x,footerBg:S,emptyTextPadding:w,metaMarginBottom:h,avatarMarginRight:C,titleMarginBottom:E,descriptionFontSize:z}=e;return{[n]:Object.assign(Object.assign({},kt(e)),{position:"relative","*":{outline:"none"},[`${n}-header`]:{background:x},[`${n}-footer`]:{background:S},[`${n}-header, ${n}-footer`]:{paddingBlock:r},[`${n}-pagination`]:{marginBlockStart:s,[`${t}-pagination-options`]:{textAlign:"start"}},[`${n}-spin`]:{minHeight:i,textAlign:"center"},[`${n}-items`]:{margin:0,padding:0,listStyle:"none"},[`${n}-item`]:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:c,color:p,[`${n}-item-meta`]:{display:"flex",flex:1,alignItems:"flex-start",maxWidth:"100%",[`${n}-item-meta-avatar`]:{marginInlineEnd:C},[`${n}-item-meta-content`]:{flex:"1 0",width:0,color:p},[`${n}-item-meta-title`]:{margin:`0 0 ${B(e.marginXXS)} 0`,color:p,fontSize:e.fontSize,lineHeight:e.lineHeight,"> a":{color:p,transition:`all ${b}`,"&:hover":{color:u}}},[`${n}-item-meta-description`]:{color:v,fontSize:z,lineHeight:e.lineHeight}},[`${n}-item-action`]:{flex:"0 0 auto",marginInlineStart:e.marginXXL,padding:0,fontSize:0,listStyle:"none","& > li":{position:"relative",display:"inline-block",padding:`0 ${B(m)}`,color:v,fontSize:e.fontSize,lineHeight:e.lineHeight,textAlign:"center","&:first-child":{paddingInlineStart:0}},[`${n}-item-action-split`]:{position:"absolute",insetBlockStart:"50%",insetInlineEnd:0,width:y,height:e.calc(e.fontHeight).sub(e.calc(e.marginXXS).mul(2)).equal(),transform:"translateY(-50%)",backgroundColor:e.colorSplit}}},[`${n}-empty`]:{padding:`${B(l)} 0`,color:v,fontSize:e.fontSizeSM,textAlign:"center"},[`${n}-empty-text`]:{padding:w,color:e.colorTextDisabled,fontSize:e.fontSize,textAlign:"center"},[`${n}-item-no-flex`]:{display:"block"}}),[`${n}-grid ${t}-col > ${n}-item`]:{display:"block",maxWidth:"100%",marginBlockEnd:g,paddingBlock:0,borderBlockEnd:"none"},[`${n}-vertical ${n}-item`]:{alignItems:"initial",[`${n}-item-main`]:{display:"block",flex:1},[`${n}-item-extra`]:{marginInlineStart:s},[`${n}-item-meta`]:{marginBlockEnd:h,[`${n}-item-meta-title`]:{marginBlockStart:0,marginBlockEnd:E,color:p,fontSize:e.fontSizeLG,lineHeight:e.lineHeightLG}},[`${n}-item-action`]:{marginBlockStart:l,marginInlineStart:"auto","> li":{padding:`0 ${B(l)}`,"&:first-child":{paddingInlineStart:0}}}},[`${n}-split ${n}-item`]:{borderBlockEnd:`${B(e.lineWidth)} ${e.lineType} ${e.colorSplit}`,"&:last-child":{borderBlockEnd:"none"}},[`${n}-split ${n}-header`]:{borderBlockEnd:`${B(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${n}-split${n}-empty ${n}-footer`]:{borderTop:`${B(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${n}-loading ${n}-spin-nested-loading`]:{minHeight:a},[`${n}-split${n}-something-after-last-item ${t}-spin-container > ${n}-items > ${n}-item:last-child`]:{borderBlockEnd:`${B(e.lineWidth)} ${e.lineType} ${e.colorSplit}`},[`${n}-lg ${n}-item`]:{padding:f},[`${n}-sm ${n}-item`]:{padding:d},[`${n}:not(${n}-vertical)`]:{[`${n}-item-no-flex`]:{[`${n}-item-action`]:{float:"right"}}}}},_r=e=>({contentWidth:220,itemPadding:`${B(e.paddingContentVertical)} 0`,itemPaddingSM:`${B(e.paddingContentVerticalSM)} ${B(e.paddingContentHorizontal)}`,itemPaddingLG:`${B(e.paddingContentVerticalLG)} ${B(e.paddingContentHorizontalLG)}`,headerBg:"transparent",footerBg:"transparent",emptyTextPadding:e.padding,metaMarginBottom:e.padding,avatarMarginRight:e.padding,titleMarginBottom:e.paddingSM,descriptionFontSize:e.fontSize}),Hr=zt("List",e=>{const n=$t(e,{listBorderedCls:`${e.componentCls}-bordered`,minHeight:e.controlHeightLG});return[Tr(n),Ar(n),Ur(n)]},_r);var Vr=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(e);i<a.length;i++)n.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(t[a[i]]=e[a[i]]);return t};function qr(e,n){var{pagination:t=!1,prefixCls:a,bordered:i=!1,split:r=!0,className:s,rootClassName:l,style:c,children:u,itemLayout:d,loadMore:f,grid:m,dataSource:g=[],size:p,header:v,footer:b,loading:y=!1,rowKey:x,renderItem:S,locale:w}=e,h=Vr(e,["pagination","prefixCls","bordered","split","className","rootClassName","style","children","itemLayout","loadMore","grid","dataSource","size","header","footer","loading","rowKey","renderItem","locale"]);const C=t&&typeof t=="object"?t:{},[E,z]=o.useState(C.defaultCurrent||1),[k,R]=o.useState(C.defaultPageSize||10),{getPrefixCls:A,renderEmpty:O,direction:oe,list:H}=o.useContext(Ye),re={current:1,total:0},L=X=>(le,fe)=>{var ke;z(le),R(fe),t&&((ke=t==null?void 0:t[X])===null||ke===void 0||ke.call(t,le,fe))},U=L("onChange"),Q=L("onShowSizeChange"),ee=(X,le)=>{if(!S)return null;let fe;return typeof x=="function"?fe=x(X):x?fe=X[x]:fe=X.key,fe||(fe=`list-item-${le}`),o.createElement(o.Fragment,{key:fe},S(X,le))},Ce=()=>!!(f||t||b),W=A("list",a),[se,$,G]=Hr(W);let P=y;typeof P=="boolean"&&(P={spinning:P});const V=!!(P!=null&&P.spinning),pe=lr(p);let me="";switch(pe){case"large":me="lg";break;case"small":me="sm";break}const De=Y(W,{[`${W}-vertical`]:d==="vertical",[`${W}-${me}`]:me,[`${W}-split`]:r,[`${W}-bordered`]:i,[`${W}-loading`]:V,[`${W}-grid`]:!!m,[`${W}-something-after-last-item`]:Ce(),[`${W}-rtl`]:oe==="rtl"},H==null?void 0:H.className,s,l,$,G),ae=Yi(re,{total:g.length,current:E,pageSize:k},t||{}),ge=Math.ceil(ae.total/ae.pageSize);ae.current>ge&&(ae.current=ge);const ye=t&&o.createElement("div",{className:Y(`${W}-pagination`)},o.createElement(Qi,Object.assign({align:"end"},ae,{onChange:U,onShowSizeChange:Q})));let q=qe(g);t&&g.length>(ae.current-1)*ae.pageSize&&(q=qe(g).splice((ae.current-1)*ae.pageSize,ae.pageSize));const J=Object.keys(m||{}).some(X=>["xs","sm","md","lg","xl","xxl"].includes(X)),ve=ar(J),ce=o.useMemo(()=>{for(let X=0;X<ma.length;X+=1){const le=ma[X];if(ve[le])return le}},[ve]),Te=o.useMemo(()=>{if(!m)return;const X=ce&&m[ce]?m[ce]:m.column;if(X)return{width:`${100/X}%`,maxWidth:`${100/X}%`}},[JSON.stringify(m),ce]);let Re=V&&o.createElement("div",{style:{minHeight:53}});if(q.length>0){const X=q.map((le,fe)=>ee(le,fe));Re=m?o.createElement(er,{gutter:m.gutter},o.Children.map(X,le=>o.createElement("div",{key:le==null?void 0:le.key,style:Te},le))):o.createElement("ul",{className:`${W}-items`},X)}else!u&&!V&&(Re=o.createElement("div",{className:`${W}-empty-text`},(w==null?void 0:w.emptyText)||(O==null?void 0:O("List"))||o.createElement(rr,{componentName:"List"})));const _e=ae.position||"bottom",Se=o.useMemo(()=>({grid:m,itemLayout:d}),[JSON.stringify(m),d]);return se(o.createElement(It.Provider,{value:Se},o.createElement("div",Object.assign({ref:n,style:Object.assign(Object.assign({},H==null?void 0:H.style),c),className:De},h),(_e==="top"||_e==="both")&&ye,v&&o.createElement("div",{className:`${W}-header`},v),o.createElement(nr,Object.assign({},P),Re,u),b&&o.createElement("div",{className:`${W}-footer`},b),f||(_e==="bottom"||_e==="both")&&ye)))}const Wr=o.forwardRef(qr),xt=Wr;xt.Item=_a;let Pe=null,Hn=e=>e(),Vn=[],Dn={};function ga(){const{getContainer:e,rtl:n,maxCount:t,top:a,bottom:i,showProgress:r,pauseOnHover:s}=Dn,l=(e==null?void 0:e())||document.body;return{getContainer:()=>l,rtl:n,maxCount:t,top:a,bottom:i,showProgress:r,pauseOnHover:s}}const Gr=F.forwardRef((e,n)=>{const{notificationConfig:t,sync:a}=e,{getPrefixCls:i}=o.useContext(Ye),r=Dn.prefixCls||i("notification"),s=o.useContext(Vi),[l,c]=Ua(Object.assign(Object.assign(Object.assign({},t),{prefixCls:r}),s.notification));return F.useEffect(a,[]),F.useImperativeHandle(n,()=>{const u=Object.assign({},l);return Object.keys(u).forEach(d=>{u[d]=function(){return a(),l[d].apply(l,arguments)}}),{instance:u,sync:a}}),c}),Xr=F.forwardRef((e,n)=>{const[t,a]=F.useState(ga),i=()=>{a(ga)};F.useEffect(i,[]);const r=Hi(),s=r.getRootPrefixCls(),l=r.getIconPrefixCls(),c=r.getTheme(),u=F.createElement(Gr,{ref:n,sync:i,notificationConfig:t});return F.createElement(_i,{prefixCls:s,iconPrefixCls:l,theme:c},r.holderRender?r.holderRender(u):u)});function Mt(){if(!Pe){const e=document.createDocumentFragment(),n={fragment:e};Pe=n,Hn(()=>{Ti(F.createElement(Xr,{ref:t=>{const{instance:a,sync:i}=t||{};Promise.resolve().then(()=>{!n.instance&&a&&(n.instance=a,n.sync=i,Mt())})}}),e)});return}Pe.instance&&(Vn.forEach(e=>{switch(e.type){case"open":{Hn(()=>{Pe.instance.open(Object.assign(Object.assign({},Dn),e.config))});break}case"destroy":Hn(()=>{Pe==null||Pe.instance.destroy(e.key)});break}}),Vn=[])}function Zr(e){Dn=Object.assign(Object.assign({},Dn),e),Hn(()=>{var n;(n=Pe==null?void 0:Pe.sync)===null||n===void 0||n.call(Pe)})}function Ha(e){Vn.push({type:"open",config:e}),Mt()}const Kr=e=>{Vn.push({type:"destroy",key:e}),Mt()},Jr=["success","info","warning","error"],Yr={open:Ha,destroy:Kr,config:Zr,useNotification:jr,_InternalPanelDoNotUseOrYouWillBeFired:kr},Va=Yr;Jr.forEach(e=>{Va[e]=n=>Ha(Object.assign(Object.assign({},n),{type:e}))});var Qr={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"},eo=function(n,t){return o.createElement(wn,Je({},n,{ref:t,icon:Qr}))},qa=o.forwardRef(eo),no={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"}}]},name:"download",theme:"outlined"},to=function(n,t){return o.createElement(wn,Je({},n,{ref:t,icon:no}))},ao=o.forwardRef(to),io={icon:function(n,t){return{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M534 352V136H232v752h560V394H576a42 42 0 01-42-42z",fill:t}},{tag:"path",attrs:{d:"M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z",fill:n}}]}},name:"file",theme:"twotone"},ro=function(n,t){return o.createElement(wn,Je({},n,{ref:t,icon:io}))},oo=o.forwardRef(ro),lo={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M779.3 196.6c-94.2-94.2-247.6-94.2-341.7 0l-261 260.8c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l261-260.8c32.4-32.4 75.5-50.2 121.3-50.2s88.9 17.8 121.2 50.2c32.4 32.4 50.2 75.5 50.2 121.2 0 45.8-17.8 88.8-50.2 121.2l-266 265.9-43.1 43.1c-40.3 40.3-105.8 40.3-146.1 0-19.5-19.5-30.2-45.4-30.2-73s10.7-53.5 30.2-73l263.9-263.8c6.7-6.6 15.5-10.3 24.9-10.3h.1c9.4 0 18.1 3.7 24.7 10.3 6.7 6.7 10.3 15.5 10.3 24.9 0 9.3-3.7 18.1-10.3 24.7L372.4 653c-1.7 1.7-2.6 4-2.6 6.4s.9 4.7 2.6 6.4l36.9 36.9a9 9 0 0012.7 0l215.6-215.6c19.9-19.9 30.8-46.3 30.8-74.4s-11-54.6-30.8-74.4c-41.1-41.1-107.9-41-149 0L463 364 224.8 602.1A172.22 172.22 0 00174 724.8c0 46.3 18.1 89.8 50.8 122.5 33.9 33.8 78.3 50.7 122.7 50.7 44.4 0 88.8-16.9 122.6-50.7l309.2-309C824.8 492.7 850 432 850 367.5c.1-64.6-25.1-125.3-70.7-170.9z"}}]},name:"paper-clip",theme:"outlined"},so=function(n,t){return o.createElement(wn,Je({},n,{ref:t,icon:lo}))},co=o.forwardRef(so),uo={icon:function(n,t){return{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3 150.1 178L658.1 489 888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z",fill:n}},{tag:"path",attrs:{d:"M424.6 765.8l-150.1-178L136 752.1V792h752v-30.4L658.1 489z",fill:t}},{tag:"path",attrs:{d:"M136 652.7l132.4-157c3.2-3.8 9-3.8 12.2 0l144 170.7L652 396.8c3.2-3.8 9-3.8 12.2 0L888 662.2V232H136v420.7zM304 280a88 88 0 110 176 88 88 0 010-176z",fill:t}},{tag:"path",attrs:{d:"M276 368a28 28 0 1056 0 28 28 0 10-56 0z",fill:t}},{tag:"path",attrs:{d:"M304 456a88 88 0 100-176 88 88 0 000 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28-28-12.5-28-28 12.5-28 28-28z",fill:n}}]}},name:"picture",theme:"twotone"},fo=function(n,t){return o.createElement(wn,Je({},n,{ref:t,icon:uo}))},mo=o.forwardRef(fo),po={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"}}]},name:"upload",theme:"outlined"},go=function(n,t){return o.createElement(wn,Je({},n,{ref:t,icon:po}))},vo=o.forwardRef(go);const ft=function(e,n){if(e&&n){var t=Array.isArray(n)?n:n.split(","),a=e.name||"",i=e.type||"",r=i.replace(/\/.*$/,"");return t.some(function(s){var l=s.trim();if(/^\*(\/\*)?$/.test(s))return!0;if(l.charAt(0)==="."){var c=a.toLowerCase(),u=l.toLowerCase(),d=[u];return(u===".jpg"||u===".jpeg")&&(d=[".jpg",".jpeg"]),d.some(function(f){return c.endsWith(f)})}return/\/\*$/.test(l)?r===l.replace(/\/.*$/,""):i===l?!0:/^\w+$/.test(l)?(qi(!1,"Upload takes an invalidate 'accept' type '".concat(l,"'.Skip for check.")),!0):!1})}return!0};function ho(e,n){var t="cannot ".concat(e.method," ").concat(e.action," ").concat(n.status,"'"),a=new Error(t);return a.status=n.status,a.method=e.method,a.url=e.action,a}function va(e){var n=e.responseText||e.response;if(!n)return n;try{return JSON.parse(n)}catch{return n}}function bo(e){var n=new XMLHttpRequest;e.onProgress&&n.upload&&(n.upload.onprogress=function(r){r.total>0&&(r.percent=r.loaded/r.total*100),e.onProgress(r)});var t=new FormData;e.data&&Object.keys(e.data).forEach(function(i){var r=e.data[i];if(Array.isArray(r)){r.forEach(function(s){t.append("".concat(i,"[]"),s)});return}t.append(i,r)}),e.file instanceof Blob?t.append(e.filename,e.file,e.file.name):t.append(e.filename,e.file),n.onerror=function(r){e.onError(r)},n.onload=function(){return n.status<200||n.status>=300?e.onError(ho(e,n),va(n)):e.onSuccess(va(n),n)},n.open(e.method,e.action,!0),e.withCredentials&&"withCredentials"in n&&(n.withCredentials=!0);var a=e.headers||{};return a["X-Requested-With"]!==null&&n.setRequestHeader("X-Requested-With","XMLHttpRequest"),Object.keys(a).forEach(function(i){a[i]!==null&&n.setRequestHeader(i,a[i])}),n.send(t),{abort:function(){n.abort()}}}var xo=function(){var e=vn(Ne().mark(function n(t,a){var i,r,s,l,c,u,d,f;return Ne().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:u=function(){return u=vn(Ne().mark(function v(b){return Ne().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.abrupt("return",new Promise(function(S){b.file(function(w){a(w)?(b.fullPath&&!w.webkitRelativePath&&(Object.defineProperties(w,{webkitRelativePath:{writable:!0}}),w.webkitRelativePath=b.fullPath.replace(/^\//,""),Object.defineProperties(w,{webkitRelativePath:{writable:!1}})),S(w)):S(null)})}));case 1:case"end":return x.stop()}},v)})),u.apply(this,arguments)},c=function(v){return u.apply(this,arguments)},l=function(){return l=vn(Ne().mark(function v(b){var y,x,S,w,h;return Ne().wrap(function(E){for(;;)switch(E.prev=E.next){case 0:y=b.createReader(),x=[];case 2:return E.next=5,new Promise(function(z){y.readEntries(z,function(){return z([])})});case 5:if(S=E.sent,w=S.length,w){E.next=9;break}return E.abrupt("break",12);case 9:for(h=0;h<w;h++)x.push(S[h]);E.next=2;break;case 12:return E.abrupt("return",x);case 13:case"end":return E.stop()}},v)})),l.apply(this,arguments)},s=function(v){return l.apply(this,arguments)},i=[],r=[],t.forEach(function(p){return r.push(p.webkitGetAsEntry())}),d=function(){var p=vn(Ne().mark(function v(b,y){var x,S;return Ne().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:if(b){h.next=2;break}return h.abrupt("return");case 2:if(b.path=y||"",!b.isFile){h.next=10;break}return h.next=6,c(b);case 6:x=h.sent,x&&i.push(x),h.next=15;break;case 10:if(!b.isDirectory){h.next=15;break}return h.next=13,s(b);case 13:S=h.sent,r.push.apply(r,qe(S));case 15:case"end":return h.stop()}},v)}));return function(b,y){return p.apply(this,arguments)}}(),f=0;case 9:if(!(f<r.length)){g.next=15;break}return g.next=12,d(r[f]);case 12:f++,g.next=9;break;case 15:return g.abrupt("return",i);case 16:case"end":return g.stop()}},n)}));return function(t,a){return e.apply(this,arguments)}}(),yo=+new Date,wo=0;function mt(){return"rc-upload-".concat(yo,"-").concat(++wo)}var Eo=["component","prefixCls","className","classNames","disabled","id","name","style","styles","multiple","accept","capture","children","directory","openFileDialogOnClick","onMouseEnter","onMouseLeave","hasControlInside"],Co=function(e){$a(t,e);var n=Na(t);function t(){var a;Ia(this,t);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return a=n.call.apply(n,[this].concat(r)),be(ze(a),"state",{uid:mt()}),be(ze(a),"reqs",{}),be(ze(a),"fileInput",void 0),be(ze(a),"_isMounted",void 0),be(ze(a),"onChange",function(l){var c=a.props,u=c.accept,d=c.directory,f=l.target.files,m=qe(f).filter(function(g){return!d||ft(g,u)});a.uploadFiles(m),a.reset()}),be(ze(a),"onClick",function(l){var c=a.fileInput;if(c){var u=l.target,d=a.props.onClick;if(u&&u.tagName==="BUTTON"){var f=c.parentNode;f.focus(),u.blur()}c.click(),d&&d(l)}}),be(ze(a),"onKeyDown",function(l){l.key==="Enter"&&a.onClick(l)}),be(ze(a),"onFileDrop",function(){var l=vn(Ne().mark(function c(u){var d,f,m;return Ne().wrap(function(p){for(;;)switch(p.prev=p.next){case 0:if(d=a.props.multiple,u.preventDefault(),u.type!=="dragover"){p.next=4;break}return p.abrupt("return");case 4:if(!a.props.directory){p.next=11;break}return p.next=7,xo(Array.prototype.slice.call(u.dataTransfer.items),function(v){return ft(v,a.props.accept)});case 7:f=p.sent,a.uploadFiles(f),p.next=14;break;case 11:m=qe(u.dataTransfer.files).filter(function(v){return ft(v,a.props.accept)}),d===!1&&(m=m.slice(0,1)),a.uploadFiles(m);case 14:case"end":return p.stop()}},c)}));return function(c){return l.apply(this,arguments)}}()),be(ze(a),"uploadFiles",function(l){var c=qe(l),u=c.map(function(d){return d.uid=mt(),a.processFile(d,c)});Promise.all(u).then(function(d){var f=a.props.onBatchStart;f==null||f(d.map(function(m){var g=m.origin,p=m.parsedFile;return{file:g,parsedFile:p}})),d.filter(function(m){return m.parsedFile!==null}).forEach(function(m){a.post(m)})})}),be(ze(a),"processFile",function(){var l=vn(Ne().mark(function c(u,d){var f,m,g,p,v,b,y,x,S;return Ne().wrap(function(h){for(;;)switch(h.prev=h.next){case 0:if(f=a.props.beforeUpload,m=u,!f){h.next=14;break}return h.prev=3,h.next=6,f(u,d);case 6:m=h.sent,h.next=12;break;case 9:h.prev=9,h.t0=h.catch(3),m=!1;case 12:if(m!==!1){h.next=14;break}return h.abrupt("return",{origin:u,parsedFile:null,action:null,data:null});case 14:if(g=a.props.action,typeof g!="function"){h.next=21;break}return h.next=18,g(u);case 18:p=h.sent,h.next=22;break;case 21:p=g;case 22:if(v=a.props.data,typeof v!="function"){h.next=29;break}return h.next=26,v(u);case 26:b=h.sent,h.next=30;break;case 29:b=v;case 30:return y=(zi(m)==="object"||typeof m=="string")&&m?m:u,y instanceof File?x=y:x=new File([y],u.name,{type:u.type}),S=x,S.uid=u.uid,h.abrupt("return",{origin:u,data:b,parsedFile:S,action:p});case 35:case"end":return h.stop()}},c,null,[[3,9]])}));return function(c,u){return l.apply(this,arguments)}}()),be(ze(a),"saveFileInput",function(l){a.fileInput=l}),a}return Ma(t,[{key:"componentDidMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.abort()}},{key:"post",value:function(i){var r=this,s=i.data,l=i.origin,c=i.action,u=i.parsedFile;if(this._isMounted){var d=this.props,f=d.onStart,m=d.customRequest,g=d.name,p=d.headers,v=d.withCredentials,b=d.method,y=l.uid,x=m||bo,S={action:c,filename:g,data:s,file:u,headers:p,withCredentials:v,method:b||"post",onProgress:function(h){var C=r.props.onProgress;C==null||C(h,u)},onSuccess:function(h,C){var E=r.props.onSuccess;E==null||E(h,u,C),delete r.reqs[y]},onError:function(h,C){var E=r.props.onError;E==null||E(h,C,u),delete r.reqs[y]}};f(l),this.reqs[y]=x(S)}}},{key:"reset",value:function(){this.setState({uid:mt()})}},{key:"abort",value:function(i){var r=this.reqs;if(i){var s=i.uid?i.uid:i;r[s]&&r[s].abort&&r[s].abort(),delete r[s]}else Object.keys(r).forEach(function(l){r[l]&&r[l].abort&&r[l].abort(),delete r[l]})}},{key:"render",value:function(){var i=this.props,r=i.component,s=i.prefixCls,l=i.className,c=i.classNames,u=c===void 0?{}:c,d=i.disabled,f=i.id,m=i.name,g=i.style,p=i.styles,v=p===void 0?{}:p,b=i.multiple,y=i.accept,x=i.capture,S=i.children,w=i.directory,h=i.openFileDialogOnClick,C=i.onMouseEnter,E=i.onMouseLeave,z=i.hasControlInside,k=Wi(i,Eo),R=Y(be(be(be({},s,!0),"".concat(s,"-disabled"),d),l,l)),A=w?{directory:"directory",webkitdirectory:"webkitdirectory"}:{},O=d?{}:{onClick:h?this.onClick:function(){},onKeyDown:h?this.onKeyDown:function(){},onMouseEnter:C,onMouseLeave:E,onDrop:this.onFileDrop,onDragOver:this.onFileDrop,tabIndex:z?void 0:"0"};return F.createElement(r,Je({},O,{className:R,role:z?void 0:"button",style:g}),F.createElement("input",Je({},Gi(k,{aria:!0,data:!0}),{id:f,name:m,disabled:d,type:"file",ref:this.saveFileInput,onClick:function(H){return H.stopPropagation()},key:this.state.uid,style:Fi({display:"none"},v.input),className:u.input,accept:y},A,{multiple:b,onChange:this.onChange},x!=null?{capture:x}:{})),S)}}]),t}(o.Component);function pt(){}var yt=function(e){$a(t,e);var n=Na(t);function t(){var a;Ia(this,t);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return a=n.call.apply(n,[this].concat(r)),be(ze(a),"uploader",void 0),be(ze(a),"saveUploader",function(l){a.uploader=l}),a}return Ma(t,[{key:"abort",value:function(i){this.uploader.abort(i)}},{key:"render",value:function(){return F.createElement(Co,Je({},this.props,{ref:this.saveUploader}))}}]),t}(o.Component);be(yt,"defaultProps",{component:"span",prefixCls:"rc-upload",data:{},headers:{},name:"file",multipart:!1,onStart:pt,onError:pt,onSuccess:pt,multiple:!1,beforeUpload:null,customRequest:null,withCredentials:!1,openFileDialogOnClick:!0,hasControlInside:!1});const So=e=>{const{componentCls:n,iconCls:t}=e;return{[`${n}-wrapper`]:{[`${n}-drag`]:{position:"relative",width:"100%",height:"100%",textAlign:"center",background:e.colorFillAlter,border:`${B(e.lineWidth)} dashed ${e.colorBorder}`,borderRadius:e.borderRadiusLG,cursor:"pointer",transition:`border-color ${e.motionDurationSlow}`,[n]:{padding:e.padding},[`${n}-btn`]:{display:"table",width:"100%",height:"100%",outline:"none",borderRadius:e.borderRadiusLG,"&:focus-visible":{outline:`${B(e.lineWidthFocus)} solid ${e.colorPrimaryBorder}`}},[`${n}-drag-container`]:{display:"table-cell",verticalAlign:"middle"},[`
          &:not(${n}-disabled):hover,
          &-hover:not(${n}-disabled)
        `]:{borderColor:e.colorPrimaryHover},[`p${n}-drag-icon`]:{marginBottom:e.margin,[t]:{color:e.colorPrimary,fontSize:e.uploadThumbnailSize}},[`p${n}-text`]:{margin:`0 0 ${B(e.marginXXS)}`,color:e.colorTextHeading,fontSize:e.fontSizeLG},[`p${n}-hint`]:{color:e.colorTextDescription,fontSize:e.fontSize},[`&${n}-disabled`]:{[`p${n}-drag-icon ${t},
            p${n}-text,
            p${n}-hint
          `]:{color:e.colorTextDisabled}}}}}},Fo=e=>{const{componentCls:n,antCls:t,iconCls:a,fontSize:i,lineHeight:r,calc:s}=e,l=`${n}-list-item`,c=`${l}-actions`,u=`${l}-action`,d=e.fontHeightSM;return{[`${n}-wrapper`]:{[`${n}-list`]:Object.assign(Object.assign({},Da()),{lineHeight:e.lineHeight,[l]:{position:"relative",height:s(e.lineHeight).mul(i).equal(),marginTop:e.marginXS,fontSize:i,display:"flex",alignItems:"center",transition:`background-color ${e.motionDurationSlow}`,"&:hover":{backgroundColor:e.controlItemBgHover},[`${l}-name`]:Object.assign(Object.assign({},Ra),{padding:`0 ${B(e.paddingXS)}`,lineHeight:r,flex:"auto",transition:`all ${e.motionDurationSlow}`}),[c]:{whiteSpace:"nowrap",[u]:{opacity:0},[a]:{color:e.actionsColor,transition:`all ${e.motionDurationSlow}`},[`
              ${u}:focus-visible,
              &.picture ${u}
            `]:{opacity:1},[`${u}${t}-btn`]:{height:d,border:0,lineHeight:1}},[`${n}-icon ${a}`]:{color:e.colorTextDescription,fontSize:i},[`${l}-progress`]:{position:"absolute",bottom:e.calc(e.uploadProgressOffset).mul(-1).equal(),width:"100%",paddingInlineStart:s(i).add(e.paddingXS).equal(),fontSize:i,lineHeight:0,pointerEvents:"none","> div":{margin:0}}},[`${l}:hover ${u}`]:{opacity:1},[`${l}-error`]:{color:e.colorError,[`${l}-name, ${n}-icon ${a}`]:{color:e.colorError},[c]:{[`${a}, ${a}:hover`]:{color:e.colorError},[u]:{opacity:1}}},[`${n}-list-item-container`]:{transition:`opacity ${e.motionDurationSlow}, height ${e.motionDurationSlow}`,"&::before":{display:"table",width:0,height:0,content:'""'}}})}}},zo=e=>{const{componentCls:n}=e,t=new un("uploadAnimateInlineIn",{from:{width:0,height:0,padding:0,opacity:0,margin:e.calc(e.marginXS).div(-2).equal()}}),a=new un("uploadAnimateInlineOut",{to:{width:0,height:0,padding:0,opacity:0,margin:e.calc(e.marginXS).div(-2).equal()}}),i=`${n}-animate-inline`;return[{[`${n}-wrapper`]:{[`${i}-appear, ${i}-enter, ${i}-leave`]:{animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseInOutCirc,animationFillMode:"forwards"},[`${i}-appear, ${i}-enter`]:{animationName:t},[`${i}-leave`]:{animationName:a}}},{[`${n}-wrapper`]:dr(e)},t,a]},ko=e=>{const{componentCls:n,iconCls:t,uploadThumbnailSize:a,uploadProgressOffset:i,calc:r}=e,s=`${n}-list`,l=`${s}-item`;return{[`${n}-wrapper`]:{[`
        ${s}${s}-picture,
        ${s}${s}-picture-card,
        ${s}${s}-picture-circle
      `]:{[l]:{position:"relative",height:r(a).add(r(e.lineWidth).mul(2)).add(r(e.paddingXS).mul(2)).equal(),padding:e.paddingXS,border:`${B(e.lineWidth)} ${e.lineType} ${e.colorBorder}`,borderRadius:e.borderRadiusLG,"&:hover":{background:"transparent"},[`${l}-thumbnail`]:Object.assign(Object.assign({},Ra),{width:a,height:a,lineHeight:B(r(a).add(e.paddingSM).equal()),textAlign:"center",flex:"none",[t]:{fontSize:e.fontSizeHeading2,color:e.colorPrimary},img:{display:"block",width:"100%",height:"100%",overflow:"hidden"}}),[`${l}-progress`]:{bottom:i,width:`calc(100% - ${B(r(e.paddingSM).mul(2).equal())})`,marginTop:0,paddingInlineStart:r(a).add(e.paddingXS).equal()}},[`${l}-error`]:{borderColor:e.colorError,[`${l}-thumbnail ${t}`]:{[`svg path[fill='${ua[0]}']`]:{fill:e.colorErrorBg},[`svg path[fill='${ua.primary}']`]:{fill:e.colorError}}},[`${l}-uploading`]:{borderStyle:"dashed",[`${l}-name`]:{marginBottom:i}}},[`${s}${s}-picture-circle ${l}`]:{[`&, &::before, ${l}-thumbnail`]:{borderRadius:"50%"}}}}},$o=e=>{const{componentCls:n,iconCls:t,fontSizeLG:a,colorTextLightSolid:i,calc:r}=e,s=`${n}-list`,l=`${s}-item`,c=e.uploadPicCardSize;return{[`
      ${n}-wrapper${n}-picture-card-wrapper,
      ${n}-wrapper${n}-picture-circle-wrapper
    `]:Object.assign(Object.assign({},Da()),{display:"block",[`${n}${n}-select`]:{width:c,height:c,textAlign:"center",verticalAlign:"top",backgroundColor:e.colorFillAlter,border:`${B(e.lineWidth)} dashed ${e.colorBorder}`,borderRadius:e.borderRadiusLG,cursor:"pointer",transition:`border-color ${e.motionDurationSlow}`,[`> ${n}`]:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",textAlign:"center"},[`&:not(${n}-disabled):hover`]:{borderColor:e.colorPrimary}},[`${s}${s}-picture-card, ${s}${s}-picture-circle`]:{display:"flex",flexWrap:"wrap","@supports not (gap: 1px)":{"& > *":{marginBlockEnd:e.marginXS,marginInlineEnd:e.marginXS}},"@supports (gap: 1px)":{gap:e.marginXS},[`${s}-item-container`]:{display:"inline-block",width:c,height:c,verticalAlign:"top"},"&::after":{display:"none"},"&::before":{display:"none"},[l]:{height:"100%",margin:0,"&::before":{position:"absolute",zIndex:1,width:`calc(100% - ${B(r(e.paddingXS).mul(2).equal())})`,height:`calc(100% - ${B(r(e.paddingXS).mul(2).equal())})`,backgroundColor:e.colorBgMask,opacity:0,transition:`all ${e.motionDurationSlow}`,content:'" "'}},[`${l}:hover`]:{[`&::before, ${l}-actions`]:{opacity:1}},[`${l}-actions`]:{position:"absolute",insetInlineStart:0,zIndex:10,width:"100%",whiteSpace:"nowrap",textAlign:"center",opacity:0,transition:`all ${e.motionDurationSlow}`,[`
            ${t}-eye,
            ${t}-download,
            ${t}-delete
          `]:{zIndex:10,width:a,margin:`0 ${B(e.marginXXS)}`,fontSize:a,cursor:"pointer",transition:`all ${e.motionDurationSlow}`,color:i,"&:hover":{color:i},svg:{verticalAlign:"baseline"}}},[`${l}-thumbnail, ${l}-thumbnail img`]:{position:"static",display:"block",width:"100%",height:"100%",objectFit:"contain"},[`${l}-name`]:{display:"none",textAlign:"center"},[`${l}-file + ${l}-name`]:{position:"absolute",bottom:e.margin,display:"block",width:`calc(100% - ${B(r(e.paddingXS).mul(2).equal())})`},[`${l}-uploading`]:{[`&${l}`]:{backgroundColor:e.colorFillAlter},[`&::before, ${t}-eye, ${t}-download, ${t}-delete`]:{display:"none"}},[`${l}-progress`]:{bottom:e.marginXL,width:`calc(100% - ${B(r(e.paddingXS).mul(2).equal())})`,paddingInlineStart:0}}}),[`${n}-wrapper${n}-picture-circle-wrapper`]:{[`${n}${n}-select`]:{borderRadius:"50%"}}}},No=e=>{const{componentCls:n}=e;return{[`${n}-rtl`]:{direction:"rtl"}}},Io=e=>{const{componentCls:n,colorTextDisabled:t}=e;return{[`${n}-wrapper`]:Object.assign(Object.assign({},kt(e)),{[n]:{outline:0,"input[type='file']":{cursor:"pointer"}},[`${n}-select`]:{display:"inline-block"},[`${n}-disabled`]:{color:t,cursor:"not-allowed"}})}},Mo=e=>({actionsColor:e.colorTextDescription}),Do=zt("Upload",e=>{const{fontSizeHeading3:n,fontHeight:t,lineWidth:a,controlHeightLG:i,calc:r}=e,s=$t(e,{uploadThumbnailSize:r(n).mul(2).equal(),uploadProgressOffset:r(r(t).div(2)).add(a).equal(),uploadPicCardSize:r(i).mul(2.55).equal()});return[Io(s),So(s),ko(s),$o(s),Fo(s),zo(s),No(s),tr(s)]},Mo);function Tn(e){return Object.assign(Object.assign({},e),{lastModified:e.lastModified,lastModifiedDate:e.lastModifiedDate,name:e.name,size:e.size,type:e.type,uid:e.uid,percent:0,originFileObj:e})}function _n(e,n){const t=qe(n),a=t.findIndex(i=>{let{uid:r}=i;return r===e.uid});return a===-1?t.push(e):t[a]=e,t}function gt(e,n){const t=e.uid!==void 0?"uid":"name";return n.filter(a=>a[t]===e[t])[0]}function Ro(e,n){const t=e.uid!==void 0?"uid":"name",a=n.filter(i=>i[t]!==e[t]);return a.length===n.length?null:a}const Oo=function(){const n=(arguments.length>0&&arguments[0]!==void 0?arguments[0]:"").split("/"),a=n[n.length-1].split(/#|\?/)[0];return(/\.[^./\\]*$/.exec(a)||[""])[0]},Wa=e=>e.indexOf("image/")===0,Lo=e=>{if(e.type&&!e.thumbUrl)return Wa(e.type);const n=e.thumbUrl||e.url||"",t=Oo(n);return/^data:image\//.test(n)||/(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg|ico|heic|heif)$/i.test(t)?!0:!(/^data:/.test(n)||t)},nn=200;function jo(e){return new Promise(n=>{if(!e.type||!Wa(e.type)){n("");return}const t=document.createElement("canvas");t.width=nn,t.height=nn,t.style.cssText=`position: fixed; left: 0; top: 0; width: ${nn}px; height: ${nn}px; z-index: 9999; display: none;`,document.body.appendChild(t);const a=t.getContext("2d"),i=new Image;if(i.onload=()=>{const{width:r,height:s}=i;let l=nn,c=nn,u=0,d=0;r>s?(c=s*(nn/r),d=-(c-l)/2):(l=r*(nn/s),u=-(l-c)/2),a.drawImage(i,u,d,l,c);const f=t.toDataURL();document.body.removeChild(t),window.URL.revokeObjectURL(i.src),n(f)},i.crossOrigin="anonymous",e.type.startsWith("image/svg+xml")){const r=new FileReader;r.onload=()=>{r.result&&typeof r.result=="string"&&(i.src=r.result)},r.readAsDataURL(e)}else if(e.type.startsWith("image/gif")){const r=new FileReader;r.onload=()=>{r.result&&n(r.result)},r.readAsDataURL(e)}else i.src=window.URL.createObjectURL(e)})}const Po=o.forwardRef((e,n)=>{let{prefixCls:t,className:a,style:i,locale:r,listType:s,file:l,items:c,progress:u,iconRender:d,actionIconRender:f,itemRender:m,isImgUrl:g,showPreviewIcon:p,showRemoveIcon:v,showDownloadIcon:b,previewIcon:y,removeIcon:x,downloadIcon:S,extra:w,onPreview:h,onDownload:C,onClose:E}=e;var z,k;const{status:R}=l,[A,O]=o.useState(R);o.useEffect(()=>{R!=="removed"&&O(R)},[R]);const[oe,H]=o.useState(!1);o.useEffect(()=>{const q=setTimeout(()=>{H(!0)},300);return()=>{clearTimeout(q)}},[]);const re=d(l);let L=o.createElement("div",{className:`${t}-icon`},re);if(s==="picture"||s==="picture-card"||s==="picture-circle")if(A==="uploading"||!l.thumbUrl&&!l.url){const q=Y(`${t}-list-item-thumbnail`,{[`${t}-list-item-file`]:A!=="uploading"});L=o.createElement("div",{className:q},re)}else{const q=g!=null&&g(l)?o.createElement("img",{src:l.thumbUrl||l.url,alt:l.name,className:`${t}-list-item-image`,crossOrigin:l.crossOrigin}):re,J=Y(`${t}-list-item-thumbnail`,{[`${t}-list-item-file`]:g&&!g(l)});L=o.createElement("a",{className:J,onClick:ve=>h(l,ve),href:l.url||l.thumbUrl,target:"_blank",rel:"noopener noreferrer"},q)}const U=Y(`${t}-list-item`,`${t}-list-item-${A}`),Q=typeof l.linkProps=="string"?JSON.parse(l.linkProps):l.linkProps,ee=(typeof v=="function"?v(l):v)?f((typeof x=="function"?x(l):x)||o.createElement(qa,null),()=>E(l),t,r.removeFile,!0):null,Ce=(typeof b=="function"?b(l):b)&&A==="done"?f((typeof S=="function"?S(l):S)||o.createElement(ao,null),()=>C(l),t,r.downloadFile):null,W=s!=="picture-card"&&s!=="picture-circle"&&o.createElement("span",{key:"download-delete",className:Y(`${t}-list-item-actions`,{picture:s==="picture"})},Ce,ee),se=typeof w=="function"?w(l):w,$=se&&o.createElement("span",{className:`${t}-list-item-extra`},se),G=Y(`${t}-list-item-name`),P=l.url?o.createElement("a",Object.assign({key:"view",target:"_blank",rel:"noopener noreferrer",className:G,title:l.name},Q,{href:l.url,onClick:q=>h(l,q)}),l.name,$):o.createElement("span",{key:"view",className:G,onClick:q=>h(l,q),title:l.name},l.name,$),V=(typeof p=="function"?p(l):p)&&(l.url||l.thumbUrl)?o.createElement("a",{href:l.url||l.thumbUrl,target:"_blank",rel:"noopener noreferrer",onClick:q=>h(l,q),title:r.previewFile},typeof y=="function"?y(l):y||o.createElement(fr,null)):null,pe=(s==="picture-card"||s==="picture-circle")&&A!=="uploading"&&o.createElement("span",{className:`${t}-list-item-actions`},V,A==="done"&&Ce,ee),{getPrefixCls:me}=o.useContext(Ye),De=me(),ae=o.createElement("div",{className:U},L,P,W,pe,oe&&o.createElement(Oa,{motionName:`${De}-fade`,visible:A==="uploading",motionDeadline:2e3},q=>{let{className:J}=q;const ve="percent"in l?o.createElement(mr,Object.assign({},u,{type:"line",percent:l.percent,"aria-label":l["aria-label"],"aria-labelledby":l["aria-labelledby"]})):null;return o.createElement("div",{className:Y(`${t}-list-item-progress`,J)},ve)})),ge=l.response&&typeof l.response=="string"?l.response:((z=l.error)===null||z===void 0?void 0:z.statusText)||((k=l.error)===null||k===void 0?void 0:k.message)||r.uploadError,ye=A==="error"?o.createElement(or,{title:ge,getPopupContainer:q=>q.parentNode},ae):ae;return o.createElement("div",{className:Y(`${t}-list-item-container`,a),style:i,ref:n},m?m(ye,l,c,{download:C.bind(null,l),preview:h.bind(null,l),remove:E.bind(null,l)}):ye)}),Bo=(e,n)=>{const{listType:t="text",previewFile:a=jo,onPreview:i,onDownload:r,onRemove:s,locale:l,iconRender:c,isImageUrl:u=Lo,prefixCls:d,items:f=[],showPreviewIcon:m=!0,showRemoveIcon:g=!0,showDownloadIcon:p=!1,removeIcon:v,previewIcon:b,downloadIcon:y,extra:x,progress:S={size:[-1,2],showInfo:!1},appendAction:w,appendActionVisible:h=!0,itemRender:C,disabled:E}=e,z=ir(),[k,R]=o.useState(!1),A=["picture-card","picture-circle"].includes(t);o.useEffect(()=>{t.startsWith("picture")&&(f||[]).forEach($=>{!($.originFileObj instanceof File||$.originFileObj instanceof Blob)||$.thumbUrl!==void 0||($.thumbUrl="",a==null||a($.originFileObj).then(G=>{$.thumbUrl=G||"",z()}))})},[t,f,a]),o.useEffect(()=>{R(!0)},[]);const O=($,G)=>{if(i)return G.preventDefault(),i($)},oe=$=>{typeof r=="function"?r($):$.url&&window.open($.url)},H=$=>{s==null||s($)},re=$=>{if(c)return c($,t);const G=$.status==="uploading";if(t.startsWith("picture")){const P=t==="picture"?o.createElement(da,null):l.uploading,V=u!=null&&u($)?o.createElement(mo,null):o.createElement(oo,null);return G?P:V}return G?o.createElement(da,null):o.createElement(co,null)},L=($,G,P,V,pe)=>{const me={type:"text",size:"small",title:V,onClick:De=>{var ae,ge;G(),o.isValidElement($)&&((ge=(ae=$.props).onClick)===null||ge===void 0||ge.call(ae,De))},className:`${P}-list-item-action`};return pe&&(me.disabled=E),o.isValidElement($)?o.createElement(Mn,Object.assign({},me,{icon:bt($,Object.assign(Object.assign({},$.props),{onClick:()=>{}}))})):o.createElement(Mn,Object.assign({},me),o.createElement("span",null,$))};o.useImperativeHandle(n,()=>({handlePreview:O,handleDownload:oe}));const{getPrefixCls:U}=o.useContext(Ye),Q=U("upload",d),ee=U(),Ce=Y(`${Q}-list`,`${Q}-list-${t}`),W=o.useMemo(()=>sr(cr(ee),["onAppearEnd","onEnterEnd","onLeaveEnd"]),[ee]),se=Object.assign(Object.assign({},A?{}:W),{motionDeadline:2e3,motionName:`${Q}-${A?"animate-inline":"animate"}`,keys:qe(f.map($=>({key:$.uid,file:$}))),motionAppear:k});return o.createElement("div",{className:Ce},o.createElement(Xi,Object.assign({},se,{component:!1}),$=>{let{key:G,file:P,className:V,style:pe}=$;return o.createElement(Po,{key:G,locale:l,prefixCls:Q,className:V,style:pe,file:P,items:f,progress:S,listType:t,isImgUrl:u,showPreviewIcon:m,showRemoveIcon:g,showDownloadIcon:p,removeIcon:v,previewIcon:b,downloadIcon:y,extra:x,iconRender:re,actionIconRender:L,itemRender:C,onPreview:O,onDownload:oe,onClose:H})}),w&&o.createElement(Oa,Object.assign({},se,{visible:h,forceRender:!0}),$=>{let{className:G,style:P}=$;return bt(w,V=>({className:Y(V.className,G),style:Object.assign(Object.assign(Object.assign({},P),{pointerEvents:G?"none":void 0}),V.style)}))}))},Ao=o.forwardRef(Bo);var Uo=function(e,n,t,a){function i(r){return r instanceof t?r:new t(function(s){s(r)})}return new(t||(t=Promise))(function(r,s){function l(d){try{u(a.next(d))}catch(f){s(f)}}function c(d){try{u(a.throw(d))}catch(f){s(f)}}function u(d){d.done?r(d.value):i(d.value).then(l,c)}u((a=a.apply(e,[])).next())})};const In=`__LIST_IGNORE_${Date.now()}__`,To=(e,n)=>{const{fileList:t,defaultFileList:a,onRemove:i,showUploadList:r=!0,listType:s="text",onPreview:l,onDownload:c,onChange:u,onDrop:d,previewFile:f,disabled:m,locale:g,iconRender:p,isImageUrl:v,progress:b,prefixCls:y,className:x,type:S="select",children:w,style:h,itemRender:C,maxCount:E,data:z={},multiple:k=!1,hasControlInside:R=!0,action:A="",accept:O="",supportServerRender:oe=!0,rootClassName:H}=e,re=o.useContext(Zi),L=m??re,[U,Q]=ur(a||[],{value:t,postState:N=>N??[]}),[ee,Ce]=o.useState("drop"),W=o.useRef(null),se=o.useRef(null);o.useMemo(()=>{const N=Date.now();(t||[]).forEach((j,ne)=>{!j.uid&&!Object.isFrozen(j)&&(j.uid=`__AUTO__${N}_${ne}__`)})},[t]);const $=(N,j,ne)=>{let D=qe(j),Z=!1;E===1?D=D.slice(-1):E&&(Z=D.length>E,D=D.slice(0,E)),ca.flushSync(()=>{Q(D)});const ue={file:N,fileList:D};ne&&(ue.event=ne),(!Z||N.status==="removed"||D.some(Oe=>Oe.uid===N.uid))&&ca.flushSync(()=>{u==null||u(ue)})},G=(N,j)=>Uo(void 0,void 0,void 0,function*(){const{beforeUpload:ne,transformFile:D}=e;let Z=N;if(ne){const ue=yield ne(N,j);if(ue===!1)return!1;if(delete N[In],ue===In)return Object.defineProperty(N,In,{value:!0,configurable:!0}),!1;typeof ue=="object"&&ue&&(Z=ue)}return D&&(Z=yield D(Z)),Z}),P=N=>{const j=N.filter(Z=>!Z.file[In]);if(!j.length)return;const ne=j.map(Z=>Tn(Z.file));let D=qe(U);ne.forEach(Z=>{D=_n(Z,D)}),ne.forEach((Z,ue)=>{let Oe=Z;if(j[ue].parsedFile)Z.status="uploading";else{const{originFileObj:Le}=Z;let de;try{de=new File([Le],Le.name,{type:Le.type})}catch{de=new Blob([Le],{type:Le.type}),de.name=Le.name,de.lastModifiedDate=new Date,de.lastModified=new Date().getTime()}de.uid=Z.uid,Oe=de}$(Oe,D)})},V=(N,j,ne)=>{try{typeof N=="string"&&(N=JSON.parse(N))}catch{}if(!gt(j,U))return;const D=Tn(j);D.status="done",D.percent=100,D.response=N,D.xhr=ne;const Z=_n(D,U);$(D,Z)},pe=(N,j)=>{if(!gt(j,U))return;const ne=Tn(j);ne.status="uploading",ne.percent=N.percent;const D=_n(ne,U);$(ne,D,N)},me=(N,j,ne)=>{if(!gt(ne,U))return;const D=Tn(ne);D.error=N,D.response=j,D.status="error";const Z=_n(D,U);$(D,Z)},De=N=>{let j;Promise.resolve(typeof i=="function"?i(N):i).then(ne=>{var D;if(ne===!1)return;const Z=Ro(N,U);Z&&(j=Object.assign(Object.assign({},N),{status:"removed"}),U==null||U.forEach(ue=>{const Oe=j.uid!==void 0?"uid":"name";ue[Oe]===j[Oe]&&!Object.isFrozen(ue)&&(ue.status="removed")}),(D=W.current)===null||D===void 0||D.abort(j),$(j,Z))})},ae=N=>{Ce(N.type),N.type==="drop"&&(d==null||d(N))};o.useImperativeHandle(n,()=>({onBatchStart:P,onSuccess:V,onProgress:pe,onError:me,fileList:U,upload:W.current,nativeElement:se.current}));const{getPrefixCls:ge,direction:ye,upload:q}=o.useContext(Ye),J=ge("upload",y),ve=Object.assign(Object.assign({onBatchStart:P,onError:me,onProgress:pe,onSuccess:V},e),{data:z,multiple:k,action:A,accept:O,supportServerRender:oe,prefixCls:J,disabled:L,beforeUpload:G,onChange:void 0,hasControlInside:R});delete ve.className,delete ve.style,(!w||L)&&delete ve.id;const ce=`${J}-wrapper`,[Te,Re,_e]=Do(J,ce),[Se]=pr("Upload",Ki.Upload),{showRemoveIcon:X,showPreviewIcon:le,showDownloadIcon:fe,removeIcon:ke,previewIcon:Ge,downloadIcon:rn,extra:on}=typeof r=="boolean"?{}:r,fn=typeof X>"u"?!L:X,Xe=(N,j)=>r?o.createElement(Ao,{prefixCls:J,listType:s,items:U,previewFile:f,onPreview:l,onDownload:c,onRemove:De,showRemoveIcon:fn,showPreviewIcon:le,showDownloadIcon:fe,removeIcon:ke,previewIcon:Ge,downloadIcon:rn,iconRender:p,extra:on,locale:Object.assign(Object.assign({},Se),g),isImageUrl:v,progress:b,appendAction:N,appendActionVisible:j,itemRender:C,disabled:L}):N,ln=Y(ce,x,H,Re,_e,q==null?void 0:q.className,{[`${J}-rtl`]:ye==="rtl",[`${J}-picture-card-wrapper`]:s==="picture-card",[`${J}-picture-circle-wrapper`]:s==="picture-circle"}),mn=Object.assign(Object.assign({},q==null?void 0:q.style),h);if(S==="drag"){const N=Y(Re,J,`${J}-drag`,{[`${J}-drag-uploading`]:U.some(j=>j.status==="uploading"),[`${J}-drag-hover`]:ee==="dragover",[`${J}-disabled`]:L,[`${J}-rtl`]:ye==="rtl"});return Te(o.createElement("span",{className:ln,ref:se},o.createElement("div",{className:N,style:mn,onDrop:ae,onDragOver:ae,onDragLeave:ae},o.createElement(yt,Object.assign({},ve,{ref:W,className:`${J}-btn`}),o.createElement("div",{className:`${J}-drag-container`},w))),Xe()))}const En=Y(J,`${J}-select`,{[`${J}-disabled`]:L}),sn=o.createElement("div",{className:En,style:w?void 0:{display:"none"}},o.createElement(yt,Object.assign({},ve,{ref:W})));return Te(s==="picture-card"||s==="picture-circle"?o.createElement("span",{className:ln,ref:se},Xe(sn,!!w)):o.createElement("span",{className:ln,ref:se},sn,Xe()))},Ga=o.forwardRef(To);var _o=function(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(e);i<a.length;i++)n.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(t[a[i]]=e[a[i]]);return t};const Ho=o.forwardRef((e,n)=>{var{style:t,height:a,hasControlInside:i=!1}=e,r=_o(e,["style","height","hasControlInside"]);return o.createElement(Ga,Object.assign({ref:n,hasControlInside:i},r,{type:"drag",style:Object.assign(Object.assign({},t),{height:a})}))}),Dt=Ga;Dt.Dragger=Ho;Dt.LIST_IGNORE=In;function ie(e){if(!e||typeof window>"u")return;const n=document.createElement("style");return n.setAttribute("type","text/css"),n.innerHTML=e,document.head.appendChild(n),e}var I=function(){return I=Object.assign||function(n){for(var t,a=1,i=arguments.length;a<i;a++){t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},I.apply(this,arguments)};function Rt(e,n){var t={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&n.indexOf(a)<0&&(t[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(e);i<a.length;i++)n.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(t[a[i]]=e[a[i]]);return t}function hn(e,n,t,a){function i(r){return r instanceof t?r:new t(function(s){s(r)})}return new(t||(t=Promise))(function(r,s){function l(d){try{u(a.next(d))}catch(f){s(f)}}function c(d){try{u(a.throw(d))}catch(f){s(f)}}function u(d){d.done?r(d.value):i(d.value).then(l,c)}u((a=a.apply(e,[])).next())})}function bn(e,n){var t={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},a,i,r,s;return s={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function l(u){return function(d){return c([u,d])}}function c(u){if(a)throw new TypeError("Generator is already executing.");for(;s&&(s=0,u[0]&&(t=0)),t;)try{if(a=1,i&&(r=u[0]&2?i.return:u[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,u[1])).done)return r;switch(i=0,r&&(u=[u[0]&2,r.value]),u[0]){case 0:case 1:r=u;break;case 4:return t.label++,{value:u[1],done:!1};case 5:t.label++,i=u[1],u=[0];continue;case 7:u=t.ops.pop(),t.trys.pop();continue;default:if(r=t.trys,!(r=r.length>0&&r[r.length-1])&&(u[0]===6||u[0]===2)){t=0;continue}if(u[0]===3&&(!r||u[1]>r[0]&&u[1]<r[3])){t.label=u[1];break}if(u[0]===6&&t.label<r[1]){t.label=r[1],r=u;break}if(r&&t.label<r[2]){t.label=r[2],t.ops.push(u);break}r[2]&&t.ops.pop(),t.trys.pop();continue}u=n.call(e,t)}catch(d){u=[6,d],i=0}finally{a=r=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}function an(e,n,t){if(t||arguments.length===2)for(var a=0,i=n.length,r;a<i;a++)(r||!(a in n))&&(r||(r=Array.prototype.slice.call(n,0,a)),r[a]=n[a]);return e.concat(r||Array.prototype.slice.call(n))}var We=function(e){var n="";if(e)return e<1024?n=e+" Bytes":e<1024*1024?n=(e/1024).toFixed(2)+" KB":e<1024*1024*1024?n=(e/1024/1024).toFixed(2)+" MB":e<1024*1024*1024*1024?n=(e/1024/1024/1024).toFixed(2)+" GB":n=(e/1024/1024/1024/1024).toFixed(2)+" TB",n},Vo={defaultLabel:"Trascina qui i tuoi file",uploadingMessage:function(e){return"Caricamento di ".concat(e," file")},uploadFinished:function(e,n){return"File caricati: ".concat(e,", File rifiutati: ").concat(n)},noFilesMessage:"Nessun file valido in attesa di essere caricato",footer:{acceptAll:"Tutti i tipi di file sono accettati",acceptCustom:function(e){return"Tipi di file consentiti: ".concat(e)}},header:{uploadFilesMessage:"Caricamento",maxSizeMessage:function(e){return"Dimensione massima ".concat(e)},validFilesMessage:function(e,n){return"File  ".concat(e,"/").concat(n)}},fakeuploadsuccess:"Il file è stato caricato con successo ",fakeUploadError:"Errore di caricamento del file"},qo={fullInfoLayer:{name:"Nome: ",size:"Dimensione: ",type:"Tipo: "},status:{preparing:"preparazione",uploading:"In corso",success:"Successo",valid:"Valido",denied:"Non válido",error:"Errore",aborted:"Interrotto"}},Wo={maxSizeError:function(e){return"Il file è molto grande. Il tam. il massimo è ".concat(We(e))},acceptError:"Tipo di file illegale",maxFileCount:function(e){return"Numero massimo di file (".concat(e,") raggiunto")}},Go={defaultLabel:"Déposez vos fichiers ici",uploadingMessage:function(e){return"Envoi de ".concat(e," fichiers")},uploadFinished:function(e,n){return"Fichiers téléchargés : ".concat(e,", Fichiers rejetés: ").concat(n)},noFilesMessage:"Aucun fichier valide ne manque",footer:{acceptAll:"Tous types de fichiers acceptés ",acceptCustom:function(e){return"Types de fichier: ".concat(e)}},header:{uploadFilesMessage:"Envoyer",maxSizeMessage:function(e){return"Taille maximale ".concat(e)},validFilesMessage:function(e,n){return"Fichiers  ".concat(e,"/").concat(n)}},fakeuploadsuccess:"Le fichier a été téléchargé avec succès",fakeUploadError:"Erreur lors du téléchargement "},Xo={fullInfoLayer:{name:"Le nom: ",size:"Le taille: ",type:"Le type: "},status:{preparing:"préparer",uploading:"En cours",success:"Succès",valid:"Valide",denied:"Refusé",error:"Erreur",aborted:"Interrompu"}},Zo={maxSizeError:function(e){return"Le fichier est très volumineux. Le tam. le maximum est de ".concat(We(e))},acceptError:"Type de fichier illégal ",maxFileCount:function(e){return"Limite de fichiers atteinte (".concat(e,")")}},Ko={defaultLabel:"Drop your files here",uploadingMessage:function(e){return"Uploading ".concat(e," files")},uploadFinished:function(e,n){return"Uploaded files: ".concat(e,", Rejected files: ").concat(n)},noFilesMessage:"There is no missing valid file to upload",footer:{acceptAll:"All file types accepted",acceptCustom:function(e){return"Allowed types: ".concat(e)}},header:{uploadFilesMessage:"Upload files",maxSizeMessage:function(e){return"Max file size: ".concat(e)},validFilesMessage:function(e,n){return"Files ".concat(e,"/").concat(n)}},fakeuploadsuccess:"File was successfuly uploaded",fakeUploadError:"Error on uploading. Please try again later."},Jo={fullInfoLayer:{name:"Name: ",size:"Size: ",type:"Type: "},status:{preparing:"Preparing",uploading:"Uploading",success:"Success",valid:"Valid",denied:"Not valid",error:"Error",aborted:"Aborted"}},Yo={maxSizeError:function(e){return"File is too big. Max file size allowed is ".concat(We(e))},acceptError:"File type is not allowed",maxFileCount:function(e){return"Max amount of files (".concat(e,") has been reached")}},Qo={defaultLabel:"Suelta tus archivos aquí",uploadingMessage:function(e){return"Subiendo ".concat(e," archivos")},uploadFinished:function(e,n){return"Archivos subidos: ".concat(e,", Archivos rechazados: ").concat(n)},noFilesMessage:"No hay archivos válidos pendientes por subir",footer:{acceptAll:"Todos los tipos de archivo aceptados",acceptCustom:function(e){return"Tipo(s) de archivo permitidos: ".concat(e)}},header:{uploadFilesMessage:"Subir",maxSizeMessage:function(e){return"Tam. máximo ".concat(e)},validFilesMessage:function(e,n){return"Archivos ".concat(e,"/").concat(n)}},fakeuploadsuccess:"El archivo se subió correctamente",fakeUploadError:"Error al subir el archivo"},el={fullInfoLayer:{name:"Nombre: ",size:"Tamaño: ",type:"Tipo: "},status:{preparing:"Preparando",uploading:"Subiendo",success:"Éxito",valid:"Válido",denied:"No válido",error:"Error",aborted:"Anulado"}},nl={maxSizeError:function(e){return"El archivo es muy grande. El tam. máximo es ".concat(We(e))},acceptError:"Tipo de archivo no permitido",maxFileCount:function(e){return"Cantidad máxima de archivos (".concat(e,") alcanzada")}},tl={defaultLabel:"Перетащите сюда свои файлы.",uploadingMessage:function(e){return"Выгрузка ".concat(e," файлов")},uploadFinished:function(e,n){return"Загружено файлов: ".concat(e,", отклоненных файлов: ").concat(n)},noFilesMessage:"Действительный файл не отсутствует для загрузки",footer:{acceptAll:"Принимаются все типы файлов ",acceptCustom:function(e){return"Допустимые типы: ".concat(e)}},header:{uploadFilesMessage:"Отправить",maxSizeMessage:function(e){return"макс размер: ".concat(e)},validFilesMessage:function(e,n){return"Файлы ".concat(e,"/").concat(n)}},fakeuploadsuccess:"Файл был успешно загружен",fakeUploadError:"Ошибка при загрузке"},al={fullInfoLayer:{name:"Имя: ",size:"Размер: ",type:"Tип: "},status:{preparing:"подготовка",uploading:"Загрузка",success:"успех",valid:"годный",denied:"выкинутый",error:"ошибка",aborted:"прерванный"}},il={maxSizeError:function(e){return"Файл слишком большой. Максимально допустимый размер файла - ".concat(We(e))},acceptError:"Тип файла не разрешен",maxFileCount:function(e){return"Достигнуто максимальное количество файлов (".concat(e,")")}},rl={defaultLabel:"Solte seus arquivos aqui ",uploadingMessage:function(e){return"Enviando ".concat(e," arquivos")},uploadFinished:function(e,n){return"Arquivos enviados: ".concat(e,", Arquivos rejeitados: ").concat(n)},noFilesMessage:"Nenhum arquivo válido está faltando para enviar",footer:{acceptAll:"Todos os tipos de arquivo são aceitos",acceptCustom:function(e){return"Tipos permitidos: ".concat(e)}},header:{uploadFilesMessage:"Enviar",maxSizeMessage:function(e){return"Tamanho máximo: ".concat(e)},validFilesMessage:function(e,n){return"Arquivos ".concat(e,"/").concat(n)}},fakeuploadsuccess:"O arquivo foi enviado com sucesso",fakeUploadError:"Erro ao enviar"},ol={fullInfoLayer:{name:"Nome: ",size:"Tamanho: ",type:"Tipo: "},status:{preparing:"Preparando",uploading:"Enviando",success:"Êxito",valid:"válido",denied:"Negado",error:"Erro",aborted:"Abortado"}},ll={maxSizeError:function(e){return"O arquivo é muito grande. O tamanho máximo de arquivo permitido é ".concat(We(e))},acceptError:"O tipo de arquivo não é permitido ",maxFileCount:function(e){return"Quantidade máxima de arquivos (".concat(e,") alcançada")}},sl={defaultLabel:"将您的文件放在这里",uploadingMessage:function(e){return"上传 ".concat(e," 个文件")},uploadFinished:function(e,n){return"上传文件：".concat(e,"，拒绝文件：").concat(n)},noFilesMessage:"没有缺少要加载的有效文件",footer:{acceptAll:"接受所有文件类型",acceptCustom:function(e){return"允许的类型: ".concat(e)}},header:{uploadFilesMessage:"上传文件",maxSizeMessage:function(e){return"最大文件大小：".concat(e)},validFilesMessage:function(e,n){return"文档 ".concat(e,"/").concat(n)}},fakeuploadsuccess:"文件已成功上传",fakeUploadError:"上传时出错"},cl={fullInfoLayer:{name:"文档名称: ",size:"尺寸: ",type:"文件类型: "},status:{preparing:"预加载",uploading:"上传",success:"成功",valid:"接受的文件",denied:"被拒绝的文件",error:"错误",aborted:"中止"}},ul={maxSizeError:function(e){return"文件太大。 允许的最大文件大小为 ".concat(We(e))},acceptError:"文件类型不允许",maxFileCount:function(e){return"已达到最大文件数 (".concat(e,")")}},dl={defaultLabel:"把你的文件放在這裡 ",uploadingMessage:function(e){return"上傳".concat(e,"個文件")},uploadFinished:function(e,n){return"上傳文件: ".concat(e,", 拒絕的文件：").concat(n)},noFilesMessage:"沒有缺少要上傳的有效文件",footer:{acceptAll:"接受所有文件類型",acceptCustom:function(e){return"允許的類型：".concat(e)}},header:{uploadFilesMessage:"上傳文件",maxSizeMessage:function(e){return"最大文件大小：".concat(e)},validFilesMessage:function(e,n){return" 文件 ".concat(e,"/").concat(n)}},fakeuploadsuccess:"文件已成功上傳",fakeUploadError:"上傳時出錯"},fl={fullInfoLayer:{name:"文檔名稱: ",size:"文件大小: ",type:"文件類型: "},status:{preparing:"預加載",uploading:"上傳",success:"成功",valid:"有效文件",denied:"無效文件",error:"錯誤",aborted:"中止"}},ml={maxSizeError:function(e){return"文件太大。 允許的最大文件大小為 ".concat(We(e))},acceptError:"文件類型不允許",maxFileCount:function(e){return"已達到最大文件數 (".concat(e,")")}},Ze={"ES-es":el,"EN-en":Jo,"FR-fr":Xo,"IT-it":qo,"PT-pt":ol,"RU-ru":al,"ZH-cn":cl,"ZH-hk":fl},dn=function(e){switch(e){case"ES-es":return Ze["ES-es"];case"EN-en":return Ze["EN-en"];case"FR-fr":return Ze["FR-fr"];case"IT-it":return Ze["IT-it"];case"PT-pt":return Ze["PT-pt"];case"RU-ru":return Ze["RU-ru"];case"ZH-cn":return Ze["ZH-cn"];case"ZH-hk":return Ze["ZH-hk"];default:return Ze["EN-en"]}},Ke={"ES-es":Qo,"EN-en":Ko,"FR-fr":Go,"IT-it":Vo,"PT-pt":rl,"RU-ru":tl,"ZH-cn":sl,"ZH-hk":dl},Rn=function(e){switch(e){case"ES-es":return Ke["ES-es"];case"EN-en":return Ke["EN-en"];case"FR-fr":return Ke["FR-fr"];case"IT-it":return Ke["IT-it"];case"PT-pt":return Ke["PT-pt"];case"RU-ru":return Ke["RU-ru"];case"ZH-cn":return Ke["ZH-cn"];case"ZH-hk":return Ke["ZH-hk"];default:return Ke["EN-en"]}},ha={"ES-es":nl,"EN-en":Yo,"FR-fr":Zo,"IT-it":Wo,"PT-pt":ll,"RU-ru":il,"ZH-cn":ul,"ZH-hk":ml},pl=function(e){return!e||!["ES-es","EN-en","FR-fr","IT-it","PT-pt","RU-ru","ZH-cn","ZH-hk"].includes(e)?ha["EN-en"]:ha[e]},Xa=function(e,n,t){return new Promise(function(a,i){try{var r=new FileReader;r.onprogress=function(){n==null||n()},r.onerror=function(){t==null||t()},r.onload=function(){a(r.result)},r.readAsDataURL(e)}catch{i(void 0)}})};function gl(e){return new Promise(function(n,t){if(!e||e.length===0){t("landscape");return}try{var a=new Image;a.src=e,a.onerror=function(i){t("landscape")},a.onload=function(){var i=a.width,r=a.height;i>r?n("landscape"):n("portrait")}}catch{t("landscape")}})}var vl="https://user-images.githubusercontent.com/43678736/132086517-72a51a12-e403-4675-bfd7-22c23affa730.png",hl="https://user-images.githubusercontent.com/43678736/132086518-7026d4f1-ea16-4ed0-89fd-37c1aa8ac3ed.png",bl="https://user-images.githubusercontent.com/43678736/132086519-863c63b4-917e-4471-94ff-7e15651cc14b.png",xl="https://user-images.githubusercontent.com/43678736/132086520-9bc6aa3b-51c9-4da2-9ef7-349162b86d0b.png",yl="https://user-images.githubusercontent.com/43678736/132086521-dbd6cf0d-d4d7-4b92-bb26-17e8a51a9383.png",wl="https://user-images.githubusercontent.com/43678736/132086522-070f48e8-78a8-4294-8dbb-aab81525e164.png",El="https://user-images.githubusercontent.com/43678736/132086595-90ab7f90-f87e-4900-94d9-d0b26745df48.png",Cl="https://user-images.githubusercontent.com/43678736/132086597-e285ad5c-613a-4679-a270-493e5be4ffd9.png",Sl="https://user-images.githubusercontent.com/43678736/132086598-623c410a-084a-4395-a448-211b2ff61cfe.png",Fl="https://user-images.githubusercontent.com/43678736/132086600-8b70a007-512d-4252-9c66-eabd3ddd6573.png",zl="https://user-images.githubusercontent.com/43678736/132086601-e62e5d1a-d8a2-4475-a14f-85922cec9272.png",kl="https://user-images.githubusercontent.com/43678736/132086602-4c772934-f608-4f01-8459-c4622cee8ad5.png",$l="https://user-images.githubusercontent.com/43678736/132086604-b5b019fe-572e-477e-92c2-3769a48a1304.png",Nl="https://user-images.githubusercontent.com/43678736/132086606-715ccb66-4702-4f7d-9b09-ac93ba17b643.png",Il="https://user-images.githubusercontent.com/43678736/132086608-bcae9d57-8e54-488c-90c4-4952ae530b5e.png",Ml="https://user-images.githubusercontent.com/43678736/132086618-397d6bd2-9fda-43ed-a135-cb40388c35af.png",Dl="https://user-images.githubusercontent.com/43678736/132086620-2586ba40-c583-4589-b1a4-8bb5b258b44d.png",Rl="https://user-images.githubusercontent.com/43678736/132086621-3b95fb64-2533-4ccc-abcd-bd2beba572e9.png",Ol="https://user-images.githubusercontent.com/43678736/132086622-af705a0c-2b25-4ba7-8ab6-bd69ec97f7e2.png",Ll="https://user-images.githubusercontent.com/43678736/132086624-89141a46-64e4-4fa0-bf69-54a0eb4d48c9.png",ba="https://user-images.githubusercontent.com/43678736/132086625-1b8f2652-1de0-4475-8c12-7da4a9973ffb.png",jl="https://user-images.githubusercontent.com/43678736/132086626-38699705-1e6f-4bca-984b-03167b236faa.png",Pl="https://user-images.githubusercontent.com/43678736/132086650-f1166246-b361-4c30-a04e-9781c555d14a.png",Bl="https://user-images.githubusercontent.com/43678736/132086650-f1166246-b361-4c30-a04e-9781c555d14a.png",Al="https://user-images.githubusercontent.com/43678736/132086652-4562942e-aaea-466c-968f-380fffabf3f9.png",Ul="https://user-images.githubusercontent.com/43678736/132086653-0487e7e2-1ee3-49e2-8cfe-3e20f1f7490a.png",Tl="https://user-images.githubusercontent.com/43678736/132086656-6e96c815-e4e2-4ffd-9d71-57e9cc2450bc.png",_l="https://user-images.githubusercontent.com/43678736/132086658-5d27d3c2-394f-43fb-b512-9b414a257875.png",Hl="https://user-images.githubusercontent.com/43678736/132086659-98f3ef6e-b9f3-4b6d-b18f-469b5334ba27.png",Vl="https://user-images.githubusercontent.com/43678736/132086661-a5484553-06c7-4ffa-a8f9-96b57b1b0344.png",ql="https://user-images.githubusercontent.com/43678736/132086662-05ad1597-d5e5-4efa-833e-2876e966a745.png",Wl="https://user-images.githubusercontent.com/43678736/132086663-90c58955-f7fb-4bdb-ac53-92667d16d4a3.png",Gl="https://user-images.githubusercontent.com/43678736/132086664-9a7530e7-6d78-4ef3-a176-20cf7f57b555.png",vt="https://user-images.githubusercontent.com/43678736/132086666-ab3c505d-b2c0-4177-9a06-aed5d9c39ee4.png",Xl="https://user-images.githubusercontent.com/43678736/132086667-6c7dcbcc-8d83-41a2-8e0a-85b09e2791ae.png",Zl="https://user-images.githubusercontent.com/43678736/132086668-9f246e91-cf2e-49cf-9617-e1fbb71abbbb.png",Kl="https://user-images.githubusercontent.com/43678736/132086669-46113762-84d1-4b32-9441-b0138ce17a5d.png",Jl="https://user-images.githubusercontent.com/43678736/145835364-2054509d-3448-4d34-921f-73dd6e297fc7.png",Yl="https://user-images.githubusercontent.com/43678736/145835367-19172bf8-cd5a-4cbe-b512-d0de1d91f269.png",Ql="https://user-images.githubusercontent.com/43678736/145835373-a57ef0f5-3968-483b-9f55-6d67e7f1dcea.png",es="https://user-images.githubusercontent.com/43678736/132086670-0f96e770-cedc-4635-a5f9-cf97894c1d7a.png",ns="https://user-images.githubusercontent.com/43678736/132086671-02ad35ef-ec3a-4a65-abd5-5bf794dfcf7b.png",ts="https://user-images.githubusercontent.com/43678736/132086672-3a856fda-823d-4997-b802-c7c640e6ef44.png",as="https://user-images.githubusercontent.com/43678736/132086673-0c4409ab-754e-4619-8cfa-179d0ccf1bd9.png",is="https://user-images.githubusercontent.com/43678736/132086674-fdb56d02-5845-49b7-8462-6357bc963464.png",rs="https://user-images.githubusercontent.com/43678736/132086675-c879645d-acb4-41a6-ab3c-4e6c2048badb.png",os="https://user-images.githubusercontent.com/43678736/132086685-4e327c4c-a409-4b83-b36a-8d88936b314b.png",ls="https://user-images.githubusercontent.com/43678736/132086688-8e82fae4-3a9b-49c0-bf99-77189525514c.png",ss="https://user-images.githubusercontent.com/43678736/132086689-fe1fef9f-d2db-455b-8f4b-09acd095f571.png",cs="https://user-images.githubusercontent.com/43678736/132086689-fe1fef9f-d2db-455b-8f4b-09acd095f571.png",us="https://user-images.githubusercontent.com/43678736/132086691-d472576b-ec6a-4332-acd2-dd6a00b72952.png",ds="https://user-images.githubusercontent.com/43678736/132086693-9d43571e-0c86-438f-b247-e2cb42e19e06.png",fs="https://user-images.githubusercontent.com/43678736/132086694-4e661d6a-1118-441e-8bc3-c52fcb2133b6.png",ms="https://user-images.githubusercontent.com/43678736/132086697-1d82d724-35b6-4f06-847a-3c59a5deda6e.png",ps="https://user-images.githubusercontent.com/43678736/132086698-19384230-dbd7-4e05-bc69-ef4537b6aae3.png",gs="https://user-images.githubusercontent.com/43678736/132086699-5993a482-04f4-4915-b105-9037f527cf61.png",vs="https://user-images.githubusercontent.com/43678736/132086700-c23461c8-6819-46e1-aecd-0a1f8d3507bb.png",hs="https://user-images.githubusercontent.com/43678736/132086701-c8044c09-8d95-4af1-9410-66761001d7da.png",bs="https://user-images.githubusercontent.com/43678736/132086702-59294337-ed99-4302-badd-316b2c1ff62f.png",xs="https://user-images.githubusercontent.com/43678736/132086704-8fd51e7c-afa2-47a3-ab2f-d0bcd0ecae9f.png",ys="https://user-images.githubusercontent.com/43678736/132086705-33294da1-5c0f-49f7-b890-e4857cec0a6d.png",ws="https://user-images.githubusercontent.com/43678736/132086706-22f805d0-39d4-494b-824e-47dc75d05eb7.png",Es="https://user-images.githubusercontent.com/43678736/132086707-e61a84de-d396-4dbf-8d1b-1d6ee19e1ac8.png",Cs="https://user-images.githubusercontent.com/43678736/132086707-e61a84de-d396-4dbf-8d1b-1d6ee19e1ac8.png",Ss="https://user-images.githubusercontent.com/43678736/132086708-21d096dd-7148-40aa-97f1-cbb099339740.png",Fs="https://user-images.githubusercontent.com/43678736/132086709-811d4e90-3cfa-4044-a956-aeda9c67fc92.png",zs="https://user-images.githubusercontent.com/43678736/132086710-c5479c6c-0249-4542-adad-48b0ef40b775.png",ks="https://user-images.githubusercontent.com/43678736/132086711-1524a3e7-3e33-4822-a34f-ff3235404045.png",$s="https://user-images.githubusercontent.com/43678736/132086712-17e2c491-f6e4-4586-aef6-06bcc5f4b0e5.png",Ns="https://user-images.githubusercontent.com/43678736/132086715-204b5a8b-9c5a-4bac-8294-9237ebc16089.png",Is="https://user-images.githubusercontent.com/43678736/132086716-64511d20-58cb-45a8-85df-f4d9408b469d.png",Ms="https://user-images.githubusercontent.com/43678736/132086718-a8499333-6282-4820-aa1f-4d133eb54648.png",Ot=function(e){var n=/(?:\.([^.]+))?$/,t=n.exec(e);return t?t[1]:""},Me="octet",Ds=function(e){switch(e){case"aac":return"aac";case"midi":return"midi";case"x-midi":return"midi";case"mpeg":return"mpeg";case"ogg":return"oga";case"opus":return"opus";case"wav":return"wav";case"webm":return"webm";case"wma":return"wma";default:return Me}},Rs=function(e){switch(e){case"css":return"css";case"csv":return"csv";case"html":return"html";case"calendar":return"icalendar";case"javascript":return"javascript";case"x-javascript":return"javascript";case"plain":return"text";case"xml":return"xml";default:return Me}},Os=function(e){switch(e){case"bmp":return"bmp";case"gif":return"gif";case"jpg":return"jpeg";case"jpeg":return"jpeg";case"png":return"png";case"tiff":return"tiff";case"webp":return"webp";default:return Me}},Ls=function(e){switch(e){case"otf":return"otf";case"ttf":return"ttf";case"woff":return"woff";case"woff2":return"woff";default:return Me}},js=function(e){switch(e){case"x-msvideo":return"avi";case"msvideo":return"avi";case"avi":return"avi";case"mp4":return"mp4";case"mpeg":return"mpeg";case"ogg":return"ogv";case"mp2t":return"mp2t";case"wmv":return"wmv";case"webm":return"webm";default:return Me}},Ps=function(e){switch(e){case"x-abiword":return"abw";case"abiword":return"abw";case"x-freearc":return"arc";case"freearc":return"arc";case"vnd.amazon.ebook":return"azw";case"octet-stream":return"octet";case"x-bzip":return"bz";case"x-bzip2":return"bz2";case"bzip":return"bz";case"bzip2":return"bz2";case"x-cdf":return"cda";case"msaccess":return"accdb";case"csh":return"csh";case"x-csh":return"csh";case"vnd.ms-fontobject":return"eot";case"epub+zip":return"epub";case"gzip":return"gzip";case"java-archive":return"jar";case"x-javascript":return"javascript";case"json":return"json";case"ld+json":return"jsonld";case"vnd.apple.installer+xml":return"mpkg";case"ogg":return"ogx";case"vnd.rar":return"rar";case"rtf":return"rtf";case"x-sh":return"sh";case"sh":return"sh";case"x-shockwave-flash":return"swf";case"x-tar":return"tar";case"x-httpd-php":return"php";case"vnd.visio":return"vsd";case"xhtml+xml":return"xhtml";case"xml":return"xml";case"vnd.mozilla.xul+xml":return"xul";case"vnd.openxmlformats-officedocument.wordprocessingml.document":return"docx";case"msword":return"docx";case"vnd.openxmlformats-officedocument.spreadsheetml.sheet":return"xlsx";case"vnd.openxmlformats-officedocument.presentationml.presentation":return"pptx";case"vnd.ms-powerpoint":return"pptx";case"vnd.oasis.opendocument.presentation":return"odp";case"vnd.oasis.opendocument.text":return"odt";case"vnd.oasis.opendocument.spreadsheet":return"ods";case"zip":return"zip";case"x-zip-compressed":return"zip";case"pdf":return"pdf";default:return Me}},Za=function(e){if(!e||!e.includes("/"))return Me;var n=e.split("/")[0],t=e.split("/")[1];switch(n){case"application":return Ps(t);case"audio":return Ds(t);case"video":return js(t);case"text":return Rs(t);case"image":return Os(t);case"font":return Ls(t);default:return Me}},Ka=function(e){var n="octet";return e&&e!==""&&(e.includes("zip")||e.includes("rar")?n="zip":e.includes("doc")?n="docx":e.includes("xls")?n="xlsx":e.includes("drawio")?n="drawio":e.includes("psd")?n="psd":e.includes("csv")?n="csv":e==="jsx"?n="react":e==="py"?n="python":e==="vue"?n="vue":e==="java"?n="java":e==="ts"?n="typescript":(e==="sass"||e==="scss")&&(n="sass")),n},Ja=function(e){var n="text";return e&&e!==""&&(e==="jsx"?n="react":e==="py"?n="python":e==="vue"?n="vue":e==="java"?n="java":e==="ts"||e==="tsx"?n="typescript":e==="js"?n="javascript":e==="xml"?n="xml":e==="php"&&(n="php")),n},Bs=function(e,n){var t="fallBack";if(e)t=Za(e.type);else return t=Me,n!=null&&n.fallBack?{url:n==null?void 0:n.fallBack,mimeResume:t}:{url:qn[t],mimeResume:t};var a=Ot(e.name);t==="text"&&(t=Ja(a)),t===Me&&(t=Ka(a));var i=n==null?void 0:n[t];return i!==void 0?{url:i,mimeResume:t}:{url:qn[t],mimeResume:t}},As=function(e,n,t){var a="octet";if(e)a=Za(n);else return a=Me,t!=null&&t.fallBack?{url:t==null?void 0:t.fallBack,mimeResume:a}:{url:qn[a],mimeResume:a};var i=Ot(e);a==="text"&&(a=Ja(i)),a===Me&&(a=Ka(i));var r=t==null?void 0:t[a];return r!==void 0?{url:r,mimeResume:a}:{url:qn[a],mimeResume:a}},qn={aac:hl,accdb:xl,abw:bl,arc:Rl,avi:yl,azw:wl,octet:vt,bmp:El,bz:Cl,bz2:Sl,cda:Fl,csh:zl,css:kl,csv:$l,docx:Nl,drawio:Il,eot:Ml,epub:Dl,gzip:Ll,gif:Ol,html:ba,icalendar:jl,jar:Bl,jpeg:Ul,javascript:Al,json:Tl,jsonld:_l,midi:Hl,mp3:Vl,mp4:ql,mpeg:Wl,mpkg:Gl,mp2t:vt,odp:Xl,ods:Zl,odt:Kl,oga:Jl,ogv:Yl,ogx:Ql,opus:es,otf:ns,png:is,pdf:ts,php:as,pptx:rs,psd:os,rar:cs,rtf:ds,sass:fs,sh:ms,swf:ps,tar:ss,tiff:vs,ttf:hs,typescript:bs,text:gs,vsd:xs,wav:ws,weba:Cs,webm:Es,webp:Ss,woff:ks,wma:Fs,wmv:zs,xhtml:ba,xlsx:$s,xml:Ns,xul:Is,zip:Ms,sevenzip:vl,python:ls,java:Pl,react:us,vue:ys,fallBack:vt},Wn=function(){function e(n){var t=n.id,a=n.file,i=n.name,r=n.size,s=n.type,l=n.imageUrl,c=n.valid,u=n.errors,d=n.uploadMessage,f=n.uploadStatus,m=n.progress,g=n.xhr,p=n.extraData,v=n.extraUploadData,b=n.serverResponse,y=n.downloadUrl,x=n.videoUrl,S=n.uploadUrl;this.id=t,this.file=a,this.name=i,this.size=r,this.type=s,this.imageUrl=l,this.valid=c,this.errors=u,this.uploadStatus=f,this.uploadMessage=d,this.progress=m,this.xhr=g,this.extraData=p,this.extraUploadData=v,this.serverResponse=b,this.downloadUrl=y,this.videoUrl=x,this.uploadUrl=S}return e.toExtFile=function(n){for(var t={},a=Object.keys(n),i=Object.values(n),r=0;r<i.length;r++){var s=i[r],l=a[r];s!==void 0&&(t[l]=s)}return t},e.prototype.toExtFile=function(){return e.toExtFile(this)},e.hasValidUrl=function(n){return n.uploadUrl&&n.uploadUrl.length>0},e.someValidUrl=function(n){return n.some(e.hasValidUrl)},e}(),_=function(){return _=Object.assign||function(n){for(var t,a=1,i=arguments.length;a<i;a++){t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_.apply(this,arguments)};function xn(e,n,t,a){function i(r){return r instanceof t?r:new t(function(s){s(r)})}return new(t||(t=Promise))(function(r,s){function l(d){try{u(a.next(d))}catch(f){s(f)}}function c(d){try{u(a.throw(d))}catch(f){s(f)}}function u(d){d.done?r(d.value):i(d.value).then(l,c)}u((a=a.apply(e,[])).next())})}function yn(e,n){var t={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},a,i,r,s;return s={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(s[Symbol.iterator]=function(){return this}),s;function l(u){return function(d){return c([u,d])}}function c(u){if(a)throw new TypeError("Generator is already executing.");for(;s&&(s=0,u[0]&&(t=0)),t;)try{if(a=1,i&&(r=u[0]&2?i.return:u[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,u[1])).done)return r;switch(i=0,r&&(u=[u[0]&2,r.value]),u[0]){case 0:case 1:r=u;break;case 4:return t.label++,{value:u[1],done:!1};case 5:t.label++,i=u[1],u=[0];continue;case 7:u=t.ops.pop(),t.trys.pop();continue;default:if(r=t.trys,!(r=r.length>0&&r[r.length-1])&&(u[0]===6||u[0]===2)){t=0;continue}if(u[0]===3&&(!r||u[1]>r[0]&&u[1]<r[3])){t.label=u[1];break}if(u[0]===6&&t.label<r[1]){t.label=r[1],r=u;break}if(r&&t.label<r[2]){t.label=r[2],t.ops.push(u);break}r[2]&&t.ops.pop(),t.trys.pop();continue}u=n.call(e,t)}catch(d){u=[6,d],i=0}finally{a=r=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}}function Gn(e,n,t){if(t||arguments.length===2)for(var a=0,i=n.length,r;a<i;a++)(r||!(a in n))&&(r||(r=Array.prototype.slice.call(n,0,a)),r[a]=n[a]);return e.concat(r||Array.prototype.slice.call(n))}var wt=function(){function e(){}return e.getNextId=function(){return e.nextId++,e.nextId},e.setFileList=function(n,t){return n?(e.fileLists[n]=Gn([],t,!0),n):0},e.createFileListMap=function(){var n=e.getNextId();return e.fileLists[n]=[],n},e.removeFileListMap=function(n){if(n)try{return e.fileLists[n]=void 0,n}catch{return 0}else return 0},e.getExtFileInstanceList=function(n){try{return n?e.fileLists[n]:void 0}catch{return}},e.setFileListMapPreparing=function(n,t,a,i){if(typeof n=="number"||typeof n=="string")try{var r=[],s=Gn([],t,!0);i&&a&&(s=s.filter(function(c){return c.valid})),a?s=s.map(function(c){return c.uploadStatus!=="success"&&c.valid?_(_({},c),{uploadStatus:"preparing"}):_({},c)}):s=s.map(function(c){return c.uploadStatus!=="success"?_(_({},c),{uploadStatus:"preparing"}):_({},c)}),r=s.map(function(c){return new Wn(c)});var l=e.setFileList(n,r);return r}catch{return}},e.setFileListMapPreparing2=function(n,t,a,i){return e.setFileList(n,t.map(function(r){return new Wn(_(_({},r),{uploadStatus:"preparing"}))})),e.getExtFileInstanceList(n)},e.nextId=0,e.fileLists={},e}(),Lt=function(){function e(){}return e.getNextId=function(){return e.nextId++,e.nextId},e.nextId=0,e}(),xa=function(e){for(var n=[],t=0,a=void 0;a=e[t];t++)n.push({id:Lt.getNextId(),file:a,name:a.name,size:a.size,type:a.type});return n},Us=function(e,n,t,a){return e!=null||n!=null||t!=null||a!=null},Ts=function(e){return e===void 0&&(e=5e3),new Promise(function(n,t){setTimeout(function(){n()},e)})},_s=function(e,n){n===void 0&&(n=Rn("EN-en"));var t=e.toExtFile();return new Promise(function(a,i){setTimeout(function(){var r=Math.floor(Math.random()*10);if(r%2===0){var s=!0,l=n.fakeuploadsuccess,c={url:""};a(_(_({},t),{serverResponse:{success:s,message:l,payload:c},uploadStatus:"success",uploadMessage:l}))}else{var s=!1,l=n.fakeUploadError,c={};a(_(_({},t),{serverResponse:{success:s,message:l,payload:c},uploadStatus:"error",uploadMessage:l}))}},1700)})};function Hs(e,n){return Math.floor(Math.random()*(n-e))+e}var Vs=function(e){e&&(e.value="")},Ae=function(e,n){return n?"".concat(e," ").concat(n):e},qs=function(e,n){return(!n||n&&e.valid)&&e.uploadStatus!=="success"},Ws=function(e,n,t,a){var i="",r=void 0,s=void 0;return e&&typeof e.name=="string"?(i=e.name,r=e.type,s=e.size):n&&typeof n=="string"&&(i=n,r=t,s=a),[i,r,s]},Gs=function(e){if(!e||e.length===0)return[];var n=e.split(",").map(function(t){return t.trim()});return n},Xs=function(e,n){for(var t=!1,a=n.name,i=n.type,r=0;r<e.length;r++){var s=e[r];if(s.length!==0){if(s.charAt(0)==="."&&s.includes(Ot(a)))return!0;if(i&&i.length>0&&s.includes("/")&&i.includes("/")){var l=s.split("/")[0],c=s.split("/")[1],u=i.split("/")[0],d=i.split("/")[1];if(l===u){if(c==="*")return!0;if(c===d)return!0}}}}return t},Et=function(e,n,t,a,i,r){var s=[];if(!n)return s;for(var l=n,c=pl(r),u=c.maxFileCount,d=0;d<e.length;d++){var f=e[d];if(f=Zs(f,a,t,c),f.valid){var m=l>0;f.valid=m,m||(f.errors=f.errors?Gn(Gn([],f.errors,!0),[u(i||1/0)],!1):[u(i||1/0)]),l--}s.push(f)}return s},Zs=function(e,n,t,a){var i=_({},e),r=[];if(!e.file)return _({},i);if(n){var s=n(i.file),l=s.errors;l&&r.push.apply(r,l)}var c=t.maxFileSize,u=t.accept,d=e.file;if(c&&d.size>c){var f=a.maxSizeError;r.push(f(c))}u&&!Xs(Gs(u),d)&&r.push(a.acceptError);var m=r.length===0;return i=_(_({},i),{valid:m,errors:m?void 0:r}),i};function Ks(e,n){for(var t=Object.keys(n||{}),a=0;a<t.length&&n;a++)e.append(t[a],n[t[a]])}function Ya(e,n){for(var t=Object.keys(n||{}),a=0;a<t.length&&n;a++)e.setRequestHeader(t[a],n[t[a]])}var Js="Unable to upload. A valid url was not provided",Ys="Unable to upload. xhr object was not provided",Qa={success:!1,message:"Timeout error",payload:{}},Xn={success:!1,message:"Upload aborted",payload:{}},Qs={success:!1,message:"Error when parsing JSON response",payload:{}},ec={success:!1,message:"Unexpected error",payload:{}},nc=function(e){return _(_({},e),{uploadMessage:Ys,uploadStatus:"error",serverResponse:{success:!1}})},tc=function(e){return _(_({},e),{uploadMessage:Js,uploadStatus:"error",serverResponse:{success:!1}})},ei=function(e){try{var n=JSON.parse(e.response),t=e.status>=200&&e.status<300?!0:typeof n.success=="boolean"?n.success:!1,a=typeof n.message=="string"?n.message:t?"Upload compete!. No message from server found.":"Error on upload. No message from server found.",i=n.payload||n||{},r={success:t,message:a,payload:i};return r}catch{return Qs}},ac=function(e,n){return _(_({},e),{serverResponse:n,uploadMessage:n.message,uploadStatus:"success"})},ya=function(e,n){return _(_({},e),{uploadMessage:n.message,uploadStatus:"error",serverResponse:n})},ic=function(e,n,t,a,i){return n===void 0&&(n="POST"),new Promise(function(r,s){console.log("uploadBlob => BLOB");var l=["POST","PUT","PATCH"].includes(n.toUpperCase())?n:"POST";e.upload.onload=function(){},e.upload.ontimeout=function(){return r(Qa)},e.upload.onabort=function(){r(Xn)},e.onloadend=function(c){return xn(void 0,void 0,void 0,function(){return yn(this,function(u){return[2]})})},e.onreadystatechange=function(c){return xn(void 0,void 0,void 0,function(){return yn(this,function(u){return e.readyState===4&&(e.response!==""?r(ei(e)):r(Xn)),[2]})})},e.open(l,t,!0),Ya(e,i),e.send(a)})},rc=function(e,n,t,a,i){return n===void 0&&(n="POST"),new Promise(function(r,s){var l=["POST","PUT","PATCH"].includes(n.toUpperCase())?n:"POST";e.upload.onload=function(){},e.upload.ontimeout=function(){return r(Qa)},e.upload.onabort=function(){r(Xn)},e.onloadend=function(c){return xn(void 0,void 0,void 0,function(){return yn(this,function(u){return[2]})})},e.onreadystatechange=function(c){return xn(void 0,void 0,void 0,function(){return yn(this,function(u){return e.readyState===4&&(e.response!==""?r(ei(e)):r(Xn)),[2]})})},e.open(l,t,!0),Ya(e,i),e.send(a)})},oc=function(e,n,t,a,i,r,s){return xn(void 0,void 0,void 0,function(){return yn(this,function(l){return[2,new Promise(function(c,u){return xn(void 0,void 0,void 0,function(){var d,f,m,g,p,v,b;return yn(this,function(y){switch(y.label){case 0:return y.trys.push([0,5,,6]),d=e.xhr,d?(f=e.uploadUrl||(t==null?void 0:t(e))||n,f==null||f.length==0?(c(tc(e)),[2]):(m=a||"POST",g=e.file,p=new FormData,p.append(r||"file",g),v=_({},e.extraUploadData),Ks(p,v),b=void 0,s?[4,ic(d,m,f,g,i||{})]:[3,2])):(c(nc(e)),[2]);case 1:return b=y.sent(),[3,4];case 2:return[4,rc(d,m,f,p,i||{})];case 3:b=y.sent(),y.label=4;case 4:return b.success?c(ac(e,b)):c(ya(e,b)),[3,6];case 5:return y.sent(),c(ya(e,ec)),[3,6];case 6:return[2]}})})})]})})},lc=function(e){return _(_({},e),{uploadMessage:"Unexpected error",uploadStatus:"error",serverResponse:{success:!1,message:"Error on upload: unexpected error ",payload:{}}})},wa=function(e){return e?e.map(function(n){return _(_({},n),{xhr:new XMLHttpRequest})}):[]},sc=function(e){return e.uploadStatus==="preparing"?(e.uploadStatus="uploading",_(_({},e),{uploadStatus:"uploading"})):e},ht=function(e){return e===void 0&&(e=1500),new Promise(function(n,t){setTimeout(function(){n(!0)},e)})},tn=function(e){return e.filter(function(n){var t;return!(!((t=n.extraData)===null||t===void 0)&&t.deleted)}).map(function(n){return n.uploadStatus==="aborted"&&!n.uploadMessage&&(n.uploadMessage="Upload aborted by user"),Wn.toExtFile(n)})},cc=function(e,n){var t=e.uploadStatus,a=n.uploadStatus;t==="preparing"&&["aborted",void 0].includes(a)?(e.uploadStatus=void 0,e.uploadMessage=n.uploadMessage):t==="uploading"&&["aborted",void 0].includes(a)&&(e.uploadStatus="aborted",e.uploadMessage=n.uploadMessage)},Ea={indianred:"#CD5C5C",lightcoral:"#F08080",salmon:"#FA8072",darksalmon:"#E9967A",lightsalmon:"#FFA07A",crimson:"#DC143C",red:"#FF0000",firebrick:"#B22222",darkred:"#8B0000",pink:"#FFC0CB",lightpink:"#FFB6C1",hotpink:"#FF69B4",deeppink:"#FF1493",mediumvioletred:"#C71585",palevioletred:"#DB7093",coral:"#FF7F50",tomato:"#FF6347",orangered:"#FF4500",darkorange:"#FF8C00",orange:"#FFA500",gold:"#FFD700",yellow:"#FFFF00",lightyellow:"#FFFFE0",lemonchiffon:"#FFFACD",lightgoldenrodyellow:"#FAFAD2",papayawhip:"#FFEFD5",moccasin:"#FFE4B5",peachpuff:"#FFDAB9",palegoldenrod:"#EEE8AA",khaki:"#F0E68C",darkkhaki:"#BDB76B",lavender:"#E6E6FA",thistle:"#D8BFD8",plum:"#DDA0DD",violet:"#EE82EE",orchid:"#DA70D6",fuchsia:"#FF00FF",magenta:"#FF00FF",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",rebeccapurple:"#663399",blueviolet:"#8A2BE2",darkviolet:"#9400D3",darkorchid:"#9932CC",darkmagenta:"#8B008B",purple:"#800080",indigo:"#4B0082",slateblue:"#6A5ACD",darkslateblue:"#483D8B",mediumslateblue:"#7B68EE",greenyellow:"#ADFF2F",chartreuse:"#7FFF00",lawngreen:"#7CFC00",lime:"#00FF00",limegreen:"#32CD32",palegreen:"#98FB98",lightgreen:"#90EE90",mediumspringgreen:"#00FA9A",springgreen:"#00FF7F",mediumseagreen:"#3CB371",seagreen:"#2E8B57",forestgreen:"#228B22",green:"#008000",darkgreen:"#006400",yellowgreen:"#9ACD32",olivedrab:"#6B8E23",olive:"#808000",darkolivegreen:"#556B2F",mediumaquamarine:"#66CDAA",darkseagreen:"#8FBC8B",lightseagreen:"#20B2AA",darkcyan:"#008B8B",teal:"#008080",aqua:"#00FFFF",cyan:"#00FFFF",lightcyan:"#E0FFFF",paleturquoise:"#AFEEEE",aquamarine:"#7FFFD4",turquoise:"#40E0D0",mediumturquoise:"#48D1CC",darkturquoise:"#00CED1",cadetblue:"#5F9EA0",steelblue:"#4682B4",lightsteelblue:"#B0C4DE",powderblue:"#B0E0E6",lightblue:"#ADD8E6",skyblue:"#87CEEB",lightskyblue:"#87CEFA",deepskyblue:"#00BFFF",dodgerblue:"#1E90FF",cornflowerblue:"#6495ED",royalblue:"#4169E1",blue:"#0000FF",mediumblue:"#0000CD",darkblue:"#00008B",navy:"#000080",midnightblue:"#191970",cornsilk:"#FFF8DC",blanchedalmond:"#FFEBCD",bisque:"#FFE4C4",navajowhite:"#FFDEAD",wheat:"#F5DEB3",burlywood:"#DEB887",tan:"#D2B48C",rosybrown:"#BC8F8F",sandybrown:"#F4A460",goldenrod:"#DAA520",darkgoldenrod:"#B8860B",peru:"#CD853F",chocolate:"#D2691E",saddlebrown:"#8B4513",sienna:"#A0522D",brown:"#A52A2A",maroon:"#800000",white:"#FFFFFF",snow:"#FFFAFA",honeydew:"#F0FFF0",mintcream:"#F5FFFA",azure:"#F0FFFF",aliceblue:"#F0F8FF",ghostwhite:"#F8F8FF",whitesmoke:"#F5F5F5",seashell:"#FFF5EE",beige:"#F5F5DC",oldlace:"#FDF5E6",floralwhite:"#FFFAF0",ivory:"#FFFFF0",antiquewhite:"#FAEBD7",linen:"#FAF0E6",lavenderblush:"#FFF0F5",mistyrose:"#FFE4E1",gainsboro:"#DCDCDC",lightgray:"#D3D3D3",silver:"#C0C0C0",darkgray:"#A9A9A9",gray:"#808080",dimgray:"#696969",lightslategray:"#778899",slategray:"#708090",darkslategray:"#2F4F4F",black:"#000000"},uc=function(e,n){n===void 0&&(n=25);var t="",a=(100-n)/100,i=0,r=0,s=0;if(ti(Zn(e)))i=Ie(e.charAt(1))*16+Ie(e.charAt(2)),r=Ie(e.charAt(3))*16+Ie(e.charAt(4)),s=Ie(e.charAt(5))*16+Ie(e.charAt(6)),t="rgb(".concat(i*a,", ").concat(r*a,",").concat(s*a,")");else if(e.includes("rgba")){var l=e.replace("rgba(",""),c=l.split(",");t="rgb(".concat(parseInt(c[0],10)*a,", ").concat(parseInt(c[1],10)*a,",").concat(parseInt(c[2],10)*a,")")}else if(e.includes("rgb")){var l=e.replace("rgb(",""),c=l.split(",");t="rgb(".concat(parseInt(c[0],10)*a,", ").concat(parseInt(c[1],10)*a,",").concat(parseInt(c[2],10)*a,")")}return t},ni=function(e,n,t){n===void 0&&(n=0);var a=t||"rgba(255, 255, 255, 0.6)";if(!e)return a;var i=e.toUpperCase();if(i.includes("RGBA"))return i;if(i.includes("RGB"))return i.replace("RGB","rgba").replace(")",", ".concat(n,")"));if(!ti(Zn(i)))return a;var r="",s=0,l=0,c=0;return s=Ie(i.charAt(1))*16+Ie(i.charAt(2)),l=Ie(i.charAt(3))*16+Ie(i.charAt(4)),c=Ie(i.charAt(5))*16+Ie(i.charAt(6)),r="rgba(".concat(s,", ").concat(l,",").concat(c," , ").concat(n,")"),r},ti=function(e){if(e.charAt(0)!=="#"||e.length!==7)return!1;for(var n=1;n<e.length;n++)if(!Ct.includes(e.charAt(n)))return!1;return!0};function Zn(e){return e?Ea[e.toLocaleLowerCase()]!==void 0?Ea[e.toLocaleLowerCase()]:e:""}var Ct=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],dc=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],Ie=function(e){return Ct.includes(e)?dc[Ct.indexOf(e)]:0},ai=function(e){return e!==void 0&&e!==""?e:fc},xe=function(e,n){return n===void 0&&(n=1),ni(ai(Zn(e)),n)},fc="#646c7f";function ii(e,n){return e?I(I({},n),e):n}var mc=function(e){var n=e.onChange,t=e.inputRef,a=e.accept,i=e.multiple;return o.createElement(o.Fragment,null,o.createElement("input",{"aria-label":"fui-hidden-input",style:{display:"none"},ref:t,onChange:n,type:"file",accept:a,multiple:i}))},pc={clickable:!0,behaviour:"add",disabled:!1,dropOnLayer:!0,uploadConfig:{},actionButtons:{},header:!0,footer:!0,value:[]},cn="8px";ie(`.files-ui-dropzone-children-container {
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 5px 0;
}`);var gc=function(e){var n=e.children,t=e.label,a=e.localization,i=Array.isArray(n)&&n.length===0,r=Rn(a);return n&&!i?o.createElement("div",{className:"files-ui-dropzone-children-container"},n):o.createElement("div",{className:"files-ui-dropzone-children-container"},o.createElement("label",null," ",t||r.defaultLabel))},jt=function(e){e.stopPropagation(),e.preventDefault()},St=function(e){e.dataTransfer.dropEffect="link",jt(e)};function Ue(e){e.preventDefault(),e.stopPropagation()}var vc=function(e){e&&e.click()},ri=function(e){return xe(e,.4)};function hc(e,n,t){if(!(!n||!e)){e.style.display="block";var a=document.createElement("span");a.id="filesui-ripple",a.className="ripple";var i=Math.max(n.clientWidth,n.clientHeight);a.style.width=a.style.height="".concat(i,"px"),a.style.backgroundColor=ri(t),n.appendChild(a),setTimeout(function(){e.style.display="none",a==null||a.remove()},501)}}function bc(e,n,t){var a=e.currentTarget,i=document.createElement("span"),r=Math.max(a.clientWidth,a.clientHeight);i.style.width=i.style.height="".concat(r,"px"),i.classList.add("ripple"),n!=="contained"?i.style.backgroundColor=ri(t):i.style.backgroundColor=ni("#ffffff",.4),a.appendChild(i),setTimeout(function(){i==null||i.remove()},501)}ie(`.filesui-disabled-root {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.38);
}`);var xc=function(e){var n=e.open,t=e.className,a=e.style;function i(c){Ue(c)}var r=function(c){St(c)},s=function(c){return hn(void 0,void 0,void 0,function(){return bn(this,function(u){return jt(c),[2]})})},l=Ae("filesui-disabled-root",t);return n?o.createElement("div",{style:a,className:l,onDrop:s,onDragOver:r,onClick:i}):o.createElement(o.Fragment,null)};ie(`@import url(https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,900);
.fui-dropzone-root {
  width: 100%;
  min-width: 150px;
  min-height: 180px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0 8px;
  text-rendering: optimizeLegibility;
  font-size: 1.5em;
  font-family: "Poppins", sans-serif;
  text-align: center;
  font-weight: 400;
  letter-spacing: 0.02857em;
  box-sizing: border-box;
  word-break: normal;
  /*  &.fui-dropzone-border {
    box-sizing: border-box;

    border: 1px dashed #0c2358;
    border-radius: 10px;
    &.fui-hide-border {
      border: none;
    }
  } */
}
@media (max-width: 600px) {
  .fui-dropzone-root {
    font-size: 1.3em;
  }
}
.fui-dropzone-root.clickable {
  cursor: pointer;
}

.files-ui-header {
  min-height: 23px;
  /*  height: 22px;
  position: absolute; 
  top: 0;
  */
  cursor: text;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  font-family: inherit;
  font-size: 1rem;
}
@media (max-width: 960px) {
  .files-ui-header {
    font-size: 0.8rem;
  }
}

.files-ui-footer {
  /*   border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px; */
  box-sizing: border-box;
  cursor: text;
  /* height: 23px;
  position: absolute;
  bottom: 0;
  left: 0; */
  width: 100%;
  /* display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center; */
  font-family: inherit;
  padding-left: 10px;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
  text-align: left;
}
@media (max-width: 960px) {
  .files-ui-footer {
    padding-left: 1px;
    font-size: 0.9rem;
  }
}`);ie(`.filesui-base-ripple-absolute {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
}
.filesui-base-ripple-absolute .filesui-base-ripple-relative {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.filesui-base-ripple-absolute .filesui-base-ripple-relative span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 500ms linear;
  background-color: rgba(255, 255, 255, 0.7);
}
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}`);var Ee=function(e){if(typeof e=="number")return e;switch(e){case"micro":return 8;case"small":return 15;case"semi-medium":return 18;case"medium":return 25;case"large":return 28;case"extra-large":return 32;default:return 24}},oi=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return o.createElement("svg",{style:i?I({},I({cursor:"pointer"},c)):c,onClick:function(u){Ue(u),i==null||i(u)},xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000",className:s||""},o.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none",opacity:".87"}),o.createElement("path",{d:"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm5 11.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",fill:a||"none",opacity:".5"}),o.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"}))},li=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return F.createElement("svg",{className:s||"",style:i?I({},I({cursor:"pointer"},c)):c,onClick:function(){return i==null?void 0:i()},xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000"},F.createElement("path",{d:"M0 0h24v24H0z",fill:a||"none"}),F.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}))},yc=function(e){var n=e.size,t=e.color,a=e.onClick,i=e.style,r=e.className,s=Ee(n),l=i||{};return F.createElement("svg",{className:r||"",style:a?I({},I({cursor:"pointer"},l)):l,onClick:function(){return a==null?void 0:a()},xmlns:"http://www.w3.org/2000/svg",enableBackground:"new 0 0 24 24",height:s?"".concat(s,"px"):"24px",viewBox:"0 0 24 24",width:s?"".concat(s,"px"):"24px",fill:t||"#000000"},F.createElement("g",null,F.createElement("rect",{fill:"none",height:s||"24",width:s||"24"})),F.createElement("g",null,F.createElement("g",null,F.createElement("path",{d:"M16,11h-1V3c0-1.1-0.9-2-2-2h-2C9.9,1,9,1.9,9,3v8H8c-2.76,0-5,2.24-5,5v7h18v-7C21,13.24,18.76,11,16,11z M11,3h2v8h-2V3 z M19,21h-2v-3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3h-2v-3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3H9v-3c0-0.55-0.45-1-1-1s-1,0.45-1,1v3H5 v-5c0-1.65,1.35-3,3-3h8c1.65,0,3,1.35,3,3V21z"}))))},On=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return o.createElement("svg",{className:s||"",style:i?I({cursor:"pointer"},c):c,xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000",onClick:function(u){Ue(u),i==null||i(u)}},o.createElement("path",{d:"M0 0h24v24H0V0z",fill:a||"none"}),o.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"}))},wc=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return o.createElement("svg",{className:s||"",style:i?I({cursor:"pointer"},c):c,enableBackground:"new 0 0 24 24",xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000",onClick:function(u){Ue(u),i==null||i(u)}},o.createElement("path",{d:"M0 0h24v24H0V0z",fill:a||"none"}),o.createElement("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-9-3.82l-2.09-2.09L6.5 13.5 10 17l6.01-6.01-1.41-1.41z"}))},si=function(e){var n=e.size,t=e.color,a=e.onClick,i=e.style,r=e.className,s=Ee(n),l=i||{};return F.createElement("svg",{className:r||"",style:a?I({},I({cursor:"pointer"},l)):l,onClick:function(){return a==null?void 0:a()},xmlns:"http://www.w3.org/2000/svg",height:s?"".concat(s,"px"):"24px",viewBox:"0 0 24 24",width:s?"".concat(s,"px"):"24px",fill:t||"#000000"},F.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),F.createElement("path",{d:"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z",opacity:".4"}),F.createElement("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"}))},Ec=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return o.createElement("svg",{className:s||"",style:i?I({cursor:"pointer"},c):c,enableBackground:"new 0 0 24 24",xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000",onClick:function(u){Ue(u),i==null||i(u)}},o.createElement("g",null,o.createElement("rect",{fill:a||"none",height:l,width:l})),o.createElement("g",null,o.createElement("path",{d:"M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"})))},Cc=function(e){var n=e.size,t=e.color,a=e.onClick,i=e.style,r=e.className,s=Ee(n)-2,l=i||{};return o.createElement("svg",{className:r||"",style:a?I({cursor:"pointer"},l):l,"aria-hidden":"true","aria-label":"info",fill:t||"#000000",role:"img",transform:"",version:"1.1",viewBox:"0 0 36 36",xmlns:"http://www.w3.org/2000/svg",height:"".concat(s,"px"),width:"".concat(s,"px"),onClick:function(c){Ue(c),a==null||a(c)}},o.createElement("path",{d:"M22.378 0c2.412 0 3.618 1.642 3.618 3.523 0 2.349-2.095 4.522-4.822 4.522-2.284 0-3.616-1.35-3.553-3.582 0-1.877 1.586-4.462 4.757-4.462zM14.956 36c-1.904 0-3.299-1.174-1.967-6.343l2.185-9.166c0.38-1.465 0.443-2.054 0-2.054-0.571 0-3.040 1.012-4.504 2.011l-0.95-1.584c4.63-3.935 9.956-6.241 12.242-6.241 1.903 0 2.219 2.291 1.269 5.814l-2.504 9.634c-0.443 1.701-0.254 2.288 0.191 2.288 0.571 0 2.443-0.706 4.282-2.173l1.080 1.465c-4.504 4.585-9.423 6.349-11.324 6.349z"}))},Sc=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return F.createElement("svg",{className:s||"",style:i?I({cursor:"pointer"},c):c,xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000",onClick:function(u){Ue(u),i==null||i(u)}},F.createElement("path",{d:"M0 0h24v24H0V0z",opacity:".9",fill:a||"none"}),F.createElement("path",{d:"M8 5v14l11-7L8 5z"}))},Fc=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return F.createElement("svg",{style:i?I({},I({cursor:"pointer"},c)):c,onClick:function(){return i==null?void 0:i()},xmlns:"http://www.w3.org/2000/svg",enableBackground:"new 0 0 24 24",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000",className:s||""},F.createElement("g",null,F.createElement("rect",{fill:a||"none",height:n||"24",width:n||"24"})),F.createElement("g",null,F.createElement("path",{d:"M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z"})))},zc=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return F.createElement("svg",{className:s||"",style:i?I({},I({cursor:"pointer"},c)):c,onClick:function(){return i==null?void 0:i()},xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000"},F.createElement("rect",{fill:a||"none",height:l,width:l}),F.createElement("path",{d:"M18,15.17V15h2v2.17L18,15.17z M15.41,12.59L17,11l-1.41-1.41L14,11.17L15.41,12.59z M13,10.17V4h-2v4.17L13,10.17z M21.19,21.19l-1.78-1.78L2.81,2.81L1.39,4.22l6.19,6.19L7,11l5,5l0.59-0.59L15.17,18H6v-3H4v3c0,1.1,0.9,2,2,2h11.17l2.61,2.61 L21.19,21.19z"}))};ie(`@keyframes filesui-rotate-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.filesui-rotate {
  cursor: default;
}

@media (prefers-reduced-motion: no-preference) {
  .filesui-rotate {
    animation: filesui-rotate-spin infinite 2s linear;
  }
}`);var kc=function(e){var n=e.size,t=e.color,a=e.onClick,i=e.style,r=e.className,s=e.spin,l=Ee(n),c=i||{},u=r||"";return u+=s?"filesui-rotate":"",F.createElement("svg",{className:u,style:a?I({},I({cursor:"pointer"},c)):c,onClick:function(){return a==null?void 0:a()},xmlns:"http://www.w3.org/2000/svg",height:l?"".concat(l,"px"):"24px",viewBox:"0 0 24 24",width:l?"".concat(l,"px"):"24px",fill:t||"#000000"},F.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),F.createElement("path",{d:"M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"}))},$c=function(e){var n=e.size,t=e.color,a=e.colorFill,i=e.onClick,r=e.style,s=e.className,l=Ee(n),c=r||{};return F.createElement("svg",{className:s||"",style:i?I({cursor:"pointer"},c):c,xmlns:"http://www.w3.org/2000/svg",height:"".concat(l,"px"),viewBox:"0 0 24 24",width:"".concat(l,"px"),fill:t||"#000000",onClick:function(u){Ue(u),i==null||i(u)}},F.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),F.createElement("path",{d:"M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z",fill:a||"none"}),F.createElement("path",{d:"M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}))},Nc=function(e){var n=e.maxFileSize,t=e.numberOfValidFiles,a=e.onReset,i=e.onClean,r=e.maxFiles,s=e.onUploadStart,l=e.isUploading,c=e.urlPresent,u=e.localization,d=e.borderRadius,f=e.style,m=e.className,g=m===void 0?"":m,p=e.resetStyles,v=e.color,b=e.firstClassName,y=b===void 0?"":b,x=Rn(u).header,S=function(){i==null||i()},w=function(){s==null||s()},h=function(){var k=[];s&&c&&t&&(l?k.push(o.createElement(kc,{spin:!0,color:v})):k.push(o.createElement(o.Fragment,null,o.createElement(o.Fragment,null,x.uploadFilesMessage),o.createElement(Fc,{color:v,onClick:w}))),k.push(o.createElement(o.Fragment,null,","," ")));var R=x.maxSizeMessage,A=We(n);A&&(k.push(R(A)),k.push(o.createElement(o.Fragment,null,","," ")));var O=x.validFilesMessage;return r&&(k.push(O(t,r)),k.push(o.createElement(o.Fragment,null,","," "))),i&&k.push(o.createElement(yc,{color:v,onClick:S,size:"semi-medium"})),a&&k.push(o.createElement(oi,{color:v,onClick:function(){return a==null?void 0:a()}})),k};function C(k){k.stopPropagation()}var E=p?g:Ae("files-ui-header "+y,g),z=p?f:I(I({},f),{borderTopLeftRadius:d,borderTopRightRadius:d});return o.createElement("div",{className:E,onClick:C,style:z},h().map(function(k,R){return o.createElement("span",{key:R,style:{display:"flex"}},k)}))},Ic=function(e){var n=e.accept,t=e.message,a=e.localization,i=e.borderRadius,r=e.style,s=e.className,l=s===void 0?"":s,c=e.resetStyles,u=c===void 0?!1:c,d=e.allowedTypesLabel,f=d===void 0?!0:d,m=e.customMessage,g=m===void 0?void 0:m,p=e.firstClassName,v=p===void 0?"":p,b=Rn(a).footer,y=b.acceptCustom;function x(h){Ue(h)}var S=u?l:Ae("files-ui-footer ".concat(v),l),w=u?r:I(I({},r),{borderBotomLeftRadius:i,borderBotomRightRadius:i});return o.createElement("div",{className:S,onClick:x,style:w},g?o.createElement(o.Fragment,null,g):o.createElement(o.Fragment,null,t||(n?y(n):f?b.acceptAll:void 0)))},Be;(function(e){function n(s){var l="";if(typeof window>"u"||typeof s>"u"||s===null)return"";if(document.getElementById(s.id))return s.id;l=s.id;var c=document.createElement("style");c.id=l,c.setAttribute("type","text/css");var u=Sa(s.sheetRules||[])+s.raw||"";c.textContent=u;var d=document.head.appendChild(c);return d?l:""}e.insertStyleSheet=n;function t(s,l){var c="";if(typeof window>"u"||typeof s>"u"||s===null||l===null)return"";var u=document.getElementById(s);return u?(u.textContent=Sa(l),c):""}e.editStyleSheet=t;function a(s){var l="";if(!s)return"";var c=document.getElementById(s);return c&&(document.head.removeChild(c),l=s),l}e.removeStyleSheet=a;function i(s){if(typeof s>"u"||s===null)return!1;var l=document.getElementById(s);return!!l}e.existStyleSheet=i;function r(s){return typeof s>"u"||s===null?null:s}e.makeStyleSheet=r})(Be||(Be={}));function Mc(e){return e?!/[a-z]/.test(e)&&/[A-Z]/.test(e):!1}function Ca(e){for(var n="",t=" ",a=!1,i=0;i<e.length;i++){var r=e[i];if(Mc(r)){t=r,a=!0;break}}if(a){var s=e.split(t);n="".concat(s[0],"-").concat(t.toLowerCase()).concat(s[1])}else n=e;return n}function Dc(e){return e?e.includes(":"):!1}function Rc(e){var n="",t=e.trim().split(" ");if(t.length>1){for(var a=0;a<t.length;a++)n+=".".concat(t[a]);n+=`{
`}else n+=".".concat(e,`{
`);return n}function Sa(e){if(typeof e>"u"||e===null)return"";for(var n="",t=[],a=0;a<e.length;a++){var i=e[a],r="";r+=Rc(i.className);for(var s=Object.keys(i.rules),l=0;l<s.length;l++){var c=s[l],u=Ca(c);if(Dc(u)){var d=i.className+u;t.push({className:d,rules:i.rules[u]})}else{var f=i.rules[c];r+="	".concat(u," : ").concat(f,`;
`)}}r+=`}
`,n+=r}for(var m=0;m<t.length;m++){var r="",i=t[m],s=Object.keys(i.rules);r+=".".concat(i.className,`{
`);for(var l=0;l<s.length;l++){var c=s[l],u=Ca(c),f=i.rules[c];r+="	".concat(u," : ").concat(f,`;
`)}r+=`}
`,n+=r}return n}var Oc=function(){function e(){}return e.getNextId=function(){return e.nextButtonClassNameNumber++,e.nextButtonClassNameNumber},e.nextButtonClassNameNumber=0,e.makeDynamicStyle=function(n,t,a,i,r,s){var l={id:"material-button-styles-".concat(n),sheetRules:[{className:"material-button.".concat(t,"-").concat(n),rules:{}},{className:"material-button-root.".concat(t,"-").concat(n),rules:{}}]},c=l.sheetRules;if(!a)switch(t){case"contained":c[0].rules={color:ai(Zn(r)),backgroundColor:xe(i),textDecoration:s},c[1].rules={":hover":{backgroundColor:uc(xe(i))}};break;case"outlined":c[0].rules={border:"1px solid ".concat(xe(i,.5)),color:xe(i),backgroundColor:"transparent",textDecoration:s},c[1].rules={":hover":{border:"1px solid ".concat(xe(i,1)),backgroundColor:xe(i,.085)}};break;case"text":c[0].rules={color:xe(i),backgroundColor:"transparent",textDecoration:s},c[1].rules={":hover":{backgroundColor:xe(i,.085)}};break}return l.sheetRules=c,l},e}(),Lc=function(e,n,t,a,i,r,s,l){var c="material-button-root material-button",u=o.useState(""),d=u[0],f=u[1],m=o.useState(!1),g=m[0],p=m[1],v=o.useState(void 0),b=v[0],y=v[1],x=function(w,h,C,E,z,k){var R=c,A=Oc.makeDynamicStyle(w,h,C,E,k,z),O="";if(g?Be.editStyleSheet(d,A.sheetRules||[]):(O=Be.insertStyleSheet(A),f(O),O!==""&&p(!0)),C?R+=" disabled":R+=" ".concat(h," ").concat(h,"-").concat(w),r&&r.length>0&&(R+=" ".concat(r)),z){var oe=z&&["uppercase","capitalize","lowercase","none"].includes(z==null?void 0:z.toLowerCase())?z.toLowerCase():"uppercase";R+=" ".concat(oe)}y(R)};o.useEffect(function(){l||x(s,e,n,t,i,a)},[e,n,t,i,a,r,s,l]);var S=function(w,h){w&&(Be.removeStyleSheet(h),p(!1),f(""))};return o.useEffect(function(){return function(){return S(g,d)}},[g,d]),b};ie(`@import url(https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,900);
.material-button-root {
  border: 0;
  cursor: pointer;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  text-transform: none;
  color: white;
}

.material-button {
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  overflow: hidden;
  min-width: 64px;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.02857em;
}

.material-button.uppercase {
  text-transform: uppercase;
}

.material-button.lowercase {
  text-transform: lowercase;
}

.material-button.capitalize {
  text-transform: capitalize;
}

.material-button.contained {
  padding: 6px 16px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.material-button.outlined {
  padding: 5px 15px;
}

.material-button.text {
  padding: 5px 15px;
}

.material-button-root.contained:hover {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.material-button span.material-button-label {
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
}

span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 500ms linear;
  background-color: rgba(255, 255, 255, 0.7);
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
.material-button-root.disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.26);
  padding: 6px 16px;
}
.material-button-root.disabled.darkmode {
  background-color: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.3);
}

/* @media screen and (max-width: 600px) {
  .material-button {
    min-width: 30px;
    font-size: 0.78rem;
    line-height: 1.5;
    letter-spacing: 0.025em;
  }
  .material-button.contained {
    padding: 4px 13px;
  }
  .material-button.outlined {
    padding: 4px 12px;
  }
}
 */`);var Pt=F.createContext({}),jc=function(e){var n=e.disabled,t=e.href,a=e.textTransform,i=e.variant,r=i===void 0?"contained":i,s=e.color,l=s===void 0?"#1976d2":s,c=e.textColor,u=c===void 0?"white":c,d=e.children,f=e.className,m=e.style,g=e.onClick,p=e.resetStyles,v=e.disableRipple,b=e.darkMode,y=e.id,x=Rt(e,["disabled","href","textTransform","variant","color","textColor","children","className","style","onClick","resetStyles","disableRipple","darkMode","id"]),S=o.useContext(Pt).darkMode,w=b!==void 0?b:S,h=o.useMemo(function(){return y||Lt.getNextId()+""},[y]),C=Lc(r,n,l,u,a,f,h.replace(":","").replace(":",""),p),E=C&&w?Ae(C,"darkmode"):C;function z(k){k.preventDefault(),v||bc(k,r,l),g==null||g(k)}return E!==void 0||p?o.createElement(t?"a":"button",I({className:p&&f?f:E,"data-testid":t?"dui-anchor":"dui-button",onClick:z,href:t,style:m,children:o.createElement("span",{className:"material-button-label"},d),disabled:n},x)):o.createElement(o.Fragment,null,"loading styes")};ie(`.files-ui-buttons-container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  gap: 10px;
}
.files-ui-buttons-container.top {
  padding-bottom: 10px;
}
.files-ui-buttons-container.bottom {
  padding-top: 10px;
}`);var Fa=function(e){var n=e.cleanButton,t=e.abortButton,a=e.className,i=e.style,r=e.deleteButton,s=e.uploadButton,l=e.onAbort,c=e.onClean,u=e.onDelete,d=e.onUpload,f=e.top;e.disabled;var m=[n?I(I({},n),{label:n.label||"Clean",onClick:n.onClick||c}):void 0,r?I(I({},r),{label:r.label||"Delete",onClick:r.onClick||u}):void 0,s?I(I({},s),{label:s.label||"Upload",onClick:s.onClick||d}):void 0,t?I(I({},t),{label:t.label||"Abort",onClick:t.onClick||l}):void 0].filter(function(v){return v!==void 0}),g="".concat(f?" top":" bottom"),p=Ae("files-ui-buttons-container"+g,a);return o.createElement("div",{className:p,style:i},m.map(function(v,b){var y=v.disabled,x=v.children,S=v.label,w=v.resetStyles,h=v.className,C=v.style,E=v.onClick;return o.createElement(jc,{key:b,className:h,style:C,resetStyles:w,onClick:function(z){return E==null?void 0:E(z)},disabled:y},x||S)}))},Pc=function(e){var n=e.onDrop,t=e.onDragLeave,a=e.className,i=e.open,r=e.style;return o.createElement("div",{className:a,onDragLeave:t,onDrop:n,style:r||{display:i?void 0:"none"}})};function Bc(e,n,t,a,i){var r=t===void 0&&a===void 0&&i===void 0?"default":e.replace(":","_").replace(":","_"),s="fui-dropzone-root fui-dropzone-border",l=o.useState(""),c=l[0],u=l[1],d=o.useState(!1),f=d[0],m=d[1],g=o.useState(void 0),p=g[0],v=g[1],b=o.useState(void 0),y=b[0],x=b[1],S=o.useState(void 0),w=S[0],h=S[1],C=o.useState(void 0),E=C[0],z=C[1],k=function(R,A,O,oe){var H=s,re=Ac(r,A,O,oe),L="";f?Be.editStyleSheet(c,re.sheetRules||[]):(L=Be.insertStyleSheet(re),u(L),L!==""&&m(!0)),H+=" files-ui-dropzone-extra-".concat(r),R&&(H="".concat(H," ").concat(R)),v(H),x("files-ui-header-border-rd-".concat(r)),h("files-ui-footer-border-rd-top-bg-color-".concat(r)),z("files-ui-disabled-layer-color-".concat(r))};return o.useEffect(function(){k(n,t,a,i)},[n,t,a,i]),[p,y,w,E]}var Ac=function(e,n,t,a){var i={className:"files-ui-dropzone-extra-".concat(e),rules:{color:xe(n),border:"1px dashed ".concat(xe(n)),borderRadius:cn,background:t,minHeight:typeof a=="number"?"".concat(a,"px"):a}},r={className:"files-ui-root-border-hide",rules:{borderColor:"transparent"}},s={className:"files-ui-header-border-rd-".concat(e),rules:{"border-top-left-radius":cn,"border-top-right-radius":cn}},l={className:"files-ui-footer-border-rd-top-bg-color-".concat(e),rules:{"border-bottom-left-radius":cn,"border-bottom-right-radius":cn,background:xe(n,.129),borderTop:"1px dotted ".concat(xe(n))}},c={className:"files-ui-disabled-layer-color-".concat(e),rules:{borderRadius:cn,background:xe(n,.38)}},u=[i,r,s,l,c];return{id:"files-dropzone-ui-style-id-"+e,sheetRules:u}},Uc=function(e,n,t,a,i,r,s,l,c){var u=o.useState([]),d=u[0],f=u[1],m=o.useState(0),g=m[0],p=m[1];return o.useEffect(function(){var v=wt.getExtFileInstanceList(e);t?v&&v.forEach(function(b){var y=n.findIndex(function(S){return S.id===b.id});if(y===-1)b.extraData={deleted:!0};else{var x=n[y];cc(b,x)}}):f(n)},[e,n]),o.useEffect(function(){if(!c){f(d.map(function(y){return I(I({},y),{valid:void 0})}));return}var v={maxFileSize:a,accept:i},b=Et(d,r?r-g:1/0,v,s,r,l);f(b)},[c,a,i,r,l]),o.useEffect(function(){p(c?d.filter(function(v){return v.valid}).length:d.length)},[d,c]),[d,g,f]},Tc=function(e,n){return{id:"files-ui-drop-layer-style-id-"+e,sheetRules:[{className:"dropzone-layer-".concat(e),rules:{backgroundColor:xe(n,.4),borderRadius:cn,position:"absolute",left:0,top:0,width:"0%",height:"0%",zIndex:20,border:"0px dashed ".concat(xe(n))}},{className:"dropzone-layer-drag",rules:{width:"100%",height:"100%",borderWidth:"2px"}}]}},_c=function(e,n,t){var a=o.useState(""),i=a[0],r=a[1],s=o.useState(!1),l=s[0],c=s[1],u=o.useState(""),d=u[0],f=u[1],m=n===void 0?"default":e.replace(":","_").replace(":","_");return o.useEffect(function(){var g=function(p){var v="",b=Tc(m,p),y="";m==="default"&&!l?Be.existStyleSheet("files-ui-drop-layer-style-id-"+m)?(c(!0),r("files-ui-drop-layer-style-id-"+m)):(y=Be.insertStyleSheet(b),r(y),y!==""&&c(!0)):l?Be.editStyleSheet(i,b.sheetRules||[]):(y=Be.insertStyleSheet(b),r(y),y!==""&&c(!0)),v+="dropzone-layer-".concat(m),f(v)};t&&g(n)},[n,t]),d},Hc=function(e,n,t,a,i,r,s,l,c){var u=o.useState(!1),d=u[0],f=u[1],m=o.useState(!1),g=m[0],p=m[1],v=o.useState(""),b=v[0],y=v[1],x=o.useState(void 0),S=x[0],w=x[1],h=o.useState(void 0),C=h[0],E=h[1],z=o.useState(!1),k=z[0],R=z[1],A=function(O,oe,H,re,L,U,Q,ee,Ce,W){return hn(void 0,void 0,void 0,function(){var se,$,G;return bn(this,function(P){switch(P.label){case 0:return!O&&!oe&&!H?[2]:(se=(O?Bs(O,ee):As(oe,H,ee)).url,y(se),U&&Q?(p(!0),w(U),E(Q),R(!0),[2]):[3,1]);case 1:return U?(f(!0),w(U),R(!0),[2]):[3,2];case 2:return Q?(p(!0),E(Q),R(!0),[3,5]):[3,3];case 3:return $=Vc(O,H),f($[0]==="image"),["mp4","ogg","webm"].includes($[1])&&p($[0]==="video"),L&&(re||typeof re>"u"||re===null)&&$[0]==="image"?(G=void 0,O?[4,Xa(O)]:[3,5]):[3,5];case 4:G=P.sent(),G&&w(G),P.label=5;case 5:return R(!0),[2]}})})};return o.useEffect(function(){return A(e,n,t,a,i||!1,r,s,l),function(){w(void 0),f(!1),p(!1),R(!1)}},[e,n,t,a,i,r,s,l]),[k,d,g,b,S,C]},Vc=function(e,n){if(e)if(e.type){var t=e.type.split("/");return[t[0],t[1]]}else return["octet","octet"];else{var t=n==null?void 0:n.split("/");return t&&t.length>1?[t[0],t[1]]:["octet","octet"]}},qc=function(e){var n=o.useState(!1),t=n[0],a=n[1],i=o.useState(e),r=i[0],s=i[1];return o.useEffect(function(){if(s(e),["uploading","preparing"].includes(r||"")&&["success","error","aborted"].includes(e||"")){setTimeout(function(){a(!1)},3500);return}else a(e==="preparing"||e==="uploading")},[e]),t},Wc=function(e,n){var t=o.useState(void 0),a=t[0],i=t[1];return e!==void 0?a!==e&&i(e):n!=null&&n.upload.onprogress===null&&(n.upload.onprogress=function(r){i(r.loaded/r.total*100)},i(0)),a},Gc=function(e,n,t){return Wn.someValidUrl(t||[])||n!=null||e!=null&&e.length>0},Xc=function(e){var n=ii(e,pc),t=n.onChange,a=n.value,i=a===void 0?[]:a,r=n.accept,s=n.maxFileSize,l=n.maxFiles,c=n.validator,u=n.cleanFiles,d=n.onClean,f=n.autoClean,m=n.uploadConfig,g=n.fakeUpload,p=n.groupUpload,v=n.onUploadStart,b=n.onUploadFinish,y=n.background,x=n.color,S=n.minHeight,w=n.style,h=n.className,C=n.label,E=n.localization,z=n.disableRipple,k=n.onDragEnter,R=n.onDragLeave,A=n.actionButtons,O=n.dropOnLayer,oe=n.header,H=n.footer,re=n.headerConfig,L=re===void 0?{}:re,U=n.footerConfig,Q=U===void 0?{}:U,ee=n.disabled,Ce=n.clickable,W=n.behaviour,se=n.children,$=Rt(n,["onChange","value","accept","maxFileSize","maxFiles","validator","cleanFiles","onClean","autoClean","uploadConfig","fakeUpload","groupUpload","onUploadStart","onUploadFinish","background","color","minHeight","style","className","label","localization","disableRipple","onDragEnter","onDragLeave","actionButtons","dropOnLayer","header","footer","headerConfig","footerConfig","disabled","clickable","behaviour","children"]),G=o.useContext(Pt).localization,P=E!==void 0?E:G,V=m,pe=V.url,me=V.method,De=V.headers,ae=V.uploadLabel,ge=V.cleanOnUpload,ye=ge===void 0?!0:ge,q=V.preparingTime,J=q===void 0?1500:q,ve=V.autoUpload,ce=ve===void 0?!1:ve,Te=V.urlFromExtFile,Re=V.asBlob,_e=Re===void 0?!1:Re,Se=A,X=Se.position,le=Se.abortButton,fe=Se.deleteButton,ke=Se.uploadButton,Ge=Se.cleanButton,rn=Se.style,on=Se.className,fn=w==null?void 0:w.borderRadius,Xe=L.cleanFiles,ln=Xe===void 0?!0:Xe,mn=L.deleteFiles,En=mn===void 0?!0:mn,sn=L.maxFileSize,N=sn===void 0?!0:sn,j=L.uploadFiles,ne=j===void 0?!0:j,D=L.uploadingIcon,Z=D===void 0?!0:D,ue=L.validFilesCount,Oe=ue===void 0?!0:ue,Le=L.customHeader,de=L.className,Kn=L.resetStyles,fi=Kn===void 0?!1:Kn,mi=L.style,Bt=Q.customFooter,At=Q.noMissingFilesLabel,pi=At===void 0?!0:At,Ut=Q.uploadProgressMessage,Tt=Ut===void 0?!0:Ut,_t=Q.uploadResultMessage,gi=_t===void 0?!0:_t,Cn=Rn(P),Ht=o.useRef(null),Vt=o.useRef(null),Jn=o.useRef(null),qt=o.useState(!1),Yn=qt[0],Qn=qt[1],Wt=o.useState(!1),we=Wt[0],Sn=Wt[1],Gt=o.useState(""),vi=Gt[0],Fn=Gt[1],zn=o.useMemo(function(){return Lt.getNextId()+""},[]),Qe=Us(r,s,l,c),et=Uc(zn,i||[],we,s,r,l,c,P,Qe),en=et[0],nt=et[1],kn=et[2],Ln=Gc(pe,Te,en),jn=function(K){return hn(void 0,void 0,void 0,function(){var M,te,Ve,pn,na,ot,ta,lt,aa,ia,st,Bn,je,gn,$n,An,ra,ct;return bn(this,function(he){switch(he.label){case 0:return Sn(!0),we||K.length===0||!Ln?(Sn(!1),[2]):K.length===0?(Fn(Cn.noFilesMessage),setTimeout(function(){Sn(!1)},1500),[2]):(M=[],te=K.length,Ve=K.filter(function(Fe){return qs(Fe,Qe)}).length,pn=0,na=0,ot=Cn.uploadingMessage,Ve>0?(Tt&&Fn(ot("".concat(Ve,"/").concat(te))),v==null||v(K),M=wt.setFileListMapPreparing(zn,K,Qe,ye)||[],ta=an([],M,!0).map(function(Fe){return Fe.toExtFile()}),He(ta,!0),[4,Ts(J)]):(setTimeout(function(){pi&&Fn(Cn.noFilesMessage),Sn(!1)},1500),[2]));case 1:if(he.sent(),lt=[],!p)return[3,6];aa=function(Fe,Ci,oa){M.forEach(function(dt){return dt.uploadStatus="uploading"}),He(tn(M),!0);for(var la=new FormData,ut=0;ut<oa.length;ut++)la.append("files",oa[ut].file);return new Promise(function(dt,sa){var $e=new XMLHttpRequest;$e.upload.onprogress=function(Un){M.forEach(function(Si){Si.progress=Un.loaded/Un.total*100}),He(tn(M),!0)},$e.responseType="json",$e.onload=function(){$e.status>=200&&$e.status<300?(console.log($e.response),console.log(typeof $e.response),dt($e.response)):sa($e.response)},$e.onerror=function(Un){sa(Un)},$e.open(Fe,Ci),$e.send(la)})},he.label=2;case 2:return he.trys.push([2,4,,5]),[4,aa("POST",pe,M)];case 3:return ia=he.sent(),M.forEach(function(Fe){return Fe.uploadStatus="success"}),M.forEach(function(Fe){return Fe.uploadMessage=ia.message}),[3,5];case 4:return st=he.sent(),M.forEach(function(Fe){return Fe.uploadStatus="error"}),M.forEach(function(Fe){return Fe.uploadMessage=st.message}),console.log(st),[3,5];case 5:return He(tn(M),!0),[3,21];case 6:Bn=0,he.label=7;case 7:return Bn<M.length?(je=M[Bn],je.uploadStatus==="preparing"&&!(!((ct=je.extraData)===null||ct===void 0)&&ct.deleted)?[4,ht()]:[3,19]):[3,21];case 8:return he.sent(),sc(je),Tt&&Fn(ot("".concat(++na,"/").concat(Ve))),He(tn(M),!0),gn=void 0,g?[4,_s(je,Cn)]:[3,13];case 9:gn=he.sent(),$n=0,he.label=10;case 10:return $n<100?($n+=Hs(21,35),je.progress=$n>100?100:$n,[4,ht(1e3)]):[3,12];case 11:return he.sent(),He(tn(M),!0),[3,10];case 12:return[3,16];case 13:return he.trys.push([13,15,,16]),[4,oc(je,pe,Te,me,De,ae,_e)];case 14:return gn=he.sent(),[3,16];case 15:return he.sent(),gn=lc(je.toExtFile()),[3,16];case 16:return An=gn,je.uploadStatus=An.uploadStatus,je.uploadMessage=An.uploadMessage,je.uploadStatus==="aborted"?[3,18]:[4,ht()];case 17:he.sent(),he.label=18;case 18:return He(tn(M),!0),An.uploadStatus==="error"&&pn++,lt.push(gn),[3,20];case 19:He(tn(M),!0),he.label=20;case 20:return Bn++,[3,7];case 21:return kn(tn(M)),b==null||b(lt),ra=Cn.uploadFinished,gi&&Fn(ra(Ve-pn,pn)),setTimeout(function(){Sn(!1)},2e3),[2]}})})},Xt=function(){var K=wt.getExtFileInstanceList(zn);K&&K.forEach(function(M){(M.uploadStatus==="uploading"||M.uploadStatus==="preparing")&&(M.xhr!==null&&M.xhr!==void 0&&M.xhr.abort(),M.uploadStatus="aborted",M.uploadMessage="Upload was aborted by user")})},Pn=Bc(zn,h,x,y,S),tt=Pn[0],hi=Pn[1],bi=Pn[2],xi=Pn[3],Zt=_c(zn,x,!k&&!R);o.useEffect(function(){var K={maxFileSize:s,accept:r},M=Et(en,l?l-nt:1/0,K,c,l,P);kn(M)},[s,r,l,P]);var He=function(K,M){var te=an(W==="add"&&!M?an([],en,!0):[],K,!0);t?t(te):kn(te),ce&&!M&&jn(te)},yi=function(K){var M=K.target.files,te=xa(M);Qe&&(te=Kt(te),f&&(te=te.filter(function(Ve){return Ve.valid}))),Ln&&(te=wa(te)),Vs(Jn.current),He(te)},Kt=function(K){var M={maxFileSize:s,accept:r},te=nt;W==="replace"&&(te=0);var Ve=Et(K,l?l-te:1/0,M,c,l,P);return Ve};function wi(){!Ce||ee||we||(Yt(),vc(Jn.current))}var Ei=function(K){St(K),!ee&&Qn(!0)},Jt=function(K){ee||(St(K),Qn(!1))},Yt=function(){hc(Ht.current,Vt.current,x)},Qt=function(K){return hn(void 0,void 0,void 0,function(){var M,te;return bn(this,function(Ve){return jt(K),ee?[2]:we?[2]:(z||Yt(),Qn(!1),M=K.dataTransfer.files,te=xa(M),Qe&&(te=Kt(te),f&&(te=te.filter(function(pn){return pn.valid}))),Ln&&(te=wa(te)),He(te),[2])})})},at=function(){t?t([]):kn([])},it=function(){d?d():t?t(en.filter(function(K){return K.valid})):kn(en.filter(function(K){return K.valid}))},rt=tt?Yn&&O||ee?Ae(tt,"files-ui-root-border-hide"):tt:void 0,ea=rt?Ce&&!ee?Ae(rt,"clickable"):rt:void 0;return ea?o.createElement(o.Fragment,null,X==="before"&&o.createElement(Fa,{disabled:ee,abortButton:we?le:void 0,onAbort:Xt,deleteButton:fe,onDelete:we?void 0:at,uploadButton:!we&&!ce?ke:void 0,onUpload:ce?void 0:function(){return jn(en)},cleanButton:Qe&&!we&&!f?Ge:void 0,onClean:it,style:rn,className:on,top:!0}),o.createElement("div",I({style:w,className:ea},$,{onClick:wi,onDragOver:Ei,onDragLeave:O?void 0:Jt,onDrop:O?void 0:Qt}),!z&&o.createElement("div",{ref:Ht,className:"filesui-base-ripple-absolute",style:{borderRadius:w==null?void 0:w.borderRadius}},o.createElement("div",{ref:Vt,className:"filesui-base-ripple-relative"})),o.createElement(o.Fragment,null,oe?o.createElement(o.Fragment,null,Le?o.createElement(o.Fragment,null,Le):o.createElement(Nc,{firstClassName:hi,color:xe(x),style:mi,className:de,resetStyles:fi,borderRadius:fn,isUploading:we&&Z,onReset:!we&&En?at:void 0,maxFileSize:s&&N?s:void 0,maxFiles:l&&Oe?l:void 0,localization:P,urlPresent:Ln&&ne,onUploadStart:!ce&&!ke?function(){return jn(en)}:void 0,numberOfValidFiles:nt,onClean:!ln||we||Ge||f?void 0:(u||d)&&Qe?it:void 0})):o.createElement(o.Fragment,null)),o.createElement(gc,{label:C,localization:P},se),o.createElement(o.Fragment,null,Bt?o.createElement(o.Fragment,null,Bt):o.createElement(o.Fragment,null,H&&o.createElement(Ic,I({firstClassName:bi,borderRadius:fn,accept:r,message:we?vi:void 0,localization:P},Q)))),O&&o.createElement(Pc,{open:Yn,className:Yn?"".concat(Zt," dropzone-layer-drag"):Zt,onDragLeave:Jt,onDrop:Qt,style:{borderRadius:w==null?void 0:w.borderRadius}}),o.createElement(mc,{multiple:l?l>1:!0,accept:r||"",inputRef:Jn,onChange:yi}),o.createElement(xc,{open:ee,className:xi})),X==="after"&&o.createElement(Fa,{disabled:ee,abortButton:we?le:void 0,onAbort:Xt,deleteButton:fe,onDelete:we?void 0:at,uploadButton:!we&&!ce?ke:void 0,onUpload:ce?void 0:function(){return jn(en)},cleanButton:Qe&&!we&&!f?Ge:void 0,onClean:it,style:rn,className:on,top:!1})):o.createElement(o.Fragment,null)};ie(`@import url(https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,900);
.fui-avatar-main-container {
  width: 200px;
  height: 200px;
  position: relative;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.486);
  border-radius: 10px;
  font-family: "Poppins", sans-serif;
}
.fui-avatar-main-container.square {
  border-radius: 0px;
}
.fui-avatar-main-container.circle {
  border-radius: 50%;
}
.fui-avatar-main-container .fui-avatar-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.fui-avatar-main-container:hover .fui-avatar-label.hide {
  display: flex;
}
.fui-avatar-main-container .fui-avatar-label {
  margin: 0;
  overflow: hidden;
  background-color: rgba(128, 128, 128, 0.486);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
}
.fui-avatar-main-container .fui-avatar-label.hide {
  display: none;
}
.fui-avatar-main-container .fui-avatar-label:hover {
  background-color: rgba(71, 71, 71, 0.74);
  display: flex;
  cursor: pointer;
}`);var Zc=function(e){var n=e.size,t=e.color,a=e.style,i=e.radius,r=e.x,s=e.y,l=e.width,c=i||46,u=r||50,d=s||50,f=Ee(n),m=a||{};return o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"".concat(f,"px"),height:"".concat(f,"px"),style:m,viewBox:"0 0 100 100",preserveAspectRatio:"xMidYMid"},o.createElement("circle",{cx:"".concat(u),cy:"".concat(d),r:"".concat(c),fill:"none",stroke:t||"#14ff00",strokeWidth:"".concat(l||8,"px"),strokeDasharray:"164.93361431346415 100.97787143782138"},o.createElement("animateTransform",{attributeName:"transform",type:"rotate",repeatCount:"indefinite",dur:"1s",values:"0 ".concat(u," ").concat(u,";360 ").concat(u," ").concat(u),keyTimes:"0;1"})))};ie(`.files-ui-loader-container {
  background-color: rgba(0, 0, 0, 0.41);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.files-ui-loader-container.clickable {
  cursor: pointer;
}
.files-ui-loader-container:hover {
  background-color: rgba(0, 0, 0, 0.61);
}`);var ci=function(e){var n=e.children,t=e.className,a=e.style,i=e.size,r=e.onClick,s=i?Ee(i):void 0,l=r?"files-ui-loader-container clickable":"files-ui-loader-container",c=function(){r==null||r()};return o.createElement("div",{onClick:c,className:t?"".concat(l," ").concat(t):l,style:I(I({},a),{height:s,width:s})},n)},ui=function(e){var n=e.onClick,t=e.size;return o.createElement(ci,{onClick:n,size:t},o.createElement(o.Fragment,null,o.createElement(Zc,{size:t}),o.createElement("div",{style:{position:"absolute",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}},n&&o.createElement(On,{color:"rgba(255,255,255,0.75)",size:45,onClick:n}))))};ie(`.files-ui-layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}`);var Nn=function(e){var n=e.style,t=e.className,a=e.children,i=e.visible,r=Rt(e,["style","className","children","visible"]),s=Ae(t||"","files-ui-layer");return i?o.createElement("div",I({className:s,style:n},r),a):o.createElement(o.Fragment,null)},Kc={alt:"image-preview",smartImgFit:"orientation"};ie(`.fui-image-preview {
  position: relative;
  border-radius: 10px;
}`);var Ft=function(e){var n=ii(e,Kc),t=n.src,a=n.alt,i=n.width,r=n.height,s=n.onError,l=n.smartImgFit,c=n.style,u=n.className,d=o.useState([void 0,void 0]),f=d[0],m=f[0],g=f[1],p=d[1],v=o.useState(void 0),b=v[0],y=v[1],x=function(h){return hn(void 0,void 0,void 0,function(){var C;return bn(this,function(E){switch(E.label){case 0:return[4,Xa(h)];case 1:return C=E.sent(),S(C),[2]}})})},S=function(h){return hn(void 0,void 0,void 0,function(){var C,E,z;return bn(this,function(k){switch(k.label){case 0:return h===""||!h?[2]:(C=void 0,E=void 0,l?[3,1]:(E="100%",[3,4]));case 1:return k.trys.push([1,3,,4]),[4,gl(h)];case 2:return z=k.sent(),z==="landscape"?l==="orientation"?(C=void 0,E="100%"):(C="100%",E=void 0):l==="center"?(C=void 0,E="100%"):(C="100%",E=void 0),[3,4];case 3:return k.sent(),s==null||s(),[3,4];case 4:return r&&(C=r),i&&(E=i),p([C,E]),y(h),[2]}})})};o.useEffect(function(){if(t)if(typeof t=="string")S(t);else{var h=t.type?t.type.split("/")[0]:"octet";h==="image"?x(t):s==null||s()}},[t]);var w=function(h){s==null||s()};return o.createElement(o.Fragment,null,t&&b&&(m||g)&&o.createElement("img",{style:c||{},onClick:function(h){h.preventDefault()},width:g,height:m,src:b,alt:a,className:u,onError:w}))};ie(`@import url(https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,900);
.files-ui-file-card-main-container {
  border-radius: 8px;
  color: rgba(0, 0, 0, 0.858);
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100px;
  box-sizing: border-box;
  position: relative;
  font-size: 15px;
  font-weight: 400;
  width: 320px;
  font-family: "Poppins", sans-serif;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container {
  border-radius: 8px;
  overflow: hidden;
  width: 320px;
  box-sizing: border-box;
  height: 100px;
  box-sizing: border-box;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-icon-container {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-icon-container .file-card-icon-layer {
  box-sizing: border-box;
  position: absolute;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-icon-container .file-card-icon-layer img {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-icon-container .file-card-icon-layer.blur img {
  filter: blur(4px);
  width: 200%;
  height: 200%;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-icon-container .file-card-status-layer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 5px;
  box-sizing: border-box;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-data {
  padding-right: 10px;
  box-sizing: border-box;
  line-height: 19px;
  font-weight: 500;
  width: calc(100% - 100px);
  word-break: break-all;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-data.dark-mode {
  color: rgba(255, 255, 255, 0.7);
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-data .file-card-size {
  font-weight: 400;
  font-size: 0.9rem;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-data .file-card-name {
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-main-layer .file-card-icon-plus-data .file-card-data .file-card-name.not-allowed {
  background-color: rgba(180, 16, 16, 0.7);
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-upload-layer-container {
  cursor: default;
  display: flex;
  box-sizing: border-box;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.625), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 1em;
  position: relative;
  overflow: hidden;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container {
  cursor: default;
  display: flex;
  box-sizing: border-box;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 1em;
  overflow: hidden;
  align-items: center;
  justify-content: flex-end;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container .file-card-file-info {
  width: calc(100% - 100px);
  height: 100px;
  text-align: left;
  scrollbar-width: thin;
  overflow: auto;
  scrollbar-color: rgba(100, 108, 127, 0.662745098) transparent;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container .file-card-file-info::-webkit-scrollbar {
  width: 9px;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container .file-card-file-info::-webkit-scrollbar-track {
  background: transparent;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container .file-card-file-info::-webkit-scrollbar-thumb {
  background-color: rgba(100, 108, 127, 0.662745098);
  border-radius: 20px;
  border: transparent;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container .file-card-file-info .files-ui-file-card-info-layer-header {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /*  position: absolute;
  top: 5;
  right: 5; */
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container .file-card-file-info .heading {
  font-weight: 600;
  padding: 0 5px;
}
.files-ui-file-card-main-container .files-ui-file-card-main-layer-container .file-card-info-layer-container .file-card-file-info .label {
  padding: 0 5px;
  font-weight: 399;
}
.files-ui-file-card-main-container.clickable {
  cursor: pointer;
}

/* .files-ui-file-icon {
  font-size: 0.7rem;
  min-width: 19px;
  min-height: 19px;
  margin: 0;
  padding: 2px 2px;
  border-radius: 50%;
  background-color: rgba(32, 33, 36, 0.65);
  word-break: break-word;
  box-sizing: content-box;
  &:hover {
    background-color: rgba(32, 33, 36, 0.85);
  }
  &.dark-mode {
    background-color: rgba(154, 160, 166, 0.65);
    &:hover {
      background-color: rgba(154, 160, 166, 0.85);
    }
  }
} */`);ie(`.files-ui-file-icon {
  font-size: 0.7rem;
  min-width: 19px;
  min-height: 19px;
  margin: 0;
  padding: 2px 2px;
  border-radius: 50%;
  background-color: rgba(32, 33, 36, 0.65);
  word-break: break-word;
  box-sizing: content-box;
}
.files-ui-file-icon:hover {
  background-color: rgba(32, 33, 36, 0.85);
}
.files-ui-file-icon.dark-mode {
  background-color: rgba(154, 160, 166, 0.65);
}
.files-ui-file-icon.dark-mode:hover {
  background-color: rgba(154, 160, 166, 0.85);
}`);ie(`.files-ui-file-card-main-container.dark-mode {
  color: rgba(255, 255, 255, 0.7);
  background-color: #121212;
}
.files-ui-file-card-main-container.dark-mode.elevation-0 {
  background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
}
.files-ui-file-card-main-container.dark-mode.elevation-1 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05));
}
.files-ui-file-card-main-container.dark-mode.elevation-2 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07));
}
.files-ui-file-card-main-container.dark-mode.elevation-3 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08));
}
.files-ui-file-card-main-container.dark-mode.elevation-4 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09));
}
.files-ui-file-card-main-container.dark-mode.elevation-5 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1));
}
.files-ui-file-card-main-container.dark-mode.elevation-6 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11));
}
.files-ui-file-card-main-container.dark-mode.elevation-7 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11));
}
.files-ui-file-card-main-container.dark-mode.elevation-8 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12));
}
.files-ui-file-card-main-container.dark-mode.elevation-9 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.12));
}
.files-ui-file-card-main-container.dark-mode.elevation-10 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.13));
}
.files-ui-file-card-main-container.dark-mode.elevation-11 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.13));
}
.files-ui-file-card-main-container.dark-mode.elevation-12 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.14));
}
.files-ui-file-card-main-container.dark-mode.elevation-13 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.14));
}
.files-ui-file-card-main-container.dark-mode.elevation-14 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.14));
}
.files-ui-file-card-main-container.dark-mode.elevation-15 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.14));
}
.files-ui-file-card-main-container.dark-mode.elevation-16 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.15));
}
.files-ui-file-card-main-container.dark-mode.elevation-17 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.15));
}
.files-ui-file-card-main-container.dark-mode.elevation-18 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.13), rgba(255, 255, 255, 0.15));
}
.files-ui-file-card-main-container.dark-mode.elevation-19 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15));
}
.files-ui-file-card-main-container.dark-mode.elevation-20 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
}
.files-ui-file-card-main-container.dark-mode.elevation-21 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
}
.files-ui-file-card-main-container.dark-mode.elevation-22 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
}
.files-ui-file-card-main-container.dark-mode.elevation-23 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
}
.files-ui-file-card-main-container.dark-mode.elevation-24 {
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16));
}
.files-ui-file-card-main-container.elevation-0 {
  box-shadow: none;
}
.files-ui-file-card-main-container.elevation-1 {
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-2 {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-3 {
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-4 {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-5 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-6 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-7 {
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-8 {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-9 {
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-10 {
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-11 {
  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-12 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-13 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-14 {
  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-15 {
  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-16 {
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-17 {
  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-18 {
  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-19 {
  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-20 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-21 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-22 {
  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-23 {
  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12);
}
.files-ui-file-card-main-container.elevation-24 {
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}`);ie(`.file-card-right-layer-header {
  margin-top: 3px;
  margin-right: 3px;
  position: absolute;
  top: 0;
  right: 0;
  left: unset;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
}

.file-card-right-layer-footer {
  margin-bottom: 3px;
  margin-right: 3px;
  left: unset;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  bottom: 0;
  right: 0;
}`);var Jc=function(e){var n=e.localization,t=e.size,a=dn(n).status;return o.createElement(o.Fragment,null,o.createElement(si,{color:"#f44336",size:t||65}),o.createElement("span",null," ",a.aborted))},Yc=function(e){var n=e.height,t=n?typeof n=="number"?"".concat(n,"px"):n:"132px";return o.createElement(o.Fragment,null,o.createElement("div",{style:{width:"100%",height:t}}))},Qc=function(e){var n=e.localization,t=e.size,a=dn(n).status;return o.createElement(o.Fragment,null,o.createElement(On,{color:"rgba(255,255,255,0.4)",style:{backgroundColor:"rgba(244, 67, 54, 0.8)",borderRadius:"50%"},size:t||65}),o.createElement("span",null," ",a.error))},eu=function(e){var n=e.onCancel,t=e.localization,a=e.size,i=dn(t).status;return o.createElement(o.Fragment,null,o.createElement(ui,{onClick:n,size:a||65}),o.createElement("span",null,i.preparing))},nu=function(e){var n=e.localization,t=e.size,a=dn(n).status;return o.createElement(o.Fragment,null,o.createElement(li,{color:"#4caf50",size:t||65}),o.createElement("span",null," ",a.success))};ie(`text.files-ui-text-dynamic-loader {
  text-anchor: middle;
  font-size: 1em;
  fill: aliceblue;
}`);var tu=function(e){var n=e.size,t=e.color,a=e.style,i=e.percentage,r=e.hidePerncentage,s=e.radius,l=e.x,c=e.y,u=e.width,d=e.onClick,f=s||28,m=l||30,g=c||30,p=Ee(n),v=a||{},b=o.useRef(null);function y(x,S,w){S.style.strokeDashoffset="".concat(w*(1-x/100))}return o.useEffect(function(){var x=b.current;if(x!=null&&i!==void 0){var S=2*Math.PI*x.r.baseVal.value;x.style.strokeDasharray="".concat(S," 1000"),y(i>=100?100:i,x,S)}},[i]),i!==void 0?o.createElement(ci,{size:n},o.createElement(o.Fragment,null,o.createElement("svg",{className:"dui_svg_circle_loader",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:"".concat(p,"px"),height:"".concat(p,"px"),style:v},o.createElement("circle",{style:{transform:"rotate(-90deg)",transformOrigin:"center"},stroke:t||"#14ff00",cx:"".concat(m),cy:"".concat(g),r:"".concat(f),strokeWidth:"".concat(u||8,"px"),id:"circle",ref:b,fill:"none"}),!r&&i!==void 0&&o.createElement("text",{className:"files-ui-text-dynamic-loader",x:"".concat(m),y:"".concat(m*7/6)},"".concat(i.toFixed(0)," %"))),d&&o.createElement("div",{style:{position:"absolute",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}},o.createElement(On,{color:"rgba(255,255,255,0.75)",size:45,onClick:d})))):o.createElement(o.Fragment,null)};ie(`.lds-colorbar {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
}
.lds-colorbar .files-ui-text-default-loader {
  font-size: 1.5rem;
  font-weight: 400;
  text-anchor: middle;
}`);var au=function(e){var n=e.localization,t=e.size,a=e.onAbort,i=e.progress,r=dn(n).status;return o.createElement(o.Fragment,null,i!==void 0?o.createElement(tu,{size:70,x:35,y:35,radius:32,percentage:i,width:6,hidePerncentage:i===void 0||a!==void 0,onClick:a}):o.createElement(ui,{onClick:a,size:t||70}),o.createElement("span",null," ",r.uploading))};ie(`.files-ui-file-card-upload-layer {
  width: 100px;
  height: 100%;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 1em;
  position: relative;
  overflow: hidden;
}
.files-ui-file-card-upload-layer .elevation-list-card {
  transition: all 1.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.files-ui-file-card-upload-layer .elevation-list-card .elevation-item-card {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
}
.files-ui-file-card-upload-layer .elevation-list-card .elevation-item-card span {
  text-align: center;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}`);ie(`.files-ui-tooltip {
  cursor: default;
  position: relative;
}
.files-ui-tooltip:hover {
  z-index: 2;
}
.files-ui-tooltip:hover .files-ui-tooltiptext {
  visibility: visible;
  opacity: 1;
  z-index: 2;
}
.files-ui-tooltip.card:hover {
  z-index: 2;
}
.files-ui-tooltip.card:hover .files-ui-tooltiptext {
  visibility: visible;
  opacity: 1;
  z-index: 2;
}
.files-ui-tooltip.card .files-ui-tooltiptext {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  visibility: hidden;
  width: 200px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 2px 2px;
  position: absolute;
  z-index: 2;
  left: calc(50% - 100px);
  left: 0;
  margin-top: 5px;
  top: 100%;
  opacity: 0;
  transition: opacity 1s;
}
.files-ui-tooltip.card .files-ui-tooltiptext.not-valid-error {
  background: linear-gradient(to top, #c62828, #d32f2f);
}
.files-ui-tooltip.card .files-ui-tooltiptext.not-valid-error::after {
  border-color: transparent transparent #d32f2f transparent;
}
.files-ui-tooltip.card .files-ui-tooltiptext.success {
  background: linear-gradient(to top, #1b5e20, #2e7d32);
}
.files-ui-tooltip.card .files-ui-tooltiptext.success::after {
  border-color: transparent transparent #2e7d32 transparent;
}
.files-ui-tooltip.card .files-ui-tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
}
.files-ui-tooltip .files-ui-tooltiptext {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-size: 0.8rem;
  font-weight: 400;
  visibility: hidden;
  width: 132px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 2px 2px;
  position: absolute;
  z-index: 2;
  left: 0;
  opacity: 0;
  transition: opacity 1s;
}
.files-ui-tooltip .files-ui-tooltiptext.not-valid-error {
  background: linear-gradient(to top, #c62828, #d32f2f);
}
.files-ui-tooltip .files-ui-tooltiptext.not-valid-error::after {
  border-color: transparent transparent #d32f2f transparent;
}
.files-ui-tooltip .files-ui-tooltiptext.success {
  background: linear-gradient(to top, #1b5e20, #2e7d32);
}
.files-ui-tooltip .files-ui-tooltiptext.success::after {
  border-color: transparent transparent #2e7d32 transparent;
}
.files-ui-tooltip .files-ui-tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
}`);var iu=function(e){var n=e.uploadStatus,t=e.valid,a=e.errors,i=e.uploadMessage,r=e.open,s=o.useState(void 0),l=s[0],c=s[1],u=o.useState(void 0),d=u[0],f=u[1],m=function(g,p){g!==void 0?(f(i),c(g==="success"?"success":"not-valid-error")):p!==void 0&&(p||(c("not-valid-error"),f(a?a.reduce(function(v,b){return v+="".concat(b,". "),v},""):"")))};return o.useEffect(function(){m(n,t)},[n,t]),o.createElement(o.Fragment,null,r&&d&&l&&o.createElement("span",{className:"files-ui-tooltiptext ".concat(l)},d))},ru=function(e){var n=e.downloadUrl,t=e.anchorRef,a=e.fileName;function i(r){r.stopPropagation()}return n?o.createElement("a",{ref:t,target:"_blank",href:n,download:a,hidden:!0,rel:"noopener noreferrer",onClick:i},"download_file"):o.createElement(o.Fragment,null)};ie(`@import url(https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,900);
.files-ui-file-mosaic-main-container {
  width: 132px;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: 400;
  word-break: break-word;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container {
  width: 132px;
  height: 132px;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-image-layer {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-image-layer img {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-image-layer.blur img {
  filter: blur(4px);
  width: 200%;
  height: 200%;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-main-layer {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-main-layer .file-mosaic-main-layer-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-main-layer .file-mosaic-main-layer-footer {
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: row;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-main-layer .file-mosaic-main-layer-footer .file-mosaic-footer-right {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-main-layer .file-mosaic-main-layer-footer .file-mosaic-footer-left {
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: center;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-info-layer {
  position: absolute;
  left: 0;
  right: 0;
  text-align: left;
  scrollbar-width: thin;
  line-height: 1.5;
  letter-spacing: 0.02857em;
  font-family: "Poppins", sans-serif;
  width: inherit;
  background-color: rgba(0, 0, 0, 0.85);
  word-break: break-word;
  height: 100%;
  width: 100%;
  font-size: 0.8rem;
  transition: all 0.5s ease 0s;
  overflow: auto;
  color: white;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-info-layer::-webkit-scrollbar {
  width: 9px;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-info-layer::-webkit-scrollbar-track {
  background: transparent;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-info-layer::-webkit-scrollbar-thumb {
  background-color: rgba(100, 108, 127, 0.662745098);
  border-radius: 20px;
  border: transparent;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-info-layer .files-ui-file-mosaic-info-layer-header {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-info-layer .heading {
  font-weight: 600;
  padding: 0 5px;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-icon-layer-container .files-ui-file-mosaic-info-layer .label {
  padding: 0 5px;
  font-weight: 399;
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-file-name {
  margin-top: 1px;
  height: 31px;
  text-align: center;
  width: 100%;
  color: black;
  font-size: 0.95em;
  box-sizing: border-box;
  line-height: 15px;
  font-weight: 400;
  letter-spacing: 0.07rem;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  /*  display: flex;
   align-items: center;
   justify-content: center; */
}
.files-ui-file-mosaic-main-container .files-ui-file-mosaic-file-name.dark-mode {
  color: rgba(255, 255, 255, 0.7);
}
.files-ui-file-mosaic-main-container.clickable {
  cursor: pointer;
}

/* .files-ui-file-icon {
  font-size: 0.7rem;
  min-width: 19px;
  min-height: 19px;
  margin: 0;
  padding: 2px 2px;
  border-radius: 50%;
  background-color: rgba(32, 33, 36, 0.65);
  word-break: break-word;
  box-sizing: content-box;
  &:hover {
    background-color: rgba(32, 33, 36, 0.85);
  }
  &.dark-mode {
    background-color: rgba(154, 160, 166, 0.65);
    &:hover {
      background-color: rgba(154, 160, 166, 0.85);
    }
  }
}
 */`);ie(`.files-ui-layer-container {
  position: relative;
}`);var ou=function(e){var n=e.style,t=e.className,a=e.children,i=Ae(t||"","files-ui-layer-container");return o.createElement("div",{className:i,style:n},a)},lu=function(e){var n=e.fileName;return n?o.createElement("span",null,n):o.createElement(o.Fragment,null)};ie(`.files-ui-file-mosaic-upload-layer {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 1em;
  position: relative;
  overflow: hidden;
}
.files-ui-file-mosaic-upload-layer .elevation-list {
  transition: all 1.5s ease;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.files-ui-file-mosaic-upload-layer .elevation-list .elevation-item {
  width: 100%;
  height: 132px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
}
.files-ui-file-mosaic-upload-layer .elevation-list .elevation-item span {
  text-align: center;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}`);var su=function(e){var n=e.uploadStatus,t=e.onCancel,a=e.onAbort,i=e.progress,r=e.localization,s=o.useRef(null),l=o.useRef(null),c=o.useState([void 0]),u=c[0],d=c[1];o.useEffect(function(){d(function(m){if(m[m.length-1]==="preparing"&&n==="uploading"){var g=an([],m,!0);return g[m.length-1]=n,an([],g,!0)}return an(an([],m,!0),[n],!1)})},[n]);var f=function(){var m=s.current,g=l.current;m===null||g===null||(g.style.top=0-(u.length-1)*132+"px")};return o.useEffect(function(){u.length>1&&f()},[u.length]),o.createElement("div",{className:"elevation-layer-container",ref:s},o.createElement("div",{className:"elevation-list",ref:l},u.map(function(m,g){switch(m){case"preparing":return o.createElement("div",{className:"elevation-item",key:g+1},o.createElement(eu,{onCancel:t,localization:r}));case"uploading":return o.createElement("div",{className:"elevation-item",key:g+1},o.createElement(au,{onAbort:a,progress:i,localization:r}));case"error":return o.createElement("div",{className:"elevation-item",key:g+1},o.createElement(Qc,{localization:r}));case"success":return o.createElement("div",{className:"elevation-item",key:g+1},o.createElement(nu,{localization:r}));case"aborted":return o.createElement("div",{className:"elevation-item",key:g+1},o.createElement(Jc,{localization:r}));default:return o.createElement("div",{className:"elevation-item",key:g+1},o.createElement(Yc,null))}})))},za=function(e){var n=e.imageSource,t=e.url,a=e.fileName,i=e.card,r=e.isBlur,s=e.smartImgFit,l=o.useState(void 0),c=l[0],u=l[1],d=o.useState(!1),f=d[0],m=d[1];o.useEffect(function(){u(n||t)},[n,t]);var g=function(){m(!0),u(t)};return r?o.createElement(o.Fragment,null,!i&&!f&&n&&o.createElement(Ft,{src:c,alt:"blur ".concat(a),smartImgFit:!1})):o.createElement(o.Fragment,null,o.createElement(Ft,{onError:g,src:c,style:{borderRadius:"0px"},alt:"preview ".concat(a),smartImgFit:s}))};ie(`.files-ui-file-item-status-container {
  text-align: center;
  font-size: 0.8rem;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 4px;
  padding: 0.5px;
  font-weight: 400;
}
.files-ui-file-item-status-container.file-status-error {
  color: #f44336;
}
.files-ui-file-item-status-container.file-status-ok {
  color: #5c7a1f;
}
.files-ui-file-item-status-container.file-status-loading {
  position: relative;
  display: flex;
  color: #8b6b10;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.7);
}
.files-ui-file-item-status-container.file-status-loading.percentage {
  padding: 7px 4px 2px 5px;
}
.files-ui-file-item-status-container.file-status-loading .abort-button {
  position: absolute;
  right: -2px;
  top: -2px;
}
.files-ui-file-item-status-container.file-status-loading .uploading-text.up {
  margin-bottom: -22px;
}
.files-ui-file-item-status-container.file-status-loading .uploading-text.down {
  margin-top: -20px;
}
.files-ui-file-item-status-container.file-status-loading .uploading-text p.percentage {
  font-weight: 500;
}`);var di=function(e){var n=e.valid,t=e.uploadStatus,a=e.localization,i=e.style,r=dn(a).status;return t==="success"?o.createElement("div",{className:"files-ui-file-item-status-container file-status-ok",style:i},o.createElement(wc,{color:"#4caf50",size:"small",className:"status-icon"}),r.success):t==="error"||t==="aborted"?o.createElement("div",{className:"files-ui-file-item-status-container file-status-error",style:i},o.createElement(zc,{color:"#f44336",size:"semi-medium",className:"status-icon"}),r.error):n!=null?n?o.createElement("div",{className:"files-ui-file-item-status-container file-status-ok",style:i},o.createElement(li,{color:"#4caf50",size:"small",className:"status-icon"}),r.valid):o.createElement("div",{className:"files-ui-file-item-status-container file-status-error",style:i},o.createElement(si,{color:"#f44336",size:"small",className:"status-icon"}),r.denied):o.createElement(o.Fragment,null)},cu=function(e){var n=e.valid,t=e.localization,a=e.onCloseInfo,i=e.uploadStatus,r=e.localName,s=e.sizeFormatted,l=e.localType,c=dn(t),u=c.fullInfoLayer,d=u.name,f=u.size,m=u.type;return o.createElement(o.Fragment,null,o.createElement("div",{className:"files-ui-file-mosaic-info-layer-header"},o.createElement(oi,{color:"rgba(255,255,255,0.8)",onClick:a,colorFill:"black"}),o.createElement(di,{valid:n,uploadStatus:i,localization:t})),o.createElement("div",{className:"heading"},d),o.createElement("div",{className:"label"},r),o.createElement("div",{className:"heading"},f),o.createElement("div",{className:"label"},s),o.createElement("div",{className:"heading"},m),o.createElement("div",{className:"label"},l))};ie(`.filesui-file-item-size {
  box-sizing: border-box;
  font-size: 0.7rem;
  border: 0.5px solid wheat;
  text-align: center;
  color: rgba(255, 255, 255, 0.89);
  padding: 2px 1.5px;
  border-radius: 7px;
  background-color: rgba(32, 33, 36, 0.75);
  min-width: 45px;
  word-break: break-word;
  font-family: inherit;
}
.filesui-file-item-size:hover {
  background-color: rgba(32, 33, 36, 0.85);
  color: rgba(255, 255, 255, 0.97);
}`);var uu=function(e){var n=e.sizeFormatted;return o.createElement(o.Fragment,null,n&&o.createElement("div",{className:"filesui-file-item-size"},n))},du=function(e){var n=e.darkMode,t=e.deleteIcon,a=e.downloadIcon,i=e.imageIcon,r=e.infoIcon,s=e.onDelete,l=e.onDownload,c=e.onOpenInfo,u=e.onSee,d=e.onWatch,f=e.sizeFormatted,m=e.valid,g=e.videoIcon,p=e.localization,v=e.uploadStatus,b=e.isActive;return o.createElement(o.Fragment,null,o.createElement("div",{className:"file-mosaic-main-layer-header"},b&&t&&o.createElement(On,{className:n?"files-ui-file-icon dark-mode":"files-ui-file-icon",color:n?"#121212":"rgba(255,255,255,0.851)",onClick:s,size:"small",colorFill:"transparent"})),o.createElement("div",{className:"file-mosaic-main-layer-footer"},o.createElement("div",{className:"file-mosaic-footer-left"},o.createElement(di,{valid:m,uploadStatus:v,localization:p}),b&&f&&o.createElement(uu,{sizeFormatted:f})),o.createElement("div",{className:"file-mosaic-footer-right"},b&&o.createElement(o.Fragment,null,i&&o.createElement($c,{className:n?"files-ui-file-icon dark-mode":"files-ui-file-icon",color:n?"#121212":"rgba(255,255,255,0.851)",onClick:u,size:"small"}),g&&o.createElement(Sc,{className:n?"files-ui-file-icon dark-mode":"files-ui-file-icon",color:n?"#121212":"rgba(255,255,255,0.851)",onClick:d,size:"small"}),a&&o.createElement(Ec,{className:n?"files-ui-file-icon dark-mode":"files-ui-file-icon",color:n?"#121212":"rgba(255,255,255,0.851)",onClick:l,size:"small"}),r&&o.createElement(Cc,{className:n?"files-ui-file-icon dark-mode":"files-ui-file-icon",onClick:c,color:n?"#121212":"rgba(255,255,255,0.851)",size:"micro"})))))},fu=function(e){var n=e.style,t=e.className,a=e.file,i=e.name,r=e.size,s=e.type,l=e.id,c=e.valid,u=e.errors,d=e.uploadStatus,f=e.uploadMessage,m=e.progress,g=e.xhr,p=e.localization,v=e.preview,b=e.imageUrl,y=e.videoUrl,x=e.info,S=e.backgroundBlurImage,w=S===void 0?!0:S,h=e.darkMode,C=e.alwaysActive,E=C===void 0?!0:C,z=e.resultOnTooltip,k=z===void 0?!0:z,R=e.downloadUrl,A=e.onDelete,O=e.onCancel,oe=e.onAbort,H=e.onDownload,re=e.onSee,L=e.onWatch,U=e.onDoubleClick,Q=e.onClick,ee=e.onRightClick,Ce=e.smartImgFit,W=Ce===void 0?"orientation":Ce,se=o.useContext(Pt),$=se.darkMode,G=se.icons,P=se.localization,V=p!==void 0?p:P,pe=h!==void 0?h:$,me=o.useRef(null),De=Ae(Ae("files-ui-file-mosaic-main-container files-ui-tooltip",t),Q?"clickable":void 0),ae=pe?"files-ui-file-mosaic-file-name dark-mode":"files-ui-file-mosaic-file-name",ge=Ws(a,i,s,r),ye=ge[0],q=ge[1],J=ge[2],ve=Wc(m,g),ce=Hc(a,i,s,c,v,b,y,G),Te=ce[0],Re=ce[1],_e=ce[2],Se=ce[3],X=ce[4],le=ce[5],fe=We(J),ke=o.useState(!1),Ge=ke[0],rn=ke[1],on=o.useState(!1),fn=on[0],Xe=on[1],ln=function(){E||Xe(!0)},mn=function(){E||Xe(!1)},En=function(){return A==null?void 0:A(l)},sn=function(){return rn(!0)},N=function(){return rn(!1)},j=qc(d);o.useEffect(function(){j&&Ge&&N()},[j]);function ne(de){de.stopPropagation(),Q==null||Q(de)}var D=function(de){de.preventDefault(),U==null||U(de)};function Z(de){ee==null||ee(de)}var ue=function(){var de=me.current;de&&de.click()},Oe=function(){H?H==null||H(l,R):typeof R=="string"&&ue()},Le=function(){g==null||g.abort(),oe==null||oe(l)};return Te?o.createElement("div",{className:De,style:n,onClick:ne,onMouseEnter:ln,onMouseLeave:mn,onDoubleClick:D,onContextMenu:Z},o.createElement(ou,{className:"files-ui-file-mosaic-icon-layer-container",style:n},o.createElement(Nn,{className:"files-ui-file-mosaic-image-layer blur",visible:w},o.createElement(za,{imageSource:X,url:Se,fileName:ye,isBlur:!0,smartImgFit:!1})),o.createElement(Nn,{className:"files-ui-file-mosaic-image-layer",visible:!0},o.createElement(za,{imageSource:X,url:Se,fileName:ye,isBlur:!1,smartImgFit:W})),o.createElement(Nn,{className:"files-ui-file-mosaic-main-layer",visible:!j&&!Ge},o.createElement(du,{deleteIcon:A!==void 0,onDelete:En,darkMode:pe,valid:c,uploadStatus:d,localization:V,sizeFormatted:fe,imageIcon:Re&&re!==void 0,onSee:function(){return re==null?void 0:re(X)},videoIcon:_e&&L!==void 0,onWatch:function(){return L==null?void 0:L(le)},downloadIcon:H!==void 0||R!==void 0,onDownload:Oe,infoIcon:x!==void 0,onOpenInfo:sn,isActive:E||fn})),o.createElement(Nn,{className:"files-ui-file-mosaic-info-layer",visible:Ge,onClick:Ue},o.createElement(cu,{onCloseInfo:N,valid:c,localization:V,localName:ye,sizeFormatted:fe,localType:q})),o.createElement(Nn,{className:"files-ui-file-mosaic-upload-layer",visible:j,onClick:Ue},o.createElement(su,{uploadStatus:d,progress:ve,onCancel:O?function(){return O==null?void 0:O(l)}:void 0,onAbort:oe?Le:void 0,localization:V}))),o.createElement("div",{className:ae},o.createElement(lu,{fileName:ye})),o.createElement(iu,{open:k,uploadStatus:d,valid:c,errors:u,uploadMessage:f}),o.createElement(ru,{fileName:ye,anchorRef:me,downloadUrl:R})):o.createElement(o.Fragment,null)};ie(`.fui-fullscreen-container {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.734);
  transform: translate(100%);
  transition: transform 0.2s ease-in-out;
  margin: 0 !important;
  z-index: 4000;
  box-sizing: border-box;
}
.fui-fullscreen-container.show-fs {
  transform: translate(0);
}

.fui-fullscreen-relative-container {
  position: relative;
  width: 90%;
  height: 90%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /*   @media (max-width: 600px) {
    width: 80%;
    height: auto;
  }*/
}
.fui-fullscreen-relative-container img {
  height: 100%;
  width: auto;
}
.fui-fullscreen-relative-container video {
  height: 100%;
  width: auto;
}
@media (max-width: 960px) {
  .fui-fullscreen-relative-container {
    height: 90%;
    width: 100%;
  }
  .fui-fullscreen-relative-container video {
    height: auto;
    width: 100%;
  }
  .fui-fullscreen-relative-container img {
    height: auto;
    width: 100%;
  }
}

.button-full-screen {
  position: absolute;
  top: 0;
  right: 0;
}`);var mu=function(e){var n=e.open,t=e.onClose,a=e.children;function i(r){r.stopPropagation(),t==null||t()}return o.useEffect(function(){var r=function(s){s.key==="Escape"&&(t==null||t())};return document.addEventListener("keydown",r),function(){document.removeEventListener("keydown",r)}},[]),o.createElement("div",{className:n?"fui-fullscreen-container show-fs":"fui-fullscreen-container",onClick:i},n&&o.createElement("div",{className:"fui-fullscreen-relative-container",onClick:i},a),t&&o.createElement(On,{color:"rgba(255,255,255,0.8)",onClick:i,colorFill:"transparent",className:"button-full-screen",size:"extra-large"}))};function pu({handleChange:e,files:n}){const[t,a]=o.useState([]),[i,r]=o.useState(void 0);let s=[];o.useEffect(()=>{},[n]);const l=p=>{console.log("Incoming files:",p),a(p),e(p.map(v=>v.file))},c=p=>{a(t.filter(v=>v.id!==p)),t.map(v=>{s.push(n.file)}),e(s),s=[]},u=p=>{r(p)},d=p=>{console.log("advanced demo start upload",p)},f=p=>{console.log("advanced demo finish upload",p)},m=p=>{a(t.map(v=>v.id===p?{...v,uploadStatus:"aborted"}:{...v}))},g=p=>{a(t.map(v=>v.id===p?{...v,uploadStatus:void 0}:{...v}))};return T.jsxs(T.Fragment,{children:[T.jsx(Xc,{onChange:l,minHeight:"195px",value:t,maxFiles:5,maxFileSize:5*1024*1024,label:"Drag'n drop files here or click to browse",onUploadStart:d,onUploadFinish:f,children:t.map(p=>o.createElement(fu,{...p,key:p.id,onDelete:c,onSee:u,onAbort:m,onCancel:g,resultOnTooltip:!0,alwaysActive:!0,preview:!0,info:!0}))}),T.jsx(mu,{open:i!==void 0,onClose:()=>r(void 0),children:T.jsx(Ft,{src:i})})]})}const gu=({attachments:e,handleUpdate:n,handleDelete:t})=>e.length===0?null:T.jsxs("div",{id:"tour-attachment-list",style:{marginTop:"2.5rem"},children:[T.jsxs("h5",{style:{color:"#1e293b",fontWeight:"600",marginBottom:"1.25rem",fontSize:"15px"},children:["Uploaded Files (",e.length,")"]}),T.jsx(xt,{grid:{gutter:16,xs:1,sm:2,md:3},dataSource:e,renderItem:({name:a,base64:i},r)=>T.jsx(xt.Item,{children:T.jsx(fa,{hoverable:!0,style:{borderRadius:"12px",overflow:"hidden",border:"1px solid #e2e8f0",boxShadow:"0 2px 8px rgba(0, 0, 0, 0.02)",transition:"all 0.3s ease"},bodyStyle:{padding:"12px"},cover:T.jsx("div",{style:{position:"relative",height:"160px",backgroundColor:"#f8fafc",borderBottom:"1px solid #e2e8f0"},children:T.jsx("img",{alt:a||`Attachment ${r}`,src:i,style:{width:"100%",height:"100%",objectFit:"cover"}})}),actions:[T.jsx(Dt,{showUploadList:!1,customRequest:({file:s})=>n(r,s),children:T.jsx(Mn,{type:"text",icon:T.jsx(vo,{style:{color:"#0284c7"}}),style:{width:"100%"},children:"Replace"})}),T.jsx(Mn,{type:"text",danger:!0,icon:T.jsx(qa,{}),onClick:()=>t(r),style:{width:"100%"},children:"Delete"})],children:T.jsx(fa.Meta,{title:T.jsx("span",{style:{fontSize:"14px",fontWeight:"600",color:"#0f172a"},children:a||`Attachment ${r+1}`}),description:T.jsxs("span",{style:{fontSize:"11px",color:"#94a3b8"},children:["File #",r+1]})})})})})]}),Du=({onFileChange:e=()=>{},onDone:n=()=>{}})=>{const[t,a]=o.useState([]);o.useEffect(()=>{const d=JSON.parse(localStorage.getItem("attachments"))||[];console.log("Files retrieved from local storage:",d),d.length>0?a(d):console.log("No files found in local storage.")},[]);const i=o.useCallback(d=>new Promise((f,m)=>{const g=new FileReader;g.onloadend=()=>f({name:d.name,base64:g.result}),g.onerror=m,g.readAsDataURL(d)}),[]),r=o.useCallback(async d=>{const f=Array.from(d),m=await Promise.all(f.map(i));a(g=>{const p=[...g,...m];return localStorage.setItem("attachments",JSON.stringify(p)),p}),e(f)},[i,e]),s=o.useCallback((d,f)=>{i(f).then(({base64:m})=>{a(g=>{const p=g.map((v,b)=>b===d?{...v,base64:m}:v);return localStorage.setItem("attachments",JSON.stringify(p)),p})})},[i]),l=o.useCallback(d=>{gr.confirm({title:"Are you sure you want to delete this attachment?",onOk:()=>{a(f=>{const m=f.filter((g,p)=>p!==d);return localStorage.setItem("attachments",JSON.stringify(m)),m})}})},[]),c=o.useCallback(()=>{Va.success({message:"Success",description:"Attachments have been saved successfully!"}),n(t)},[t,n]),u=o.useMemo(()=>t.map(({name:d})=>({name:d,size:0,type:"application/octet-stream"})),[t]);return T.jsx(ki,{children:T.jsx("div",{style:{padding:"1rem",maxWidth:"900px",margin:"0 auto"},children:T.jsxs("div",{style:{backgroundColor:"#ffffff",borderRadius:"16px",padding:"2.5rem",boxShadow:"0 8px 30px rgba(0, 0, 0, 0.04)",border:"1px solid #f1f5f9"},children:[T.jsxs("div",{id:"tour-attachment-header",style:{borderBottom:"1px solid #f1f5f9",paddingBottom:"1.5rem",marginBottom:"2rem"},children:[T.jsx("h4",{style:{color:"#0f172a",fontWeight:"700",margin:0},children:"Medical Documents & Attachments"}),T.jsx("p",{style:{color:"#64748b",fontSize:"14px",margin:"6px 0 0 0"},children:"Upload and manage your clinical reports, prescriptions, or other documents securely."})]}),T.jsx("div",{className:"row",children:T.jsxs("div",{className:"col-md-12",children:[T.jsxs("div",{id:"tour-attachment-dropzone",style:{marginBottom:"2rem"},children:[T.jsx(pu,{handleChange:r,files:u}),T.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"1.5rem"},children:T.jsx(Mn,{id:"tour-attachment-save",onClick:c,type:"primary",size:"large",style:{borderRadius:"8px",fontWeight:"600",padding:"0 2.5rem",height:"42px",boxShadow:"0 4px 12px rgba(24, 144, 255, 0.15)"},children:"Done / Save Files"})})]}),T.jsx(gu,{attachments:t,handleUpdate:s,handleDelete:l})]})})]})})})};export{Du as default};
