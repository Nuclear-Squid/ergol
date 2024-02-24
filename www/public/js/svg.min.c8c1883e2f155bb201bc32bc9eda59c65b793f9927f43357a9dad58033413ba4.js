window.addEventListener("DOMContentLoaded",()=>{"use strict";const e=document.querySelector(".keyboard img"),t=document.querySelector(".keyboard select");fetch(e.getAttribute("src")).then(e=>e.text()).then(n=>{e.outerHTML=n,t.innerHTML=`
        <option value="dk iso intlBackslash am">       ISO-A </option>
        <option value="dk iso intlBackslash" selected> ISO   </option>
        <option value="dk ansi">                       ANSI  </option>
        <option value="dk ol60 ergo">                  TMx   </option>
        <option value="dk ol50 ergo">                  4×6   </option>
        <option value="dk ol40 ergo">                  3×6   </option>
      `;const s=document.querySelector(".keyboard svg");t.addEventListener("change",e=>{s.setAttribute("class",e.target.value)})})})