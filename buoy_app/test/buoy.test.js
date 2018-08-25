const should = require("chai").should();
const expect = require("chai").expect;
const request = require("supertest");
const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../controllers"));

describe("GET /buoy", function() {
  //Start Testing
  it("should return 200 response", function(done) {
    request(app)
      .get("/buoy")
      .set("Accept", "application/json")
      .expect(200, done);
  });
});

describe("POST /buoy", function() {
  it("send a buoy to server", function(done) {
    var buoy = {
      jsonrpc: "2.0",
      method: "addBuoy",
      params: {
        name: "SAN PEDRO",
        lat: 33.618,
        lon: -118.317
      },
      id: "3f052f4f-2f4a-46d8-aee7-fb6639942795"
    };
    request(app)
      .post("/buoy")
      .send(buoy)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("request result is  'ok' ", function(done) {
    var serverRes = {
      jsonrpc: "2.0",
      result: "ok",
      id: "3f052f4f-2f4a-46d8-aee7-fb6639942795"
    };
    request(app)
      .post("/buoy")
      .send(serverRes)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("some new buoy data is requested", function(done) {
    var updateReq = {
      jsonrpc: "2.0",
      method: "updateBuoyData",
      params: {
        name: "SAN PEDRO",
        height: 2.6,
        period: 8
      },
      id: "86ad437b-de37-4cd7-8153-0090647f6b41"
    };
    request(app)
      .post("/buoy")
      .send(updateReq)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("update response is 'ok' ", function(done) {
    var updateRes = {
      jsonrpc: "2.0",
      result: "ok",
      id: "86ad437b-de37-4cd7-8153-0090647f6b41"
    };
    request(app)
      .post("/buoy")
      .send(updateRes)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("should subscribe to buoys within bounding box", function(done) {
    var subscribeReq = {
      jsonrpc: "2.0",
      method: "subscribeToBuoys",
      params: {
        south: 32.106,
        west: -122.056,
        north: 34.71,
        east: -117.461
      },
      id: "cb52cf69-915d-4a9b-8ed6-19cf40c7a7f1"
    };
    request(app)
      .post("/buoy")
      .send(subscribeReq)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it("Response to subscribe req should be 'ok' ", function(done) {
    var subscribeRes = {
      jsonrpc: "2.0",
      result: "ok",
      id: "cb52cf69-915d-4a9b-8ed6-19cf40c7a7f1"
    };
    request(app)
      .post("/buoy")
      .send(subscribeRes)
      .set("Accept", "application/json")
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
