"use strict";
const SAFETY_QUESTIONS=[{"id": "s01", "domain": "Personal protection", "prompt": "When an activity requires eye protection, when should safety glasses be worn?", "options": ["Only after something spills", "From before materials are handled until cleanup is complete", "Only while writing results", "Only by the person leading the activity"], "answer": 1, "explanation": "Required eye protection must be worn before materials are handled and remain on through cleanup."}, {"id": "s02", "domain": "Substances", "prompt": "What is the correct rule about tasting investigation materials?", "options": ["Taste only clear liquids.", "Taste only household ingredients.", "Never taste materials unless the activity is an explicitly identified food activity supervised for consumption.", "Taste a tiny amount to identify an unknown substance."], "answer": 2, "explanation": "Laboratory and field materials must not be tasted. Food activities must be explicitly designed and supervised as food activities."}, {"id": "s03", "domain": "Spills", "prompt": "An unknown liquid spills during an investigation. What should a student do first?", "options": ["Touch it to identify it.", "Wipe it up secretly.", "Move away, warn others, and notify the responsible adult or instructor.", "Pour another chemical on it."], "answer": 2, "explanation": "Unknown spills require distance, warning others, and immediate adult or instructor notification."}, {"id": "s04", "domain": "Equipment", "prompt": "What should be done with cracked or chipped glassware?", "options": ["Use it carefully.", "Heat it only once.", "Do not use it; notify the responsible adult or instructor.", "Cover the crack with paper."], "answer": 2, "explanation": "Damaged glassware can fail unexpectedly and must not be used."}, {"id": "s05", "domain": "Clothing and hair", "prompt": "Why should long hair and loose clothing be secured?", "options": ["Only for photographs", "To reduce contact with flames, chemicals, moving equipment, and samples", "To make measurements larger", "Because secured clothing replaces safety glasses"], "answer": 1, "explanation": "Securing hair and loose clothing reduces entanglement and contact hazards."}, {"id": "s06", "domain": "Heat", "prompt": "A container has just been heated. How should it be treated?", "options": ["Assume it is cool if it is not glowing.", "Touch it quickly with a fingertip.", "Treat it as hot, use appropriate tools, and allow safe cooling time.", "Place it directly on a plastic surface."], "answer": 2, "explanation": "Recently heated objects may remain dangerously hot even when they do not look hot."}, {"id": "s07", "domain": "Chemicals", "prompt": "When may substances be mixed?", "options": ["Whenever both are household products", "Only when the written procedure explicitly directs the mixture and required supervision is present", "Whenever the colors look compatible", "To see what happens after the lesson"], "answer": 1, "explanation": "Substances may be mixed only under an explicit, reviewed procedure with the required supervision."}, {"id": "s08", "domain": "Electricity", "prompt": "Which electrical source is appropriate for an independent student circuit activity?", "options": ["An open household wall outlet", "Exposed mains wiring", "The low-voltage battery specified in the written activity", "Any power source that makes the lamp brightest"], "answer": 2, "explanation": "Independent student circuits must use the specified low-voltage battery, never household mains electricity."}, {"id": "s09", "domain": "Fieldwork", "prompt": "Before collecting a sample in a park or natural area, a student should:", "options": ["Collect anything that looks interesting.", "Confirm permission, site rules, safety, and whether collection is necessary.", "Remove protected organisms if only one is taken.", "Enter closed areas to improve the sample."], "answer": 1, "explanation": "Fieldwork requires permission, compliance with site rules, safety review, and minimal environmental disturbance."}, {"id": "s10", "domain": "Organisms", "prompt": "Which practice is prohibited in an ordinary home investigation?", "options": ["Observing a purchased onion cell slide", "Using a virtual microscope", "Culturing unknown microorganisms from household or environmental surfaces", "Observing leaves with a magnifier"], "answer": 2, "explanation": "Culturing unknown microorganisms can amplify harmful organisms and is not home-safe."}, {"id": "s11", "domain": "Disposal", "prompt": "How should investigation waste be discarded?", "options": ["Pour everything down the drain.", "Follow the activity’s specific disposal instructions and local rules.", "Mix all waste together first.", "Leave samples outdoors."], "answer": 1, "explanation": "Disposal depends on the material and must follow the written procedure and local requirements."}, {"id": "s12", "domain": "Health and access", "prompt": "A student has an allergy or accessibility need related to an activity. What is the correct response?", "options": ["Ignore it if the activity is graded.", "Use the activity anyway but work faster.", "Pause and arrange a safe, scientifically meaningful alternative before beginning.", "Ask another student to take the risk."], "answer": 2, "explanation": "Safety and access needs require an appropriate alternative before the activity begins."}, {"id": "s13", "domain": "Emergency response", "prompt": "A person is injured during an activity. What should happen first?", "options": ["Finish collecting data.", "Hide the incident.", "Stop the activity, get appropriate adult or emergency help, and follow the stated emergency procedure.", "Post a photograph online."], "answer": 2, "explanation": "Human safety takes priority over the experiment or data."}, {"id": "s14", "domain": "Work area", "prompt": "What is the correct food and drink rule during science investigations?", "options": ["Food and drink are kept away unless the lesson is an explicitly designed food activity.", "Drinks are allowed beside chemicals if covered.", "Snacks are allowed during cleanup.", "Food may be stored in laboratory containers."], "answer": 0, "explanation": "Food and drink must be separated from investigation materials unless the lesson is explicitly a supervised food activity."}, {"id": "s15", "domain": "Data privacy", "prompt": "A local environmental project records observations near a student’s home. Which public record is safest?", "options": ["The student’s full name and exact street address", "Exact bedroom coordinates", "A broader city or region with personal identifiers removed", "A photograph of private documents"], "answer": 2, "explanation": "Public science records should use only the location precision needed and remove personal identifiers."}];
(() => {
  const KEY="khaemenes_science_u00_v1";
  let answers=new Array(SAFETY_QUESTIONS.length).fill(null);
  let current=0;
  const $=(s,p=document)=>p.querySelector(s);
  function state(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch{return {}}}
  function saveResult(score){
    const s=state();
    const prior=s.safety||{attempts:0};
    s.safety={passed:score===SAFETY_QUESTIONS.length,score,total:SAFETY_QUESTIONS.length,attempts:(prior.attempts||0)+1,completedAt:new Date().toISOString()};
    s.updatedAt=new Date().toISOString();
    localStorage.setItem(KEY,JSON.stringify(s));
  }
  function escape(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
  function render(){
    const q=SAFETY_QUESTIONS[current];
    $("#domainLabel").textContent=q.domain;
    $("#questionNumber").textContent=`Question ${current+1} of ${SAFETY_QUESTIONS.length}`;
    $("#questionPrompt").textContent=q.prompt;
    $("#options").innerHTML=q.options.map((option,index)=>`<label class="option"><input type="radio" name="answer" value="${index}" ${answers[current]===index?"checked":""}><span>${escape(option)}</span></label>`).join("");
    $("#options").querySelectorAll("input").forEach(input=>input.addEventListener("change",event=>{answers[current]=Number(event.target.value);renderDots();updateSubmit();}));
    $("#previousButton").disabled=current===0;
    renderDots();
  }
  function renderDots(){
    $("#questionDots").innerHTML=SAFETY_QUESTIONS.map((_,i)=>`<button class="dot ${i===current?"current":""} ${answers[i]!==null?"answered":""}" type="button" data-i="${i}">${i+1}</button>`).join("");
    $("#questionDots").querySelectorAll("button").forEach(button=>button.addEventListener("click",()=>{current=Number(button.dataset.i);render();}));
  }
  function updateSubmit(){$("#submitButton").disabled=answers.some(v=>v===null)}
  function submit(){
    const score=SAFETY_QUESTIONS.reduce((sum,q,i)=>sum+(answers[i]===q.answer?1:0),0);
    const passed=score===SAFETY_QUESTIONS.length;
    saveResult(score);
    $("#verification").hidden=true;$("#intro").hidden=true;$("#results").hidden=false;
    $("#score").textContent=`${score} / ${SAFETY_QUESTIONS.length}`;
    $("#resultTitle").textContent=passed?"Safety verification passed":"Safety verification not yet passed";
    $("#resultMessage").textContent=passed
      ?"All safety items are correct. The verification has been recorded locally."
      :`Review the ${SAFETY_QUESTIONS.length-score} missed item${SAFETY_QUESTIONS.length-score===1?"":"s"} and retake. Full mastery is required.`;
    $("#reviewList").innerHTML=SAFETY_QUESTIONS.map((q,i)=>{
      const correct=answers[i]===q.answer;
      return `<article class="review-item ${correct?"correct":"incorrect"}"><strong>${i+1}. ${escape(q.prompt)}</strong><p>Your answer: ${escape(q.options[answers[i]])}</p><p>Correct answer: ${escape(q.options[q.answer])}</p><p>${escape(q.explanation)}</p></article>`;
    }).join("");
    $("#returnButton").hidden=!passed;
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function start(){$("#intro").hidden=true;$("#verification").hidden=false;render();updateSubmit();}
  function retake(){answers=new Array(SAFETY_QUESTIONS.length).fill(null);current=0;$("#results").hidden=true;$("#verification").hidden=false;render();updateSubmit();}
  document.addEventListener("DOMContentLoaded",()=>{
    $("#startButton").addEventListener("click",start);
    $("#previousButton").addEventListener("click",()=>{if(current>0){current--;render();}});
    $("#nextButton").addEventListener("click",()=>{if(current<SAFETY_QUESTIONS.length-1){current++;render();}});
    $("#submitButton").addEventListener("click",submit);
    $("#retakeButton").addEventListener("click",retake);
    $("#printResults").addEventListener("click",()=>window.print());
  });
})();