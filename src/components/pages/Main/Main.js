import React from 'react'

import {
  MainStyle,
} from './MainStyle'
import { request } from '../../../models/ApiModel/ApiModel'
import { processfile, compressImage } from '../../../common/helpers'

const Main = () => {
  const getParsedNumber = (target) => {
    // navigator.clipboard.writeText('Text to be copied')
    //   .then(() => {
    //     console.log('Text copied to clipboard')
    //   })
    // const photo = target.files[0]
    // const reader = new FileReader()

    // reader.onloadend = () => {
    //   compressImage(reader.result).then((base64) => {
    //     requestTextDetection(base64)
    //       .then(data => parsePhoneNumber(data[0].ParsedText))
    //   })
    // }
    // reader.readAsDataURL(photo)
  }

  const requestTextDetection = (photo) => {
    const formData = new FormData()
    formData.append('base64Image', photo) // TODO: check if it is okay to append base64

    return request({
      method: 'POST',
      url: 'https://api.ocr.space/parse/image',
      params: formData,
      headers: { apikey: process.env.REACT_APP_OCR_API_KEY },
    })
      .then(({ ParsedResults }) => ParsedResults)
  }

  const parsePhoneNumber = (parsedText) => {
    const possibleNumbers = parsedText.match(/[0-9\s-]+$/gim)
    const numbers = possibleNumbers.map(item => {
      const possibleNumber = parseInt(item.replace(/\D/g, ''), 10)
      if (Number.isInteger(possibleNumber)) { return possibleNumber }
    }).filter(number => number)
    console.log(numbers)
    // if (numbers.length === 1) {
    copyAndGo(numbers[0])
    // }
  }

  const copyAndGo = (number) => {
    const el = document.createElement('textarea')
    el.value = number
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    alert(number)

    // window.location.replace('https://kaspi.kz/transfers/index')
  }

  return (
    <MainStyle>
      <input type="file" onChange={({ target }) => getParsedNumber(target)} />
      Hey!
    </MainStyle>
  )
}

export default Main
