import { useEffect, useRef } from "react"
import { connect } from "react-redux"
import { AnimatePresence } from "framer-motion"

import Status from "./status"
import DebugControls from "./debugControls"
import Dimmer from "./dimmer"
import WebApp from "./webApp"

const App = ({ connected, layers, showDebugControls }) => {
  const previousLayersCountRef = useRef(layers)

  useEffect(() => {
    previousLayersCountRef.current = layers.length
  }, [layers])

  return (
    <>
      {showDebugControls && <DebugControls />}
      <Status connected={connected} />
      <AnimatePresence>
        {layers.map((layer, index) => [
          layer.dimBackground && <Dimmer key={`dimmer ${index}`} index={index} />,
          <WebApp
            key={`${index}${layer.uri}${layer.count}`}
            layer={layer}
            enterIndex={
              isCleanStartWithExitingLayers(index, layers.length, previousLayersCountRef.current)
                ? previousLayersCountRef.current
                : index
            }
            exitIndex={index}
          />,
        ])}
      </AnimatePresence>
    </>
  )
}

function isCleanStartWithExitingLayers(index, currentLayersCount, previousLayersCount) {
  return index === 0 && currentLayersCount === 1 && previousLayersCount > 1
}

export default connect(({ connected, layers }) => ({ connected, layers }))(App)
