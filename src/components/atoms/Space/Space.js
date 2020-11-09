import React from 'react'
import { node } from 'prop-types'

import { SpaceStyle } from './SpaceStyle'

const Space = ({ children }) => (
  <SpaceStyle>
    {children}
  </SpaceStyle>
)

export default Space

Space.propTypes = {
  children: node.isRequired,
}
