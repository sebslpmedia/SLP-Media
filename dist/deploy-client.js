#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
//  SLP MEDIA — CLIENT FUNNEL DEPLOYER
//  Usage: node deploy-client.js client-config-template.js
//  Output: a ready-to-host funnel.html branded for the client
// ─────────────────────────────────────────────────────────────────────────────

const fs   = require('fs');
const path = require('path');

const configFile = process.argv[2];
if (!configFile) {
  console.error('Usage: node deploy-client.js <config-file.js>');
  process.exit(1);
}

const cfg = require(path.resolve(configFile));
console.log(`\n🚀 Deploying funnel for: ${cfg.businessName}\n`);

// Read the master funnel template
const templatePath = path.join(__dirname, 'funnel.html');
let html = fs.readFileSync(templatePath, 'utf8');

// ── Inject CLIENT_CONFIG block ───────────────────────────────────────────────
const configBlock = `    const CLIENT_CONFIG = {
      businessName:  '${cfg.businessName}',
      calendlyUrl:   '${cfg.calendlyUrl}',
      ghlWebhookUrl: '${cfg.ghlWebhookUrl}',
      funnelSource:  '${cfg.funnelSource}',
    };`;

html = html.replace(
  /const CLIENT_CONFIG = \{[\s\S]*?\};/,
  configBlock
);

// ── Branding ─────────────────────────────────────────────────────────────────
html = html.replace(/SLP Media/g, cfg.businessName);
html = html.replace(/<span class="text-slp-cyan">SLP<\/span><span class="text-white ml-1 font-mono">MEDIA<\/span>/g,
  `<span class="text-slp-cyan">${cfg.logoText}</span>`);

// Primary colour
if (cfg.primaryColor && cfg.primaryColor !== '#00f0ff') {
  html = html.replace(/#00f0ff/g, cfg.primaryColor);
  html = html.replace(/rgba\(0,240,255/g, hexToRgba(cfg.primaryColor));
}

// Funnel headline & sub
if (cfg.funnelHeadline) {
  html = html.replace(
    /Get Your Free <span[^>]*>AI-Powered<\/span> Growth Audit/,
    cfg.funnelHeadline
  );
}
if (cfg.funnelSubline) {
  html = html.replace(
    /Answer 6 quick questions[^<]*/,
    cfg.funnelSubline
  );
}
if (cfg.ctaButtonText) {
  html = html.replace(/Get My Free Audit →/g, cfg.ctaButtonText);
}

// CTA button
if (cfg.ctaButtonText) {
  html = html.replace(/Get My Free Audit →/g, cfg.ctaButtonText);
}

// Review
if (cfg.reviewText) {
  html = html.replace(/"Very professional and results driven"/g, cfg.reviewText);
}
if (cfg.reviewAuthor) {
  html = html.replace(/Peter R\./g, cfg.reviewAuthor);
}

// Calendly widget URL
html = html.replace(
  /https:\/\/calendly\.com\/slp-media-demo\/strategy-call[^"']*/g,
  cfg.calendlyUrl
);

// ── Write output ──────────────────────────────────────────────────────────────
const outName   = cfg.outputFile.replace('CLIENT_NAME', cfg.businessName.replace(/\s+/g, '-').toLowerCase());
const outPath   = path.join(__dirname, outName);
fs.writeFileSync(outPath, html, 'utf8');

console.log(`✅ Funnel created: ${outName}`);
console.log(`📋 GHL Webhook:    ${cfg.ghlWebhookUrl || '⚠️  NOT SET — add webhook URL to config'}`);
console.log(`📅 Calendly:       ${cfg.calendlyUrl}`);
console.log(`🏷️  Source tag:     ${cfg.funnelSource}`);
console.log(`\n✅ Upload ${outName} to the client's hosting folder and you're live.\n`);

// ── Helpers ───────────────────────────────────────────────────────────────────
function hexToRgba(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b}`;
}
