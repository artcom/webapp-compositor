import isFinite from "lodash.isfinite"

import createWebApp from "./createWebApp"
import * as types from "./actionTypes"

export function connected(state = false, action) {
  switch (action.type) {
    case types.SET_CONNECTED:
      return true
    case types.SET_DISCONNECTED:
      return false
    default:
      return state
  }
}

export function layers(state = [], action) {
  switch (action.type) {
    case types.START_WEB_APP: {
      const webApp = createWebApp(action, lastCount(state, action.layer))
      if (action.shallRemoveAllOtherWebApps) {
        return [webApp]
      } else {
        const result = state.slice()
        result[action.layer] = webApp
        return result
      }
    }
    case types.STOP_WEB_APP:
      if (isFinite(action.layer)) {
        const result = state.slice()
        delete result[action.layer]
        return result
      } else {
        return state
      }
    case types.DELETE_TOUR:
      return state.filter((layer) => layer.tour !== action.tour)
    case types.RESET:
      return []
    default:
      return state
  }
}

export function isCleanStart(state = true, action) {
  switch (action.type) {
    case types.START_WEB_APP:
      return action.isCleanStart
    default:
      return state
  }
}

function lastCount(allLayers, layer) {
  return allLayers[layer] ? allLayers[layer].count : 0
}
