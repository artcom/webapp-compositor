import { Map } from "immutable"
import isFinite from "lodash.isfinite"

import { createWebApp } from "./webapp"
import * as types from "./actionTypes"

export function connected(state = false, action) {
  switch (action.type) {
    case types.SET_CONNECTED:
      return action.connected
    default:
      return state
  }
}

export function layers(state = new Map(), action) {
  switch (action.type) {
    case types.START_WEB_APP:
      if (isFinite(action.layer)) {
        const webApp = createWebApp(action, lastCount(state, action.layer))
        return state.set(action.layer, webApp).sortBy((value, key) => key)
      } else {
        const webApp = createWebApp({ ...action, layer: 0 }, lastCount(state, 0))
        return new Map([[0, webApp]])
      }
    case types.STOP_WEB_APP:
      if (isFinite(action.layer)) {
        return state.delete(action.layer)
      } else {
        return state
      }
    case types.DELETE_TOUR:
      return state.filter(layer => layer.get("tour") !== action.tour)
    case types.RESET:
      return new Map()
    default:
      return state
  }
}

function lastCount(allLayers, layer) {
  return allLayers.getIn([layer, "count"], 0)
}
