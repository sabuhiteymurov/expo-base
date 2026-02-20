import { FEATURE_GROUPS } from '../constants';
import type { FeatureId } from '../types';
import { readFile, resolve, writeFile } from '../utils/fs';
import { toBundleId } from '../utils/validate';

export async function transformAppConfig(
  projectDir: string,
  projectName: string,
  bundleIdPrefix: string,
  selectedFeatures: FeatureId[],
): Promise<void> {
  const configPath = resolve(projectDir, 'app.config.ts');
  let content = await readFile(configPath);

  const bundleId = toBundleId(bundleIdPrefix, projectName);
  const slug = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');

  // Update name, slug, scheme
  content = content.replace(
    /name: 'expo-base'/,
    `name: '${projectName}'`,
  );
  content = content.replace(
    /slug: 'expo-base'/,
    `slug: '${slug}'`,
  );
  content = content.replace(
    /scheme: 'expo-base'/,
    `scheme: '${slug}'`,
  );

  // Update bundle identifiers
  content = content.replace(
    /bundleIdentifier: '[^']+'/,
    `bundleIdentifier: '${bundleId}'`,
  );
  content = content.replace(
    /package: '[^']+'/,
    `package: '${bundleId}'`,
  );

  // Remove plugins for deselected features (scoped to the plugins array)
  const deselected = FEATURE_GROUPS.filter(
    f => !selectedFeatures.includes(f.id),
  );

  const pluginsToRemove = deselected.flatMap(f => f.plugins);
  if (pluginsToRemove.length > 0) {
    content = content.replace(
      /(plugins:\s*\[)([\s\S]*?)(\])/,
      (_, open, body, close) => {
        let pluginsBody = body;
        for (const plugin of pluginsToRemove) {
          // Remove array-style plugin entry: ['plugin-name', { ... }],
          const arrayPluginRegex = new RegExp(
            `\\s*\\[\\s*'${escapeRegex(plugin)}'[\\s\\S]*?\\],?\\n?`,
          );
          pluginsBody = pluginsBody.replace(arrayPluginRegex, '\n');

          // Remove string-style plugin entry: 'plugin-name',
          const stringPluginRegex = new RegExp(
            `\\s*'${escapeRegex(plugin)}',?\\n?`,
          );
          pluginsBody = pluginsBody.replace(stringPluginRegex, '\n');
        }
        return `${open}${pluginsBody}${close}`;
      },
    );
  }

  await writeFile(configPath, content);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
