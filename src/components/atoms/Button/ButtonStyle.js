import styled from 'styled-components/macro'

const displayBorder = prop => {
  switch (prop) {
    case 'green':
      return '1px solid rgba(32, 196, 116, 0.5)'
    case 'blue':
      return '1px solid rgba(121, 142, 255, 0.5)'
    case 'red':
      return '1px solid rgba(251, 99, 112, 0.5)'
    case 'gray':
      return '1px solid rgba(187, 187, 187, 0.5)'
    case 'black':
      return '1px solid #444'
    default:
      return '1px solid rgba(187, 187, 187, 0.5)'
  }
}

const displayBoxShadow = prop => {
  const sizes = '0px 0px 0px 3px'
  switch (prop) {
    case 'green':
      return `${sizes} rgba(32, 196, 116, 0.4)`
    case 'blue':
      return `${sizes} rgba(121, 142, 255, 0.4)`
    case 'red':
      return `${sizes} rgba(251, 99, 112, 0.4)`
    case 'gray':
      return `${sizes} rgba(187, 187, 187, 0.4)`
    default:
      return `${sizes} rgba(187, 187, 187, 0.4)`
  }
}

const displayTextSize = (prop, theme) => {
  switch (prop) {
    case 'sm':
      return theme.fontSizes.sm
    case 'md':
      return theme.fontSizes.md
    case 'lg':
      return theme.fontSizes.lg
    default:
      return theme.fontSizes.md
  }
}

const displayPadding = prop => {
  switch (prop) {
    case 'sm':
      return '5px 13px'
    case 'md':
      return '8px 15px'
    case 'lg':
      return '11px 17px'
    default:
      return '8px 15px'
  }
}

const ButtonStyle = styled.button`
${({
    theme, inline, outlined, color, disabled, size, loading, margin, float,
  }) => `
  margin: ${margin};
  ${float ? `float: ${float};` : ''} 
  outline: none;
  border-radius: 6px;
  line-height: 15px;
  display: ${inline ? 'inline-block' : 'flex'};
  flex-direction: row;
  align-items: center;

  > .button_icon {
    margin-right: 8px;
  }

  font-family: ${theme.fontFamily};
  font-weight: ${theme.fontWeights.medium};
  cursor: ${disabled ? 'default' : 'pointer'};
  color: ${!outlined ? '#ffffff' : theme.colors[color]};
  background-color: ${!outlined ? theme.colors[color] : 'inherit'};
  font-size: ${displayTextSize(size, theme)};
  padding: ${displayPadding(size)};
  border: ${displayBorder(color)};
 
  &:hover {
    background-color: ${((!outlined && !disabled) ? theme.darkColors[color] : 'transperent')}
  }  

  &:focus {
    box-shadow: ${displayBoxShadow(color)};
  }

  ${disabled ? 'opacity: 0.65;' : ''}

  ${loading ? `
    background-size: 28px 28px;
    background-image: linear-gradient(135deg, rgba(255, 255, 255, .15) 25%,
                      transparent 25%,
                      transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%,
                      transparent 75%, transparent);
    animation: animate-stripes 1.5s linear infinite;

    @keyframes animate-stripes {
      0% { background-position: 0 0;}
      100% { background-position: 60px 0;}
    }
  ` : ''}  

  transition: 
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  `}
`

export default ButtonStyle
