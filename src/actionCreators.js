import * as types from "./actionTypes"

export function setConnected(connected) {
  return connected ? { type: types.SET_CONNECTED } : { type: types.SET_DISCONNECTED }
}

export function startWebApp(payload, bootstrapData) {
  const {
    uri,
    tour,
    layer,
    layerType = "iframe",
    bootstrap = true,
    restart = true,
    transition = "fade",
    dimBackground = false,
    backgroundColor,
    left = "0px",
    top = "0px",
    width = "100%",
    height = "100%"
  } = payload

  return {
    type: types.START_WEB_APP,
    uri,
    tour,
    layer,
    layerType,
    bootstrap,
    restart,
    transition,
    dimBackground,
    backgroundColor,
    left,
    top,
    width,
    height,
    bootstrapData
  }
}

export function stopWebApp({ layer }) {
  return {
    type: types.STOP_WEB_APP,
    layer
  }
}

export function reset() {
  return {
    type: types.RESET
  }
}

export function deleteTour(tour) {
  return {
    type: types.DELETE_TOUR,
    tour
  }
}
