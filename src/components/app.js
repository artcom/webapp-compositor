import { useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"

import Status from "./status"
import DebugControls from "./debugControls"
import Dimmer from "./dimmer"
import WebApp from "./webApp"
import CloseButton from "./closeButton"

const App = ({ showDebugControls, administrationTopic }) => {
  const connected = useSelector((state) => state.connected)
  const layers = useSelector((state) => state.layers)
  const areExitingWebAppsToBeOverlaid = useSelector((state) => state.areExitingWebAppsToBeOverlaid)

  return (
    <>
      {showDebugControls && <DebugControls />}
      <Status connected={connected} />
      <AnimatePresence custom={areExitingWebAppsToBeOverlaid}>
        {layers.map((layer, index) => [
          layer.dimBackground && <Dimmer key={`dimmer-${index}`} index={index} />,
          <WebApp key={`webApp-${index}${layer.uri}${layer.count}`} layer={layer} index={index} />,
          layer.closeButton && (
            <CloseButton
              key={`closeButton-${index}${layer.uri}${layer.count}`}
              config={layer.closeButton}
              index={index}
              layer={layer}
              administrationTopic={administrationTopic}
            />
          ),
        ])}
      </AnimatePresence>
    </>
  )
}

export default App
