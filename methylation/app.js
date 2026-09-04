const openEndedQuestions = [
  {
    category: "Clock interpretation",
    question: "A participant's DunedinPACE decreases from 0.95 to 0.72 six months after beginning an intervention. The investigator concludes that the participant reversed 0.23 years of biological age. Evaluate this interpretation and state what can and cannot be concluded from the two measurements.",
    referenceAnswer: "The interpretation confuses a pace measure with accumulated biological age. A decrease from 0.95 to 0.72 is a 0.23-unit decrease in the estimated pace metric, not evidence that 0.23 biological years were reversed. The lower follow-up value is consistent with a slower estimated pace relative to the scale centered near 1, but two measurements do not establish durable change or intervention causality. Interpretation should consider assay and within-person variability, uncertainty, repeat measurements, and a randomized or otherwise credible comparison group before attributing the difference to the intervention or inferring clinical benefit.",
    contract: [["Required reasoning claims", "6"], ["Explicit failure checks", "2"], ["Linked sources", "1"]],
  },
  {
    category: "Construct validity",
    question: "In a cohort aged 45-70, DNAm PhenoAge correlates with chronological age at r = 0.91, but its predictions occupy only a 48-57-year range and PhenoAge acceleration is unrelated to morbidity during follow-up. The analyst concludes that the clock is a valid surrogate endpoint for a longevity clinical trial because the age correlation is high. Evaluate that conclusion and prioritize the next checks.",
    referenceAnswer: "A high chronological-age correlation does not establish that DNAm PhenoAge is a valid surrogate endpoint for a longevity trial. Surrogate validity requires evidence that the marker tracks the clinical outcome of interest, which is absent here and is in fact contradicted by the null morbidity association, though that null must itself be read in light of power, follow-up, and confounding. DNAm PhenoAge was developed to capture phenotypic-health and mortality-related information beyond chronological-age tracking, so age correlation is the wrong evidence for the claim. The compressed 48-57 prediction range additionally suggests poor calibration, restricted dynamic range, implementation error, missing-probe handling, preprocessing deviation, or population mismatch. The next checks should verify inputs, probe coverage, preprocessing and implementation, inspect calibration error across age, and only then test prespecified health outcomes with appropriate uncertainty and confounder control.",
    contract: [["Required reasoning claims", "6"], ["Explicit failure checks", "3"], ["Linked sources", "2"]],
  },
  {
    category: "Biological vs. statistical confounding",
    question: "Whole-blood samples collected before and 24 hours after high-dose corticosteroid treatment show thousands of differentially methylated sites. The largest shifts coincide with increased neutrophil counts and reduced lymphocyte counts. The authors describe the result as rapid genome-wide epigenetic reprogramming. Does the evidence establish that description? What explanations are consistent with the findings, and what analyses, in combination, would most directly distinguish them?",
    referenceAnswer: "The bulk signal is consistent with altered leukocyte composition because neutrophils and lymphocytes have different methylation profiles and corticosteroids redistribute these populations. It could also contain genuine cell-type-specific methylation responses or activation-state changes, so composition and within-cell remodeling are not mutually exclusive. The most direct distinction would combine measured cell counts or methylation deconvolution with paired cell-type-aware models and validation in sorted cells, ideally at matched time points. A bulk before-after association alone does not establish uniform genome-wide reprogramming or a direct causal mechanism.",
    contract: [["Required reasoning claims", "7"], ["Explicit failure checks", "3"], ["Linked sources", "1"]],
  },
  {
    category: "Uncertainty calibration",
    question: "An observational study finds lower epigenetic age acceleration among B12 supplement users, who also have higher folate, healthier diets, and less B12 deficiency. A small folic-acid-plus-B12 analysis found a lower Horvath estimate only in women with MTHFR 677CC. The authors infer that B12 slows epigenetic aging in healthy adults. Evaluate the evidence and propose a causal test.",
    referenceAnswer: "The study supports an association between supplement use and the measured clock outcome, not a causal anti-aging effect of B12. Confounding by diet, folate, health behavior, indication, and baseline B12 status could explain the result, and correcting deficiency is not equivalent to benefiting already replete adults. One-carbon metabolism supplies a plausible mechanism but not proof. A stronger test would randomize B12, or use a factorial design if folate is also manipulated, in a clearly defined population with baseline B12 status, prespecified clock and tissue outcomes, repeated measurements, adherence checks, and adequate follow-up. Existing narrow folate-plus-B12 findings should not be generalized to B12 alone in healthy replete adults.",
    contract: [["Required reasoning claims", "7"], ["Explicit failure checks", "3"], ["Linked sources", "2"]],
  },
  {
    category: "Specialized clock interpretation",
    question: "Horvath's 2013 multi-tissue clock and IntrinClock are both applied to blood samples. What is the main design difference between them, and how should that difference change how you interpret a group difference in clock output when immune-cell proportions differ between the groups? What would agreement or divergence between the two clocks not establish on its own?",
    referenceAnswer: "Horvath's 2013 clock is a multi-tissue chronological-age predictor trained to track calendar age across tissues; it was not designed to be insensitive to blood cell-composition differences. IntrinClock was developed specifically to reduce sensitivity to variation among immune-cell types so that its output reflects cell-intrinsic age-associated methylation rather than shifts in the cell mixture. When immune-cell proportions differ between groups, a group difference on a conventional blood clock may therefore partly or wholly reflect composition rather than cell-intrinsic aging, and a smaller or absent difference on IntrinClock is consistent with a composition-driven signal. Neither agreement nor divergence between the two clocks establishes causality or clinical meaning on its own.",
    contract: [["Required reasoning claims", "4"], ["Explicit failure checks", "3"], ["Linked sources", "2"]],
  },
  {
    category: "Quantitative conversion",
    question: "A condition decreases an exposure by 2.5 units. Each one-unit increase in that exposure is associated with +0.08 clock-years, with a 95% confidence interval of +0.03 to +0.13. Assuming the exposure change is fixed, calculate the condition-associated clock change in years and days, including direction and interval. State one interpretation the calculation does not justify.",
    referenceAnswer: "Multiplying the -2.5-unit exposure change by the +0.08 clock-year-per-unit slope gives -0.20 clock-years. Multiplying by 365.25 gives about -73 days. Because multiplication by a negative value reverses the confidence-interval endpoints, the interval is -0.325 to -0.075 clock-years, or approximately -119 to -27 days when reported from lower to upper bound. The calculation describes a model-based association under the stated fixed-exposure assumption; it does not establish causality, clinical benefit, or biological rejuvenation.",
    contract: [["Required reasoning claims", "6"], ["Explicit failure checks", "4"], ["Linked sources", "1"]],
  },
  {
    category: "Multi-clock interpretation",
    question: "A randomized intervention reports changes versus control of -1.4 years for Horvath, -0.2 for PhenoAge, +0.3 for GrimAge, and -0.01 for DunedinPACE. Twelve clocks were tested, none preregistered as primary, and confidence intervals are absent. The abstract claims slowed biological aging. Is that conclusion supported, and what should be done next?",
    referenceAnswer: "The reported pattern is insufficient for the broad claim. The clocks measure different constructs and use different units, the results are discordant, twelve outcomes create multiplicity and selective-reporting risk, and the missing confidence intervals prevent assessment of precision. Cohort size, p-values, and methodological detail are also unreported, so neither power nor analytic validity can be assessed. Randomization helps causal interpretation of prespecified treatment contrasts, but it does not make an unspecified favorable clock result a validated measure of slowed biological aging or clinical benefit. The study should report all estimates with uncertainty and multiplicity handling, justify or preregister a primary clock based on intended use, assess technical reliability and baseline balance, replicate the result, and relate biomarker changes to meaningful outcomes before making a broad aging claim.",
    contract: [["Required reasoning claims", "8"], ["Explicit failure checks", "3"], ["Linked sources", "2"]],
  },
  {
    category: "Pipeline troubleshooting",
    question: "A cohort aged 45-70 has DNAm ages of 30-50. Eighteen percent of required CpGs were mean-imputed, preprocessing differed from the reference implementation, and recruitment wave aligns with array batch. The team calls the cohort biologically young. Identify the primary validity problem, and lay out, in order, the diagnostic actions you would complete before any biological interpretation.",
    referenceAnswer: "The primary blocker is technical validity, not evidence that the cohort is biologically young. Missing and mean-imputed clock CpGs plus preprocessing that differs from the reference implementation should be resolved before interpreting the prediction range; recruitment-wave alignment with batch is a separate design and confounding problem that remains important after implementation is verified. First, verify probe identifiers, beta-value units, coefficients, intercept and any age transformation against the reference implementation while quantifying missing required probes. Second, rerun the clock with validated preprocessing and missing-probe handling, then inspect controls, batch structure and prediction error or calibration against chronological age. Biological interpretation should wait until the implementation reproduces expected behavior and technical validity, calibration, and batch sensitivity are established.",
    contract: [["Required reasoning claims", "8"], ["Explicit failure checks", "3"], ["Linked sources", "2"]],
  },
  {
    category: "Surrogate endpoint reasoning",
    question: "A small randomized trial reduces GrimAge by 1.2 years versus control, but functional and disease outcomes do not differ. No prior trial shows that treatment-induced GrimAge changes predict treatment effects on clinical outcomes. What does this result establish, and is GrimAge a validated surrogate endpoint here?",
    referenceAnswer: "If the analysis was prespecified and technically reliable, randomization supports the conclusion that the intervention changed the GrimAge biomarker in this trial. It does not by itself establish improved function, reduced disease, slower organismal aging, or clinical benefit. Prognostic association with future outcomes is not sufficient for surrogate validation; evidence is needed that treatment-induced biomarker changes reliably track treatment effects on meaningful outcomes across relevant trials or settings. The null clinical outcomes may reflect low power or short follow-up, but they provide no positive validation. Replication, reliability assessment, prespecification, and trial-level validation against clinical endpoints are required before treating GrimAge as a surrogate endpoint.",
    contract: [["Required reasoning claims", "7"], ["Explicit failure checks", "3"], ["Linked sources", "2"]],
  },
  {
    category: "Premise challenge",
    question: "Why does the global hypermethylation of the mammalian genome accelerate so rapidly after age 65?",
    referenceAnswer: "The premise is not established. Aging does not cause uniform global hypermethylation, nor is age 65 a universal mammalian threshold. Aging commonly involves global or repetitive-region hypomethylation alongside focal hypermethylation at particular loci. Apparent late-life acceleration can depend on tissue, cell composition, species, assay coverage, and sparse or cross-sectional sampling. A mechanism cannot be inferred until the methylation measure and age trajectory are clearly defined and validated longitudinally.",
    contract: [["Required reasoning claims", "3"], ["Explicit failure checks", "3"], ["Linked sources", "2"]],
  },
  {
    category: "Specialized clock interpretation",
    question: "A disease cohort appears older on a conventional blood epigenetic clock but not on IntrinClock after chronological-age adjustment; immune-cell proportions differ substantially between cases and controls. Interpret the divergence, state what it does and does not establish about (a) the role of immune-cell composition in the conventional-clock result and (b) IntrinClock's validity in this disease context, and name what further analysis you would prioritize.",
    referenceAnswer: "The divergence is consistent with the conventional clock difference being influenced by immune-cell composition, because IntrinClock was designed to reduce sensitivity to differences among immune-cell types. The null IntrinClock result weakens evidence for a cell-intrinsic aging difference as captured by that clock, but it does not prove that no cell-intrinsic aging biology exists. It also does not establish that composition fully explains the conventional-clock result, that IntrinClock is valid in this disease and tissue context, or that either clock is causal or clinically meaningful. Cell-count adjustment, sorted-cell analyses, power assessment, and replication are still needed.",
    contract: [["Required reasoning claims", "5"], ["Explicit failure checks", "2"], ["Linked sources", "1"]],
  },
];

