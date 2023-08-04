import { motion } from "framer-motion"
import { getZIndices } from "../layers"

import { getTransition, COMPONENT_TRANSITIONS } from "../transitions"

const Dimmer = ({ index }) => {
  const { dimmerZIndex } = getZIndices(index)

  return (
    <motion.div
      {...getTransition(dimmerZIndex, dimmerZIndex, COMPONENT_TRANSITIONS.DIMMER)}
      className={`fullscreen dimmer`}
    />
  )
}

export default Dimmer
