# multi-database-express

An example Express API that can run on different databases. You pick the database with one environment variable. The routes stay the same for every database. Only the connector and repository behind them change.

The example resource is a simple **task** (`{ task: String }` plus timestamps).

## How it works

```
index.js
  └─ connectors/connector.factory.js     picks a connector from config.adapter
       ├─ mongo.connector.js             mongoose.connect(uri)
       └─ mysql.connector.js             new Sequelize(uri) + sync()
  └─ app.js
       └─ repository/task-repository.factory.js   picks a repository from config.adapter
            ├─ task-mongo.repository.js
            ├─ task-mysql.repository.js
            └─ task-ram.repository.js
       └─ routes/task.routes.js          uses only the repository interface
```

1. `index.js` asks the connector factory for a connector and opens the connection.
2. The connection goes to `app.js`. There the repository factory wraps it in a repository for the same adapter.
3. The routes get the repository and call `list`, `create` and `remove`. They never see which database is underneath.

To add another database, write a connector and a repository, then add a `case` to both factories.

## Configuration

The settings live in [config/default.js](config/default.js) and are loaded with [`config`](https://www.npmjs.com/package/config).

| Key       | Env var      | Default                            |
|-----------|--------------|------------------------------------|
| `adapter` | `DB_ADAPTER` | `mysql` (`mongo`, `mysql`, `ram`)  |
| `mysql`   |              | `mysql://localhost:3306/tasks`     |
| `mongo`   |              | `mongodb://localhost:27017/tasks`  |
| `port`    | `PORT`       | `8080`                             |

## Running

```bash
npm install
DB_ADAPTER=mongo npm start
```

## API

Base path: `/api/v1/tasks`

| Method   | Path   | Description   |
|----------|--------|---------------|
| `GET`    | `/`    | List tasks    |
| `POST`   | `/`    | Create a task |
| `DELETE` | `/:id` | Delete a task |

## Status

This is a work-in-progress example:

- **Mongo** is the only adapter with a real repository.
- **MySQL** connects, but its repository is a stub. `src/models/task.mysql.js` is empty.
- **RAM** has no connector yet, so the connector factory returns `[]` and startup fails.
- There is no JSON body parser, so `req.body` is `undefined` on `POST`.
