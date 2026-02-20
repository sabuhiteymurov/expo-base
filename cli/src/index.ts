import path from 'node:path';
import fs from 'node:fs/promises';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { runPrompts } from './prompts';
import { scaffoldTemplate } from './template';
import { runTransforms } from './transforms';
import { installDeps } from './utils/package-manager';
import { gitInit } from './utils/git';
import { pathExists } from './utils/fs';

const VERSION = '1.0.0';

async function main() {
  const args = process.argv.slice(2);
  const defaultProjectName = args.find(a => !a.startsWith('-'));
  const templatePathIdx = args.indexOf('--template-path');
  const templatePath =
    templatePathIdx !== -1 ? args[templatePathIdx + 1] : undefined;

  p.intro(`${pc.bgCyan(pc.black(' create-expo-base '))} ${pc.dim(`v${VERSION}`)}`);

  const choices = await runPrompts(defaultProjectName);

  const projectDir = path.resolve(process.cwd(), choices.projectName);

  if (await pathExists(projectDir)) {
    const entries = await fs.readdir(projectDir);
    if (entries.length > 0) {
      p.log.error(
        `Directory ${pc.bold(choices.projectName)} already exists and is not empty.`,
      );
      process.exit(1);
    }
  } else {
    await fs.mkdir(projectDir, { recursive: true });
  }

  const s = p.spinner();

  // 1. Scaffold template
  s.start('Scaffolding project...');
  try {
    await scaffoldTemplate(projectDir, templatePath);
  } catch (err) {
    s.stop('Failed to scaffold project');
    p.log.error(
      err instanceof Error ? err.message : 'Unknown error during scaffolding',
    );
    process.exit(1);
  }
  s.stop('Project scaffolded');

  // 2. Run transforms
  s.start('Customizing template...');
  try {
    await runTransforms(projectDir, choices);
  } catch (err) {
    s.stop('Failed to customize template');
    p.log.error(
      err instanceof Error ? err.message : 'Unknown error during transforms',
    );
    process.exit(1);
  }
  s.stop('Template customized');

  // 3. Install dependencies
  s.start(`Installing dependencies with ${choices.packageManager}...`);
  try {
    installDeps(projectDir, choices.packageManager);
  } catch (err) {
    s.stop('Failed to install dependencies');
    p.log.warn(
      `Could not install dependencies. Run ${pc.bold(`cd ${choices.projectName} && ${choices.packageManager} install`)} manually.`,
    );
  }
  s.stop('Dependencies installed');

  // 4. Git init
  if (choices.initGit) {
    s.start('Initializing git repository...');
    try {
      gitInit(projectDir);
    } catch {
      p.log.warn('Could not initialize git repository.');
    }
    s.stop('Git repository initialized');
  }

  p.outro(`Your project is ready!

  ${pc.bold('Next steps:')}
  ${pc.cyan(`cd ${choices.projectName}`)}
  ${pc.cyan('npx expo start')}`);
}

main().catch(err => {
  p.log.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
