export function validateProjectName(name: string): string | undefined {
  if (!name) return 'Project name is required';
  if (!/^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/i.test(name)) {
    return 'Project name must start/end with alphanumeric and can contain .-_';
  }
  if (name.length > 214) return 'Project name must be under 214 characters';
  return undefined;
}

export function validateBundleIdPrefix(prefix: string): string | undefined {
  if (!prefix) return 'Bundle identifier prefix is required';
  if (!/^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)+$/i.test(prefix)) {
    return 'Use reverse domain notation where each segment starts with a letter (e.g., com.company)';
  }
  return undefined;
}

export function toBundleId(prefix: string, projectName: string): string {
  const sanitized = projectName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return `${prefix}.${sanitized}`;
}

export function toAppName(projectName: string): string {
  return projectName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}
