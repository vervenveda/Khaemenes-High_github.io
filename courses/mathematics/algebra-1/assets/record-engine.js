
(()=>{
"use strict";
const $=s=>document.querySelector(s),KEY="khaemenes-algebra1-completion-record-v1";
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return{}}}
function collect(){const out={};document.querySelectorAll("[data-field]").forEach(e=>out[e.dataset.field]=e.value);return out}
function fill(data){document.querySelectorAll("[data-field]").forEach(e=>{if(data[e.dataset.field]!=null)e.value=data[e.dataset.field]})}
function calculate(){
 const g=collect(),vals=["coursework","midterm","final","capstone"].map(k=>Number(g[k]));
 if(vals.some(v=>!Number.isFinite(v)))return alert("Enter all four component scores.");
 const p=vals[0]*.40+vals[1]*.20+vals[2]*.30+vals[3]*.10;
 $("#finalGrade").value=p.toFixed(1);
 $("#letterGrade").value=p>=90?"A":p>=80?"B":p>=70?"C":p>=60?"D":"F";
}
$("#calculate").onclick=calculate;
$("#save").onclick=()=>{localStorage.setItem(KEY,JSON.stringify(collect()));alert("Record saved locally.")};
$("#print").onclick=()=>window.print();
$("#export").onclick=()=>{
 const blob=new Blob([JSON.stringify(collect(),null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="algebra1-course-completion-record.json";a.click();
 setTimeout(()=>URL.revokeObjectURL(url),500);
};
fill(load());
})();
