var http = require("http");
var url = require("url");
var JSON_RPC = require("../json-rpc/json-rpc");
var Storage = require("../storage");
var WebSocket = require("ws");
var events = require("events");

var storage = new Storage();
var buoyEmitter = new events.EventEmitter();

class Server {
  constructor() {
    this._server = this._initServer();
  }
  get storage() {
    return this._storage;
  }
  _initServer() {
    var inBuoyReqHandler = this._inBuoyHandler;
    var outBuoyReqHandler = this._outBuoyHandler;
    var server = new http.createServer();
    var wssInBuoy = new WebSocket.Server({ noServer: true });
    var wssOutBuoy = new WebSocket.Server({ noServer: true });

    wssInBuoy.on("connection", function connection(ws) {
      ws.on("message", function incoming(message) {
        message = JSON.parse(message);
        var response = JSON.stringify(inBuoyReqHandler(message));
        ws.send(response);
      });

      ws.on("close", function close() {
        console.log("Connection closed");
      });
    });

    wssOutBuoy.on("connection", function connection(ws) {
      ws.on("message", function incoming(message) {
        message = JSON.parse(message);
        outBuoyReqHandler(message).forEach(response => ws.send(response));
      });
      ws.on("close", function close() {
        console.log("Connection closed");
      });
      buoyEmitter.on("buoyUpdate", buoyNotification => {
        ws.send(buoyNotification);
      });
    });

    server.on("upgrade", function upgrade(request, socket, head) {
      var pathname = url.parse(request.url).pathname;
      if (pathname === "/inBuoy") {
        wssInBuoy.handleUpgrade(request, socket, head, function done(ws) {
          wssInBuoy.emit("connection", ws, request);
        });
      } else if (pathname === "/outBuoy") {
        wssOutBuoy.handleUpgrade(request, socket, head, function done(ws) {
          wssOutBuoy.emit("connection", ws, request);
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
        var updatedBuoy = storage.updateBuoyData(name, info);
        var buoyNotification = JSON_RPC.buildNotification(
          "buoyNotification",
          updatedBuoy
        );
        buoyEmitter.emit("buoyUpdate", JSON.stringify(buoyNotification));
      }
      return JSON_RPC.buildResponse("ok", requestData.id);
    } catch (error) {
      return JSON_RPC.buildError(-32603);
    }
  }
  _outBuoyHandler(requestData) {
    const responses = [];
    try {
      if (requestData.method === "subscribeToBuoys") {
        var bounds = requestData.params;
        responses.push(
          JSON.stringify(JSON_RPC.buildResponse("ok", requestData.id))
        );
        storage.subscribeToBuoys(bounds).forEach(buoy => {
          responses.push(
            JSON.stringify(JSON_RPC.buildNotification("buoyNotification", buoy))
          );
        });
      }
    } catch (error) {
      responses.push(JSON.stringify(JSON_RPC.buildError(-32603)));
    }
    return responses;
  }
}
module.exports = Server;
