import { connect } from "react-redux"
import { AnimatePresence } from "framer-motion"

import Status from "./status"
import DebugControls from "./debugControls"
import Dimmer from "./dimmer"
import WebApp from "./webApp"
import CloseButton from "./closeButton"

const App = ({ connected, layers, areExitingWebAppsToBeOverlaid, showDebugControls }) => {
  return (
    <>
      {showDebugControls && <DebugControls />}
      <Status connected={connected} />
      <AnimatePresence custom={areExitingWebAppsToBeOverlaid}>
        {layers.map((layer, index) => [
          layer.dimBackground && <Dimmer key={`dimmer ${index}`} index={index} />,

          <WebApp key={`${index}${layer.uri}${layer.count}`} layer={layer} index={index} />,

          layer.closeButton?.uri && (
            <CloseButton
              key={`${index}${layer.closeButton.uri}${layer.count}`}
              layer={{
                ...layer,
                ...layer.closeButton,
              }}
              index={index}
            />
          ),
        ])}
      </AnimatePresence>
    </>
  )
}

export default connect(({ connected, layers, areExitingWebAppsToBeOverlaid }) => ({
  connected,
  layers,
  areExitingWebAppsToBeOverlaid,
}))(App)
