import React from 'react'
import { node, string } from 'prop-types'

import { SpaceStyle } from './SpaceStyle'

const Space = ({ children, margin }) => (
  <SpaceStyle margin={margin}>
    {children}
  </SpaceStyle>
)

export default Space

Space.propTypes = {
  children: node.isRequired,
  margin: string,
}

Space.defaultProps = {
  margin: '0px',
}
