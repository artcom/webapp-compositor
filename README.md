# Webapp Compositor

The compositor acts as a window manager for webApps on multiple layers with an MQTT API. WebApps can be started with specific enter/exit transitions as well as individual geometry for custom overlay scenarios.

Note: On startup the compositor publishes `${administrationTopic}/doExecuteActionList`: `${deviceTopic}/defaultActions` to setup itself.

## Run

* Run in development: `ADMINISTRATION_TOPIC=<administration-topic> npm run watch`
* Start the application: `PORT=5000 ADMINISTRATION_TOPIC=<administration-topic> npm start`

## API

### devices/\<device\>/doStartWebApp

This command starts a web application or website with the given `uri`. 

**Payload Format:**
```js
{
  uri: String,
  tour?: String,  // the tour the webApp belongs to, see below
  layer?: Number, // positiv layer index, default: 0
  layerType?: "iframe" | "webview", // layer type used for the webApp, default: "iframe"
  transition?: "fade" | "scrollLeft" | "scrollRight" | "scale" | "grayCrossFade" | "none", // default: "fade"
  dimBackground?: Boolean, // adds a fullscreen dimmed background behind the webApp, default: false
  backgroundColor?: String, // CSS backgroundColor (e.g. "#fff") which is visible if the webApp has a transparent background, default: undefined
  bootstrap?: Boolean, // defines wether to append bootstrap params to the uri or not, default: true
  restart?: Boolean, // defines wether to restart the webApp if the same webApp is already open on the same layer, default: true
  left?: String,  // left postion of the webApp, default: "0px"
  top?: String,   // top postion of the webApp, default: "0px"
  width?: String, // width of the webApp, default: "100%"
  height?: String  // height of the webApp, default: "100%"
}
```
**Payload Example:**
```js
{
  uri: "https://www.wikipedia.org/",
  tour: "my-tour"
}
```

### devices/\<device\>/doStopWebApp

This command removes a running web application or websites from the given layer. 

**Payload Format:**
```js
{
  layer: Number, // positiv layer index
}
```
**Payload Example:**
```js
{
  layer: 0
}
```

### devices/\<device\>/doReset

This command resets the entire compositor which removes all running webApps. 

**Payload Format:**
```js
null
```
**Payload Example:**
```js
null
```

### \<administrationTopic\>/onTourDelete

This event removes all running webApps wich have been started with the given tour.

**Payload Format:**
```js
String
```
**Payload Example:**
```js
myTour
```


## Tour Context

If a tour is given on `doStartWebApp` the webApp will receive tour related bootstrap param and will be removed `onTourDelete`. 


