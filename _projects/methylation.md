---
layout: page
title: MethylLLM
description: Fine-tuning small open-source LLMs to compete with frontier models on specialized scientific QA — a benchmark study on DNA methylation literature.
img: assets/img/placeholder.jpg
importance: 3
category: ML
tags: [Machine learning, LLMs, Medical AI, Benchmarking, Fine-tuning, NLP]
---

## Overview

DNA methylation is a fast-moving area of biology — chemical marks on DNA that act like switches for genes, shift with age, and carry signals about disease risk. But it's also a small slice of the biomedical literature that LLMs are trained on, which means even strong general-purpose models can be unreliable when researchers actually need them for this work.

**MethylLLM** is my senior project exploring whether a small open-source model can be fine-tuned to compete with frontier models on this domain. I built a 400-question benchmark from the methylation literature, tested eight model configurations, and found that a two-stage fine-tuned Qwen3-1.7B reached 74.3% accuracy — beating Qwen3-8B in thinking mode despite being roughly one-fifth the size, and closing most of the gap to Gemini 2.5 Flash (78.2%). The takeaway: for specialized scientific QA, how you fine-tune can matter more than model scale.

<a href="{{ '/assets/pdf/Senior_project_report_final.pdf' | relative_url }}" target="_blank" rel="noopener">📄 Full report (PDF)</a> &nbsp;·&nbsp; <a href="{{ '/assets/pdf/poster_final.pdf' | relative_url }}" target="_blank" rel="noopener">🖼️ Poster (PDF)</a>
