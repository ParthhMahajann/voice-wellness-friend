const fs = require('fs');
const path = require('path');

const routes = [
  {
    path: '/',
    description: 'Home page',
    requiredFiles: ['page.tsx'],
    optionalFiles: ['loading.tsx', 'error.tsx'],
  },
  {
    path: '/profile',
    description: 'Profile page',
    requiredFiles: ['page.tsx'],
    optionalFiles: ['loading.tsx', 'error.tsx'],
    requiresAuth: true,
  },
  {
    path: '/session',
    description: 'Therapy session page',
    requiredFiles: ['page.tsx'],
    optionalFiles: ['loading.tsx', 'error.tsx'],
    requiresAuth: true,
  },
  {
    path: '/history',
    description: 'Session history page',
    requiredFiles: ['page.tsx'],
    optionalFiles: ['loading.tsx', 'error.tsx'],
    requiresAuth: true,
  },
  {
    path: '/resources',
    description: 'Resources page',
    requiredFiles: ['page.tsx'],
    optionalFiles: ['loading.tsx', 'error.tsx'],
  },
];

function checkRouteFiles(route) {
  const appDir = path.join(__dirname, '../src/app');
  const routePath = path.join(appDir, route.path.replace(/^\//, ''));
  
  console.log(`\nChecking ${route.path} (${route.description}):`);

  // Check required files
  let allRequiredFilesExist = true;
  route.requiredFiles.forEach(file => {
    const filePath = path.join(routePath, file);
    const exists = fs.existsSync(filePath);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    allRequiredFilesExist = allRequiredFilesExist && exists;
  });

  // Check optional files
  route.optionalFiles.forEach(file => {
    const filePath = path.join(routePath, file);
    const exists = fs.existsSync(filePath);
    console.log(`${exists ? '✅' : '⚠️'} ${file} (optional)`);
  });

  if (route.requiresAuth) {
    console.log('ℹ️  Requires authentication');
  }

  return allRequiredFilesExist;
}

function testRoutes() {
  console.log('🔍 Testing routes...\n');

  let allRoutesValid = true;
  routes.forEach(route => {
    const isValid = checkRouteFiles(route);
    allRoutesValid = allRoutesValid && isValid;
  });

  // Check for old pages directory
  const pagesDir = path.join(__dirname, '../src/pages');
  if (fs.existsSync(pagesDir)) {
    console.log('\n⚠️  Warning: Old pages directory still exists. Consider running cleanup script.');
  }

  if (allRoutesValid) {
    console.log('\n✨ All routes are properly set up!');
  } else {
    console.error('\n❌ Some routes need attention. Please check the errors above.');
    process.exit(1);
  }
}

testRoutes(); 