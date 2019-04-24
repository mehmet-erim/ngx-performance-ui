import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import { Mask } from '../models';

export function notNull(value: any): boolean {
  return value !== null;
}

export function transformToArray(value: any): any[] {
  if (Array.isArray(value)) return value;
  return [value];
}

export function transformByRegex(value: string | number, mask: Mask.Config): string {
  if (typeof value === 'number') value = String(value);

  const inputElement = document.createElement('input');
  inputElement.type = 'text';

  const textMaskInputElement = createTextMaskInputElement({ ...mask, inputElement });
  textMaskInputElement.update(value);

  return inputElement.value;
}
