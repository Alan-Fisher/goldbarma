import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

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
  <App />,
  document.getElementById('root'),
)
