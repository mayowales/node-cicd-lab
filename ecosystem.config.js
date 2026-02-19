module.exports = {
  apps: [
    {
      name: "node-cicd-lab",
      script: "src/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      // Logging
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "/var/log/pm2/node-cicd-lab-error.log",
      out_file: "/var/log/pm2/node-cicd-lab-out.log",
      merge_logs: true,

      // Restart policy
      max_memory_restart: "300M",
      restart_delay: 5000,
      max_restarts: 10,

      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 10000,

      // Watch (disabled in production, useful in dev)
      watch: false,
    },
  ],
};
