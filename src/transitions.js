export const TRANSITIONS = {
  CLOSE_BUTTON: "closeButton",
  FADE: "fade",
  FADE_TO_BLACK: "fadeToBlack",
  FADE_TO_GRAY: "grayCrossFade",
  SCROLL_LEFT: "scrollLeft",
  SCROLL_RIGHT: "scrollRight",
  SCALE_RIGHT: "scaleRight",
  NONE: "none",
}
export const DIMMER = "dimmer"
export const DEFAULT_TRANSITION = TRANSITIONS.FADE
const WEBAPP_LOAD_COMPLETE = 0.5
const DEFAULT_EASING = [0.215, 0.61, 0.355, 1.0]
const Z_INDEX_OFFSET = 1000

export function getTransition(zIndexEnter, zIndexExit, animationType) {
  return {
    initial: "initial",
    animate: ["enter", "zLayerEnter"],
    exit: ["exit", "zLayerExit"],

    variants: {
      zLayerEnter: {
        zIndex: zIndexEnter,
        transition: { duration: 0 },
      },
      zLayerExit: (areExitingWebAppsToBeOverlaid) => ({
        zIndex: areExitingWebAppsToBeOverlaid ? zIndexExit - Z_INDEX_OFFSET : zIndexExit,
        transition: { duration: 0 },
      }),
      ...animations[animationType],
    },
  }
}

const animations = {
  [TRANSITIONS.FADE_TO_BLACK]: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: WEBAPP_LOAD_TIMEOUT,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: WEBAPP_LOAD_TIMEOUT,
      },
    },
  },

  [TRANSITIONS.CLOSE_BUTTON]: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: WEBAPP_LOAD_COMPLETE,
      },
    },
  },

  [TRANSITIONS.FADE_TO_GRAY]: {
    initial: {
      opacity: 0,
      filter: "grayscale(100%) contrast(3)",
    },
    enter: {
      opacity: 1,
      filter: "grayscale(0%) contrast(1)",
      transition: {
        opacity: {
          duration: 1,
          delay: 1,
        },
        filter: {
          duration: 1,
          delay: 2,
        },
      },
    },
    exit: {
      opacity: 0,
      filter: "grayscale(100%) contrast(3)",
      transition: {
        opacity: {
          duration: 1,
          delay: 1,
        },
        filter: {
          duration: 1,
          delay: 0,
        },
      },
    },
  },

  [TRANSITIONS.SCROLL_LEFT]: {
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

  [TRANSITIONS.SCROLL_RIGHT]: {
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

  [TRANSITIONS.SCALE_RIGHT]: {
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

  [TRANSITIONS.FADE]: {
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

  [TRANSITIONS.NONE]: {
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

  [DIMMER]: {
    initial: { opacity: 0 },
    enter: {
      opacity: 0.4,
      transition: {
        duration: 0.5,
        delay: WEBAPP_LOAD_COMPLETE,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, delay: WEBAPP_LOAD_COMPLETE },
    },
  },
}
