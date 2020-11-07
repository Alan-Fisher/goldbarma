import React, { useState } from 'react'

import {
  MainStyle,
} from './MainStyle'
import { request } from '../../../models/ApiModel/ApiModel'
import { compressImage } from '../../../common/helpers'

window.Clipboard = (function (window, document, navigator) {
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

const Main = () => {
  const [number, setNumber] = useState()

  const getParsedNumber = (target) => {
    const photo = target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      compressImage(reader.result).then((base64) => {
        requestTextDetection(base64)
          .then(data => parsePhoneNumber(data[0].ParsedText))
      })
    }
    reader.readAsDataURL(photo)
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

    setNumber(number)
  }

  return (
    <MainStyle>
      <input type="file" onChange={({ target }) => getParsedNumber(target)} />
      {number && (
        <button
          id="current-id"
          className="current-id clearfix"
          onClick={() => { window.Clipboard.copy(number); window.location.replace('https://kaspi.kz/transfers/index') }}
        >
          Copy and go
        </button>
      )}
    </MainStyle>
  )
}

export default Main
