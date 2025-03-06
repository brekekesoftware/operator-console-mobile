import uawMsgs from './uawmsgs.js'
export const int = function (value) {
  return parseInt(value, 10) || 0
}
export const string = function (value) {
  return String(value || value === 0 || value === false ? value : '')
}
export const clone = function (object) {
  if (object && typeof object === 'object') {
    // memberwise clone (shallow copy)
    const returnObject = {}
    for (let key in object) {
      returnObject[key] = object[key]
    }
    return returnObject
  } else {
    return object
  }
}
export const escapeHTML = function (str) {
  return string(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
export const unescapeHTML = function (str) {
  return string(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}
export const formatStr = function (fmt, a) {
  var rep_fn = undefined
  if (typeof a === 'object') {
    rep_fn = function (m, k) {
      return a[k]
    }
  } else {
    var args = arguments
    rep_fn = function (m, k) {
      return args[parseInt(k) + 1]
    }
  }
  return string(fmt).replace(/\{(\w+)\}/g, rep_fn)
}
export const formatFileSize = function (value) {
  value = int(value)
  let valueString
  try {
    valueString = value.toLocaleString()
  } catch (e) {
    valueString = string(value)
  }
  if (value === 1) {
    return formatStr(uawMsgs.CMN_FILESIZE_BYTE, valueString)
  } else if (value < 1024) {
    return formatStr(uawMsgs.CMN_FILESIZE_BYTES, valueString)
  } else if (value < 1024 * 1024) {
    return formatStr(
      uawMsgs.CMN_FILESIZE_KILOBYTES,
      (value / 1024).toFixed(1),
      valueString,
    )
  } else if (value < 1024 * 1024 * 1024) {
    return formatStr(
      uawMsgs.CMN_FILESIZE_MEGABYTES,
      (value / 1024 / 1024).toFixed(1),
      valueString,
    )
  } else {
    return formatStr(
      uawMsgs.CMN_FILESIZE_GIGABYTES,
      (value / 1024 / 1024 / 1024).toFixed(1),
      valueString,
    )
  }
}
export const formatTime = function (timeValue) {
  const time = timeValue ? new Date(timeValue) : new Date()
  const hour = time.getHours()
  const minute = time.getMinutes()
  if (isNaN(hour) || isNaN(minute)) {
    return ''
  }
  const hour12 = ((hour + 11) % 12) + 1
  const ampm = hour < 12 ? uawMsgs.CMN_AM_STR : uawMsgs.CMN_PM_STR
  return formatStr(
    uawMsgs.CMN_FORMAT_TIME,
    ('0' + hour).slice(-2),
    ('0' + hour12).slice(-2),
    ('0' + minute).slice(-2),
    ampm,
  )
}
export const formatMessageDate = function (timeValue) {
  const now = new Date()
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  )
  const time = timeValue ? new Date(timeValue) : now
  const year = time.getFullYear()
  const month = time.getMonth()
  const day = time.getDate()
  const dow = time.getDay()
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return ''
  }
  if (
    year === now.getFullYear() &&
    month === now.getMonth() &&
    day === now.getDate()
  ) {
    // today
    return uawMsgs.CMN_TODAY
  }
  if (
    year === yesterday.getFullYear() &&
    month === yesterday.getMonth() &&
    day === yesterday.getDate()
  ) {
    // yesterday
    return uawMsgs.CMN_YESTERDAY
  }
  const monthStr =
    month === 0
      ? uawMsgs.CMN_MONTH_STR_01
      : month === 1
        ? uawMsgs.CMN_MONTH_STR_02
        : month === 2
          ? uawMsgs.CMN_MONTH_STR_03
          : month === 3
            ? uawMsgs.CMN_MONTH_STR_04
            : month === 4
              ? uawMsgs.CMN_MONTH_STR_05
              : month === 5
                ? uawMsgs.CMN_MONTH_STR_06
                : month === 6
                  ? uawMsgs.CMN_MONTH_STR_07
                  : month === 7
                    ? uawMsgs.CMN_MONTH_STR_08
                    : month === 8
                      ? uawMsgs.CMN_MONTH_STR_09
                      : month === 9
                        ? uawMsgs.CMN_MONTH_STR_10
                        : month === 10
                          ? uawMsgs.CMN_MONTH_STR_11
                          : month === 11
                            ? uawMsgs.CMN_MONTH_STR_12
                            : ''
  const dowStr =
    dow === 0
      ? uawMsgs.CMN_DOW_STR_00
      : dow === 1
        ? uawMsgs.CMN_DOW_STR_01
        : dow === 2
          ? uawMsgs.CMN_DOW_STR_02
          : dow === 3
            ? uawMsgs.CMN_DOW_STR_03
            : dow === 4
              ? uawMsgs.CMN_DOW_STR_04
              : dow === 5
                ? uawMsgs.CMN_DOW_STR_05
                : dow === 6
                  ? uawMsgs.CMN_DOW_STR_06
                  : ''
  if (year === now.getFullYear()) {
    // this year
    return formatStr(
      uawMsgs.CMN_FORMAT_DATE_WITH_DOW,
      year,
      month + 1,
      day,
      monthStr,
      dowStr,
    )
  } else {
    return formatStr(
      uawMsgs.CMN_FORMAT_DATE_WITH_DOW_YEAR,
      year,
      month + 1,
      day,
      monthStr,
      dowStr,
    )
  }
}
export const formatMessageDateTime = function (timeValue) {
  const now = new Date()
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1,
  )
  const time = timeValue ? new Date(timeValue) : now
  const year = time.getFullYear()
  const month = time.getMonth()
  const day = time.getDate()
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return ''
  }
  if (
    year === now.getFullYear() &&
    month === now.getMonth() &&
    day === now.getDate()
  ) {
    // today
    return formatTime(timeValue)
  }
  if (
    year === yesterday.getFullYear() &&
    month === yesterday.getMonth() &&
    day === yesterday.getDate()
  ) {
    // yesterday
    return uawMsgs.CMN_YESTERDAY + ' ' + formatTime(timeValue)
  }
  const monthStr =
    month === 0
      ? uawMsgs.CMN_MONTH_STR_01
      : month === 1
        ? uawMsgs.CMN_MONTH_STR_02
        : month === 2
          ? uawMsgs.CMN_MONTH_STR_03
          : month === 3
            ? uawMsgs.CMN_MONTH_STR_04
            : month === 4
              ? uawMsgs.CMN_MONTH_STR_05
              : month === 5
                ? uawMsgs.CMN_MONTH_STR_06
                : month === 6
                  ? uawMsgs.CMN_MONTH_STR_07
                  : month === 7
                    ? uawMsgs.CMN_MONTH_STR_08
                    : month === 8
                      ? uawMsgs.CMN_MONTH_STR_09
                      : month === 9
                        ? uawMsgs.CMN_MONTH_STR_10
                        : month === 10
                          ? uawMsgs.CMN_MONTH_STR_11
                          : month === 11
                            ? uawMsgs.CMN_MONTH_STR_12
                            : ''
  if (year === now.getFullYear()) {
    // this year
    return (
      formatStr(uawMsgs.CMN_FORMAT_DATE, year, month + 1, day, monthStr) +
      ' ' +
      formatTime(timeValue)
    )
  } else {
    return (
      formatStr(
        uawMsgs.CMN_FORMAT_DATE_WITH_YEAR,
        year,
        month + 1,
        day,
        monthStr,
      ) +
      ' ' +
      formatTime(timeValue)
    )
  }
}
export const formatTopicDate = function (timeValue) {
  const now = new Date()
  const time = new Date(timeValue)
  const year = time.getFullYear()
  const month = time.getMonth()
  const day = time.getDate()
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return ''
  }
  if (
    year === now.getFullYear() &&
    month === now.getMonth() &&
    day === now.getDate()
  ) {
    // today
    return formatTime(timeValue)
  }
  const monthStr =
    month === 0
      ? uawMsgs.CMN_MONTH_STR_01
      : month === 1
        ? uawMsgs.CMN_MONTH_STR_02
        : month === 2
          ? uawMsgs.CMN_MONTH_STR_03
          : month === 3
            ? uawMsgs.CMN_MONTH_STR_04
            : month === 4
              ? uawMsgs.CMN_MONTH_STR_05
              : month === 5
                ? uawMsgs.CMN_MONTH_STR_06
                : month === 6
                  ? uawMsgs.CMN_MONTH_STR_07
                  : month === 7
                    ? uawMsgs.CMN_MONTH_STR_08
                    : month === 8
                      ? uawMsgs.CMN_MONTH_STR_09
                      : month === 9
                        ? uawMsgs.CMN_MONTH_STR_10
                        : month === 10
                          ? uawMsgs.CMN_MONTH_STR_11
                          : month === 11
                            ? uawMsgs.CMN_MONTH_STR_12
                            : ''
  if (year === now.getFullYear()) {
    // this year
    return formatStr(uawMsgs.CMN_FORMAT_DATE, year, month + 1, day, monthStr)
  } else {
    return string(year)
  }
}
export const parseDate = function (str) {
  return new Date(
    int(str.substr(0, 4)),
    int(str.substr(5, 2)) - 1,
    int(str.substr(8, 2)),
    int(str.substr(11, 2)),
    int(str.substr(14, 2)),
    int(str.substr(17, 2)),
  )
}
export const toPlainText = function (html) {
  return unescapeHTML(string(html).replace(/<[^>]*>/g, ''))
}
export const truncateWithEllipsis = function (str, maxLength, ellipsis) {
  ellipsis = ellipsis || '...'
  if (maxLength < ellipsis.length) {
    ellipsis = ellipsis.substr(0, maxLength)
  }
  return str.length <= maxLength
    ? str
    : str.substr(0, maxLength - ellipsis.length) + ellipsis
}
export const parsePanelKey = function (key) {
  const panelKey = string(key)
  const panelType = panelKey.split('_')[0]
  const panelCode = panelKey.substr((panelType + '_').length)
  return {
    panelType: panelType,
    panelCode: panelCode,
  }
}
