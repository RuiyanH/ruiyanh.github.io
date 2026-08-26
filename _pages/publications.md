---
layout: page
permalink: /publications/
title: PUBLICATIONS
description: Peer-reviewed mathematics research.
nav: true
nav_order: 3
---

<!-- _pages/publications.md -->
<style>
  /* Full-bleed header like Projects */
  .post .post-header {
    background-color: #3366CC;
    border-bottom: none;
    border-radius: 0;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
    margin-top: calc(-3rem);
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    padding-top: 6rem;
    padding-bottom: 1.5rem;
  }
  .post .post-header .post-title,
  .post .post-header .post-description {
    color: #F5F5F5;
  }
</style>

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>
