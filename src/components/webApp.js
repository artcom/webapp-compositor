import { motion } from "framer-motion"

import { getWebAppZIndices } from "../layers"
import transitions from "../transitions"

const WebApp = ({ layer, index }) => {
  const { backgroundColor, height, layerType, left, top, transition, uri, width } = layer
  const style = { top, left, width, height, backgroundColor }
  const Layer = motion[layerType]
  const zLayerIndices = getWebAppZIndices(index)

  return (
    <Layer
      src={uri}
      style={style}
      className={"fullscreen"}
      allow={"camera *; microphone *"}
      custom={{
        zIndexEnter: zLayerIndices.enter,
        zIndexExit: zLayerIndices.exit,
      }}
      {...transitions[transition]}
    />
  )
}

export default WebApp
