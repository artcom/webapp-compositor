import { motion } from "framer-motion"

import { getZIndices } from "../layers"
import { getTransition } from "../transitions"

const WebApp = ({ layer, index }) => {
  const { backgroundColor, height, layerType, left, top, transition, uri, width } = layer
  const style = { top, left, width, height, backgroundColor }
  const Layer = motion[layerType.toLowerCase()]

  const { webAppZIndexEnter, webAppZIndexExit } = getZIndices(index)

  return (
    <Layer
      src={uri}
      style={style}
      className={"fullscreen"}
      allow={"camera *; microphone *"}
      {...getTransition(webAppZIndexEnter, webAppZIndexExit, transition)}
    />
  )
}

export default WebApp
