(this.webpackJsonpcurrency=this.webpackJsonpcurrency||[]).push([[0],{433:function(e,t,a){},434:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(0),c=a.n(r),o=a(22),i=a.n(o),s=a(13),l=a(16),j=a(26),d=a.n(j),u=a(37),p=a(477),b=a(258),O=a(474),h=a(151),x=a.n(h),m=Object(r.createContext)(),f=function(e){var t=Object(r.useState)(),a=Object(s.a)(t,2),c=a[0],o=a[1];function i(){return(i=Object(u.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get("https://api.exchangeratesapi.io/latest?base=".concat(t||"EUR")).then((function(e){return e.data.rates})).catch((function(e){console.log(e)}));case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(){return(l=Object(u.a)(d.a.mark((function e(t,a,n,r){var c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get("https://api.exchangeratesapi.io/history?start_at=".concat(n,"&end_at=").concat(r,"&symbols=").concat(a,"&base=").concat(t||"EUR")).then((function(e){return e.data.rates})).catch((function(e){console.log(e)}));case 2:return c=e.sent,e.abrupt("return",c);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(){return(j=Object(u.a)(d.a.mark((function e(t){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=".concat(t||"INR","&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=2C24h%2C7d")).then((function(e){return e.data})).catch((function(e){console.log(e)}));case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.jsx)(m.Provider,{value:{data:c,setData:o,GetDataWithBase:function(e){return i.apply(this,arguments)},GetHistoryData:function(e,t,a,n){return l.apply(this,arguments)},GetCryptoCurrencyData:function(e){return j.apply(this,arguments)}},children:e.children})},y=a(514),g=a(479),v=a(483),C=a(144),k=a(145),w=a(153),S=a(121),N=a(255),E=Object(O.a)((function(e){return{paper:{padding:e.spacing(3),paddingRight:e.spacing(5),height:"70vh",color:e.palette.text.secondary},root:{flexGrow:1},toolTip:{opacity:1,padding:"2px 5px",color:"#444",backgroundColor:"hsla(0,0%,100%,0.4)"}}})),P=function(e){var t=Object(r.useContext)(m),a=t.setData,c=t.GetDataWithBase,o=Object(r.useState)([]),i=Object(s.a)(o,2),l=i[0],j=i[1];function O(e,t){return-1*(e.value-t.value)}function h(e){var t=[];return e.forEach((function(e){var a=Object(s.a)(e,2),n=a[0],r=a[1];t.push({name:n,value:1/r})})),t=t.sort(O).slice(0)}Object(r.useEffect)((function(){e.setPath("Home"),function(){var e=Object(u.a)(d.a.mark((function e(){var t,n,r,o,i;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c("INR");case 2:if("object"!==typeof(t=e.sent)){e.next=15;break}return n=Object.entries(t),r=n[0][1],o=n[0][1],i=n[0][0],n.forEach((function(e){var t=Object(s.a)(e,2),a=t[0],n=t[1];n>r?r=n:o>n&&(o=n,i=a)})),e.next=11,c(i);case 11:t=e.sent,n=Object.entries(t),j(h(n)),a(t);case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[]);var x=function(e){var t=e.active,a=e.payload;e.label;if(t){var r=a?a[0].payload.name:"",c=a?a[0].payload.value:"";return Object(n.jsxs)("div",{className:f.toolTip,children:[Object(n.jsx)("p",{children:"Country: ".concat(r)}),Object(n.jsx)("p",{children:"Value: ".concat(c," ")})]})}return null},f=E();return Object(n.jsx)("div",{className:f.root,children:Object(n.jsxs)(p.a,{container:!0,spacing:2,children:[Object(n.jsx)(p.a,{item:!0,xs:1,sm:!1}),Object(n.jsx)(p.a,{item:!0,xs:12,sm:10,children:Object(n.jsx)(b.a,{className:f.paper,children:Object(n.jsx)(y.a,{width:"100%",height:"100%",children:Object(n.jsxs)(g.a,{data:l,children:[Object(n.jsx)(v.a,{strokeDasharray:"3 3"}),Object(n.jsx)(C.a,{dataKey:"",padding:{left:15,right:15}}),Object(n.jsx)(k.a,{}),Object(n.jsx)(w.a,{content:Object(n.jsx)(x,{})}),Object(n.jsx)(S.a,{}),Object(n.jsx)(N.a,{type:"monotone",dataKey:"value",stroke:"#82ca9d"})]})})})}),Object(n.jsx)(p.a,{item:!0,xs:1,sm:!1})]})})},D=a(20),T=a(518),R=Object(r.createContext)(),A=function(e){var t=Object(r.useContext)(m).GetDataWithBase,a=Object(r.useState)([]),c=Object(s.a)(a,2),o=c[0],i=c[1],l=Object(r.useState)(!1),j=Object(s.a)(l,2),p=j[0],b=j[1];function O(){return(O=Object(u.a)(d.a.mark((function e(){var a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getKeysCalled"),e.next=3,t();case 3:if("object"!==typeof(a=e.sent)){e.next=13;break}return a=Object(D.a)(Object(D.a)({},a),{},{EUR:1}),(a=Object.keys(a)).sort(),i(a),b(!0),e.abrupt("return",a);case 13:return console.log("rejected"),e.abrupt("return",Promise.reject());case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.jsx)(R.Provider,{value:{keys:o,isKeySet:p,FetchKeys:function(){return O.apply(this,arguments)}},children:e.children})},U=a(30),V=a(484),B=a(516),I=a(511),_=a(488),F=Object(O.a)((function(e){return{formControl:{marginLeft:e.spacing(1),marginTop:e.spacing(1),minWidth:90}}})),L=function(e){var t=e.value,a=e.countryNames,r=e.onChange,c=e.optionNo,o=e.label,i=F();return Object(n.jsxs)(V.a,{variant:"outlined",className:i.formControl,children:[o&&Object(n.jsx)(B.a,{id:"".concat(o,"-optionNo-label"),children:o}),Object(n.jsx)(I.a,{labelId:"".concat(o,"-optionNo-label"),id:o,label:o,value:t,onChange:function(e){return r(e)},children:a.map((function(e){return Object(n.jsx)(_.a,{value:e,children:e},e+c)}))})]})},G=a(489),M=a(243),K=Object(O.a)((function(e){return{options:{marginBottom:15},cover:{height:"60vh",padding:10,overflow:"scroll"},paper:{padding:"1rem 2rem 1rem 0",minWidth:500,height:"100%"},tabs:{flexGrow:1},CountryOption:{display:"flex",alignItems:"baseline",marginBottom:15},toolTip:{opacity:1,padding:"2px 5px",color:"444",backgroundColor:e.palette.background.paper},seperator:{fontSize:24,paddingLeft:10},inputFeildArea:{display:"flex",justifyContent:"center",alignItems:"baseline",marginBottom:15}}})),W=function(e){var t=function(e){var t=new Date,a=String(t.getDate()).padStart(2,"0"),n=String(t.getMonth()+1).padStart(2,"0");return t.getFullYear()-e+"-"+n+"-"+a},a=Object(r.useContext)(m),c=a.setData,o=a.GetHistoryData,i=Object(r.useContext)(R),l=i.keys,j=i.isKeySet,O=i.FetchKeys,h=Object(U.a)(),x=Object(r.useReducer)((function(e,t){switch(t.type){case"SET_COUNTRIES":return Object(D.a)(Object(D.a)({},e),{},{countries:t.payload.countries});case"UPDATE_FIRSTCOUNTRY":return Object(D.a)(Object(D.a)({},e),{},{changedFirstCountry:!0,firstCountry:t.payload.key});case"UPDATE_SECONDCOUNTRY":return Object(D.a)(Object(D.a)({},e),{},{changedFirstCountry:!1,secondCountry:t.payload.key});case"UPDATE_FIRSTVALUE":return Object(D.a)(Object(D.a)({},e),{},{firstValue:t.payload});case"UPDATE_SECONDVALUE":return Object(D.a)(Object(D.a)({},e),{},{secondValue:t.payload});case"UPDATEVALUES":return Object(D.a)(Object(D.a)({},e),{},{firstValue:t.payload.firstVal,secondValue:t.payload.secondVal});case"UPDATE_CONVERSIONRATE":return Object(D.a)(Object(D.a)({},e),{},{conversionRate:t.payload});case"SETPLOTDATA&CONVERTIONRATE":return Object(D.a)(Object(D.a)({},e),{},{plotData:t.payload.plotData,conversionRate:t.payload.rate});default:throw new Error}}),{countries:["EUR","INR"],firstCountry:"EUR",firstValue:1,secondCountry:"INR",secondValue:1,conversionRate:1,endDate:t(0),plotData:[],changedFirstCountry:!0}),f=Object(s.a)(x,2),g=f[0],N=f[1];Object(r.useEffect)((function(){if(e.setPath("Converter"),j&&l.length!==g.countries.length)N({type:"SET_COUNTRIES",payload:{countries:l}});else if(!j){function t(){return(t=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O();case 2:t=e.sent,N({type:"SET_COUNTRIES",payload:{countries:t}});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}}),[]);var E=function(e,t){return e.name>t.name?1:-1};Object(r.useEffect)((function(){var e=t(1);(function(){var t=Object(u.a)(d.a.mark((function t(){var a,n,r,i,l;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o(g.firstCountry,g.secondCountry,e,g.endDate);case 2:"object"===typeof(a=t.sent)&&(n=[],a=Object.entries(a),c(a),a.forEach((function(e){var t=Object(s.a)(e,2),a=t[0],r=t[1];n.push({name:a,value:r[g.secondCountry]})})),n.sort(E),r=n[n.length-1].value,N({type:"SETPLOTDATA&CONVERTIONRATE",payload:{plotData:n,rate:r}}),g.changedFirstCountry?(i=g.firstValue*r,N({type:"UPDATEVALUES",payload:{firstVal:g.firstValue,secondVal:i}})):(l=g.secondValue/r,N({type:"UPDATEVALUES",payload:{firstVal:l,secondVal:g.secondValue}})));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[g.secondCountry,g.firstCountry]);var P=function(e){var t=e.active,a=e.payload;e.label;if(t){var r=a?a[0].payload.name:"",c=a?a[0].payload.value:"";return Object(n.jsxs)("div",{className:A.toolTip,children:[Object(n.jsx)("p",{children:"Date: ".concat(r)}),Object(n.jsx)("p",{children:"Value: ".concat(c," ")})]})}return null},A=K();return Object(n.jsxs)(p.a,{container:!0,direction:"column",spacing:2,children:[Object(n.jsxs)("div",{className:A.inputFeildArea,children:[Object(n.jsx)(L,{value:g.firstCountry,onChange:function(e){var t=e.target.value;t===g.secondCountry?alert("Base and country cannot be same"):N({type:"UPDATE_FIRSTCOUNTRY",payload:{key:t}})},countryNames:g.countries,optionNo:1,label:"Base"}),Object(n.jsx)("span",{className:A.seperator,children:" : "}),Object(n.jsx)(L,{value:g.secondCountry,onChange:function(e){var t=e.target.value;t===g.firstCountry?alert("Base and country cannot be same"):N({type:"UPDATE_SECONDCOUNTRY",payload:{key:t}})},countryNames:g.countries,optionNo:2,label:"Country"})]}),Object(n.jsxs)("div",{className:A.inputFeildArea,children:[Object(n.jsx)(T.a,{style:{marginLeft:10},id:"outlined-number",type:"number",InputLabelProps:{shrink:!0},variant:"outlined",value:g.firstValue,onChange:function(e){var t=e.target.value;if(t<0)alert("Negative value not allowed");else{var a=g.conversionRate*t;N({type:"UPDATEVALUES",payload:{firstVal:t,secondVal:a}})}}}),Object(n.jsx)("span",{className:A.seperator,children:" : "}),Object(n.jsx)(T.a,{style:{marginLeft:10},id:"outlined-number",type:"number",InputLabelProps:{shrink:!0},variant:"outlined",value:g.secondValue,onChange:function(e){var t=e.target.value;if(t<0)alert("Negative value not allowed");else{var a=t/g.conversionRate;N({type:"UPDATEVALUES",payload:{firstVal:a,secondVal:t}})}}})]}),Object(n.jsxs)(p.a,{item:!0,container:!0,style:{marginTop:5},children:[Object(n.jsx)(p.a,{item:!0,xs:!1,sm:1}),Object(n.jsx)(p.a,{className:A.cover,item:!0,xs:12,sm:10,children:Object(n.jsx)(b.a,{className:A.paper,elevation:5,children:Object(n.jsx)(y.a,{width:"100%",height:"100%",children:Object(n.jsxs)(G.a,{data:g.plotData,children:[Object(n.jsx)("defs",{children:Object(n.jsxs)("linearGradient",{id:"colorUv",x1:"0",y1:"0",x2:"0",y2:"1",children:[Object(n.jsx)("stop",{offset:"5%",stopColor:"#8884d8",stopOpacity:.9}),Object(n.jsx)("stop",{offset:"95%",stopColor:"#8884d8",stopOpacity:.1})]})}),Object(n.jsx)(v.a,{strokeDasharray:"3 3"}),Object(n.jsx)(C.a,{dataKey:"name",stroke:h.palette.text.secondary}),Object(n.jsx)(k.a,{stroke:h.palette.text.secondary,type:"number",domain:[function(e){return e>1?Math.floor(e):(e-2*e/10).toFixed(3)},function(e){return e>1?Math.ceil(e):(e+3*e/10).toFixed(3)}]}),Object(n.jsx)(w.a,{content:Object(n.jsx)(P,{})}),Object(n.jsx)(S.a,{iconSize:0}),Object(n.jsx)(M.a,{type:"monotone",dataKey:"value",name:"Data From: ".concat(t(1)," To: ").concat(g.endDate),stroke:h.palette.text.primary,fillOpacity:1,fill:"url(#colorUv)"})]})})})}),Object(n.jsx)(p.a,{item:!0,xs:!1,sm:1})]})]})},Y=a(43),H=a(491),z=a(492),q=a(493),J=a(494),X=a(495),Q=a(106),Z=a(496),$=a(497),ee=a(513),te=a(490),ae=a(245),ne=a.n(ae),re=a(244),ce=function(e){var t={lines:11,length:0,width:20,radius:44,scale:.5,corners:1,speed:.8,rotate:0,animation:"spinner-line-shrink",direction:1,color:Object(U.a)().palette.text.primary,fadeColor:"transparent",top:"50%",left:"50%",shadow:"0 0 1px transparent",zIndex:2e9,className:"spinner",position:"absolute"},a=Object(r.useRef)(null);return Object(r.useEffect)((function(){new re.a(t).spin(a.current)}),[]),Object(n.jsx)("div",{style:{width:"100%",height:"100%"},ref:a})},oe=Object(O.a)((function(e){return{options:{marginBottom:15},cover:{height:"50vh",padding:10,overflow:"scroll"},paper:{padding:"1rem 0.5rem 1rem 0",minWidth:500,height:"100%"},tabs:{flexGrow:1},CountryOption:{display:"flex",alignItems:"baseline",marginBottom:15},toolTip:{opacity:1,padding:"2px 5px",color:"444",backgroundColor:"hsla(0,0%,100%,0.4)"},dialogBox:{margin:"2rem"}}})),ie=function(e,t){var a=new Date,n=String(a.getDate()).padStart(2,"0"),r=String(a.getMonth()+1-t).padStart(2,"0"),c=a.getFullYear()-e;return parseInt(r)<=0&&(console.log(r),c=String(parseInt(c)-1),r=String(12+parseInt(r)),console.log(r)),c+"-"+r+"-"+n},se=function(e){var t=Object(r.useContext)(R),a=t.keys,c=t.isKeySet,o=t.FetchKeys,i=Object(r.useContext)(m).GetHistoryData,l=Object(r.useState)([]),j=Object(s.a)(l,2),O=j[0],h=j[1],x=Object(r.useState)(["EUR","INR"]),f=Object(s.a)(x,2),g=f[0],S=f[1],N=Object(r.useState)("1M"),E=Object(s.a)(N,2),P=E[0],T=E[1],A=Object(r.useState)(ie(0,1)),V=Object(s.a)(A,2),B=V[0],I=V[1],_=Object(r.useState)(ie(0,0)),F=Object(s.a)(_,2),K=F[0],W=(F[1],Object(r.useState)("EUR")),ae=Object(s.a)(W,2),re=ae[0],se=ae[1],le=Object(r.useState)(!0),je=Object(s.a)(le,2),de=je[0],ue=je[1],pe=Object(r.useState)([]),be=Object(s.a)(pe,2),Oe=be[0],he=be[1],xe=Object(r.useState)(!1),me=Object(s.a)(xe,2),fe=me[0],ye=me[1],ge=Object(r.useState)(!1),ve=Object(s.a)(ge,2),Ce=ve[0],ke=ve[1],we=Object(r.useState)(""),Se=Object(s.a)(we,2),Ne=Se[0],Ee=Se[1],Pe=Object(r.useState)(!0),De=Object(s.a)(Pe,2),Te=De[0],Re=De[1],Ae=Object(r.useState)(!0),Ue=Object(s.a)(Ae,2),Ve=Ue[0],Be=Ue[1],Ie=Object(r.useState)(!1),_e=Object(s.a)(Ie,2),Fe=_e[0],Le=_e[1],Ge=Object(U.a)();Object(r.useEffect)((function(){if(e.setPath("History"),c&&a.length!==g.length)S(a),ue(!1),h([].concat(Object(Y.a)(O),["INR"]));else if(!c){function t(){return(t=Object(u.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o();case 2:t=e.sent,S(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}(),ue(!1),h([].concat(Object(Y.a)(O),["INR"])),console.log(O)}}),[]);var Me=function(e,t){return e.name>t.name?1:-1};Object(r.useEffect)((function(){de||(console.log(re,O.join(","),B,K),function(){var e=Object(u.a)(d.a.mark((function e(){var t,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i(re,O.join(","),B,K);case 2:if("object"===typeof(t=e.sent)){for(a=[],(t=Object.entries(t)).forEach((function(e){var t=Object(s.a)(e,2),n=t[0],r=t[1];a.push(Object(D.a)({name:n},r))}));a.length>500;)a=a.filter((function(e,t){return t%2?e:null}));a.sort(Me),console.log(a),he(a),Re(!1),Le(!1),Be(!1)}else setTimeout((function(){Le(!0),Be(!1)}),1e3);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()());console.log(O)}),[re,O,B]);var Ke=function(){ye(!0)},We=function(e){Ee(e.target.value)},Ye=function(){ke(!1)},He=function(e){var t=e.active,a=e.payload;e.label;if(t){var r=a?a[0].payload.name:"",c=a?a[0].value:"";return Object(n.jsxs)("div",{className:ze.toolTip,children:[Object(n.jsx)("p",{children:"Date: ".concat(r)}),Object(n.jsx)("p",{children:"Value: ".concat(c," ")})]})}return null},ze=oe();return Object(n.jsxs)(p.a,{container:!0,direction:"column",spacing:2,children:[Object(n.jsxs)(p.a,{item:!0,container:!0,spacing:0,children:[Object(n.jsx)(p.a,{item:!0,xs:12,className:ze.options,children:Object(n.jsxs)(ee.a,{className:ze.tabs,value:P,onChange:function(e,t){var a;switch(T(t),Be(!0),t){case"1M":a=ie(0,1),I(a);break;case"1Y":a=ie(1,0),I(a);break;case"5Y":a=ie(5,0),I(a);break;case"MAX":a=ie(12,0),I(a);break;default:console.log(t)}},textColor:"primary",indicatorColor:"primary",centered:!0,children:[Object(n.jsx)(te.a,{label:"1M",value:"1M"}),Object(n.jsx)(te.a,{label:"1Y",value:"1Y"}),Object(n.jsx)(te.a,{label:"5Y",value:"5Y"}),Object(n.jsx)(te.a,{label:"Max",value:"MAX"})]})}),Object(n.jsxs)(p.a,{item:!0,xs:12,container:!0,style:{flexGrow:1},justify:"center",children:[Object(n.jsx)(H.a,{style:{marginRight:"0.5rem"},variant:"contained",color:"primary",elevation:2,onClick:Ke,children:"+ Add Country"}),Object(n.jsx)(z.a,{disableBackdropClick:!0,disableEscapeKeyDown:!0,open:fe,onClose:Ke,children:Object(n.jsxs)("div",{className:ze.dialogBox,children:[Object(n.jsx)(q.a,{children:"Choose Country"}),Object(n.jsx)(J.a,{children:Object(n.jsx)(L,{value:Ne,onChange:We,countryNames:g,optionNo:1})}),Object(n.jsxs)(X.a,{children:[Object(n.jsx)(H.a,{onClick:function(){ye(!1)},variant:"contained",color:"primary",children:"Cancel"}),Object(n.jsx)(H.a,{onClick:function(){Ne===re||O.includes(Ne)?(alert("Country already ploted or it selected as the Base"),Ee("")):(h([].concat(Object(Y.a)(O),[Ne])),ye(!1),Ee(""),Re(!0))},variant:"contained",color:"primary",children:"Ok"})]})]})}),Object(n.jsx)(H.a,{style:{marginLeft:"0.5rem"},variant:"contained",color:"primary",elevation:2,onClick:function(){ke(!0)},children:"Change Base"}),Object(n.jsx)(z.a,{disableBackdropClick:!0,disableEscapeKeyDown:!0,open:Ce,onClose:Ye,children:Object(n.jsxs)("div",{className:ze.dialogBox,children:[Object(n.jsx)(q.a,{children:"Choose Base"}),Object(n.jsx)(J.a,{children:Object(n.jsx)(L,{value:Ne,onChange:We,countryNames:g,optionNo:1})}),Object(n.jsxs)(X.a,{children:[Object(n.jsx)(H.a,{onClick:Ye,variant:"contained",color:"primary",children:"Cancel"}),Object(n.jsx)(H.a,{onClick:function(e){O.includes(Ne)?(alert("Base and country cannot be same"),Ee("")):(se(Ne),ke(!1),Be(!0),Ee(""))},variant:"contained",color:"primary",children:"Ok"})]})]})})]}),Object(n.jsxs)(p.a,{item:!0,xs:12,container:!0,style:{flexGrow:1,marginTop:"0.5rem"},direction:"column",justify:"center",children:[Object(n.jsxs)(Q.a,{variant:"caption",align:"center",component:"div",children:[Object(n.jsx)("span",{style:{marginRight:"0.5rem"},children:"Data From: ".concat(B," ")}),Object(n.jsx)("span",{style:{marginLeft:"0.5rem"},children:" To: ".concat(K)})]}),Object(n.jsxs)(Q.a,{variant:"caption",align:"center",component:"div",children:[Object(n.jsxs)("span",{style:{marginRight:"0.5rem"},children:["Base Country: ",re]}),Object(n.jsxs)("span",{style:{marginLeft:"0.5rem"},children:["PlotedCountries:",Object(n.jsx)("span",{style:{marginLeft:"0.25rem"},children:O.map((function(e,t){return Object(n.jsx)(Z.a,{style:{color:Ge.palette.success.info},href:"#".concat(e),children:t!==O.length-1?e+",":e})}))})]})]})]})]}),Fe&&Object(n.jsx)(p.a,{item:!0,xs:12,justify:"center",alignItems:"center",style:{marginTop:"3rem"},children:Object(n.jsx)(Q.a,{component:"div",variant:"h4",align:"center",children:"No data found"})}),Fe?null:Ve?Object(n.jsx)(p.a,{item:!0,xs:12,style:{position:"relative",height:"50vh"},children:Object(n.jsx)(ce,{})}):O.map((function(e,t){return Object(n.jsxs)(p.a,{item:!0,id:e,container:!0,style:{marginTop:5},children:[Object(n.jsx)(p.a,{item:!0,xs:!1,sm:1}),Object(n.jsx)(p.a,{className:ze.cover,item:!0,xs:12,sm:10,children:Object(n.jsxs)(b.a,{style:{position:"relative"},className:ze.paper,elevation:5,children:[Object(n.jsxs)(p.a,{container:!0,children:[Object(n.jsx)(p.a,{item:!0,xs:1}),Object(n.jsx)(p.a,{item:!0,xs:10,children:Object(n.jsx)(Q.a,{variant:"h4",align:"center",children:e})}),Object(n.jsx)(p.a,{item:!0,xs:1,children:Object(n.jsx)($.a,{"aria-label":"delete",onClick:function(){return function(e){var t=Object(Y.a)(O);t=t.filter((function(t){return t!==e})),h(t)}(e)},children:Object(n.jsx)(ne.a,{color:"secondary"})})})]}),Te&&O.length-1===t?Object(n.jsx)("div",{style:{position:"absolute",width:"95%",height:"70%",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(n.jsx)(ce,{})}):Object(n.jsx)(y.a,{width:"100%",height:"90%",children:Object(n.jsxs)(G.a,{data:Oe,margin:{top:10,right:30,left:0,bottom:10},syncId:"Chart",children:[Object(n.jsx)("defs",{children:Object(n.jsxs)("linearGradient",{id:"colorUv",x1:"0",y1:"0",x2:"0",y2:"1",children:[Object(n.jsx)("stop",{offset:"5%",stopColor:"#8884d8",stopOpacity:.9}),Object(n.jsx)("stop",{offset:"95%",stopColor:"#8884d8",stopOpacity:.1})]})}),Object(n.jsx)(v.a,{strokeDasharray:"3 3"}),Object(n.jsx)(C.a,{dataKey:"name",stroke:Ge.palette.text.secondary}),Object(n.jsx)(k.a,{stroke:Ge.palette.text.secondary,type:"number",domain:[function(e){return e>1?Math.floor(e):(e-2*e/10).toFixed(3)},function(e){return e>1?Math.ceil(e):(e+3*e/10).toFixed(3)}]}),Object(n.jsx)(w.a,{content:Object(n.jsx)(He,{})}),Object(n.jsx)(M.a,{type:"monotone",dataKey:e,stroke:Ge.palette.text.secondary,fillOpacity:1,fill:"url(#colorUv)"})]})})]})}),Object(n.jsx)(p.a,{item:!0,xs:!1,sm:1})]})}))]})},le=a(500),je=a(487),de=a(436),ue=a(498),pe=a(499),be=a(147),Oe=function(e){var t=e.icon,a=e.primary,r=e.to,o=c.a.useMemo((function(){return c.a.forwardRef((function(e,t){return Object(n.jsx)(be.b,Object(D.a)({to:r,ref:t},e))}))}),[r]);return Object(n.jsx)("li",{children:Object(n.jsxs)(de.a,{button:!0,component:o,children:[t?Object(n.jsx)(ue.a,{children:t}):null,Object(n.jsx)(pe.a,{primary:a})]})})},he=a(246),xe=a.n(he),me=a(247),fe=a.n(me),ye=a(248),ge=a.n(ye),ve=a(249),Ce=a.n(ve),ke=Object(O.a)((function(e){return{toolbar:e.mixins.toolbar}}));var we=function(){var e=ke();return Object(n.jsxs)("div",{className:e.wrapper,children:[Object(n.jsx)("div",{className:e.toolbar}),Object(n.jsx)(le.a,{}),Object(n.jsxs)(je.a,{children:[Object(n.jsx)(Oe,{to:"/",primary:"Home",icon:Object(n.jsx)(xe.a,{})}),Object(n.jsx)(Oe,{to:"/history",primary:"History",icon:Object(n.jsx)(fe.a,{})}),Object(n.jsx)(Oe,{to:"/converter",primary:"Converter",icon:Object(n.jsx)(ge.a,{})})]}),Object(n.jsx)(le.a,{}),Object(n.jsx)(je.a,{children:Object(n.jsx)(Oe,{to:"/cryptoCurrency",primary:"CryptoCurrency",icon:Object(n.jsx)(Ce.a,{})})})]})},Se=a(31),Ne=a(253),Ee=a(508),Pe=a(510),De=a(507),Te=a(250),Re=a.n(Te),Ae=a(252),Ue=a.n(Ae),Ve=a(251),Be=a.n(Ve),Ie=a(509),_e=a(515),Fe=a(521),Le=a(504),Ge=a(505),Me=a(506),Ke=a(502),We=a(503),Ye=a(520),He=a(501),ze=a(519),qe=function(e){var t=e.classes,a=e.order,r=e.orderBy,c=e.onRequestSort,o=e.headCell;return Object(n.jsx)(He.a,{children:Object(n.jsx)(Ke.a,{children:o.map((function(e){return Object(n.jsxs)(We.a,{align:e.align,padding:e.disablePadding?"none":"default",sortDirection:r===e.id&&a,children:[" ",e.allowSort?Object(n.jsxs)(ze.a,{active:r===e.id,direction:r===e.id?a:"asc",onClick:(o=e.id,function(e){c(e,o)}),children:[e.label,r===e.id?Object(n.jsx)("span",{className:t.visuallyHidden,children:"desc"===a?"sorted descending":"sorted ascending"}):null]}):Object(n.jsx)(ze.a,{children:e.label})]},e.id);var o}))})})},Je=Object(O.a)((function(e){return{root:{width:"100%",height:"100%"},paper:{width:"100%",height:"100%",marginBottom:e.spacing(2)},table:{minWidth:550},visuallyHidden:{border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",top:20,width:1},logoWrapper:{display:"flex",alignItems:"center"},logo:{height:"1.5rem",margin:"0 0.5rem 0 0"},incresePercentage:{color:"green"}}}));function Xe(e,t,a,n,r,c,o,i,s){var l=s.map((function(e){return{value:e}}));return{ranking:e,imgSrc:n,name:t,price:a,marketChange24h:r,marketChange7d:c,totalVolume:o,marketCap:i,plotData:l=l.filter((function(e,t){return t%2===0}))}}var Qe=[{id:"ranking",align:"right",numeric:!0,disablePadding:!0,label:"",allowSort:!0},{id:"name",numeric:!1,align:"left",disablePadding:!0,label:"Name",allowSort:!0},{id:"price",align:"right",numeric:!0,disablePadding:!1,label:"Price",allowSort:!0},{id:"marketChange24h",align:"right",numeric:!0,disablePadding:!1,label:"24H",allowSort:!0},{id:"totalVolume",align:"right",numeric:!0,disablePadding:!1,label:"Volume",allowSort:!0},{id:"marketCap",align:"right",numeric:!0,disablePadding:!1,label:"Market Cap",allowSort:!0},{id:"last7Days",align:"center",numeric:!1,disablePadding:!1,label:"Last 7 Days",allowSort:!1}];function Ze(e,t,a){return t[a]<e[a]?-1:t[a]>e[a]?1:0}function $e(e,t){var a=e.map((function(e,t){return[e,t]}));return a.sort((function(e,a){var n=t(e[0],a[0]);return 0!==n?n:e[1]-a[1]})),a.map((function(e){return e[0]}))}var et=function(e){var t=Object(r.useReducer)((function(e,t){switch(t.type){case"SETPAGE":return Object(D.a)(Object(D.a)({},e),{},{page:t.payload.page});case"SETROWSPERPAGE":return Object(D.a)(Object(D.a)({},e),{},{rowsPerPage:t.payload.pages});default:return Object(D.a)({},e)}}),{page:0,rowsPerPage:10}),a=Object(s.a)(t,2),c=a[0],o=a[1],i=Object(r.useReducer)((function(e,t){switch(t.type){case"SETDATA":return Object(D.a)(Object(D.a)({},e),{},{cryptoData:t.payload.data,loading:!1});case"UPDATESORTINFO":return Object(D.a)(Object(D.a)({},e),{},{order:t.payload.order,orderBy:t.payload.orderBy});default:return Object(D.a)({},e)}}),{cryptoData:[],order:"desc",orderBy:"marketCap",loading:!0}),l=Object(s.a)(i,2),j=l[0],p=l[1],O=Object(r.useContext)(m).GetCryptoCurrencyData,h=Je(),x=Object(U.a)();Object(r.useEffect)((function(){function t(){return(t=Object(u.a)(d.a.mark((function e(){var t,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O();case 2:t=e.sent,a=t.map((function(e){return Xe(e.market_cap_rank,e.name,e.current_price,e.image,e.price_change_percentage_24h,e.price_change_percentage_7d_in_currency,e.total_volume,e.market_cap,e.sparkline_in_7d.price)})),p({type:"SETDATA",payload:{data:a}});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e.setPath("CryptoCurrency"),function(){t.apply(this,arguments)}()}),[]);var f,y;return Object(n.jsx)("div",{className:h.root,children:Object(n.jsxs)(b.a,{className:h.paper,children:[Object(n.jsx)(Le.a,{style:{height:"90%"},children:Object(n.jsxs)(Ge.a,{stickyHeader:!0,className:h.table,children:[Object(n.jsx)(qe,{classes:h,order:j.order,orderBy:j.orderBy,onRequestSort:function(e,t){var a=j.orderBy===t&&"asc"===j.order;p({type:"UPDATESORTINFO",payload:{order:a?"desc":"asc",orderBy:t}})},headCell:Qe}),j.loading?Object(n.jsx)(ce,{}):Object(n.jsx)(Me.a,{children:$e(j.cryptoData,(f=j.order,y=j.orderBy,"desc"===f?function(e,t){return Ze(e,t,y)}:function(e,t){return-Ze(e,t,y)})).slice(c.page*c.rowsPerPage,c.page*c.rowsPerPage+c.rowsPerPage).map((function(e,t){return Object(n.jsxs)(Ke.a,{children:[Object(n.jsx)(We.a,{component:"th",id:e.ranking,scope:"row",children:e.ranking}),Object(n.jsx)(We.a,{padding:"none",align:"left",children:Object(n.jsxs)("div",{className:h.logoWrapper,children:[Object(n.jsx)("img",{src:e.imgSrc,className:h.logo,alt:"logo"}),Object(n.jsx)("span",{children:e.name})]})}),Object(n.jsx)(We.a,{align:"right",children:"\u20b9"+e.price.toLocaleString()}),Object(n.jsx)(We.a,{align:"right",children:e.marketChange24h>0?Object(n.jsxs)(Q.a,{className:h.incresePercentage,children:[e.marketChange24h.toFixed(3),"%"]}):Object(n.jsxs)(Q.a,{color:"error",children:[e.marketChange24h.toFixed(3),"%"]})}),Object(n.jsx)(We.a,{align:"right",children:"\u20b9"+e.totalVolume.toLocaleString()}),Object(n.jsx)(We.a,{align:"right",children:"\u20b9"+e.marketCap.toLocaleString()}),Object(n.jsx)(We.a,{padding:"none",size:"small",style:{height:"60px"},children:Object(n.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(n.jsxs)(g.a,{width:100,height:57,data:e.plotData,children:[Object(n.jsx)(k.a,{hide:!0,domain:["dataMin","dataMax"]}),e.marketChange7d>0?Object(n.jsx)(N.a,{animationDuration:500,dot:!1,connectNulls:!0,type:"monotone",dataKey:"value",stroke:"green",strokeWidth:2}):Object(n.jsx)(N.a,{animationDuration:500,dot:!1,connectNulls:!0,type:"monotone",dataKey:"value",stroke:x.palette.error[x.palette.type],strokeWidth:2})]})})})]},e.name)}))})]})}),Object(n.jsx)(Ye.a,{rowsPerPageOptions:[5,10,15],component:"div",count:j.cryptoData.length,rowsPerPage:c.rowsPerPage,page:c.page,onChangePage:function(e,t){o({type:"SETPAGE",payload:{page:parseInt(t)}})},onChangeRowsPerPage:function(e){o({type:"SETROWSPERPAGE",payload:{pages:e.target.value}})}})]})})},tt=240,at=Object(O.a)((function(e){return{root:{display:"flex"},drawer:Object(l.a)({},e.breakpoints.up("md"),{width:tt,flexShrink:0}),appBar:Object(l.a)({},e.breakpoints.up("md"),{width:"calc(100% - ".concat(tt,"px)"),marginLeft:tt}),menuButton:Object(l.a)({marginRight:e.spacing(2)},e.breakpoints.up("md"),{display:"none"}),toolbar:e.mixins.toolbar,drawerPaper:{backgroundColor:e.palette.primary.type,width:tt},content:{flexGrow:1},title:{flexGrow:1},container:{overflow:"scroll",padding:e.spacing(3),maxWidth:"100vw",height:"92vh"}}}));var nt=function(e){var t=at(),a=e.window,c=Object(U.a)(),o=Object(r.useState)(!1),i=Object(s.a)(o,2),l=i[0],j=i[1],d=Object(r.useState)(""),u=Object(s.a)(d,2),p=u[0],O=u[1],h=Object(r.useState)(!1),x=Object(s.a)(h,2),m=x[0],y=x[1],g=Object(Ne.a)({palette:{type:m?"dark":"light"}}),v=function(){j(!l)},C=void 0!==a?function(){return a().document.body}:void 0;return Object(n.jsx)(Ee.a,{theme:g,children:Object(n.jsxs)(b.a,{className:t.root,elevation:0,children:[Object(n.jsx)(Ie.a,{}),Object(n.jsxs)(be.a,{children:[Object(n.jsx)(Pe.a,{position:"fixed",className:t.appBar,children:Object(n.jsxs)(De.a,{children:[Object(n.jsx)($.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu",onClick:v,children:Object(n.jsx)(Re.a,{})}),Object(n.jsx)(Q.a,{variant:"h6",className:t.title,children:p}),Object(n.jsx)(H.a,{onClick:function(){y(!m)},color:"inherit",children:m?Object(n.jsx)(Be.a,{}):Object(n.jsx)(Ue.a,{})})]})}),Object(n.jsxs)("nav",{style:{backgroundColor:"#555"},className:t.drawer,"aria-label":"Navigation Options",children:[Object(n.jsx)(_e.a,{mdUp:!0,children:Object(n.jsx)(Fe.a,{container:C,variant:"temporary",anchor:"rtl"===c.direction?"right":"left",open:l,onClose:v,classes:{paper:t.drawerPaper},ModalProps:{keepMounted:!0},children:Object(n.jsx)(we,{})})}),Object(n.jsx)(_e.a,{smDown:!0,children:Object(n.jsx)(Fe.a,{classes:{paper:t.drawerPaper},variant:"permanent",open:!0,children:Object(n.jsx)(we,{})})})]}),Object(n.jsxs)("main",{className:t.content,children:[Object(n.jsx)("div",{className:t.toolbar}),Object(n.jsx)("div",{className:t.container,children:Object(n.jsx)(f,{children:Object(n.jsx)(A,{children:Object(n.jsxs)(Se.c,{children:[Object(n.jsx)(Se.a,{exact:!0,path:"/",children:Object(n.jsx)(P,{setPath:O})}),Object(n.jsx)(Se.a,{path:"/converter",children:Object(n.jsx)(W,{setPath:O})}),Object(n.jsx)(Se.a,{path:"/history",children:Object(n.jsx)(se,{setPath:O})}),Object(n.jsx)(Se.a,{path:"/cryptoCurrency",children:Object(n.jsx)(et,{setPath:O})})]})})})})]})]})]})})};a(433);i.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(nt,{})}),document.getElementById("root"))}},[[434,1,2]]]);
//# sourceMappingURL=main.f37c800d.chunk.js.map