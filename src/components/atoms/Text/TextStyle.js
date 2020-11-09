import styled from 'styled-components/macro'

const displayFontSize = prop => {
  switch (prop) {
    case 'xs':
      return ({ theme }) => theme.fontSizes.xs
    case 'sm':
      return ({ theme }) => theme.fontSizes.sm
    case 'md':
      return ({ theme }) => theme.fontSizes.md
    case 'lg':
      return ({ theme }) => theme.fontSizes.lg
    case 'xl':
      return ({ theme }) => theme.fontSizes.xl
    case 'xxl':
      return ({ theme }) => theme.fontSizes.xxl
    default:
      return ({ theme }) => theme.fontSizes.md
  }
}

const displayLineHeight = prop => {
  switch (prop) {
    case 'xs':
      return ({ theme }) => theme.lineHeights.xs
    case 'sm':
      return ({ theme }) => theme.lineHeights.sm
    case 'md':
      return ({ theme }) => theme.lineHeights.md
    case 'lg':
      return ({ theme }) => theme.lineHeights.lg
    case 'xl':
      return ({ theme }) => theme.lineHeights.xl
    case 'xxl':
      return ({ theme }) => theme.lineHeights.xxl
    default:
      return ({ theme }) => theme.lineHeights.md
  }
}

const displayWeight = prop => {
  switch (prop) {
    case 'regular':
      return ({ theme }) => theme.fontWeights.regular
    case 'light':
      return ({ theme }) => theme.fontWeights.light
    case 'medium':
      return ({ theme }) => theme.fontWeights.medium
    case 'bold':
      return ({ theme }) => theme.fontWeights.bold
    default:
      return ({ theme }) => theme.fontWeights.regular
  }
}

const displayType = prop => {
  switch (prop) {
    case 'black':
      return ({ theme }) => theme.colors.black
    case 'gray':
      return ({ theme }) => theme.colors.gray
    case 'white':
      return ({ theme }) => theme.colors.white
    case 'green':
      return ({ theme }) => theme.colors.green
    case 'red':
      return ({ theme }) => theme.colors.red
    default:
      return ({ theme }) => theme.colors.black
  }
}

const TextStyle = styled.span`
    margin: ${({ margin }) => margin};
    ${({ float }) => (float ? `float: ${float};` : '')} 
    display: ${({ inline }) => (inline ? 'inline' : 'block')};
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;

    font-size: ${({ size }) => displayFontSize(size)};
    font-weight: ${({ weight }) => displayWeight(weight)};
    line-height: ${({ size }) => displayLineHeight(size)};
    color: ${({ color }) => displayType(color)};
    ${props => props.nowrap && 'white-space: nowrap;'}
    ${({ striked }) => striked && 'text-decoration: line-through;'}
`

export default TextStyle
