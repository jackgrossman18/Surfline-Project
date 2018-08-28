# Surfline Project Backend

## This is the backend of my Surfline project

At a high-level, this backend intends to create a server, instantiate websockets, and then use those websockets to send data in the form of a JSON-RPC object between the server and the client. 

The data that is sent to the client from the server comes from buoys in the pacific ocean. They are intended to supply the information that will allow for Surfline's rating system to rate the current surf conditions at your favorite surf spot.

This backend serves the following purposes.

### Create a server with WebSockets

* Create a server for initiating a websocket
  * Using these websockets to send and receive json-rpc objects

### Send JSON-RPC objects through these websockets, recieve an 'ok' response to assure objects have been recieved.

* Create all methods through which JSON-RPC objects will be sent
  * JSON-RPC Request
```
{
  "jsonrpc": "2.0",
  "method": "addBuoy",
  "params": {
    "name": "SAN PEDRO",
    "lat": 33.618,
    "lon": -118.317
  },
  "id": "3f052f4f-2f4a-46d8-aee7-fb6639942795"
}
```
  * JSON-RPC Response
```
{
  "jsonrpc": "2.0",
  "result": "ok",
  "id": "3f052f4f-2f4a-46d8-aee7-fb6639942795"
}
````

### Store all added buoys, updated buoys and notifications from buoys as new data comes in.

* Create means through which all important JSON-RPC objects will be stored
  * Store addBuoy methods
  * Store updateBuoyData methods
  * Store subscribeBuoyData methods
  * Store buoyNotifications
