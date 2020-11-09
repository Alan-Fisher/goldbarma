import React, { useState, useRef } from 'react'

import { MainStyle, FinalZoneStyle, HiddenFileInputsStyle } from './MainStyle'
import { request } from '../../../models/ApiModel/ApiModel'
import { compressImage } from '../../../common/helpers'
import {
  Loading, Button, Text, Space,
} from '../../atoms'

// TODO//
// 1. Простая фукнция, которая позволит быстро тестить сканирование без лишнего
// 2. Правка того что вертикальные фото с айфона ломают считывание
// 3. Дизик :)
// 4. ...
// 5. Если не удалось считать — предлагаем перепопробовать или просто попасть в каспи
// 6. Очищать форму после отправки
// 7. Показывать номер в инпуте где каждая цифра — ячейка
// 8. Вычленять только номера подходящие по длине и (?) формату
// 9. Отрезать лишнее если вдруг попало, опираясь на 747, 707 и тп

const Main = () => {
  const [number, setNumber] = useState()
  const [numbers, setNumbers] = useState()
  const [parsedText, setParsedText] = useState()
  const [isUploading, setUploading] = useState()
  const cameraInputRef = useRef()
  const galleryInputRef = useRef()

  const getParsedNumber = (target) => {
    const photo = target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      compressImage(reader.result).then((base64) => {
        requestTextDetection(base64)
          .then(data => {
            const { ParsedText } = data[0]
            setParsedText(data[0].ParsedText)
            parsePhoneNumbers(data[0].ParsedText)
          })
      })
    }
    reader.readAsDataURL(photo)
  }

  const requestTextDetection = (photo) => {
    const formData = new FormData()
    formData.append('base64Image', photo) // TODO: check if it is okay to append base64
    setUploading(true)

    return request({
      method: 'POST',
      url: 'https://api.ocr.space/parse/image',
      params: formData,
      headers: { apikey: process.env.REACT_APP_OCR_API_KEY },
    })
      .then(({ ParsedResults }) => ParsedResults)
      .finally(() => setUploading(false))
  }

  const parsePhoneNumbers = (text) => {
    const possibleNumbers = text.match(/[0-9\s-]+$/gim) || []
    const numbers = possibleNumbers
      .map(possibleNumber => {
        if (possibleNumber.length > 8) {
          return parseInt(possibleNumber.replace(/\D/g, ''), 10)
        }
      })
      .filter(integer => integer)

    if (numbers.length === 0) {
      askingForRepeatOrGo()
    } else if (numbers.length === 1) {
      addCopyAndGoButton(numbers[0])
    } else if (numbers.length > 1) {
      askUserToChooseNumber(numbers)
    }
  }

  const addCopyAndGoButton = (number) => {
    const el = document.createElement('textarea')
    el.value = number
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)

    setNumber(number)
  }

  const askUserToChooseNumber = (numbersToChoose) => {
    setNumbers(numbersToChoose)
  }

  const openTranfersInApp = () => window.location.replace('https://kaspi.kz/transfers/index')

  const askingForRepeatOrGo = () => {
    if (window.confirm('Номер не опознан. Просто открыть переводы?')) { // eslint-disable-line no-alert
      openTranfersInApp()
    } else {
      // TODO: clear form
    }
  }

  const handleChange = (target) => {
    getParsedNumber(target)
    target.value = null // eslint-disable-line no-param-reassign
  }

  const chooseNumber = (numberToChoose) => {
    setNumbers()
    setNumber(numberToChoose)
  }

  return (
    <MainStyle>
      <Text size="xxl">Kaspi Gold bar ma?</Text>

      {isUploading
        ? <Loading />
        : (
          <Space>
            <Button
              outlined
              color="black"
              onClick={() => cameraInputRef.current.click()}
            >
              Сфоткать
            </Button>
            <Button
              outlined
              color="black"
              onClick={() => galleryInputRef.current.click()}
            >
              Из галерии
            </Button>
          </Space>
        )}
      <FinalZoneStyle>
        {numbers?.map(numberToChoose => (
          <Button
            color="black"
            onClick={() => chooseNumber(numberToChoose)}
          >
            {numberToChoose}
          </Button>
        ))}
        {number && (
          <Button
            id="current-id"
            onClick={() => { window.Clipboard.copy(number); openTranfersInApp() }}
          >
            Открыть Каспи
          </Button>
        )}
        {parsedText && (
          <Button
            size="sm"
            onClick={() => alert(parsedText)}
            outlined
            color="gray"
          >
            Show full parsed text
          </Button>
        )}
      </FinalZoneStyle>
      <HiddenFileInputsStyle>
        <input
          ref={cameraInputRef}
          accept="image/*"
          capture="filesystem"
          type="file"
          onChange={({ target }) => handleChange(target)}
        />
        <input
          ref={galleryInputRef}
          accept="image/*"
          type="file"
          onChange={({ target }) => handleChange(target)}
        />
      </HiddenFileInputsStyle>
    </MainStyle>
  )
}

export default Main
