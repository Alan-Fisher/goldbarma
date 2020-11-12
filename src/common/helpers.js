export const getPhoneNumberPart = (number) => {
  const eightSevenIdx = number.indexOf('87')
  const sevenSevenIdx = number.indexOf('77')

  // TODO: beautify and add more conditions to cut too long numbers e.g.
  let idx = 99
  if (eightSevenIdx > -1 && eightSevenIdx < 3) { idx = eightSevenIdx}
  if (sevenSevenIdx > - 1 && sevenSevenIdx < 3 && eightSevenIdx < 0) { idx = sevenSevenIdx}

  return number.slice(idx + 1) // TODO beautify full cut with error
}

window.Clipboard = (function (window, document, navigator) { // Q: is it okay to just be here without imports?
  let textArea
  let copy

  function isOS() {
    return navigator.userAgent.match(/ipad|iphone/i)
  }

  function createTextArea(text) {
    textArea = document.createElement('textArea')
    textArea.value = text
    document.body.appendChild(textArea)
  }

  function selectText() {
    let range
    let selection

    if (isOS()) {
      range = document.createRange()
      range.selectNodeContents(textArea)
      selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      textArea.setSelectionRange(0, 999999)
    } else {
      textArea.select()
    }
  }

  function copyToClipboard() {
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  copy = function (text) {
    createTextArea(text)
    selectText()
    copyToClipboard()
  }

  return {
    copy,
  }
}(window, document, navigator))
