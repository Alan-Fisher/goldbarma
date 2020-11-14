import React from 'react'

import { LoaderWithCancelStyle } from './LoaderWithCancelStyle'

const LoaderWithCancel = () => (
  <LoaderWithCancelStyle>
    <div id="rotating"></div>
    <span id="cross"></span>
  </LoaderWithCancelStyle>
)

export default LoaderWithCancel
