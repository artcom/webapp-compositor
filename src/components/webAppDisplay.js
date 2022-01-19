import React from "react"
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Status from "./status"
import transitions from "../transitions"

export default connect(mapStateToProps)(WebAppDisplay)

function mapStateToProps({ connected, layers }) {
  return { connected, layers }
}

function WebAppDisplay({ connected, layers }) {
  return (
    <>
      <Status connected={ connected } />
      <TransitionGroup>{ layers.map(renderLayer) }</TransitionGroup>
    </>
  )
}

function renderLayer(layer, index) {
  return [
    layer.dimBackground && renderDimmer(index),
    renderWebApp(layer)
  ]
}

function renderDimmer(index) {
  const { timeout, className } = transitions.dimmer

  return (
    <CSSTransition
      key={ `dimmer${index}` }
      timeout={ timeout }
      classNames={ className }>
      <div className={ "fullscreen dimmer" } />
    </CSSTransition>
  )
}

function renderWebApp({
  backgroundColor,
  count,
  height,
  index,
  layerType,
  left,
  top,
  transition,
  uri,
  width
}) {
  const { timeout, className } = transitions[transition]
  const style = { top, left, width, height, backgroundColor }

  return (
    <CSSTransition
      key={ `${index}${uri}${count}` }
      timeout={ timeout }
      classNames={ className }>
      { React.createElement(layerType, { className: "fullscreen", src: uri, style }) }
    </CSSTransition>
  )
}
