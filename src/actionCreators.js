import * as types from "./actionTypes"
import { DEFAULT_LAYER } from "./layers"
import { DEFAULT_TRANSITION } from "./transitions"

export function setConnected(connected) {
  return connected ? { type: types.SET_CONNECTED } : { type: types.SET_DISCONNECTED }
}

export function startWebApp(payload, bootstrapData) {
  return (dispatch, getState) => {
    const {
      uri,
      tour,
      layer = 0,
      layerType = DEFAULT_LAYER.TYPE,
      bootstrap = true,
      restart = true,
      transition = DEFAULT_TRANSITION,
      dimBackground = false,
      backgroundColor,
      left = DEFAULT_LAYER.LEFT,
      top = DEFAULT_LAYER.TOP,
      width = DEFAULT_LAYER.WIDTH,
      height = DEFAULT_LAYER.HEIGHT,
    } = payload

    const { layers } = getState()
    const shallRemoveAllOtherWebApps = !isFinite(payload.layer)
    const bootstrappedUri = bootstrap ? addQueryParams(uri, tour, bootstrapData, layer) : uri
    const areExitingWebAppsToBeOverlaid =
      shallRemoveAllOtherWebApps && (restart || bootstrappedUri !== layers[0]?.uri)

    dispatch({
      type: types.START_WEB_APP,
      shallRemoveAllOtherWebApps,
      layer,
      restart,
      areExitingWebAppsToBeOverlaid,
      uri: bootstrappedUri,
      tour,
      layerType,
      transition,
      dimBackground,
      backgroundColor,
      left,
      top,
      width,
      height,
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

export function addQueryParams(uri, tour, bootstrapParams, layer) {
  const url = new URL(uri)

  Object.entries(bootstrapParams).forEach(([key, value]) =>
    appendIfNotPresent(url.searchParams, key, value)
  )

  if (tour) {
    appendIfNotPresent(url.searchParams, "tour", tour)
    appendIfNotPresent(url.searchParams, "tourTopic", `tours/${tour}`)
  }

  appendIfNotPresent(url.searchParams, "layer", layer)

  return url.href
}

function appendIfNotPresent(searchParams, key, value) {
  if (!searchParams.has(key)) {
    searchParams.append(key, value)
  }
}
