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

const DebugControls = () => {
  const dispatch = useDispatch()

  useControls({
    uri: {
      options: getWebappDataUris(),
    },
    customUri: {
      value: "",
      render: (get) => get("uri") === "Custom Uri",
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
    dimBackground: {
      value: false,
    },
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
            uri: (() => (get("uri") === "Custom Uri" ? get("customUri") : get("uri")))(),
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

function getWebappDataUris() {
  const htmlPage1 = `<div style="width:100%;height:100%;margin-top:00%;background:blue;font-size:5vw">Webapp1</div>`
  const htmlPage2 = `<div style="width:90%;height:90%;margin-top:10%;background:red;font-size:5vw">Webapp2</div>`
  const htmlPage3 = `<div style="width:80%;height:80%;margin-top:20%;background:green;font-size:5vw">Webapp3</div>`
  const htmlPage4 = `<div style="width:70%;height:70%;margin-top:30%;background:orange;font-size:5vw">Webapp4</div>`

  return {
    "Webapp 1": `data:text/html,${encodeURIComponent(htmlPage1)}`,
    "Webapp 2": `data:text/html,${encodeURIComponent(htmlPage2)}`,
    "Webapp 3": `data:text/html,${encodeURIComponent(htmlPage3)}`,
    "Webapp 4": `data:text/html,${encodeURIComponent(htmlPage4)}`,
    "Custom Uri": "Custom Uri",
  }
}

export default DebugControls
