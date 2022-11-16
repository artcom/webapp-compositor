export default (options, lastCount) => {
  const {
    uri,
    tour,
    layerType,
    restart,
    transition,
    dimBackground,
    backgroundColor,
    left,
    top,
    width,
    height,
  } = options

  return {
    uri,
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
