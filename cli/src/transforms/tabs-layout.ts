import type { FeatureId } from '../types';
import { pathExists, readFile, resolve, writeFile } from '../utils/fs';

export async function transformTabsLayout(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  const filePath = resolve(
    projectDir,
    'src/app/(dashboard)/(tabs)/_layout.tsx',
  );
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  // Remove i18n if deselected
  if (!selectedFeatures.includes('i18n')) {
    content = content.replace(
      /import \{ useTranslation \} from 'react-i18next';\n/,
      '',
    );
    // Remove the useTranslation hook call
    content = content.replace(/\s*const \{ t \} = useTranslation\(\);\n/, '\n');
    // Replace t('home:title') → 'Home', t('profile:title') → 'Profile'
    content = content.replace(/t\('home:title'\)/g, "'Home'");
    content = content.replace(/t\('profile:title'\)/g, "'Profile'");
  }

  // Remove SVG if ui-kit deselected
  if (!selectedFeatures.includes('ui-kit')) {
    content = content.replace(
      /import \{ SvgXml \} from 'react-native-svg';\n/,
      '',
    );
    content = content.replace(
      /import \{\n\s*homeActiveIcon,\n\s*homeIcon,\n\s*profileActiveIcon,\n\s*profileIcon,\n\} from 'assets\/svg';\n/,
      '',
    );

    // Remove tabBarIcon properties
    content = content.replace(
      /\s*tabBarIcon: \(\{ focused \}\) => \(\n\s*<SvgXml[\s\S]*?\/>\n\s*\),\n/g,
      '\n',
    );
  }

  await writeFile(filePath, content);
}
