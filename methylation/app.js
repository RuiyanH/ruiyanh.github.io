const questions = [
  {
    category: "Clock interpretation",
    count: "Jenel v3 · item 1 of 11",
    question: "DunedinPACE falls from 0.95 to 0.72 after an intervention. Which interpretation is best supported by those two measurements?",
    options: [
      "The participant reversed exactly 0.23 biological years",
      "Estimated pace fell by 0.23 units; durability and causality are not established",
      "Biological aging slowed by exactly 23% because the scale is a percentage",
      "The change is uninterpretable because DunedinPACE has no reference scale",
    ],
    answer: 1,
    explanation: "DunedinPACE estimates pace, not accumulated biological age. The difference is 0.23 units, and a value below 1 is consistent with a slower estimated pace. Two observations alone do not establish a durable intervention effect or clinical benefit.",
    contract: [
      ["Required reasoning claims", "6"],
      ["Explicit failure checks", "2"],
      ["Linked sources", "1"],
    ],
  },
  {
    category: "Cell-composition confounding",
    count: "Jenel v3 · item 3 of 11",
    question: "After corticosteroid treatment, whole-blood methylation shifts coincide with more neutrophils and fewer lymphocytes. What does the evidence establish?",
    options: [
      "It proves uniform genome-wide reprogramming within every blood cell type",
      "It proves the methylation assay failed because cell counts changed",
      "Cell-mixture change is a strong competing explanation; cell-aware and sorted-cell analyses are needed",
      "It proves that methylation cannot change within 24 hours",
    ],
    answer: 2,
    explanation: "Bulk blood combines signals from different cell populations. Corticosteroid-driven redistribution can explain much of the shift, while genuine within-cell responses may also occur. Measured counts or deconvolution, paired cell-aware models, and sorted-cell validation are needed to separate them.",
    contract: [
      ["Required reasoning claims", "7"],
      ["Explicit failure checks", "3"],
      ["Linked sources", "1"],
    ],
  },
  {
    category: "Quantitative translation",
    count: "Jenel v3 · item 6 of 11",
    question: "An exposure decreases by 2.5 units. Each one-unit increase is associated with +0.08 clock-years (95% CI +0.03 to +0.13). What is the implied clock change?",
    options: [
      "−0.20 years (about −73 days), with an interval of −0.325 to −0.075 years",
      "+0.20 years (about +73 days), with an interval of +0.075 to +0.325 years",
      "−0.032 years because the confidence limits should be averaged first",
      "Exactly −0.20 biological years of rejuvenation, proving clinical benefit",
    ],
    answer: 0,
    explanation: "Multiplying −2.5 by +0.08 gives −0.20 clock-years, or about −73 days. Multiplication by a negative reverses the confidence-interval endpoints, producing −0.325 to −0.075 years. This remains a model-based association, not proof of causality or rejuvenation.",
    contract: [
      ["Required reasoning claims", "6"],
      ["Explicit failure checks", "4"],
      ["Source context", "Synthetic"],
    ],
  },
  {
    category: "Premise challenge",
    count: "Jenel v3 · item 10 of 11",
    question: "Why does global hypermethylation of the mammalian genome accelerate rapidly after age 65?",
    options: [
      "A universal methylation switch activates at age 65 in all mammalian tissues",
      "DNMT activity doubles at 65, producing uniform hypermethylation",
      "The pattern is established, but only in blood-derived clocks",
      "The premise is unsupported: aging often combines broad hypomethylation with focal hypermethylation, without a universal age-65 threshold",
    ],
    answer: 3,
    explanation: "The question embeds a false universal premise. Aging patterns depend on tissue, cell composition, species, assay coverage, and study design; broad hypomethylation can coexist with focal hypermethylation. A mechanism cannot be inferred until the claimed trajectory is actually established.",
    contract: [
      ["Required reasoning claims", "3"],
      ["Explicit failure checks", "3"],
      ["Linked sources", "2"],
    ],
  },
];

const recipes = {
  base: {
    label: "Base",
    score: 55.8,
    delta: "Reference point",
    deltaClass: "neutral",
    description: "The pretrained Qwen3-1.7B model, evaluated without fine-tuning or thinking mode. This is the anchor for measuring every recipe effect.",
    sequence: ["Qwen3-1.7B", "No fine-tuning", "55.8%"],
  },
  qa: {
    label: "QA-only",
    score: 67.3,
    delta: "+11.5 pts vs. base",
    deltaClass: "positive",
    description: "Training directly on 1,600 multiple-choice QA pairs improved both domain familiarity and alignment with the evaluation format.",
    sequence: ["Base Qwen3-1.7B", "1,600 QA pairs", "67.3%"],
  },
  mixed: {
    label: "QA + summaries",
    score: 48.0,
    delta: "−7.8 pts vs. base",
    deltaClass: "negative",
    description: "Mixing free-form summaries and multiple-choice QA in one stage hurt performance. The report interprets this as task-format interference amplified by the summary corpus’s larger token count.",
    sequence: ["Base Qwen3-1.7B", "Mixed formats", "48.0%"],
  },
  twoStage: {
    label: "Two-stage",
    score: 74.3,
    delta: "+18.5 pts vs. base",
    deltaClass: "positive",
    description: "Stage 1 mixed summaries with QA; stage 2 returned to QA-only training. The report’s interpretation is that the second stage restored answer-format alignment while retaining useful domain exposure.",
    sequence: ["Base Qwen3-1.7B", "QA + summaries", "QA realignment"],
  },
};

