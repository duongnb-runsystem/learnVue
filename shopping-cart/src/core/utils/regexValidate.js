import { DEFAULT_EMPTY } from '@/core/constants/app'

/**
 * Common regex
 */
export const REG_EMAIL_FORMAT = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
export const REG_NUMBER_ONLY = new RegExp(/^\d+$/)
export const REG_HALF_WIDTH_ALPNUMBERIC = new RegExp(/^[a-zA-Z0-9]+$/)
export const REG_URL_FORMAT = new RegExp(
  `^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$`
)
export const REG_PHONE = new RegExp(/^0\d{9}$|^0\d{10}$/)

/**
 * Common regex check is valid
 */

export const stringFormat = (str, ...args) =>
  str.replace(/{(\d+)}/g, (_match, index) => args[index] || '')

export const isValidEmail = (mail) => {
  // Check Email format
  if (!mail) return true
  return REG_EMAIL_FORMAT.test(mail)
}

// Regex check phone number. 0XXXXXXXXX | 0XXXXXXXXXX
export const isValidPhoneNumber = (value) => {
  // Check Phone 10 - 11 number
  if (!value) return true
  return REG_PHONE.test(value)
}

/**
 * Format number
 * @param {*} value number | string | null
 * @param {*} scale
 * @param {*} option? object = { sign, unit, defaultEmpty}
 * @returns
 */
export const formatNumber = (value, scale = 0, option = {}) => {
  const { sign, unit, defaultEmpty } = option || {}
  if (value === null || value === '' || typeof value === 'undefined' || isNaN(+value)) {
    return defaultEmpty ?? DEFAULT_EMPTY
  }

  let formatedNumber = new Intl.NumberFormat('ja-JP', {
    style: 'decimal',
    minimumFractionDigits: scale,
    maximumFractionDigits: scale
  }).format(+value)

  if (sign) formatedNumber = `${+value > 0 ? '+' : ''}${formatedNumber}`

  const number = formatedNumber.split('.')
  if (number.length > 1) {
    const arr = number[1].split('')
    const index = [...arr].reverse().findIndex((item) => item !== '0')
    const decimalValue = arr.splice(index, arr.length).reverse().join('')
    formatedNumber = index === -1 ? number[0] : `${number[0]}.${decimalValue}`
  }

  if (unit) formatedNumber = `${formatedNumber}${unit}`

  return formatedNumber
}

/**
 *
 * @param {*} value string | number
 * @param {*} fixed number
 * @returns
 */
export const decimalTrunc = (value, fixed) => {
  if ((value ?? '') === '') return DEFAULT_EMPTY
  const re = new RegExp(`^-?\\d+(?:.\\d{0,${fixed || 0}})?`)

  return Number(value).toString().match(re)?.[0]
}
