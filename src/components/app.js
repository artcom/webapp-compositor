import { connect } from "react-redux"
import { AnimatePresence } from "framer-motion"

import Status from "./status"
import DebugControls from "./debugControls"
import Dimmer from "./dimmer"
import WebApp from "./webApp"

const App = ({ connected, layers, isCleanStart, showDebugControls }) => {
  return (
    <>
      {showDebugControls && <DebugControls />}
      <Status connected={connected} />
      <AnimatePresence custom={isCleanStart}>
        {layers.map((layer, index) => [
          layer.dimBackground && <Dimmer key={`dimmer ${index}`} index={index} />,
          <WebApp key={`${index}${layer.uri}${layer.count}`} layer={layer} index={index} />,
        ])}
      </AnimatePresence>
    </>
  )
}

export default connect(({ connected, layers, isCleanStart }) => ({
  connected,
  layers,
  isCleanStart,
}))(App)
