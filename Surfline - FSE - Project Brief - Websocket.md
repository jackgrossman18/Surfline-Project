# Surfline - Full Stack Engineer - Project Brief

As a surfer, it's important to know when swells begin to approach the shoreline.
For this project, you will build an application that receives, stores, and
broadcasts buoy data.

## Requirements

### Requirement #1: Build an application that uses websockets to receive, store, and broadcast buoy data

Your application must expose a websocket using
[JSON-RPC v2.0](https://en.wikipedia.org/wiki/JSON-RPC) as its communication
protocol.

Your application must implement the methods listed below. For each method, your
application must acknowledge the request.

#### Method: `addBuoy`

Add a buoy to the application.

| Param  | Type   | Description                     |
| :----- | :----- | :------------------------------ |
| `name` | String | The name of the buoy            |
| `lat`  | Float  | Latitude (`-90.0` to `90.0`)    |
| `lon`  | Float  | Longitude (`-180.0` to `180.0`) |

##### Example

###### Request

```json
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

###### Response

```json
{
  "jsonrpc": "2.0",
  "result": "ok",
  "id": "3f052f4f-2f4a-46d8-aee7-fb6639942795"
}
```

#### Method: `updateBuoyData`

Update wave height and wave period for a buoy.

| Param    | Type    | Description                 |
| :------- | :------ | :-------------------------- |
| `name`   | String  | The name of the buoy        |
| `height` | Float   | The wave height, in feet    |
| `period` | Integer | The wave period, in seconds |

##### Example

###### Request

```json
{
  "jsonrpc": "2.0",
  "method": "updateBuoyData",
  "params": {
    "name": "SAN PEDRO",
    "height": 2.6,
    "period": 8
  },
  "id": "86ad437b-de37-4cd7-8153-0090647f6b41"
}
```

###### Response

```json
{
  "jsonrpc": "2.0",
  "result": "ok",
  "id": "86ad437b-de37-4cd7-8153-0090647f6b41"
}
```

#### Method: `subscribeToBuoys`

Subscribe to updates for all buoys within the given bounding box. This could be
used by a client application to display buoys on a map.

| Param   | Type  | Description                            |
| :------ | :---- | :------------------------------------- |
| `south` | Float | The south latitude of the bounding box |
| `west`  | Float | The west longitude of the bounding box |
| `north` | Float | The north latitude of the bounding box |
| `east`  | Float | The east longitude of the bounding box |

##### Example

###### Request

```json
{
  "jsonrpc": "2.0",
  "method": "subscribeToBuoys",
  "params": {
    "south": 32.106,
    "west": -122.056,
    "north": 34.71,
    "east": -117.461
  },
  "id": "cb52cf69-915d-4a9b-8ed6-19cf40c7a7f1"
}
```

###### Response

```json
{
  "jsonrpc": "2.0",
  "result": "ok",
  "id": "cb52cf69-915d-4a9b-8ed6-19cf40c7a7f1"
}
```

When the `subscribeToBuoys` method is invoked, the application must acknowledge
the subscription request and then send all buoys within the bounding box to the
client.

For any buoy that is added or updated after the `subscribeToBuoys` method is
invoked, if the buoy is within the subscribed bounding box, the application must
also send these buoys to the client.

A websocket client may only subscribe to one bounding box at a time. If a
subscribed client invokes `subscribeToBuoys` more than once, the earlier
subscription must be cancelled and the new subscription must take precedence.

Buoys must be sent to the client in the following format:

| Param    | Type    | Description                     |
| :------- | :------ | :------------------------------ |
| `name`   | String  | The name of the buoy            |
| `lat`    | Float   | Latitude (`-90.0` to `90.0`)    |
| `lon`    | Float   | Longitude (`-180.0` to `180.0`) |
| `height` | Float   | The wave height, in feet        |
| `period` | Integer | The wave period, in seconds     |

##### Example

###### Notification

```json
{
  "jsonrpc": "2.0",
  "method": "buoyNotification",
  "params": {
    "name": "SAN PEDRO",
    "lat": 33.618,
    "lon": -118.317,
    "height": 2.6,
    "period": 8
  }
}
```

Since this is a notification, no `id` parameter is sent and no response is
needed from the client.

### Requirement #2: Display buoys on a map

Your application must implement a map that displays buoys. It must update in
real-time as data is ingested. It must show the conditions at the buoy based on
the following criteria:

| condition | criteria                |
| :-------- | :---------------------- |
| `poor`    | < 4 feet at 4 seconds   |
| `fair`    | < 12 feet at 12 seconds |
| `good`    | > 12 feet at 12 seconds |

## Constraints

- In your implementation, we’re looking to see that you took considerations for
  high throughput and low latency.

- Your websocket server must implement
  [JSON-RPC v2.0](https://en.wikipedia.org/wiki/JSON-RPC) as its communication
  protocol.

- Store buoy data using an in-memory data structure, not in an external
  database.

- Your websocket buoy server shouldn't use any external libraries except for a
  websocket library. We're interested in seeing how you would solve these
  problems.

- Please don't use Socket.io as your websocket library. Your application should
  use vanilla websockets. More info at
  ["What Socket.IO is not"](https://socket.io/docs/#What-Socket-IO-is-not).
  
- Your mapping application can use Express, React, or whichever other
  libraries you'd like.

## Testing

We've provided a test harness that streams data into your application.

[Surfline Buoy Project Test Harness](https://www.surfline.com/careers/engineers/take-home-projects/buoys-tests/start.html)

Enter your application's websocket address into the form, click "Start", and
data will begin flowing into your application. The test harness will report back
test results based on your application's websocket responses to the harness.

## Extra Credit

You may choose to allow the user to move or resize the map. If you do, you
should subscribe to the updated bounding box.

For updated subscriptions, you might choose to optimize your application by only
initially returning buoys that exist within the new bounding box that didn't
exist in the previous bounding box.

You might also explore pre-caching outside of the viewport's bounding box for
smoother display when scrolling the viewport.

## Notes

- Include a README file with your application. This should contain a high-level
  description of the approach you took, instructions to run your application,
  and more detailed implementation notes.

- This application should be something you would be comfortable deploying to
  production and maintaining with a team.

- Feel free to make assumptions, just communicate them in your README and/or in
  code.

- This is your chance to show us what you've got. Do your best and be creative!

## Submitting

When you're ready for your project to be reviewed, please do the following:

1. Bundle it into a compressed archive (excluding `node_modules`)
2. Name the archive `surfline-buoy-project-{firstname}-{lastname}-{date}.zip`
3. Upload it to the submission link provided to you.
4. Message Lindsay to let her know that your project has been submitted.
