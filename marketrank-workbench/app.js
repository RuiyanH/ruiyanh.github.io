const SOURCE_LABELS = {
  ann: "ANN",
  repurchase: "Repurchase",
  category_pop: "Category pop",
  global_pop: "Global pop",
  covisit: "Co-visit",
};

const state = { release: null, search: "", feedbackAvailable: true };
const root = document.querySelector("#workspace");
const dialog = document.querySelector("#item-dialog");
const dialogContent = document.querySelector("#dialog-content");

const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const number = new Intl.NumberFormat("en-US");
const percent = (value, digits = 2) => `${(value * 100).toFixed(digits)}%`;
const customerRoute = (ref) => `#/customers/${encodeURIComponent(ref)}`;

function assertPublicRelease(release) {
  if (!release || typeof release !== "object") throw new Error("The release is not an object.");
  if (release.meta?.ranking_mode !== "baseline_fusion") throw new Error("Unexpected ranking mode.");
  if (release.meta?.demo_customer_count !== release.customers?.length) throw new Error("Demo count mismatch.");
  if (!Array.isArray(release.diagnostics?.source_metrics) || release.diagnostics.source_metrics.length !== 5) throw new Error("Five source metrics are required.");
  const allowedSources = new Set(Object.keys(SOURCE_LABELS));
  const refs = new Set();
  for (const customer of release.customers) {
    if (!/^demo_public_[0-9]{16}$/.test(customer.customer_ref)) throw new Error("A public demo reference is malformed.");
    if (refs.has(customer.customer_ref)) throw new Error("Duplicate demo reference.");
    refs.add(customer.customer_ref);
    if (!Array.isArray(customer.recommendations) || customer.recommendations.length !== 12) throw new Error("Each demo needs 12 candidates.");
    const articles = new Set();
    customer.recommendations.forEach((item, index) => {
      if (item.position !== index + 1 || articles.has(item.article_id)) throw new Error("Candidate ordering is invalid.");
      articles.add(item.article_id);
      if (!(item.fusion_score > 0)) throw new Error("Fusion scores must be positive ordering values.");
      if (!item.source_evidence?.length || item.source_evidence.some((e) => !allowedSources.has(e.source) || e.source_rank < 1)) throw new Error("Source evidence is invalid.");
    });
  }
  const forbidden = new Set(["customer_id", "raw_customer_id", "customer_hash", "price", "inventory", "probability", "confidence", "image_url"]);
  const visit = (value) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    Object.entries(value).forEach(([key, child]) => {
      if (forbidden.has(key)) throw new Error(`Forbidden field: ${key}`);
      visit(child);
    });
  };
  visit(release);
}

function releaseStamps() {
  const { meta } = state.release;
  return `<div class="release-stamp" aria-label="Release facts">
    <span class="stamp">As of ${escapeHtml(meta.as_of)}</span>
    <span class="stamp">${escapeHtml(meta.ranking_mode)}</span>
    <span class="stamp">RRF k=${meta.rrf.k}</span>
    <span class="stamp warning">Provenance ${escapeHtml(meta.provenance_status)}</span>
  </div>`;
}

function metricGrid() {
  const { meta, diagnostics } = state.release;
  return `<div class="metric-grid" aria-label="Historical release metrics">
    <div class="metric"><span class="metric-value">${percent(diagnostics.candidate_recall_ceiling)}</span><span class="metric-label">Historical val_tune candidate recall ceiling—not recommendation quality</span></div>
    <div class="metric"><span class="metric-value">${diagnostics.mean_candidate_count.toFixed(2)}</span><span class="metric-label">Mean unique candidates per customer in the full cohort</span></div>
    <div class="metric"><span class="metric-value">${number.format(diagnostics.union_candidate_rows)}</span><span class="metric-label">Deduplicated candidate rows across five sources</span></div>
    <div class="metric"><span class="metric-value">${number.format(meta.cohort_customer_count)}</span><span class="metric-label">Customers in the historical metric cohort; ${meta.demo_customer_count} shown here</span></div>
  </div>`;
}

function overview() {
  return `<section>
    <p class="eyebrow">Evidence before confidence</p>
    <h1>See what fed the shortlist.</h1>
    <p class="lede">A transparent view of five historical candidate sources before a trained ranker exists. Inspect the ordering, trace every reason to a source row, and keep retrieval metrics separate from product claims.</p>
    <div class="hero-actions">
      <a class="button" href="#/customers">Explore 8 public demos →</a>
      <a class="button secondary" href="#/quality">Read the diagnostics</a>
    </div>
    ${releaseStamps()}
    ${metricGrid()}
  </section>
  <section class="section">
    <div class="section-heading"><div><p class="eyebrow">Two scopes</p><h2>What you can—and cannot—conclude</h2></div></div>
    <div class="scope-grid">
      <article class="panel"><strong class="big">8 demos</strong><h3>Browsable evidence</h3><p>Public demo references expose twelve candidate items, source ranks, and ordering-only fusion values. They are not identities or live shoppers.</p></article>
      <article class="panel"><strong class="big">20,000</strong><h3>Metric cohort</h3><p>The diagnostic cards summarize the full historical val_tune cohort. They do not mean all 20,000 records are published here.</p></article>
    </div>
  </section>`;
}

