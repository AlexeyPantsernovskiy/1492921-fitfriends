# Руководство по работе с проектом

## Создать переменные окружения
```bash
cp ./apps/auth/.env.example ./apps/auth/.env
cp ./apps/api/.env.example ./apps/api/.env
cp ./apps/file-vault/.env.example ./apps/file-vault/.env
cp ./apps/trainings/.env.example ./apps/trainings/.env
cp ./libs/training/models/prisma/.env.example ./libs/training/models/prisma/.env
```

## Создать docker containers для сервисов
```bash
docker compose --file ./apps/auth/docker-compose.yml --project-name "fitfriends-user" --env-file ./apps/auth/.env up -d
docker compose --file ./apps/file-vault/docker-compose.yml --project-name "fitfriends-file-vault" --env-file ./apps/file-vault/.env up -d
docker compose --file ./apps/training/docker-compose.yml --project-name "fitfriends-training" --env-file ./apps/training/.env up -d```

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

## Запустить сервисы backend
```bash
npx nx run file-vault:serve
npx nx run auth:serve
npx nx run trainings:serve
npx nx run api:serve
```

### Запустить сервис frontend
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

