#!/usr/bin/env node

const { execSync } = require('child_process');

const command = process.argv[2];

if (command !== 'fmt') {
  console.log('Usage: ktu fmt');
  console.log('  Formats all supported files in current directory with Prettier');
  process.exit(1);
}

console.log('ktu fmt – formatting current directory...');

try {
  execSync('npx prettier . --write --ignore-unknown', {
    stdio: 'inherit',
    cwd: process.cwd(),
  });

  console.log('\nktu fmt: Done.');
  process.exit(0);
} catch (err) {
  // Let npx/prettier error messages bubble up naturally
  // (syntax errors, permission issues, etc.)
  console.error('\nktu fmt failed.');
  process.exit(err.status || 1);
}