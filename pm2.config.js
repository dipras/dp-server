module.exports = {
  apps: [
    {
      name: "dp-server",
      script: "bun",
      args: "run dev",
      cwd: "./",
      env: {
        NODE_ENV: "development"
      }
    }
  ]
};
