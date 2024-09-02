<p>Запуск</p>

```
sudo git clone https://github.com/alekssmv/task-tracker && cd task-tracker && sudo mv ./backend/.env.example ./backend/.env && sudo docker-compose up --build
```

<a href="http://localhost/">Backend</a>

<a href="http://localhost:8080/">Frontend</a>

<p>Создание пользователя.</p>

```
curl --location 'localhost/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "name": "john",
    "login": "user",
    "password": "user",
    "roles": "assignee"
}'
```

<p>Создание администратора.</p>

```
curl --location 'localhost/auth/register' \
--header 'Content-Type: application/json' \
--data '{
    "name": "alex",
    "login": "admin",
    "password": "admin",
    "roles": "admin"
}'
```

