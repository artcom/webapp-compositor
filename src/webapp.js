import url from "url"

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
  const parts = url.parse(uri, true)
  const bootstrapQuery = { ...bootstrapParams, layer }

  if (tour) {
    bootstrapQuery.tour = tour
    bootstrapQuery.tourTopic = `tours/${tour}`
  }

  return url.format({ ...parts, query: { ...bootstrapQuery, ...parts.query }, search: null })
}

