export const TRANSITIONS = {
  FADE: "fade",
  FADE_TO_BLACK: "fadeToBlack",
  SCROLL_LEFT: "scrollLeft",
  SCROLL_RIGHT: "scrollRight",
  SCALE_RIGHT: "scaleRight",
  NONE: "none",
}
export const DEFAULT_TRANSITION = TRANSITIONS.FADE
export const WEBAPP_LOAD_COMPLETE = 0.5
const DEFAULT_EASING = [0.215, 0.610, 0.355, 1.000]

const zLayerVariants = {
  zLayerEnter: ({ zIndexEnter }) => ({ zIndex: zIndexEnter }),
  zLayerExit: ({ zIndexExit }) => ({ zIndex: zIndexExit }),
}

const defaultLifeCycleProps = {
  initial: "initial",
  animate: ["enter", "zLayerEnter"],
  exit: ["exit", "zLayerExit"],
}

export default {
  [TRANSITIONS.FADE_TO_BLACK]: {
    ...defaultLifeCycleProps,
    variants: {
      ...zLayerVariants,
      initial: { opacity: 0 },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: WEBAPP_LOAD_COMPLETE,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.5,
          delay: 0,
        },
      },
    },
  },

  [TRANSITIONS.SCROLL_LEFT]: {
    ...defaultLifeCycleProps,
    variants: {
      ...zLayerVariants,
      initial: { x: "-100%" },
      enter: {
        x: 0,
        transition: {
          duration: 1,
          timing: DEFAULT_EASING,
          delay: 0.2,
        },
      },
      exit: {
        x: "-100%",
        transition: {
          duration: 1,
          timing: DEFAULT_EASING,
          delay: 0.2,
        },
      },
    },
  },

  [TRANSITIONS.SCROLL_RIGHT]: {
    ...defaultLifeCycleProps,
    variants: {
      ...zLayerVariants,
      initial: { x: "100%" },
      enter: {
        x: 0,
        transition: {
          duration: 1,
          timing: DEFAULT_EASING,
          delay: 0.2,
        },
      },
      exit: {
        x: "100%",
        transition: {
          duration: 1,
          timing: DEFAULT_EASING,
          delay: 0.2,
        },
      },
    },
  },

  [TRANSITIONS.SCALE_RIGHT]: {
    ...defaultLifeCycleProps,
    variants: {
      ...zLayerVariants,
      initial: {
        opacity: 0,
        scale: 0.3,
        x: "100%",
        originX: "50%",
        originY: "50%",
      },
      enter: {
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
          duration: 1,
          timing: DEFAULT_EASING,
          delay: 0.2,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 1,
          timing: DEFAULT_EASING,
          delay: 0.2,
        },
      },
    },
  },

  [TRANSITIONS.FADE]: {
    ...defaultLifeCycleProps,
    variants: {
      ...zLayerVariants,
      initial: { opacity: 0 },
      enter: {
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: WEBAPP_LOAD_COMPLETE,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.5,
          delay: 1,
        },
      },
    },
  },

  [TRANSITIONS.NONE]: {
    ...defaultLifeCycleProps,
    variants: {
      ...zLayerVariants,
      initial: { opacity: 0 },
      enter: {
        opacity: 1,
        transition: {
          duration: 0,
          delay: 0,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0,
          delay: 0,
        },
      },
    },
  },
}
