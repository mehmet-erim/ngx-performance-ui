export function notNull(value: any): boolean {
  return value !== null;
}

export function transformToArray(value: any): any[] {
  if (Array.isArray(value)) return value;
  return [value];
}
