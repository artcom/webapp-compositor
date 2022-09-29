import { motion } from "framer-motion"
import { getZIndices } from "../layers"

import { getTransition, DIMMER } from "../transitions"

const Dimmer = ({ index }) => {
  const { dimmerZIndex } = getZIndices(index)

  return (
    <motion.div
      {...getTransition(dimmerZIndex, dimmerZIndex, DIMMER)}
      className={`fullscreen dimmer`}
    ></motion.div>
  )
}

export default Dimmer
