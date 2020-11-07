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

// export const processfile = (file) => {
//   // if (!(/image/i).test(file.type)) {
//   //   alert(`File ${file.name} is not an image.`)

//   //   return false
//   // }

//   // read the files

//   const reader = new FileReader()
//   reader.readAsArrayBuffer(file)

//   reader.onload = function (event) {
//     const blob = new Blob([event.target.result]) // create blob...
//     window.URL = window.URL || window.webkitURL
//     const blobURL = window.URL.createObjectURL(blob) // and get it's URL

//     const image = new Image()
//     image.src = blobURL
//     image.onload = resizeMe(image)
//     // function () {
//     //   // have to wait till it's loaded
//     //   imageObject.image = resizeMe(image) // send it to canvas
//     //   // const newinput = document.createElement('input')
//     //   // newinput.type = 'hidden'
//     //   // newinput.name = 'images[]'
//     //   // newinput.value = resized // put result from canvas into new hidden input
//     //   // console.log(resized)
//     // }
//   }

//   return imageObject.image
// }

// const resizeMe = (img) => {
//   const canvas = document.createElement('canvas')
//   const max_height = 1300
//   const max_width = 1300

//   let { width } = img
//   let { height } = img

//   // calculate the width and height, constraining the proportions
//   if (width > height) {
//     if (width > max_width) {
//       // height *= max_width / width;
//       height = Math.round(height *= max_width / width)
//       width = max_width
//     }
//   } else if (height > max_height) {
//     // width *= max_height / height;
//     width = Math.round(width *= max_height / height)
//     height = max_height
//   }

//   // resize the canvas and draw the image data into it
//   canvas.width = width
//   canvas.height = height
//   const ctx = canvas.getContext('2d')
//   ctx.drawImage(img, 0, 0, width, height)

//   // preview.appendChild(canvas) // do the actual resized preview

//   return canvas.toDataURL('image/jpeg', 0.7) // get the data from canvas as 70% JPG (can be also PNG, etc.)
// }
