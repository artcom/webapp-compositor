import * as types from "./actionTypes"
import {
  DEFAULT_LAYER_TYPE,
  DEFAULT_LAYER_LEFT,
  DEFAULT_LAYER_TOP,
  DEFAULT_LAYER_WIDTH,
  DEFAULT_LAYER_HEIGHT,
} from "./layers"
import { DEFAULT_TRANSITION } from "./transitions"

export function setConnected(connected) {
  return connected ? { type: types.SET_CONNECTED } : { type: types.SET_DISCONNECTED }
}

export function startWebApp(payload, bootstrapData) {
  const {
    uri,
    tour,
    layer,
    layerType = DEFAULT_LAYER_TYPE,
    bootstrap = true,
    restart = true,
    transition = DEFAULT_TRANSITION,
    dimBackground = false,
    backgroundColor,
    left = DEFAULT_LAYER_LEFT,
    top = DEFAULT_LAYER_TOP,
    width = DEFAULT_LAYER_WIDTH,
    height = DEFAULT_LAYER_HEIGHT,
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
    bootstrapData,
  }
}

export function stopWebApp({ layer }) {
  return {
    type: types.STOP_WEB_APP,
    layer,
  }
}

export function reset() {
  return {
    type: types.RESET,
  }
}

export function deleteTour(tour) {
  return {
    type: types.DELETE_TOUR,
    tour,
  }
}
