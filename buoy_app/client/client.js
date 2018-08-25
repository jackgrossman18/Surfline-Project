var http = require("http");
const WebSocket = require("ws");
const Server = require("../server/server");
var Connector = require("../connector");

function buildHeaders(websocket) {
  return {
    Connection: "Upgrade",
    Upgrade: websocket
  };
}
function initClient() {
  var client = Server.listen(8080, "127.0.0.1", () => {
    var options = {
      port: 8080,
      hostname: "127.0.0.1",
      headers: {
        Connection: "Upgrade",
        Upgrade: "websocket"
      }
    };
    var req = http.request(options);
    req.end();

    req.on("upgrade", (res, ws, upgradeHead) => {
      console.log("Upgraded");
      ws.end();
      process.exit(0);
    });
  });

  ws.onopen = function(chunk) {
    console.log("Websocket is connected...");
    var client = "";
    client += chunk.toString();
  };
  ws.send(JSON.stringify(addBuoy));

  ws.onmessage = function(event) {
    console.log(event.data);
  };
  ws.on("end", function() {
    client = JSON.parse(client);
    var clientResult = JSON.stringify(reqHandler(client));
    response.writeHead(200, buildHeaders(clientResult.length));
    response.write(clientResult);
    response.end();
  });
  request.on("error", function(error) {
    console.error(error);
  });
  req.on("upgrade", (res, ws, upgradeHead) => {
    console.log("got upgraded!");
    ws.end();
    process.exit(0);
  });
  return;
}

class Client {
  constructor() {
    this._client = initClient();
  }
}

module.exports = Client;
