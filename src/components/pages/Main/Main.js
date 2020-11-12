import React, { useState, useRef } from 'react'

import { MainStyle, FinalZoneStyle, HiddenFileInputsStyle, FooterStyle } from './MainStyle'
import { request } from '../../../models/ApiModel/ApiModel'
import {
  Loading, Button, Text, Space, PhoneInput,
} from '../../atoms'
import loadImage from 'blueimp-load-image'
import { getPhoneNumberPart } from '../../../common/helpers'

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
// 10. Сохранять-таки историю номеров?
// 11. Редактирование номера
// 12. Смягчить появление валидного по длине номера чтобы глаза не бросались его сравнивать раньше времени?
// 13. Обрабатывать случаи когда два номера в одной строке (?)
// 14. Поправить regex чтобы норм считывало и "regex не сработал.png"

const Main = () => {
  const [number, setNumber] = useState()
  const [numbers, setNumbers] = useState(
    //   [
    //   '7026823477',
    //   '7026823477',
    //   '7026823477',
    // ]
  )
  const [warning, setWarning] = useState()
  const [parsedText, setParsedText] = useState()
  const [isUploading, setUploading] = useState()
  const cameraInputRef = useRef()
  const galleryInputRef = useRef()

  const getParsedNumber = (target) => {
    setNumbers() // TODO: move to clear()
    setParsedText()
    setWarning()

    const photo = target.files[0]

    loadImage(photo, { maxWidth: 1200, maxHeight: 1200, canvas: true, orientation: true, meta: false })
      .then(({ image }) => {
        const compressedImage = image.toDataURL('image/jpeg', 0.7)
        requestTextDetection(compressedImage)
          .then(data => {
            const { ParsedText } = data[0]
            setParsedText(ParsedText)
            parsePhoneNumbers(ParsedText)
          })
          .catch(() => setWarning('Номер не опознан'))
      })
  }

  const requestTextDetection = (photo) => {
    const formData = new FormData()
    formData.append('base64Image', photo) // TODO: check if it is okay to append base64
    setUploading(true)
    let longRequestWarningTimer = setTimeout(() => setWarning('Запрос длится дольше обычного'), 3000)
    let tooLongRequestWarningTimer = setTimeout(() => setWarning('Вероятно, сервер не ответит'), 7000)

    return request({
      method: 'POST',
      url: 'https://api.ocr.space/parse/image',
      params: formData,
      headers: { apikey: process.env.REACT_APP_OCR_API_KEY },
    })
      .then(({ ParsedResults, ErrorMessage }) => {
        if (ErrorMessage) { // Q: is that enough to catch API problems in this case?
          return ''
        }

        return ParsedResults
      })
      .finally(() => {
        setUploading(false)
        clearTimeout(longRequestWarningTimer)
        clearTimeout(tooLongRequestWarningTimer)
        setWarning()
      })
  }

  const parsePhoneNumbers = (text) => {
    const possibleNumbers = text.match(/[0-9\s-]+$/gim) || [] // TODO (!) check others like .match(/[s\0-9]+$/gim)
    const getDigits = (string) => string.replace(/\D/g, '')
    const phoneNumbers = possibleNumbers
      .map(possibleNumber => getPhoneNumberPart(getDigits(possibleNumber)))
      .filter(possibleNumber => [8, 9, 10].includes(possibleNumber?.length))

    if (phoneNumbers.length === 0) {
      setWarning('Номер не опознан')
    } else {
      askUserToChooseNumber(phoneNumbers)
    }
    // } else if (phoneNumbers.length === 1) {
    //   addCopyAndGoButton(phoneNumbers[0])
    // } else if (phoneNumbers.length > 1) {
    //   askUserToChooseNumber(phoneNumbers)
    // }
  }

  // const addCopyAndGoButton = (number) => {
  //   const el = document.createElement('textarea')
  //   el.value = number
  //   document.body.appendChild(el)
  //   el.select()
  //   document.execCommand('copy')
  //   document.body.removeChild(el)

  //   setNumber(number)
  // }

  const askUserToChooseNumber = (numbersToChoose) => {
    setNumbers(numbersToChoose)
  }

  const openTranfersInApp = () => window.location.replace('https://kaspi.kz/transfers/index')

  const handleChange = (target) => {
    getParsedNumber(target)
    target.value = null // eslint-disable-line no-param-reassign
  }

  // const chooseNumber = (numberToChoose) => {
  //   setNumber(numberToChoose)
  // }

  const formatPhoneNumber = (string) => {
    const length = (10 - string.length)
    for (let i = 0; i < length; i++) {
      string += 'x'
    }

    const code = string.slice(0, 3)
    const firstPart = string.slice(3, 6)
    const secondPart = string.slice(6, 8)
    const thirdPart = string.slice(8, 10) || 'xx'

    return `+7 ${code} ${firstPart}-${secondPart}-${thirdPart}`
  }

  return (
    <MainStyle>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <Text size="xxl">Kaspi Gold бар ма? 😀</Text>
      <Space margin="15px">
        {isUploading
          ? <Loading />
          : (
            <>
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
            </>
          )}
      </Space>

      <FinalZoneStyle>
        {!number && numbers?.map(numberToChoose => (
          <Button
            margin="5px 5px 15px"
            key={numberToChoose}
            color="default"
            outlined
            size="lg"
            onClick={() => { window.Clipboard.copy(numberToChoose); openTranfersInApp() }}
          // onClick={() => chooseNumber(numberToChoose)}
          >
            <div style={{ fontSize: '20px', fontFamily: 'monospace, monospace' }}>
              {formatPhoneNumber(numberToChoose)}
            </div>
          </Button>
        ))}
        {/* {number &&
          <>
            <PhoneInput phoneNumber={number} />
            <Button
              outlined
              color="black"
              id="current-id"
              onClick={() => { window.Clipboard.copy(number); openTranfersInApp() }}
            >
              Скопировать и открыть Каспи
            </Button>
          </>
        } */}
        {warning && <>
          <Text size="lg">{warning}</Text>
        </>}
        <FooterStyle>
          <Button
            color="black"
            outlined
            id="current-id"
            onClick={() => { openTranfersInApp() }}
          >
            Просто открыть Каспи
          </Button>
          {parsedText && (
            <Button
              size="sm"
              onClick={() => alert(parsedText)}
              outlined
              color="gray"
            >
              Результат считывания
            </Button>
          )}
        </FooterStyle>
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
          // accept="image/*"
          type="file"
          onChange={({ target }) => handleChange(target)}
        />
      </HiddenFileInputsStyle>
    </MainStyle>
  )
}

export default Main
