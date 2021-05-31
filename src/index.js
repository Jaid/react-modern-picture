/** @module react-modern-picture */

import {isNil, isObject, isString, pick} from "lodash"
import PropTypes from "prop-types"
import React from "react"

/**
  * @typedef {{
  *   className: *,
  *   input: *,
  * }} Props
  */

/**
 * @class
 */
export default class extends React.Component {

  static displayName = process.env.REPLACE_PKG_NAME

  static propTypes = {
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object),
    ]),
    input: PropTypes.any.isRequired,
    style: PropTypes.object,
    alt: PropTypes.string,
    lazy: PropTypes.bool,
  }

  render() {
    const imgProps = pick(this.props, ["className", "style", "alt"])
    if (this.props.lazy) {
      imgProps.loading = "lazy"
    }
    if (isString(this.props.input)) {
      return <img src={this.props.input} {...imgProps}/>
    }
    if (isNil(this.props.input.webp) && isString(this.props.input.fallback)) {
      return <img src={this.props.input.fallback} {...imgProps}/>
    }
    if (isString(this.props.input.webp) && isNil(this.props.input.fallback)) {
      return <img src={this.props.input.webp} {...imgProps}/>
    }
    if (isObject(this.props.input.webp) && isObject(this.props.input.fallback)) {
      Object.assign(imgProps, this.props.input.img)
      if (!imgProps.src) {
        imgProps.src = this.props.input.fallback.srcset
      }
      return <picture>
        <source {...this.props.input.webp}/>
        <source {...this.props.input.fallback}/>
        <img {...imgProps}/>
      </picture>
    }
  }

}