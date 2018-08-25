const expect = require("chai").expect;
// const request = require("supertest");
// const express = require("express");
JSON_RPC = require("../json-rpc/json-rpc");

// const app = express();

describe("JSON_RPC", function() {
  describe("#Request", function() {
    it("builds a json rpc request object", function() {
      var testRPC_request = {
        jsonrpc: "2.0",
        method: "addBuoy",
        params: {
          name: "SAN PEDRO",
          lat: 33.618,
          lon: -118.317
        },
        id: "3f052f4f-2f4a-46d8-aee7-fb6639942795"
      };
      var request = JSON_RPC.buildRequest(
        testRPC_request.method,
        testRPC_request.params,
        testRPC_request.id
      );
      expect(request).to.eql(testRPC_request);
    });
  });
  describe("#Response", function() {
    it("the server responds with an object", function() {
      var testRPC_response = {
        jsonrpc: "2.0",
        result: "ok",
        id: "3f052f4f-2f4a-46d8-aee7-fb6639942795"
      };
      var response = JSON_RPC.buildResponse(
        testRPC_response.result,
        testRPC_response.id
      );
      expect(response).to.eql(testRPC_response);
    });
  });
  describe("#Notification", function() {
    it("the server responds with an update", function() {
      var testRPC_notification = {
        jsonrpc: "2.0",
        method: "updateBuoyData",
        params: {
          name: "SAN PEDRO",
          height: 2.6,
          period: 8
        }
      };
      var update = JSON_RPC.buildNotification(
        testRPC_notification.method,
        testRPC_notification.params
      );
      expect(update).to.eql(testRPC_notification);
    });
  });
});
describe("#methodError", function() {
  it("there is no method present", function() {
    var testRPC_methoderror = {
      jsonrpc: "2.0",
      error: {
        code: -32700,
        message: "Method not found"
      },
      id: "1"
    };
    var methodError = JSON_RPC.buildmethodError(
      testRPC_methoderror.error.code,
      testRPC_methoderror.error.message,
      testRPC_methoderror.id
    );
    expect(methodError).to.eql(testRPC_methoderror);
  });
});
describe("#jsonError", function() {
  it("improper json", function() {
    var testRPC_jsonerror = {
      jsonrpc: "2.0",
      error: {
        code: -32600,
        message: "Parse error"
      },
      id: "0"
    };
    var jsonError = JSON_RPC.buildjsonError(
      testRPC_jsonerror.error.code,
      testRPC_jsonerror.error.message,
      testRPC_jsonerror.id
    );
    expect(jsonError).to.eql(testRPC_jsonerror);
  });
});
describe("#reqError", function() {
  it("Request error", function() {
    var testRPC_reqerr = {
      jsonrpc: "2.0",
      error: {
        code: -32600,
        message: "The JSON sent is not a valid Request object."
      },
      id: "0"
    };
    var reqError = JSON_RPC.buildreqError(
      testRPC_reqerr.error.code,
      testRPC_reqerr.error.message,
      testRPC_reqerr.id
    );
    expect(reqError).to.eql(testRPC_reqerr);
  });
});

describe("#paramError", function() {
  it("Param error", function() {
    var testRPC_paramerr = {
      jsonrpc: "2.0",
      error: {
        code: -32602,
        message: "Invalid method parameter(s)."
      },
      id: "0"
    };
    var paramError = JSON_RPC.buildparamError(
      testRPC_paramerr.error.code,
      testRPC_paramerr.error.message,
      testRPC_paramerr.id
    );
    expect(paramError).to.eql(testRPC_paramerr);
  });
});

describe("#internalError", function() {
  it("Internal error", function() {
    var testRPC_internalerr = {
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal JSON-RPC error."
      },
      id: "0"
    };
    var internalError = JSON_RPC.buildinternalError(
      testRPC_internalerr.error.code,
      testRPC_internalerr.error.message,
      testRPC_internalerr.id
    );
    expect(internalError).to.eql(testRPC_internalerr);
  });
});

describe("#serverError", function() {
  it("Server error", function() {
    var testRPC_servererr = {
      jsonrpc: "2.0",
      error: {
        code: -32000,
        message: "Implementation-defined server-error."
      },
      id: "0"
    };
    var serverError = JSON_RPC.buildserverError(
      testRPC_servererr.error.code,
      testRPC_servererr.error.message,
      testRPC_servererr.id
    );
    expect(serverError).to.eql(testRPC_servererr);
  });
});
