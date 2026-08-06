(() => {
"use strict";
const PIN_KEY="khaemenes-high-pinned-courses-v2";
const COURSE_ID="algebra-1";
const COURSE_URL="courses/mathematics/algebra-1/index.html";

function pins(){
  try{const value=JSON.parse(localStorage.getItem(PIN_KEY)||"[]");return Array.isArray(value)?value:[]}
  catch{return []}
}
function removePin(){
  try{
    localStorage.setItem(PIN_KEY,JSON.stringify(pins().filter(id=>id!==COURSE_ID)));
    window.dispatchEvent(new StorageEvent("storage",{key:PIN_KEY,newValue:localStorage.getItem(PIN_KEY)}));
  }catch{}
  render();
}
function render(){
  document.querySelectorAll("[data-algebra1-profile-chip]").forEach(node=>node.remove());
  if(!pins().includes(COURSE_ID))return;
  const summary=document.getElementById("profileSummary");
  if(!summary)return;
  let list=summary.querySelector(".pinned-list");
  if(!list){
    list=document.createElement("div");
    list.className="pinned-list";
    summary.appendChild(list);
  }
  const chip=document.createElement("span");
  chip.className="pinned-chip";
  chip.dataset.algebra1ProfileChip="";
  chip.innerHTML=`<a href="${COURSE_URL}">Algebra I</a><button type="button" aria-label="Remove Algebra I from pinned courses">×</button>`;
  chip.querySelector("button").addEventListener("click",removePin);
  list.prepend(chip);
}
const observer=new MutationObserver(()=>render());
if(document.body)observer.observe(document.body,{childList:true,subtree:true});
window.addEventListener("storage",event=>{if(event.key===PIN_KEY)render()});
render();
})();