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
