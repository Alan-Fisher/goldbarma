import React from 'react'
import { number } from 'prop-types'

import { PhoneInputStyle } from './PhoneInputStyle'
import { Space, Text } from '..'
import { getPhoneNumberPart } from '../../../common/helpers'

const PhoneInput = ({ phoneNumber }) => {
  let parsedPhoneNumber = getPhoneNumberPart(phoneNumber.toString())
  const length = (10 - parsedPhoneNumber.length)
  console.log(length)
  for (let i = 0; i < length; i++) {
    parsedPhoneNumber += 'x'
    console.log(parsedPhoneNumber)
  }

  return (
    <PhoneInputStyle>
      <Space>
        <Text size="lg">+7</Text>
        {parsedPhoneNumber.split('').map((digit, i) => (
          <input
            style={{
              margin: i === 2 ? '2px 7px 2px 2px' : '2px',
              padding: '5px 7px',
              fontSize: '25px',
              width: '15px',
              borderRadius: 5,
              border: '1px solid rgb(0,0,0,0.4)',
              textAlign: 'center',
            }}
            min={0}
            maxLength={1}
            value={digit}
            type="number"
          />
        ))}
      </Space>
    </PhoneInputStyle>
  )
}

export default PhoneInput

PhoneInput.propTypes = {
  phoneNumber: number.isRequired,
}
