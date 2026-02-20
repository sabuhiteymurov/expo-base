import type { FeatureId } from '../types';
import { pathExists, readFile, resolve, writeFile } from '../utils/fs';

export async function transformBabelConfig(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('animations')) return;

  const filePath = resolve(projectDir, 'babel.config.js');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  // Remove the reanimated plugin and its comment
  content = content.replace(
    /\s*\/\/ Required for react-native-reanimated\n\s*'react-native-reanimated\/plugin',\n/,
    '',
  );

  // If plugins array is now empty, simplify
  content = content.replace(
    /\s*plugins: \[\s*\],\n/,
    '\n',
  );

  await writeFile(filePath, content);
}
