#!/usr/bin/env node

/**
 * Translation Completeness Checker
 * Agent 4: Ensures 100% translation coverage between EN and AR
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// Load translation files
const enPath = path.join(__dirname, '../src/locales/en.json');
const arPath = path.join(__dirname, '../src/locales/ar.json');

let en, ar;

try {
  en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));
} catch (error) {
  console.error(`${colors.red}❌ Error loading translation files:${colors.reset}`);
  console.error(error.message);
  process.exit(1);
}

// Get all keys
const enKeys = Object.keys(en).sort();
const arKeys = Object.keys(ar).sort();

// Find missing keys
const missingInAr = enKeys.filter(key => !arKeys.includes(key));
const missingInEn = arKeys.filter(key => !enKeys.includes(key));

// Check for empty values
const emptyInEn = enKeys.filter(key => !en[key] || en[key].trim() === '');
const emptyInAr = arKeys.filter(key => !ar[key] || ar[key].trim() === '');

console.log(`${colors.bold}${colors.cyan}╔════════════════════════════════════════════╗${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}║  Agent 4: Translation Completeness Check  ║${colors.reset}`);
console.log(`${colors.bold}${colors.cyan}╚════════════════════════════════════════════╝${colors.reset}\n`);

let hasErrors = false;

// Check for missing keys in Arabic
if (missingInAr.length > 0) {
  hasErrors = true;
  console.log(`${colors.red}❌ Missing in Arabic (ar.json):${colors.reset}`);
  missingInAr.forEach(key => {
    console.log(`   ${colors.yellow}[${key}]${colors.reset} "${en[key]}"`);
  });
  console.log();
}

// Check for missing keys in English
if (missingInEn.length > 0) {
  hasErrors = true;
  console.log(`${colors.red}❌ Missing in English (en.json):${colors.reset}`);
  missingInEn.forEach(key => {
    console.log(`   ${colors.yellow}[${key}]${colors.reset} "${ar[key]}"`);
  });
  console.log();
}

// Check for empty values in English
if (emptyInEn.length > 0) {
  hasErrors = true;
  console.log(`${colors.red}❌ Empty values in English (en.json):${colors.reset}`);
  emptyInEn.forEach(key => {
    console.log(`   ${colors.yellow}[${key}]${colors.reset}`);
  });
  console.log();
}

// Check for empty values in Arabic
if (emptyInAr.length > 0) {
  hasErrors = true;
  console.log(`${colors.red}❌ Empty values in Arabic (ar.json):${colors.reset}`);
  emptyInAr.forEach(key => {
    console.log(`   ${colors.yellow}[${key}]${colors.reset}`);
  });
  console.log();
}

// If no missing keys, show success
if (missingInAr.length === 0 && missingInEn.length === 0 && emptyInEn.length === 0 && emptyInAr.length === 0) {
  console.log(`${colors.green}✅ Translation key parity: 100%${colors.reset}`);
  console.log(`   Total keys: ${colors.bold}${enKeys.length}${colors.reset}`);
  console.log();
}

// Check for Arabic characters in ar.json
let arabicWarnings = 0;
const arabicRegex = /[\u0600-\u06FF]/; // Arabic Unicode range
const exceptionsRegex = /^(EN|AR|\.{3})$/; // Exceptions: "EN", "AR", "..."

console.log(`${colors.cyan}Validating Arabic text quality...${colors.reset}`);

arKeys.forEach(key => {
  const value = ar[key];

  // Skip keys that are expected to be in English
  if (exceptionsRegex.test(value)) return;

  // Check if value contains Arabic characters
  if (!arabicRegex.test(value)) {
    arabicWarnings++;
    console.log(`   ${colors.yellow}⚠️  [${key}]${colors.reset} "${value}" ${colors.yellow}(no Arabic characters)${colors.reset}`);
  }
});

if (arabicWarnings === 0) {
  console.log(`${colors.green}✅ Arabic text validation: Passed${colors.reset}`);
} else {
  console.log(`${colors.yellow}⚠️  Arabic text validation: ${arabicWarnings} warning(s)${colors.reset}`);
}

console.log();

// Summary
console.log(`${colors.bold}${colors.cyan}Summary:${colors.reset}`);
console.log(`  English keys:  ${enKeys.length}`);
console.log(`  Arabic keys:   ${arKeys.length}`);
console.log(`  Missing in AR: ${missingInAr.length}`);
console.log(`  Missing in EN: ${missingInEn.length}`);
console.log(`  Empty in EN:   ${emptyInEn.length}`);
console.log(`  Empty in AR:   ${emptyInAr.length}`);
console.log(`  AR warnings:   ${arabicWarnings}`);
console.log();

// Final result
if (hasErrors) {
  console.log(`${colors.red}${colors.bold}❌ Translation check FAILED${colors.reset}`);
  console.log(`${colors.red}   Fix missing/empty keys before committing.${colors.reset}\n`);
  process.exit(1);
} else {
  console.log(`${colors.green}${colors.bold}✅ Translation check PASSED${colors.reset}`);
  console.log(`${colors.green}   All keys present in both languages.${colors.reset}\n`);
  process.exit(0);
}
