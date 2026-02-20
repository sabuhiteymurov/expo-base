import type { FeatureId } from '../types';
import { pathExists, readFile, resolve, writeFile } from '../utils/fs';

export async function transformProviders(
  projectDir: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  if (selectedFeatures.includes('state-management')) return;

  const filePath = resolve(projectDir, 'src/context/providers.tsx');
  if (!(await pathExists(filePath))) return;

  let content = await readFile(filePath);

  // Remove Redux imports
  content = content.replace(
    /import \{ Provider \} from 'react-redux';\n/,
    '',
  );
  content = content.replace(
    /import \{ store \} from '\.\.\/store';\n/,
    '',
  );

  // Replace <Provider store={store}>{children}</Provider> with just {children}
  content = content.replace(
    /<Provider store=\{store\}>\{children\}<\/Provider>/,
    '{children}',
  );

  await writeFile(filePath, content);
}
