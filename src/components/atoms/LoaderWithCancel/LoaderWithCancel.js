import React from 'react'

import { LoaderWithCancelStyle } from './LoaderWithCancelStyle'

const LoaderWithCancel = () => (
  <LoaderWithCancelStyle>
    <div className="loading-2">
      <div className="spinner">
        <div className="circle circle-1">
          <div className="circle-inner"></div>
        </div>
        <div className="circle circle-2">
          <div className="circle-inner"></div>
        </div>
      </div>
    </div>

    <span id="cross"></span>
  </LoaderWithCancelStyle>
)

export default LoaderWithCancel
