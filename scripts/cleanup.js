const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const appDir = path.join(__dirname, '../src/app');

// Files to keep (if any)
const keepFiles = [
  'api/dialogflow.ts', // Keep this until we confirm the new API route is working
];

// Function to check if a file should be kept
function shouldKeepFile(filePath) {
  const relativePath = path.relative(pagesDir, filePath);
  return keepFiles.includes(relativePath);
}

// Function to recursively delete a directory
function deleteDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectory(curPath);
      } else if (!shouldKeepFile(curPath)) {
        fs.unlinkSync(curPath);
      }
    });
    if (dirPath !== pagesDir) {
      fs.rmdirSync(dirPath);
    }
  }
}

// Main cleanup function
function cleanup() {
  console.log('Starting cleanup of old pages directory...');
  
  // Delete the pages directory contents
  deleteDirectory(pagesDir);
  
  console.log('Cleanup complete!');
  console.log('Note: Make sure all routes have been properly migrated to the App Router before deleting the pages directory.');
}

cleanup(); 