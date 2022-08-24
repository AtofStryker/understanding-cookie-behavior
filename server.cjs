var fs = require("fs");
var path = require('path')
var http = require("http");
var https = require("https");
const bodyParser = require("body-parser");
const express = require("express");
var privateKey = fs.readFileSync("certificates/selfsigned.key", "utf8");
var certificate = fs.readFileSync("certificates/selfsigned.crt", "utf8");

const httpPorts = [3500, 3501];
const httpsPorts = [3502, 3503];

const createApp = (port) => {
  const app = express();

  app.set("port", port);

  app.set("view engine", "html");

  app.use(require("cors")());
  app.use(require("cookie-parser")());
  app.use(require("compression")());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(require("method-override")());

  app.head("/", (req, res) => {
    return res.sendStatus(200);
  });

  /**
   * Since this application demo needs both a client and a server,
   * The express server serves the client assets build by vite with
   * source maps enabled to the root, while we expose API endpoints
   * that our client application will need for payment integration.
   */
  app.use(express.static(path.join(__dirname, "dist")));
  app.use(express.json());

  app.get("/", (req, res, next) => {
    if(port === 3500 || port === 3502){
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    }else {
      res.send(404)
    }
  });

  app.get("/test-request", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/set-cookie", (req, res) => {
    const { cookie } = req.query;

    res.append("Set-Cookie", cookie).sendStatus(200);
  });

  app.get("/test-request-credentials", (req, res) => {
    res
      .setHeader("Access-Control-Allow-Origin", req["headers"]["origin"])
      .setHeader("Access-Control-Allow-Credentials", "true")
      .sendStatus(200);
  });

  app.get("/set-cookie-credentials", (req, res) => {
    const { cookie } = req.query;

    res
      .setHeader("Access-Control-Allow-Origin", req["headers"]["origin"])
      .setHeader("Access-Control-Allow-Credentials", "true")
      .append("Set-Cookie", cookie)
      .sendStatus(200);
  });

  app.use(require("errorhandler")());

  return app;
};

httpPorts.forEach((port) => {
  const app = createApp(port);
  const server = http.Server(app);

  return server.listen(app.get("port"), () => {
    // eslint-disable-next-line no-console
    return console.log("Express server listening on port", app.get("port"));
  });
});

var credentials = { key: privateKey, cert: certificate };

httpsPorts.forEach((port) => {
  const httpsApp = createApp(port);
  const httpsServer = https.createServer(credentials, httpsApp);

  httpsServer.listen(port, () => {
    // eslint-disable-next-line no-console
    return console.log("Express server listening on port", port, "(HTTPS)");
  });
});
