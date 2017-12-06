import flatMap from "lodash.flatmap"
import React from "react"
import { connect } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Status from "./status"
import transitions from "../transitions"

export default connect(mapStateToProps)(WebAppDisplay)

function mapStateToProps({ connected, layers }) {
  return { connected, layers: layers.map((layer) => layer.toJS()).toArray() }
}

function WebAppDisplay({ connected, layers }) {
  return layers.length === 0
    ? <Status connected={ connected } />
    : <TransitionGroup>{ flatMap(layers, renderLayer) }</TransitionGroup>
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

function renderWebApp({ count, height, index, left, top, transition, type, uri, width }) {
  const { timeout, className } = transitions[transition]
  const style = { top, left, width, height }

  return (
    <CSSTransition
      key={ `${index}${uri}${count}` }
      timeout={ timeout }
      classNames={ className }>
      { React.createElement(type, { className: "fullscreen", src: uri, style }) }
    </CSSTransition>
  )
}
