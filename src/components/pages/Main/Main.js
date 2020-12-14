import React, { useState, useRef } from 'react'

import { MainStyle, FinalZoneStyle, HiddenFileInputsStyle, FooterStyle } from './MainStyle'
import { request } from '../../../models/ApiModel/ApiModel'
import {
  Loading, Button, Text, Space,
} from '../../atoms'
import loadImage from 'blueimp-load-image'
import { getPhoneNumberPart } from '../../../common/helpers'
import * as Sentry from '@sentry/browser'

// TODO//
// 7. Показывать номер в инпуте где каждая цифра — ячейка
// 10. Сохранять-таки историю номеров?
// 11. Редактирование номера
// 14. Поправить regex чтобы норм считывало и "regex не сработал.png"
// 15. Попробовать вытащить адрес запроса, чтобы получать имя еще до перехода в приложение
// 18. Залить изменение и проверить отобразится ли в сохраненной на домашнем экране приложухе
// 19. Добавить отправку в Sentry (?) всех номеров, которые копировались
// 20. Потестить что-то вместо window.replace чтобы "назад" работало

const Main = () => {
  const [numbers, setNumbers] = useState()
  const [warning, setWarning] = useState()
  const [parsedText, setParsedText] = useState()
  const [isUploading, setUploading] = useState()
  const cameraInputRef = useRef()
  const galleryInputRef = useRef()

  const getParsedNumber = (target) => {
    clearPrevResult()

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

  const clearPrevResult = () => {
    setNumbers()
    setParsedText()
    setWarning()
  }

  const renderWarning = () => {
    switch (warning) {
      case 'longRequest':
        return <Text>Запрос длится дольше обычного</Text>
      case 'tooLongRequest':
        return <>
          <Text>Сильно дольше обычного</Text>
          <Button
            size="sm"
            color="default"
            outlined
            onClick={() => window.location.reload(false)}
          >
            Отменить
          </Button>
        </>
      case 'phoneNumberNotRecognized':
        return <>
          <Text size="lg">Номер не опознан</Text>
          <Button
            size="sm"
            color="gray"
            outlined
            onClick={() => reportBug()}
          >
            Зарепортить
          </Button>
        </>
      case 'thanksForReport':
        return <Text size="lg">Раха! ❤️</Text> // eslint-disable-line jsx-a11y/accessible-emoji
      default:
        return null
    }
  }

  const reportBug = async () => {
    let comment = prompt('Добавьте комментарий или отправьте как есть')

    await Sentry.withScope(scope => {
      scope.setExtra('parsedText', parsedText)
      scope.setExtra('comment', comment)
      Sentry.captureMessage('Bug Report')
    })

    setWarning('thanksForReport')
    setTimeout(() => setWarning(), 1000)
  }

  const requestTextDetection = (photo) => {
    const formData = new FormData()
    formData.append('base64Image', photo)
    setUploading(true)
    let longRequestWarningTimer = setTimeout(() => setWarning('longRequest'), 3000)
    let tooLongRequestWarningTimer = setTimeout(() => setWarning('tooLongRequest'), 8000)

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
      setWarning('phoneNumberNotRecognized')
    } else {
      askUserToChooseNumber(phoneNumbers)
    }
  }

  const askUserToChooseNumber = (numbersToChoose) => {
    setNumbers(numbersToChoose)
  }

  const openTranfersInApp = () => window.open('https://kaspi.kz/transfers', '_blank')

  const handleChange = (target) => {
    getParsedNumber(target)
    target.value = null // eslint-disable-line no-param-reassign
  }

  const formatPhoneNumber = (string) => {
    const missingDigitsLength = (10 - string.length)
    const completedNumber = string + 'x'.repeat(missingDigitsLength)

    const code = completedNumber.slice(0, 3)
    const firstPart = completedNumber.slice(3, 6)
    const secondPart = completedNumber.slice(6, 8)
    const thirdPart = completedNumber.slice(8, 10)

    return `+7 ${code} ${firstPart}-${secondPart}-${thirdPart}`
  }

  return (
    <MainStyle>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <Text size="xxl">Gold бар ма? 😀</Text>
      <Space margin="15px">
        {isUploading
          ? <Loading />
          : <>
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
        }
      </Space>

      <FinalZoneStyle>
        {numbers && <Text>Скопировать номер и оплатить:</Text>}
        {numbers?.map(numberToChoose => (
          <Button
            margin="5px 5px 15px"
            key={numberToChoose}
            color="default"
            outlined
            size="lg"
            onClick={() => { window.Clipboard.copy(numberToChoose); openTranfersInApp() }}
          >
            <div style={{ fontSize: '20px', fontFamily: 'monospace, monospace' }}>
              {formatPhoneNumber(numberToChoose)}
            </div>
          </Button>
        ))}
        {warning && renderWarning()}
        <FooterStyle>
          <Button
            color="black"
            outlined
            id="current-id"
            onClick={() => { openTranfersInApp() }}
          >
            Просто открыть переводы
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
          type="file"
          onChange={({ target }) => handleChange(target)}
        />
      </HiddenFileInputsStyle>
    </MainStyle>
  )
}

export default Main
