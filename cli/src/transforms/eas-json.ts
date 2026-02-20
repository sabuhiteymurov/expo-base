import type { FeatureId } from '../types';
import { pathExists, readJson, resolve, writeJson } from '../utils/fs';

export async function transformEasJson(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('e2e-testing')) return;

  const filePath = resolve(projectDir, 'eas.json');
  if (!(await pathExists(filePath))) return;

  const eas = await readJson<Record<string, any>>(filePath);

  delete eas.build?.test;
  delete eas.build?.test_debug;

  await writeJson(filePath, eas);
}
