import { useContext } from "react"
import { MqttContext } from "@artcom/mqtt-topping-react"
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"

import { getZIndices } from "../layers"
import { COMPONENT_TRANSITIONS, getTransition } from "../transitions"
import { stopWebApp } from "../actionCreators"

export const DEFAULT_STYLE = {
  LEFT: "90%",
  TOP: "0%",
  WIDTH: "10%",
  HEIGHT: "10%",
}

const CloseButton = ({
  config: {
    uri,
    actions,
    left = DEFAULT_STYLE.LEFT,
    top = DEFAULT_STYLE.TOP,
    width = DEFAULT_STYLE.WIDTH,
    height = DEFAULT_STYLE.HEIGHT,
  },
  layer,
  index,
  administrationTopic,
}) => {
  const dispatch = useDispatch()
  const { webAppZIndexEnter, webAppZIndexExit } = getZIndices(index)
  const { publish } = useContext(MqttContext)

  const layerStyle = { top: layer.top, left: layer.left, width: layer.width, height: layer.height }

  const onClickHandler = () => {
    dispatch(stopWebApp({ layer: index }))

    if (actions) {
      console.log(`Executing close actions: ${JSON.stringify(actions, null, 2)}`)
      publish(`${administrationTopic}/doExecuteActionList`, actions)
    }
  }

  return (
    <motion.div
      style={layerStyle}
      className="fullscreen"
      {...getTransition(webAppZIndexEnter, webAppZIndexExit, COMPONENT_TRANSITIONS.CLOSE_BUTTON)}
    >
      <motion.div
        className="closeButton"
        style={{ top, left, width, height }}
        whileTap={{ scale: 0.95 }}
        onClick={onClickHandler}
      >
        <iframe src={uri} />
      </motion.div>
    </motion.div>
  )
}

export default CloseButton
