export default (options, lastCount) => {
  const {
    uri,
    tour,
    layer,
    layerType,
    bootstrap,
    restart,
    transition,
    dimBackground,
    backgroundColor,
    left,
    top,
    width,
    height,
    bootstrapData,
  } = options

  return {
    uri: bootstrap ? addQueryParams(uri, tour, bootstrapData, layer) : uri,
    tour,
    layerType,
    transition,
    dimBackground,
    backgroundColor,
    left,
    top,
    width,
    height,
    count: restart ? lastCount + 1 : lastCount,
  }
}

export function addQueryParams(uri, tour, bootstrapParams, layer) {
  const url = new URL(uri)

  Object.entries(bootstrapParams).forEach(([key, value]) =>
    appendIfNotPresent(url.searchParams, key, value)
  )

  if (tour) {
    appendIfNotPresent(url.searchParams, "tour", tour)
    appendIfNotPresent(url.searchParams, "tourTopic", `tours/${tour}`)
  }

  appendIfNotPresent(url.searchParams, "layer", Number.isInteger(layer) ? layer : 0)

  return url.href
}

function appendIfNotPresent(searchParams, key, value) {
  if (!searchParams.has(key)) {
    searchParams.append(key, value)
  }
}
