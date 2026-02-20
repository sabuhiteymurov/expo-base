import { execSync } from 'node:child_process';

export function gitInit(projectDir: string): void {
  execSync('git init', { cwd: projectDir, stdio: 'ignore' });
  execSync('git add -A', { cwd: projectDir, stdio: 'ignore' });
  execSync('git commit -m "Initial commit from create-expo-base"', {
    cwd: projectDir,
    stdio: 'ignore',
  });
}
