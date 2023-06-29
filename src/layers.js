export const LAYER_TYPES = {
  I_FRAME: "iframe",
  WEB_VIEW: "webView",
}

export const DEFAULT_LAYER = {
  TYPE: LAYER_TYPES.I_FRAME,
  LEFT: "0px",
  TOP: "0px",
  WIDTH: "100%",
  HEIGHT: "100%",
}

export function getZIndices(layer) {
  return {
    dimmerZIndex: layer * 3,
    webAppZIndexExit: layer * 3 + 1,
    webAppZIndexEnter: layer * 3 + 2,
  }
}
