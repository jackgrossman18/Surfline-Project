var SSE = require("sse");
var http = require("http");
var Server = require("../server");
var WebSocketServer = require("ws").Server,
  buoySocket = new WebSocketServer({ port: 40510 });

var server = http.createServer();
var clients = [];

buoySocket.on("connection", function(ws) {
  var addBuoy = {
    jsonrpc: "2.0",
    method: "addBuoy",
    params: {
      name: "SAN PEDRO",
      lat: 33.618,
      lon: -118.317
    },
    id: "3f052f4f-2f4a-46d8-aee7-fb6639942795"
  };
  var wsRes = {
    jsonrpc: "2.0",
    result: "ok",
    id: "3f052f4f-2f4a-46d8-aee7-fb6639942795"
  };
  ws.on("message", function incoming(wsRes) {
    ws.send(JSON.stringify(wsRes));
  });

  setInterval(() => ws.send(JSON.stringify(addBuoy)), 3000);

  buoySocket.on("close", function() {
    console.log("Closed connection");
  });
});

var initSocket = data => {
  console.log();
  buoySocket = new WebSocket();

  buoySocket.onerror = evt => doPostMessage("connectionError");

  buoySocket.onopen = event => {
    self.socketReady = true;
    doPostMessage("connectionReady");
  };
};

var start = () => {
  if (!buoySocket.socketReady) {
    throw new Error("socket not ready");
  }

  buoySocket.running = true;
  var next = buoySocket.queue.first();

  if (next) {
    var test = buoySocket.tests.get(next);

    var msg = JSON.stringify(
      Object.assign(test.get("command"), { clientId: buoySocket.workerId })
    );

    buoySocket.tests = buoySocket.tests.update(next, val =>
      val.set("start", performance.now())
    );

    buoySocket.send(msg);

    buoySocket.queue = self.queue.shift();

    setTimeout(() => poll(), buoySocket.throttle);
  } else {
    buoySocket.running = false;
    flush();
    doPostMessage("done");
  }
};

self.onmessage = ({ data }) => route(data.method, data);
