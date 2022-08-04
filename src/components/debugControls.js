import { Leva, useControls, button } from "leva"
import { useDispatch } from "react-redux"

import { reset, startWebApp, stopWebApp } from "../actionCreators"
import {
  DEFAULT_LAYER_TYPE,
  LAYER_TYPES,
  DEFAULT_LAYER_LEFT,
  DEFAULT_LAYER_TOP,
  DEFAULT_LAYER_WIDTH,
  DEFAULT_LAYER_HEIGHT,
} from "../layers"
import { DEFAULT_TRANSITION, TRANSITIONS } from "../transitions"

const CUSTOM_URI = "Custom Uri"

const DebugControls = () => {
  const dispatch = useDispatch()

  useControls({
    uri: {
      options: getWebAppDataUris(),
    },
    customUri: {
      value: "",
      render: (get) => get("uri") === CUSTOM_URI,
    },
    layerIndex: {
      value: 0,
      options: [undefined, 0, 1, 2, 3],
    },
    layerType: {
      value: DEFAULT_LAYER_TYPE,
      options: Object.values(LAYER_TYPES),
    },
    transition: {
      value: DEFAULT_TRANSITION,
      options: Object.values(TRANSITIONS),
    },
    bootstrap: true,
    bootstrapData: {
      value: "{}",
      hint: "JSON data to pass to the webapp",
    },
    dimBackground: false,
    restart: true,
    backgroundColor: "rgba(0, 0, 0, 0)",
    left: DEFAULT_LAYER_LEFT,
    top: DEFAULT_LAYER_TOP,
    width: DEFAULT_LAYER_WIDTH,
    height: DEFAULT_LAYER_HEIGHT,
    "Start Webapp": button((get) => {
      dispatch(
        startWebApp(
          {
            uri: (() => (get("uri") === CUSTOM_URI ? get("customUri") : get("uri")))(),
            foo: get("transition"),
            transition: get("transition"),
            layer: get("layerIndex"),
            layerType: get("layerType"),
            dimBackground: get("dimBackground"),
            bootstrap: get("bootstrap"),
            restart: get("restart"),
            backgroundColor: get("backgroundColor"),
            left: get("left"),
            top: get("top"),
            width: get("width"),
            height: get("height"),
          },
          JSON.parse(get("bootstrapData"))
        )
      )
    }),
    "Stop Webapp": button((get) => {
      dispatch(
        stopWebApp({
          layer: get("layerIndex"),
        })
      )
    }),
    "Reset Webapp": button(() => {
      dispatch(reset())
    }),
  })

  return <Leva />
}

function getWebAppDataUris() {
  const head = `<head><style>body,html{margin:0;overflow:hidden;font-size:5vw}</style></head>`
  const htmlPage1 = `${head}<div style="width:100vh;height:100vh;margin-top:0;background:blue">WebApp1</div>`
  const htmlPage2 = `${head}<div style="width:90vh;height:90vh;margin-top:10vh;background:red">WebApp2</div>`
  const htmlPage3 = `${head}<div style="width:80vh;height:80vh;margin-top:20vh;background:green">WebApp3</div>`
  const htmlPage4 = `${head}<div style="width:70vh;height:70vh;margin-top:30vh;background:orange">WebApp4</div>`

  return {
    "Webapp 1": `data:text/html,${encodeURIComponent(htmlPage1)}`,
    "Webapp 2": `data:text/html,${encodeURIComponent(htmlPage2)}`,
    "Webapp 3": `data:text/html,${encodeURIComponent(htmlPage3)}`,
    "Webapp 4": `data:text/html,${encodeURIComponent(htmlPage4)}`,
    "Custom Uri": "Custom Uri",
  }
}

export default DebugControls
