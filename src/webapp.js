import { URL } from "url"

export function createWebApp(options, lastCount) {
  const {
    uri,
    tour,
    layer,
    layerType,
    bootstrap,
    restart,
    transition,
    dimBackground,
    left,
    top,
    width,
    height,
    bootstrapData
  } = options

  return {
    uri: bootstrap ? addQueryParams(uri, tour, bootstrapData, layer) : uri,
    tour,
    type: layerType,
    transition,
    dimBackground,
    left,
    top,
    width,
    height,
    count: restart ? lastCount + 1 : lastCount
  }
}

export function addQueryParams(uri, tour, bootstrapParams, layer) {
  const url = new URL(uri)

  Object.entries(bootstrapParams).forEach((key, value) => url.searchParams.append(key, value))

  if (tour) {
    url.searchParams.append("tour", tour)
    url.searchParams.append("tourTopic", `tours/${tour}`)
  }

  if (Number.isInteger(layer)) {
    url.searchParams.append("layer", layer)
  }

  return url.href
}
