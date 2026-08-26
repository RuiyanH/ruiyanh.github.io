---
layout: page
title: PROJECTS
permalink: /projects/
description: Selected ML, data, and software work across model evaluation, retrieval, forecasting, applied analytics, and product systems.
nav: true
nav_order: 2
horizontal: false
---

<style>
  .post .post-header {
    background-color: #3366cc;
    border-bottom: none;
    border-radius: 0;
    left: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-top: calc(-3rem);
    padding: 5.35rem 1.25rem 1.35rem;
    position: relative;
    right: 50%;
    width: 100vw;
  }
  .post .post-header .post-title,
  .post .post-header .post-description {
    color: #f5f5f5;
  }

  .projects {
    --project-accent: #3366cc;
  }
  .project-focus-strip {
    border-bottom: 1px solid var(--global-divider-color);
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin: 0 0 2rem;
    padding-bottom: 1rem;
  }
  .project-focus-item {
    border-left: 3px solid var(--project-accent);
    color: var(--global-text-color-light);
    font-size: 0.9rem;
    line-height: 1.45;
    margin: 0;
    padding-left: 0.85rem;
  }
  .project-focus-item strong {
    color: var(--global-text-color);
    display: block;
    font-size: 0.84rem;
    margin-bottom: 0.2rem;
    text-transform: uppercase;
  }
  .project-section {
    margin-top: 2.5rem;
  }
  .project-section:first-of-type {
    margin-top: 0;
  }
  .project-section-header {
    align-items: end;
    border-bottom: 1px solid var(--global-divider-color);
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 1.15rem;
    padding-bottom: 0.7rem;
  }
  .project-section-header h2 {
    font-size: 1.35rem;
    margin: 0;
  }
  .project-section-header p {
    color: var(--global-text-color-light);
    font-size: 0.94rem;
    margin: 0;
    max-width: 34rem;
  }
  .project-subsection {
    display: grid;
    gap: 1rem;
    grid-template-columns: 11rem minmax(0, 1fr);
    margin-top: 1.2rem;
  }
  .project-subsection h3 {
    color: var(--global-text-color);
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0;
    line-height: 1.3;
    margin: 0.35rem 0 0;
  }
  .projects .row {
    margin-left: -0.45rem;
    margin-right: -0.45rem;
  }
  .projects .row > [class*="col"] {
    margin-bottom: 0.9rem;
    padding-left: 0.45rem;
    padding-right: 0.45rem;
  }
  .projects a,
  .projects a:hover {
    color: inherit;
    text-decoration: none;
  }
  .projects .card {
    background:
      linear-gradient(180deg, rgba(51,102,204,0.055), rgba(51,102,204,0) 5rem),
      var(--global-card-bg-color, #fff);
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    box-shadow: none;
    height: 100%;
    overflow: hidden;
    position: relative;
    transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
  }
  .projects .card::before {
    background: var(--project-accent);
    content: "";
    height: 3px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  .projects .card:hover,
  .projects .card:focus-within {
    border-color: rgba(51,102,204,0.55);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
    transform: translateY(-2px);
  }
  .projects .card-body {
    display: flex;
    flex-direction: column;
    min-height: 17rem;
    padding: 1rem;
    text-align: left;
  }
  .projects .card .project-card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.7rem;
  }
  .projects .card .project-card-pill {
    align-items: center;
    background: rgba(51,102,204,0.1);
    border-radius: 999px;
    color: var(--global-theme-color);
    display: inline-flex;
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1;
    min-height: 1.35rem;
    padding: 0.15rem 0.48rem;
    text-transform: uppercase;
  }
  .projects .card .card-title {
    color: var(--global-text-color);
    font-size: 1.02rem;
    font-weight: 700;
    line-height: 1.35;
    margin: 0;
    text-align: left;
  }
  .projects .card .card-text {
    color: var(--global-text-color-light);
    font-size: 0.9rem;
    line-height: 1.52;
    margin: 0.55rem 0 0;
  }
  .projects .card .project-result {
    color: var(--global-text-color);
    font-weight: 650;
  }
  .projects .card .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-top: 0.85rem;
  }
  .tag-badge {
    background: rgba(15,23,42,0.045);
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: 999px;
    color: var(--global-text-color-light);
    display: inline-block;
    font-size: 0.7rem;
    line-height: 1;
    margin: 0;
    padding: 0.28rem 0.5rem;
    white-space: nowrap;
  }
  .projects .card .project-card-action {
    color: var(--global-theme-color);
    display: inline-block;
    font-size: 0.86rem;
    font-weight: 700;
    margin-top: auto;
    padding-top: 1rem;
  }
  .project-section-other .project-subsection {
    display: block;
  }
  .project-section-other .card {
    background: var(--global-card-bg-color, #fff);
  }
  .project-section-other .card::before {
    background: var(--global-divider-color);
  }
  .project-section-other .card .project-tags,
  .project-section-other .card .project-result {
    display: none;
  }
  .project-section-other .card-body {
    min-height: 11.5rem;
  }

  html[data-theme="dark"] .projects .card {
    background:
      linear-gradient(180deg, rgba(88,135,230,0.12), rgba(88,135,230,0) 5rem),
      var(--global-card-bg-color, #111827);
  }
  html[data-theme="dark"] .tag-badge {
    background: rgba(255,255,255,0.055);
    border-color: rgba(255,255,255,0.09);
  }

  @media (max-width: 900px) {
    .project-focus-strip,
    .project-subsection {
      grid-template-columns: 1fr;
    }
    .project-subsection h3 {
      margin-top: 0;
    }
    .project-section-header {
      align-items: start;
      display: block;
    }
    .project-section-header p {
      margin-top: 0.25rem;
    }
  }
  @media (max-width: 640px) {
    .post .post-header {
      padding-bottom: 1.35rem;
      padding-top: 5.2rem;
    }
    .project-focus-strip {
      margin-bottom: 1.6rem;
    }
    .projects .card-body {
      min-height: 0;
    }
  }
</style>

<div class="projects">
  <div class="project-focus-strip">
    <p class="project-focus-item"><strong>ML systems</strong>LLM evaluation, fine-tuning, retrieval, and metric learning.</p>
    <p class="project-focus-item"><strong>Applied data</strong>Forecasting, energy analytics, uncertainty, and scenario modeling.</p>
    <p class="project-focus-item"><strong>Product engineering</strong>React, Flask, APIs, databases, and reproducible workflows.</p>
  </div>

  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% assign technical_subcategories = "ML Systems|Forecasting & Energy Data|Full-Stack Systems" | split: "|" %}

  <section class="project-section">
    <div class="project-section-header">
      <h2>ML / Data / Software Projects</h2>
      <p>Technical work grouped by the capability each project best demonstrates.</p>
    </div>

    {% for subcategory in technical_subcategories %}
      {% capture subsection_cards %}
        {% for project in sorted_projects %}
          {% if project.project_group == "technical" and project.published != false %}
            {% if project.project_subcategory == subcategory or project.project_subcategories contains subcategory %}
              {% include projects.liquid %}
            {% endif %}
          {% endif %}
        {% endfor %}
      {% endcapture %}
      {% assign subsection_cards_clean = subsection_cards | strip %}
      {% if subsection_cards_clean != "" %}
        <div class="project-subsection">
          <h3>{{ subcategory }}</h3>
          <div class="row row-cols-1 row-cols-md-2">
            {{ subsection_cards_clean }}
          </div>
        </div>
      {% endif %}
    {% endfor %}
  </section>

  {% capture other_cards %}
    {% for project in sorted_projects %}
      {% if project.project_group != "technical" and project.published != false %}
        {% include projects.liquid %}
      {% endif %}
    {% endfor %}
  {% endcapture %}
  {% assign other_cards_clean = other_cards | strip %}
  {% if other_cards_clean != "" %}
    <section class="project-section project-section-other">
      <div class="project-section-header">
        <h2>Other</h2>
        <p>Selected strategy, climate, design, and photo work.</p>
      </div>
      <div class="project-subsection">
        <div class="row row-cols-1 row-cols-md-3">
          {{ other_cards_clean }}
        </div>
      </div>
    </section>
  {% endif %}
</div>
