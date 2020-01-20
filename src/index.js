/** @module react-modern-picture */

import classnames from "classnames"
import {isNil, isString} from "lodash"
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
 * @extends {React.Component<Props>}
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
      classProps = classnames(this.props.className)
    }
    if (isString(this.props.input)) {
      return <img src={this.props.input} {...classProps}/>
    }
    if (isNil(this.props.input.webp) && isString(this.props.input.fallback)) {
      return <picture>
        a
      </picture>
    }
  }

}