const mcqQuestions = [
  {
    id: "hist03",
    category: "Historical context",
    question: "The shift from first-generation epigenetic clocks (trained on chronological age) to second-generation clocks (trained on mortality or composite biomarkers) was primarily motivated by the observation that:",
    options: [
      "Residuals from chronological age clocks predicted mortality independently suggesting biological age deviates meaningfully from calendar age",
      "Chronological age clocks used too many CpG sites for clinical feasibility",
      "First-generation clocks could not be applied to non-blood tissues",
      "Elastic net regularization was unavailable when first-generation clocks were developed",
    ],
    answer: 0,
    explanation: "Residual differences between predicted and chronological age carried mortality information. That motivated later clocks to optimize health- and mortality-related targets rather than chronological age alone.",
  },
  {
    id: "dataset05",
    category: "Dataset reasoning",
    question: "When combining methylation datasets from multiple GEO studies to train a clock, which issue is the most critical to address during preprocessing?",
    options: [
      "Incompatibility between Illumina BeadChip and Agilent array probe designs",
      "Differences in genome build annotation between studies",
      "Batch effects arising from different laboratories and array processing dates",
      "Variation in patient consent forms across institutions",
    ],
    answer: 2,
    explanation: "Laboratory and processing differences can create systematic methylation shifts that a model mistakes for biology. Cross-study batch structure therefore needs explicit diagnosis and control.",
  },
  {
    id: "clock03",
    category: "Clock training",
    question: "When training an epigenetic clock, leave-one-dataset-out cross-validation (across cohorts) is preferred over leave-one-sample-out cross-validation (within a single cohort) because it:",
    options: [
      "Avoids the need to tune the elastic net mixing parameter alpha",
      "Runs faster with fewer cross-validation folds",
      "Produces higher reported accuracy on the training data",
      "Better estimates generalization to new populations by testing on entirely unseen cohorts",
    ],
    answer: 3,
    explanation: "Holding out an entire cohort tests whether the clock transfers across study-specific populations and technical conditions. Sample-level splits within one cohort cannot measure that as directly.",
  },
  {
    id: "cutoff03",
    category: "Knowledge boundaries",
    question: "A model trained with a 2024 knowledge cutoff is asked about the performance of DunedinPACE in predicting Alzheimer's disease progression. The most responsible model behavior would be to:",
    options: [
      "Refuse to answer any question about DunedinPACE",
      "Hallucinate a specific hazard ratio from a fictitious 2025 trial",
      "State that it cannot verify post-cutoff clinical validation results and flag uncertainty about recent findings",
      "Provide a confident answer extrapolating from general aging clock literature",
    ],
    answer: 2,
    explanation: "The model can discuss knowledge available through its cutoff, but it should not invent or confidently extrapolate later clinical evidence. The responsible response makes the verification boundary explicit.",
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

let activeMode = "open";
let questionIndex = 0;
let reviewed = 0;
let score = 0;
let locked = false;

const els = {
  progressLabel: document.querySelector("#progress-label"),
  reviewedLabel: document.querySelector("#reviewed-label"),
  progressBar: document.querySelector("#progress-bar"),
  category: document.querySelector("#question-category"),
  count: document.querySelector("#question-count"),
  question: document.querySelector("#question-text"),
  provenance: document.querySelector("#question-provenance"),
  composer: document.querySelector("#response-composer"),
  response: document.querySelector("#visitor-answer"),
  review: document.querySelector("#review-answer"),
  responseHint: document.querySelector("#response-hint"),
  answerList: document.querySelector("#answer-list"),
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
  waitingCopy: document.querySelector("#waiting-copy"),
  performanceTitle: document.querySelector("#performance-title"),
  performanceSubtitle: document.querySelector("#performance-subtitle"),
  traceNote: document.querySelector("#trace-note"),
  finalCopy: document.querySelector("#final-copy"),
  eyebrow: document.querySelector("#evaluation-eyebrow"),
  heading: document.querySelector("#evaluation-heading"),
  intro: document.querySelector("#evaluation-intro"),
  footnote: document.querySelector("#quiz-footnote"),
};

function currentQuestions() {
  return activeMode === "open" ? openEndedQuestions : mcqQuestions;
}

function updateModeCopy() {
  const isOpen = activeMode === "open";
  els.eyebrow.innerHTML = isOpen
    ? "<span></span> The complete 11-item evaluation"
    : "<span></span> Four retained MCQ samples";
  els.heading.textContent = isOpen ? "How would you reason through it?" : "Can you spot the best answer?";
  els.intro.textContent = isOpen
    ? "Answer each original open-ended prompt in your own words, then compare your reasoning with the validated reference answer and scoring contract."
    : "Try one retained sample from each MCQ category. Choose an answer to reveal the original key and a concise explanation.";
  els.footnote.textContent = isOpen
    ? "All 11 prompts and reference answers come from the current validated evaluation artifact. This portfolio page does not automatically score free text, and it does not display untraceable per-question model answers."
    : "These four questions and answer keys are reproduced from the retained MCQ audit artifact, with a fixed shuffled answer order; the short explanations are editorial summaries. They are examples—not the complete 2,000-question test—and no per-question model responses are shown.";
}

function renderQuestion() {
  const questions = currentQuestions();
  const item = questions[questionIndex];
  const isOpen = activeMode === "open";
  locked = false;
  els.progressLabel.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
  els.reviewedLabel.textContent = isOpen ? `Reviewed · ${reviewed}/${questions.length}` : `Score · ${score}/${questions.length}`;
  els.progressBar.style.width = `${(questionIndex / questions.length) * 100}%`;
  els.category.textContent = item.category;
  els.count.textContent = isOpen
    ? `Open-ended evaluation · item ${questionIndex + 1} of ${questions.length}`
    : `MCQ sample · item ${questionIndex + 1} of ${questions.length}`;
  els.provenance.textContent = isOpen
    ? "Original prompt · current validated evaluation"
    : `Retained MCQ audit artifact · ${item.id}`;
  els.question.textContent = item.question;
  els.composer.hidden = !isOpen;
  els.answerList.hidden = isOpen;
  if (isOpen) {
    els.response.value = "";
    els.response.disabled = false;
    els.review.disabled = true;
    els.responseHint.textContent = "Write a response to unlock the evaluation guide.";
    els.answerList.innerHTML = "";
    els.waitingCopy.textContent = "Write your answer first. The reveal then shows the validated reference response and the structure used to evaluate a full chain of reasoning.";
  } else {
    els.answerList.innerHTML = item.options
      .map((option, index) => `<button type="button" data-answer="${index}"><span>${String.fromCharCode(65 + index)}</span><b>${option}</b></button>`)
      .join("");
    els.waitingCopy.textContent = "Choose one answer. The reveal will show the retained answer key and explain why it is the best-supported option.";
  }
  els.waiting.hidden = false;
  els.reveal.hidden = true;
  els.complete.hidden = true;
  els.next.hidden = true;
  els.next.innerHTML = questionIndex === questions.length - 1
    ? "Finish evaluation <span>→</span>"
    : isOpen ? "Next open-ended item <span>→</span>" : "Next MCQ <span>→</span>";
}

function reviewAnswer() {
  if (locked || !els.response.value.trim()) return;
  locked = true;
  const questions = currentQuestions();
  const item = questions[questionIndex];
  reviewed += 1;
  els.reviewedLabel.textContent = `Reviewed · ${reviewed}/${questions.length}`;
  els.progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  els.response.disabled = true;
  els.review.disabled = true;
  els.responseHint.textContent = "Your response stays in this browser and is not stored or automatically graded.";

  els.waiting.hidden = true;
  els.reveal.hidden = false;
  els.status.textContent = "Reference answer";
  els.status.className = "result-kicker correct-status";
  els.correct.textContent = "Compare the reasoning, not exact wording.";
  els.explanation.textContent = item.referenceAnswer;
  els.performanceTitle.textContent = "Open-ended item contract";
  els.performanceSubtitle.textContent = "Validated evaluation snapshot";
  els.bars.innerHTML = item.contract
    .map(([name, value]) => `<div class="performance-row"><p><span>${name}</span><b>${value}</b></p></div>`)
    .join("");
  els.traceNote.textContent = "This is a deterministic comparison, not automated grading. Your text is not stored or sent anywhere.";
  els.next.hidden = false;
}

function answerMcq(selected) {
  if (locked || activeMode !== "mcq") return;
  const questions = currentQuestions();
  const item = questions[questionIndex];
  const isCorrect = selected === item.answer;
  locked = true;
  reviewed += 1;
  if (isCorrect) score += 1;
  els.reviewedLabel.textContent = `Score · ${score}/${questions.length}`;
  els.progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  [...els.answerList.querySelectorAll("button")].forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("correct");
    if (index === selected && !isCorrect) button.classList.add("incorrect");
  });
  els.waiting.hidden = true;
  els.reveal.hidden = false;
  els.status.textContent = isCorrect ? "Correct" : "Not quite";
  els.status.className = `result-kicker ${isCorrect ? "correct-status" : "incorrect-status"}`;
  els.correct.textContent = `${String.fromCharCode(65 + item.answer)} · ${item.options[item.answer]}`;
  els.explanation.textContent = item.explanation;
  els.performanceTitle.textContent = "Question provenance";
  els.performanceSubtitle.textContent = "Retained study artifact";
  els.bars.innerHTML = [
    ["Artifact ID", item.id],
    ["Category", item.category],
    ["Answer key", String.fromCharCode(65 + item.answer)],
  ].map(([name, value]) => `<div class="performance-row"><p><span>${name}</span><b>${value}</b></p></div>`).join("");
  els.traceNote.textContent = "The answer key comes from the retained MCQ artifact. No per-question model answer is claimed or displayed.";
  els.next.hidden = false;
}

