function isDeadKey(e){return e&&e.length===2&&e[0]==="*"}function getKeyList(e,t){const n=[];return Object.entries(e).forEach(([e,s])=>{const o=s.indexOf(t);o>=0&&n.push({id:e,level:o})}),n.sort((e,t)=>e.level>t.level)}function getDeadKeyDict(e){const t={};return Object.entries(e).forEach(([e,n])=>{Object.entries(n).forEach(([n,s])=>{s in t||(t[s]=[]),t[s].push({id:e,base:n})})}),t}function getKeySequence(e,t,n=""){const s=[];return Array.from(n).forEach(n=>{const o=getKeyList(e,n);if(o.length)s.push(o[0]);else if(n in t){const o=t[n][0];s.push(getKeyList(e,o.id)[0]),s.push(getKeyList(e,o.base)[0])}else s.push({})}),s}const MODIFIERS={ShiftLeft:!1,ShiftRight:!1,ControlLeft:!1,ControlRight:!1,AltLeft:!1,AltRight:!1,OSLeft:!1,OSRight:!1};function getShiftState(e){return e.ShiftRight||e.ShiftLeft}function getAltGrState(e,t){return t==="win"?e.AltRight||e.ControlLeft&&e.AltLeft:t==="mac"?e.AltRight||e.AltLeft:e.AltRight}function getModifierLevel(e,t){return(getShiftState(e)?1:0)+(getAltGrState(e,t)?2:0)}function newKeyboardLayout(e={},t={},n=""){const s={...MODIFIERS},a=getDeadKeyDict(t);let o,i="";return{get keyMap(){return e},get deadKeys(){return t},get pendingDK(){return o},get geometry(){return n},get platform(){return i},set platform(e){i=e},get modifiers(){return{get shift(){return getShiftState(s)},get altgr(){return getAltGrState(s,i)},get level(){return getModifierLevel(s,i)}}},getKey:t=>getKeyList(e,t)[0],getKeySequence:t=>getKeySequence(e,a,t),keyUp:e=>{e in s&&(s[e]=!1)},keyDown:n=>{n in s&&(s[n]=!0);const r=e[n];if(!r)return"";let a=r[getModifierLevel(s,i)];return o&&(a=o[a]||"",o=void 0),isDeadKey(a)?(o=t[a],""):a||""}}}const KEY_BG="#f8f8f8",SPECIAL_KEY_BG="#e4e4e4",KEY_COLOR="#333",KEY_COLOR_L3="blue",KEY_COLOR_L5="green",DEAD_KEY_COLOR="red",KEY_WIDTH=60,KEY_PADDING=4,KEY_RADIUS=5,symbols={"*`":" ̀","*´":" ́","*^":" ̂","*~":" ̃","*¯":" ̄","*˘":" ̆","*˙":" ̇","*¨":" ̈","*˚":" ̊","*”":" ̋","*ˇ":" ̌","*‟":" ̏","*⁻":" ̑","*.":" ̣","*,":" ̦","*¸":" ̧","*˛":" ̨","**":"★"},arc=(e,t,n)=>[`a${KEY_RADIUS},${KEY_RADIUS}`,e?"1 0 0":"0 0 1",`${KEY_RADIUS*t},${KEY_RADIUS*n}`].join(" "),lineLength=(e,t)=>{const n=2*(KEY_PADDING+KEY_RADIUS)-2*t*KEY_PADDING;return KEY_WIDTH*e-Math.sign(e)*n},h=(e,t=0,n=0)=>{const o=lineLength(e,t),s=Math.sign(e);return`h${o} ${n?arc(1,s,-s):arc(0,s,s)}`},v=(e,t=0,n=0)=>{const o=lineLength(e,t),s=Math.sign(e);return`v${o} ${n?arc(1,s,s):arc(0,-s,s)}`},M=`M${.75*KEY_WIDTH+KEY_RADIUS},-${KEY_WIDTH}`,altEnterPath=[M,h(1.5),v(2),h(-2.25),v(-1),h(.75,1,1),v(-1,1),"z"].join(" "),isoEnterPath=[M,h(1.5),v(2),h(-1.25),v(-1,1,1),h(-.25,1),v(-1),"z"].join(" "),sgml=(e,t={},n=[])=>`<${e} ${Object.entries(t).map(([t,n])=>t==="x"||t==="y"?`${t}="${KEY_WIDTH*Number(n)-(e==="text"?KEY_PADDING:0)}"`:t==="width"||t==="height"?`${t}="${KEY_WIDTH*Number(n)-2*KEY_PADDING}"`:t==="translateX"?`transform="translate(${KEY_WIDTH*Number(n)}, 0)"`:`${t}="${n}"`).join(" ")}>${n.join(`
`)}</${e}>`,path=(e="",t)=>sgml("path",{class:e,d:t}),rect=(e="",t)=>sgml("rect",{class:e,width:1,height:1,rx:KEY_RADIUS,ry:KEY_RADIUS,...t}),text=(e,t="",n)=>sgml("text",{class:t,width:.5,height:.5,x:.34,y:.78,...n},[e]),g=(e,t)=>sgml("g",{class:e},t),emptyKey=[rect(),g("key")],gKey=(e,t,n,s,o=emptyKey)=>sgml("g",{class:e,finger:t,id:s,transform:`translate(${n*KEY_WIDTH}, 0)`},o),keyLevel=(e,t,n)=>{const i={...n},o=symbols[t]||"",a=o||(t||"").slice(-1);let s="";return e>4?s="dk":isDeadKey(t)&&(s=`deadKey ${o.startsWith(" ")?"diacritic":""}`),text(a,`level${e} ${s}`,i)},altUpperChar=(e,t)=>t&&e!==t.toLowerCase()?t:"";function drawKey(e,t){const o=t[e.parentNode.id];if(!o){e.innerHTML="";return}const[n,s,i,r]=o,a=n.toUpperCase()!==s?n:"",c=a||s.toLowerCase()===n?s:n,l=altUpperChar(i,r);e.innerHTML=`
    ${keyLevel(1,a,{x:.28,y:.79})}
    ${keyLevel(2,c,{x:.28,y:.41})}
    ${keyLevel(3,i,{x:.7,y:.79})}
    ${keyLevel(4,l,{x:.7,y:.41})}
    ${keyLevel(5,"",{x:.7,y:.79})}
    ${keyLevel(6,"",{x:.7,y:.41})}
  `}function drawDK(e,t,n){const o=(e,t)=>{isDeadKey(t)?(e.classList.add("deadKey","diacritic"),e.textContent=t[1]):(e.classList.remove("deadKey","diacritic"),e.textContent=t||"")},s=t[e.parentNode.id];if(!s)return;const i=n[s[0]],a=n[s[1]];o(e.querySelector(".level5"),i),o(e.querySelector(".level6"),altUpperChar(i,a))}const numberRow=g("left",[gKey("specialKey","l5",0,"Escape",[rect("ergo",{width:1.25}),text("⎋","ergo")]),gKey("pinkyKey","l5",0,"Backquote",[rect("specialKey jis",{width:1}),rect("ansi alt iso",{width:1}),rect("ol60",{width:1.25}),text("半角","jis",{x:.5,y:.4}),text("全角","jis",{x:.5,y:.6}),text("漢字","jis",{x:.5,y:.8}),g("ansi key")]),gKey("numberKey","l5",1,"Digit1"),gKey("numberKey","l4",2,"Digit2"),gKey("numberKey","l3",3,"Digit3"),gKey("numberKey","l2",4,"Digit4"),gKey("numberKey","l2",5,"Digit5")])+g("right",[gKey("numberKey","r2",6,"Digit6"),gKey("numberKey","r2",7,"Digit7"),gKey("numberKey","r3",8,"Digit8"),gKey("numberKey","r4",9,"Digit9"),gKey("numberKey","r5",10,"Digit0"),gKey("pinkyKey","r5",11,"Minus"),gKey("pinkyKey","r5",12,"Equal",[rect("ansi",{width:1}),rect("ol60",{width:1.25}),g("key")]),gKey("pinkyKey","r5",13,"IntlYen"),gKey("specialKey","r5",13,"Backspace",[rect("ansi",{width:2}),rect("ol60",{width:1.25,height:2,y:-1}),rect("ol40 ol50",{width:1.25}),rect("alt",{x:1}),text("⌫","ansi"),text("⌫","ergo"),text("⌫","alt",{translateX:1})])]),letterRow1=g("left",[gKey("specialKey","l5",0,"Tab",[rect("",{width:1.5}),rect("ergo",{width:1.25}),text("↹"),text("↹","ergo")]),gKey("letterKey","l5",1.5,"KeyQ"),gKey("letterKey","l4",2.5,"KeyW"),gKey("letterKey","l3",3.5,"KeyE"),gKey("letterKey","l2",4.5,"KeyR"),gKey("letterKey","l2",5.5,"KeyT")])+g("right",[gKey("letterKey","r2",6.5,"KeyY"),gKey("letterKey","r2",7.5,"KeyU"),gKey("letterKey","r3",8.5,"KeyI"),gKey("letterKey","r4",9.5,"KeyO"),gKey("letterKey","r5",10.5,"KeyP"),gKey("pinkyKey","r5",11.5,"BracketLeft"),gKey("pinkyKey","r5",12.5,"BracketRight",[rect("ansi",{width:1}),rect("ol60",{width:1.25}),g("key")]),gKey("pinkyKey","r5",13.5,"Backslash",[rect("ansi",{width:1.5}),rect("iso ol60"),g("key")])]),letterRow2=g("left",[gKey("specialKey","l5",0,"CapsLock",[rect("",{width:1.75}),text("⇪","ansi"),text("英数","jis",{x:.45})]),gKey("letterKey homeKey","l5",1.75,"KeyA"),gKey("letterKey homeKey","l4",2.75,"KeyS"),gKey("letterKey homeKey","l3",3.75,"KeyD"),gKey("letterKey homeKey","l2",4.75,"KeyF"),gKey("letterKey","l2",5.75,"KeyG")])+g("right",[gKey("letterKey","r2",6.75,"KeyH"),gKey("letterKey homeKey","r2",7.75,"KeyJ"),gKey("letterKey homeKey","r3",8.75,"KeyK"),gKey("letterKey homeKey","r4",9.75,"KeyL"),gKey("letterKey homeKey","r5",10.75,"Semicolon"),gKey("pinkyKey","r5",11.75,"Quote"),gKey("specialKey","r5",12.75,"Enter",[path("alt",altEnterPath),path("iso",isoEnterPath),rect("ansi",{width:2.25}),rect("ol60",{width:1.25,height:2,y:-1}),rect("ol40 ol50",{width:1.25}),text("⏎","ansi alt ergo"),text("⏎","iso",{translateX:1})])]),letterRow3=g("left",[gKey("specialKey","l5",0,"ShiftLeft",[rect("ansi alt",{width:2.25}),rect("iso",{width:1.25}),rect("ol50 ol60",{width:1.25,height:2,y:-1}),rect("ol40",{width:1.25}),text("⇧"),text("⇧","ergo")]),gKey("letterKey","l5",1.25,"IntlBackslash"),gKey("letterKey","l5",2.25,"KeyZ"),gKey("letterKey","l4",3.25,"KeyX"),gKey("letterKey","l3",4.25,"KeyC"),gKey("letterKey","l2",5.25,"KeyV"),gKey("letterKey","l2",6.25,"KeyB")])+g("right",[gKey("letterKey","r2",7.25,"KeyN"),gKey("letterKey","r2",8.25,"KeyM"),gKey("letterKey","r3",9.25,"Comma"),gKey("letterKey","r4",10.25,"Period"),gKey("letterKey","r5",11.25,"Slash"),gKey("pinkyKey","r5",12.25,"IntlRo"),gKey("specialKey","r5",12.25,"ShiftRight",[rect("ansi",{width:2.75}),rect("abnt",{width:1.75,x:1}),rect("ol50 ol60",{width:1.25,height:2,y:-1}),rect("ol40",{width:1.25}),text("⇧","ansi"),text("⇧","ergo"),text("⇧","abnt",{translateX:1})])]),nonIcon={x:.25,"text-anchor":"start"},baseRow=g("left",[gKey("specialKey","l5",0,"ControlLeft",[rect("",{width:1.25}),rect("ergo",{width:1.25}),text("Ctrl","win gnu",nonIcon),text("⌃","mac")]),gKey("specialKey","l1",1.25,"MetaLeft",[rect("",{width:1.25}),rect("ergo",{width:1.5}),text("Win","win",nonIcon),text("Super","gnu",nonIcon),text("⌘","mac")]),gKey("specialKey","l1",2.5,"AltLeft",[rect("",{width:1.25}),rect("ergo",{width:1.5}),text("Alt","win gnu",nonIcon),text("⌥","mac")]),gKey("specialKey","l1",3.75,"Lang2",[rect(),text("한자","",{x:.4})]),gKey("specialKey","l1",3.75,"NonConvert",[rect(),text("無変換","",{x:.5})])])+gKey("homeKey","m1",3.75,"Space",[rect("ansi",{width:6.25}),rect("ol60",{width:5.5,x:-1}),rect("ol50 ol40",{width:4.5}),rect("ks",{width:4.25,x:1}),rect("jis",{width:3.25,x:1})])+g("right",[gKey("specialKey","r1",8,"Convert",[rect(),text("変換","",{x:.5})]),gKey("specialKey","r1",9,"KanaMode",[rect(),text("カタカナ","",{x:.5,y:.4}),text("ひらがな","",{x:.5,y:.6}),text("ローマ字","",{x:.5,y:.8})]),gKey("specialKey","r1",9,"Lang1",[rect(),text("한/영","",{x:.4})]),gKey("specialKey","r1",10,"AltRight",[rect("",{width:1.25}),rect("ergo",{width:1.5}),text("Alt","win gnu",nonIcon),text("⌥","mac")]),gKey("specialKey","r1",11.5,"MetaRight",[rect("",{width:1.25}),rect("ergo",{width:1.5}),text("Win","win",nonIcon),text("Super","gnu",nonIcon),text("⌘","mac")]),gKey("specialKey","r5",12.5,"ContextMenu",[rect("",{width:1.25}),rect("ergo"),text("☰"),text("☰","ol60")]),gKey("specialKey","r5",13.75,"ControlRight",[rect("",{width:1.25}),rect("ergo",{width:1.25}),text("Ctrl","win gnu",nonIcon),text("⌃","mac")])]),svgContent=`
  <svg viewBox="0 0 ${KEY_WIDTH*15} ${KEY_WIDTH*5}"
      xmlns="http://www.w3.org/2000/svg">
    <g id="row_AE" text-anchor="middle"> ${numberRow}  </g>
    <g id="row_AD" text-anchor="middle"> ${letterRow1} </g>
    <g id="row_AC" text-anchor="middle"> ${letterRow2} </g>
    <g id="row_AB" text-anchor="middle"> ${letterRow3} </g>
    <g id="row_AA" text-anchor="middle"> ${baseRow}    </g>
  </svg>
`,translate=(e=0,t=0,n)=>{const s=KEY_WIDTH*e+(n?KEY_PADDING:0),o=KEY_WIDTH*t+(n?KEY_PADDING:0);return`{ transform: translate(${s}px, ${o}px); }`},main=`
  rect, path {
    stroke: #666;
    stroke-width: .5px;
    fill: ${KEY_BG};
  }
  .specialKey,
  .specialKey rect,
  .specialKey path {
    fill: ${SPECIAL_KEY_BG};
  }
  text {
    fill: ${KEY_COLOR};
    font: normal 20px sans-serif;
    text-align: center;
  }
  #Backspace text {
    font-size: 12px;
  }
`,classicGeometry=`
  #Escape { display: none; }

  #row_AE ${translate(0,0,!0)}
  #row_AD ${translate(0,1,!0)}
  #row_AC ${translate(0,2,!0)}
  #row_AB ${translate(0,3,!0)}
  #row_AA ${translate(0,4,!0)}

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
  .iso #Backslash ${translate(12.75,1)}
  .alt #Backslash ${translate(13,-1)}

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
`,orthoGeometry=`
  .specialKey   .ergo,
  .specialKey   .ol60,
  .specialKey   .ol50,
  .specialKey   .ol40,
  #Space        .ol60,
  #Space        .ol50,
  #Space        .ol40,
  #Backquote    .ol60,
  #BracketRight .ol60,
  #Equal        .ol60,
  .ergo #CapsLock,
  .ergo #Space      rect,
  .ergo #Backslash  rect,
  .ergo .specialKey rect,
  .ergo .specialKey text { display: none; }
  .ol50 #Escape,
  .ol40 #Escape,
  .ol60 #Space        .ol60,
  .ol50 #Space        .ol50,
  .ol40 #Space        .ol40,
  .ol60 #Backquote    .ol60,
  .ol60 #BracketRight .ol60,
  .ol60 #Backslash    .ol60,
  .ol60 #Equal        .ol60,
  .ol60 .specialKey   .ol60,
  .ol50 .specialKey   .ol50,
  .ol40 .specialKey   .ol40,
  .ergo .specialKey   .ergo { display: block; }

  .ol50 .pinkyKey, .ol50 #ContextMenu,
  .ol40 .pinkyKey, .ol40 #ContextMenu,
  .ol40 #row_AE .numberKey { display: none; }

  .ergo #row_AE       ${translate(1.5,0,!0)}
  .ergo #row_AD       ${translate(1,1,!0)}
  .ergo #row_AC       ${translate(.75,2,!0)}
  .ergo #row_AB       ${translate(.25,3,!0)}

  .ergo #Tab          ${translate(.25)}
  .ergo #ShiftLeft    ${translate(1)}
  .ergo #ControlLeft  ${translate(1.25)}
  .ergo #MetaLeft     ${translate(2.5)}
  .ergo #AltLeft      ${translate(4)}
  .ergo #Space        ${translate(5.25)}
  .ergo #AltRight     ${translate(9)}
  .ergo #MetaRight    ${translate(10.5)}
  .ergo #ControlRight ${translate(12.5)}

  .ergo .left         ${translate(-.25)}
  .ergo .right        ${translate(.25)}

  .ol60 .left         ${translate(-1.25)}
  .ol60 #ControlRight ${translate(13.5)}
  .ol60 #Backquote    ${translate(-.25)}
  .ol60 #ShiftRight   ${translate(13.25)}
  .ol60 #ContextMenu  ${translate(12.5)}
  .ol60 #Backslash    ${translate(11.5,2)}
  .ol60 #Backspace    ${translate(4.625,1)}
  .ol60 #Enter        ${translate(5.375,1)}

  .ol50 #Escape       ${translate(-.25)}
  .ol50 #Backspace    ${translate(11)}
  .ol50 #Enter        ${translate(11.75,-1)}

  .ol40 #Escape       ${translate(-.25,2)}
  .ol40 #Backspace    ${translate(11,1)}
  .ol40 #Enter        ${translate(11.75,0)}

  [platform="gnu"].ergo .specialKey .win,
  [platform="gnu"].ergo .specialKey .mac,
  [platform="win"].ergo .specialKey .gnu,
  [platform="win"].ergo .specialKey .mac { display: none; }
  .ergo .specialKey .mac,
  [platform="gnu"].ergo .specialKey .gnu,
  [platform="win"].ergo .specialKey .win { display: block; }

  /* swap Alt/Meta for MacOSX */
  [platform="gnu"].ergo #MetaLeft,
  [platform="win"].ergo #MetaLeft,
                  .ergo #AltLeft   ${translate(2.5)}
  [platform="gnu"].ergo #AltLeft,
  [platform="win"].ergo #AltLeft,
                  .ergo #MetaLeft  ${translate(4)}
  [platform="gnu"].ergo #AltRight,
  [platform="win"].ergo #AltRight,
                  .ergo #MetaRight ${translate(9.5)}
  [platform="gnu"].ergo #MetaRight,
  [platform="win"].ergo #MetaRight,
                  .ergo #AltRight  ${translate(11)}
`,cjkKeys=`
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

  #Lang1 text,
  #Lang2 text,
  #Convert text,
  #NonConvert text,
  .jis #CapsLock text { font-size: 14px; }
  #KanaMode text,
  .jis #Backquote text { font-size: 10px; }
`,modifiers=`
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

  /* swap Alt/Meta for MacOSX */
  [platform="gnu"] #MetaLeft,
  [platform="win"] #MetaLeft,  #AltLeft   ${translate(1.25)}
  [platform="gnu"] #AltLeft,
  [platform="win"] #AltLeft,   #MetaLeft  ${translate(2.5)}
  [platform="gnu"] #AltRight,
  [platform="win"] #AltRight,  #MetaRight ${translate(10)}
  [platform="gnu"] #MetaRight,
  [platform="win"] #MetaRight, #AltRight  ${translate(11.25)}
`,themes=`
  g:target rect, .press rect,
  g:target path, .press path {
    fill: #aad;
  }

  [theme="reach"] .pinkyKey  rect { fill: hsl(  0, 100%, 90%); }
  [theme="reach"] .numberKey rect { fill: hsl( 42, 100%, 90%); }
  [theme="reach"] .letterKey rect { fill: hsl(122, 100%, 90%); }
  [theme="reach"] .homeKey   rect { fill: hsl(122, 100%, 75%); }
  [theme="reach"] .press     rect { fill: #aaf; }

  [theme="hints"] [finger="m1"] rect { fill: hsl(  0, 100%, 95%); }
  [theme="hints"] [finger="l2"] rect { fill: hsl( 42, 100%, 85%); }
  [theme="hints"] [finger="r2"] rect { fill: hsl( 61, 100%, 85%); }
  [theme="hints"] [finger="l3"] rect,
  [theme="hints"] [finger="r3"] rect { fill: hsl(136, 100%, 85%); }
  [theme="hints"] [finger="l4"] rect,
  [theme="hints"] [finger="r4"] rect { fill: hsl(200, 100%, 85%); }
  [theme="hints"] [finger="l5"] rect,
  [theme="hints"] [finger="r5"] rect { fill: hsl(230, 100%, 85%); }
  [theme="hints"] .specialKey   rect,
  [theme="hints"] .specialKey   path { fill: ${SPECIAL_KEY_BG}; }
  [theme="hints"] .hint         rect { fill: #a33; }
  [theme="hints"] .press        rect { fill: #335; }
  [theme="hints"] .press        text { fill: #fff; }
  [theme="hints"] .hint text {
    font-weight: bold;
    fill: white;
  }

  /* dimmed AltGr + bold dead keys */
  .level3, .level4 { fill: ${KEY_COLOR_L3}; opacity: .5; }
  .level5, .level6 { fill: ${KEY_COLOR_L5}; }
  .deadKey {
    fill: ${DEAD_KEY_COLOR};
    font-size: 14px;
  }
  .diacritic  {
    font-size: 20px;
    font-weight: bolder;
  }

  /* hide Level4 (Shift+AltGr) unless AltGr is pressed */
  .level4        { display: none; }
  .altgr .level4 { display: block; }

  /* highlight AltGr + Dead Keys */
  .dk .level1, .altgr .level1,
  .dk .level2, .altgr .level2 { opacity: 0.25; }
  .dk .level5, .altgr .level3,
  .dk .level6, .altgr .level4 { opacity: 1; }
  .dk .level3,
  .dk .level4 { display: none; }

  @media (prefers-color-scheme: dark) {
    rect, path { stroke: #777; fill: #444; }
    .specialKey, .specialKey rect, .specialKey path { fill: #333; }
    g:target rect, .press rect, g:target path, .press path { fill: #558; }
    text { fill: #bbb; }
    .level3, .level4 { fill: #99f; }
    .level5, .level6 { fill: #6d6; }
    .deadKey { fill: #f44; }

    [theme="reach"] .pinkyKey  rect { fill: hsl(  0, 20%, 30%); }
    [theme="reach"] .numberKey rect { fill: hsl( 35, 25%, 30%); }
    [theme="reach"] .letterKey rect { fill: hsl( 61, 30%, 30%); }
    [theme="reach"] .homeKey   rect { fill: hsl(136, 30%, 30%); }
    [theme="reach"] .press     rect { fill: #449; }

    [theme="hints"] [finger="m1"] rect { fill: hsl(  0, 25%, 30%); }
    [theme="hints"] [finger="l2"] rect { fill: hsl( 31, 30%, 30%); }
    [theme="hints"] [finger="r2"] rect { fill: hsl( 61, 30%, 30%); }
    [theme="hints"] [finger="l3"] rect,
    [theme="hints"] [finger="r3"] rect { fill: hsl(136, 30%, 30%); }
    [theme="hints"] [finger="l4"] rect,
    [theme="hints"] [finger="r4"] rect { fill: hsl(200, 30%, 30%); }
    [theme="hints"] [finger="l5"] rect,
    [theme="hints"] [finger="r5"] rect { fill: hsl(230, 30%, 30%); }
    [theme="hints"] .specialKey   rect,
    [theme="hints"] .specialKey   path { fill: #333; }
    [theme="hints"] .hint         rect { fill: #a33; }
    [theme="hints"] .press        rect { fill: #335; }
    [theme="hints"] .press        text { fill: #fff; }
    [theme="hints"] .hint text {
      font-weight: bold;
      fill: white;
    }
  }
`,style=`
  ${main}
  ${classicGeometry}
  ${orthoGeometry}
  ${cjkKeys}
  ${modifiers}
  ${themes}
`,setFingerAssignment=(e,t)=>{(t?["l5","l4","l3","l2","l2","r2","r2","r3","r4","r5"]:["l5","l5","l4","l3","l2","l2","r2","r2","r3","r4"]).forEach((t,n)=>{e.getElementById(`Digit${(n+1)%10}`).setAttribute("finger",t)})},getKeyChord=(e,t)=>{if(!t||!t.id)return[];const s=e.getElementById(t.id),n=[s];return t.level>1&&n.push(e.getElementById("AltRight")),t.level%2&&n.push(e.getElementById(s.getAttribute("finger")[0]==="l"?"ShiftRight":"ShiftLeft")),n},guessPlatform=()=>{const e=navigator.platform.toLowerCase();return e.startsWith("win")?"win":e.startsWith("mac")?"mac":e.startsWith("linux")?"linux":""},template=document.createElement("template");template.innerHTML=`<style>${style}</style>${svgContent}`;class Keyboard extends HTMLElement{constructor(){super(),this.root=this.attachShadow({mode:"open"}),this.root.appendChild(template.content.cloneNode(!0)),this._state={geometry:this.getAttribute("geometry")||"",platform:this.getAttribute("platform")||"",theme:this.getAttribute("theme")||"",layout:newKeyboardLayout()},this.geometry=this._state.geometry,this.platform=this._state.platform,this.theme=this._state.theme}get theme(){return this._state.theme}set theme(e){this._state.theme=e,this.root.querySelector("svg").setAttribute("theme",e)}setCustomColors(e){Object.entries(e).forEach(([e,t])=>{this.root.getElementById(e).querySelectorAll("rect").forEach(e=>{e.style.fill=t})})}setCustomOpacity(e){Object.entries(e).forEach(([e,t])=>{this.root.getElementById(e).querySelectorAll("rect").forEach(e=>{e.style.opacity=t})})}get geometry(){return this._state.geometry}set geometry(e){const t={alt:"alt intlYen",ks:"alt intlYen ks",jis:"iso intlYen intlRo jis",abnt:"iso intlBackslash intlRo",iso:"iso intlBackslash",ansi:"",ol60:"ergo ol60",ol50:"ergo ol50",ol40:"ergo ol40"};if(e&&!(e in t))return;this._state.geometry=e;const s=e||this.layout.geometry||"ansi",n=t[s];this.root.querySelector("svg").className.baseVal=n,setFingerAssignment(this.root,!n.startsWith("iso"))}get platform(){return this._state.platform}set platform(e){const t={win:"win",mac:"mac",linux:"gnu"};this._state.platform=e in t?e:"";const n=this._state.platform||guessPlatform();this.layout.platform=n,this.root.querySelector("svg").setAttribute("platform",t[n])}get layout(){return this._state.layout}set layout(e){this._state.layout=e,this._state.layout.platform=this.platform,this.geometry=this._state.geometry,Array.from(this.root.querySelectorAll(".key")).forEach(t=>drawKey(t,e.keyMap))}get fingerAssignments(){const t=["l5","l4","l3","l2","r2","r2","r3","r4","r5"],e={};return t.forEach(t=>{e[t]=Array.from(this.root.querySelectorAll(`[finger=${t}]`)).map(e=>e.id)}),e}setKeyboardLayout(e,t,n){this.layout=newKeyboardLayout(e,t,n)}get keys(){return Array.from(this.root.querySelectorAll("[id]")).filter(e=>!e.id.startsWith("row_"))}keyDown(e){const t=e.code.replace(/^OS/,"Meta");if(!t)return"";const n=this.root.getElementById(t);if(!n)return"";n.classList.add("press");const o=this.layout.pendingDK,i=this.layout.keyDown(t),s=this.layout.modifiers.altgr;return s&&this.root.querySelector("svg").classList.add("altgr"),o&&(n.classList.contains("specialKey")||(this.root.querySelector("svg").classList.remove("dk"),Array.from(this.root.querySelectorAll(".dk")).forEach(e=>{e.textContent=""}))),this.layout.pendingDK&&(Array.from(this.root.querySelectorAll(".key")).forEach(e=>{drawDK(e,this.layout.keyMap,this.layout.pendingDK)}),this.root.querySelector("svg").classList.add("dk")),!s&&(e.ctrlKey||e.altKey||e.metaKey)?"":i}keyUp(e){const t=e.code.replace(/^OS/,"Meta");if(!t)return;const n=this.root.getElementById(t);if(!n)return;n.classList.remove("press"),this.layout.keyUp(t),this.layout.modifiers.altgr||this.root.querySelector("svg").classList.remove("altgr")}clearStyle(){Array.from(this.root.querySelectorAll("[style]")).forEach(e=>e.removeAttribute("style")),Array.from(this.root.querySelectorAll(".press")).forEach(e=>e.classList.remove("press"))}showKeys(e,t){this.clearStyle(),this.layout.getKeySequence(e).forEach(e=>{this.root.getElementById(e.id).style.cssText=t})}showHint(e){let t="";return Array.from(this.root.querySelectorAll(".hint")).forEach(e=>e.classList.remove("hint")),getKeyChord(this.root,e).forEach(e=>{e.classList.add("hint"),t+=`${e.getAttribute("finger")} `}),t}pressKey(e){this.clearStyle(),getKeyChord(this.root,e).forEach(e=>{e.classList.add("press")})}pressKeys(e,t=250){function*n(e){for(const t of e)yield t}const s=n(this.layout.getKeySequence(e)),o=setInterval(()=>{const{value:e,done:t}=s.next();this.pressKey(e),t&&clearInterval(o)},t)}}customElements.define("x-keyboard",Keyboard)