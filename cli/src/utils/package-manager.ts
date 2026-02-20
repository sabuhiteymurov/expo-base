import { execSync } from 'node:child_process';
import type { PackageManager } from '../types';

export function installDeps(
  projectDir: string,
  pm: PackageManager,
): void {
  const cmd = pm === 'yarn' ? 'yarn install' : `${pm} install`;
  execSync(cmd, {
    cwd: projectDir,
    stdio: 'ignore',
  });
}
