# Surfline Project Backend

## This is the backend of my Surfline project

This backend serves the following purposes.

* Create a server for initiating a websocket
  * Using these websockets to send and receive json-rpc objects

* Create all methods through which JSON-RPC objects will be sent
  * JSON-RPC Request
  `
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
`
  * JSON-RPC Response
  `
{
  "jsonrpc": "2.0",
  "result": "ok",
  "id": "3f052f4f-2f4a-46d8-aee7-fb6639942795"
}
`

* Create means through which all important JSON-RPC objects will be stored
  * Store addBuoy methods
  * Store updateBuoyData methods
  * Store subscribeBuoyData methods
  * Store buoyNotifications
