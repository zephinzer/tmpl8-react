# tmpl8-react

## Start With Why

### Batteries Included

This tmpl8 (template) is batteries included and accounts for **development** and **production** configurations. Unlike other alternatives, it is deploy-ready for either VMs (using PM2) or containers (using Docker).

#### Logging

Logging is done via a combination of Winston process logging and Morgan request logging.

#### Security

Content Security Policy (CSP) and Cross-Origin-Resource-Sharing (CORS) is accounted for using the `helmet` package.

#### Tooling

Tooling is done using Webpack and Babel so you can use the shiny new ECMAScript 6 syntax together with syntatic sugars that make sense for React.

Hot-reloading is included only in development and is automatically excluded for production.

#### Testing

For the back-end (using Node), we use Mocha for both the test framework and test runner.

For the front-end (using React), we use Karma as the test runner, Mocha for the test framework, and Enzyme for the test renderer.

Both front-end and back-end tests use Chai for the assertion library, Sinon for function mocking, and Istanbul for test coverage generation.

#### Code Quality

Code conventions and static code analysis is done using ESLint.

#### Deployment

Building of application is done using Webpack. It automatically excludes all developmnt related modules and includes production configurations.

Two options are included out-of-the-box which account for virtual machine deployment and container deployment.

For virtual machine deployments, we include a PM2 configuration.

For container deployments, we include a Docker configuration.

## Getting Started

### Dependency Management

#### NPM

NPM is the main dependency management tool. Install your dependencies with:

```bash
# yarn install
```

If you do not have Yarn, or you have NPM 5, install them with `npm install`.

#### Bower

Bower is available for use to include front-end packages. It is imagined that should you wish to offload some files to a CDN, a link strategy (vs Webpack bundle strategy) will help. Install your dependencies with:

```bash
# bower install
```

Bower dependencies are stored in `./assets/lib`.

### Environments

Two environments come predefined, `dev` and `prd`, for *development* and *production* respectively. They can be altered from the `./config/constant.js` file, but try not to, so that we have minimal development/production parity!

#### Running In Development

When the `NODE_ENV` environment variable is not set, the application starts in `dev` by default.

```bash
# npm start
```

If you'd like to be specific,

```bash
# NODE_ENV=dev npm start
```

> In **development**, your application process is handled by `nodemon`, an excellent monitoring tool which refreshes your server whenever any server-side file changes happen.

> Also in **development**, hot-reloading comes pre-configured so that you don't need to refresh your browser to see changes.

For running in development using Docker, see the below section under Deployment.

#### Building the Application

After development, there comes a time we need to run it in production to try it out. We use Webpack to build our application, and it is encapsulated in the `build` script found in the `./package.json`. Run it with:

```bash
# npm run build
```

> This command triggers a special flag in Webpack which relies on the `webpack` command being run as the primary command instead of `node`. In the build environment, production settings are set, so that in actual production execution, we can exclude Webpack from the dependencies.

#### Running In Production

Set the `NODE_ENV` environment to `prd` to start the application in *production* mode.

```bash
# NODE_ENV=prd npm start
```

### Deployment

#### Dependency Installation

Confirm that you have already built your files (check `./assets/build`). Install your NPM and Bower dependencies using the production equivalents:

```bash
# bower install --production
# npm install -- production
```

If you're using Yarn, swap the `npm install --production` command with `yarn install --production`.

#### Using PM2

PM2 is a process manager that works pretty well with Node. The included `./config/ecosystem.config.js` file is a configuration for PM2 that allows you to run the application via PM2.

Run it in **development** using:

```bash
# pm2 start ./ecosystem.js
```

Run it in **production** using:

```bash
# pm2 start ./ecosystem.js --env production
```

> For more information, see: http://pm2.keymetrics.io/docs/usage/application-declaration

#### Using Docker

Docker is an application containerization technology that allows you to run your application in the context of a certain operating system. The included `./Dockerfile`, `./docker-compose.dev.yml` and `./docker-compose.prd.yml` files are meant for this purpose.

Build the main image using:

```bash
# docker build .
```

##### Running in Development

Run it in **development** using:

```bash
# docker-compose -f ./docker-compose.dev.yml up`
```

To initiate a re-build upon `up`, run it with:

```bash
# docker-compose -f ./docker-compose.dev.yml up --build`
```

To stop it, use `down`:

```bash
# docker-compose -f ./docker-compose.dev.yml down`
```

> In development, `nodemon` is available together with immediate file synchronisation via Docker's volume mapping which maps the project folder to the `working_dir` inside the container. You can also use this for development to confirm that your application will work in the eventual production environment.

##### Running in Production

Run it in **production** using:

```bash
# docker-compose -f ./docker-compose.prd.yml up`
```

Once again, to initialise with a re-build upon `up`, run it with:

```bash
# docker-compose -f ./docker-compose.prd.yml up --build`
```

To stop it, use `down`:

```bash
# docker-compose -f ./docker-compose.prd.yml down`
```

## Configurations

### Environment

The default environment is set to `dev`. To change this, set the `NODE_ENV` environment variable.

```bash
# NODE_ENV=prd npm start
```

### Port

The default port is set to `3333`. To change this, set the `PORT` environment variable.

```bash
# PORT=3334 npm start
```

> This runs the application in `dev` listening to port `3334`.

### Logging

The default path for logging is to the `./logs` directory. To change this, set the `LOG_PATH` environment variable.

```bash
# LOG_PATH=/var/log/app npm start
```

> This sets the log path to `/var/log/app`.

### Build Process

Webpack is used to build this project. Sometimes when the file becomes large, it is useful to analyze what is causing the file size bloat. Set the `WEBPACK_BUNDLE_ANALYZE` environment variable to 1 to check it out.

```bash
# WEBPACK_BUNDLE_ANALYZE=1 npm run build
```

## Folder Structure & Important Files

### `./index.html`

This is your main HTML entrypoint. It is processed using Embedded JavaScript (EJS) before being dispatched to the client.

### `./assets`

This folder contains static files which you should be able to access via the `/assets` endpoint once the server is up. Build files will end up in `./assets/build`.

### `./logs`

This folder is the default folder which logs get sent to. To change this to somewhere else once it's deployed, set the environment variable `LOG_PATH`

### `./src`

This folder contains the React source code for your application. All components folder should be Capital Cased.

### `./test`

This folder contains any system tests that need to be run to determine if your server can be run in the environment it is in.

