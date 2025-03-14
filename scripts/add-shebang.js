const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../dist/apps/cli/main.js'); // Путь к скомпилированному файлу
const shebang = '#!/usr/bin/env node';

// Проверяем, существует ли файл
if (!fs.existsSync(filePath)) {
  process.exit(1);
}

// Читаем содержимое файла
const data = fs.readFileSync(filePath, 'utf8');

// Проверяем, содержит ли файл shebang
if (!data.startsWith(shebang)) {
  // Если shebang отсутствует, добавляем его
  fs.writeFileSync(filePath, `${shebang}\n${data}`);
}