let questionIndex = 0;
let score = 0;
let answered = 0;
let locked = false;

const els = {
  progressLabel: document.querySelector("#progress-label"),
  scoreLabel: document.querySelector("#score-label"),
  progressBar: document.querySelector("#progress-bar"),
  category: document.querySelector("#question-category"),
  count: document.querySelector("#question-count"),
  question: document.querySelector("#question-text"),
  answers: document.querySelector("#answer-list"),
  next: document.querySelector("#next-question"),
  restart: document.querySelector("#restart-quiz"),
  waiting: document.querySelector("#waiting-state"),
  reveal: document.querySelector("#answer-reveal"),
  complete: document.querySelector("#quiz-complete"),
  status: document.querySelector("#answer-status"),
  correct: document.querySelector("#correct-answer"),
  explanation: document.querySelector("#answer-explanation"),
  bars: document.querySelector("#performance-bars"),
  finalScore: document.querySelector("#final-score"),
  finalHeading: document.querySelector("#final-heading"),
  replay: document.querySelector("#replay-quiz"),
};

function renderQuestion() {
  const item = questions[questionIndex];
  locked = false;
  els.progressLabel.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
  els.scoreLabel.textContent = `Score · ${score}/${answered}`;
  els.progressBar.style.width = `${(questionIndex / questions.length) * 100}%`;
  els.category.textContent = item.category;
  els.count.textContent = item.count;
  els.question.textContent = item.question;
  els.answers.innerHTML = item.options
    .map((option, index) => `<button type="button" data-answer="${index}"><span>${String.fromCharCode(65 + index)}</span><b>${option}</b></button>`)
    .join("");
  els.waiting.hidden = false;
  els.reveal.hidden = true;
  els.complete.hidden = true;
  els.next.hidden = true;
  els.next.innerHTML = questionIndex === questions.length - 1 ? "See your result <span>→</span>" : "Next reasoning trap <span>→</span>";
}

function answerQuestion(choice) {
  if (locked) return;
  locked = true;
  const item = questions[questionIndex];
  const isCorrect = choice === item.answer;
  answered += 1;
  if (isCorrect) score += 1;
  els.scoreLabel.textContent = `Score · ${score}/${answered}`;
  els.progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;

  [...els.answers.querySelectorAll("button")].forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === choice && !isCorrect) button.classList.add("incorrect");
  });

  els.waiting.hidden = true;
  els.reveal.hidden = false;
  els.status.textContent = isCorrect ? "Correct" : "Not quite";
  els.status.className = `result-kicker ${isCorrect ? "correct-status" : "incorrect-status"}`;
  els.correct.textContent = `${String.fromCharCode(65 + item.answer)} · ${item.options[item.answer]}`;
  els.explanation.textContent = item.explanation;
  els.bars.innerHTML = item.contract
    .map(([name, value]) => `<div class="performance-row"><p><span>${name}</span><b>${value}</b></p></div>`)
    .join("");
  els.next.hidden = false;
}

function showComplete() {
  els.waiting.hidden = true;
  els.reveal.hidden = true;
  els.complete.hidden = false;
  els.next.hidden = true;
  els.finalScore.textContent = `${score} / ${questions.length}`;
  els.finalHeading.textContent = score === 4 ? "A perfect miniature run." : score >= 2 ? "You found the shape of the benchmark." : "The categories expose different kinds of difficulty.";
}

function resetQuiz() {
  questionIndex = 0;
  score = 0;
  answered = 0;
  renderQuestion();
}

els.answers.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (button) answerQuestion(Number(button.dataset.answer));
});

els.next.addEventListener("click", () => {
  if (questionIndex === questions.length - 1) showComplete();
  else {
    questionIndex += 1;
    renderQuestion();
  }
});

els.restart.addEventListener("click", resetQuiz);
els.replay.addEventListener("click", resetQuiz);

document.querySelector(".recipe-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-recipe]");
  if (!button) return;
  const recipe = recipes[button.dataset.recipe];
  document.querySelectorAll("[data-recipe]").forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#recipe-label").textContent = recipe.label;
  document.querySelector("#recipe-score").textContent = `${recipe.score.toFixed(1)}%`;
  const delta = document.querySelector("#recipe-delta");
  delta.textContent = recipe.delta;
  delta.className = `delta ${recipe.deltaClass}`;
  document.querySelector("#recipe-meter").style.setProperty("--recipe-score", `${recipe.score}%`);
  document.querySelector("#recipe-description").textContent = recipe.description;
  document.querySelector("#recipe-sequence").innerHTML = `<span>${recipe.sequence[0]}</span><i>→</i><span>${recipe.sequence[1]}</span><i>→</i><strong>${recipe.sequence[2]}</strong>`;
});

renderQuestion();
