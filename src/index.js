import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { createLogger } from "redux-logger"
import thunkMiddleware from "redux-thunk"

import App from "./components/app"
import createEventHandler from "./deviceEventHandler"
import * as reducers from "./reducers"
import "../css/main.css"

const urlParams = new URLSearchParams(window.location.search)
const showDebugControls = urlParams.get("debug") !== null

if (!showDebugControls) {
  const root = createRoot(document.getElementById("app"))
  root.render(<div> HI</div>)
} else {
  // eslint-disable-next-line no-undef
  const administrationTopic = process.env.ADMINISTRATION_TOPIC

  if (!administrationTopic) {
    console.error("Environment variable 'ADMINISTRATION_TOPIC' is missing")
  }

  const logger = createLogger({
    collapsed: true,
  })

  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore)
  const store = createStoreWithMiddleware(combineReducers(reducers))
  const bootstrapData = Object.fromEntries(new URLSearchParams(window.location.search).entries())

  createEventHandler(bootstrapData, administrationTopic, store)

  const root = createRoot(document.getElementById("app"))
  root.render(
    <Provider store={store}>
      {showDebugControls && <App showDebugControls={showDebugControls} />}
      {!showDebugControls && <div> HI</div>}
    </Provider>
  )
}
