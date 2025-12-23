---
layout: page
title: Probabilistic Load & Renewable Generation Forecasting (Germany)
description: Point and probabilistic forecasts for Germany’s hourly electricity load with optional renewables and weather predictors.
img: assets/img/renewable.jpg
importance: 4
category: ML
tags: [Machine Learning, Energy, Time-series forcasting, Model evaluation]
github: https://github.com/RuiyanH/Renewable-Generation-Forecasting
---

## Overview
High-renewables power systems require not only accurate point forecasts of demand and generation, but also well-calibrated uncertainty estimates, especially around rare but critical events. This project aims to build **point and probabilistic forecasts** for Germany’s hourly **electricity load** and **solar/wind generation** using open grid and weather data. 

I compare **linear models**, **tree-based methods**, and **neural networks**, then wrap them in quantile and conformal prediction frameworks to produce full predictive distributions. I evaluate models by accuracy and calibration, especially on extreme events like peak load days and low-renewable periods, to show how probabilistic forecasts can better support dispatch, storage, and investment decisions in high-renewables grids.

## Methods (brief)

- Feature engineering: lagged/rolling load features (1/24/168h), calendar features, optional weather
- Point models: linear/ridge, random forest, gradient‑boosted trees
- Probabilistic forecasts:
  - Quantile regression (e.g., 10/50/90th percentiles)
  - Conformal prediction for distribution‑free intervals with target coverage
- Evaluation: MAE/RMSE; empirical coverage, interval width, pinball loss; typical vs. extreme days

## Data

- Region: Germany (hourly, 2020–2025)
- Sources: open grid and weather datasets (see repository README for instructions)

### Result Summaries
For 1-hour-ahead load forecasting, the gradient-boosted model reduces RMSE by approximately 64% and MAE by 63% relative to a persistence baseline, and also outperforms the same-hour-last-week heuristic. Direct quantile regression yields 80% prediction intervals whose empirical coverage is close to the nominal level (about 80%) with relatively narrow average widths, while conformal prediction achieves roughly (target-level) coverage for 90% intervals at the cost of somewhat wider bands.

## Links

- Code: https://github.com/RuiyanH/Renewable-Generation-Forecasting


