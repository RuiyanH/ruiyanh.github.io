import { readFile } from "node:fs/promises";

const releasePath = new URL("../marketrank-workbench/data/demo-release.json", import.meta.url);
const projectPath = new URL("../_projects/promorank.md", import.meta.url);
const homepagePath = new URL("../_pages/about.md", import.meta.url);
const projectCardPath = new URL("../_includes/projects.liquid", import.meta.url);
const release = JSON.parse(await readFile(releasePath, "utf8"));
const project = await readFile(projectPath, "utf8");
const homepage = await readFile(homepagePath, "utf8");
const projectCard = await readFile(projectCardPath, "utf8");

const fail = (message) => {
  throw new Error(`MarketRank public demo: ${message}`);
};

if (release.meta?.ranking_mode !== "baseline_fusion") fail("ranking mode changed");
if (release.meta?.release_id !== "historical-public-demo-2020-08-12-v1") fail("release ID changed");
if (release.meta?.as_of !== "2020-08-12") fail("historical date changed");
if (release.meta?.demo_customer_count !== 8 || release.customers?.length !== 8) fail("expected eight public demos");
if (release.meta?.cohort_customer_count !== 20_000) fail("cohort scope changed");
if (release.diagnostics?.source_metrics?.length !== 5) fail("expected five source metrics");
if (release.diagnostics?.candidate_recall_ceiling !== 0.1077706285795093) fail("historical ceiling changed");

const refs = new Set();
for (const customer of release.customers) {
  if (!/^demo_public_[0-9]{16}$/.test(customer.customer_ref)) fail("non-public customer reference found");
  if (refs.has(customer.customer_ref)) fail("duplicate customer reference");
  refs.add(customer.customer_ref);
  if (customer.recommendations?.length !== 12) fail("expected twelve candidates per demo");
  const articles = customer.recommendations.map((item) => item.article_id);
  if (new Set(articles).size !== articles.length) fail("duplicate candidate article");
}

const forbidden = new Set([
  "customer_id", "raw_customer_id", "customer_hash", "price", "inventory",
  "probability", "confidence", "image_url",
]);
const inspect = (value) => {
  if (Array.isArray(value)) return value.forEach(inspect);
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (forbidden.has(key)) fail(`forbidden field ${key}`);
    inspect(child);
  }
};
inspect(release);

if (!project.includes('href="/marketrank-workbench/"')) fail("portfolio project link missing");
if (!project.includes("demo_url: /marketrank-workbench/")) fail("demo-first project destination missing");
if (!homepage.includes('class="featured-project" href="/marketrank-workbench/"')) fail("demo-first homepage link missing");
if (!projectCard.includes("project.demo_url")) fail("demo-first project card support missing");
console.log("MarketRank public demo checks passed");
