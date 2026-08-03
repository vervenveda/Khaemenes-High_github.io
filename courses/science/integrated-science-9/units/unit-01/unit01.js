"use strict";
(() => {
  const KEY = "khaemenes_science_u01_v1";
  const ROOT_KEY = "khaemenes_science_integrated9_v1";
  const THEME_KEY = "khaemenes_theme";
  const REQUIREMENTS = [
    "day01","day02","day03","day04","day05",
    "day06","day07","day08","day09","day10",
    "helicopter","dataset","quiz","design","assessment","reflection"
  ];
  const DEFAULT = {
    completedPages: [],
    helicopter: { complete:false, completedAt:null },
    dataset: { complete:false, completedAt:null },
    quiz: { passed:false, score:0, total:15, attempts:0, completedAt:null },
    design: { submitted:false, title:"", completedAt:null },
    assessment: { passed:false, score:0, total:24, attempts:0, completedAt:null },
    reflection: { complete:false, text:"", completedAt:null },
    updatedAt:null
  };

  const $ = (s,p=document) => p.querySelector(s);
  const $$ = (s,p=document) => [...p.querySelectorAll(s)];
  function parse(raw,fallback){try{return JSON.parse(raw)??fallback}catch{return fallback}}
  function load(){
    const saved=parse(localStorage.getItem(KEY),{});
    return {
      ...DEFAULT,...saved,
      completedPages:Array.isArray(saved.completedPages)?saved.completedPages:[],
      helicopter:{...DEFAULT.helicopter,...(saved.helicopter||{})},
      dataset:{...DEFAULT.dataset,...(saved.dataset||{})},
      quiz:{...DEFAULT.quiz,...(saved.quiz||{})},
      design:{...DEFAULT.design,...(saved.design||{})},
      assessment:{...DEFAULT.assessment,...(saved.assessment||{})},
      reflection:{...DEFAULT.reflection,...(saved.reflection||{})}
    };
  }
  let state=load();

  function save(){
    state.updatedAt=new Date().toISOString();
    localStorage.setItem(KEY,JSON.stringify(state));
    syncRoot();
    updatePage();
  }

  function requirementComplete(id){
    if(/^day\d\d$/.test(id)) return state.completedPages.includes(id);
    if(id==="helicopter") return Boolean(state.helicopter.complete);
    if(id==="dataset") return Boolean(state.dataset.complete);
    if(id==="quiz") return Boolean(state.quiz.passed);
    if(id==="design") return Boolean(state.design.submitted);
    if(id==="assessment") return Boolean(state.assessment.passed);
    if(id==="reflection") return Boolean(state.reflection.complete);
    return false;
  }
  function unitComplete(){return REQUIREMENTS.every(requirementComplete)}

  function syncRoot(){
    if(!unitComplete()) return;
    const root=parse(localStorage.getItem(ROOT_KEY),{});
    const completed=new Set(Array.isArray(root.completedUnits)?root.completedUnits:[]);
    completed.add("u01");
    localStorage.setItem(ROOT_KEY,JSON.stringify({
      pathway:root.pathway||"Core",
      completedUnits:[...completed],
      notes:root.notes&&typeof root.notes==="object"?root.notes:{},
      lastVisitedUnit:"u01",
      updatedAt:new Date().toISOString()
    }));
  }

  function applyTheme(theme){
    const resolved=["dark","light"].includes(theme)?theme:"dark";
    document.documentElement.dataset.theme=resolved;
    localStorage.setItem(THEME_KEY,resolved);
    const button=$("#themeToggle");
    if(button){
      button.textContent=resolved==="dark"?"☼":"◐";
      button.setAttribute("aria-label",`Switch to ${resolved==="dark"?"light":"dark"} theme`);
    }
  }
  function initializeTheme(){
    const saved=localStorage.getItem(THEME_KEY);
    const preferred=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";
    applyTheme(saved||preferred);
    $("#themeToggle")?.addEventListener("click",()=>applyTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
  }

  function toast(message){
    const box=$("#toast"); if(!box)return;
    box.textContent=message;box.hidden=false;
    clearTimeout(toast.timer);toast.timer=setTimeout(()=>box.hidden=true,3400);
  }

  function togglePage(id){
    const set=new Set(state.completedPages);
    if(set.has(id))set.delete(id);else set.add(id);
    state.completedPages=[...set];save();
    toast(set.has(id)?"Lesson marked complete.":"Lesson completion removed.");
  }

  function markEvidence(type){
    if(type==="helicopter")state.helicopter={complete:true,completedAt:new Date().toISOString()};
    if(type==="dataset")state.dataset={complete:true,completedAt:new Date().toISOString()};
    save();toast("Investigation evidence recorded.");
  }

  function submitDesign(event){
    event.preventDefault();
    const checks=$$(".design-check");
    if(!checks.every(box=>box.checked)){toast("Complete every design component before recording submission.");return}
    state.design={submitted:true,title:$("#designTitle")?.value.trim()||"Investigation design task",completedAt:new Date().toISOString()};
    save();toast("Investigation design task recorded.");
  }

  function submitReflection(event){
    event.preventDefault();
    const text=$("#reflectionText")?.value.trim()||"";
    if(text.length<40){toast("Add a fuller reflection of at least 40 characters.");return}
    state.reflection={complete:true,text,completedAt:new Date().toISOString()};
    save();toast("Unit reflection recorded.");
  }

  function updatePage(){
    $$("[data-requirement]").forEach(card=>{
      const done=requirementComplete(card.dataset.requirement);
      card.dataset.complete=String(done);
      const status=$("[data-requirement-status]",card);
      if(status)status.textContent=done?"Complete":"Not complete";
    });
    const count=REQUIREMENTS.filter(requirementComplete).length;
    const percent=Math.round(count/REQUIREMENTS.length*100);
    $("#unitProgressFill")&&($("#unitProgressFill").style.width=`${percent}%`);
    $("#unitProgressCount")&&($("#unitProgressCount").textContent=`${count} of ${REQUIREMENTS.length} requirements`);
    $("#unitProgressPercent")&&($("#unitProgressPercent").textContent=`${percent}%`);
    $("#unitCompletionStatus")&&($("#unitCompletionStatus").textContent=unitComplete()?"Unit 01 complete":"Unit 01 in progress");

    $$("[data-page-complete]").forEach(button=>{
      const id=button.dataset.pageComplete;
      const done=state.completedPages.includes(id);
      button.setAttribute("aria-pressed",String(done));
      button.textContent=done?"Lesson Complete ✓":"Mark Lesson Complete";
    });
    $$("[data-evidence]").forEach(button=>{
      const type=button.dataset.evidence;
      const done=Boolean(state[type]?.complete);
      button.disabled=done;
      button.textContent=done?"Evidence Recorded ✓":"Record Evidence Complete";
    });

    if($("#designTitle"))$("#designTitle").value=state.design.title||"";
    if($("#reflectionText"))$("#reflectionText").value=state.reflection.text||"";
    updateRecord();
  }

  function updateRecord(){
    if(!$("#recordStatus"))return;
    $("#recordStatus").textContent=unitComplete()?"Complete":"In progress";
    $("#recordLessons").textContent=`${state.completedPages.filter(id=>/^day\d\d$/.test(id)).length} of 10`;
    $("#recordInvestigations").textContent=`${Number(state.helicopter.complete)+Number(state.dataset.complete)} of 2`;
    $("#recordQuiz").textContent=state.quiz.passed?`${state.quiz.score} of ${state.quiz.total} · Passed`:`${state.quiz.score||0} of ${state.quiz.total}`;
    $("#recordDesign").textContent=state.design.submitted?"Submitted":"Not submitted";
    $("#recordAssessment").textContent=state.assessment.passed?`${state.assessment.score} of ${state.assessment.total} · Passed`:`${state.assessment.score||0} of ${state.assessment.total}`;
    $("#recordReflection").textContent=state.reflection.complete?"Recorded":"Not recorded";
    $("#recordDate").textContent=new Date().toLocaleDateString();
    $("#recordReflectionText").textContent=state.reflection.text||"No reflection recorded.";
  }

  function exportRecord(){
    const payload={schema:"khaemenes-science-u01-v1",course:"KH-SCI-IIS9",unit:"u01",exportedAt:new Date().toISOString(),state};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;
    a.download=`KH-SCI-IIS9-unit01-record-${new Date().toISOString().slice(0,10)}.json`;
    document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
    toast("Unit 01 record exported.");
  }

  function initialize(){
    initializeTheme();
    $$("[data-page-complete]").forEach(button=>button.addEventListener("click",()=>togglePage(button.dataset.pageComplete)));
    $$("[data-evidence]").forEach(button=>button.addEventListener("click",()=>markEvidence(button.dataset.evidence)));
    $("#designForm")?.addEventListener("submit",submitDesign);
    $("#reflectionForm")?.addEventListener("submit",submitReflection);
    $("#printPage")?.addEventListener("click",()=>window.print());
    $("#exportUnitRecord")?.addEventListener("click",exportRecord);
    updatePage();
  }

  window.KhaemenesUnit01={
    loadState:()=>state,
    saveState(next){state={...state,...next};save()},
    toast
  };
  document.addEventListener("DOMContentLoaded",initialize);
})();