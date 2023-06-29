import { motion } from "framer-motion"

import { getZIndices } from "../layers"
import { getTransition } from "../transitions"
import { stopWebApp } from "../actionCreators"
import { useDispatch } from "react-redux"

export const DEFAULT_STYLE = {
  LEFT: "90%",
  TOP: "0px",
  WIDTH: "10%",
  HEIGHT: "10%",
}

const CloseButton = ({ layer, index }) => {
  const {
    left = DEFAULT_STYLE.LEFT,
    top = DEFAULT_STYLE.TOP,
    width = DEFAULT_STYLE.WIDTH,
    height = DEFAULT_STYLE.HEIGHT,
    layerType,
    transition,
    uri,
  } = layer
  const style = { top, left, width, height }
  const Layer = motion[layerType.toLowerCase()]

  const { webAppZIndexClosButton } = getZIndices(index)
  const dispatch = useDispatch()

  return (
    <>
      <Layer
        src={uri}
        style={style}
        className={"fullscreen"}
        {...getTransition(webAppZIndexClosButton, webAppZIndexClosButton, transition)}
      />
      <div
        onClick={() => {
          dispatch(stopWebApp({ layer: index }))
        }}
        className={"fullscreen"}
        style={{ ...style, zIndex: webAppZIndexClosButton }}
      ></div>
    </>
  )
}

export default CloseButton
