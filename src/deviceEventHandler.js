import topping from "mqtt-topping"

import { deleteTour, reset, setConnected, startWebApp, stopWebApp } from "./actionCreators"

export default function createEventHandler(bootstrapData, administrationTopic, store) {
  const {
    device,
    deviceTopic,
    wsBrokerUri,
    httpBrokerUri
  } = bootstrapData

  const clientId = `WebappDisplay-${device}-${Math.random().toString(16).substr(2, 8)}`
  const mqtt = topping.connect(wsBrokerUri, httpBrokerUri, { clientId })

  mqtt.on("connect", () => {
    store.dispatch(setConnected(true))
  })

  mqtt.on("close", () => {
    store.dispatch(setConnected(false))
  })

  mqtt.on("error", () => {
    store.dispatch(setConnected(false))
  })

  mqtt.subscribe(`${deviceTopic}/doReset`, () => {
    store.dispatch(reset())
  })

  mqtt.subscribe(`${deviceTopic}/doStartApp`, () => {
    store.dispatch(reset())
  })

  mqtt.subscribe(`${deviceTopic}/doStartWebApp`, (payload) => {
    store.dispatch(startWebApp(payload, bootstrapData))
  })

  mqtt.subscribe(`${deviceTopic}/doStopWebApp`, (payload) => {
    store.dispatch(stopWebApp(payload))
  })

  mqtt.subscribe(`${administrationTopic}/onTourDelete`, (tour) => {
    store.dispatch(deleteTour(tour))
  })
}
