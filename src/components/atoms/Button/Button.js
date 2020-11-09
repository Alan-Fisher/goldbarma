import React from 'react'
import PropTypes from 'prop-types'

import ButtonStyle from './ButtonStyle'

const Button = ({
  children, size, type, color, disabled, onClick, id, inline,
  outlined, loading, success, error, margin, float,
}) => (
  <ButtonStyle
    success={success}
    error={error}
    id={id}
    size={size}
    type={type}
    color={color}
    onClick={onClick}
    disabled={disabled || loading}
    loading={loading}
    inline={inline}
    outlined={outlined}
    margin={margin}
    float={float}
  >
    {children}
  </ButtonStyle>
)

Button.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  color: PropTypes.oneOf(['green', 'blue', 'red', 'gray', 'black', 'default']),
  onClick: PropTypes.func.isRequired,
  outlined: PropTypes.bool,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  inline: PropTypes.bool,
  id: PropTypes.string, // eslint-disable-line react/require-default-props
  margin: PropTypes.string,
  float: PropTypes.oneOf(['left', 'right']), // eslint-disable-line react/require-default-props
}

Button.defaultProps = {
  children: '',
  size: 'md',
  type: 'button',
  disabled: false,
  color: 'gray',
  outlined: false,
  loading: false,
  inline: false,
  success: false,
  error: false,
  margin: '5px',
}

export default Button
