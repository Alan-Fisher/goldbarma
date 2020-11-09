import React from 'react'
import PropTypes from 'prop-types'

import TextStyle from './TextStyle'

const Text = ({
  children, size, color, nowrap, weight, id, inline, margin, striked, float,
}) => (
  <TextStyle
    size={size}
    color={color}
    nowrap={nowrap}
    weight={weight}
    id={id}
    inline={inline}
    margin={margin}
    striked={striked}
    float={float}
  >
    {children}
  </TextStyle>
)

Text.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  color: PropTypes.oneOf(['black', 'gray', 'white', 'green', 'red']),
  nowrap: PropTypes.bool,
  weight: PropTypes.oneOf(['regular', 'light', 'medium', 'bold']),
  inline: PropTypes.bool,
  id: PropTypes.string, // eslint-disable-line react/require-default-props
  margin: PropTypes.string,
  striked: PropTypes.bool,
  float: PropTypes.oneOf(['left', 'right']), // eslint-disable-line react/require-default-props
}

Text.defaultProps = {
  size: 'md',
  color: 'black',
  nowrap: false,
  weight: 'regular',
  inline: false,
  margin: '5px',
  striked: false,
}

export default Text
