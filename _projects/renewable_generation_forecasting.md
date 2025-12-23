---
layout: page
title: Probabilistic Load & Renewable Generation Forecasting (Germany)
description: Point and probabilistic forecasts for Germany’s hourly electricity load with optional renewables and weather predictors.
img: assets/img/renewable.jpg
importance: 4
category: ML
tags: [Machine Learning, Clean Energy, Time-series Forcasting]
github: https://github.com/RuiyanH/Renewable-Generation-Forecasting
---

## Overview

This project builds point and probabilistic forecasts for Germany’s hourly electricity load, with optional renewables and weather predictors. It emphasizes practical, open‑data workflows and well‑calibrated uncertainty around rare but system‑critical events.

I compare linear models, tree‑based methods, and neural networks, then wrap them in quantile and conformal prediction frameworks to produce full predictive distributions. Models are evaluated by both accuracy and calibration, especially on extreme events like peak load days and low‑renewables periods—to better support dispatch, storage, and investment decisions in high‑renewables grids.

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

## Links

- Code: https://github.com/RuiyanH/Renewable-Generation-Forecasting


