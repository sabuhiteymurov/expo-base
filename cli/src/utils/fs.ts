import fs from 'node:fs/promises';
import path from 'node:path';

export async function readFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf-8');
}

export async function writeFile(
  filePath: string,
  content: string,
): Promise<void> {
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function readJson<T = Record<string, unknown>>(
  filePath: string,
): Promise<T> {
  const content = await readFile(filePath);
  return JSON.parse(content) as T;
}

export async function writeJson(
  filePath: string,
  data: unknown,
): Promise<void> {
  await writeFile(filePath, JSON.stringify(data, null, 2) + '\n');
}

export async function pathExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function removeDir(dirPath: string): Promise<void> {
  if (await pathExists(dirPath)) {
    await fs.rm(dirPath, { recursive: true, force: true });
  }
}

export async function removeFile(filePath: string): Promise<void> {
  if (await pathExists(filePath)) {
    await fs.rm(filePath, { force: true });
  }
}

export async function copyDir(src: string, dest: string): Promise<void> {
  await fs.cp(src, dest, { recursive: true });
}

export function resolve(projectDir: string, ...segments: string[]): string {
  return path.join(projectDir, ...segments);
}
