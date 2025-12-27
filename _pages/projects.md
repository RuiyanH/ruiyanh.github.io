---
layout: page
title: PROJECTS
permalink: /projects/
description: A growing collection of my passion projects!
nav: true
nav_order: 2
horizontal: false
---

<!-- pages/projects.md -->
<style>
  /* Projects page header background */
  .post .post-header {
    background-color:rgb(125, 138, 117);
    border-bottom: none;
    border-radius: 0;
    /* Full-bleed across viewport */
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
    /* Pull out of container margins but stay below fixed navbar */
    margin-top: calc(-3rem); /* negate .container.mt-5 only */
    /* Comfortable vertical spacing */
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 6rem; /* generous buffer below navbar */
    padding-bottom: 1.5rem;
  }
  .post .post-header .post-title,
  .post .post-header .post-description {
    color: #F5F5F5;
  }

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
  .tag-filter-section {
    width: 100%;
    margin-top: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: nowrap;
  }
  .tag-filter-group-title {
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.85;
    margin: 0.25rem 0;
    white-space: nowrap;
  }
  .tag-filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1 1 auto;
    overflow: visible;
  }
  .tag-filter-group.collapsed {
    max-height: 2.2em; /* ~1 line of chips */
    overflow: hidden;
  }
  .tag-filter-more {
    cursor: pointer;
    user-select: none;
    font-size: 0.85rem;
    text-decoration: underline;
    white-space: nowrap;
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
    aspect-ratio: 4 / 3; /* slightly taller/larger photo */
    object-fit: cover;
  }
  /* Optional: clamp description to reduce height variance */
  .projects .card-body > p.card-text:first-of-type {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  /* Card overlay (hover/focus) */
  .projects .card {
    position: relative;
    border: none; /* remove card border */
    overflow: hidden;
  }
  .projects .card .card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.96);
    opacity: 0;
    visibility: hidden;
    transition: opacity 160ms ease, visibility 160ms ease;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    padding: 1rem;
    pointer-events: none; /* allow click-through to anchor */
  }

  /* Tighter horizontal gaps between cards (scoped to projects) */
  .projects .row {
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
  .projects .row > [class*="col"] {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  /* Title under photo: smaller and left-aligned, with compact spacing */
  .projects .card-body {
    padding: 0.6rem 0.6rem 0.9rem;
    text-align: left;
  }
  .projects .card .card-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.25rem 0 0;
    text-align: left;
  }
  .projects .card .card-text {
    font-size: 0.9rem;
    margin: 0.25rem 0 0;
    color: #444;
  }

  /* More vertical space between rows (not columns) */
  .projects .row > [class*="col"] {
    margin-bottom: 1.1rem;
  }
  .projects .card:hover .card-overlay,
  .projects .card:focus-within .card-overlay,
  .projects .card.overlay-active .card-overlay {
    opacity: 1;
    visibility: visible;
  }
  .projects .card .overlay-content {
    max-width: 92%;
  }
  .projects .card .overlay-title {
    font-size: 1.1rem;
    margin: 0 0 0.35rem 0;
  }
  .projects .card .overlay-desc {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .projects .card .overlay-tags {
    margin-bottom: 0.5rem;
  }
  .projects .card .overlay-cta {
    font-size: 0.9rem;
    opacity: 0.8;
  }
  /* Dark mode overlay background */
  html[data-theme="dark"] .projects .card .card-overlay {
    background: rgba(16,25,22,0.96);
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
    {% assign energy_climate_names = '|climate|energy|carbon removal|Conservation|emissions modeling|decarbonization|building systems|' %}
    {% assign art_names = '|photography|graphic design|UI/UX|' %}
    {% assign dsml_names = '|machine learning|computer vision|time-series forecasting|database design|Cost-benefit analysis|model evaluation|optimization|risk assessment|scenario analysis|' %}
    {% assign swe_names = '|full stack|REST APIs|database design|Software Engineer|system design|UI/UX|' %}
    {% assign energy_climate_tags = '' %}
    {% assign art_tags = '' %}
    {% assign dsml_tags = '' %}
    {% assign swe_tags = '' %}
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
        {% elsif swe_names contains needle %}
          {% assign swe_tags = swe_tags | append: t | append: '|' %}
        {% else %}
          {% assign other_tags = other_tags | append: t | append: '|' %}
        {% endif %}
      {% endif %}
    {% endfor %}
    {% assign dsml_array = dsml_tags | split: '|' | uniq | sort %}
    {% assign swe_array = swe_tags | split: '|' | uniq | sort %}
    {% assign energy_climate_array = energy_climate_tags | split: '|' | uniq | sort %}
    {% assign art_array = art_tags | split: '|' | uniq | sort %}
    {% assign other_array = other_tags | split: '|' | uniq | sort %}


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
      <div class="tag-filter-group-title"> Software Engineering</div>
      <div class="tag-filter-group">
        {% for t in swe_array %}
          {% if t != "" %}
            <span class="tag-filter" data-tag="{{ t | downcase }}">{{ t }}</span>
          {% endif %}
        {% endfor %}
      </div>
    </div>

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
    function getThemeColor() {
      try {
        var val = getComputedStyle(document.documentElement)
          .getPropertyValue('--global-theme-color')
          .trim();
        return val || '#9C524D';
      } catch (e) {
        return '#9C524D';
      }
    }
    function colorForTag(_tag) {
      return getThemeColor();
    }
    function paintBadges(selector) {
      var elems = document.querySelectorAll(selector);
      elems.forEach(function(el) {
        var color = colorForTag();
        el.style.backgroundColor = hexToRgba(color, 0.12);
        el.style.color = color;
        el.style.borderColor = hexToRgba(color, 0.35);
      });
    }
    function paintFilters(selector) {
      var elems = document.querySelectorAll(selector);
      elems.forEach(function(el) {
        var color = colorForTag();
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

    function setupFilterBarCollapsers() {
      var sections = document.querySelectorAll('.tag-filter-section');
      sections.forEach(function(section) {
        var group = section.querySelector('.tag-filter-group');
        if (!group) return;
        // Start collapsed to one line
        group.classList.add('collapsed');
        // Measure overflow after layout
        setTimeout(function() {
          var overflowing = group.scrollHeight > group.clientHeight + 1;
          if (!overflowing) {
            group.classList.remove('collapsed');
            return;
          }
          // Add a toggle if not present
          var existingToggle = section.querySelector('.tag-filter-more');
          if (!existingToggle) {
            var more = document.createElement('span');
            more.className = 'tag-filter-more';
            more.textContent = 'Show more';
            more.addEventListener('click', function(event) {
              if (event) { event.preventDefault(); event.stopPropagation(); }
              var collapsed = group.classList.contains('collapsed');
              if (collapsed) {
                group.classList.remove('collapsed');
                more.textContent = 'Show less';
              } else {
                group.classList.add('collapsed');
                more.textContent = 'Show more';
              }
            });
            // Insert after group within the same row
            section.appendChild(more);
          }
        }, 0);
      });
    }

    document.addEventListener('DOMContentLoaded', function() {
      paintBadges('.project-tags .tag-badge');
      paintBadges('.overlay-tags .tag-badge');
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
      setupFilterBarCollapsers();

      // Touch devices: first tap reveals overlay, second tap navigates
      (function setupTouchOverlay() {
        var isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
        if (!isTouch) return;
        document.querySelectorAll('.projects .card').forEach(function(card) {
          var anchor = card.parentElement && card.parentElement.tagName === 'A' ? card.parentElement : null;
          if (!anchor) return;
          anchor.addEventListener('click', function(e) {
            if (!card.classList.contains('overlay-active')) {
              e.preventDefault();
              card.classList.add('overlay-active');
              // Auto-hide after a short delay if no second tap
              setTimeout(function() { card.classList.remove('overlay-active'); }, 2000);
            }
          });
        });
      })();
    });
  })();
</script>
