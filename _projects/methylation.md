---
layout: page
title: MethylLLM
description: Building reliable evaluation and training pipelines for scientific reasoning about DNA methylation — from a 2,000-question MCQ test to open-ended evaluation and RLAIF.
img: assets/img/methyl.png
importance: 1
category: ML
tags: [Machine learning, LLMs, Medical AI, Benchmarking, RLAIF, Scientific reasoning]
featured: true
demo_url: /methylation/
project_type: LLM Evaluation
project_group: technical
project_subcategory: ML Systems
result: "Validated an 11-item open-ended evaluation and implemented a hash-scoped RLAIF workflow."
---

## Overview

DNA methylation is a fast-moving area of biology — chemical marks on DNA that influence gene regulation, shift with age, and carry signals about disease risk. It is also a narrow scientific domain where fluent answers can still hide causal, statistical, or measurement errors.

**MethylLLM** began as my senior project on small-model specialization. I built a 2,000-question multiple-choice test, evaluated eight model configurations, and found that two-stage fine-tuning raised Qwen3-1.7B from 55.8% to 74.3%. That completed study remains useful evidence that training order and task alignment matter, but its QA-level test does not establish generalization to unseen papers.

The project has since become an evaluation-systems effort. The current **open-ended evaluation** contains 11 questions covering 11 reasoning constructs, with 67 required claims, 32 explicit failure checks, 33 calibration cases, and 14 linked sources. It tests whether a model can interpret epigenetic clocks, preserve units and uncertainty, separate bulk-tissue composition from within-cell change, challenge false premises, and keep biomarker movement distinct from causal or clinical benefit.

## Current status · September 2026

- **Open-ended evaluation packet:** passes the repository's full packet validator with no errors or warnings. Its first 55-answer exploratory run was used to diagnose the measurement system, not to publish a leaderboard; the packet and grading contract changed afterward.
- **Grader diagnostics:** repeated grading exposed instability and systematic threshold differences. One grader was retired, and expert labels are still required before making grader-accuracy or publication-quality model-ranking claims.
- **Open-ended RLAIF:** the hash-scoped workflow is implemented for source preparation, paper-disjoint packet generation, cached judging, reward resolution, contamination checks, RAFT dataset construction, training, and held-out evaluation. The focused suite currently has 28 passing tests, alongside 41 existing benchmark-control tests.
- **Execution boundary:** generated-packet, GPU, and paid-API runs are not yet complete. The source-preparation job is ready to build a balanced 100-paper corpus with 75/10/15 paper-disjoint train/dev/eval splits while excluding overlap with the held-out evaluation.
- **RAG:** designed as a separate six-cell open-book experiment. It remains a plan, not an implemented or scored result, and will not be mixed with the closed-book RLAIF numbers.

This progression changed the research question from “can a small model memorize specialized QA?” to “can we measure and train reliable scientific reasoning without hiding uncertainty, leakage, or judge failure?”

<a href="{{ '/methylation/' | relative_url }}"><strong>Try the complete open-ended reasoning demo →</strong></a>

<a href="{{ '/assets/pdf/Senior_project_report_final.pdf' | relative_url }}" target="_blank" rel="noopener">📄 Original study report (PDF)</a> &nbsp;·&nbsp; <a href="{{ '/assets/pdf/poster_final.pdf' | relative_url }}" target="_blank" rel="noopener">🖼️ Original poster (PDF)</a>
