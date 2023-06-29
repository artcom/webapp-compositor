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
    dimmerZIndex: layer * 4,
    webAppZIndexExit: layer * 4 + 1,
    webAppZIndexEnter: layer * 4 + 2,
    webAppZIndexClosButton: layer * 4 + 3,
  }
}
