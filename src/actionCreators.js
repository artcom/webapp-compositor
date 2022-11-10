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
  return (dispatch, getState) => {
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

    const { layers } = getState()
    const isCleanStart = !isFinite(layer) && (restart || !isSameUriPathname(layers[0]?.uri, uri))

    dispatch({
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
      isCleanStart,
    })
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

function isSameUriPathname(uri1, uri2) {
  if (!uri1 || !uri2) return false

  const pathname1 = new URL(uri1).pathname
  const pathname2 = new URL(uri2).pathname
  return pathname1 === pathname2
}
