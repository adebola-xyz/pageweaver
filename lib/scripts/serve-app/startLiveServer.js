const fs = require("fs");
const { createServer } = require("http");
const terminal = require("../../utils/terminal");
const colors = require("colors");
const reloadScript = require("./reloadScript");
const WebSocketServer = require("websocket").server;

let resType = "",
  watchedFiles = [],
  allFiles = [],
  requestedFile = "";

module.exports.startLiveServer = (appFolder) => {
  let wsServer = new WebSocketServer({
    httpServer: createServer((req, res) => {
      // Handle situation where requested file does not exist.
      if (req.url && !fs.existsSync(`${appFolder}${req.url}`)) {
        switch (req.url) {
          case "/favicon.ico":
            break;
          default:
            terminal.error(`${req.url} is missing!`);
            res.write(JSON.stringify(`Cannot get ${req.url}`));
        }
      } else {
        // Load index.html file.
        if (req.url === "/") {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(fs.readFileSync(`${appFolder}/index.html`).toString());
          // Insert Live Reloading script.
          res.write(reloadScript);
          watchedFiles.push(`${appFolder}/index.html`);
        } else {
          //  Load other files.
          watchedFiles.push(`${appFolder}${req.url}`);
          resType = req.url.split(".")[req.url.split(".").length - 1];
          requestedFile = fs.readFileSync(`${appFolder}${req.url}`).toString();
          if (resType === "js") resType = "javascript";
          res.writeHead(200, { "Content-Type": `text/${resType}` });
          res.write(requestedFile);
        }
      }
      res.end();
    }).listen(8080),
    autoAcceptConnections: false,
  });
  wsServer.on("request", (request) => {
    var connection = request.accept();
    function refresh() {
      connection.send("refresh");
    }
    allFiles.forEach((file) => {
      if (!watchedFiles.includes(file)) {
        fs.unwatchFile(file, { interval: 300 }, refresh);
      }
    });
    watchedFiles.forEach((file) => {
      if (!allFiles.includes(file)) allFiles.push(file);
      fs.unwatchFile(file, { interval: 300 }, refresh);
      fs.watchFile(file, { interval: 300 }, refresh);
    });
    watchedFiles = [];
    connection.send("Connected");
  });
};