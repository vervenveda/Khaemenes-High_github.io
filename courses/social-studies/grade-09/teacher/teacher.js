(() => {
'use strict';
const C=window.KHAEMENES_SOCIAL_STUDIES_DATA, KEY=C.metadata.storageKey;
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=(v='')=>String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
let db; try{db=JSON.parse(localStorage.getItem(KEY))||{};}catch{db={};}
db.students ||= []; db.teacherPasscode ||= 'KHAE09';
let unlocked=sessionStorage.getItem(KEY+'_teacher')==='yes', selected=db.students[0]?.id||null, week=1;
function save(){localStorage.setItem(KEY,JSON.stringify(db))}
function student(){return db.students.find(s=>s.id===selected)}
function stats(s){
  const lessons=Object.values(s?.completedLessons||{}).reduce((n,a)=>n+a.filter(Boolean).length,0);
  const assignments=Object.values(s?.assignments||{}).filter(a=>a.submitted).length;
  const quizzes=Object.values(s?.quizzes||{}).filter(q=>q.completed);
  const avg=quizzes.length?Math.round(quizzes.reduce((n,q)=>n+(q.bestPercent??q.percent??0),0)/quizzes.length):0;
  return {lessons,assignments,quizzes:quizzes.length,avg};
}
function render(){
  const host=$('#teacherContent');
  if(!unlocked){host.innerHTML=lockHTML();wireLock();return}
  host.innerHTML=dashboardHTML();wire();
}
function lockHTML(){return `<section class="card lockScreen"><h2>Teacher Access</h2>
  <p>Enter the local teacher passcode. The initial passcode is <code>KHAE09</code>; change it after first use.</p>
  <label for="pass">Passcode</label><input id="pass" type="password" autocomplete="current-password">
  <div class="actions"><button id="unlock">Open Teacher Portal</button><a class="button secondary" href="../index.html">Cancel</a></div>
  <p id="lockMsg" class="small"></p></section>`}
function wireLock(){
  $('#unlock').onclick=()=>{if($('#pass').value===db.teacherPasscode){unlocked=true;sessionStorage.setItem(KEY+'_teacher','yes');render()}else $('#lockMsg').textContent='Passcode not recognized.'};
  $('#pass').addEventListener('keydown',e=>{if(e.key==='Enter')$('#unlock').click()});
}
function dashboardHTML(){
  const s=student(), st=stats(s);
  return `<div class="grid" style="margin-top:18px">
    <section class="card col12">
      <h2>Teacher Dashboard</h2>
      <div class="inline"><div><label>Student</label><select id="studentPick">${db.students.length?db.students.map(x=>`<option value="${x.id}" ${x.id===selected?'selected':''}>${esc(x.name)}</option>`).join(''):'<option>No students saved</option>'}</select></div>
      <div><label>Week</label><select id="weekPick">${C.weeks.map(w=>`<option value="${w.week}" ${w.week===week?'selected':''}>Week ${w.week}: ${esc(w.title)}</option>`).join('')}</select></div></div>
      <div class="actions"><button id="print">Print</button><button class="secondary" id="csv">Export CSV</button><button class="secondary" id="keys">Open Week Answer Key</button><button class="ghost" id="changePass">Change Passcode</button><button class="danger" id="lock">Lock</button></div>
    </section>
    <section class="card col3 kpi"><strong>${st.lessons}/180</strong><span>Lessons complete</span></section>
    <section class="card col3 kpi"><strong>${st.assignments}/108</strong><span>Assignments submitted</span></section>
    <section class="card col3 kpi"><strong>${st.quizzes}/36</strong><span>Quizzes complete</span></section>
    <section class="card col3 kpi"><strong>${st.avg}%</strong><span>Quiz average</span></section>
    ${s?studentWeekHTML(s,C.weeks[week-1]):'<section class="card col12"><p>No student records are stored in this browser.</p></section>'}
    <section class="card col12"><h3>Teacher Resource Library</h3>
      <div class="actions">
        <a class="button secondary" href="TEACHER_HANDBOOK.md">Teacher Handbook</a>
        <a class="button secondary" href="RUBRICS.md">Rubrics</a>
        <a class="button secondary" href="PACINGS_AND_SUPPORTS.md">Pacing &amp; Supports</a>
        <a class="button secondary" href="ANSWER_KEY_INDEX.html">All Answer Keys</a>
        <a class="button secondary" href="../docs/STANDARDS_CROSSWALK.md">Standards Crosswalk</a>
      </div>
    </section>
  </div>`;
}
function studentWeekHTML(s,w){
  const done=(s.completedLessons?.[w.week]||[]).filter(Boolean).length, q=s.quizzes?.[w.week];
  return `<section class="card col12"><h2>${esc(s.name)} · Week ${w.week}</h2>
    <p><strong>${esc(w.title)}</strong> · Lessons ${done}/5 · Quiz ${q?.completed?`${q.bestPercent??q.percent}% best (${q.attempts||1} attempt${(q.attempts||1)===1?'':'s'})`:'not completed'}</p>
    <h3>Assignments</h3>${w.assignments.map(a=>{
      const key=`${w.week}-${a.number}`, r=s.assignments?.[key]||{};
      return `<article class="assignment"><h4>${a.number}. ${esc(a.title)}</h4><p>${r.submitted?'<span class="pill good">Submitted</span>':'<span class="pill warn">Not submitted</span>'}</p>
      <p>${esc(r.text||'No typed response stored. The student may have submitted a printed attachment.')}</p>
      <div class="inline"><div><label>Score (0–${a.points})</label><input type="number" min="0" max="${a.points}" step="1" data-score="${key}" value="${r.score??''}"></div>
      <div><label>Feedback</label><input data-feedback="${key}" value="${esc(r.feedback||'')}"></div></div>
      <button class="saveScore" data-key="${key}">Save Score</button>
      <details><summary>Sample-answer guidance and rubric</summary><p>${esc(a.sampleAnswer)}</p>${Object.entries(a.rubric).map(([k,v])=>`<p><strong>${esc(k)}:</strong> ${esc(v)}</p>`).join('')}</details></article>`}).join('')}
    <h3>Constructed Quiz Response</h3><div class="assignment"><p>${esc(q?.shortResponse||'No response saved.')}</p>
      <p><strong>Exemplar guidance:</strong> ${esc(w.quiz.shortResponse.exemplar)}</p></div>
  </section>`;
}
function wire(){
  $('#studentPick')?.addEventListener('change',e=>{selected=e.target.value;render()});
  $('#weekPick')?.addEventListener('change',e=>{week=+e.target.value;render()});
  $$('.saveScore').forEach(b=>b.onclick=()=>{const s=student(),key=b.dataset.key;s.assignments ||= {};s.assignments[key] ||= {};
    s.assignments[key].score=+$(`[data-score="${key}"]`).value;s.assignments[key].feedback=$(`[data-feedback="${key}"]`).value;s.assignments[key].graded=new Date().toISOString();save();b.textContent='Saved ✓';});
  $('#print').onclick=()=>print();
  $('#keys').onclick=()=>location.href=`ANSWER_KEY_INDEX.html#week-${week}`;
  $('#lock').onclick=()=>{sessionStorage.removeItem(KEY+'_teacher');unlocked=false;render()};
  $('#changePass').onclick=()=>{const p=prompt('Enter a new teacher passcode (at least 6 characters).');if(p&&p.length>=6){db.teacherPasscode=p;save();alert('Passcode changed in this browser.')}};
  $('#csv').onclick=exportCSV;
}
function exportCSV(){
 const rows=[['Student','Lessons','Assignments','Quizzes','Quiz Average','Midterm','Final']];
 db.students.forEach(s=>{const x=stats(s);rows.push([s.name,x.lessons,x.assignments,x.quizzes,x.avg,s.exams?.midterm?.bestPercent??'',s.exams?.final?.bestPercent??''])});
 const csv=rows.map(r=>r.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n');
 const blob=new Blob([csv],{type:'text/csv'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='grade09-social-studies-teacher-gradebook.csv';a.click();setTimeout(()=>URL.revokeObjectURL(u),500);
}
render();
})();
