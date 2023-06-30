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

const CloseButton = ({ options, index }) => {
  const {
    uri,
    left = DEFAULT_STYLE.LEFT,
    top = DEFAULT_STYLE.TOP,
    width = DEFAULT_STYLE.WIDTH,
    height = DEFAULT_STYLE.HEIGHT,
    transition,
  } = options
  const style = { top, left, width, height }

  const { webAppZIndexClosButton } = getZIndices(index)
  const dispatch = useDispatch()

  return (
    <motion.div
      className={"closebutton"}
      style={style}
      whileTap={{ scale: 0.95 }}
      {...getTransition(webAppZIndexClosButton, webAppZIndexClosButton, transition)}
      onClick={() => dispatch(stopWebApp({ layer: index }))}
    >
      <iframe src={uri} />
    </motion.div>
  )
}

export default CloseButton
