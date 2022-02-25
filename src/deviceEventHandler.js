import { connect } from "@artcom/mqtt-topping"

import { deleteTour, reset, setConnected, startWebApp, stopWebApp } from "./actionCreators"

export default function createEventHandler(bootstrapData, administrationTopic, store) {
  const { device, deviceTopic, wsBrokerUri } = bootstrapData

  const mqtt = connect(wsBrokerUri, { appId: "WebAppCompositor", deviceId: device })

  mqtt.on("connect", () => {
    store.dispatch(setConnected(true))
  })

  mqtt.once("connect", () => {
    publishDefaultActions()
  })

  mqtt.on("close", () => {
    store.dispatch(setConnected(false))
  })

  mqtt.on("error", () => {
    store.dispatch(setConnected(false))
  })

  mqtt.subscribe(`${deviceTopic}/doReset`, () => {
    store.dispatch(reset())
    publishDefaultActions()
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

  function publishDefaultActions() {
    mqtt.publish(`${administrationTopic}/doExecuteActionList`, {
      topic: `${deviceTopic}/defaultActions`,
    })
  }
}
