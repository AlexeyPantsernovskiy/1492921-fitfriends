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

export function queryToString<T extends object>(query: T): string {
  const queryStrings: string[] = [];
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== undefined && item !== null) {
              queryStrings.push(
                `${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`
              );
            }
          });
        } else {
          queryStrings.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
          );
        }
      }
    });
  }

  return queryStrings.join('&');
}
