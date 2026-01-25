var q=Object.defineProperty;var J=(r,n,o)=>n in r?q(r,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[n]=o;var R=(r,n,o)=>(J(r,typeof n!="symbol"?n+"":n,o),o);import{j as e,u as Z,a as Q,D as ee,H as te}from"./dnd-25f93b49.js";import{a as re,r as v,R as W}from"./vendor-57209f9c.js";import{C as O,a as oe,B as H,T as ne,S as ae,b as ie,G as se,I as le,A as de,c as ce,d as ue,e as pe,f as he,M as xe,g as ge,h as me,i as ye,j as Y,X as fe,U as be,R as ve,E as we,k as Se,l as Ce,m as ke,D as je,n as Ee,o as Ie,p as Ne,P as $e}from"./icons-46830122.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const m of s.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();var A={},M=re;A.createRoot=M.createRoot,A.hydrateRoot=M.hydrateRoot;const Te=[{type:"label",name:"Label",description:"Static text display",category:"text-display",icon:"Type",defaultSize:{width:100,height:30},defaultProperties:{text:"Label",fontSize:14,color:"#374151",backgroundColor:"transparent",textAlign:"left"},propertySchema:[{key:"text",label:"Text",type:"text",default:"Label",group:"Content"},{key:"fontSize",label:"Font Size",type:"number",min:8,max:72,default:14,group:"Style"},{key:"fontWeight",label:"Font Weight",type:"select",options:["normal","bold"],default:"normal",group:"Style"},{key:"color",label:"Text Color",type:"color",default:"#374151",group:"Style"},{key:"textAlign",label:"Alignment",type:"select",options:["left","center","right"],default:"left",group:"Style"}],codeTemplate:'tft.setTextColor({color}); tft.setCursor({x}, {y}); tft.print("{text}");',phase:1},{type:"dynamic-label",name:"Dynamic Label",description:"Text with live data binding",category:"text-display",icon:"Activity",defaultSize:{width:120,height:30},defaultProperties:{text:"${value}",fontSize:14,color:"#0EA5E9",units:"",precision:1},propertySchema:[{key:"text",label:"Format",type:"text",default:"${value}",description:"Use ${value} for data",group:"Content"},{key:"units",label:"Units",type:"text",default:"",group:"Content"},{key:"precision",label:"Decimal Places",type:"number",min:0,max:5,default:1,group:"Content"},{key:"fontSize",label:"Font Size",type:"number",min:8,max:72,default:14,group:"Style"},{key:"color",label:"Text Color",type:"color",default:"#0EA5E9",group:"Style"}],codeTemplate:'tft.setTextColor({color}); tft.setCursor({x}, {y}); tft.print(String({value}, {precision}) + "{units}");',phase:1},{type:"button",name:"Button",description:"Interactive button",category:"input-control",icon:"Square",defaultSize:{width:80,height:40},defaultProperties:{text:"Button",fontSize:14,color:"#FFFFFF",backgroundColor:"#0EA5E9",borderRadius:6,enabled:!0},propertySchema:[{key:"text",label:"Text",type:"text",default:"Button",group:"Content"},{key:"fontSize",label:"Font Size",type:"number",min:8,max:24,default:14,group:"Style"},{key:"color",label:"Text Color",type:"color",default:"#FFFFFF",group:"Style"},{key:"backgroundColor",label:"Background",type:"color",default:"#0EA5E9",group:"Style"},{key:"borderRadius",label:"Border Radius",type:"number",min:0,max:20,default:6,group:"Style"},{key:"enabled",label:"Enabled",type:"boolean",default:!0,group:"Behavior"}],codeTemplate:'tft.fillRoundRect({x}, {y}, {width}, {height}, {borderRadius}, {backgroundColor}); tft.setTextColor({color}); tft.setCursor({x}+10, {y}+{height}/2-8); tft.print("{text}");',phase:1},{type:"switch",name:"Switch",description:"Toggle switch control",category:"input-control",icon:"ToggleLeft",defaultSize:{width:60,height:30},defaultProperties:{value:!1,color:"#0EA5E9",backgroundColor:"#E5E7EB",enabled:!0},propertySchema:[{key:"value",label:"Initial State",type:"boolean",default:!1,group:"Content"},{key:"color",label:"Active Color",type:"color",default:"#0EA5E9",group:"Style"},{key:"backgroundColor",label:"Background",type:"color",default:"#E5E7EB",group:"Style"},{key:"enabled",label:"Enabled",type:"boolean",default:!0,group:"Behavior"}],codeTemplate:"drawSwitch({x}, {y}, {width}, {height}, {value}, {color}, {backgroundColor});",phase:1},{type:"slider",name:"Slider",description:"Horizontal value slider",category:"input-control",icon:"Minus",defaultSize:{width:120,height:20},defaultProperties:{value:50,min:0,max:100,step:1,color:"#0EA5E9",backgroundColor:"#E5E7EB"},propertySchema:[{key:"value",label:"Value",type:"number",default:50,group:"Content"},{key:"min",label:"Minimum",type:"number",default:0,group:"Content"},{key:"max",label:"Maximum",type:"number",default:100,group:"Content"},{key:"step",label:"Step",type:"number",min:.1,default:1,group:"Content"},{key:"color",label:"Active Color",type:"color",default:"#0EA5E9",group:"Style"},{key:"backgroundColor",label:"Track Color",type:"color",default:"#E5E7EB",group:"Style"}],codeTemplate:"drawSlider({x}, {y}, {width}, {height}, {value}, {min}, {max}, {color});",phase:1},{type:"circular-gauge",name:"Circular Gauge",description:"Circular progress indicator",category:"data-visualization",icon:"Gauge",defaultSize:{width:100,height:100},defaultProperties:{value:50,min:0,max:100,units:"%",color:"#0EA5E9",backgroundColor:"#E5E7EB",showValue:!0,thickness:8},propertySchema:[{key:"value",label:"Value",type:"number",default:50,group:"Content"},{key:"min",label:"Minimum",type:"number",default:0,group:"Content"},{key:"max",label:"Maximum",type:"number",default:100,group:"Content"},{key:"units",label:"Units",type:"text",default:"%",group:"Content"},{key:"showValue",label:"Show Value",type:"boolean",default:!0,group:"Content"},{key:"color",label:"Gauge Color",type:"color",default:"#0EA5E9",group:"Style"},{key:"backgroundColor",label:"Background",type:"color",default:"#E5E7EB",group:"Style"},{key:"thickness",label:"Thickness",type:"number",min:2,max:20,default:8,group:"Style"}],codeTemplate:"drawCircularGauge({x}, {y}, {width}, {value}, {min}, {max}, {color});",phase:1},{type:"linear-gauge",name:"Linear Gauge",description:"Horizontal progress bar",category:"data-visualization",icon:"BarChart3",defaultSize:{width:120,height:20},defaultProperties:{value:75,min:0,max:100,color:"#10B981",backgroundColor:"#E5E7EB",showValue:!0,borderRadius:10},propertySchema:[{key:"value",label:"Value",type:"number",default:75,group:"Content"},{key:"min",label:"Minimum",type:"number",default:0,group:"Content"},{key:"max",label:"Maximum",type:"number",default:100,group:"Content"},{key:"showValue",label:"Show Value",type:"boolean",default:!0,group:"Content"},{key:"color",label:"Fill Color",type:"color",default:"#10B981",group:"Style"},{key:"backgroundColor",label:"Background",type:"color",default:"#E5E7EB",group:"Style"},{key:"borderRadius",label:"Border Radius",type:"number",min:0,max:20,default:10,group:"Style"}],codeTemplate:"drawLinearGauge({x}, {y}, {width}, {height}, {value}, {min}, {max}, {color});",phase:1},{type:"container",name:"Container",description:"Group and organize widgets",category:"containers",icon:"Box",defaultSize:{width:120,height:80},defaultProperties:{backgroundColor:"#FFFFFF",borderRadius:8,borderWidth:1,borderColor:"#E5E7EB",shadow:!1,padding:{top:8,right:8,bottom:8,left:8}},propertySchema:[{key:"backgroundColor",label:"Background",type:"color",default:"#FFFFFF",group:"Style"},{key:"borderRadius",label:"Border Radius",type:"number",min:0,max:20,default:8,group:"Style"},{key:"borderWidth",label:"Border Width",type:"number",min:0,max:5,default:1,group:"Style"},{key:"borderColor",label:"Border Color",type:"color",default:"#E5E7EB",group:"Style"},{key:"shadow",label:"Drop Shadow",type:"boolean",default:!1,group:"Style"}],codeTemplate:"tft.fillRoundRect({x}, {y}, {width}, {height}, {borderRadius}, {backgroundColor}); tft.drawRoundRect({x}, {y}, {width}, {height}, {borderRadius}, {borderColor});",phase:1},{type:"image",name:"Image",description:"Display images",category:"media",icon:"Image",defaultSize:{width:80,height:80},defaultProperties:{src:"",alt:"Image",fit:"cover",backgroundColor:"#F3F4F6",borderRadius:4},propertySchema:[{key:"src",label:"Image URL",type:"text",default:"",group:"Content"},{key:"alt",label:"Alt Text",type:"text",default:"Image",group:"Content"},{key:"fit",label:"Fit",type:"select",options:["contain","cover","fill"],default:"cover",group:"Style"},{key:"backgroundColor",label:"Background",type:"color",default:"#F3F4F6",group:"Style"},{key:"borderRadius",label:"Border Radius",type:"number",min:0,max:20,default:4,group:"Style"}],codeTemplate:'drawImage({x}, {y}, {width}, {height}, "{src}");',phase:1}],De=[{type:"checkbox",name:"Checkbox",description:"Checkbox input",category:"input-control",icon:"CheckSquare",defaultSize:{width:20,height:20},defaultProperties:{checked:!1,color:"#0EA5E9",borderColor:"#D1D5DB"},propertySchema:[{key:"checked",label:"Checked",type:"boolean",default:!1,group:"Content"},{key:"color",label:"Check Color",type:"color",default:"#0EA5E9",group:"Style"},{key:"borderColor",label:"Border Color",type:"color",default:"#D1D5DB",group:"Style"}],codeTemplate:"drawCheckbox({x}, {y}, {checked}, {color});",phase:2},{type:"text-input",name:"Text Input",description:"Text input field",category:"input-control",icon:"Type",defaultSize:{width:120,height:32},defaultProperties:{value:"",placeholder:"Enter text...",fontSize:14,color:"#374151",backgroundColor:"#FFFFFF",borderColor:"#D1D5DB"},propertySchema:[{key:"value",label:"Value",type:"text",default:"",group:"Content"},{key:"placeholder",label:"Placeholder",type:"text",default:"Enter text...",group:"Content"},{key:"fontSize",label:"Font Size",type:"number",min:8,max:24,default:14,group:"Style"},{key:"color",label:"Text Color",type:"color",default:"#374151",group:"Style"},{key:"backgroundColor",label:"Background",type:"color",default:"#FFFFFF",group:"Style"}],codeTemplate:'drawTextInput({x}, {y}, {width}, {height}, "{value}");',phase:2},{type:"status-led",name:"Status LED",description:"Colored status indicator",category:"status-feedback",icon:"Circle",defaultSize:{width:16,height:16},defaultProperties:{status:"success",color:"#10B981",blinking:!1},propertySchema:[{key:"status",label:"Status",type:"select",options:["success","warning","error","info"],default:"success",group:"Content"},{key:"color",label:"Color",type:"color",default:"#10B981",group:"Style"},{key:"blinking",label:"Blinking",type:"boolean",default:!1,group:"Behavior"}],codeTemplate:"tft.fillCircle({x}+8, {y}+8, 6, {color});",phase:2},{type:"line-chart",name:"Line Chart",description:"Time series line chart",category:"data-visualization",icon:"TrendingUp",defaultSize:{width:200,height:120},defaultProperties:{dataPoints:20,color:"#0EA5E9",backgroundColor:"#F9FAFB",showGrid:!0,showAxes:!0},propertySchema:[{key:"dataPoints",label:"Data Points",type:"number",min:5,max:100,default:20,group:"Content"},{key:"color",label:"Line Color",type:"color",default:"#0EA5E9",group:"Style"},{key:"backgroundColor",label:"Background",type:"color",default:"#F9FAFB",group:"Style"},{key:"showGrid",label:"Show Grid",type:"boolean",default:!0,group:"Style"},{key:"showAxes",label:"Show Axes",type:"boolean",default:!0,group:"Style"}],codeTemplate:"drawLineChart({x}, {y}, {width}, {height}, dataArray, {color});",phase:2}],X=[...Te,...De];function B(r){return X.find(n=>n.type===r)}function _(r){return X.filter(n=>n.category===r)}const Re={Type:ne,Square:ae,ToggleLeft:ie,Gauge:se,Image:le,Box:H,Activity:de,CheckSquare:ce,Circle:ue,TrendingUp:pe,BarChart3:he,Minus:xe},U={"text-display":"Text & Display","input-control":"Input & Control","data-visualization":"Data Visualization",media:"Media",containers:"Containers",navigation:"Navigation","status-feedback":"Status & Feedback","iot-system":"IoT System","logic-invisible":"Logic Elements"},Fe=()=>{const[r,n]=v.useState(new Set(["text-display","input-control","data-visualization"])),o=s=>{const m=new Set(r);m.has(s)?m.delete(s):m.add(s),n(m)},t=Object.keys(U).filter(s=>_(s).length>0);return e.jsxs("div",{className:"w-64 bg-white border-r border-gray-200 flex flex-col h-full",children:[e.jsx("div",{className:"p-4 border-b border-gray-200 flex-shrink-0",children:e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Widget Library"})}),e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:t.map(s=>{const m=_(s),f=r.has(s);return e.jsxs("div",{className:"mb-4",children:[e.jsxs("button",{onClick:()=>o(s),className:"flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900 mb-2",children:[e.jsx("span",{children:U[s]}),f?e.jsx(O,{size:16}):e.jsx(oe,{size:16})]}),f&&e.jsx("div",{className:"space-y-2 ml-2",children:m.map(x=>e.jsx(ze,{definition:x},x.type))})]},s)})})]})},ze=({definition:r})=>{const[{isDragging:n},o]=Z(()=>({type:"widget",item:{type:r.type},collect:s=>({isDragging:s.isDragging()})})),a=Re[r.icon]||H,t=r.phase===2;return e.jsxs("div",{ref:o,className:`
                flex items-center space-x-3 p-2 rounded-lg border border-gray-200 
                cursor-grab hover:bg-gray-50 hover:border-gray-300 transition-colors
                ${n?"opacity-50":""}
                ${t?"border-primary-200 bg-primary-50":""}
            `,children:[e.jsx("div",{className:`
                flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center
                ${t?"bg-primary-200":"bg-primary-100"}
            `,children:e.jsx(a,{size:14,className:`
                    ${t?"text-primary-700":"text-primary-600"}
                `})}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsxs("div",{className:"text-xs font-medium text-gray-900 flex items-center",children:[r.name,t&&e.jsx("span",{className:"ml-1 px-1 py-0.5 text-xs bg-primary-100 text-primary-700 rounded",children:"Pro"})]}),e.jsx("div",{className:"text-xs text-gray-500 truncate",children:r.description})]})]})};function T(){return Math.random().toString(36).substr(2,9)}function F(r,n,o){return Math.min(Math.max(r,n),o)}function z(r,n=10){return Math.round(r/n)*n}const K=({widget:r,isSelected:n,onSelect:o,onUpdate:a,onDelete:t,onLayerChange:s,canvasSize:m})=>{const[f,x]=v.useState(!1),[p,i]=v.useState(!1),[g,w]=v.useState({x:0,y:0}),u=v.useRef(null),l=v.useCallback(y=>{var h;if(y.preventDefault(),y.stopPropagation(),!n){o();return}if(!((h=u.current)==null?void 0:h.getBoundingClientRect()))return;y.target.classList.contains("resize-handle")?i(!0):(x(!0),w({x:y.clientX-r.position.x,y:y.clientY-r.position.y}))},[n,o,r.position]),S=v.useCallback(y=>{var d;if(f){const c=z(F(y.clientX-g.x,0,m.width-r.size.width)),h=z(F(y.clientY-g.y,0,m.height-r.size.height));a({position:{x:c,y:h}})}else if(p){const c=(d=u.current)==null?void 0:d.getBoundingClientRect();if(!c)return;const h=z(F(y.clientX-c.left,20,m.width-r.position.x)),b=z(F(y.clientY-c.top,20,m.height-r.position.y));a({size:{width:h,height:b}})}},[f,p,g,r,a,m]),C=v.useCallback(()=>{x(!1),i(!1)},[]);return W.useEffect(()=>{if(f||p)return document.addEventListener("mousemove",S),document.addEventListener("mouseup",C),()=>{document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",C)}},[f,p,S,C]),e.jsxs("div",{ref:u,className:`widget-container ${n?"selected":""}`,style:{left:r.position.x,top:r.position.y,width:r.size.width,height:r.size.height,zIndex:r.zIndex||0,cursor:f?"grabbing":"grab"},onMouseDown:l,children:[e.jsx(Pe,{widget:r}),n&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute inset-0 border-2 border-primary-500 pointer-events-none"}),e.jsxs("div",{className:"absolute -top-8 left-0 flex space-x-1",children:[e.jsx("button",{onClick:y=>{y.stopPropagation(),s(r.id,"front")},className:"w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center transition-colors",title:"Bring to front",children:e.jsx(ge,{size:12})}),e.jsx("button",{onClick:y=>{y.stopPropagation(),s(r.id,"forward")},className:"w-6 h-6 bg-blue-400 hover:bg-blue-500 text-white rounded flex items-center justify-center transition-colors",title:"Bring forward",children:e.jsx(me,{size:12})}),e.jsx("button",{onClick:y=>{y.stopPropagation(),s(r.id,"backward")},className:"w-6 h-6 bg-gray-400 hover:bg-gray-500 text-white rounded flex items-center justify-center transition-colors",title:"Send backward",children:e.jsx(O,{size:12})}),e.jsx("button",{onClick:y=>{y.stopPropagation(),s(r.id,"back")},className:"w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white rounded flex items-center justify-center transition-colors",title:"Send to back",children:e.jsx(ye,{size:12})})]}),e.jsx("button",{onClick:y=>{y.stopPropagation(),t()},className:"absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors z-10",title:"Delete widget",children:e.jsx(Y,{size:12})}),e.jsx("div",{className:"resize-handle absolute bottom-0 right-0 w-3 h-3 bg-primary-500 cursor-se-resize",style:{transform:"translate(50%, 50%)"}})]})]})},Pe=({widget:r})=>{const{type:n,properties:o}=r,a=B(n),t=o;n==="image"&&(console.log("🖼️ Image widget rendering:"),console.log("- Widget ID:",r.id),console.log("- Raw properties:",o),console.log("- Props (cast):",t),console.log("- props.src exists:",!!t.src),console.log("- props.src value:",t.src),console.log("- props.alt value:",t.alt));const s={width:"100%",height:"100%",backgroundColor:t.backgroundColor||"transparent",color:t.color||"#374151",fontSize:t.fontSize||14,borderRadius:t.borderRadius||0,display:"flex",alignItems:"center",justifyContent:"center",border:"none",outline:"none",fontFamily:"Inter, sans-serif",opacity:t.visible===!1?.5:1};switch(n){case"label":return e.jsx("div",{style:{...s,justifyContent:t.textAlign==="center"?"center":t.textAlign==="right"?"flex-end":"flex-start",fontWeight:t.fontWeight||"normal"},children:t.text||"Label"});case"dynamic-label":const m=(Math.random()*50+10).toFixed(t.precision||1),f=t.value!==void 0?`${Number(t.value).toFixed(t.precision||1)}${t.units||""}`:`${m}${t.units||""}`;return e.jsx("div",{style:s,children:t.text?t.text.replace("${value}",f):f});case"button":return e.jsx("button",{style:s,disabled:t.enabled===!1,className:t.enabled===!1?"opacity-50 cursor-not-allowed":"",children:t.text||"Button"});case"switch":return e.jsx("div",{style:{...s,justifyContent:"flex-start",padding:"4px"},children:e.jsx("div",{style:{width:"32px",height:"18px",backgroundColor:t.value?t.color:t.backgroundColor,borderRadius:"9px",position:"relative",transition:"background-color 0.2s",cursor:"pointer"},children:e.jsx("div",{style:{width:"14px",height:"14px",backgroundColor:"white",borderRadius:"50%",position:"absolute",top:"2px",left:t.value?"16px":"2px",transition:"left 0.2s",boxShadow:"0 1px 3px rgba(0,0,0,0.3)"}})})});case"checkbox":return e.jsx("div",{style:{...s,padding:"2px"},children:e.jsx("div",{style:{width:"16px",height:"16px",border:`2px solid ${t.borderColor||"#D1D5DB"}`,borderRadius:"3px",backgroundColor:t.checked?t.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},children:t.checked&&e.jsx("div",{style:{width:"8px",height:"8px",backgroundColor:"white",borderRadius:"1px"}})})});case"slider":const x=t.value||0,p=t.min||0,i=t.max||100,g=(x-p)/(i-p)*100;return e.jsx("div",{style:{...s,padding:"8px"},children:e.jsxs("div",{style:{width:"100%",height:"4px",backgroundColor:t.backgroundColor||"#E5E7EB",borderRadius:"2px",position:"relative"},children:[e.jsx("div",{style:{width:`${g}%`,height:"100%",backgroundColor:t.color||"#0EA5E9",borderRadius:"2px"}}),e.jsx("div",{style:{position:"absolute",left:`${g}%`,top:"-6px",width:"16px",height:"16px",backgroundColor:t.color||"#0EA5E9",borderRadius:"50%",transform:"translateX(-50%)",cursor:"pointer",boxShadow:"0 2px 4px rgba(0,0,0,0.2)"}})]})});case"circular-gauge":const w=Math.floor(Math.random()*((t.max||100)-(t.min||0)))+(t.min||0),u=t.value!==void 0?t.value:w,l=t.min||0,S=t.max||100,C=(u-l)/(S-l)*100,y=t.thickness||8,d=Math.min(r.size.width,r.size.height)/2-y,c=2*Math.PI*d,h=c,b=c-C/100*c;return e.jsxs("div",{style:{...s,flexDirection:"column",backgroundColor:"transparent"},children:[e.jsxs("svg",{width:"100%",height:"100%",style:{transform:"rotate(-90deg)"},children:[e.jsx("circle",{cx:"50%",cy:"50%",r:d,fill:"none",stroke:t.backgroundColor||"#E5E7EB",strokeWidth:y}),e.jsx("circle",{cx:"50%",cy:"50%",r:d,fill:"none",stroke:t.color||"#0EA5E9",strokeWidth:y,strokeDasharray:h,strokeDashoffset:b,strokeLinecap:"round",style:{transition:"stroke-dashoffset 0.3s ease"}})]}),t.showValue&&e.jsxs("div",{style:{position:"absolute",fontSize:"12px",fontWeight:"bold",color:t.color||"#0EA5E9"},children:[u,t.units||""]})]});case"linear-gauge":const j=Math.floor(Math.random()*((t.max||100)-(t.min||0)))+(t.min||0),k=t.value!==void 0?t.value:j,N=t.min||0,E=t.max||100,D=(k-N)/(E-N)*100;return e.jsx("div",{style:{...s,padding:"4px"},children:e.jsxs("div",{style:{width:"100%",height:"100%",backgroundColor:t.backgroundColor||"#E5E7EB",borderRadius:t.borderRadius||0,position:"relative",overflow:"hidden"},children:[e.jsx("div",{style:{width:`${D}%`,height:"100%",backgroundColor:t.color||"#10B981",borderRadius:t.borderRadius||0,transition:"width 0.3s ease"}}),t.showValue&&e.jsxs("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",fontSize:"10px",fontWeight:"bold",color:D>50?"white":t.color||"#10B981"},children:[k,"%"]})]})});case"status-led":const L={success:"#10B981",warning:"#F59E0B",error:"#EF4444",info:"#3B82F6"}[t.status]||t.color||"#10B981";return e.jsx("div",{style:s,children:e.jsx("div",{style:{width:"12px",height:"12px",backgroundColor:L,borderRadius:"50%",boxShadow:`0 0 8px ${L}`,animation:t.blinking?"blink 1s infinite":"none"}})});case"container":return e.jsx("div",{style:{...s,border:`${t.borderWidth||1}px solid ${t.borderColor||"#E5E7EB"}`,boxShadow:t.shadow?"0 4px 6px -1px rgba(0, 0, 0, 0.1)":"none"}});case"image":const $=o.src||"",P=o.alt||"Image";return console.log("🖼️ Image widget check:"),console.log("- imageSrc length:",$==null?void 0:$.length),console.log("- imageSrc exists:",!!$),console.log("- imageAlt:",P),e.jsx("div",{style:s,children:$&&$.length>0?e.jsx("img",{src:$,alt:P,style:{width:"100%",height:"100%",objectFit:t.fit||"cover",borderRadius:t.borderRadius||0},onLoad:()=>console.log("✅ Image loaded!"),onError:()=>console.error("❌ Image failed to load")}):e.jsx("div",{style:{color:"#9ca3af",fontSize:"12px",display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center",width:"100%",height:"100%"},children:P})});default:return e.jsx("div",{style:s,children:e.jsx("div",{style:{color:"#9ca3af",fontSize:"12px"},children:(a==null?void 0:a.name)||"Unknown"})})}},Ae=({widgets:r,device:n,selectedWidget:o,onWidgetSelect:a,onWidgetAdd:t,onWidgetUpdate:s,onWidgetDelete:m,onLayerChange:f,backgroundColor:x="#000000"})=>{const p=v.useRef(null),[{isOver:i},g]=Q(()=>({accept:"widget",drop:(l,S)=>{if(!p.current)return;const C=p.current.getBoundingClientRect(),y=S.getClientOffset();if(y){const d=Math.max(0,Math.min(y.x-C.left,n.width-50)),c=Math.max(0,Math.min(y.y-C.top,n.height-30));t(l.type,{x:d,y:c})}},collect:l=>({isOver:l.isOver()})})),w=v.useCallback(l=>{l.target===l.currentTarget&&a(null)},[a]),u=v.useCallback(l=>{l.key==="Delete"&&o?m(o.id):l.key==="Escape"&&a(null)},[o,m,a]);return e.jsx("div",{className:"flex-1 p-6 overflow-auto",children:e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{ref:l=>{l&&(p.current=l,g(l))},className:`
            relative border-2 border-gray-300 rounded-lg shadow-lg canvas-grid
            ${i?"border-primary-400":""}
          `,style:{width:n.width,height:n.height,minWidth:n.width,minHeight:n.height},onClick:w,onKeyDown:u,tabIndex:0,children:[e.jsx("div",{className:"absolute inset-0 pointer-events-none",style:{backgroundColor:x,opacity:.3,mixBlendMode:"multiply"}}),r.length===0&&!i&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none",children:e.jsxs("div",{className:"text-center text-gray-400",children:[e.jsx("div",{className:"text-lg mb-2",children:"Drag widgets from the library"}),e.jsxs("div",{className:"text-sm",children:["• Select widgets to edit properties",e.jsx("br",{}),"• Press Delete key to remove",e.jsx("br",{}),"• Click red button to delete"]})]})}),r.slice().sort((l,S)=>(l.zIndex||0)-(S.zIndex||0)).map(l=>e.jsx(K,{widget:l,isSelected:(o==null?void 0:o.id)===l.id,onSelect:()=>a(l),onUpdate:S=>s(l.id,S),onDelete:()=>m(l.id),onLayerChange:f,canvasSize:{width:n.width,height:n.height}},l.id)),i&&e.jsx("div",{className:"absolute inset-0 bg-primary-100 bg-opacity-70 border-2 border-dashed border-primary-400 rounded-lg flex items-center justify-center pointer-events-none z-20",children:e.jsx("div",{className:"text-primary-600 font-medium bg-white px-4 py-2 rounded-lg shadow-sm",children:"Drop widget here"})})]})})})},Be=({selectedWidget:r,onWidgetUpdate:n})=>{if(!r)return e.jsx("div",{className:"w-80 bg-white border-l border-gray-200 p-4",children:e.jsxs("div",{className:"text-center text-gray-500 mt-8",children:[e.jsx("div",{className:"text-lg font-medium mb-2",children:"No widget selected"}),e.jsx("div",{className:"text-sm",children:"Select a widget to edit its properties"})]})});const o=B(r.type);if(!o)return e.jsx("div",{className:"w-80 bg-white border-l border-gray-200 p-4",children:e.jsxs("div",{className:"text-center text-gray-500 mt-8",children:[e.jsx("div",{className:"text-lg font-medium mb-2",children:"Unknown widget type"}),e.jsx("div",{className:"text-sm",children:"Widget definition not found"})]})});const a=(i,g)=>{console.log("🔧 Updating property:",i,"Value type:",typeof g,"Value length:",g==null?void 0:g.length),n(r.id,{properties:{...r.properties,[i]:g}}),console.log("🔧 Property update sent to parent component")},t=(i,g)=>{n(r.id,{position:{...r.position,[i]:g}})},s=(i,g)=>{n(r.id,{size:{...r.size,[i]:g}})},m=i=>{n(r.id,{zIndex:i})},f=i=>{console.log("📤 Starting image upload for:",i.name);const g=new FileReader;g.onload=w=>{var l;const u=(l=w.target)==null?void 0:l.result;console.log("📤 Base64 generated, length:",u==null?void 0:u.length),n(r.id,{properties:{...r.properties,src:u,alt:i.name}}),console.log("📤 Widget updated with new image")},g.readAsDataURL(i)},x=i=>{var w;const g=r.properties[i.key]??i.default;if(i.key==="src"&&r.type==="image")return e.jsxs("div",{className:"space-y-2",children:[e.jsx("input",{type:"text",value:g||"",onChange:u=>a(i.key,u.target.value),placeholder:"https://example.com/image.jpg or paste base64",className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsxs("label",{className:"flex-1 cursor-pointer",children:[e.jsxs("div",{className:"flex items-center justify-center px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors",children:[e.jsx("svg",{className:"w-4 h-4 mr-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),"Upload Image"]}),e.jsx("input",{type:"file",accept:"image/*",onChange:u=>{var S;const l=(S=u.target.files)==null?void 0:S[0];l&&f(l)},className:"hidden"})]}),g&&e.jsx("button",{onClick:()=>a("src",""),className:"px-2 py-1 text-xs text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50 transition-colors",title:"Clear image",children:"Clear"})]}),g&&e.jsxs("div",{className:"mt-2",children:[e.jsx("div",{className:"text-xs text-gray-500 mb-1",children:"Preview:"}),e.jsx("div",{className:"w-full h-20 border border-gray-200 rounded overflow-hidden bg-gray-50 flex items-center justify-center",children:e.jsx("img",{src:g,alt:"Preview",className:"max-w-full max-h-full object-contain",onError:u=>{u.target.style.display="none";const l=u.target.parentElement;l&&(l.innerHTML='<div class="text-xs text-gray-400">Invalid image</div>')}})}),e.jsx("div",{className:"text-xs text-gray-400 mt-1",children:g.startsWith("data:")?"Base64 image (embedded)":"External URL"})]})]});switch(i.type){case"text":case"textarea":return e.jsx("input",{type:"text",value:g||"",onChange:u=>a(i.key,u.target.value),placeholder:i.default,className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"});case"number":case"range":return e.jsx("input",{type:"number",value:g??i.default,onChange:u=>a(i.key,parseFloat(u.target.value)||i.default),min:i.min,max:i.max,step:i.step||1,className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"});case"boolean":return e.jsxs("label",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"checkbox",checked:g??i.default,onChange:u=>a(i.key,u.target.checked),className:"rounded border-gray-300 text-primary-600 focus:ring-primary-500"}),e.jsx("span",{className:"text-sm text-gray-700",children:"Enabled"})]});case"color":return e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("input",{type:"color",value:g||i.default,onChange:u=>a(i.key,u.target.value),className:"w-8 h-8 border border-gray-300 rounded cursor-pointer"}),e.jsx("input",{type:"text",value:g||i.default,onChange:u=>a(i.key,u.target.value),className:"flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"})]});case"select":return e.jsx("select",{value:g??i.default,onChange:u=>a(i.key,u.target.value),className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500",children:(w=i.options)==null?void 0:w.map(u=>e.jsx("option",{value:u,children:u},u))});default:return e.jsx("input",{type:"text",value:g||"",onChange:u=>a(i.key,u.target.value),className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"})}},p=o.propertySchema.reduce((i,g)=>{const w=g.group||"General";return i[w]||(i[w]=[]),i[w].push(g),i},{});return e.jsxs("div",{className:"w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden",children:[e.jsxs("div",{className:"p-4 border-b border-gray-200 flex-shrink-0",children:[e.jsx("h2",{className:"text-lg font-semibold text-gray-900",children:"Properties"}),e.jsx("div",{className:"text-sm text-gray-500 capitalize",children:o.name})]}),e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-3",children:"Position & Size"}),e.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-medium text-gray-700 mb-1",children:"X"}),e.jsx("input",{type:"number",value:r.position.x,onChange:i=>t("x",parseInt(i.target.value)||0),className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-medium text-gray-700 mb-1",children:"Y"}),e.jsx("input",{type:"number",value:r.position.y,onChange:i=>t("y",parseInt(i.target.value)||0),className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-medium text-gray-700 mb-1",children:"Width"}),e.jsx("input",{type:"number",value:r.size.width,onChange:i=>s("width",parseInt(i.target.value)||1),className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-medium text-gray-700 mb-1",children:"Height"}),e.jsx("input",{type:"number",value:r.size.height,onChange:i=>s("height",parseInt(i.target.value)||1),className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-3",children:"Layer Order"}),e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("label",{className:"block text-xs font-medium text-gray-700 mb-1",children:"Z-Index"}),e.jsx("input",{type:"number",value:r.zIndex||0,onChange:i=>m(parseInt(i.target.value)||0),className:"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500"})]}),e.jsx("div",{className:"text-xs text-gray-500 mt-4",children:"Higher values appear in front"})]})]}),Object.entries(p).map(([i,g])=>e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-medium text-gray-900 mb-3",children:i}),e.jsx("div",{className:"space-y-3",children:g.map(w=>e.jsxs("div",{children:[e.jsx("label",{className:"block text-xs font-medium text-gray-700 mb-1",children:w.label}),x(w),w.description&&e.jsx("p",{className:"text-xs text-gray-500 mt-1",children:w.description})]},w.key))})]},i))]})})]})};function Le(r,n){const o=`
#include <TFT_eSPI.h>
#include <SPI.h>

TFT_eSPI tft = TFT_eSPI();
`,a=`
// Screen management
int currentScreen = 0;
int totalScreens = ${r.length};
`,t=`
void setup() {
    Serial.begin(115200);
    tft.init();
    tft.setRotation(1);
    tft.fillScreen(TFT_BLACK);
    
    // Initialize UI
    drawUI();
}
`,s=`
void loop() {
    // Handle touch input and screen navigation
    // Add your touch handling code here
    delay(50);
}
`,m=`
void drawUI() {
    drawScreen(currentScreen);
}

void drawScreen(int screenId) {
    switch(screenId) {
${r.map((f,x)=>`        case ${x}:
            drawScreen${x}();
            break;`).join(`
`)}
        default:
            drawScreen0();
            break;
    }
}

${r.map((f,x)=>`
void drawScreen${x}() {
    // Screen: ${f.name}
    tft.fillScreen(${I(f.backgroundColor||"#000000")});
    
${f.widgets.map(p=>Me(p)).join(`
`)}
}`).join(`
`)}

void nextScreen() {
    currentScreen = (currentScreen + 1) % totalScreens;
    drawUI();
}

void previousScreen() {
    currentScreen = (currentScreen - 1 + totalScreens) % totalScreens;
    drawUI();
}
`;return o+a+t+s+m+_e}function Me(r){const{type:n,position:o,size:a,properties:t}=r;switch(n){case"label":return`    // Label Widget - ${r.id}
    tft.setTextColor(${I(t.color||"#FFFFFF")});
    tft.setTextSize(${Math.round((t.fontSize||14)/8)});
    tft.setCursor(${o.x}, ${o.y});
    tft.print("${t.text||"Label"}");`;case"dynamic-label":return`    // Dynamic Label Widget - ${r.id}
    tft.setTextColor(${I(t.color||"#0EA5E9")});
    tft.setTextSize(${Math.round((t.fontSize||14)/8)});
    tft.setCursor(${o.x}, ${o.y});
    // Replace with your data source
    float sensorValue = 23.5; // Example: temperature sensor
    tft.print(String(sensorValue, ${t.precision||1}) + "${t.units||""}");`;case"button":return`    // Button Widget - ${r.id}
    tft.fillRoundRect(${o.x}, ${o.y}, ${a.width}, ${a.height}, ${t.borderRadius||0}, ${I(t.backgroundColor||"#0EA5E9")});
    tft.setTextColor(${I(t.color||"#FFFFFF")});
    tft.setTextSize(${Math.round((t.fontSize||14)/8)});
    tft.setCursor(${o.x+10}, ${o.y+a.height/2-8});
    tft.print("${t.text||"Button"}");
    // Add touch detection: if (touch.x >= ${o.x} && touch.x <= ${o.x+a.width} && touch.y >= ${o.y} && touch.y <= ${o.y+a.height}) { /* button pressed */ }`;case"switch":return`    // Switch Widget - ${r.id}
    bool switchState = ${t.value?"true":"false"}; // Connect to your variable
    drawSwitch(${o.x}, ${o.y}, ${a.width}, ${a.height}, switchState, ${I(t.color||"#0EA5E9")}, ${I(t.backgroundColor||"#E5E7EB")});`;case"checkbox":return`    // Checkbox Widget - ${r.id}
    bool checkboxState = ${t.checked?"true":"false"}; // Connect to your variable
    drawCheckbox(${o.x}, ${o.y}, 16, checkboxState, ${I(t.color||"#0EA5E9")});`;case"slider":return`    // Slider Widget - ${r.id}
    int sliderValue = ${t.value||50}; // Connect to your variable
    drawSlider(${o.x}, ${o.y}, ${a.width}, ${a.height}, sliderValue, ${t.min||0}, ${t.max||100}, ${I(t.color||"#0EA5E9")});`;case"circular-gauge":case"gauge":return`    // Circular Gauge Widget - ${r.id}
    int gaugeValue = ${t.value||50}; // Connect to your sensor data
    drawCircularGauge(${o.x}, ${o.y}, ${Math.min(a.width,a.height)}, gaugeValue, ${t.min||0}, ${t.max||100}, ${I(t.color||"#0EA5E9")});
    ${t.showValue?`
    // Show value text
    tft.setTextColor(${I(t.color||"#0EA5E9")});
    tft.setTextSize(1);
    tft.setCursor(${o.x+a.width/2-15}, ${o.y+a.height/2});
    tft.print(String(gaugeValue) + "${t.units||""}");`:""}`;case"linear-gauge":return`    // Linear Gauge Widget - ${r.id}
    int linearValue = ${t.value||75}; // Connect to your sensor data
    drawLinearGauge(${o.x}, ${o.y}, ${a.width}, ${a.height}, linearValue, ${t.min||0}, ${t.max||100}, ${I(t.color||"#10B981")});`;case"status-led":return`    // Status LED Widget - ${r.id}
    bool ledStatus = true; // Connect to your status variable
    if (ledStatus) {
        tft.fillCircle(${o.x+8}, ${o.y+8}, 6, ${I(t.color||"#10B981")});
    } else {
        tft.drawCircle(${o.x+8}, ${o.y+8}, 6, TFT_DARKGREY);
    }`;case"container":return`    // Container Widget - ${r.id}
    tft.fillRoundRect(${o.x}, ${o.y}, ${a.width}, ${a.height}, ${t.borderRadius||0}, ${I(t.backgroundColor||"#FFFFFF")});
    tft.drawRoundRect(${o.x}, ${o.y}, ${a.width}, ${a.height}, ${t.borderRadius||0}, ${I(t.borderColor||"#E5E7EB")});`;case"image":return`    // Image Widget - ${r.id}
    // Note: Image display requires SPIFFS or SD card storage
    // tft.drawBitmap(${o.x}, ${o.y}, imageData, ${a.width}, ${a.height}, TFT_WHITE);
    // For now, draw a placeholder
    tft.drawRect(${o.x}, ${o.y}, ${a.width}, ${a.height}, TFT_LIGHTGREY);
    tft.setCursor(${o.x+5}, ${o.y+a.height/2});
    tft.setTextColor(TFT_DARKGREY);
    tft.print("IMG");`;default:return`    // Unknown widget type: ${n} - ${r.id}`}}const _e=`

// Helper Functions for Widgets
void drawSwitch(int x, int y, int w, int h, bool state, uint16_t activeColor, uint16_t bgColor) {
    tft.fillRoundRect(x, y, w, h, h/2, bgColor);
    int circleX = state ? (x + w - h/2) : (x + h/2);
    tft.fillCircle(circleX, y + h/2, h/2 - 2, state ? activeColor : TFT_WHITE);
}

void drawCheckbox(int x, int y, int size, bool checked, uint16_t color) {
    tft.drawRect(x, y, size, size, TFT_DARKGREY);
    if (checked) {
        tft.fillRect(x + 2, y + 2, size - 4, size - 4, color);
    }
}

void drawSlider(int x, int y, int w, int h, int value, int minVal, int maxVal, uint16_t color) {
    // Draw track
    tft.fillRect(x, y + h/2 - 2, w, 4, TFT_LIGHTGREY);
    
    // Calculate position
    int pos = map(value, minVal, maxVal, 0, w - 10);
    
    // Draw fill
    tft.fillRect(x, y + h/2 - 2, pos, 4, color);
    
    // Draw handle
    tft.fillCircle(x + pos + 5, y + h/2, 8, color);
}

void drawCircularGauge(int x, int y, int diameter, int value, int minVal, int maxVal, uint16_t color) {
    int centerX = x + diameter/2;
    int centerY = y + diameter/2;
    int radius = diameter/2 - 10;
    
    // Draw background circle
    tft.drawCircle(centerX, centerY, radius, TFT_DARKGREY);
    
    // Calculate angle (270 degrees total, starting from -135 degrees)
    int angle = map(value, minVal, maxVal, -135, 135);
    
    // Draw arc (simplified - draw lines from center)
    for (int i = -135; i <= angle; i += 5) {
        float radian = i * PI / 180;
        int x1 = centerX + (radius - 5) * cos(radian);
        int y1 = centerY + (radius - 5) * sin(radian);
        int x2 = centerX + radius * cos(radian);
        int y2 = centerY + radius * sin(radian);
        tft.drawLine(x1, y1, x2, y2, color);
    }
}

void drawLinearGauge(int x, int y, int w, int h, int value, int minVal, int maxVal, uint16_t color) {
    // Draw background
    tft.fillRect(x, y, w, h, TFT_DARKGREY);
    
    // Calculate fill width
    int fillWidth = map(value, minVal, maxVal, 0, w);
    
    // Draw fill
    tft.fillRect(x, y, fillWidth, h, color);
    
    // Draw border
    tft.drawRect(x, y, w, h, TFT_WHITE);
}
`;function I(r){const n=parseInt(r.slice(1,3),16),o=parseInt(r.slice(3,5),16),a=parseInt(r.slice(5,7),16);return`0x${((n&248)<<8|(o&252)<<3|a>>3).toString(16).toUpperCase().padStart(4,"0")}`}function Ue(r,n,o){const a=Le(r),t=r.reduce((x,p)=>x+p.widgets.length,0),s=`# ${o}

Generated IoT GUI for ${n.name}

## 🚀 Quick Start Guide

### Hardware Requirements
- **ESP32-S3** development board
- **TFT Display** (${n.width}x${n.height}px) - ILI9341 or similar
- **Touch Controller** (optional) - XPT2046 or FT6236
- **MicroSD Card** (optional for images)

### Software Requirements
- **Arduino IDE** 1.8.19 or newer
- **TFT_eSPI Library** v2.5.0 or newer

## 📋 Installation Steps

### 1. Install TFT_eSPI Library
\`\`\`
Arduino IDE → Tools → Manage Libraries → Search "TFT_eSPI" → Install
\`\`\`

### 2. Configure Display (IMPORTANT!)
Edit the TFT_eSPI library configuration:
\`\`\`
Arduino/libraries/TFT_eSPI/User_Setup.h
\`\`\`

Add these lines for ESP32-S3:
\`\`\`cpp
#define ILI9341_DRIVER
#define TFT_MISO 19
#define TFT_MOSI 23
#define TFT_SCLK 18
#define TFT_CS   15
#define TFT_DC    2
#define TFT_RST   4
\`\`\`

### 3. Upload Code
1. Open \`main.ino\` in Arduino IDE
2. Select **ESP32S3 Dev Module** as board
3. Connect your ESP32-S3 via USB
4. Click Upload

### 4. Connect Your Data Sources
Replace the example sensor values in the code with your actual data:
\`\`\`cpp
// Replace this:
float sensorValue = 23.5;

// With your sensor reading:
float sensorValue = dht.readTemperature();
\`\`\`

## 📊 Project Structure
- **Screens**: ${r.length}
- **Total Widgets**: ${t}
- **Display Resolution**: ${n.width}x${n.height}px

## 📱 Screens Overview
${r.map((x,p)=>`### Screen ${p+1}: ${x.name}
- Widgets: ${x.widgets.length}
- Background: ${x.backgroundColor||"#000000"}
- Widget Types: ${[...new Set(x.widgets.map(i=>i.type))].join(", ")}`).join(`

`)}

## 🔧 Customization

### Adding Touch Support
To make buttons interactive, add touch detection in the main loop:
\`\`\`cpp
#include <XPT2046_Touchscreen.h>
XPT2046_Touchscreen ts(CS_PIN);

void loop() {
    if (ts.touched()) {
        TS_Point p = ts.getPoint();
        // Check if touch is within button bounds
        // See button comments in generated code
    }
}
\`\`\`

### Connecting Sensors
Replace static values with sensor readings:
\`\`\`cpp
#include <DHT.h>
DHT dht(DHT_PIN, DHT22);

void setup() {
    dht.begin();
    // ... existing setup code
}

// In your draw functions, replace static values:
float temperature = dht.readTemperature();
float humidity = dht.readHumidity();
\`\`\`

## 🌐 IoT Integration

### WiFi Connection
\`\`\`cpp
#include <WiFi.h>

void setup() {
    WiFi.begin("your_ssid", "your_password");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
    }
}
\`\`\`

### MQTT Integration
\`\`\`cpp
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
    // Update widget values based on MQTT messages
}
\`\`\`

## 🎨 Widget Types Used
${[...new Set(r.flatMap(x=>x.widgets.map(p=>p.type)))].map(x=>`- **${x}**: Interactive ${x} widget`).join(`
`)}

## 📞 Support
- Check TFT_eSPI library documentation for display issues
- Verify pin connections match your hardware
- Use Serial Monitor for debugging

---
**Generated by IoT GUI Builder** - ${new Date().toLocaleDateString()}
*Deploy this UI to your ESP32-S3 and start monitoring your IoT data!*
`,m=`; PlatformIO Project Configuration File
; Generated by IoT GUI Builder

[env:esp32-s3-devkitc-1]
platform = espressif32
board = esp32-s3-devkitc-1
framework = arduino

; Library dependencies
lib_deps = 
    bodmer/TFT_eSPI@^2.5.0
    adafruit/DHT sensor library@^1.4.4
    knolleary/PubSubClient@^2.8
    paulstoffregen/XPT2046_Touchscreen@^1.4

; Serial monitor settings
monitor_speed = 115200
monitor_filters = esp32_exception_decoder

; Build settings
build_flags = 
    -DCORE_DEBUG_LEVEL=3
    -DBOARD_HAS_PSRAM

; Upload settings
upload_speed = 921600
`,f=`// Touch Integration Example
// Add this to your main.ino for touch support

#include <XPT2046_Touchscreen.h>

#define CS_PIN  21
XPT2046_Touchscreen ts(CS_PIN);

void setup() {
    // ... existing setup code ...
    ts.begin();
    ts.setRotation(1);
}

void loop() {
    if (ts.touched()) {
        TS_Point p = ts.getPoint();
        
        // Convert touch coordinates to screen coordinates
        int touchX = map(p.x, 200, 3700, 0, ${n.width});
        int touchY = map(p.y, 240, 3800, 0, ${n.height});
        
        // Check button touches (example)
        ${r.flatMap(x=>x.widgets.filter(p=>p.type==="button").map(p=>`
        // Button: ${p.properties.text||"Button"}
        if (touchX >= ${p.position.x} && touchX <= ${p.position.x+p.size.width} && 
            touchY >= ${p.position.y} && touchY <= ${p.position.y+p.size.height}) {
            // Button pressed - add your action here
            Serial.println("Button pressed: ${p.properties.text||"Button"}");
        }`)).join("")}
        
        delay(200); // Debounce
    }
    
    delay(50);
}`;return{"main.ino":a,"README.md":s,"platformio.ini":m,"touch_example.ino":f,"project.json":JSON.stringify({name:o,device:n,screens:r.map(x=>({id:x.id,name:x.name,widgetCount:x.widgets.length,backgroundColor:x.backgroundColor,widgets:x.widgets.map(p=>({id:p.id,type:p.type,position:p.position,size:p.size,properties:p.properties}))})),totalWidgets:t,generatedAt:new Date().toISOString(),version:"1.0.0"},null,2)}}const Ve=({project:r,isOpen:n,onClose:o})=>{if(!n)return null;const a=r.screens.find(t=>t.id===r.currentScreenId)||r.screens[0];return e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] overflow-auto",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 border-b border-gray-200",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-xl font-semibold text-gray-900",children:"Preview Mode"}),e.jsxs("p",{className:"text-sm text-gray-500",children:[a.name," • ",r.device.width,"×",r.device.height,"px"]})]}),e.jsx("button",{onClick:o,className:"p-2 hover:bg-gray-100 rounded-lg transition-colors",children:e.jsx(fe,{size:20})})]}),e.jsxs("div",{className:"p-6",children:[e.jsx("div",{className:"flex justify-center",children:e.jsxs("div",{className:"relative border-2 border-gray-300 rounded-lg shadow-lg",style:{width:r.device.width,height:r.device.height,backgroundColor:a.backgroundColor||"#000000"},children:[e.jsx("div",{className:"absolute -inset-4 bg-gray-800 rounded-xl"}),e.jsx("div",{className:"absolute -inset-2 bg-gray-600 rounded-lg"}),e.jsx("div",{className:"relative w-full h-full overflow-hidden rounded-lg",children:a.widgets.map(t=>e.jsx(K,{widget:t,isSelected:!1,onSelect:()=>{},onUpdate:()=>{},onDelete:()=>{},onLayerChange:()=>{},canvasSize:{width:r.device.width,height:r.device.height}},t.id))})]})}),r.screens.length>1&&e.jsx("div",{className:"mt-6 flex justify-center",children:e.jsx("div",{className:"flex space-x-2",children:r.screens.map((t,s)=>e.jsx("button",{className:`px-3 py-1 text-sm rounded ${t.id===r.currentScreenId?"bg-primary-600 text-white":"bg-gray-200 text-gray-700 hover:bg-gray-300"}`,children:t.name},t.id))})}),e.jsxs("div",{className:"mt-6 grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{className:"bg-gray-50 p-3 rounded-lg",children:[e.jsx("div",{className:"text-2xl font-bold text-gray-900",children:r.screens.length}),e.jsx("div",{className:"text-sm text-gray-500",children:"Screens"})]}),e.jsxs("div",{className:"bg-gray-50 p-3 rounded-lg",children:[e.jsx("div",{className:"text-2xl font-bold text-gray-900",children:a.widgets.length}),e.jsx("div",{className:"text-sm text-gray-500",children:"Widgets"})]}),e.jsxs("div",{className:"bg-gray-50 p-3 rounded-lg",children:[e.jsx("div",{className:"text-2xl font-bold text-gray-900",children:r.screens.reduce((t,s)=>t+s.widgets.length,0)}),e.jsx("div",{className:"text-sm text-gray-500",children:"Total Widgets"})]})]})]})]})})},Ge=({project:r,canUndo:n,canRedo:o,onUndo:a,onRedo:t,onImportProject:s})=>{const[m,f]=v.useState(!1),x=r.screens.find(u=>u.id===r.currentScreenId),p=r.screens.reduce((u,l)=>u+l.widgets.length,0),i=u=>{var C;const l=(C=u.target.files)==null?void 0:C[0];if(!l)return;const S=new FileReader;S.onload=y=>{var d;try{const c=(d=y.target)==null?void 0:d.result,h=JSON.parse(c);if(h.screens&&h.device&&s){h.createdAt=new Date(h.createdAt),h.updatedAt=new Date,s(h);const b=h.screens.reduce((j,k)=>j+k.widgets.length,0);alert(`✅ Successfully imported "${h.name}"!

