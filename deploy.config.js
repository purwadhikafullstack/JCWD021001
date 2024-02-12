module.exports = {
  apps: [
    {
      name: "JCWD-0210-01", // Format JCWD-{batchcode}-{groupnumber}
      script: "./apps/api/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 2101,
      },
      time: true,
    },
  ],
};
