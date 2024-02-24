class CollapsableTable extends HTMLElement{maxLinesCollapsed=12;expandButton=void 0;maxHeightCollapsed=void 0;constructor(){super();const e=this.attachShadow({mode:"open"}),t=document.createElement("tr");t.innerHTML="random placeholder text",e.appendChild(t),this.maxHeightCollapsed=this.maxLinesCollapsed*t.offsetHeight,e.innerHTML=`
      <style>
      /* Mostly copy-pasted from '/css/heatmap.css', with some ajustments */
      h3 { border-bottom: 1px dotted; }

      #header {
        text-align: right;
        margin-top: -1em;
      }

      #wrapper {
        margin-bottom: 1em;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
      }

      table {
        display: flex;
        flex-direction: column;
        font-size: small;
        table-layout: fixed;
      }

      th { font-weight: normal; }
      td { width: 4em; }

      button {
        width: 30%;
        margin: auto;
        background-color: #88fa;
        border: 1px solid black;
        border-radius: 15px;
      }
      </style>

      <h3> ${this.id} </h3>
      <!-- Using a style attribute on top of the stylesheet, as it is used by
           the button 'click' event-listner -->
      <div id='wrapper' style='max-height: ${this.maxHeightCollapsed}px;'></div>
      <button style='display: none'> show more </button>
    `;const n=this.querySelector("small"),s=e.getElementById("wrapper");if(n){const t=document.createElement("div");t.id="header",t.appendChild(n.cloneNode(!0)),e.insertBefore(t,s),n.remove()}s.innerHTML=this.innerHTML,this.innerHTML="";const o=this;e.querySelector("button").addEventListener("click",function(){const t=e.getElementById("wrapper");t.style.maxHeight==`${o.maxHeightCollapsed}px`?(t.style.maxHeight=`${t.children[0].offsetHeight}px`,this.innerText="show less"):(t.style.maxHeight=`${o.maxHeightCollapsed}px`,this.innerText="show more")})}updateTableData(e,t,n,s){const o=this.shadowRoot.querySelector(e);o.innerHTML=`<tr><th colspan='2'>${t}</td></tr>`+Object.entries(n).filter(([e,t])=>t>=10**-s).map(([e,t])=>`<tr><td>${e}</td><td>${t.toFixed(s)}</td></tr>`).join(""),this.shadowRoot.querySelector("button").style.display=o.offsetHeight>this.maxHeightCollapsed?"block":"none"}}customElements.define("collapsable-table",CollapsableTable)