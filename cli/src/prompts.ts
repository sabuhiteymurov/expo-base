import * as p from '@clack/prompts';
import pc from 'picocolors';
import { FEATURE_GROUPS } from './constants';
import type { FeatureId, PackageManager, UserChoices } from './types';
import { validateBundleIdPrefix, validateProjectName } from './utils/validate';

export async function runPrompts(
  defaultProjectName?: string,
): Promise<UserChoices> {
  const projectName = (await p.text({
    message: 'What will your project be called?',
    placeholder: 'my-awesome-app',
    initialValue: defaultProjectName,
    validate: value => validateProjectName(value),
  })) as string;

  if (p.isCancel(projectName)) process.exit(0);

  const bundleIdPrefix = (await p.text({
    message: 'Bundle identifier prefix? (e.g., com.company)',
    placeholder: 'com.mycompany',
    validate: value => validateBundleIdPrefix(value),
  })) as string;

  if (p.isCancel(bundleIdPrefix)) process.exit(0);

  const features = (await p.multiselect({
    message: 'Which features would you like to include?',
    options: FEATURE_GROUPS.map(f => ({
      value: f.id,
      label: f.label,
      hint: f.description,
    })),
    initialValues: FEATURE_GROUPS.map(f => f.id),
    required: false,
  })) as FeatureId[];

  if (p.isCancel(features)) process.exit(0);

  const packageManager = (await p.select({
    message: 'Which package manager?',
    options: [
      { value: 'yarn', label: 'yarn' },
      { value: 'npm', label: 'npm' },
      { value: 'pnpm', label: 'pnpm' },
      { value: 'bun', label: 'bun' },
    ],
  })) as PackageManager;

  if (p.isCancel(packageManager)) process.exit(0);

  const initGit = (await p.confirm({
    message: 'Initialize a git repository?',
    initialValue: true,
  })) as boolean;

  if (p.isCancel(initGit)) process.exit(0);

  p.log.info(
    `${pc.bold(projectName)} with ${pc.cyan(features.length + '/' + FEATURE_GROUPS.length)} features`,
  );

  return { projectName, bundleIdPrefix, features, packageManager, initGit };
}
