import { motion } from "framer-motion"

import { getZIndices } from "../layers"
import { COMPONENT_TRANSITIONS, getTransition } from "../transitions"
import { stopWebApp } from "../actionCreators"
import { useDispatch } from "react-redux"

export const DEFAULT_STYLE = {
  LEFT: "90%",
  TOP: "0%",
  WIDTH: "10%",
  HEIGHT: "10%",
}

const CloseButton = ({ config, index }) => {
  const {
    uri,
    left = DEFAULT_STYLE.LEFT,
    top = DEFAULT_STYLE.TOP,
    width = DEFAULT_STYLE.WIDTH,
    height = DEFAULT_STYLE.HEIGHT,
  } = config

  const dispatch = useDispatch()
  const { webAppZIndexEnter, webAppZIndexExit } = getZIndices(index)

  return (
    <motion.div
      className={"closeButton"}
      style={{ top, left, width, height }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(stopWebApp({ layer: index }))}
      {...getTransition(webAppZIndexEnter, webAppZIndexExit, COMPONENT_TRANSITIONS.CLOSE_BUTTON)}
    >
      <iframe src={uri} />
    </motion.div>
  )
}

export default CloseButton
