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
      reject(err)
    }
    img.src = base64
  })
}
