---
layout: page
title: Snow Leopard Individual Identification
description: Snow Leopard Individual Identification Using Computer Vision and Machine Learning
img: assets/img/3.jpg
importance: 2
category: work
giscus_comments: true
---

## Overview

Snow leopards are one of the most elusive and endangered big cats in the world. Traditional methods for monitoring their populations, such as tagging or manual image annotation, are labor-intensive and often intrusive. This project aims to apply cutting-edge computer vision and machine learning techniques to automatically identify individual snow leopards from camera trap images, enabling more effective and non-invasive wildlife monitoring.

## Problem Statement

Effective conservation of snow leopards requires accurate tracking of individual animals over time and across locations. However, their secretive behavior and rugged habitat make population monitoring challenging. Automated individual identification from photos can significantly reduce manual effort and improve the accuracy of population estimates.

## Approach

- **Data Collection**: Curated a dataset of snow leopard images captured via camera traps in various natural habitats.
- **Image Preprocessing**: Applied image enhancement and normalization techniques using OpenCV to improve feature extraction.
- **Model Architecture**: Developed a convolutional neural network (CNN) combined with a Siamese network framework to learn discriminative features that distinguish individual animals.
- **Training & Validation**: Used metric learning approaches to train the model on labeled pairs of images (same vs different individuals), enabling the system to identify new individuals accurately.
- **Evaluation**: Measured model performance using precision, recall, and accuracy on a held-out test set.

## Tech Stack

- **Languages & Frameworks**: Python, TensorFlow, PyTorch
- **Libraries**: OpenCV, Scikit-learn, NumPy, Matplotlib
- **Environment**: Jupyter Notebooks for experimentation and visualization
- **Data**: Camera trap image datasets sourced from conservation partners and open repositories

## Results & Impact

- Achieved over **92% accuracy** in correctly identifying individual snow leopards.
- Significantly reduced manual annotation time for conservation teams.
- Provided a scalable, automated pipeline to support ongoing snow leopard monitoring and conservation efforts.

## Future Work

- Expand the dataset with additional images from diverse geographic regions.
- Integrate the model into a real-time camera trap system for instant identification.
- Develop explainability features to visualize what the model “sees” for each identification, increasing trust for field researchers.
- Explore transfer learning for related species identification tasks.

