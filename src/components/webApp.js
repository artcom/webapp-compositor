import { motion } from "framer-motion"

import { getZIndices } from "../layers"
import { getTransition } from "../transitions"
import CloseButton from "./closeButton"

const WebApp = ({ layer, index, administrationTopic }) => {
  const { backgroundColor, height, layerType, left, top, transition, uri, width } = layer
  const style = { top, left, width, height, backgroundColor }
  const Layer = motion[layerType.toLowerCase()]
  const { webAppZIndexEnter, webAppZIndexExit } = getZIndices(index)

  return (
    <motion.div
      style={style}
      className={"fullscreen"}
      {...getTransition(webAppZIndexEnter, webAppZIndexExit, transition)}
    >
      <Layer src={uri} className={"fullscreen"} allow={"camera *; microphone *"} />

      {layer.closeButton && (
        <CloseButton
          key={`closeButton-${index}${layer.uri}${layer.count}`}
          config={layer.closeButton}
          index={index}
          administrationTopic={administrationTopic}
        />
      )}
    </motion.div>
  )
}

export default WebApp
