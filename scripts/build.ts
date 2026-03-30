// build.js
const { execSync } = require('child_process');
const fs = require('fs');

// Get GitHub token from GitHub CLI
let githubToken;
try {
  githubToken = execSync('gh auth token').toString().trim();
  console.log('✅ GitHub token retrieved from GitHub CLI');
} catch (error) {
  console.error('❌ Failed to get GitHub token. Make sure you\'re logged in with: gh auth login');
  process.exit(1);
}

// Create a temporary .env.build file with the token
const envContent = fs.readFileSync('.env.development.local', 'utf8');
const updatedEnvContent = `${envContent}\nGITHUB_TOKEN=${githubToken}\n`;
fs.writeFileSync('.env.build', updatedEnvContent);

try {
  // Run the build with the temporary env file
  console.log('🏗️ Starting build process...');
  execSync('dotenv -e .env.build -- next build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
} finally {
  // Clean up temporary env file
  fs.unlinkSync('.env.build');
  console.log('🧹 Cleaned up temporary environment file');
}