const http = require("http");
const Server = require("../server/server");
const JSON_RPC = require("../json-rpc/json-rpc");
const expect = require("chai").expect;

var testServer = new Server();

describe("Server makes request and responds 'ok'", function() {
  it("accepts requests, responds", function() {
    var addBuoy = JSON.stringify(
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
    var updateBuoy = JSON.stringify(
      JSON_RPC.buildRequest(
        "updateBuoyData",
        {
          name: "SAN PEDRO",
          height: 2.6,
          period: 8
        },
        "86ad437b-de37-4cd7-8153-0090647f6b41"
      )
    );

    var subscribeBuoy = JSON.stringify(
      JSON_RPC.buildRequest(
        "subscribeToBuoys",
        {
          south: 32.106,
          west: -122.056,
          north: 34.71,
          east: -117.461
        },
        "cb52cf69-915d-4a9b-8ed6-19cf40c7a7f1"
      )
    );

    var options = {
      hostname: "localhost",
      port: 8080,
      path: "/",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": addBuoy.length
      }
    };
    var request = http.request(options, function(result) {
      var resultData = "";
      result.setEncoding("utf8");
      result.on("data", function(chunk) {
        resultData += chunk.toString();
      });
      result.on("end", function() {
        resultData = JSON.parse(resultData);
        console.log(testServer.getStorage());
      });
      result.on("error", function(error) {
        console.log(error);
      });
    });
    request.write(addBuoy);
    request.end();
  });
});
