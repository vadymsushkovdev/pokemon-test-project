# Table of contents

- 1. [Technology Stack](#1-technology-stack)
- 2. [Code Style](#2-code-style)
- 3. [Development](#3-development)

# 1. Technology Stack
- Nodejs
- Nestjs
- TypeScript
- TypeORM
- PostgeSQL

# 2. Code Style

We use the [JavaScript Standard Style](https://standardjs.com/) with TypeScript ([ts-standard](https://github.com/standard/ts-standard)). In addition, we use the following rules:

1. Name folders, components, files, entities and columns in lowercase and singular. Root folders can be named in plural when needed

2. Name folders, components, files, entities and columns with multiple words/numbers by a dash e.g. hello-world-3.ts

3. Name classes in PascalCase and singular

4. Name properties and methods in camelCase and singular or plural as needed

5. Name migrations like ActionOfMigration e.g. CreateExampleEntity and generate them via our backend [TypeORM script](./services/backend/package.json#L13)

6. Use [DataMapper](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)

7. Use [Indices](https://github.com/typeorm/typeorm/blob/master/docs/indices.md) when needed



# 3. Development
[Docker Compose](https://docs.docker.com/compose/) is used for local development. The following commands are needed:

1. Install [Docker](https://docs.docker.com/engine/install/) & [Docker Compose](https://docs.docker.com/compose/install/) (If needed increase the CPU & RAM usage in Docker Desktop for Windows and MAC to avoid failures)

2. Remove local Docker state: `docker system prune -a --volumes`

3. Build and start the app:

   `npm run build:docker:dev`

4. Stop the app: `npm run stop:docker:dev`

5. Start the app: `npm run start:docker:dev"`

To test services without Docker Compose (optional):

1. Setup .env file

2. `npm i --legacy-peer-deps`

3. `npm run start:dev`

Finally, connect PostgreSQL with [DataGrip](https://www.jetbrains.com/datagrip/) or [DBeaver](https://dbeaver.io/).

The app will be available under the following hosts:

- Backend: localhost:3000
- API UI: localhost:3000/api/swagger (Swagger)

# 4. Unit Tests
Unit tests are run automatically when you start the application (See: [Development](#3-development)). You can also run the tests manually by first build up the test database and specifying the database variables in the `.env.test` file and running command `npm run test`