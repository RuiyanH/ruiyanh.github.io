---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my passion projects!
nav: true
nav_order: 2
horizontal: false
---

<!-- pages/projects.md -->
<style>
  /* Tag badges in cards */
  .project-tags {
    margin-top: 0.5rem;
  }
  .project-tags.collapsed {
    max-height: 2.2em; /* ~2 lines of badges */
    overflow: hidden;
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
  .project-tags-toggle {
    display: inline-block;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    cursor: pointer;
    text-decoration: underline;
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
  .tag-filter-section {
    width: 100%;
    margin-top: 0.25rem;
  }
  .tag-filter-group-title {
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.85;
    margin: 0.25rem 0;
  }
  .tag-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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
  /* Consistent 3:2 cover crop for card images */
  .projects .card-img-top {
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
  }
  /* Optional: clamp description to reduce height variance */
  .projects .card-body > p.card-text:first-of-type {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    {% comment %} Group tags into sections {% endcomment %}
    {% assign energy_climate_names = '|climate|energy|carbon-removal|carbon removal|renewables|erw|biochar|mineralization|dac|refrigerants|cooling|sustainability|' %}
    {% assign art_names = '|art|design|photography|graphic|book|' %}
    {% assign dsml_names = '|ml|machine learning|data science|forecasting|vision|nlp|graph|time-series|statistics|python|pytorch|tensorflow|' %}
    {% assign energy_climate_tags = '' %}
    {% assign art_tags = '' %}
    {% assign dsml_tags = '' %}
    {% assign other_tags = '' %}
    {% for t in tags_array %}
      {% if t != "" %}
        {% assign t_l = t | downcase %}
        {% assign needle = '|' | append: t_l | append: '|' %}
        {% if energy_climate_names contains needle %}
          {% assign energy_climate_tags = energy_climate_tags | append: t | append: '|' %}
        {% elsif art_names contains needle %}
          {% assign art_tags = art_tags | append: t | append: '|' %}
        {% elsif dsml_names contains needle %}
          {% assign dsml_tags = dsml_tags | append: t | append: '|' %}
        {% else %}
          {% assign other_tags = other_tags | append: t | append: '|' %}
        {% endif %}
      {% endif %}
    {% endfor %}
    {% assign energy_climate_array = energy_climate_tags | split: '|' | uniq | sort %}
    {% assign dsml_array = dsml_tags | split: '|' | uniq | sort %}
    {% assign art_array = art_tags | split: '|' | uniq | sort %}
    {% assign other_array = other_tags | split: '|' | uniq | sort %}

    <div class="tag-filter-section">
      <div class="tag-filter-group-title">Energy / Climate</div>
      <div class="tag-filter-group">
        {% for t in energy_climate_array %}
          {% if t != "" %}
            <span class="tag-filter" data-tag="{{ t | downcase }}">{{ t }}</span>
          {% endif %}
        {% endfor %}
      </div>
    </div>

    <div class="tag-filter-section">
      <div class="tag-filter-group-title">Data Science & ML</div>
      <div class="tag-filter-group">
        {% for t in dsml_array %}
          {% if t != "" %}
            <span class="tag-filter" data-tag="{{ t | downcase }}">{{ t }}</span>
          {% endif %}
        {% endfor %}
      </div>
    </div>

    <div class="tag-filter-section">
      <div class="tag-filter-group-title">Art</div>
      <div class="tag-filter-group">
        {% for t in art_array %}
          {% if t != "" %}
            <span class="tag-filter" data-tag="{{ t | downcase }}">{{ t }}</span>
          {% endif %}
        {% endfor %}
      </div>
    </div>

    <div class="tag-filter-section">
      <div class="tag-filter-group-title">Other</div>
      <div class="tag-filter-group">
        {% for t in other_array %}
          {% if t != "" %}
            <span class="tag-filter" data-tag="{{ t | downcase }}">{{ t }}</span>
          {% endif %}
        {% endfor %}
      </div>
    </div>
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
        cards.forEach(function(card) {
          var col = card.closest('.col') || card.parentElement.parentElement;
          if (col) col.classList.remove('is-hidden');
        });
        return;
      }
      cards.forEach(function(card) {
        var raw = (card.getAttribute('data-tags') || '').split('|').filter(Boolean);
        var tags = raw.map(function(t){ return t.trim().toLowerCase(); });
        // OR semantics: show if project has ANY selected tag
        var show = false;
        selected.forEach(function(t) {
          if (tags.indexOf(t) !== -1) { show = true; }
        });
        var col = card.closest('.col') || card.parentElement.parentElement; // .col wrapper
        if (col) {
          if (show) col.classList.remove('is-hidden'); else col.classList.add('is-hidden');
        }
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

    function setupTagCollapsers() {
      var MAX_TAGS_VISIBLE = 6;
      var groups = document.querySelectorAll('.project-tags');
      groups.forEach(function(group) {
        var badges = group.querySelectorAll('.tag-badge');
        if (badges.length > MAX_TAGS_VISIBLE) {
          group.classList.add('collapsed');
          // Add toggle
          var toggle = document.createElement('span');
          toggle.className = 'project-tags-toggle';
          toggle.textContent = 'Show more';
          toggle.addEventListener('click', function(event) {
            if (event) { event.preventDefault(); event.stopPropagation(); }
            var collapsed = group.classList.contains('collapsed');
            if (collapsed) {
              group.classList.remove('collapsed');
              toggle.textContent = 'Show less';
            } else {
              group.classList.add('collapsed');
              toggle.textContent = 'Show more';
            }
          });
          group.parentElement.appendChild(toggle);
        }
      });
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
      setupTagCollapsers();
    });
  })();
</script>
