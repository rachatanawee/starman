module.exports = {
  apps: [{
    name: 'pf-prototype',
    script: 'server.js',
    interpreter: '/home/administrator/.bun/bin/bun',
    cwd: '/share/projectflow/apps/prototype',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 26791,
      API_URL: 'http://192.168.11.80:26791',
      HOSTNAME: '0.0.0.0',
      NEXT_PUBLIC_BASE_PATH: '/projectflow',
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
  }]
};
