# Domain-Driven-Hexagon

Nest template with a basic DDD approach.

## Architecture overview :question:

![Architecture overview](/documentation/assets/architecture-overview.png)

Ports and adapters, also known as hexagonal architecture, is a software architecture pattern that aims to decouple the application core from the delivery mechanisms. It is a way to organize the code in a clean and maintainable way.

The way we achive this decoupling is basically by having a core module that contains the business logic and a module for each delivery mechanism. The core module is the only one that can access the delivery mechanisms, but the delivery mechanisms can't access the core module.

Thanks to the ports and adapters pattern, we can easily change the delivery mechanism without affecting the core module. For example, if we want to change from a REST API to a GraphQL API, we just need to create a new module for the GraphQL API and implement the adapters for the GraphQL API. The core module will remain the same.

The ports are just interfaces that we implement to achieve
dependency inversion.

![dependency inversion](/documentation/assets/dependency-overview.png)

## CORE SCRIPTS :hammer:

-   `npm run start:local` - Runs the app in local mode inside Docker.
-   `npm run start:dev` - Runs the app in development mode.
-   `npm run start:stage` - Runs the app in stage mode.
-   `npm run start:prod` - Runs the app in production mode.
-   `npm run test:watch` - Runs the tests in watch mode.
-   `npm run test:e2e` - Runs the e2r tests..

## DANGER :warning:

This is a work in progress. It is not ready for production.
Use at your own risk.
