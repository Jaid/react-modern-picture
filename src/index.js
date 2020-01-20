/** @module react-modern-picture */

import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"
import {isString,isNil} from "lodash"

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
    input: PropTypes.any.isRequired
  }

  render() {
    const classProps = {}
    if (this.props.className){
      classProps = classnames(this.props.className)
    }
    if (isString(this.props.input )) {
      return <img src={this.props.input} {...classProps}/>
    }
    if (isNil(this.props.input.webp) && isString(this.props.input.fallback)) {
      return <picture>
        {content}
      </picture>
    }
  }

}