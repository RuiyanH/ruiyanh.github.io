import { readFile, stat } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const [html, css, script, project, image] = await Promise.all([
  readFile(new URL("cooperboard/index.html", root), "utf8"),
  readFile(new URL("cooperboard/styles.css", root), "utf8"),
  readFile(new URL("cooperboard/app.js", root), "utf8"),
  readFile(new URL("_projects/cooperboard.md", root), "utf8"),
  stat(new URL("cooperboard/og.png", root)),
]);

const requireText = (source, text, label) => {
  if (!source.includes(text)) throw new Error(`CooperBoard public demo: missing ${label}`);
};

requireText(html, "Synthetic data", "synthetic-data disclosure");
requireText(html, "does not call the live CooperBoard service", "live-service boundary");
requireText(html, 'Content-Security-Policy', "content security policy");
requireText(html, 'data-action="detect"', "replay affordance");
requireText(html, "What this demo proves", "claim boundary");
requireText(script, "Simulated · no message sent", "simulated-delivery receipt");
requireText(project, 'href="/cooperboard/"', "portfolio link");

if (html.includes("localhost") || script.includes("localhost")) throw new Error("CooperBoard public demo: localhost reference found");
if (/xox[baprs]-|GEMINI_API_KEY|SLACK_BOT_TOKEN/.test(html + script)) throw new Error("CooperBoard public demo: credential-like content found");
if (css.length < 5000) throw new Error("CooperBoard public demo: stylesheet appears incomplete");
if (image.size < 50_000) throw new Error("CooperBoard public demo: social image appears incomplete");

console.log("CooperBoard public demo checks passed");
