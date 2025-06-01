# Руководство по работе с проектом

## Создать переменные окружения
```bash
cp ./apps/users/.env.example ./apps/users/.env
cp ./apps/api/.env.example ./apps/api/.env
cp ./apps/file-vault/.env.example ./apps/file-vault/.env
cp ./apps/trainings/.env.example ./apps/trainings/.env
cp ./libs/trainings/models/prisma/.env.example ./libs/trainings/models/prisma/.env
```

## Создать docker containers для сервисов
```bash
docker compose --file ./apps/users/docker-compose.yml --project-name "fitfriends-users" --env-file ./apps/users/.env up -d
docker compose --file ./apps/file-vault/docker-compose.yml --project-name "fitfriends-file-vault" --env-file ./apps/file-vault/.env up -d
docker compose --file ./apps/trainings/docker-compose.yml --project-name "fitfriends-trainings" --env-file ./apps/trainings/.env up -d
```

### Установить зависимости
```bash
npm install
```

## Сгенерировать клиент Prisma
```bash
npx nx run trainings:db:generate
```

## Сгенерировать и выполнить скрипт создания объектов в БД Postgres
```bash
npx nx run trainings:db:migrate
```

## Загрузить моковые данные в базы данных
```bash
npx nx run cli:build 
node scripts/add-shebang.js 
chmod +x ./dist/apps/cli/main.js 
./dist/apps/cli/main.js --generate 30 mongodb://admin:passW0rd@localhost:27050/users?authSource=admin postgres://admin:passW0rd@localhost:5452/fitfriends"
```
можно скрипом, если порты не менялись
```bash
npm run cli:generate
```
Пароли у всех созданных пользователей: 123456
Логины(email) можно посмотреть в базе данных http://localhost:8050/db/users/users
Логин/пароль для подключения к базе с пользователями: admin/passW0rd

## Запустить сразу все сервисы 

```bash
npx nx run-many -t serve -p file-vault users trainings api frontend --parallel=5
```

## Запуск сервисов backend по-отдельности
Не нужно выполнять, если были запущены сразу все сервисы
```bash
npx nx run file-vault:serve
npx nx run users:serve
npx nx run trainings:serve
npx nx run api:serve
```

### Запуск сервиса frontend
Не нужно выполнять, если были запущены сразу все сервисы
```bash
npx nx run frontend:serve
```

## Специификация

Swagger [app API](http://localhost:3000/spec#/)

Fitfriends [React App](http://localhost:5000)

## Описание переменных окружения

### Ссылки на сервисы
Если будут изменены порты, необходимо проверить и при необходимости скорректировать ссылки в файле
```
./apps/api/src/app/app.config.ts 
```

### frontend
```
PORT=5000 - порт сервиса
```
### api
```
PORT=3000 - порт сервиса
```

