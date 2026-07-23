import { FEATURE_GROUPS } from '../constants';
import type { FeatureId } from '../types';
import { readJson, resolve, writeJson } from '../utils/fs';

export async function transformPackageJson(
  projectDir: string,
  projectName: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  const pkgPath = resolve(projectDir, 'package.json');
  const pkg = await readJson<Record<string, any>>(pkgPath);

  pkg.name = projectName;
  pkg.version = '1.0.0';

  const deselected = FEATURE_GROUPS.filter(
    f => !selectedFeatures.includes(f.id),
  );

  // Remove deps and devDeps
  for (const feature of deselected) {
    for (const dep of feature.deps) {
      delete pkg.dependencies?.[dep];
    }
    for (const dep of feature.devDeps) {
      delete pkg.devDependencies?.[dep];
    }
    for (const script of feature.scripts) {
      delete pkg.scripts?.[script];
    }
  }

  // If e2e-testing removed, clean up lint scripts to not reference ./e2e
  if (!selectedFeatures.includes('e2e-testing')) {
    for (const script of ['lint', 'lint:check']) {
      if (pkg.scripts?.[script]) {
        pkg.scripts[script] = pkg.scripts[script].replace(' ./e2e', '');
      }
    }
  }

  // If ui-kit removed, also remove postinstall-related devDeps and scripts
  // (already handled by feature.scripts and feature.devDeps above)

  await writeJson(pkgPath, pkg);
}
