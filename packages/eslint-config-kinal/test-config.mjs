/**
 * Test script to verify the ESLint config loads correctly
 */

try {
  const config = await import('./index.js');
  
  if (!Array.isArray(config.default)) {
    throw new Error('Config should export an array');
  }
  
  console.log('✅ Config loaded successfully!');
  console.log(`   Total config objects: ${config.default.length}`);
  
  // Check for required configs
  const hasIgnores = config.default.some(c => c.ignores && !c.files);
  const hasRules = config.default.some(c => c.rules);
  const hasPlugins = config.default.some(c => c.plugins);
  
  console.log(`   Has global ignores: ${hasIgnores}`);
  console.log(`   Has rules: ${hasRules}`);
  console.log(`   Has plugins: ${hasPlugins}`);
  
  if (!hasIgnores || !hasRules) {
    throw new Error('Config is missing required sections');
  }
  
  console.log('\n✅ All checks passed!');
  process.exit(0);
} catch (error) {
  console.error('❌ Config validation failed:', error.message);
  if (error.stack) {
    console.error(error.stack);
  }
  process.exit(1);
}
