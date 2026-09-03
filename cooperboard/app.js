const shell = document.querySelector("[data-demo-stage]");
const analysis = document.querySelector("[data-analysis]");
const stepButtons = [...document.querySelectorAll("[data-stage-button]")];

const views = {
  0: `<div class="ready-state"><div class="pulse-mark"><span></span></div><p>SCENARIO READY</p><h3>Four messages.<br />One buried dependency.</h3><span>Run the replay to see what CooperBoard surfaces from the team’s shared context.</span><button data-action="detect">Run CooperBoard <b>→</b></button><small>No sign-in, database, model call, or external service required.</small></div>`,
  1: `<div class="finding-state"><p class="finding-label"><span></span> HIGH-CONFIDENCE FINDING</p><h3>Cart integration is blocked by a contract mismatch.</h3><p>Avery built around <b>product ID + size</b>, while Blair finalized <b>SKU + quantity</b>. The dependency landed late in the launch window.</p><div class="evidence-block"><span>EVIDENCE · 3 SOURCES</span><blockquote>“waiting on the final inventory shape”</blockquote><blockquote>“Final cart payload is SKU plus quantity”</blockquote></div><button class="nudge-button" data-action="review">Review suggested nudge <b>→</b></button><button class="reset-button" data-action="reset">Reset replay</button></div>`,
  2: `<div class="action-state"><p class="finding-label"><span></span> POLICY CHECK PASSED</p><h3>Confirm the contract before frontend rewires cart state.</h3><div class="nudge-preview"><div class="mini-bot">C</div><div><b>CooperBoard</b><small>Suggested channel reply</small></div><p><b>Avery and Blair:</b> the current cart contract appears inconsistent. Is <code>SKU + quantity</code> now authoritative? Confirming here could unblock PDP/cart integration before launch.</p></div><div class="policy-row"><span>✓ Shared evidence only</span><span>✓ Linked channel</span><span>✓ Human approval</span></div><button class="nudge-button" data-action="approve">Approve simulated nudge <b>→</b></button><button class="reset-button" data-action="reset">Reset replay</button></div>`,
  3: `<div class="receipt-state"><div class="receipt-check">✓</div><p class="finding-label"><span></span> SIMULATION COMPLETE</p><h3>The intervention is attributable and auditable.</h3><div class="audit-card"><div><span>Outcome</span><b>Queued for linked channel</b></div><div><span>Evidence</span><b>3 shared-context sources</b></div><div><span>Policy</span><b>Human-approved · bounded</b></div><div><span>Delivery</span><b>Simulated · no message sent</b></div></div><button class="nudge-button dark" data-action="reset">Replay from start <b>↺</b></button></div>`,
};

function setStage(stage) {
  const value = Number(stage);
  shell.dataset.demoStage = String(value);
  analysis.innerHTML = views[value];
  stepButtons.forEach((button, index) => {
    button.disabled = index > Math.min(value, 2);
    button.classList.toggle("active", index === Math.min(value, 2));
    button.classList.toggle("done", index < Math.min(value, 2));
  });
}

document.addEventListener("click", (event) => {
  const stageButton = event.target.closest("[data-stage-button]");
  if (stageButton && !stageButton.disabled) setStage(stageButton.dataset.stageButton);

  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "detect") setStage(1);
  if (action === "review") setStage(2);
  if (action === "approve") setStage(3);
  if (action === "reset") setStage(0);
});
