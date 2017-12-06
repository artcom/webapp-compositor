import React from "react"
import classNames from "classnames"

export default function Status({ connected }) {
  return <div className={ classNames("status", { connected }) } />
}
