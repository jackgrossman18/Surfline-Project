# Surfline Project Backend

## This is the backend of my Surfline project

At a high-level, this backend intends to create a server, instantiate websockets, and then use those websockets to send data in the form of a JSON-RPC object between the server and the client. 

The data that is sent to the client from the server comes from buoys in the pacific ocean. They are intended to supply the information that will allow for Surfline's rating system to rate the current surf conditions at your favorite surf spot.

This backend serves the following purposes.

#### Server

The server allows for the instantiation of a new server, the creation of an 'inBuoy' websocket and a 'outBuoy' websocket for sending jsonrpc objects that contain buoys data and subsequently receiving jsonrpc response objects that notify the server that the objects have been received properly. 

#### Storage

The storage file allows for buoys to be stored using indivual methods like 'addBuoy', 'updateBuoyData', and'subscribeToBuoys'.

* addBuoy stores buoys objects
* updateBuoyData adds new information, including swell height and period to the added buoys.
* subscribeToBuoys allows for the addition of buoys within the map bounds

#### Index

The index file is used to create the new server which will allow for the websockets to active and send data to the front end once it's receieved from the buoys.
  
#### JSON_RPC 

The JSON_RPC file builds all methods through which these objecst will be sent and recieved.

* Build Request buils a JSONRPC request
* Build Response builds the 'ok' response from a sucessfully requested JSON RPC object

Here is an example of that request, response exchange...

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



* Build Notification builds the buoy update notification for incoming new buoy data
* Build Error, builds all of the potential JSON RPC response errors (invalid JSON, request object, method etc.)


#### Tests

The test directory was used to for the follwing purposes.

* Test the exchange of json-rpc objects, request and response.
* Testing that a client was active and capable of being sent messages
* Test server for sending all of the aforementioned steps
