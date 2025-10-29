const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting backend server...');

const backendPath = path.join(__dirname, 'backend');
const backendProcess = spawn('npm', ['start'], {
  cwd: backendPath,
  stdio: 'inherit',
  shell: true
});

backendProcess.on('error', (error) => {
  console.error('❌ Failed to start backend:', error);
});

backendProcess.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down backend...');
  backendProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down backend...');
  backendProcess.kill('SIGTERM');
  process.exit(0);
});
