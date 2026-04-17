// ─────────────────────────────────────────────────────────────────────────────
//  SLP MEDIA — CLIENT DEPLOYMENT CONFIG
//  Copy this file for each new client. Fill in the values below.
//  Then run: node deploy-client.js <config-file>
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {

  // ── BRANDING ────────────────────────────────────────────────────────────
  businessName:    'CLIENT BUSINESS NAME',      // e.g. "Joe's Plumbing"
  industry:        'CLIENT INDUSTRY',           // e.g. "Plumbing & Heating"
  tagline:         'CLIENT TAGLINE',            // e.g. "More Leads. More Jobs."
  primaryColor:    '#00f0ff',                   // hex — defaults to SLP cyan
  logoText:        'CLIENT',                    // short name shown in nav

  // ── CALENDLY ────────────────────────────────────────────────────────────
  calendlyUrl:     'https://calendly.com/YOUR_LINK/strategy-call',

  // ── GHL ─────────────────────────────────────────────────────────────────
  ghlWebhookUrl:   'https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID',
  funnelSource:    'meta-ads',   // tag in GHL: 'meta-ads' | 'website' | 'referral'

  // ── FUNNEL COPY ──────────────────────────────────────────────────────────
  funnelHeadline:  'Get Your Free Growth Strategy',
  funnelSubline:   'Answer 6 quick questions — we\'ll build a custom plan for your business.',
  ctaButtonText:   'Get My Free Strategy →',

  // ── SOCIAL PROOF ────────────────────────────────────────────────────────
  reviewText:      '"Very professional and results driven"',
  reviewAuthor:    'Peter R.',
  reviewSource:    'Google Review',

  // ── QUALIFYING QUESTIONS ─────────────────────────────────────────────────
  // Customise the options shown to prospects
  businessTypes: [
    'Local Service Business',
    'E-commerce / Product',
    'Trades & Construction',
    'Health & Wellness',
    'Professional Services',
    'Other',
  ],
  challenges: [
    'Not enough leads',
    'Low conversion rate',
    'No online presence',
    'Inconsistent revenue',
    'Can\'t scale operations',
    'Need better automation',
  ],
  services: [
    'Meta / Facebook Ads',
    'Google Ads',
    'Website / Funnel',
    'AI Automation',
    'Social Media',
    'Full Growth System',
  ],
  budgetOptions: [
    'Under £500/mo',
    '£500–£1,500/mo',
    '£1,500–£3,000/mo',
    '£3,000–£5,000/mo',
    '£5,000+/mo',
  ],
  revenueOptions: [
    'Under £2k/mo',
    '£2k–£5k/mo',
    '£5k–£15k/mo',
    '£15k–£50k/mo',
    '£50k+/mo',
  ],

  // ── OUTPUT ───────────────────────────────────────────────────────────────
  outputFile: 'funnel-CLIENT_NAME.html',  // name of the generated file
};
