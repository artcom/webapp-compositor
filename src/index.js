import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./components/app"
import createEventHandler from "./deviceEventHandler"
import store from "./store"
import "../css/main.css"

const urlParams = new URLSearchParams(window.location.search)
const showDebugControls = urlParams.get("debug") !== null
const administrationTopic = process.env.ADMINISTRATION_TOPIC

if (!administrationTopic) {
  console.error("Environment variable 'ADMINISTRATION_TOPIC' is missing")
}

const bootstrapData = Object.fromEntries(new URLSearchParams(window.location.search).entries())

createEventHandler(bootstrapData, administrationTopic, store)

const root = createRoot(document.getElementById("app"))
root.render(
  <Provider store={store}>
    <App showDebugControls={showDebugControls} />
  </Provider>
)
