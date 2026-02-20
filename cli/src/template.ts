import fs from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import { extract } from 'tar';
import { ALWAYS_EXCLUDE, REPO_URL } from './constants';
import { copyDir, pathExists } from './utils/fs';

export async function scaffoldTemplate(
  projectDir: string,
  templatePath?: string,
): Promise<void> {
  if (templatePath) {
    await scaffoldFromLocal(projectDir, templatePath);
  } else {
    await scaffoldFromGitHub(projectDir);
  }
}

async function scaffoldFromLocal(
  projectDir: string,
  templatePath: string,
): Promise<void> {
  await copyDir(templatePath, projectDir);

  // Remove excluded paths
  for (const exclude of ALWAYS_EXCLUDE) {
    const fullPath = path.join(projectDir, exclude);
    if (await pathExists(fullPath)) {
      await fs.rm(fullPath, { recursive: true, force: true });
    }
  }
}

async function scaffoldFromGitHub(projectDir: string): Promise<void> {
  const tmpDir = path.join(projectDir, '.tmp-download');
  await fs.mkdir(tmpDir, { recursive: true });

  const tarPath = path.join(tmpDir, 'template.tar.gz');

  // Download tarball
  const response = await fetch(REPO_URL);
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download template: ${response.statusText}`);
  }

  const fileStream = createWriteStream(tarPath);
  await pipeline(response.body as any, fileStream);

  // Extract tarball
  await extract({
    file: tarPath,
    cwd: tmpDir,
  });

  // Find the extracted directory (named like "expo-base-main")
  const entries = await fs.readdir(tmpDir);
  const extractedDir = entries.find(
    e => e !== 'template.tar.gz' && !e.startsWith('.'),
  );
  if (!extractedDir) {
    throw new Error('Failed to find extracted template directory');
  }

  const srcDir = path.join(tmpDir, extractedDir);

  // Copy contents to project dir, excluding unwanted paths
  const items = await fs.readdir(srcDir);
  for (const item of items) {
    if (ALWAYS_EXCLUDE.some(ex => item === ex.replace(/\/$/, ''))) continue;
    const src = path.join(srcDir, item);
    const dest = path.join(projectDir, item);
    await fs.cp(src, dest, { recursive: true });
  }

  // Clean up temp dir
  await fs.rm(tmpDir, { recursive: true, force: true });
}