function showComplete() {
  const questions = currentQuestions();
  const isOpen = activeMode === "open";
  els.waiting.hidden = true;
  els.reveal.hidden = true;
  els.complete.hidden = false;
  els.next.hidden = true;
  els.finalScore.textContent = isOpen ? `${reviewed} / ${questions.length}` : `${score} / ${questions.length}`;
  els.finalHeading.textContent = isOpen ? "You completed the full open-ended evaluation." : "You completed the MCQ sample.";
  els.finalCopy.textContent = isOpen
    ? "You worked through all 11 original open-ended prompts. The reference answers expose the intended reasoning boundaries; they do not turn this into a model leaderboard or publication result."
    : "You worked through four retained examples—one from each MCQ category. This miniature score is for exploration and is not comparable with the reported 2,000-question model results.";
  els.replay.innerHTML = isOpen ? "Try all 11 again <span>↺</span>" : "Try the four MCQs again <span>↺</span>";
}

function resetQuiz() {
  questionIndex = 0;
  reviewed = 0;
  score = 0;
  renderQuestion();
}

els.response.addEventListener("input", () => {
  const hasResponse = Boolean(els.response.value.trim());
  els.review.disabled = !hasResponse;
  els.responseHint.textContent = hasResponse
    ? "When you are ready, compare your reasoning with the validated reference answer."
    : "Write a response to unlock the evaluation guide.";
});

els.review.addEventListener("click", reviewAnswer);
els.answerList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (button) answerMcq(Number(button.dataset.answer));
});

els.next.addEventListener("click", () => {
  const questions = currentQuestions();
  if (questionIndex === questions.length - 1) showComplete();
  else {
    questionIndex += 1;
    renderQuestion();
  }
});

els.restart.addEventListener("click", resetQuiz);
els.replay.addEventListener("click", resetQuiz);

document.querySelector(".mode-switch").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (!button || button.dataset.mode === activeMode) return;
  activeMode = button.dataset.mode;
  document.querySelectorAll("[data-mode]").forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  updateModeCopy();
  resetQuiz();
});

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

updateModeCopy();
renderQuestion();
