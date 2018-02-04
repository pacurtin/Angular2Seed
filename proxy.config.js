const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: "https://stage.example.com",
    changeOrigin: true,
    secure: false,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;

