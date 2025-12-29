---
layout: page
title: Snow Leopard Individual Identification
description: Embedding-based image retrieval to support human-in-the-loop snow leopard re-identification from camera-trap images.
img: assets/img/snow.jpg
importance: 2
category: ML
tags: [Machine learning, Computer vision, Model evaluation]
---

# Snow Leopard Individual Identification Using Computer Vision

## Overview
Snow leopards are among the most elusive and endangered big cats. Conservation teams often rely on camera-trap images to monitor individuals over time, but manual matching across large galleries is slow and difficult.  

This project builds a computer vision system that returns a ranked shortlist of candidate matches for **human verification**.

## Problem Statement
A core conservation workflow is answering: “Is this the same individual we’ve seen before?”
Automated individual identification can reduce manual effort, improve consistency, and support downstream ecological analyses (e.g., encounter histories, movement patterns, population estimation).

## Approach
### 1) Retrieval-based re-identification (Re-ID)
Instead of directly predicting an ID, SpotID learns an embedding space where images of the same individual are close together.  
Given a query camera-trap image, the system retrieves a ranked **Top-K** list from a gallery using similarity in embedding space. A reviewer confirms the match (“same individual” / “no match”).

### 2) Preprocessing (optional depending on use case)
- Bounding-box cropping (focus on the animal)
- Background suppression / masking (reduce clutter)
- Standard normalization + augmentations for robustness

### 3) Model & training
- Backbone: EfficientNetV2 (via `timm`)
- Objective: metric-learning with CosFace (margin-based loss on normalized embeddings)
- Output: L2-normalized embeddings used for cosine-similarity retrieval

## Dataset (current)
- 132 labeled images
- 9 individuals
- Small-data regime; evaluation uses identity-separated splits to avoid train/test identity leakage.

## Evaluation
Primary metrics are retrieval-style (re-ID):
- Top-K match rate: whether a correct match appears within the Top-K retrieved results

## Results & Impact
- Built a working human-in-the-loop tool that surfaces Top-3 candidate matches per query, narrowing manual search from the full gallery to a short ranked list.
- Improved annotation workflow efficiency by reducing search and review effort (final identification remains human-confirmed).

## Data sensitivity & release policy
> **Code, data, and exact location metadata are not publicly released** to protect conservation partners and reduce the risk of exposing sensitive snow leopard habitat information.  
> If you are a conservation practitioner or researcher and would like to discuss collaboration, access may be possible under appropriate agreements and safeguards.

## Tech Stack
- **ML:** Python, PyTorch, `timm`
- **Data processing:** OpenCV, NumPy
- **Evaluation & visualization:** scikit-learn, matplotlib
- **Tooling:** Git/GitHub (local UI/tooling for reviewer workflow)

## Future Work
A next step I've been excited about and experimenting is to use human confirmations to continuously improve retrieval quality, without removing the human decision from the loop. Each reviewer interaction can be treated as high-value supervision: a confirmed match becomes a positive pair, and rejected near-misses become “hard negatives.” By logging these actions, you can periodically fine-tune the embedding model with metric-learning objectives (contrastive, triplet, or CosFace), which is especially effective in a small-data regime where every verified example carries a lot of signal.

To make reviewer time go further, you can add an active learning layer that prioritizes the most informative cases for human review. In practice, this means surfacing queries where the model is uncertain—when the similarity gap between the top candidates is small, when overall similarity scores are low, or when retrieval results are inconsistent under simple augmentations. Focusing verification on these hard cases can improve the model faster than labeling easy, obvious matches.

We could also apply an RL component in the interface and decision layer. A lightweight contextual bandit can learn policies for choices like whether to show Top-3 versus Top-10, when to trigger a “no match” option based on thresholds, or how to triage which queries should be reviewed first. For the reward signal, successful matches confirmed within the presented shortlist—balanced against the cost of reviewer effort. This can reduce manual workload while keeping the system conservative and human-confirmed.

As the system grows, it’s also important to strengthen generalization and robustness evaluation. That can include designing harder test splits (new camera sites or seasons, if metadata allows) and running systematic error analysis on known failure modes like night/IR imagery, occlusions, partial views, and extreme pose changes. These analyses not only guide the next modeling improvements, but also help set appropriate expectations for field deployment.

Finally, interpretability. It would be helpful to show the nearest-neighbor evidence, highlighting why certain candidates are similar, or providing confidence/uncertainty cues, to help reviewers make quicker, more reliable decisions and reduces the risk of erroneous automatic merges.
