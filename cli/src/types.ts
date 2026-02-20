export interface FeatureGroup {
  id: FeatureId;
  label: string;
  description: string;
  deps: string[];
  devDeps: string[];
  files: string[];
  scripts: string[];
  plugins: string[];
}

export type FeatureId =
  | 'state-management'
  | 'i18n'
  | 'e2e-testing'
  | 'http-client'
  | 'forms'
  | 'ui-kit'
  | 'animations'
  | 'network-info';

export interface UserChoices {
  projectName: string;
  bundleIdPrefix: string;
  features: FeatureId[];
  packageManager: PackageManager;
  initGit: boolean;
}

export type PackageManager = 'yarn' | 'npm' | 'pnpm' | 'bun';
