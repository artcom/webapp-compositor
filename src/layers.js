export const LAYER_TYPES = {
  I_FRAME: "iframe",
  WEB_VIEW: "webView",
}
export const DEFAULT_LAYER_TYPE = LAYER_TYPES.I_FRAME

export const DEFAULT_LAYER_LEFT = "0px"
export const DEFAULT_LAYER_TOP = "0px"
export const DEFAULT_LAYER_WIDTH = "100%"
export const DEFAULT_LAYER_HEIGHT = "100%"

export function getDimmerZIndex(layer) {
  return layer * 3
}

export function getWebAppZIndices(layer) {
  return {
    enter: layer * 3 + 2,
    exit: layer * 3 + 1,
  }
}
