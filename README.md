# tmpl8-react
A project seeder for React that is used as a submodule for the main tmpl8 project. Feel free to use it for your own projects!

[![Build Status](https://travis-ci.org/zephinzer/tmpl8-react.svg?branch=master)](https://travis-ci.org/zephinzer/tmpl8-react)

## Get Started

### Install Dependencies

Clone this repository and run:

```bash
# yarn install
# bower install
```

You should be able to start the application with:

```bash
# npm start
```

### Run Application

Two environments are provisioned: `dev` and `prd` for developmnt and production respectively. You can set them using the `NODE_ENV` variable before running `npm start`:

```bash
# NODE_ENV=dev npm start
```

> This runs the application in `dev`.

```bash
# NODE_ENV=prd npm start
```

> This runs the application in `prd`.

### Deploy Application

We can deploy via PM2 or Docker. For deployment in `dev` for PM2 and Docker respectively:

```bash
# npm run deploy-pm2-dev
# npm run deploy-docker-dev
```

For deployment using `NODE_ENV=prd`, the commands for PM2 and Docker respectively are:

```bash
# npm run deploy-pm2-prd
# npm run deploy-docker-prd
```

The relevant files can be found in `./scripts` under the same name as the `npm` command.

## Development

### Development Environment

The development environment includes tools that help with developer productivity such as:

- Application hot-reloading
- Server live-reloading

Application hot-reloading is done via Webpack and server live-reloading is done by launching your application using Nodemon instead of Node.

### Testing

#### Unit Tests

Testing for the front-end (React.js) is done using Karma. Run the tests using:

```bash
# npm run karma
```

For monitoring, there's also a watch command:

```bash
# npm run karma-watch
```

The relevant file to modify test conditions are at: `./config/karma.config.js`.

#### Integration & System Tests
Testing for the back-end (Node.js) is done using Mocha. Run the tests using:

```bash
# npm run mocha
```

For monitoring, there's also a watch command:

```bash
# npm run mocha-watch
```

#### Security Scanning
Security scanning is done on the `node_modules` dependencies folder using `nsp`. To run it:

```bash
# npm run nsp
```

#### Code Quality
Code quality is maintained using ESLint. Run it with:

```bash
# npm run eslint
```

To automatically fix any errors that ESLint encounters, use:

```bash
# npm run esint-fix
```

### Building

After development is complete, you may build your application by running:

```bash
# npm run build
```

After building, you may wish to test if your application using:

```bash
# npm run unbuild
# yarn install --production
# bower install --production
# NODE_ENV=prd npm start
```

The relevant file for altering the build can be found at `./config/webpack.config.js`.

#### Build Size Debugging

When building, should you wish to debug your output files, we include Webpack Bundle Analyzer which helps to visualise the file sizes of your build. Run it using:

```bash
# WEBPACK_BUNDLE_ANALYZER=1 npm run build
```

## Configuration

### Environment Variables

#### `LOG_PATH`

This defines the path where logs will be written to.

#### `NODE_ENV`

This defines the environment Node will run in. Two environments are available: `dev` and `prd`.

#### `PORT`

This defines the port which the application will listen on. By default, it is 3333 for `dev` and 3334 for `prd`.

## Deployment

### On Virtual Machines

This package is prepared for running on the PM2 process manager. The relevant configuration can be found in `./ecosystem.js` and the command to start this application using PM2 is:

```bash
# npm deploy-pm2
```

The relevant script can be found at `./scripts/.deploy-pm2`.

### On Containers

We can also use Docker for deployment. You may run the deployments in `dev` and `prd` by using:

```bash
# npm run deploy-docker-dev
```

and

```bash
# npm run deploy-docker-prd
```

Both commands will run in the foreground. To run them in the background, run:

```bash
# npm run deploy-docker-dev -- -d
```

and

```bash
# npm run deploy-docker-prd -- -d
```

The relevant scripts can be found at `./scripts/.deploy-docker-dev` and `./scripts/.deploy-docker-prd`.

### Logging

Logging is handled by Winston and is available at both the process level and the request level. The request level is handled by Morgan. The relevant files can be found at `./config/logger.config.js` and `./index.js`.

## Contributing

### Guiding Principles

This seeder package was created as a seeder which accounts for deployment from the start. As a rule of thumb, the focus of this seeder project is on:

- Ease of Development
- Ease of Quality
- Ease of Deployment

The 12-factor app is a good starting resource for principles implemented here. Read about it at https://12factor.net/.

### Contribution Considerations

This package is used as a submodule in the `tmpl8` seeder application, and should maintain compatibitliy with it.

### Methodology

Fork this repository, make your changes, add relevant tests (if any) and raise a Merge Request.
