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
   git clone https://github.com/ruiyanh/commercial-cooling-emissions.git
   ```

2. **Install dependencies**

   Install the necessary Python packages:

   ```bash
   pip install pandas matplotlib seaborn scipy
   ```

3. **Data Setup**

   The model requires building-specific data (e.g., energy usage, refrigerant type, cooling demand) in a structured format. Input this data into the `data/input_data.csv` file.

4. **Run the Analysis**

   Execute the Python script to calculate emissions and generate the abatement cost curve:

   ```bash
   python run_analysis.py
   ```
   
5. **View Results**

   The results will be saved as a .csv report and visualized as a graph (abatement_cost_curve.png).

## Key Insights

### 1. Cooling Emissions Insights

The model reveals that energy consumption is the dominant source of emissions for commercial buildings, with certain regions (like the **East South Central**) exhibiting particularly high emissions due to the grid's reliance on coal. However, refrigerant leakage still contributes significantly, especially when legacy refrigerants are in use.

### 2. Cost-Effective Abatement Measures

The Abatement Cost Curve highlights the most cost-effective solutions:

- **Energy Efficiency**: Measures like upgrading HVAC systems and optimizing cooling setpoints offer high emissions reductions at relatively low cost.
- **Refrigerant Management**: Switching to low-GWP refrigerants and improving leak detection and repair practices can yield significant reductions, with a moderate upfront cost.
- **Alternative Technologies**: While technologies like district cooling and green roofs offer substantial long-term reductions, they tend to have higher initial costs, making them less attractive for short-term cost savings.

### 3. Prioritization of Measures

The ACC helps prioritize measures based on cost-effectiveness and the feasibility of implementation. For example:

- Low-cost measures, such as increasing operational efficiency and minor system optimizations, should be prioritized in the short term.
- Higher-cost measures, such as new cooling systems and advanced refrigerant management, should be considered for long-term investments or where significant emissions reductions are required.

## Future Work

- **Integration with Real-Time Data**: Incorporating real-time energy consumption data for more dynamic and accurate modeling.
- **Global Expansion**: Extending the model to account for cooling emissions in other regions, particularly emerging economies in Asia and Africa.
- **Machine Learning Models**: Exploring machine learning techniques to predict future cooling emissions based on trends in energy use, building construction, and policy changes.
