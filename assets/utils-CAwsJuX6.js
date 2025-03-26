function o(){const t="0123456789ABCDEF";let e="#";for(let n=0;n<6;n++)e+=t[Math.floor(Math.random()*16)];return e}function l(){const t=document.createElement("div");return t.className="test-container",t.innerHTML=`
    <h1 class="test-title">Test Element</h1>
    <button class="test-button">Click Me!</button>
  `,t}function c(){const t=l();document.body.appendChild(t);const e=t.querySelector(".test-button");e instanceof HTMLButtonElement&&e.addEventListener("click",()=>{e.style.backgroundColor=o()})}export{c as a};
