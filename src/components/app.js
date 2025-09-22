import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"
import { useState, useCallback } from "react"
import { useMqttSubscribe } from "@artcom/mqtt-topping-react"

import Status from "./status"
import DebugView from "./debugView"
import DebugControls from "./debugControls"
import Dimmer from "./dimmer"
import WebApp from "./webApp"

const App = ({ showDebugControls, administrationTopic, bootstrapData }) => {
  const [debugView, showDebugView] = useState(false)
  const connected = useSelector((state) => state.connected)
  const layers = useSelector((state) => state.layers)
  const areExitingWebAppsToBeOverlaid = useSelector((state) => state.areExitingWebAppsToBeOverlaid)

  useMqttSubscribe(
    `tGallery/debug`,
    useCallback((payload) => {
      showDebugView(payload)
    }, [])
  )
  return (
    <>
      {debugView && <DebugView connected={connected} bootstrapData={bootstrapData} />}
      {showDebugControls && <DebugControls />}
      {!debugView && <Status connected={connected} />}

      <AnimatePresence custom={areExitingWebAppsToBeOverlaid}>
        {layers.map((layer, index) => [
          layer.dimBackground && <Dimmer key={`dimmer-${index}`} index={index} />,
          <WebApp
            key={`webApp-${index}${layer.uri}${layer.count}`}
            layer={layer}
            index={index}
            administrationTopic={administrationTopic}
          />,
        ])}
      </AnimatePresence>
    </>
  )
}

export default App
