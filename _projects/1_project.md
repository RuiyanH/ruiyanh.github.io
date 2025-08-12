---
layout: page
title: Commercial Cooling Emissions Model & Abatement Cost Curve
description: 
img: assets/img/12.jpg
importance: 1
category: model
related_publications: true
---

## Overview

The **Commercial Cooling Emissions Model** is a data-driven tool developed to assess the environmental impact of cooling systems in commercial real estate. It focuses on Scope 1 and Scope 2 emissions, with particular attention to refrigerant leakage and energy consumption. As the demand for cooling continues to rise, especially in countries like the U.S. and China, this model helps estimate emissions and identify opportunities for reducing them.

The **Abatement Cost Curve (ACC)**, based on McKinsey’s framework, was used to identify and prioritize the most cost-effective solutions for reducing emissions from commercial cooling systems. The ACC enables businesses and policymakers to make data-backed decisions on which abatement measures offer the greatest return on investment.

### Key Features:
- **Modeling Cooling Emissions**: Assessment of emissions from both refrigerants and electricity usage.
- **Abatement Measures**: Evaluation of mitigation strategies such as energy efficiency improvements, refrigerant management, and HVAC system optimization.
- **Cost-Effectiveness Analysis**: Use of the McKinsey Accumulated Abatement Cost Curve to evaluate the impact and costs of various cooling-related abatement measures.

## Problem Statement

The commercial real estate sector, particularly in regions with rising temperatures, is responsible for a significant portion of global cooling emissions. Traditional HVAC systems are often inefficient, contributing to both high refrigerant leakage and excessive energy consumption.

While many solutions exist to address these issues, the challenge lies in determining which measures provide the most effective and cost-efficient reductions. The **Commercial Cooling Emissions Model** seeks to bridge this gap by modeling emissions and applying the **Abatement Cost Curve** to identify practical and profitable mitigation opportunities.

## Tech Stack

- **Python**: For modeling and data analysis.
- **Pandas**: For data manipulation and analysis.
- **Matplotlib/Seaborn**: For data visualization and generating reports.
- **McKinsey Abatement Cost Curve**: Framework used to identify and evaluate abatement solutions.

## Methodology

### 1. **Cooling Emissions Model**

The model focuses on estimating the emissions from **commercial cooling systems**, breaking down the contributions from **refrigerant leakage** (Scope 1) and **electricity consumption** (Scope 2). 

Key assumptions and inputs include:
- **Energy Consumption**: Cooling demand (kWh) based on building size, location, and operational conditions.
- **Refrigerant Leakage**: Estimated loss rates for different types of refrigerants and the corresponding GWP (Global Warming Potential).
- **Geographic Variability**: Different emissions intensities based on region-specific energy grids (e.g., New England vs. West South Central).

### 2. **Abatement Cost Curve**

Using McKinsey’s **Abatement Cost Curve**, a visualization was created that ranks the most impactful and cost-effective abatement measures for reducing cooling emissions. The curve categorizes solutions based on their **cost per ton of CO₂ equivalent (CO₂e)** and the **potential emissions reductions** they can achieve.

Key abatement measures analyzed include:
- **Refrigerant Management**: Measures such as reducing leak rates, switching to low-GWP refrigerants, and improving maintenance practices.
- **Energy Efficiency Improvements**: Upgrading HVAC systems, improving building insulation, and optimizing cooling setpoints.
- **Alternative Technologies**: The potential of technologies like **cooling towers**, **district cooling**, and **green roofs**.

## Installation

To replicate or modify the model, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/commercial-cooling-emissions.git
