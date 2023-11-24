<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
<p>
Este repositorio es un estructura inicial para iniciar un proyecto con la arquitectura DDD, contiene implementaciones genéricas para evitar el código repetido, como un repositorio genérico, un servicio genérico, y un controlador genérico.
<br>
El controlador genérico contiene métodos crud, los cuales en el constructor los puedes asociar al servicio genérico o a un servicio en especial.
<br>
El servicio genérico asocia los métodos del controlador genérico, al repositorio genérico, en el constructor se puede asociar un repositorio en especial o al repositorio genérico
<br>
El repositorio genérico extiende de la clase repository, propia de typeorm, contiene métodos para hacer un crud, también contiene métodos para realizar transacciones de forma genérica.
<br>
El script new-functionality, genera toda la estructura de carpetas para dar inicio a una nueva funcionalidad para el proyecto
<br>
El proyecto ya cuenta con una base de sso, el cual consiste en un solo inicio de sesión a diferentes plataformas, cuenta con la creación de grupos de usuario, roles, y usuarios. Cada usuario pertenece a un grupo de usuarios. Y cada rol se asocia a un grupo de usuario
<br>
El proyecto cuenta con swagger el cual es una herramienta para documentar la api, se puede acceder desde -> localhost:3000/api
<br>
También cuenta con un diccionario de errores. Y con una implementación para lanzar los errores de una manera mas sencilla, el archivo con el diccionario de errores -> "error.constant.ts" y el método para lanzar los errores -> "throw-server-error.ts"
</p>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Installation

### Redis
```bash
docker run --redis-docker some-redis -p 6379:6379 -d redis
```
#### Access Redis CLI
```bash
docker exec -it e0c061a5700bfa400f8f24b redis-cli
```
### Postgres
```bash
docker run --name postgres -p 5455:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgrespw -e POSTGRES_DB=postgres -d postgres
```
