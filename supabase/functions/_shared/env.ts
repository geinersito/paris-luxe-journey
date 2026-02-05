export function getEnv(key: string): string | undefined {
  const v = Deno.env.get(key);
  return v && v.trim().length ? v.trim() : undefined;
}

export function getEnvBool(key: string, defaultValue = false): boolean {
  const v = getEnv(key);
  if (!v) return defaultValue;
  return ['1', 'true', 'yes', 'on'].includes(v.toLowerCase());
}
