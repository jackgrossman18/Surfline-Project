# Surfline Project Backend

## This is the backend of my Surfline project

This backend serves the following purposes.

* Create a server for initiating a websocket
  * Using these websockets to send and receive json-rpc objects

* Create all methods through which JSON-RPC objects will be sent
  * JSON-RPC Request
  * JSON-RPC Response

* Create means through which all important JSON-RPC objects will be stored
  * Store addBuoy methods
  * Store updateBuoyData methods
  * Store subscribeBuoyData methods
  * Store buoyNotifications
