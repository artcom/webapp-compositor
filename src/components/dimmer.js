import { motion } from "framer-motion"

import { WEBAPP_LOAD_COMPLETE } from "../transitions"
import { getDimmerZIndex } from "../layers"

const Dimmer = ({ index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.4,
        transition: {
          duration: 0.5,
          delay: WEBAPP_LOAD_COMPLETE,
        },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5, delay: 0 },
      }}
      style={{ zIndex: getDimmerZIndex(index) }}
      className={`fullscreen dimmer`}
    ></motion.div>
  )
}

export default Dimmer
