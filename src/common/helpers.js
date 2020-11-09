export const compressImage = (base64) => {
  const canvas = document.createElement('canvas')
  const img = document.createElement('img')

  return new Promise((resolve, reject) => {
    img.onload = function () {
      let { width } = img
      let { height } = img
      const maxHeight = 1200
      const maxWidth = 1200

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width))
          width = maxWidth
        }
      } else if (height > maxHeight) {
        width = Math.round((width *= maxHeight / height))
        height = maxHeight
      }
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    img.onerror = function (err) {
      if (err.path?.[0]?.currentSrc) {
        const imageFormat = err.path[0].currentSrc.split(';').shift().replace('data:', '')
        alert(`${imageFormat} is not supported yet ;(`) // TODO add HEIC support
      }
      reject(err)
      // TODO: add sentry
    }
    img.src = base64
  })
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