function customerCards(customers) {
  if (!customers.length) return `<div class="empty-state">No public demo matches that search.</div>`;
  return `<div class="customer-grid">${customers.map((customer) => `
    <a class="customer-card" href="${customerRoute(customer.customer_ref)}">
      <div><h3>${escapeHtml(customer.display_label)}</h3><p>12 ranked candidates · public demo reference</p></div>
      <span class="arrow" aria-hidden="true">→</span>
    </a>`).join("")}</div>`;
}

function customersView() {
  const customers = state.release.customers.filter((customer) => customer.display_label.toLowerCase().includes(state.search.toLowerCase()));
  return `<section>
    <p class="eyebrow">Public demo sample</p><h2>Choose a customer view</h2>
    <p class="lede">These eight release-scoped labels are for interface demonstration. No raw customer identifier is sent to your browser.</p>
    ${releaseStamps()}
    <div class="search-box"><label for="customer-search">Find a demo</label><input id="customer-search" type="search" value="${escapeHtml(state.search)}" placeholder="Try Demo customer 03" autocomplete="off" /></div>
    <div id="customer-results">${customerCards(customers)}</div>
  </section>`;
}

function feedbackKey() { return `marketrank_public_feedback:${state.release.meta.release_id}`; }

function readFeedback() {
  try {
    const parsed = JSON.parse(localStorage.getItem(feedbackKey()) || "[]");
    return Array.isArray(parsed) ? parsed.filter((x) => x && typeof x === "object" && ["relevant", "not_relevant"].includes(x.signal)) : [];
  } catch {
    state.feedbackAvailable = false;
    return [];
  }
}

function saveFeedback(customerRef, articleId, signal) {
  try {
    const records = readFeedback();
    const existing = records.find((x) => x.customer_ref === customerRef && x.article_id === articleId);
    if (existing?.signal === signal) return;
    const next = records.filter((x) => !(x.customer_ref === customerRef && x.article_id === articleId));
    next.push({
      event_id: crypto.randomUUID(), customer_ref: customerRef, article_id: articleId, signal,
      release_id: state.release.meta.release_id, ranking_version: state.release.meta.ranking_version,
      recorded_at: new Date().toISOString(),
    });
    localStorage.setItem(feedbackKey(), JSON.stringify(next));
    state.feedbackAvailable = true;
  } catch {
    state.feedbackAvailable = false;
  }
}

function evidenceChips(item) {
  return item.source_evidence.map((e) => `<span class="chip" data-source="${escapeHtml(e.source)}">${escapeHtml(SOURCE_LABELS[e.source])} #${e.source_rank}</span>`).join("");
}

function recommendationCard(customer, item, feedback) {
  const current = feedback.find((x) => x.customer_ref === customer.customer_ref && x.article_id === item.article_id)?.signal;
  return `<article class="recommendation-card">
    <span class="rank">#${item.position}</span>
    <h3>${escapeHtml(item.metadata.product_name)}</h3>
    <p class="product-type">${escapeHtml(item.metadata.product_type_name)} · ${escapeHtml(item.metadata.colour_group_name)}</p>
    <div class="evidence">${evidenceChips(item)}</div>
    <p class="reason">${escapeHtml(item.reason.text)}</p>
    <p class="score">Fusion ${item.fusion_score.toFixed(6)} · ordering only, never probability</p>
    <div class="card-actions">
      <button data-detail="${escapeHtml(item.article_id)}">Inspect evidence</button>
      <button data-feedback="relevant" data-article="${escapeHtml(item.article_id)}" aria-pressed="${current === "relevant"}">Relevant</button>
      <button data-feedback="not_relevant" data-article="${escapeHtml(item.article_id)}" aria-pressed="${current === "not_relevant"}">Not relevant</button>
    </div>
  </article>`;
}

function customerView(ref) {
  const customer = state.release.customers.find((entry) => entry.customer_ref === ref);
  if (!customer) return `<section class="fatal-state"><h2>Demo not found</h2><p>This public release does not contain that reference.</p><a class="button" href="#/customers">Return to customers</a></section>`;
  const feedback = readFeedback();
  const represented = new Set(customer.recommendations.flatMap((item) => item.source_evidence.map((e) => e.source)));
  const missing = Object.keys(SOURCE_LABELS).filter((source) => !represented.has(source));
  return `<section>
    <a class="back-link" href="#/customers">← All public demos</a>
    <div class="customer-header"><div><p class="eyebrow">Candidate review</p><h2>${escapeHtml(customer.display_label)}</h2></div><span class="reference">${escapeHtml(customer.customer_ref)}</span></div>
    ${releaseStamps()}
    <div class="notice"><strong>Candidate-only baseline.</strong> These twelve items are deterministic RRF output from historical source lists. Scores control order; they are not confidence or purchase probability.${missing.length ? ` Top-12 evidence does not include ${missing.map((s) => escapeHtml(SOURCE_LABELS[s])).join(", ")}.` : ""}</div>
    ${state.feedbackAvailable ? "" : `<div class="notice">Feedback storage is unavailable in this browser. Review remains fully usable.</div>`}
    <div class="recommendation-grid">${customer.recommendations.map((item) => recommendationCard(customer, item, feedback)).join("")}</div>
  </section>`;
}

