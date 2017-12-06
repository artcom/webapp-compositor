import mapValues from "lodash.mapvalues"
import querystring from "querystring"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import { createLogger } from "redux-logger"

import WebAppDisplay from "./components/webAppDisplay"
import createEventHandler from "./deviceEventHandler"
import * as reducers from "./reducers"

const logger = createLogger({
  collapsed: true,
  stateTransformer:
    state => mapValues(state, (value, key) => key === "layers" ? value.toJS() : value)
})

const createStoreWithMiddleware = applyMiddleware(logger)(createStore)
const store = createStoreWithMiddleware(combineReducers(reducers))
const bootstrapData = querystring.parse(window.location.search.substring(1))

createEventHandler(bootstrapData, process.env.ADMINISTRATION_TOPIC, store)

ReactDOM.render(
  <Provider store={ store }>
    <WebAppDisplay />
  </Provider>,
  document.getElementById("app")
)