📊 Project Details:
• Screens: ${h.screens.length}
• Total Widgets: ${b}
• Device: ${h.device.name}
• Resolution: ${h.device.width}×${h.device.height}px

You can now view and edit the imported design!`)}else alert("Invalid project file. Please select a valid project.json file.")}catch(c){console.error("Error importing project:",c),alert("Error reading project file. Please make sure it's a valid JSON file.")}},S.readAsText(l),u.target.value=""},g=()=>{const u=Ue(r.screens,r.device,r.name);Object.entries(u).forEach(([l,S])=>{const C=new Blob([S],{type:"text/plain"}),y=URL.createObjectURL(C),d=document.createElement("a");d.href=y,d.download=l,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(y)}),alert(`Generated ${Object.keys(u).length} files for ${r.screens.length} screens with ${p} widgets!`)},w=()=>{const u={...r,savedAt:new Date().toISOString()},l=new Blob([JSON.stringify(u,null,2)],{type:"application/json"}),S=URL.createObjectURL(l),C=document.createElement("a");C.href=S,C.download=`${r.name.toLowerCase().replace(/\s+/g,"-")}.json`,document.body.appendChild(C),C.click(),document.body.removeChild(C),URL.revokeObjectURL(S)};return e.jsxs("header",{className:"bg-white border-b border-gray-200 px-6 py-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("h1",{className:"text-xl font-semibold text-gray-900",children:"IoT GUI Builder"}),e.jsxs("div",{className:"text-sm text-gray-500",children:[r.device.name," (",r.device.width,"×",r.device.height,")"]}),e.jsxs("div",{className:"text-sm text-gray-400",children:[r.screens.length," screen",r.screens.length!==1?"s":""," • ",p," widget",p!==1?"s":""]}),x&&e.jsx("div",{className:"text-sm text-primary-600 font-medium",children:x.name})]}),e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsxs("div",{className:"flex items-center border border-gray-200 rounded-md",children:[e.jsx("button",{onClick:a,disabled:!n,className:"flex items-center space-x-1 px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors",title:"Undo (Ctrl+Z)",children:e.jsx(be,{size:14})}),e.jsx("div",{className:"w-px h-6 bg-gray-200"}),e.jsx("button",{onClick:t,disabled:!o,className:"flex items-center space-x-1 px-2 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors",title:"Redo (Ctrl+Y)",children:e.jsx(ve,{size:14})})]}),e.jsxs("button",{onClick:()=>f(!0),className:"flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors",children:[e.jsx(we,{size:16}),e.jsx("span",{children:"Preview"})]}),e.jsxs("button",{onClick:w,className:"flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors",children:[e.jsx(Se,{size:16}),e.jsx("span",{children:"Save"})]}),e.jsxs("button",{className:"flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors",children:[e.jsx(Ce,{size:16}),e.jsx("span",{children:"Settings"})]}),e.jsxs("label",{className:"flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors cursor-pointer",children:[e.jsx(ke,{size:16}),e.jsx("span",{children:"Import Project"}),e.jsx("input",{type:"file",accept:".json",onChange:i,className:"hidden"})]}),e.jsxs("button",{onClick:g,disabled:p===0,className:"flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors",children:[e.jsx(je,{size:16}),e.jsx("span",{children:"Generate Code"})]})]})]}),e.jsx(Ve,{project:r,isOpen:m,onClose:()=>f(!1)})]})},We=({screens:r,currentScreenId:n,onSwitchScreen:o,onAddScreen:a,onDuplicateScreen:t,onDeleteScreen:s})=>{const[m,f]=v.useState(!1),[x,p]=v.useState(""),[i,g]=v.useState(null),w=()=>{x.trim()&&(a(x.trim()),p(""),f(!1))},u=l=>{l.key==="Enter"?w():l.key==="Escape"&&(f(!1),p(""))};return e.jsxs("div",{className:"bg-white border-b border-gray-200 px-4 py-2",children:[e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx(Ee,{size:16,className:"text-gray-500"}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Screens:"}),e.jsx("div",{className:"flex items-center space-x-1",children:r.map(l=>e.jsxs("div",{className:"relative",children:[e.jsxs("button",{onClick:()=>o(l.id),className:`
                                    px-3 py-1.5 text-sm rounded-md transition-colors flex items-center space-x-2
                                    ${l.id===n?"bg-primary-100 text-primary-700 border border-primary-200":"text-gray-600 hover:bg-gray-100"}
                                `,children:[e.jsx("span",{children:l.name}),l.isStartup&&e.jsx("div",{className:"w-2 h-2 bg-green-500 rounded-full",title:"Startup screen"})]}),e.jsx("button",{onClick:S=>{S.stopPropagation(),g(i===l.id?null:l.id)},className:"absolute -top-1 -right-1 w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",children:e.jsx(Ie,{size:12})}),i===l.id&&e.jsxs("div",{className:"absolute top-8 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32",children:[e.jsxs("button",{onClick:()=>{t(l.id),g(null)},className:"w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2",children:[e.jsx(Ne,{size:14}),e.jsx("span",{children:"Duplicate"})]}),r.length>1&&e.jsxs("button",{onClick:()=>{s(l.id),g(null)},className:"w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center space-x-2",children:[e.jsx(Y,{size:14}),e.jsx("span",{children:"Delete"})]})]})]},l.id))}),m?e.jsxs("div",{className:"flex items-center space-x-2",children:[e.jsx("input",{type:"text",value:x,onChange:l=>p(l.target.value),onKeyDown:u,placeholder:"Screen name",className:"px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500",autoFocus:!0}),e.jsx("button",{onClick:w,disabled:!x.trim(),className:"px-2 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed",children:"Add"}),e.jsx("button",{onClick:()=>{f(!1),p("")},className:"px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded",children:"Cancel"})]}):e.jsxs("button",{onClick:()=>f(!0),className:"flex items-center space-x-1 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors",children:[e.jsx($e,{size:14}),e.jsx("span",{children:"Add Screen"})]})]}),i&&e.jsx("div",{className:"fixed inset-0 z-0",onClick:()=>g(null)})]})};class V{constructor(){R(this,"history",[]);R(this,"currentIndex",-1);R(this,"maxHistorySize",50)}addState(n,o,a){this.currentIndex<this.history.length-1&&(this.history=this.history.slice(0,this.currentIndex+1));const t={screens:JSON.parse(JSON.stringify(n)),currentScreenId:o,timestamp:Date.now(),action:a};this.history.push(t),this.currentIndex++,this.history.length>this.maxHistorySize&&(this.history.shift(),this.currentIndex--)}canUndo(){return this.currentIndex>0}canRedo(){return this.currentIndex<this.history.length-1}undo(){return this.canUndo()?(this.currentIndex--,this.history[this.currentIndex]):null}redo(){return this.canRedo()?(this.currentIndex++,this.history[this.currentIndex]):null}getCurrentAction(){return this.currentIndex>=0&&this.currentIndex<this.history.length?this.history[this.currentIndex].action:""}clear(){this.history=[],this.currentIndex=-1}}const Oe={name:"ESP32-S3 Display",width:480,height:320,pixelDensity:1},G={id:T(),name:"Main Screen",widgets:[],isStartup:!0,backgroundColor:"#000000"},He=()=>{const[r,n]=v.useState({id:T(),name:"New Project",device:Oe,screens:[G],currentScreenId:G.id,createdAt:new Date,updatedAt:new Date,version:1}),[o,a]=v.useState(null),t=v.useRef(new V),s=r.screens.find(d=>d.id===r.currentScreenId)||r.screens[0],m=v.useCallback(d=>{t.current.addState(r.screens,r.currentScreenId,d)},[r.screens,r.currentScreenId]),f=v.useCallback(()=>{const d=t.current.undo();d&&(n(c=>({...c,screens:d.screens,currentScreenId:d.currentScreenId,updatedAt:new Date})),a(null))},[]),x=v.useCallback(()=>{const d=t.current.redo();d&&(n(c=>({...c,screens:d.screens,currentScreenId:d.currentScreenId,updatedAt:new Date})),a(null))},[]);v.useEffect(()=>{const d=c=>{(c.ctrlKey||c.metaKey)&&(c.key==="z"&&!c.shiftKey?(c.preventDefault(),f()):(c.key==="z"&&c.shiftKey||c.key==="y")&&(c.preventDefault(),x()))};return document.addEventListener("keydown",d),()=>document.removeEventListener("keydown",d)},[f,x]);const p=v.useCallback((d,c)=>{const h=B(d);if(!h)return;const b=Math.max(0,...s.widgets.map(k=>k.zIndex||0)),j={id:T(),type:d,position:c,size:h.defaultSize,properties:h.defaultProperties,dataBinding:{type:"static"},category:h.category,zIndex:b+1};n(k=>{const N=k.screens.map(E=>E.id===k.currentScreenId?{...E,widgets:[...E.widgets,j]}:E);return{...k,screens:N,updatedAt:new Date}}),a(j),m(`Add ${d} widget`)},[m,s.widgets]),i=v.useCallback((d,c)=>{n(h=>{const b=h.screens.map(j=>j.id===h.currentScreenId?{...j,widgets:j.widgets.map(k=>k.id===d?{...k,...c}:k)}:j);return{...h,screens:b,updatedAt:new Date}}),(o==null?void 0:o.id)===d&&a(h=>h?{...h,...c}:null),m("Update widget")},[o,m]),g=v.useCallback(d=>{n(c=>{const h=c.screens.map(b=>b.id===c.currentScreenId?{...b,widgets:b.widgets.filter(j=>j.id!==d)}:b);return{...c,screens:h,updatedAt:new Date}}),(o==null?void 0:o.id)===d&&a(null),m("Delete widget")},[o,m]),w=v.useCallback((d,c)=>{const h=s.widgets,b=h.find(E=>E.id===d);if(!b)return;const j=h.slice().sort((E,D)=>(E.zIndex||0)-(D.zIndex||0)),k=j.findIndex(E=>E.id===d);let N;switch(c){case"front":N=Math.max(...h.map(E=>E.zIndex||0))+1;break;case"back":N=Math.min(...h.map(E=>E.zIndex||0))-1;break;case"forward":k<j.length-1?N=(j[k+1].zIndex||0)+.5:N=(b.zIndex||0)+1;break;case"backward":k>0?N=(j[k-1].zIndex||0)-.5:N=(b.zIndex||0)-1;break;default:return}i(d,{zIndex:N}),m(`${c} widget`)},[s.widgets,i,m]),u=v.useCallback(d=>{const c={id:T(),name:d,widgets:[],backgroundColor:"#000000"};n(h=>({...h,screens:[...h.screens,c],currentScreenId:c.id,updatedAt:new Date})),a(null),m(`Add screen: ${d}`)},[m]),l=v.useCallback(d=>{n(c=>({...c,currentScreenId:d,updatedAt:new Date})),a(null)},[]),S=v.useCallback(d=>{const c=r.screens.find(b=>b.id===d);if(!c)return;const h={...JSON.parse(JSON.stringify(c)),id:T(),name:`${c.name} Copy`,widgets:c.widgets.map(b=>({...b,id:T()}))};n(b=>({...b,screens:[...b.screens,h],currentScreenId:h.id,updatedAt:new Date})),m(`Duplicate screen: ${c.name}`)},[r.screens,m]),C=v.useCallback(d=>{if(r.screens.length<=1)return;const c=r.screens.find(b=>b.id===d),h=r.screens.filter(b=>b.id!==d);n(b=>({...b,screens:h,currentScreenId:b.currentScreenId===d?h[0].id:b.currentScreenId,updatedAt:new Date})),a(null),m(`Delete screen: ${c==null?void 0:c.name}`)},[r.screens,m]),y=v.useCallback(d=>{n(d),a(null),t.current=new V,t.current.addState(d.screens,d.currentScreenId,"Project imported")},[]);return e.jsxs("div",{className:"h-full flex flex-col overflow-hidden",children:[e.jsx(Ge,{project:r,canUndo:t.current.canUndo(),canRedo:t.current.canRedo(),onUndo:f,onRedo:x,onImportProject:y}),e.jsxs("div",{className:"flex-1 flex overflow-hidden",children:[e.jsx(Fe,{}),e.jsxs("div",{className:"flex-1 flex flex-col overflow-hidden",children:[e.jsx(We,{screens:r.screens,currentScreenId:r.currentScreenId,onSwitchScreen:l,onAddScreen:u,onDuplicateScreen:S,onDeleteScreen:C}),e.jsx(Ae,{widgets:s.widgets,device:r.device,selectedWidget:o,onWidgetSelect:a,onWidgetAdd:p,onWidgetUpdate:i,onWidgetDelete:g,onLayerChange:w,backgroundColor:s.backgroundColor})]}),e.jsx(Be,{selectedWidget:o,onWidgetUpdate:i})]})]})};function Ye(){return e.jsx(ee,{backend:te,children:e.jsx("div",{className:"h-screen bg-gray-50",children:e.jsx(He,{})})})}A.createRoot(document.getElementById("root")).render(e.jsx(W.StrictMode,{children:e.jsx(Ye,{})}));
