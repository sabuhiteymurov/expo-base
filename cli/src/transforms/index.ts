import type { UserChoices } from '../types';
import { runCleanup } from './cleanup';
import { transformPackageJson } from './package-json';
import { transformAppConfig } from './app-config';
import { transformProviders } from './providers';
import { transformRootLayout } from './root-layout';
import { transformTabsLayout } from './tabs-layout';
import { transformScreens } from './screens';
import { transformBabelConfig } from './babel-config';
import { transformEslintConfig } from './eslint-config';
import { transformEasJson } from './eas-json';

export async function runTransforms(
  projectDir: string,
  choices: UserChoices,
): Promise<void> {
  const { projectName, bundleIdPrefix, features } = choices;

  // 1. Delete files/folders for deselected features
  await runCleanup(projectDir, features);

  // 2. Update package.json (name, remove deps/scripts)
  await transformPackageJson(projectDir, projectName, features);

  // 3. Update app.config.ts (name/slug/scheme/bundleId, remove plugins)
  await transformAppConfig(projectDir, projectName, bundleIdPrefix, features);

  // 4. Remove Redux Provider wrapper if state-management deselected
  await transformProviders(projectDir, features);

  // 5. Clean root layout (NetInfo, i18n import, store imports)
  await transformRootLayout(projectDir, features);

  // 6. Clean tabs layout (i18n, SVG icons)
  await transformTabsLayout(projectDir, features);

  // 7. Clean screens (t() calls, dispatch, changeLang)
  await transformScreens(projectDir, features);

  // 8. Remove reanimated plugin from babel config
  await transformBabelConfig(projectDir, features);

  // 9. Remove detox from eslint config
  await transformEslintConfig(projectDir, features);

  // 10. Remove test profiles from eas.json
  await transformEasJson(projectDir, features);
}
