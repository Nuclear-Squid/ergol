(()=>{function v(r){return r&&r.length===2&&r[0]==="*"}function k(r,e){let s=[];return Object.entries(r).forEach(([t,i])=>{let c=i.indexOf(e);c>=0&&s.push({id:t,level:c})}),s.sort((t,i)=>t.level>i.level)}function U(r){let e={};return Object.entries(r).forEach(([s,t])=>{Object.entries(t).forEach(([i,c])=>{c in e||(e[c]=[]),e[c].push({id:s,base:i})})}),e}function F(r,e,s=""){let t=[];return Array.from(s).forEach(i=>{let c=k(r,i);if(c.length)t.push(c[0]);else if(i in e){let y=e[i][0],h=k(r,y.id)[0];h?t.push(h):(t.push(k(r,"**")[0]),t.push(k(r,e[y.id][0].base)[0])),t.push(k(r,y.base)[0])}else t.push({})}),t}var Q={ShiftLeft:!1,ShiftRight:!1,ControlLeft:!1,ControlRight:!1,AltLeft:!1,AltRight:!1,OSLeft:!1,OSRight:!1};function I(r){return r.ShiftRight||r.ShiftLeft}function q(r,e){return e==="win"?r.AltRight||r.ControlLeft&&r.AltLeft:e==="mac"?r.AltRight||r.AltLeft:r.AltRight}function j(r,e){return(I(r)?1:0)+(q(r,e)?2:0)}function B(r={},e={},s=""){let t={...Q},i=U(e),c,y="",h=e["**"];return h!==void 0&&(r=Object.fromEntries(Object.entries(r).map(([g,f])=>(f.length<4&&(f=f.concat(new Array(4-f.length))),f=Array.from(f),f.length<=4&&(f.push(h[f[0]]),f.push(h[f[1]])),[g,f])))),{get keyMap(){return r},get deadKeys(){return e},get pendingDK(){return c},get geometry(){return s},get platform(){return y},set platform(g){y=g},get modifiers(){return{get shift(){return I(t)},get altgr(){return q(t,y)},get level(){return j(t,y)}}},getKey:g=>k(r,g)[0],getKeySequence:g=>F(r,i,g),keyUp:g=>{g in t&&(t[g]=!1)},keyDown:g=>{g in t&&(t[g]=!0);let f=r[g];if(!f)return"";let m=f[j(t,y)];return c&&(m=c[m]||"",c=void 0),v(m)?(c=e[m],""):m||""}}}var D=`/**
 * Color Themes
 */

svg, :root {
  color-scheme: light dark;

  --key-txt:    #333;
  --key-fg:     #666;
  --key-bg:     #f8f8f8;
  --special-bg: #e4e4e4;
  --special-fg: #555;
  --target-bg:  #aad;
  --hint-bg:    #a33;
  --press-bg:   #335;
  --press-fg:   #fff;

  --altgr-txt:  blue;
  --1dk-txt:    green;
  --dk-txt:     red;

  --bar-bg:    hsl(-90deg, 100%, 90%);
  --col0-bg:   hsl(-90deg, 100%, 90%);
  --col1-bg:   hsl(200deg, 100%, 85%);
  --col2-bg:   hsl(136deg, 100%, 85%);
  --col3-bg:   hsl( 60deg, 100%, 85%);
  --col4-bg:   hsl( 30deg, 100%, 90%);
  --col4-bg:   hsl(-20deg, 100%, 90%);

  --pinky-bg:  hsl(-90deg,  70%, 90%);
  --number-bg: hsl(295deg, 100%, 95%);
  --letter-bg: hsl(222deg, 100%, 95%);
  --home-bg:   hsl(222deg, 100%, 90%);
}

@media (prefers-color-scheme: dark) { svg, :root {
  --key-txt:    #bbb;
  --key-fg:     #777;
  --key-bg:     #4d4d4d;
  --special-bg: #333;
  --special-fg: #888;
  --target-bg:  #558;
  --press-bg:   #449;

  --altgr-txt:  #99f;
  --1dk-txt:    #6d6;
  --dk-txt:     #f44;

  --bar-bg:    hsl(-90deg, 25%, 35%);
  --col0-bg:   hsl(-90deg, 25%, 50%);
  --col1-bg:   hsl(225deg, 25%, 40%);
  --col2-bg:   hsl(135deg, 25%, 40%);
  --col3-bg:   hsl( 40deg, 27%, 48%);
  --col4-bg:   hsl(330deg, 25%, 53%);

  --pinky-bg:  hsl(-90deg, 10%, 40%);
  --number-bg: hsl(280deg, 10%, 34%);
  --letter-bg: hsl(220deg, 15%, 35%);
  --home-bg:   hsl(225deg, 30%, 30%);
}}

rect, path {
  fill:   var(--key-bg);
  stroke: var(--key-fg);
  stroke-width: .5px;
}
.specialKey,
.specialKey rect,
.specialKey path { fill: var(--special-bg); }

g:target rect, .press rect,
g:target path, .press path { fill: var(--target-bg); }

text {
  font: normal 20px sans-serif;
  fill: var(--key-txt);
  text-shadow: 1px 1px var(--key-bg);
  text-align: center;
}
.level3, .level4      { fill: var(--altgr-txt); }
.level5, .level6, .dk { fill: var(--1dk-txt); }
.deadKey              { fill: var(--dk-txt); }

[theme="reach"] {
  .pinkyKey  rect { fill: var(--pinky-bg);  } /* disabled on ergol.org */
  .numberKey rect { fill: var(--number-bg); }
  .letterKey rect { fill: var(--letter-bg); }
  .homeKey   rect { fill: var(--home-bg);   }
  .press     rect { fill: var(--bar-bg);    } /* duplicate? */
}

[theme="hints"] {
  [finger="m1"] rect { fill: var(--bar-bg);  }
  [finger="l2"] rect,
  [finger="r2"] rect { fill: var(--col4-bg); }
  [finger="l3"] rect,
  [finger="r3"] rect { fill: var(--col3-bg); }
  [finger="l4"] rect,
  [finger="r4"] rect { fill: var(--col2-bg); }
  [finger="l5"] rect,
  [finger="r5"] rect { fill: var(--col1-bg); }

  [finger="l5"].pinkyKey rect { fill: url(#outerLeft); }
  [finger="l2"].innerKey rect { fill: url(#innerLeft); }
  [finger="r2"].innerKey rect { fill: url(#innerRight); }
  [finger="r5"].pinkyKey rect { fill: url(#outerRight); }

  .specialKey rect,
  .specialKey path { fill: var(--special-bg); } /* duplicate? */
  .press      rect { fill: var(--press-bg);   }
  .press      text { fill: var(--press-fg);   }
  .hint       rect { fill: var(--hint-bg);    }
  .hint text {
    font-weight: bold;
    fill: var(--press-fg);
  }
}
[theme="hints"].am #IntlBackslash rect { fill: var(--col0-bg); }

/**
 * Standard Keyboard Geometries:
 * ANSI, ISO, ABNT, ALT
 */

#Escape { display: none; }

/* Backslash + Enter */
#Enter path.alt,
#Enter     .iso,
#Backslash .iso,
.alt #Enter rect.ansi,
.iso #Enter rect.ansi,
.iso #Enter text.ansi,
.alt #Backslash .ansi,
.iso #Backslash .ansi { display: none; }
#Enter text.ansi,
.alt #Enter     .alt,
.iso #Enter     .iso,
.iso #Backslash .iso { display: block; }

/* Backspace + IntlYen */
#IntlYen, #Backspace .alt,
.intlYen  #Backspace .ansi { display: none; }
.intlYen  #Backspace .alt,
.intlYen  #IntlYen { display: block; }

/* ShiftLeft + IntlBackslash */
#IntlBackslash, #ShiftLeft .iso,
.intlBackslash  #ShiftLeft .ansi { display: none; }
.intlBackslash  #ShiftLeft .iso,
.intlBackslash  #IntlBackslash { display: block; }

/* ShiftRight + IntlRo */
#IntlRo, #ShiftRight .abnt,
.intlRo  #ShiftRight .ansi { display: none; }
.intlRo  #ShiftRight .abnt,
.intlRo  #IntlRo { display: block; }

/**
 * Ortholinear Keyboard Geometries:
 * TypeMatrix (60%), 1DFH (40%)
 */

.specialKey   .ergo,
.specialKey   .ol60,
.specialKey   .ol40,
#Space        .ol60,
#Space        .ol40,
#Backquote    .ol60,
#BracketRight .ol60,
#Equal        .ol60,
.ergo #CapsLock,
.ergo #Space      rect,
.ergo #Backslash  rect,
.ergo .specialKey rect,
.ergo .specialKey text,
.ol40 .pinkyKey,
.ol40 .row_AE .numberKey { display: none; }

.ergo #Escape,
.ol60 #IntlBackslash,
.ol60 #Space        .ol60,
.ol40 #Space        .ol40,
.ol60 #Backquote    .ol60,
.ol60 #BracketRight .ol60,
.ol60 #Backslash    .ol60,
.ol60 #Equal        .ol60,
.ol60 .specialKey   .ol60,
.ol40 .specialKey   .ol40,
.ergo .specialKey   .ergo { display: block; }

/**
 * Korean + Japanese Input Systems
 */

#NonConvert, #Convert, #KanaMode,
#Lang1, #Lang2,
#Space .jis,
#Space .ks,
.ks  #Space .ansi,
.ks  #Space .jis,
.jis #Space .ansi,
.jis #Space .ks { display: none; }
.ks  #Space .ks,
.jis #NonConvert, .jis #Convert, .jis #KanaMode,
.ks #Lang1, .ks #Lang2,
.jis #Space .jis { display: block; }

#Backquote .jis,
#CapsLock  .jis,
.jis #Backquote .ansi,
.jis #CapsLock  .ansi { display: none; }
.jis #Backquote .jis,
.jis #CapsLock .jis { display: block; }

#Space text,
#Lang1 text,
#Lang2 text,
#Convert text,
#NonConvert text,
.jis #CapsLock text { font-size: 14px; }
#KanaMode text,
.jis #Backquote text { font-size: 10px; }

/**
 * Windows / MacOSX / Linux modifiers
 */

.specialKey .win,
.specialKey .gnu {
  display: none;
  font-size: 14px;
}

/* display MacOSX by default */
[platform="gnu"] .specialKey .win,
[platform="gnu"] .specialKey .mac,
[platform="win"] .specialKey .gnu,
[platform="win"] .specialKey .mac { display: none; }
[platform="mac"] .specialKey .mac,
[platform="gnu"] .specialKey .gnu,
[platform="win"] .specialKey .win { display: block; }

/* only show the left Shift and right Option key for ergo layouts */
.ergo {
  #MetaLeft,
  #MetaRight,
  #ControlLeft,
  #ControlRight,
  #ContextMenu,
  #AltLeft,
  #ShiftRight,
  #AltRight .win,
  #AltRight .gnu { display: none; }
  #AltRight,
  #AltRight .mac { display: block; }
}

/**
 * Keymap Layers
 */

/* dimmed AltGr + bold dead keys */
.deadKey {
  font-size: 14px;
}
.diacritic {
  font-size: 20px;
  font-weight: bolder;
}

.layers-odk .level3,
.layers-odk .level4       { display: none; }
.layers-odk.altgr .level3,
.layers-odk.altgr .level4 { display: block; }

.layers-altgr .level5,
.layers-altgr .level6 { display: none; }

.layers-mixed .level5 { transform: translate(0, -22.8px); }
.layers-mixed .level6 { display: none; }

/* hide Level4 (Shift+AltGr) unless AltGr is pressed */
.level4        { display: none; }
.altgr .level4 { display: block; }

.altgr .level5,
.altgr .level6 { display: none; }

/* hide Level6 (Shift+AltGr) */
.level6        { display: none; }

/* hide dk1 and dk2 unless a dead key is pressed */
.dk1, .dk2     { display: none; }
.dk .dk1,
.dk .dk2       { display: block; }

/* highlight AltGr + Dead Keys */
.dk .level1, .altgr .level1,
.dk .level2, .altgr .level2 { opacity: 0.25; }
.dk .dk1, .altgr .level3,
.dk .dk2, .altgr .level4 { opacity: 1; }
.dk .level3, .dk level4,
.dk .level5, .dk level6 { display: none; }
`;var V={"*`":" \u0300","*\xB4":" \u0301","*^":" \u0302","*~":" \u0303","*\xAF":" \u0304","*\u02D8":" \u0306","*\u02D9":" \u0307","*\xA8":" \u0308","*\u02DA":" \u030A","*\u201D":" \u030B","*\u02C7":" \u030C","*\u201F":" \u030F","*\u207B":" \u0311","*.":" \u0323","*,":" \u0326","*\xB8":" \u0327","*\u02DB":" \u0328","**":"\u2605"},M=V;var $=60,E=60,x=4,K=5,L=(r,e,s)=>[`a${K},${K}`,r?"1 0 0":"0 0 1",`${K*e},${K*s}`].join(" "),Y=(r,e)=>{let s=2*(x+K)-2*e*x;return $*r-Math.sign(r)*s},b=(r,e=0,s=0)=>{let t=Y(r,e),i=Math.sign(r);return`h${t} ${s?L(1,i,-i):L(0,i,i)}`},w=(r,e=0,s=0)=>{let t=Y(r,e),i=Math.sign(r);return`v${t} ${s?L(1,i,i):L(0,-i,i)}`},T=`M${.75*$+K},-${E}`,Z=[T,b(1.5),w(2),b(-2.25),w(-1),b(.75,1,1),w(-1,1),"z"].join(" "),ee=[T,b(1.5),w(2),b(-1.25),w(-1,1,1),b(-.25,1),w(-1),"z"].join(" "),R=(r,e)=>Math.round(10*(e?E:$)*Number(r))/10,A=(r,e={},s=[])=>`<${r} ${Object.entries(e).map(([t,i])=>t==="x"||t==="y"?`${t}="${R(i,t==="y")-(r==="text"?x:0)}"`:t==="width"||t==="height"?`${t}="${R(i,t==="height")-2*x}"`:t==="translateX"?`transform="translate(${R(i)}, 0)"`:`${t}="${i}"`).join(" ")}>${s.join(`
`)}</${r}>`,O=(r="",e)=>A("path",{class:r,d:e}),n=(r="",e)=>A("rect",{class:r,width:1,height:1,rx:K,ry:K,...e}),o=(r,e="",s)=>A("text",{class:e,x:.34,y:.78,...s},[r]),p=(r,e)=>A("g",{class:r},e),te=[n(),p("key")],l=(r,e,s,t,i=te)=>A("g",{class:r,finger:e,id:t,transform:`translate(${s*$}, 0)`},i),d=(r,e,s)=>{let t={...s},i=M[e]||"",c=i||(e||"").slice(-1),y="",h="level";return r<0?(y="dk",h="dk",r=-r):v(e)&&(y=`deadKey ${i.startsWith(" ")?"diacritic":""}`),o(c,`${h}${r} ${y}`,t)},C=(r,e)=>e&&r!==e.toLowerCase()?e:"";function G(r,e){let s=e[r.parentNode.id];if(!s){r.innerHTML="";return}let[t,i,c,y,h,g]=s,f=t.toUpperCase()!==i?t:"",m=f||i.toLowerCase()===t?i:t,P=C(c,y),z=C(h,g);r.innerHTML=`
    ${d(1,f,{x:.28,y:.79})}
    ${d(2,m,{x:.28,y:.41})}
    ${d(3,c,{x:.7,y:.79})}
    ${d(4,P,{x:.7,y:.41})}
    ${d(5,h,{x:.7,y:.79})}
    ${d(6,z,{x:.7,y:.41})}
    ${d(-1,"",{x:.7,y:.79})}
    ${d(-2,"",{x:.7,y:.41})}
  `}function N(r,e,s){let t=(h,g)=>{v(g)?(h.classList.add("deadKey","diacritic"),h.textContent=g[1]):(h.classList.remove("deadKey","diacritic"),h.textContent=g||"")},i=e[r.parentNode.id];if(!i)return;let c=s[i[0]],y=s[i[1]];t(r.querySelector(".dk1"),c),t(r.querySelector(".dk2"),C(c,y))}var re=p("left",[l("specialKey","l5",0,"Escape",[n("ergo",{width:1.25}),o("\u238B","ergo")]),l("pinkyKey","l5",0,"Backquote",[n("specialKey jis",{width:1}),n("ansi alt iso",{width:1}),o("\u534A\u89D2","jis",{x:.5,y:.4}),o("\u5168\u89D2","jis",{x:.5,y:.6}),o("\u6F22\u5B57","jis",{x:.5,y:.8}),p("ansi key")]),l("numberKey","l5",1,"Digit1"),l("numberKey","l4",2,"Digit2"),l("numberKey","l3",3,"Digit3"),l("numberKey","l2",4,"Digit4"),l("numberKey innerKey","l2",5,"Digit5")])+p("right",[l("numberKey innerKey","r2",6,"Digit6"),l("numberKey","r2",7,"Digit7"),l("numberKey","r3",8,"Digit8"),l("numberKey","r4",9,"Digit9"),l("numberKey","r5",10,"Digit0"),l("pinkyKey","r5",11,"Minus"),l("pinkyKey","r5",12,"Equal"),l("pinkyKey","r5",13,"IntlYen"),l("specialKey","r5",13,"Backspace",[n("ansi",{width:2}),n("ergo",{width:1.25}),n("alt",{x:1}),o("\u232B","ansi"),o("\u232B","ergo"),o("\u232B","alt",{translateX:1})])]),se=p("left",[l("specialKey","l5",0,"Tab",[n("",{width:1.5}),n("ol40",{width:1.25}),n("ol60",{width:1,x:.25}),o("\u21B9"),o("\u21B9","ol40"),o("\u21B9","ol60",{translateX:.25})]),l("letterKey","l5",1.5,"KeyQ"),l("letterKey","l4",2.5,"KeyW"),l("letterKey","l3",3.5,"KeyE"),l("letterKey","l2",4.5,"KeyR"),l("letterKey innerKey","l2",5.5,"KeyT")])+p("right",[l("letterKey innerKey","r2",6.5,"KeyY"),l("letterKey","r2",7.5,"KeyU"),l("letterKey","r3",8.5,"KeyI"),l("letterKey","r4",9.5,"KeyO"),l("letterKey","r5",10.5,"KeyP"),l("pinkyKey","r5",11.5,"BracketLeft"),l("pinkyKey","r5",12.5,"BracketRight"),l("pinkyKey","r5",13.5,"Backslash",[n("ansi",{width:1.5}),n("iso ol60"),p("key")])]),le=p("left",[l("specialKey","l5",0,"CapsLock",[n("",{width:1.75}),o("\u21EA","ansi"),o("\u82F1\u6570","jis",{x:.45})]),l("letterKey homeKey","l5",1.75,"KeyA"),l("letterKey homeKey","l4",2.75,"KeyS"),l("letterKey homeKey","l3",3.75,"KeyD"),l("letterKey homeKey","l2",4.75,"KeyF"),l("letterKey innerKey","l2",5.75,"KeyG")])+p("right",[l("letterKey innerKey","r2",6.75,"KeyH"),l("letterKey homeKey","r2",7.75,"KeyJ"),l("letterKey homeKey","r3",8.75,"KeyK"),l("letterKey homeKey","r4",9.75,"KeyL"),l("letterKey homeKey","r5",10.75,"Semicolon"),l("pinkyKey","r5",11.75,"Quote"),l("specialKey","r5",12.75,"Enter",[O("alt",Z),O("iso",ee),n("ansi",{width:2.25}),n("ergo",{width:1.25}),o("\u23CE","ansi alt ergo"),o("\u23CE","iso",{translateX:1})])]),ie=p("left",[l("specialKey","l5",0,"ShiftLeft",[n("ansi alt",{width:2.25}),n("iso",{width:1.25}),n("ergo",{width:1.5}),o("\u21E7"),o("\u21E7","ergo")]),l("pinkyKey","l5",1.25,"IntlBackslash"),l("letterKey","l5",2.25,"KeyZ"),l("letterKey","l4",3.25,"KeyX"),l("letterKey","l3",4.25,"KeyC"),l("letterKey","l2",5.25,"KeyV"),l("letterKey innerKey","l2",6.25,"KeyB")])+p("right",[l("letterKey innerKey","r2",7.25,"KeyN"),l("letterKey","r2",8.25,"KeyM"),l("letterKey","r3",9.25,"Comma"),l("letterKey","r4",10.25,"Period"),l("letterKey","r5",11.25,"Slash"),l("pinkyKey","r5",12.25,"IntlRo"),l("specialKey","r5",12.25,"ShiftRight",[n("ansi",{width:2.75}),n("abnt",{width:1.75,x:1}),o("\u21E7","ansi"),o("\u21E7","abnt",{translateX:1})])]),u={x:.25,"text-anchor":"start"},ae=p("left",[l("specialKey","l5",0,"ControlLeft",[n("",{width:1.25}),n("ergo",{width:1.25}),o("Ctrl","win gnu",u),o("\u2303","mac")]),l("specialKey","l1",1.25,"MetaLeft",[n("",{width:1.25}),n("ergo",{width:1.5}),o("Win","win",u),o("Super","gnu",u),o("\u2318","mac")]),l("specialKey","l1",2.5,"AltLeft",[n("",{width:1.25}),n("ergo",{width:1.5}),o("Alt","win gnu",u),o("\u2325","mac")]),l("specialKey","l1",3.75,"Lang2",[n(),o("\uD55C\uC790","",{x:.4})]),l("specialKey","l1",3.75,"NonConvert",[n(),o("\u7121\u5909\u63DB","",{x:.5})])])+l("homeKey","m1",3.75,"Space",[n("ansi",{width:6.25}),n("ol60",{width:5}),n("ol40",{width:4}),n("ks",{width:4.25,x:1}),n("jis",{width:3.25,x:1})])+p("right",[l("specialKey","r1",8,"Convert",[n(),o("\u5909\u63DB","",{x:.5})]),l("specialKey","r1",9,"KanaMode",[n(),o("\u30AB\u30BF\u30AB\u30CA","",{x:.5,y:.4}),o("\u3072\u3089\u304C\u306A","",{x:.5,y:.6}),o("\u30ED\u30FC\u30DE\u5B57","",{x:.5,y:.8})]),l("specialKey","r1",9,"Lang1",[n(),o("\uD55C/\uC601","",{x:.4})]),l("specialKey","r1",10,"AltRight",[n("",{width:1.25}),n("ergo",{width:1.5}),o("Alt","win gnu",u),o("\u2325","mac")]),l("specialKey","r1",11.5,"MetaRight",[n("",{width:1.25}),o("Win","win",u),o("Super","gnu",u),o("\u2318","mac")]),l("specialKey","r5",12.5,"ContextMenu",[n("",{width:1.25}),o("\u2630")]),l("specialKey","r5",13.75,"ControlRight",[n("",{width:1.25}),o("Ctrl","win gnu",u),o("\u2303","mac")])]),a=(r,e=0,s=0,t)=>{let i=$*e+(t?x:0),c=E*s+(t?x:0);return`${r} { transform: translate(${i}px, ${c}px); }`},S=(r,e,s)=>`
    <linearGradient id="${r}" x1="0%" x2="100%" y1="0%" y2="0%">
      <stop offset="0%"   stop-color="${e}" />
      <stop offset="100%" stop-color="${s}" />
    </linearGradient>
`,H=`<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 ${$*15} ${E*5}">
  <style>
    ${a(".row_AE",0,0,!0)}
    ${a(".row_AD",0,1,!0)}
    ${a(".row_AC",0,2,!0)}
    ${a(".row_AB",0,3,!0)}
    ${a(".row_AA",0,4,!0)}
    ${a(".iso #Backslash",12.75,1)}
    ${a(".alt #Backslash",13,-1)}

    /* swap Alt/Meta for macOS */
    ${a('[platform="gnu"] #MetaLeft,  [platform="win"] #MetaLeft,  #AltLeft',1.25)}
    ${a('[platform="gnu"] #AltLeft,   [platform="win"] #AltLeft,   #MetaLeft',2.5)}
    ${a('[platform="gnu"] #AltRight,  [platform="win"] #AltRight,  #MetaRight',10)}
    ${a('[platform="gnu"] #MetaRight, [platform="win"] #MetaRight, #AltRight',11.25)}

    /* Angle Mod */
    .am {
      ${a("#KeyZ         ",1.25)}
      ${a("#KeyX         ",2.25)}
      ${a("#KeyC         ",3.25)}
      ${a("#KeyV         ",4.25)}
      ${a("#KeyB         ",5.25)}
      ${a("#IntlBackslash",6.25)}
    }

    .ergo {
      ${a("#ShiftLeft",4,1)}
      ${a("#AltRight ",9.25)}
      ${a("#Tab      ",.25,.5)}
    }
    .ol60 {
      ${a(".row_AE",1.5,0,!0)}
      ${a(".row_AD",1,1,!0)}
      ${a(".row_AC",.75,2,!0)}
      ${a(".row_AB",.25,3,!0)}
      ${a("#Space ",4.5)}
      ${a(".left",-1.25)}
      ${a(".right",.25)}
      ${a("#Escape       ",6.125,.5)}
      ${a("#Enter        ",5.375,.5)}
      ${a("#Backspace    ",4.625,1.5)}
      ${a("#Backquote    ",0,.5)}
      ${a("#IntlBackslash",1.25,-.5)}
      ${a("#Minus        ",11,.5)}
      ${a("#Equal        ",12,.5)}
      ${a("#BracketLeft  ",11.5,.5)}
      ${a("#BracketRight ",12.5,.5)}
      ${a("#Quote        ",11.75,.5)}
      ${a("#Backslash    ",12.5,1.5)}
    }
    .ol40 {
      ${a(".row_AD",.875,.5,!0)}
      ${a(".row_AC",.625,1.5,!0)}
      ${a(".row_AB",.125,2.5,!0)}
      ${a(".row_AA",-.125,3.5,!0)}
      ${a("#Space ",5.5)}
      ${a(".left",-.25)}
      ${a(".right",.25)}
      ${a("#Escape   ",1.125,2)}
      ${a("#Backspace",12.375,1)}
      ${a("#Enter    ",11.75,.5)}
    }

    ${D}
  </style>
  <defs>
    ${S("outerLeft","var(--col0-bg)","var(--col1-bg)")}
    ${S("innerLeft","var(--col4-bg)","var(--col0-bg)")}
    ${S("innerRight","var(--col0-bg)","var(--col4-bg)")}
    ${S("outerRight","var(--col1-bg)","var(--col0-bg)")}
  </defs>
  <g class="row_AE" text-anchor="middle"> ${re}  </g>
  <g class="row_AD" text-anchor="middle"> ${se} </g>
  <g class="row_AC" text-anchor="middle"> ${le} </g>
  <g class="row_AB" text-anchor="middle"> ${ie} </g>
  <g class="row_AA" text-anchor="middle"> ${ae}    </g>
</svg>`;var W=(r,e)=>{if(!e||!e.id)return[];let s=r.getElementById(e.id),t=[s];return e.level>1&&t.push(r.getElementById("AltRight")),e.level%2&&t.push(r.getElementById(s.getAttribute("finger")[0]==="l"?"ShiftRight":"ShiftLeft")),t},oe=()=>{let r=navigator.platform.toLowerCase();return r.startsWith("win")?"win":r.startsWith("mac")?"mac":r.startsWith("linux")?"linux":""},X=document.createElement("template");X.innerHTML=H;var _=class extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"}),this.root.appendChild(X.content.cloneNode(!0)),this._state={layers:this.getAttribute("layers")||"altgr",geometry:this.getAttribute("geometry")||"iso",platform:this.getAttribute("platform")||"",theme:this.getAttribute("theme")||"",layout:B()},this.layers=this._state.layers,this.geometry=this._state.geometry,this.platform=this._state.platform,this.theme=this._state.theme}get theme(){return this._state.theme}set theme(e){this._state.theme=e,this.root.querySelector("svg").setAttribute("theme",e)}setCustomColors(e){Object.entries(e).forEach(([s,t])=>{this.root.getElementById(s).querySelectorAll("rect").forEach(i=>{i.style.fill=t})})}setCustomOpacity(e){Object.entries(e).forEach(([s,t])=>{this.root.getElementById(s).querySelectorAll("rect").forEach(i=>{i.style.opacity=t})})}get layers(){return this._state.layers}set layers(e){if(!e&&!["odk","mixed","altgr"].includes(e))return;let t=this.root.querySelector("svg"),i=c=>`layers-${c}`;this._state.layers&&t.classList.remove(i(this._state.layers)),this._state.layers=e,t.classList.add(i(this._state.layers))}get geometry(){return this._state.geometry}set geometry(e){let s={alt:["alt","intlYen"],ks:["alt","intlYen","ks"],jis:["iso","intlYen","intlRo","jis"],abnt:["iso","intlBackslash","intlRo"],iso:["iso","intlBackslash"],isoa:["iso","intlBackslash","am"],ansi:[],ol60:["ergo","ol60"],ol40:["ergo","ol40"]};if(e&&!(e in s))return;this._state.geometry=e;let t=e||this.layout.geometry||"ansi",i=s[t],c=this.root.querySelector("svg");Object.values(s).forEach(y=>y.forEach(h=>c.classList.remove(h))),i.forEach(y=>c.classList.add(y))}get platform(){return this._state.platform}set platform(e){let s={win:"win",mac:"mac",linux:"gnu"};this._state.platform=e in s?e:"";let t=this._state.platform||oe();this.layout.platform=t,this.root.querySelector("svg").setAttribute("platform",s[t])}get layout(){return this._state.layout}set layout(e){this._state.layout=e,this._state.layout.platform=this.platform,this.geometry=this._state.geometry,this.draw()}get fingerAssignments(){let e=["l5","l4","l3","l2","r2","r2","r3","r4","r5"],s={};return e.forEach(t=>{s[t]=Array.from(this.root.querySelectorAll(`[finger=${t}]`)).map(i=>i.id)}),s}setKeyboardLayout(e,s,t){this.layout=B(e,s,t)}get keys(){return Array.from(this.root.querySelectorAll("[id]")).filter(e=>!e.id.startsWith("row_"))}draw(){Array.from(this.root.querySelectorAll(".key")).forEach(e=>G(e,this._state.layout.keyMap))}keyDown(e){let s=e.code.replace(/^OS/,"Meta");if(!s)return"";let t=this.root.getElementById(s);if(!t)return"";t.classList.add("press");let i=this.layout.pendingDK,c=this.layout.keyDown(s),y=this.layout.modifiers.altgr;return y&&this.root.querySelector("svg").classList.add("altgr"),i&&(t.classList.contains("specialKey")||(this.root.querySelector("svg").classList.remove("dk"),Array.from(this.root.querySelectorAll(".dk")).forEach(h=>{h.textContent=""}))),this.layout.pendingDK&&(Array.from(this.root.querySelectorAll(".key")).forEach(h=>{N(h,this.layout.keyMap,this.layout.pendingDK)}),this.root.querySelector("svg").classList.add("dk")),!y&&(e.ctrlKey||e.altKey||e.metaKey)?"":c}keyUp(e){let s=e.code.replace(/^OS/,"Meta");if(!s)return;let t=this.root.getElementById(s);t&&(t.classList.remove("press"),this.layout.keyUp(s),this.layout.modifiers.altgr||this.root.querySelector("svg").classList.remove("altgr"))}clearStyle(){Array.from(this.root.querySelectorAll("[style]")).forEach(e=>e.removeAttribute("style")),Array.from(this.root.querySelectorAll(".press")).forEach(e=>e.classList.remove("press"))}showKeys(e,s){this.clearStyle(),this.layout.getKeySequence(e).forEach(t=>{this.root.getElementById(t.id).style.cssText=s})}showHint(e){let s="";return Array.from(this.root.querySelectorAll(".hint")).forEach(t=>t.classList.remove("hint")),W(this.root,e).forEach(t=>{t.classList.add("hint"),s+=`${t.getAttribute("finger")} `}),s}pressKey(e){this.clearStyle(),W(this.root,e).forEach(s=>{s.classList.add("press")})}pressKeys(e,s=250){function*t(y){for(let h of y)yield h}let i=t(this.layout.getKeySequence(e)),c=setInterval(()=>{let{value:y,done:h}=i.next();this.pressKey(y),h&&clearInterval(c)},s)}};customElements.define("x-keyboard",_);})();
