import { motion } from "framer-motion"
import { getZIndices } from "../layers"

import { getDimmerTransition } from "../transitions"

export const DEFAULT_DIMMER = {
  COLOR: "black",
  STRENGTH: 0.4,
  BLUR: 0,
  GRAYSCALE: 0,
  DURATION: 0.5,
}

const MAX_BLUR_PX = 20

export function normalizeDimBackground(dimBackground) {
  if (!dimBackground) {
    return undefined
  }

  const {
    color = DEFAULT_DIMMER.COLOR,
    strength = DEFAULT_DIMMER.STRENGTH,
    blur = DEFAULT_DIMMER.BLUR,
    grayscale = DEFAULT_DIMMER.GRAYSCALE,
    duration = DEFAULT_DIMMER.DURATION,
  } = dimBackground === true ? {} : dimBackground

  return {
    color,
    strength: clamp(strength, 0, 1),
    blur: clamp(blur, 0, 1),
    grayscale: clamp(grayscale, 0, 1),
    duration: Math.max(duration, 0),
  }
}

const Dimmer = ({ index, config, webAppTransition }) => {
  const { dimmerZIndex } = getZIndices(index)
  const { color, strength, blur, grayscale, duration } = config
  const backdropFilter = getBackdropFilter(blur, grayscale)

  return (
    <motion.div
      {...getDimmerTransition(dimmerZIndex, duration, webAppTransition)}
      className={`fullscreen dimmer`}
      style={{ backdropFilter, WebkitBackdropFilter: backdropFilter }}
    >
      <div className="fullscreen" style={{ backgroundColor: color, opacity: strength }} />
    </motion.div>
  )
}

function getBackdropFilter(blur, grayscale) {
  const filters = []
  if (blur > 0) filters.push(`blur(${blur * MAX_BLUR_PX}px)`)
  if (grayscale > 0) filters.push(`grayscale(${grayscale})`)
  return filters.length > 0 ? filters.join(" ") : undefined
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default Dimmer
