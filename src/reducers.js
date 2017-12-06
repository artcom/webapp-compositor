import { Map } from "immutable"
import isFinite from "lodash.isfinite"

import { createWebApp } from "./webapp"
import * as types from "./actionTypes"

export function connected(connected = false, action) {
  switch (action.type) {
    case types.SET_CONNECTED:
      return action.connected
    default:
      return connected
  }
}

export function layers(layers = new Map(), action) {
  switch (action.type) {
    case types.START_WEB_APP:
      if (isFinite(action.layer)) {
        const webApp = createWebApp(action, lastCount(layers, action.layer))
        return layers.set(action.layer, webApp).sortBy((value, key) => key)
      } else {
        const webApp = createWebApp({ ...action, layer: 0 }, lastCount(layers, 0))
        return new Map([[0, webApp]])
      }
    case types.STOP_WEB_APP:
      if (isFinite(action.layer)) {
        return layers.delete(action.layer)
      } else {
        return layers
      }
    case types.DELETE_TOUR:
      return layers.filter(layer => layer.get("tour") !== action.tour)
    case types.RESET:
      return new Map()
    default:
      return layers
  }
}

function lastCount(layers, layer) {
  return layers.getIn([layer, "count"], 0)
}
