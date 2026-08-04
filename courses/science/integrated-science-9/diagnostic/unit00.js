"use strict";
(() => {
  const KEY = "khaemenes_science_u00_v1";
  const ROOT_KEY = "khaemenes_science_integrated9_v1";
  const THEME_KEY = "khaemenes_theme";
  const REQUIREMENTS = ["day01","day02","day03","day04","day05","readiness","safety","agreement","portfolio"];
  const DEFAULT = {
    completedPages: [],
    diagnostic: null,
    safety: { passed:false, score:0, total:15, attempts:0, completedAt:null },
    agreement: { accepted:false, studentName:"", date:"" },
    portfolio: { ready:false, format:"", goal:"", date:"" },
    updatedAt:null
  };

  const $ = (s,p=document) => p.querySelector(s);
  const $$ = (s,p=document) => [...p.querySelectorAll(s)];

  function parse(raw,fallback){ try{return JSON.parse(raw) ?? fallback}catch{return fallback} }
  function load(){
    const saved=parse(localStorage.getItem(KEY),{});
    return {
      ...DEFAULT,...saved,
      completedPages:Array.isArray(saved.completedPages)?saved.completedPages:[],
      safety:{...DEFAULT.safety,...(saved.safety||{})},
      agreement:{...DEFAULT.agreement,...(saved.agreement||{})},
      portfolio:{...DEFAULT.portfolio,...(saved.portfolio||{})}
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
    if(id.startsWith("day")) return state.completedPages.includes(id);
    if(id==="readiness") return Boolean(state.diagnostic?.completed);
    if(id==="safety") return Boolean(state.safety?.passed);
    if(id==="agreement") return Boolean(state.agreement?.accepted);
    if(id==="portfolio") return Boolean(state.portfolio?.ready);
    return false;
  }

  function unitComplete(){return REQUIREMENTS.every(requirementComplete)}

  function syncRoot(){
    if(!unitComplete()) return;
    const root=parse(localStorage.getItem(ROOT_KEY),{});
    const completed=new Set(Array.isArray(root.completedUnits)?root.completedUnits:[]);
    completed.add("u00");
    localStorage.setItem(ROOT_KEY,JSON.stringify({
      pathway:root.pathway||"Core",
      completedUnits:[...completed],
      notes:root.notes&&typeof root.notes==="object"?root.notes:{},
      lastVisitedUnit:"u00",
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
    const box=$("#toast");
    if(!box)return;
    box.textContent=message;
    box.hidden=false;
    clearTimeout(toast.timer);
    toast.timer=setTimeout(()=>box.hidden=true,3200);
  }

  function markPage(id){
    if(!id)return;
    const set=new Set(state.completedPages);
    if(set.has(id))set.delete(id);else set.add(id);
    state.completedPages=[...set];
    save();
    toast(set.has(id)?"Lesson marked complete.":"Lesson completion removed.");
  }

  function updatePage(){
    $$("[data-requirement]").forEach(card=>{
      const done=requirementComplete(card.dataset.requirement);
      card.dataset.complete=String(done);
      const value=$("[data-requirement-status]",card);
      if(value)value.textContent=done?"Complete":"Not complete";
    });

    const count=REQUIREMENTS.filter(requirementComplete).length;
    const percent=Math.round(count/REQUIREMENTS.length*100);
    $("#unitProgressFill") && ($("#unitProgressFill").style.width=`${percent}%`);
    $("#unitProgressCount") && ($("#unitProgressCount").textContent=`${count} of ${REQUIREMENTS.length} requirements`);
    $("#unitProgressPercent") && ($("#unitProgressPercent").textContent=`${percent}%`);
    $("#unitCompletionStatus") && ($("#unitCompletionStatus").textContent=unitComplete()?"Unit 00 complete":"Unit 00 in progress");

    $$("[data-page-complete]").forEach(button=>{
      const id=button.dataset.pageComplete;
      const done=state.completedPages.includes(id);
      button.setAttribute("aria-pressed",String(done));
      button.textContent=done?"Lesson Complete ✓":"Mark Lesson Complete";
    });

    if($("#agreementName")) $("#agreementName").value=state.agreement.studentName||"";
    if($("#agreementDate")) $("#agreementDate").value=state.agreement.date||new Date().toISOString().slice(0,10);
    if($("#portfolioFormat")) $("#portfolioFormat").value=state.portfolio.format||"";
    if($("#scienceGoal")) $("#scienceGoal").value=state.portfolio.goal||"";

    updateRecord();
  }

  function saveAgreement(event){
    event.preventDefault();
    const required=$$(".agreement-check");
    if(!required.every(box=>box.checked)){
      toast("All safety commitments must be checked before the agreement is recorded.");
      return;
    }
    state.agreement={
      accepted:true,
      studentName:$("#agreementName")?.value.trim()||"",
      date:$("#agreementDate")?.value||new Date().toISOString().slice(0,10)
    };
    save();
    toast("Safety agreement recorded locally.");
  }

  function savePortfolio(event){
    event.preventDefault();
    const checks=$$(".portfolio-check");
    if(!checks.every(box=>box.checked)){
      toast("Complete every portfolio setup item before recording readiness.");
      return;
    }
    state.portfolio={
      ready:true,
      format:$("#portfolioFormat")?.value||"",
      goal:$("#scienceGoal")?.value.trim()||"",
      date:new Date().toISOString().slice(0,10)
    };
    save();
    toast("Science portfolio setup recorded.");
  }

  function exportRecord(){
    const payload={schema:"khaemenes-science-u00-v1",course:"KH-SCI-IIS9",unit:"u00",exportedAt:new Date().toISOString(),state};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`KH-SCI-IIS9-unit00-record-${new Date().toISOString().slice(0,10)}.json`;
    document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);
    toast("Unit 00 record exported.");
  }

  function updateRecord(){
    if(!$("#recordStatus"))return;
    $("#recordStatus").textContent=unitComplete()?"Complete":"In progress";
    $("#recordLessons").textContent=`${state.completedPages.filter(id=>/^day0[1-5]$/.test(id)).length} of 5`;
    $("#recordReadiness").textContent=state.diagnostic?.completed?`${state.diagnostic.score} of ${state.diagnostic.total}`:"Not completed";
    $("#recordSafety").textContent=state.safety?.passed?`${state.safety.score} of ${state.safety.total} · Passed`:"Not passed";
    $("#recordAgreement").textContent=state.agreement?.accepted?`Recorded ${state.agreement.date||""}`:"Not recorded";
    $("#recordPortfolio").textContent=state.portfolio?.ready?`Ready · ${state.portfolio.format||"format selected"}`:"Not ready";
    $("#recordGoal").textContent=state.portfolio?.goal||"No goal recorded";
    $("#recordStudent").textContent=state.agreement?.studentName||"Student name";
    $("#recordDate").textContent=new Date().toLocaleDateString();
  }

  function initialize(){
    initializeTheme();
    $$("[data-page-complete]").forEach(button=>button.addEventListener("click",()=>markPage(button.dataset.pageComplete)));
    $("#agreementForm")?.addEventListener("submit",saveAgreement);
    $("#portfolioForm")?.addEventListener("submit",savePortfolio);
    $("#printPage")?.addEventListener("click",()=>window.print());
    $("#exportUnitRecord")?.addEventListener("click",exportRecord);
    updatePage();
  }
  window.KhaemenesUnit00={loadState:()=>state,saveState(next){state={...state,...next};save();},toast};
  document.addEventListener("DOMContentLoaded",initialize);
})();
/* Shared redesigned-gateway theme layer. */
(() => {
  const marker="/courses/science/integrated-science-9/";
  const path=window.location.pathname;
  const at=path.indexOf(marker);
  const base=at>=0 ? path.slice(0,at+marker.length) : new URL("./",window.location.href).pathname;
  if(document.querySelector('script[data-science-theme-loader]')) return;
  const script=document.createElement("script");
  script.src=`${base}science-theme-loader.js`;
  script.defer=true;
  script.dataset.scienceThemeLoader="true";
  document.head.append(script);
})();
