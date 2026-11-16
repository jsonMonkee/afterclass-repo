import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const task = process.argv[2];
const root = process.cwd();
const venvPython = process.platform === 'win32'
  ? resolve(root, 'backend/.venv/Scripts/python.exe')
  : resolve(root, 'backend/.venv/bin/python');
const python = existsSync(venvPython) ? venvPython : 'python';

const tasks = {
  dev: ['-m', 'uvicorn', 'app.main:app', '--reload', '--port', '8100', '--app-dir', 'backend'],
  test: ['-m', 'pytest', 'backend/tests'],
};

if (!tasks[task]) {
  console.error('Usage: node scripts/run-backend.mjs <dev|test>');
  process.exit(2);
}

const child = spawn(python, tasks[task], { cwd: root, stdio: 'inherit', shell: false });
child.on('error', error => {
  console.error(`Could not start Python: ${error.message}`);
  process.exitCode = 1;
});
child.on('exit', (code, signal) => {
  process.exitCode = signal ? 1 : (code ?? 1);
});
