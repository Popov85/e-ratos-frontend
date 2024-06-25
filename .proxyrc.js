require('dotenv').config();
const {createProxyMiddleware} = require("http-proxy-middleware");
const profile = process.env.E_RATOS_PROFILE;

module.exports = function (app) {
    if (profile === "dev") {
        app.use(
            createProxyMiddleware("/api", {
                target: "http://localhost:8080/",
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
                secure: false,
                logLevel: 'debug'
            })
        );
    }
};