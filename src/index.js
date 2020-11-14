import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Theme from './common/Theme'

import * as Sentry from '@sentry/browser'

Sentry.init({ dsn: 'https://4866865d7ad5475eb3e0650399f8b742@o476570.ingest.sentry.io/5516503'})

const variables = ['REACT_APP_OCR_API_KEY']

function checkEnvVariables() {
  const missing = []

  variables.forEach((variable) => {
    if (!process.env[variable]) {
      missing.push(variable)
    }
  })

  if (missing.length > 0) {
    throw new Error(`${missing.join(', ')} missing in .env file. Check .env.example`)
  }
}

checkEnvVariables()

ReactDOM.render(
  <Theme>
    <App />
  </Theme>,
  document.getElementById('root'),
)
