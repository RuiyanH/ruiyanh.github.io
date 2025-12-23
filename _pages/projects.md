---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my passion projects!
nav: true
nav_order: 3
horizontal: false
---

<!-- pages/projects.md -->
<style>
  /* Tag badges in cards */
  .project-tags {
    margin-top: 0.5rem;
  }
  .tag-badge {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    margin: 0 0.25rem 0.25rem 0;
    border-radius: 999px;
    font-size: 0.8rem;
    line-height: 1;
    border: 1px solid rgba(0,0,0,0.1);
    background: #f5f5f5;
    color: #333;
    white-space: nowrap;
  }
  /* Filter bar */
  .tag-filter-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .tag-filter-title {
    margin-right: 0.5rem;
    font-weight: 600;
  }
  .tag-filter {
    cursor: pointer;
    user-select: none;
    padding: 0.3rem 0.6rem;
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.12);
    background: #f8f9fa;
    font-size: 0.85rem;
  }
  .tag-filter.active {
    color: #fff;
    border-color: transparent;
  }
  .tag-filter-clear {
    margin-left: auto;
    font-size: 0.85rem;
    text-decoration: underline;
    cursor: pointer;
  }
  /* Hide helper for filtering */
  .is-hidden {
    display: none !important;
  }
</style>

{% assign all_tags = "" %}
{% for project in site.projects %}
  {% if project.tags %}
    {% for t in project.tags %}
      {% assign all_tags = all_tags | append: t | append: '|' %}
    {% endfor %}
  {% elsif project.category %}
    {% assign all_tags = all_tags | append: project.category | append: '|' %}
  {% endif %}
{% endfor %}
{% assign tags_array = all_tags | split: '|' | uniq | sort %}

<div class="projects">
  <!-- Tag filter bar -->
  <div class="tag-filter-bar">
    <span class="tag-filter-title">Filter by tags:</span>
    {% for t in tags_array %}
      {% if t != "" %}
        <span class="tag-filter" data-tag="{{ t | downcase }}">{{ t }}</span>
      {% endif %}
    {% endfor %}
    <span class="tag-filter-clear" id="clear-tag-filters" role="button">Clear</span>
  </div>

{% if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display projects without categories -->

{% assign sorted_projects = site.projects | sort: "importance" %}

  <!-- Generate cards for each project -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for project in sorted_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>

<script>
  (function() {
    function stringHash(str) {
      var hash = 0, i, chr;
      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
      }
      return Math.abs(hash);
    }
    var palette = [
      '#2563eb', '#16a34a', '#ca8a04', '#db2777', '#7c3aed',
      '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#a855f7',
      '#14b8a6', '#e11d48', '#1d4ed8', '#059669', '#b45309'
    ];
    function colorForTag(tag) {
      var idx = stringHash(tag) % palette.length;
      return palette[idx];
    }
    function paintBadges(selector) {
      var elems = document.querySelectorAll(selector);
      elems.forEach(function(el) {
        var tag = (el.getAttribute('data-tag') || el.textContent || '').trim().toLowerCase();
        var color = colorForTag(tag);
        el.style.backgroundColor = hexToRgba(color, 0.12);
        el.style.color = color;
        el.style.borderColor = hexToRgba(color, 0.35);
      });
    }
    function paintFilters(selector) {
      var elems = document.querySelectorAll(selector);
      elems.forEach(function(el) {
        var tag = (el.getAttribute('data-tag') || el.textContent || '').trim().toLowerCase();
        var color = colorForTag(tag);
        el.dataset.color = color;
        el.style.borderColor = hexToRgba(color, 0.35);
      });
    }
    function hexToRgba(hex, alpha) {
      var c = hex.replace('#','');
      if (c.length === 3) {
        c = c.split('').map(function(ch){ return ch + ch; }).join('');
      }
      var num = parseInt(c, 16);
      var r = (num >> 16) & 255;
      var g = (num >> 8) & 255;
      var b = num & 255;
      return 'rgba(' + r + ',' + g + ',' + b + ',' + (alpha == null ? 1 : alpha) + ')';
    }

    var selected = new Set();

    function applyFilter() {
      var cards = document.querySelectorAll('.projects .card');
      if (selected.size === 0) {
        cards.forEach(function(card) { card.parentElement.parentElement.classList.remove('is-hidden'); });
        return;
      }
      cards.forEach(function(card) {
        var raw = (card.getAttribute('data-tags') || '').split('|').filter(Boolean);
        var tags = raw.map(function(t){ return t.trim().toLowerCase(); });
        var show = true;
        selected.forEach(function(t) {
          if (tags.indexOf(t) === -1) { show = false; }
        });
        var col = card.parentElement.parentElement; // .col wrapper
        if (show) col.classList.remove('is-hidden'); else col.classList.add('is-hidden');
      });
    }

    function toggleFilter(el) {
      var tag = (el.getAttribute('data-tag') || '').trim().toLowerCase();
      if (!tag) return;
      if (selected.has(tag)) {
        selected.delete(tag);
        el.classList.remove('active');
        el.style.backgroundColor = '';
        el.style.color = '';
        el.style.borderColor = el.dataset.color ? hexToRgba(el.dataset.color, 0.35) : '';
      } else {
        selected.add(tag);
        var color = el.dataset.color || '#2563eb';
        el.classList.add('active');
        el.style.backgroundColor = color;
        el.style.color = '#fff';
        el.style.borderColor = color;
      }
      applyFilter();
    }

    document.addEventListener('DOMContentLoaded', function() {
      paintBadges('.project-tags .tag-badge');
      paintFilters('.tag-filter-bar .tag-filter');
      document.querySelectorAll('.tag-filter-bar .tag-filter').forEach(function(el) {
        el.addEventListener('click', function() { toggleFilter(el); });
      });
      var clear = document.getElementById('clear-tag-filters');
      if (clear) {
        clear.addEventListener('click', function() {
          selected.clear();
          document.querySelectorAll('.tag-filter-bar .tag-filter').forEach(function(el) {
            el.classList.remove('active');
            el.style.backgroundColor = '';
            el.style.color = '';
            el.style.borderColor = el.dataset.color ? hexToRgba(el.dataset.color, 0.35) : '';
          });
          applyFilter();
        });
      }
    });
  })();
</script>
