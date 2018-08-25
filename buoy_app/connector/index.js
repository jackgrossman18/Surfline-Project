var WebSocket = require("ws");
const wsurl = "ws://localhost:8080";
const Server = require("../server");

var testServer = new Server();

buoySocket.onmessgae = function(event) {
  var f = "";
  var text = "";
  var msg = JSON.parse(event.data);
  var time = new Date(msg.date);
  var timeStr = time.toLocaleTimeString();

  switch (msg.type) {
    case "id":
      clientID = msg.id;
      set;
  }
};

Connector.prototype.emit = function(msg) {
  if (this.connected) {
    try {
      this.socket.send(msg);
      return true;
    } catch (err) {
      console.log("Error" + err.message);
      return false;
    }
  } else {
    console.log("CRITICAL Error No WS");
    return false;
  }
};

var con = new Connector("blah", function() {
  con.emit("abc");
});

var connection = new Connector("ws://echo.websocket.org");
connection.emit("hello");

http
  .get("http://nodejs.org/dist/index.json", res => {
    const { statusCode } = res;
    const contentType = res.headers["content-type"];

    let error;
    if (statusCode !== 200) {
      error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(
        "Invalid content-type.\n" +
          `Expected application/json but received ${contentType}`
      );
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", chunk => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  })
  .on("error", e => {
    console.error(`Got error: ${e.message}`);
  });

var postData = querystring.stringify(testServer.getStorage());

var options = {
  hostname: "localhost:8080",
  port: 80,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": Buffer.byteLength(postData)
  }
};

var req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding("utf8");
  res.on("data", chunk => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", () => {
    console.log("No more data in response.");
  });
});

req.on("error", e => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();

class Connector {
  constructor() {
    this._protocol = "surflineBuoys";
    this._socket = new WebSocket(wsurl, this._protocol);
    this._connected = false;
  }
}

module.exports = Connector;
