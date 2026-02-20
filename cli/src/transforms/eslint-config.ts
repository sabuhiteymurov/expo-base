import type { FeatureId } from '../types';
import { pathExists, readFile, resolve, writeFile } from '../utils/fs';

export async function transformEslintConfig(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('e2e-testing')) return;

  const filePath = resolve(projectDir, '.eslintrc.js');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  // Remove 'detox' from plugins array
  content = content.replace(/, 'detox'/, '');
  content = content.replace(/'detox', /, '');
  content = content.replace(/'detox'/, '');

  await writeFile(filePath, content);
}
