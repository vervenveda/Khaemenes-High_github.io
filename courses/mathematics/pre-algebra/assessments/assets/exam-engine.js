/* ==========================================================
   KHAEMENES ACADEMY EXAM ENGINE
   Progressive enhancement for static HTML assessments.
   Version: 20

   Supported markup:
   <form data-exam-id="midterm-01-07" data-passing-score="80">
     <fieldset class="assessment-question"
       data-question-id="q1"
       data-answer="b"
       data-points="1"
       data-explanation="...">
       <input type="radio" name="q1" value="a">
       <input type="radio" name="q1" value="b">
     </fieldset>
     <button type="submit">Score Assessment</button>
   </form>
   ========================================================== */

(() => {
  "use strict";

  const STORAGE_PREFIX = "khaemenes-assessment-v20:";
  const forms = document.querySelectorAll("form[data-exam-id]");

  if (!forms.length) return;

  const safeJSON = {
    parse(value, fallback = null) {
      try {
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    },
    stringify(value) {
      try {
        return JSON.stringify(value);
      } catch {
        return "";
      }
    }
  };

  function escapeText(value) {
    return String(value ?? "");
  }

  function getQuestions(form) {
    return [...form.querySelectorAll("[data-question-id]")];
  }

  function getSelectedValue(question) {
    const checked = question.querySelector(
      'input[type="radio"]:checked,input[type="checkbox"]:checked'
    );

    if (checked) {
      if (checked.type === "checkbox") {
        return [...question.querySelectorAll('input[type="checkbox"]:checked')]
          .map(input => input.value)
          .sort()
          .join(",");
      }
      return checked.value;
    }

    const select = question.querySelector("select");
    if (select) return select.value;

    const text = question.querySelector(
      'input[type="text"],input[type="number"],textarea'
    );
    return text ? text.value.trim() : "";
  }

  function normalize(value) {
    return String(value ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function isCorrect(question, response) {
    const expected = question.dataset.answer ?? "";
    const accepted = expected.split("|").map(normalize);
    return accepted.includes(normalize(response));
  }

  function questionPoints(question) {
    const value = Number(question.dataset.points || 1);
    return Number.isFinite(value) && value > 0 ? value : 1;
  }

  function saveDraft(form) {
    const examId = form.dataset.examId;
    const responses = {};

    getQuestions(form).forEach(question => {
      responses[question.dataset.questionId] = getSelectedValue(question);
    });

    const payload = {
      version: 20,
      examId,
      savedAt: new Date().toISOString(),
      responses
    };

    localStorage.setItem(
      STORAGE_PREFIX + examId,
      safeJSON.stringify(payload)
    );

    updateProgress(form);
    announce(form, "Assessment progress saved in this browser.");
  }

  function restoreDraft(form) {
    const examId = form.dataset.examId;
    const payload = safeJSON.parse(
      localStorage.getItem(STORAGE_PREFIX + examId),
      null
    );

    if (!payload || !payload.responses) return;

    getQuestions(form).forEach(question => {
      const response = payload.responses[question.dataset.questionId];
      if (response === undefined || response === null) return;

      const controls = question.querySelectorAll("input,select,textarea");

      controls.forEach(control => {
        if (control.type === "radio") {
          control.checked = String(control.value) === String(response);
        } else if (control.type === "checkbox") {
          const values = String(response).split(",");
          control.checked = values.includes(control.value);
        } else {
          control.value = response;
        }
      });
    });

    updateProgress(form);
  }

  function clearDraft(form) {
    localStorage.removeItem(STORAGE_PREFIX + form.dataset.examId);
    form.reset();

    getQuestions(form).forEach(question => {
      question.classList.remove("is-correct", "is-incorrect");
      question.querySelectorAll(".assessment-feedback").forEach(node => node.remove());
    });

    updateProgress(form);
    announce(form, "Saved assessment progress cleared.");
  }

  function updateProgress(form) {
    const questions = getQuestions(form);
    const answered = questions.filter(
      question => normalize(getSelectedValue(question)) !== ""
    ).length;

    const percent = questions.length
      ? Math.round((answered / questions.length) * 100)
      : 0;

    const track = form.querySelector("[data-exam-progress]");
    if (track) {
      track.style.setProperty("--assessment-progress", `${percent}%`);
      track.setAttribute("aria-valuenow", String(percent));
    }

    const label = form.querySelector("[data-exam-progress-label]");
    if (label) {
      label.textContent = `${answered} of ${questions.length} answered`;
    }
  }

  function scoreExam(form) {
    const questions = getQuestions(form);
    let earned = 0;
    let possible = 0;
    let answered = 0;

    questions.forEach(question => {
      const points = questionPoints(question);
      const response = getSelectedValue(question);
      const correct = isCorrect(question, response);

      possible += points;
      if (normalize(response) !== "") answered += 1;
      if (correct) earned += points;

      question.classList.remove("is-correct", "is-incorrect");
      question.classList.add(correct ? "is-correct" : "is-incorrect");

      question.querySelectorAll(".assessment-feedback").forEach(node => node.remove());

      const feedback = document.createElement("div");
      feedback.className =
        "assessment-feedback " + (correct ? "correct" : "incorrect");

      const explanation = question.dataset.explanation || "";
      feedback.textContent = correct
        ? `Correct.${explanation ? " " + explanation : ""}`
        : `Review this item.${explanation ? " " + explanation : ""}`;

      question.appendChild(feedback);
    });

    const percent = possible ? Math.round((earned / possible) * 100) : 0;
    const passingScore = Number(form.dataset.passingScore || 80);
    const passed = percent >= passingScore;

    const result = {
      version: 20,
      examId: form.dataset.examId,
      completedAt: new Date().toISOString(),
      earned,
      possible,
      percent,
      answered,
      totalQuestions: questions.length,
      passingScore,
      passed
    };

    localStorage.setItem(
      STORAGE_PREFIX + form.dataset.examId + ":result",
      safeJSON.stringify(result)
    );

    renderResults(form, result);
    saveDraft(form);
    return result;
  }

  function renderResults(form, result) {
    let panel = form.querySelector("[data-exam-results]");

    if (!panel) {
      panel = document.createElement("section");
      panel.className = "assessment-results";
      panel.dataset.examResults = "";
      form.appendChild(panel);
    }

    panel.innerHTML = "";

    const score = document.createElement("strong");
    score.className = "assessment-score";
    score.textContent = `${result.percent}%`;

    const summary = document.createElement("p");
    summary.textContent =
      `${result.earned} of ${result.possible} points · ` +
      `${result.answered} of ${result.totalQuestions} questions answered · ` +
      (result.passed ? "Mastery threshold met." : "Review and retake recommended.");

    panel.append(score, summary);
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function exportResult(form) {
    const examId = form.dataset.examId;
    const result = safeJSON.parse(
      localStorage.getItem(STORAGE_PREFIX + examId + ":result"),
      null
    );

    const payload = {
      app: "Khaemenes Academy Assessment Suite",
      exportedAt: new Date().toISOString(),
      examId,
      result,
      responses: {}
    };

    getQuestions(form).forEach(question => {
      payload.responses[question.dataset.questionId] =
        getSelectedValue(question);
    });

    const blob = new Blob(
      [JSON.stringify(payload, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${examId}-assessment-record.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function announce(form, message) {
    let region = form.querySelector("[data-exam-message]");

    if (!region) {
      region = document.createElement("p");
      region.dataset.examMessage = "";
      region.setAttribute("aria-live", "polite");
      region.className = "assessment-feedback";
      form.prepend(region);
    }

    region.textContent = escapeText(message);
  }

  function setupTimer(form) {
    const timer = form.querySelector("[data-exam-timer]");
    const minutes = Number(form.dataset.timeLimitMinutes || 0);

    if (!timer || !minutes) return;

    let secondsRemaining = minutes * 60;
    const startedKey = STORAGE_PREFIX + form.dataset.examId + ":started";
    const storedStarted = Number(localStorage.getItem(startedKey));
    const startedAt = storedStarted || Date.now();

    if (!storedStarted) localStorage.setItem(startedKey, String(startedAt));

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000);
      secondsRemaining = Math.max(0, minutes * 60 - elapsed);

      const mins = Math.floor(secondsRemaining / 60);
      const secs = secondsRemaining % 60;
      timer.textContent = `${mins}:${String(secs).padStart(2, "0")}`;

      if (secondsRemaining <= 0) {
        clearInterval(interval);
        timer.textContent = "Time complete";
        announce(form, "The suggested time limit has ended.");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
  }

  forms.forEach(form => {
    restoreDraft(form);
    setupTimer(form);

    form.addEventListener("change", () => {
      saveDraft(form);
      updateProgress(form);
    });

    form.addEventListener("input", () => {
      updateProgress(form);
    });

    form.addEventListener("submit", event => {
      event.preventDefault();

      const unanswered = getQuestions(form).filter(
        question => normalize(getSelectedValue(question)) === ""
      );

      if (unanswered.length) {
        const proceed = window.confirm(
          `${unanswered.length} question(s) are unanswered. Score the assessment anyway?`
        );
        if (!proceed) {
          unanswered[0].scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          return;
        }
      }

      scoreExam(form);
    });

    form.querySelectorAll("[data-exam-save]").forEach(button => {
      button.addEventListener("click", () => saveDraft(form));
    });

    form.querySelectorAll("[data-exam-clear]").forEach(button => {
      button.addEventListener("click", () => {
        if (window.confirm("Clear saved answers for this assessment?")) {
          clearDraft(form);
        }
      });
    });

    form.querySelectorAll("[data-exam-export]").forEach(button => {
      button.addEventListener("click", () => exportResult(form));
    });

    form.querySelectorAll("[data-exam-print]").forEach(button => {
      button.addEventListener("click", () => window.print());
    });

    updateProgress(form);
  });
})();
