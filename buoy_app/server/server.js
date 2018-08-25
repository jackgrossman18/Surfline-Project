var http = require("http");
var url = require("url");
var JSON_RPC = require("../json-rpc/json-rpc");
var Storage = require("../storage");
var WebSocket = require("ws");

var storage = new Storage();

class Server {
  constructor() {
    this._server = this._initServer();
  }
  get storage() {
    return this._storage;
  }
  _initServer() {
    var reqHandler = this._inBuoyHandler;
    var server = new http.createServer();
    var wssInBuoy = new WebSocket.Server({ noServer: true });

    wssInBuoy.on("connection", function connection(ws) {
      ws.on("message", function incoming(message) {
        message = JSON.parse(message);
        var response = JSON.stringify(reqHandler(message));
        ws.send(response);
      });
      ws.on("close", function close() {
        console.log("Connection closed");
      });
    });

    server.on("upgrade", function upgrade(request, socket, head) {
      var pathname = url.parse(request.url).pathname;
      if (pathname === "/inBuoy") {
        wssInBuoy.handleUpgrade(request, socket, head, function done(ws) {
          wssInBuoy.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });

    server.listen(8080, function() {
      console.log(new Date() + "Server is listening");
    });
    return server;
  }
  _inBuoyHandler(requestData) {
    try {
      if (requestData.method === "addBuoy") {
        const name = requestData.params.name;
        const info = {
          lat: requestData.params.lat,
          lon: requestData.params.lon
        };
        storage.addBuoy(name, info);
      }
      if (requestData.method === "updateBuoyData") {
        const name = requestData.params.name;
        const info = {
          height: requestData.params.height,
          period: requestData.params.period
        };
        storage.updateBuoyData(name, info);
      }
      // if (requestData.method === "subscribeToBuoys") {
      //   storage.subscribedBuoy(requestData.params, requestData.id);
      // }
      // if (requestData.method === "buoyNotification") {
      //   storage.buoyNotificaiton(requestData.params, requestData.id);
      // }
      return JSON_RPC.buildResponse("ok", requestData.id);
    } catch (error) {
      return JSON_RPC.buildError(-32603);
    }
  }
}
module.exports = Server;
