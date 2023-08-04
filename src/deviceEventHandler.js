import { deleteTour, reset, setConnected, startWebApp, stopWebApp } from "./actionCreators"

export default function createEventHandler(mqttClient, bootstrapData, administrationTopic, store) {
  const { deviceTopic } = bootstrapData

  publishDefaultActions()
  store.dispatch(setConnected(true))

  mqttClient.on("connect", () => {
    store.dispatch(setConnected(true))
  })

  mqttClient.on("close", () => {
    store.dispatch(setConnected(false))
  })

  mqttClient.on("error", () => {
    store.dispatch(setConnected(false))
  })

  mqttClient.subscribe(`${deviceTopic}/doReset`, () => {
    store.dispatch(reset())
    publishDefaultActions()
  })

  mqttClient.subscribe(`${deviceTopic}/doStartApp`, () => {
    store.dispatch(reset())
  })

  mqttClient.subscribe(`${deviceTopic}/doStartWebApp`, (payload) => {
    store.dispatch(startWebApp(payload, bootstrapData))
  })

  mqttClient.subscribe(`${deviceTopic}/doStopWebApp`, (payload) => {
    store.dispatch(stopWebApp(payload))
  })

  mqttClient.subscribe(`${administrationTopic}/onTourDelete`, (tour) => {
    store.dispatch(deleteTour(tour))
  })

  function publishDefaultActions() {
    mqttClient.publish(`${administrationTopic}/doExecuteActionList`, {
      topic: `${deviceTopic}/defaultActions`,
    })
  }
}
