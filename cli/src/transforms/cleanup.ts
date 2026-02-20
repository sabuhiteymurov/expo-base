import { FEATURE_GROUPS } from '../constants';
import type { FeatureId } from '../types';
import { removeDir, removeFile, resolve } from '../utils/fs';

export async function runCleanup(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  const deselected = FEATURE_GROUPS.filter(
    f => !selectedFeatures.includes(f.id),
  );

  for (const feature of deselected) {
    for (const filePath of feature.files) {
      const full = resolve(projectDir, filePath);
      if (filePath.endsWith('/')) {
        await removeDir(full);
      } else {
        await removeFile(full);
      }
    }
  }
}
