const http = require("http");
const Client = require("../client/client");
const JSON_RPC = require("../json-rpc/json-rpc");
const expect = require("chai").expect;

describe("Client opens websocket and begins sending messages'", function() {
  it("Opens socket", function() {
    var test_addbuoy = JSON.stringify(
      JSON_RPC.buildRequest(
        "addBuoy",
        {
          name: "SAN PEDRO",
          lat: 33.618,
          lon: -118.317
        },
        "3f052f4f-2f4a-46d8-aee7-fb6639942795"
      )
    );
    var options = {
      port: 8080,
      hostname: "127.0.0.1",
      headers: {
        Connection: "Upgrade",
        Upgrade: "websocket"
      }
    };
    const req = http.request(options);
    req.end();
  });
});
