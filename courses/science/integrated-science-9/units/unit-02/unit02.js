"use strict";
(() => {
 const KEY="khaemenes_science_u02_v1", ROOT_KEY="khaemenes_science_integrated9_v1", THEME_KEY="khaemenes_theme";
 const REQUIREMENTS=["day01", "day02", "day03", "day04", "day05", "day06", "day07", "day08", "day09", "day10", "day11", "day12", "day13", "day14", "day15", "microscopy", "diffusion", "transport", "sav", "model", "quiz", "assessment", "reflection"];
 const DEFAULT={completedPages:[],microscopy:{passed:false,score:0,total:6,attempts:0},diffusion:{complete:false},transport:{complete:false},sav:{complete:false},model:{submitted:false,title:""},quiz:{passed:false,score:0,total:20,attempts:0},assessment:{passed:false,score:0,total:30,attempts:0},reflection:{complete:false,text:""},updatedAt:null};
 const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
 function parse(raw,fallback){try{return JSON.parse(raw)??fallback}catch{return fallback}}
 function load(){const s=parse(localStorage.getItem(KEY),{});return {...DEFAULT,...s,completedPages:Array.isArray(s.completedPages)?s.completedPages:[],microscopy:{...DEFAULT.microscopy,...(s.microscopy||{})},diffusion:{...DEFAULT.diffusion,...(s.diffusion||{})},transport:{...DEFAULT.transport,...(s.transport||{})},sav:{...DEFAULT.sav,...(s.sav||{})},model:{...DEFAULT.model,...(s.model||{})},quiz:{...DEFAULT.quiz,...(s.quiz||{})},assessment:{...DEFAULT.assessment,...(s.assessment||{})},reflection:{...DEFAULT.reflection,...(s.reflection||{})}}}
 let state=load();
 function done(id){if(/^day\d\d$/.test(id))return state.completedPages.includes(id);if(id==="microscopy")return !!state.microscopy.passed;if(["diffusion","transport","sav"].includes(id))return !!state[id].complete;if(id==="model")return !!state.model.submitted;if(["quiz","assessment"].includes(id))return !!state[id].passed;if(id==="reflection")return !!state.reflection.complete;return false}
 function complete(){return REQUIREMENTS.every(done)}
 function syncRoot(){if(!complete())return;const r=parse(localStorage.getItem(ROOT_KEY),{}),set=new Set(Array.isArray(r.completedUnits)?r.completedUnits:[]);set.add("u02");localStorage.setItem(ROOT_KEY,JSON.stringify({pathway:r.pathway||"Core",completedUnits:[...set],notes:r.notes&&typeof r.notes==="object"?r.notes:{},lastVisitedUnit:"u02",updatedAt:new Date().toISOString()}))}
 function save(){state.updatedAt=new Date().toISOString();localStorage.setItem(KEY,JSON.stringify(state));syncRoot();update()}
 function theme(t){const v=["dark","light"].includes(t)?t:"dark";document.documentElement.dataset.theme=v;localStorage.setItem(THEME_KEY,v);const b=$("#themeToggle");if(b){b.textContent=v==="dark"?"☼":"◐";b.setAttribute("aria-label",`Switch to ${v==="dark"?"light":"dark"} theme`)}}
 function toast(m){const b=$("#toast");if(!b)return;b.textContent=m;b.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>b.hidden=true,3200)}

 /*
  * Centralized navigation repair.
  * Unit-root pages sit five levels below the repository root.
  * Lesson pages sit six levels below the repository root.
  */
 function repairPortalLinks(){
   const repositoryRoot=location.pathname.includes("/lessons/")
     ?"../../../../../../"
     :"../../../../../";

   $$("a").forEach(link=>{
     const label=link.textContent.replace(/\s+/g," ").trim();
     if(label==="High School"){
       link.setAttribute("href",`${repositoryRoot}index.html`);
     }else if(label==="Grade 9"){
       link.setAttribute("href",`${repositoryRoot}grades/grade-09/`);
     }
   });
 }

 function toggle(id){const s=new Set(state.completedPages);s.has(id)?s.delete(id):s.add(id);state.completedPages=[...s];save();toast(s.has(id)?"Lesson marked complete.":"Lesson completion removed.")}
 function evidence(type){state[type]={...state[type],complete:true,completedAt:new Date().toISOString()};save();toast("Evidence recorded.")}
 function update(){
  $$("[data-requirement]").forEach(c=>{const v=done(c.dataset.requirement);c.dataset.complete=String(v);const s=$("[data-requirement-status]",c);if(s)s.textContent=v?"Complete":"Not complete"});
  const count=REQUIREMENTS.filter(done).length,pct=Math.round(count/REQUIREMENTS.length*100);
  if($("#unitProgressFill"))$("#unitProgressFill").style.width=`${pct}%`;if($("#unitProgressCount"))$("#unitProgressCount").textContent=`${count} of ${REQUIREMENTS.length} requirements`;if($("#unitProgressPercent"))$("#unitProgressPercent").textContent=`${pct}%`;if($("#unitCompletionStatus"))$("#unitCompletionStatus").textContent=complete()?"Unit 02 complete":"Unit 02 in progress";
  $$("[data-page-complete]").forEach(b=>{const v=state.completedPages.includes(b.dataset.pageComplete);b.setAttribute("aria-pressed",String(v));b.textContent=v?"Lesson Complete ✓":"Mark Lesson Complete"});
  $$("[data-evidence]").forEach(b=>{const v=!!state[b.dataset.evidence]?.complete;b.disabled=v;b.textContent=v?"Evidence Recorded ✓":"Record Evidence Complete"});
  if($("#modelTitle"))$("#modelTitle").value=state.model.title||"";if($("#reflectionText"))$("#reflectionText").value=state.reflection.text||"";
  if($("#recordStatus")){$("#recordDate").textContent=new Date().toLocaleDateString();$("#recordStatus").textContent=complete()?"Complete":"In progress";$("#recordLessons").textContent=`${state.completedPages.filter(x=>/^day\d\d$/.test(x)).length} of 15`;$("#recordLabs").textContent=`${Number(state.microscopy.passed)+Number(state.diffusion.complete)+Number(state.transport.complete)+Number(state.sav.complete)} of 4`;$("#recordModel").textContent=state.model.submitted?"Submitted":"Not submitted";$("#recordQuiz").textContent=state.quiz.passed?`${state.quiz.score} of 20 · Passed`:`${state.quiz.score||0} of 20`;$("#recordAssessment").textContent=state.assessment.passed?`${state.assessment.score} of 30 · Passed`:`${state.assessment.score||0} of 30`;$("#recordReflection").textContent=state.reflection.complete?"Recorded":"Not recorded";$("#recordReflectionText").textContent=state.reflection.text||"No reflection recorded."}
 }
 function exportRecord(){const payload={schema:"khaemenes-science-u02-v1",course:"KH-SCI-IIS9",unit:"u02",exportedAt:new Date().toISOString(),state};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`KH-SCI-IIS9-unit02-record-${new Date().toISOString().slice(0,10)}.json`;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);toast("Unit 02 record exported.")}
 function init(){repairPortalLinks();theme(localStorage.getItem(THEME_KEY)||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"));$("#themeToggle")?.addEventListener("click",()=>theme(document.documentElement.dataset.theme==="dark"?"light":"dark"));$$("[data-page-complete]").forEach(b=>b.addEventListener("click",()=>toggle(b.dataset.pageComplete)));$$("[data-evidence]").forEach(b=>b.addEventListener("click",()=>evidence(b.dataset.evidence)));$("#modelForm")?.addEventListener("submit",e=>{e.preventDefault();const checks=$$(".model-check");if(!checks.every(x=>x.checked)){toast("Complete every model criterion.");return}state.model={submitted:true,title:$("#modelTitle")?.value.trim()||"Cell model",completedAt:new Date().toISOString()};save();toast("Cell model recorded.")});$("#reflectionForm")?.addEventListener("submit",e=>{e.preventDefault();const text=$("#reflectionText")?.value.trim()||"";if(text.length<50){toast("Add at least 50 characters.");return}state.reflection={complete:true,text,completedAt:new Date().toISOString()};save();toast("Reflection recorded.")});$("#printPage")?.addEventListener("click",()=>window.print());$("#exportUnitRecord")?.addEventListener("click",exportRecord);update()}
 window.KhaemenesUnit02={loadState:()=>state,saveState(next){state={...state,...next};save()},toast};
 document.addEventListener("DOMContentLoaded",init);
})();
