# SLP Media — GHL System Setup Guide
## Build Once. Deploy to Any Client in Minutes.

---

## STEP 1 — CREATE THE INBOUND WEBHOOK (YOUR ACCOUNT)

1. Go to **Automation → Workflows → + New Workflow**
2. Name it: `Funnel Lead — New Contact`
3. Set trigger to **"Inbound Webhook"**
4. Copy the webhook URL → paste it into `funnel.html` (the `ghlWebhookUrl` field in CLIENT_CONFIG)
5. Save the trigger

---

## STEP 2 — BUILD THE PIPELINE

Go to **CRM → Pipelines → + New Pipeline**. Name it `Growth System`.

Create these stages:
| Stage | Description |
|---|---|
| New Lead | Just came in from funnel |
| Contacted | First message sent |
| Qualified | Confirmed good fit |
| Call Booked | Calendly booking confirmed |
| Call Showed | Attended the call |
| Proposal Sent | Quote/proposal delivered |
| Closed Won | Paid client |
| Closed Lost | Not a fit / lost |

---

## STEP 3 — BUILD THE AUTOMATION WORKFLOW

After the webhook trigger, add these actions in order:

### Action 1 — Create / Update Contact
- Map fields from webhook payload:
  - `firstName` → First Name
  - `lastName` → Last Name
  - `email` → Email
  - `phone` → Phone
  - `companyName` → Company
  - `businessType` → Custom Field: Business Type
  - `mainChallenge` → Custom Field: Main Challenge
  - `servicesWanted` → Custom Field: Services Interested
  - `monthlyRevenue` → Custom Field: Monthly Revenue
  - `monthlyAdBudget` → Custom Field: Ad Budget
  - `leadScore` → Custom Field: Lead Score
  - `source` → Source

### Action 2 — Add Tags
- Add tag: `funnel-lead`
- Add tag: `{{source}}` (pulls from webhook)
- Add tag: `{{monthlyAdBudget}}`

### Action 3 — Add to Pipeline
- Pipeline: Growth System
- Stage: New Lead

### Action 4 — Internal Notification (SMS to yourself)
```
🔥 New Funnel Lead!
Name: {{firstName}} {{lastName}}
Budget: {{monthlyAdBudget}}
Score: {{leadScore}}/100
Phone: {{phone}}
```

### Action 5 — Wait 2 minutes

### Action 6 — Send SMS to Lead
```
Hey {{firstName}}, thanks for filling out our form!

I'm [YOUR NAME] from SLP Media. I've had a look at your answers and I think we can definitely help.

I'll be in touch shortly — or if you want to fast-track, grab a time here: [CALENDLY LINK]
```

### Action 7 — Send Email to Lead
Subject: `Your Free Growth Strategy — Next Steps`
```
Hi {{firstName}},

Thanks for taking the time to fill out our assessment.

Based on what you told us:
- Business type: {{businessType}}
- Main challenge: {{mainChallenge}}
- Budget: {{monthlyAdBudget}}

...we've got some ideas for you.

The fastest way to get your custom strategy is to book a free 30-min call:
[CALENDLY LINK]

Talk soon,
[YOUR NAME]
SLP Media
```

### Action 8 — Wait 24 hours (if no booking)

### Action 9 — Condition: Check if call booked
- If YES → stop
- If NO → send follow-up

### Action 10 — Follow-up SMS
```
Hey {{firstName}}, just checking in! Did you get a chance to grab a time?

Here's the link: [CALENDLY LINK]

Takes 30 seconds to book 👍
```

---

## STEP 4 — CUSTOM FIELDS (create these in Settings → Custom Fields)

| Field Name | Type |
|---|---|
| Business Type | Text |
| Main Challenge | Text |
| Services Interested | Text |
| Monthly Revenue | Dropdown |
| Ad Budget | Dropdown |
| Lead Score | Number |
| Funnel Source | Text |

---

## STEP 5 — CREATE THE SNAPSHOT

Once your system is built and tested:

1. Go to **Settings → Snapshots → + Create Snapshot**
2. Select: Workflows, Pipelines, Custom Fields, Email Templates, SMS Templates
3. Name it: `SLP Media — Growth System v1`
4. Save it

**To deploy to a client sub-account:**
1. Go to the client's sub-account
2. Settings → Snapshots → Load Snapshot → select `SLP Media — Growth System v1`
3. Done — all pipelines, workflows and custom fields are copied over instantly
4. Update the webhook URL in `funnel.html` with the new sub-account's webhook URL
5. Run `node deploy-client.js client-config.js` to generate their branded funnel

---

## STEP 6 — CLIENT ONBOARDING CHECKLIST

- [ ] Create new sub-account in GHL
- [ ] Load `SLP Media — Growth System v1` snapshot
- [ ] Copy inbound webhook URL from the sub-account workflow
- [ ] Fill in `client-config-template.js` with client details
- [ ] Run `node deploy-client.js client-config-clientname.js`
- [ ] Upload generated `funnel-clientname.html` to their hosting
- [ ] Connect their Calendly to the funnel
- [ ] Test one lead submission end-to-end
- [ ] Update workflow SMS/email with client's name and branding
- [ ] Set up client's Google Ads / Meta Ads → point to funnel URL

---

## FUNNEL DATA SENT TO GHL

Every time someone completes the funnel, GHL receives:

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@example.com",
  "phone": "07911123456",
  "companyName": "Smith's Plumbing",
  "businessType": "Trades & Construction",
  "mainChallenge": "Not enough leads",
  "servicesWanted": "Meta Ads, Google Ads",
  "monthlyRevenue": "£5k–£15k/mo",
  "monthlyAdBudget": "£1,500–£3,000/mo",
  "leadScore": 75,
  "source": "meta-ads",
  "tags": ["meta-ads", "funnel-lead", "£1,500–£3,000/mo"],
  "submittedAt": "2026-04-10T12:00:00.000Z"
}
```

The `leadScore` (0–100) is calculated from budget + revenue + services selected, so you can prioritise high-value leads instantly in your pipeline.
