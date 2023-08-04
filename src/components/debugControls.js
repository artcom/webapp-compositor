import { Leva, useControls, button, LevaInputs, folder } from "leva"
import { useDispatch } from "react-redux"

import { reset, startWebApp, stopWebApp } from "../actionCreators"
import { DEFAULT_LAYER, LAYER_TYPES } from "../layers"
import { DEFAULT_TRANSITION, API_TRANSITIONS } from "../transitions"
import { DEFAULT_STYLE } from "./closeButton"

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
      value: DEFAULT_LAYER.TYPE,
      options: Object.values(LAYER_TYPES),
    },
    closeButton: folder({
      isActive: true,
      url: {
        options: {
          null: null,
          "Close Button Data Uri": getWebAppDataUris()["Close Button"],
          "SVG Uri ": `${window.location.origin}/images/disconnected.svg`,
        },
      },
      left: { value: DEFAULT_STYLE.LEFT, type: LevaInputs.STRING },
      top: { value: DEFAULT_STYLE.TOP, type: LevaInputs.STRING },
      width: { value: DEFAULT_STYLE.WIDTH, type: LevaInputs.STRING },
      height: { value: DEFAULT_STYLE.HEIGHT, type: LevaInputs.STRING },
      actions: { value: "{}", type: LevaInputs.STRING },
    }),
    transition: {
      value: DEFAULT_TRANSITION,
      options: Object.values(API_TRANSITIONS),
    },
    bootstrap: true,
    bootstrapData: {
      value: "{}",
      hint: "JSON data to pass to the webApp",
    },
    dimBackground: false,
    restart: true,
    backgroundColor: "rgba(0, 0, 0, 0)",
    left: { value: DEFAULT_LAYER.LEFT, type: LevaInputs.STRING },
    top: { value: DEFAULT_LAYER.TOP, type: LevaInputs.STRING },
    width: { value: DEFAULT_LAYER.WIDTH, type: LevaInputs.STRING },
    height: { value: DEFAULT_LAYER.HEIGHT, type: LevaInputs.STRING },
    "Start Webapp": button((get) => {
      dispatch(
        startWebApp(
          {
            uri: (() => (get("uri") === CUSTOM_URI ? get("customUri") : get("uri")))(),
            foo: get("transition"),
            transition: get("transition"),
            layer: get("layerIndex"),
            layerType: get("layerType"),
            ...(get("closeButton.isActive") && {
              closeButton: {
                uri: get("closeButton.url"),
                left: get("closeButton.left"),
                top: get("closeButton.top"),
                width: get("closeButton.width"),
                height: get("closeButton.height"),
                actions: JSON.parse(get("closeButton.actions")),
              },
            }),
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
    "Stop WebApp": button((get) => {
      dispatch(
        stopWebApp({
          layer: get("layerIndex"),
        })
      )
    }),
    "Reset WebApp": button(() => {
      dispatch(reset())
    }),
  })

  return (
    <div style={{ position: "relative", transform: "translateX(-200px)", zIndex: 1000 }}>
      <Leva theme={{ sizes: { rootWidth: "320px" } }} />
    </div>
  )
}

function getWebAppDataUris() {
  const head = `<head><style>body,html{margin:0;overflow:hidden;font-size:5vw;color:#FFF}</style></head>`
  const closeSvg = `<?xml> <svg width="100%" height="100%" viewBox="0 0 10 10"><g style="fill:transparent;stroke:#FFF;stroke-width:0.5"><circle cx="5" cy="5" r="4" /><path d="m 3,3 4,4 M 3,7 7,3"/></g></svg>`
  const htmlPage1 = `${head}<div style="width:100vw;height:100vh;margin-top:0;background:blue">WebApp1</div>`
  const htmlPage2 = `${head}<div style="width:90vw;height:90vh;margin-top:10vh;background:red">WebApp2</div>`
  const htmlPage3 = `${head}<div style="width:80vw;height:80vh;margin-top:20vh;background:green">WebApp3</div>`
  const htmlPage4 = `${head}<div style="width:70vw;height:70vh;margin-top:30vh;background:orange">WebApp4</div>`
  const htmlCloseButton = `${head}<div>${closeSvg}</div>`

  return {
    "WebApp 1": `data:text/html,${encodeURIComponent(htmlPage1)}`,
    "WebApp 2": `data:text/html,${encodeURIComponent(htmlPage2)}`,
    "WebApp 3": `data:text/html,${encodeURIComponent(htmlPage3)}`,
    "WebApp 4": `data:text/html,${encodeURIComponent(htmlPage4)}`,
    "Close Button": `data:text/html,${encodeURIComponent(htmlCloseButton)}`,
    [CUSTOM_URI]: CUSTOM_URI,
  }
}

export default DebugControls
