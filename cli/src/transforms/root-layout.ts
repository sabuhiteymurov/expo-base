import type { FeatureId } from '../types';
import { pathExists, readFile, resolve, writeFile } from '../utils/fs';

export async function transformRootLayout(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  const filePath = resolve(projectDir, 'src/app/_layout.tsx');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  // Remove i18n import if i18n deselected
  if (!selectedFeatures.includes('i18n')) {
    content = content.replace(/import '\.\.\/translations';\n/, '');
  }

  // Remove state-management imports and code if deselected
  if (!selectedFeatures.includes('state-management')) {
    content = content.replace(
      /import \{ store \} from '\.\.\/store';\n/,
      '',
    );
    content = content.replace(
      /import \{ setIsConnectedToInternet \} from 'store\/slices\/appSlice';\n/,
      '',
    );
  }

  // Remove NetInfo import and useEffect if network-info deselected OR state-management deselected
  // (the NetInfo useEffect dispatches to Redux store, so it needs both)
  if (
    !selectedFeatures.includes('network-info') ||
    !selectedFeatures.includes('state-management')
  ) {
    content = content.replace(
      /import NetInfo from '@react-native-community\/netinfo';\n/,
      '',
    );

    // Remove the entire "Check internet connectivity" useEffect block
    content = content.replace(
      /\s*\/\/ Check internet connectivity\n\s*useEffect\(\(\) => \{[\s\S]*?unsubscribeNetInfo\(\);\n\s*\}, \[\]\);\n/,
      '\n',
    );
  }

  await writeFile(filePath, content);
}
