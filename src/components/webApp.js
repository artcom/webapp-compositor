import { motion } from "framer-motion"

import { getWebAppZIndices } from "../layers"
import transitions from "../transitions"

const WebApp = ({ layer, enterIndex, exitIndex }) => {
  const { backgroundColor, height, layerType, left, top, transition, uri, width } = layer
  const style = { top, left, width, height, backgroundColor }
  const Layer = motion[layerType]

  return (
    <Layer
      src={uri}
      style={style}
      className={"fullscreen"}
      allow={"camera *; microphone *"}
      custom={{
        zIndexEnter: getWebAppZIndices(enterIndex).enter,
        zIndexExit: getWebAppZIndices(exitIndex).exit,
      }}
      {...transitions[transition]}
    />
  )
}

export default WebApp
