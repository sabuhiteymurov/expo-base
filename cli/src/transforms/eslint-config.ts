import type { FeatureId } from '../types';
import { pathExists, readFile, resolve, writeFile } from '../utils/fs';

const DETOX_E2E_BLOCK = `  {
    files: ['e2e/**'],
    languageOptions: {
      globals: {
        device: 'readonly',
        element: 'readonly',
        by: 'readonly',
        waitFor: 'readonly',
        detox: 'readonly',
      },
    },
  },
`;

export async function transformEslintConfig(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('e2e-testing')) return;

  const filePath = resolve(projectDir, 'eslint.config.js');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  // Remove the detox globals block for e2e tests
  content = content.replace(DETOX_E2E_BLOCK, '');

  // Drop the e2e tsconfig from type-aware linting
  content = content.replace(", './e2e/tsconfig.json'", '');

  await writeFile(filePath, content);
}
