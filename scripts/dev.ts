import { execSync } from 'child_process';
import fs from 'fs';

// Check if .env.development.local exists, create if not
if (!fs.existsSync('.env.development.local')) {
  console.log('Creating .env.development.local file...');
  fs.copyFileSync('.env', '.env.development.local');
}

// Try to get GitHub token from GitHub CLI
try {
  const githubToken = execSync('gh auth token').toString().trim();
  console.log('✅ Using GitHub token from GitHub CLI');
  
  // Update the .env.development.local file with the token
  let envContent = fs.readFileSync('.env.development.local', 'utf8');
  
  // Replace or add GITHUB_TOKEN
  if (envContent.includes('GITHUB_TOKEN=')) {
    envContent = envContent.replace(/GITHUB_TOKEN=.*\n/g, `GITHUB_TOKEN=${githubToken}\n`);
  } else {
    envContent += `\nGITHUB_TOKEN=${githubToken}\n`;
  }
  
  fs.writeFileSync('.env.development.local', envContent);
} catch (error) {
  console.warn('⚠️ Could not get GitHub token from GitHub CLI. Make sure you\'re logged in with: gh auth login');
  console.warn('⚠️ Using existing token from .env.development.local if available');
}

// Start development server
console.log('🚀 Starting Next.js development server...');
execSync('next dev --turbo', { stdio: 'inherit' });