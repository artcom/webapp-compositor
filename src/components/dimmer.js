import { motion } from "framer-motion"
import { getZIndices } from "../layers"

import { getDimmerTransition } from "../transitions"

export const DEFAULT_DIMMER = {
  COLOR: "black",
  STRENGTH: 0.4,
  BLUR: 0,
  FADE_DURATION: 0.5,
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
    fadeDuration = DEFAULT_DIMMER.FADE_DURATION,
  } = dimBackground === true ? {} : dimBackground

  return {
    color,
    strength: clamp(strength, 0, 1),
    blur: clamp(blur, 0, 1),
    fadeDuration: Math.max(fadeDuration, 0),
  }
}

const Dimmer = ({ index, config, webAppTransition }) => {
  const { dimmerZIndex } = getZIndices(index)
  const { color, strength, blur, fadeDuration } = config
  const backdropFilter = getBackdropFilter(blur)

  return (
    <motion.div
      {...getDimmerTransition(dimmerZIndex, fadeDuration, webAppTransition)}
      className={`fullscreen dimmer`}
      style={{
        top: 0,
        left: 0,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        pointerEvents: "auto",
      }}
    >
      <div className="fullscreen" style={{ backgroundColor: color, opacity: strength }} />
    </motion.div>
  )
}

function getBackdropFilter(blur) {
  if (blur > 0) return `blur(${blur * MAX_BLUR_PX}px)`
  return undefined
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default Dimmer
