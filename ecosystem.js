const {APP_NAME} = require('./config/constant');

module.exports = {
  apps: [
    {
      name: APP_NAME,
      script: 'npm',
      args: ['start'],
      exec_mode: 'cluster',
      instances: 2,
      max_restarts: 10,
      restart_delay: 5000,
      watch: false,
      env: {
        LOG_PATH: './logs',
        NODE_ENV: 'dev',
        PORT: 3333,
      },
      env_production: {
        LOG_PATH: `/var/log/${APP_NAME}`,
        NODE_ENV: 'prd',
        PORT: 3334,
      },
    },
  ],
};
