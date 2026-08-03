"use strict";
const QUIZ_QUESTIONS=[{"id": "q01", "domain": "Questions", "prompt": "Which question is directly testable with measurements?", "options": ["Which paper airplane looks best?", "How does wing length affect the flight distance of a paper airplane made from the same paper?", "Should everyone enjoy building paper airplanes?", "Is flight interesting?"], "answer": 1, "explanation": "Wing length and flight distance can be measured while other features are controlled."}, {"id": "q02", "domain": "Variables", "prompt": "A student changes ramp height and measures the distance a toy car travels. What is the dependent variable?", "options": ["Ramp height", "Distance traveled", "Type of ruler", "Number of students"], "answer": 1, "explanation": "The dependent variable is the measured outcome: distance traveled."}, {"id": "q03", "domain": "Variables", "prompt": "In the ramp investigation, which factor should be controlled?", "options": ["The distance traveled", "The ramp height being tested", "The toy car used for every trial", "The final graph title"], "answer": 2, "explanation": "Using the same toy car helps isolate the effect of ramp height."}, {"id": "q04", "domain": "Design", "prompt": "Why are repeated trials useful?", "options": ["They guarantee the hypothesis is correct.", "They help reveal variation and improve confidence in the typical result.", "They remove the need to record raw data.", "They make controlled variables unnecessary."], "answer": 1, "explanation": "Repeated trials show variation and support a more reliable estimate such as a mean."}, {"id": "q05", "domain": "Measurement", "prompt": "Which measurement includes both a quantity and an appropriate unit?", "options": ["12", "12 long", "12 centimeters", "centimeters"], "answer": 2, "explanation": "A complete measurement includes a number and a unit."}, {"id": "q06", "domain": "Measurement", "prompt": "Four measurements are 9.8 cm, 9.8 cm, 9.9 cm, and 9.8 cm. These results are best described as:", "options": ["Highly precise", "Definitely accurate", "Unmeasurable", "Causal"], "answer": 0, "explanation": "The measurements are close to one another, indicating high precision. Accuracy requires comparison with a trusted value."}, {"id": "q07", "domain": "Graphing", "prompt": "Which variable is usually placed on the horizontal x-axis?", "options": ["Independent variable", "Dependent variable", "Conclusion", "Measurement uncertainty only"], "answer": 0, "explanation": "The independent variable is usually plotted on the x-axis."}, {"id": "q08", "domain": "Graphing", "prompt": "Which graph is generally most suitable for comparing the mean absorbency of four paper types?", "options": ["Bar graph", "Line graph across time", "Unlabeled sketch", "Pie chart of unrelated totals"], "answer": 0, "explanation": "A bar graph compares numerical values across discrete categories."}, {"id": "q09", "domain": "Data", "prompt": "A result is far from all repeated measurements. What is the best first response?", "options": ["Delete it silently.", "Change it to the expected result.", "Check the method and equipment, repeat if possible, and document it.", "Use it as the only result."], "answer": 2, "explanation": "Anomalies should be investigated and documented, not silently changed or discarded."}, {"id": "q10", "domain": "Evidence", "prompt": "What does correlation alone establish?", "options": ["One variable causes the other.", "The variables show an association, but causation is not established.", "The investigation has no uncertainty.", "Every individual follows the same pattern."], "answer": 1, "explanation": "Correlation identifies an association; additional evidence is required for a causal claim."}, {"id": "q11", "domain": "Evidence", "prompt": "In claim-evidence-reasoning, what is evidence?", "options": ["A measurable result or observation relevant to the claim", "A personal preference", "A repetition of the question", "A conclusion with no data"], "answer": 0, "explanation": "Evidence consists of relevant observations or data used to support a claim."}, {"id": "q12", "domain": "Study types", "prompt": "Researchers record sleep duration and test scores without assigning sleep schedules. This is:", "options": ["A controlled experiment", "An observational study", "A chemical reaction", "A random measurement error"], "answer": 1, "explanation": "The researchers observe existing conditions rather than assigning the explanatory variable."}, {"id": "q13", "domain": "Definitions", "prompt": "Which is an operational definition of plant growth for an investigation?", "options": ["Growth means doing well.", "Growth is the change in stem height in centimeters from Day 1 to Day 14.", "Growth is beautiful.", "Growth is whatever the student notices."], "answer": 1, "explanation": "An operational definition specifies exactly how a variable will be measured."}, {"id": "q14", "domain": "Reliability", "prompt": "Which change most directly improves the reliability of a mean fall-time measurement?", "options": ["Use more repeated trials under the same conditions.", "Round every value to a whole minute.", "Remove all values that differ.", "Change several variables at once."], "answer": 0, "explanation": "Additional repeated trials provide more information about variation and the typical result."}, {"id": "q15", "domain": "Ethics and risk", "prompt": "A planned method creates a risk that cannot be reasonably controlled with available equipment. What should the investigator do?", "options": ["Continue because data are important.", "Hide the risk from participants.", "Revise or replace the method before beginning.", "Use fewer safety instructions."], "answer": 2, "explanation": "An investigation must be redesigned or replaced when risk cannot be reasonably controlled."}];
(() => {
  const QUESTIONS=QUIZ_QUESTIONS;
  const FIELD="quiz";
  const TOTAL=15;
  const PASSING=12;
  const KEY="khaemenes_science_u01_v1";
  let answers=new Array(QUESTIONS.length).fill(null);
  let current=0;
  const $=(s,p=document)=>p.querySelector(s);
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}}
  function saveResult(score){
    const state=load();
    const prior=state[FIELD]||{attempts:0};
    state[FIELD]={passed:score>=PASSING,score,total:TOTAL,attempts:(prior.attempts||0)+1,completedAt:new Date().toISOString()};
    state.updatedAt=new Date().toISOString();
    localStorage.setItem(KEY,JSON.stringify(state));
  }
  function escape(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
  function render(){
    const q=QUESTIONS[current];
    $("#domainLabel").textContent=q.domain;
    $("#questionNumber").textContent=`Question ${current+1} of ${QUESTIONS.length}`;
    $("#questionPrompt").textContent=q.prompt;
    $("#options").innerHTML=q.options.map((option,index)=>`<label class="option"><input type="radio" name="answer" value="${index}" ${answers[current]===index?"checked":""}><span>${escape(option)}</span></label>`).join("");
    $("#options").querySelectorAll("input").forEach(input=>input.addEventListener("change",event=>{answers[current]=Number(event.target.value);renderDots();updateSubmit();}));
    $("#previousButton").disabled=current===0; renderDots();
  }
  function renderDots(){
    $("#questionDots").innerHTML=QUESTIONS.map((_,i)=>`<button class="dot ${i===current?"current":""} ${answers[i]!==null?"answered":""}" type="button" data-i="${i}">${i+1}</button>`).join("");
    $("#questionDots").querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{current=Number(button.dataset.i);render();}));
  }
  function updateSubmit(){$("#submitButton").disabled=answers.some(v=>v===null)}
  function submit(){
    const domains={};let score=0;
    QUESTIONS.forEach((q,i)=>{domains[q.domain]||={correct:0,total:0};domains[q.domain].total++;if(answers[i]===q.answer){score++;domains[q.domain].correct++;}});
    const passed=score>=PASSING; saveResult(score);
    $("#assessment").hidden=true;$("#intro").hidden=true;$("#results").hidden=false;
    $("#score").textContent=`${score} / ${TOTAL}`;
    $("#resultTitle").textContent=passed?"Mastery threshold reached":"Mastery threshold not yet reached";
    $("#resultMessage").textContent=passed
      ?`The ${Math.round(PASSING/TOTAL*100)}% objective threshold has been reached. Review explanations and complete any required constructed responses.`
      :`Review the missed items, correct misconceptions, and retake. At least ${PASSING} of ${TOTAL} is required.`;
    $("#domainGrid").innerHTML=Object.entries(domains).map(([name,data])=>`<div class="domain-result"><strong>${data.correct} / ${data.total}</strong><span>${escape(name)}</span></div>`).join("");
    $("#reviewList").innerHTML=QUESTIONS.map((q,i)=>{const correct=answers[i]===q.answer;return `<article class="review-item ${correct?"correct":"incorrect"}"><strong>${i+1}. ${escape(q.prompt)}</strong><p>Your answer: ${escape(q.options[answers[i]])}</p><p>Correct answer: ${escape(q.options[q.answer])}</p><p>${escape(q.explanation)}</p></article>`;}).join("");
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function start(){$("#intro").hidden=true;$("#assessment").hidden=false;render();updateSubmit();}
  function retake(){answers=new Array(QUESTIONS.length).fill(null);current=0;$("#results").hidden=true;$("#assessment").hidden=false;render();updateSubmit();}
  document.addEventListener("DOMContentLoaded",()=>{
    $("#startButton").addEventListener("click",start);
    $("#previousButton").addEventListener("click",()=>{if(current>0){current--;render();}});
    $("#nextButton").addEventListener("click",()=>{if(current<QUESTIONS.length-1){current++;render();}});
    $("#submitButton").addEventListener("click",submit);
    $("#retakeButton").addEventListener("click",retake);
    $("#printResults").addEventListener("click",()=>window.print());
  });
})();