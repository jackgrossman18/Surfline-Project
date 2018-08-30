var JSON_RPC = {};
(function() {
  "use strict";

  var id = 0,
    callbacks = {};

  // Construct JSON RPC request
  JSON_RPC.buildRequest = function(method, params, id) {
    // rpcRequest
    var request = {};
    request.jsonrpc = "2.0";
    request.method = method; // rpcRequest.method;
    if (typeof params !== "undefined") {
      request.params = params; // rpcRequest.param
    }

    request.id = id || id++; // rpcRequest.id || uuid();
    return request;
  };

  // Construct JSON RPC response
  JSON_RPC.buildResponse = function(result, id) {
    // rpc Response
    var response = {};
    response.jsonrpc = "2.0";
    if (typeof result !== "undefined") {
      response.result = result;
    }
    response.id = id;
    return response;
  };

  // Construct JSON RPC Notification
  JSON_RPC.buildNotification = function(method, params) {
    // rpcUpdate
    var notification = {};
    notification.jsonrpc = "2.0";
    notification.method = method;
    if (typeof params !== undefined) {
      notification.params = params; // update params
    }
    return notification;
  };

  // Construct JSON RPC Errors
  JSON_RPC.buildError = function(code, id) {
    var res = {};
    var error = {};
    function getMessage(code) {
      let message;
      if (code === -32700) {
        message = "Invalid JSON was received by the server.";
      }
      if (code === -32600) {
        message = "The JSON sent is not a valid Request object.";
      }
      if (code === -32601) {
        message = "The method does not exist / is not available.";
      }
      if (code === -32602) {
        message = "Invalid method parameter(s).";
      }
      if (code === -32603) {
        message = "Internal JSON-RPC error.";
      }
      if (code <= -32000 && code >= -32099) {
        message = "	Reserved for implementation-defined server-errors.";
      }
      return message;
    }
    res.jsonrpc = "2.0";
    error.code = code;
    error.message = getMessage(code);
    res.id = id || id++;
    return res;
  };
})();

try {
  module.exports = JSON_RPC;
} catch (err) {}
