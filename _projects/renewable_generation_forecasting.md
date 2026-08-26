---
layout: page
published: false
title: Renewable Generation Forecasting
description: Point and probabilistic forecasts for Germany’s hourly electricity load with optional renewables and weather predictors.
img: assets/img/renewable.jpg
importance: 4
category: ML
tags: [Machine learning, Energy, Time-series forecasting, Model evaluation]
github: https://github.com/RuiyanH/Renewable-Generation-Forecasting
---

## Overview
High-renewables power systems require not only accurate point forecasts of demand and generation, but also well-calibrated uncertainty estimates, especially around rare but critical events. This project aims to build **point and probabilistic forecasts** for Germany’s hourly **electricity load** and **solar/wind generation** using open grid and weather data. 

I compare **linear models**, **tree-based methods**, and **neural networks**, then wrap them in quantile and conformal prediction frameworks to produce full predictive distributions. I evaluate models by accuracy and calibration, especially on extreme events like peak load days and low-renewable periods, to show how probabilistic forecasts can better support dispatch, storage, and investment decisions in high-renewables grids.

## Project writeup

### What I built
I developed a reproducible pipeline for Germany’s hourly electricity load forecasting
that produces both point estimates and calibrated predictive intervals at short
(1-hour-ahead) and day-ahead (24-hour-ahead) horizons. The work emphasizes practical
feature engineering, strong baselines, and uncertainty quantification via quantile
regression and conformal prediction.

### Data and setup
- Data: Open Power System Data (hourly), columns mapped to load, solar, wind.
- Splits:
  - Chronological 60/20/20 (train/calibration/test) for probabilistic models
  - 80/20 for point-only experiments
- Environment: documented conda env + Jupyter kernel steps; optional
  `%pip install -r ../requirements.txt` cell.

### Feature engineering
- Time features: hour, day-of-week, month, weekend/holiday flags.
- History: lags (1, 2, 24, 168) for load/solar/wind.
- Rolling stats: non‑leaky 24h/168h means/stds for load; 24h means/stds for solar/wind.
- Supervised framing: aligns features at time t with target at t+h.

### Models
- Baselines: persistence (t−1), same‑hour‑last‑week (t−168).
- Point ML: Gradient Boosted Regressor (and a small suite in the point‑models notebook).
- Probabilistic:
  - Quantile regression (GBR with quantile loss; e.g., q ∈ {0.1, 0.5, 0.9}).
  - Conformal prediction (calibration residuals on a held‑out set; 90% target coverage).

### Evaluation
- Point: MAE, RMSE relative to persistence and weekly baselines.
- Intervals: empirical coverage, average width (sharpness), quantile calibration curves.
- Loss: pinball loss at q ∈ {0.1, 0.5, 0.9} and a CRPS‑style average pinball over a
  quantile grid.
- Diagnostics: hour‑of‑day coverage/width, extreme‑load slice (top X% hours),
  peak‑load week plots.

### Results achieved
1‑hour‑ahead (point):
- vs. persistence: RMSE reduced by ~64%, MAE by ~63%
  (e.g., ~2.5 GW → ~0.9 GW RMSE; ~1.9 GW → ~0.7 GW MAE).
- Also outperforms same‑hour‑last‑week.

1‑hour‑ahead (probabilistic):
- Quantile (80%): empirical coverage close to nominal (~80%) with relatively narrow widths;
  calibration curve close to 45°.
- Conformal (90%): coverage near target (≈90%) with somewhat wider intervals; more
  conservative around peaks.

24‑hour‑ahead:
- Absolute errors and widths increase (harder horizon), but conformal maintains
  target‑level coverage better than direct quantiles.
- Gradient boosting still meaningfully improves on day‑ahead persistence and weekly
  heuristics.

Stress tests (1h):
- Extreme‑load slice (top X% hours): quantile intervals tend to under‑cover more;
  conformal holds coverage better (with wider bands).
- Peak‑load week plots: both methods track daily shapes; conformal bands expand
  more around sharp peaks, reducing under‑coverage risk.

Hour‑of‑day diagnostics (1h):
- Coverage dips are most pronounced around morning/evening ramps; midday and night
  generally more stable.
- Normalized widths highlight where bands are over‑ or under‑conservative relative
  to median load.

### Improvements made during the project
- Added pinball loss reporting and a CRPS‑style average pinball metric.
- Extended probabilistic evaluation to 24‑hour‑ahead (quantile and conformal) with
  side‑by‑side summaries.
- Implemented stress tests: extreme‑load slice and peak‑load week visualization.
- Added hour‑of‑day coverage and normalized width diagnostics.
- Inserted quantile monotonicity checks and basic range sanity checks.
- Saved figures (sample‑week quantile and conformal bands) and exported results to CSV.
- Wrote narrative markdown before/after key cells and a textual summary generator.
- Documented environment creation and Jupyter kernel setup in README.

### Limitations
- Weather features (e.g., temperature) not included in current runs; likely to
  improve day‑ahead skill and interval sharpness.
- Quantile monotonicity can be violated with independently trained quantile
  models (rare but possible).
- Hyperparameters are reasonable defaults; limited tuning performed.
- Calibration at extremes is improved by conformal but could be further optimized
  (e.g., adaptive/residual‑conditional methods).

### Recommended next steps
- Incorporate temperature and other meteorological predictors; evaluate gains,
  especially at 24h.
- Try gradient boosting libraries optimized for tabular data (XGBoost/LightGBM/CatBoost)
  and tune hyperparameters.
- Enforce monotone quantiles (e.g., isotonic post‑processing or joint quantile models).
- Explore conformalized quantile regression (CQR) for adaptive, quantile‑based bands
  with coverage guarantees.
- Add seasonal/hour‑of‑day reliability curves and stratified CRPS to probe
  calibration by regime.
- Evaluate additional nominal levels (e.g., 50%, 95%) and report full calibration curves.
- Consider adding renewables forecasting or net‑load as targets for a fuller system view.

## Links

- Code: https://github.com/RuiyanH/Renewable-Generation-Forecasting


