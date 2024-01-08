import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { DEFAULT_EMPTY } from '@/core/constants/app'

/**
 * Handle all logic common of date time
 */
dayjs.locale('ja')
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export const DATE_FORMAT = Object.freeze({
  YYYYMMDD: 'YYYY/MM/DD',
  YYYY_MM_DD: 'YYYY-MM-DD',
  YYYY_MM_DDJP: 'YYYY年MM月DD日'
})

/**
 * Format date
 * @param {*} date ConfigType
 * @param {*} format string type 'year' | 'month' | 'week' | 'day' | 'hour'
 * @param {*} empty boolean => If = true return '-' else return null
 * @returns
 */
export const formatDate = (date, format = DATE_FORMAT.YYYYMMDD, empty = false) => {
  const mDate = dayjs(date ?? '')
  if (mDate.isValid()) {
    return mDate.format(format)
  }
  return empty ? DEFAULT_EMPTY : null
}

/**
 * Get Date ago (year, month,...)
 * @param {*} agoNumber Number
 * @param {*} type String type 'year' | 'month' | 'week' | 'day' | 'hour'
 * @param {*} format String
 * @param {*} date Date
 * @returns
 */
export const getDateTimeAgo = (agoNumber, type, format, date = new Date()) => {
  const mDate = dayjs(date ?? '')

  if (mDate.isValid()) {
    const agoDate = dayjs(date).subtract(agoNumber, type)

    return formatDate(agoDate, format)
  }

  return null
}
