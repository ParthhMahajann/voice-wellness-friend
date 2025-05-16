const fs = require('fs');
const path = require('path');

const apiRoutes = [
  {
    path: 'dialogflow/route.ts',
    requiredExports: ['POST'],
    description: 'Dialogflow API endpoint',
  },
  {
    path: 'speech-to-text/route.ts',
    requiredExports: ['POST'],
    description: 'Speech to Text API endpoint',
  },
  {
    path: 'tts/route.ts',
    requiredExports: ['GET'],
    description: 'Text to Speech API endpoint',
  },
];

function verifyApiRoute(route) {
  const apiDir = path.join(__dirname, '../src/app/api');
  const routePath = path.join(apiDir, route.path);
  
  if (!fs.existsSync(routePath)) {
    console.error(`❌ Missing API route file: ${routePath}`);
    return false;
  }

  const content = fs.readFileSync(routePath, 'utf8');
  const hasRequiredExports = route.requiredExports.every(method => 
    content.includes(`export async function ${method}`)
  );

  if (!hasRequiredExports) {
    console.error(`❌ API route ${route.path} is missing required exports: ${route.requiredExports.join(', ')}`);
    return false;
  }

  // Check for error handling
  const hasErrorHandling = content.includes('try') && content.includes('catch');
  if (!hasErrorHandling) {
    console.warn(`⚠️ API route ${route.path} might be missing error handling`);
  }

  // Check for authentication
  const hasAuthCheck = content.includes('getServerSession') || content.includes('auth');
  if (!hasAuthCheck) {
    console.warn(`⚠️ API route ${route.path} might be missing authentication check`);
  }

  return true;
}

function verifyApiRoutes() {
  console.log('🔍 Verifying API routes...\n');

  let allValid = true;
  apiRoutes.forEach(route => {
    console.log(`\nVerifying ${route.path} (${route.description}):`);
    const isValid = verifyApiRoute(route);
    if (isValid) {
      console.log('✅ API route is properly set up');
    }
    allValid = allValid && isValid;
  });

  if (allValid) {
    console.log('\n✨ All API routes are properly set up!');
  } else {
    console.error('\n❌ Some API routes need attention. Please check the errors above.');
    process.exit(1);
  }
}

verifyApiRoutes(); 