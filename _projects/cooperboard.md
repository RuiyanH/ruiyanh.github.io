---
layout: page
title: CooperBoard
description: A privacy-preserving AI coordination system that turns fragmented team activity into evidence-linked, policy-bounded interventions.
importance: 1
category: ML
featured: true
tags: [AI agents, LLM evaluation, TypeScript, PostgreSQL, Slack, SwiftUI]
project_type: AI Systems
project_group: technical
project_subcategory: ML Systems
demo_url: /cooperboard/
result: "Built and internally validated a local-first macOS + Slack coordination agent with evidence-linked findings and audited actions."
---

## Overview

**CooperBoard** is experimental research infrastructure for team coordination.
A native macOS app derives structured activity summaries locally, a central
project service joins those summaries with authorized Slack context, and a
scheduled coordination agent detects risks such as blocked work, inconsistent
contracts, missing ownership, and dropped handoffs.

The difficult part is not generating another team summary. It is deciding when
the system has enough evidence to interrupt people, which context is safe to
cite, and whether the appropriate action is to hold, ask, remind, or deliver.
CooperBoard therefore keeps observation, inference, policy, and delivery as
separate, auditable stages.

<a class="btn btn-sm btn-primary" href="/cooperboard/">Open interactive replay</a>

The public replay uses a deterministic synthetic ecommerce scenario. It does
not connect to a live Slack workspace, participant data, production database,
or model provider.

## System shape

```text
Participant Mac                         CooperBoard service

CooperBoard.app                         Authenticated API + Postgres
  └─ supervised local daemon  ────────► project-scoped derived rows
       ├─ periodic screenshots                      │
       ├─ structured activity                       ▼
       └─ pause + deletion controls         coordination agent
                                                    │
Linked Slack channel ◄──────────────────── bounded, audited actions
```

Raw screenshots remain on the participant's Mac. Only derived, study-scoped
records sync centrally. Slack messages enter through Slack's API rather than
screen capture.

## Engineering decisions

- **Evidence before intervention.** Findings retain the shared messages or
  structured project facts that support them instead of presenting an opaque
  model judgment.
- **Typed actions instead of arbitrary chat mutations.** Supported actions are
  authorization-checked, idempotent, and audited. Higher-risk corrections use
  preview and confirmation.
- **Conservative defaults.** Detectors can run in shadow mode, delivery is
  rate-limited, and project allowlists constrain experimental behavior.
- **Explicit privacy controls.** Recording can be paused independently from
  Slack delivery, and participants can review or withdraw study data.

## Honest maturity

CooperBoard is pre-1.0 research software for studies and trusted teams. It has
not received an independent security audit and is not positioned as a hardened
multi-tenant SaaS product. Internal replays and team-study evidence demonstrate
the system shape and surface useful failures, but they do not establish
production-grade detector accuracy or broad generalization.

That distinction is intentional: the portfolio claim is that I built and
evaluated a nontrivial coordination system with explicit privacy, provenance,
policy, and failure boundaries—not that every inferred coordination issue is
correct.
