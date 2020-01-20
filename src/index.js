/** @module react-modern-picture */

import {isNil, isObject, isString} from "lodash"
import PropTypes from "prop-types"
import React from "react"

/**
  * @typedef {{
  *   className: *,
  *   input: *,
  * }} Props
  */

function getSourceTag(info) {
  const props = {}
  if (info.type) {
    props.type = info.type
  }
  return <source {...props}/>
}

function getImgTag(info) {
  const props = {}
  if (info.alt) {
    props.alt = info.alt
  }
  return <img {...props}/>
}

/**
 * @class
 */
export default class extends React.Component {

  static displayName = _PKG_NAME

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    input: PropTypes.any.isRequired,
  }

  render() {
    const classProps = {}
    if (this.props.className) {
      classProps.className = this.props.className
    }
    if (isString(this.props.input)) {
      return <img src={this.props.input} {...classProps}/>
    }
    if (isNil(this.props.input.webp) && isString(this.props.input.fallback)) {
      return <img src={this.props.input.fallback} {...classProps}/>
    }
    if (isString(this.props.input.webp) && isNil(this.props.input.fallback)) {
      return <img src={this.props.input.webp} {...classProps}/>
    }
    if (isNil(this.props.input.webp)) {
      return <picture {...classProps}>
        {getSourceTag(this.props.input.fallback)}
        {getImgTag(this.props.input.fallback)}
      </picture>
    }
    if (isObject(this.props.input.webp) && isObject(this.props.input.fallback) && isObject(this.props.input.img)) {
      return <picture {...classProps}>
        {getSourceTag(this.props.input.webp)}
        {getSourceTag(this.props.input.fallback)}
        {getImgTag(this.props.input.img)}
      </picture>
    }
  }

}