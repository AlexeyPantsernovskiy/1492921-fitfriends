import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export type DateTimeUnit = 's' | 'h' | 'd' | 'm' | 'y';
export type TimeAndUnit = { value: number; unit: DateTimeUnit };

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
    excludeExtraneousValues: true,
    ...options,
  });
}

export function getMongoConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function parseTime(time: string): TimeAndUnit {
  const regex = /^(\d+)([shdmy])/;
  const match = regex.exec(time);

  if (!match) {
    throw new Error(`[parseTime] Bad time string: ${time}`);
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(`[parseTime] Can't parse value count. Result is NaN.`);
  }

  return { value, unit };
}

export function calculatePage(totalCount: number, limit: number): number {
  return Math.ceil(totalCount / limit);
}

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export function createUrlForFile(filepath: string, url: string): string {
  if (!filepath) {
    return filepath;
  }
  if (filepath.startsWith('/img/')) {
    return filepath;
  }
  if (filepath.startsWith('img/')) {
    return `/${filepath}`;
  }
  return `${url}/${filepath}`;
}

export function currencyParser(value: string | number) {
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : Math.round(value);
  }
  // Удаляем всё, кроме цифр, запятых и точек
  const cleanedValue = value.replace(/[^\d,.]/g, '');
  // Заменяем запятую на точку (если используется как разделитель дробной части)
  const normalizedValue = cleanedValue.replace(',', '.');
  // Парсим в число c округлением до целого
  return Math.round(parseFloat(normalizedValue));
}