function qualityView() {
  const { diagnostics } = state.release;
  return `<section>
    <p class="eyebrow">Historical retrieval diagnostics</p><h2>Quality without overclaiming</h2>
    <p class="lede">These numbers describe whether held-out purchases appeared anywhere in candidate lists. They do not measure final ranking quality, conversion, revenue, or live performance.</p>
    ${releaseStamps()}${metricGrid()}
  </section>
  <section class="section">
    <div class="section-heading"><div><p class="eyebrow">Five sources</p><h2>Reach and recall ceiling</h2></div><p>${escapeHtml(diagnostics.scope)}</p></div>
    <table class="source-table"><thead><tr><th>Source</th><th>Rows</th><th>Customer reach</th><th>Solo recall ceiling</th></tr></thead><tbody>
      ${diagnostics.source_metrics.map((source) => `<tr><td><span class="chip" data-source="${escapeHtml(source.source)}">${escapeHtml(SOURCE_LABELS[source.source])}</span></td><td>${number.format(source.candidate_rows)}</td><td>${percent(source.reach_fraction, 1)}</td><td>${percent(source.solo_recall_ceiling)}</td></tr>`).join("")}
    </tbody></table>
  </section>
  <section class="section"><div class="section-heading"><div><p class="eyebrow">Definitions</p><h2>How to read the evidence</h2></div></div>
    <dl class="definition-list">${Object.entries(diagnostics.definitions).map(([term, definition]) => `<div><dt>${escapeHtml(term.replaceAll("_", " "))}</dt><dd>${escapeHtml(definition)}</dd></div>`).join("")}</dl>
  </section>`;
}

function showDetail(customer, articleId) {
  const item = customer.recommendations.find((entry) => entry.article_id === articleId);
  if (!item) return;
  dialogContent.innerHTML = `<p class="eyebrow">Position ${item.position} · Article ${escapeHtml(item.article_id)}</p>
    <h2 id="dialog-title">${escapeHtml(item.metadata.product_name)}</h2>
    <p class="reason">${escapeHtml(item.reason.text)}</p>
    <div class="evidence">${evidenceChips(item)}</div>
    <dl class="metadata-list">${Object.entries(item.metadata).map(([key, value]) => `<div><dt>${escapeHtml(key.replaceAll("_", " "))}</dt><dd>${escapeHtml(value || "Not recorded")}</dd></div>`).join("")}</dl>
    <p class="score">Fusion ${item.fusion_score.toFixed(6)} · ordering only, not a probability or confidence.</p>`;
  dialog.showModal();
}

function activeRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  return parts.length ? parts : ["overview"];
}

function bindInteractions(parts) {
  const search = document.querySelector("#customer-search");
  search?.addEventListener("input", (event) => {
    state.search = event.target.value;
    const matches = state.release.customers.filter((customer) => customer.display_label.toLowerCase().includes(state.search.toLowerCase()));
    document.querySelector("#customer-results").innerHTML = customerCards(matches);
  });
  if (parts[0] === "customers" && parts[1]) {
    const customer = state.release.customers.find((entry) => entry.customer_ref === parts[1]);
    document.querySelectorAll("[data-detail]").forEach((button) => button.addEventListener("click", () => showDetail(customer, button.dataset.detail)));
    document.querySelectorAll("[data-feedback]").forEach((button) => button.addEventListener("click", () => {
      saveFeedback(customer.customer_ref, button.dataset.article, button.dataset.feedback);
      render();
    }));
  }
}

function render() {
  if (!state.release) return;
  const parts = activeRoute();
  document.querySelectorAll("nav [data-route]").forEach((link) => {
    if (link.dataset.route === parts[0]) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (parts[0] === "overview") root.innerHTML = overview();
  else if (parts[0] === "customers" && parts[1]) root.innerHTML = customerView(decodeURIComponent(parts[1]));
  else if (parts[0] === "customers") root.innerHTML = customersView();
  else if (parts[0] === "quality") root.innerHTML = qualityView();
  else root.innerHTML = `<section class="fatal-state"><h2>Page not found</h2><a class="button" href="#/overview">Return to overview</a></section>`;
  bindInteractions(parts);
  root.focus({ preventScroll: true });
}

window.addEventListener("hashchange", render);

fetch("./data/demo-release.json", { cache: "no-store" })
  .then((response) => {
    if (!response.ok) throw new Error(`Release request failed with ${response.status}.`);
    return response.json();
  })
  .then((release) => {
    assertPublicRelease(release);
    state.release = release;
    if (!location.hash) history.replaceState(null, "", "#/overview");
    render();
  })
  .catch(() => {
    root.innerHTML = `<section class="fatal-state"><h2>Release unavailable</h2><p>The public demo data could not be validated. No partial or lower-source fallback was shown.</p></section>`;
  });
