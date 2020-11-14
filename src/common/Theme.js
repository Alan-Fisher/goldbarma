import React from 'react'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

const theme = {
  colors: {
    green: '#20C474',
    blue: '#798EFF',
    yellow: '#e5be00',
    red: '#FB6370',
    gray: '#a3a3a3',
    black: '#444',
    white: '#fff',
  },

  darkColors: {
    green: '#1DB36A',
    blue: '#6E81E9',
    yellow: '#F7CD5A',
    red: '#EB5E6A',
    gray: '#8F8F8F',
  },

  lightColors: {
    green: 'rgba(32, 196, 116, 0.2)',
    blue: 'rgba(121, 142, 255, 0.1)',
    yellow: 'rgba(255, 222, 59, 0.2)',
    red: 'rgba(251, 99, 112, 0.2)',
    gray: 'rgba(177, 177, 177, 0.1)',
  },

  fontFamily: 'Roboto, sans-serif',
  fontStyles: {
    normal: 'normal',
    italic: 'italic',
  },
  fontSizes: {
    xs: '9px',
    sm: '11px',
    md: '13px',
    lg: '15px',
    xl: '19px',
    xxl: '23px',
    xxxl: '31px',
  },
  lineHeights: {
    xs: '11px',
    sm: '13px',
    md: '15px',
    lg: '18px',
    xl: '22px',
    xxl: '26px',
    xxxl: '34px',
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '600',
  },
}

const Theme = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

Theme.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Theme
