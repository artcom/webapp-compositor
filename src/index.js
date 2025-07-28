import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { connectAsync, MqttProvider } from "@artcom/mqtt-topping-react"

import App from "./components/app"
import createEventHandler from "./deviceEventHandler"
import store from "./store"
import "../css/main.css"

const start = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const showDebugControls = urlParams.get("debug") !== null
  const administrationTopic = process.env.ADMINISTRATION_TOPIC

  if (!administrationTopic) {
    console.error("Environment variable 'ADMINISTRATION_TOPIC' is missing")
  }

  const bootstrapData = Object.fromEntries(new URLSearchParams(window.location.search).entries())
  const { device, wsBrokerUri } = bootstrapData

  const mqttClient = await connectAsync(wsBrokerUri, {
    appId: "WebAppCompositor",
    deviceId: device,
  })
  console.log("mqttClient:", mqttClient)

  createEventHandler(mqttClient, bootstrapData, administrationTopic, store)

  const root = createRoot(document.getElementById("app"))
  root.render(
    <Provider store={store}>
      <MqttProvider mqttClient={mqttClient}>
        <App
          bootstrapData={bootstrapData}
          showDebugControls={showDebugControls}
          administrationTopic={administrationTopic}
        />
      </MqttProvider>
    </Provider>
  )
}

start()
