'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.unescapeHTML =
  exports.truncateWithEllipsis =
  exports.toPlainText =
  exports.string =
  exports.parsePanelKey =
  exports.parseDate =
  exports.int =
  exports.formatTopicDate =
  exports.formatTime =
  exports.formatStr =
  exports.formatMessageDateTime =
  exports.formatMessageDate =
  exports.formatFileSize =
  exports.escapeHTML =
  exports.clone =
    void 0
var _uawmsgs = _interopRequireDefault(require('./uawmsgs.js'))
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
function _typeof(o) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o
          }),
    _typeof(o)
  )
}
var int = (exports.int = function int(value) {
  return parseInt(value, 10) || 0
})
var string = (exports.string = function string(value) {
  return String(value || value === 0 || value === false ? value : '')
})
var clone = (exports.clone = function clone(object) {
  if (object && _typeof(object) === 'object') {
    // memberwise clone (shallow copy)
    var returnObject = {}
    for (var key in object) {
      returnObject[key] = object[key]
    }
    return returnObject
  } else {
    return object
  }
})
var escapeHTML = (exports.escapeHTML = function escapeHTML(str) {
  return string(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
})
var unescapeHTML = (exports.unescapeHTML = function unescapeHTML(str) {
  return string(str)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
})
var formatStr = (exports.formatStr = function formatStr(fmt, a) {
  var rep_fn = undefined
  if (_typeof(a) === 'object') {
    rep_fn = function rep_fn(m, k) {
      return a[k]
    }
  } else {
    var args = arguments
    rep_fn = function rep_fn(m, k) {
      return args[parseInt(k) + 1]
    }
  }
  return string(fmt).replace(/\{(\w+)\}/g, rep_fn)
})
var formatFileSize = (exports.formatFileSize = function formatFileSize(value) {
  value = int(value)
  var valueString
  try {
    valueString = value.toLocaleString()
  } catch (e) {
    valueString = string(value)
  }
  if (value === 1) {
    return formatStr(_uawmsgs.default.CMN_FILESIZE_BYTE, valueString)
  } else if (value < 1024) {
    return formatStr(_uawmsgs.default.CMN_FILESIZE_BYTES, valueString)
  } else if (value < 1024 * 1024) {
    return formatStr(
      _uawmsgs.default.CMN_FILESIZE_KILOBYTES,
      (value / 1024).toFixed(1),
      valueString,
    )
  } else if (value < 1024 * 1024 * 1024) {
    return formatStr(
      _uawmsgs.default.CMN_FILESIZE_MEGABYTES,
      (value / 1024 / 1024).toFixed(1),
      valueString,
    )
  } else {
    return formatStr(
      _uawmsgs.default.CMN_FILESIZE_GIGABYTES,
      (value / 1024 / 1024 / 1024).toFixed(1),
      valueString,
    )
  }
})
var formatTime = (exports.formatTime = function formatTime(timeValue) {
  var time = timeValue ? new Date(timeValue) : new Date()
  var hour = time.getHours()
  var minute = time.getMinutes()
  if (isNaN(hour) || isNaN(minute)) {
    return ''
  }
  var hour12 = ((hour + 11) % 12) + 1
  var ampm =
    hour < 12 ? _uawmsgs.default.CMN_AM_STR : _uawmsgs.default.CMN_PM_STR
  return formatStr(
    _uawmsgs.default.CMN_FORMAT_TIME,
    ('0' + hour).slice(-2),
    ('0' + hour12).slice(-2),
    ('0' + minute).slice(-2),
    ampm,
  )
})
var formatMessageDate = (exports.formatMessageDate = function formatMessageDate(
  timeValue,
) {
  var now = new Date()
  var yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  var time = timeValue ? new Date(timeValue) : now
  var year = time.getFullYear()
  var month = time.getMonth()
  var day = time.getDate()
  var dow = time.getDay()
  if (isNaN(year) || isNaN(month) || isNaN(day)) {
    return ''
  }
  if (
    year === now.getFullYear() &&
    month === now.getMonth() &&
    day === now.getDate()
  ) {
    // today
    return _uawmsgs.default.CMN_TODAY
  }
  if (
    year === yesterday.getFullYear() &&
    month === yesterday.getMonth() &&
    day === yesterday.getDate()
  ) {
    // yesterday
    return _uawmsgs.default.CMN_YESTERDAY
  }
  var monthStr =
    month === 0
      ? _uawmsgs.default.CMN_MONTH_STR_01
      : month === 1
        ? _uawmsgs.default.CMN_MONTH_STR_02
        : month === 2
          ? _uawmsgs.default.CMN_MONTH_STR_03
          : month === 3
            ? _uawmsgs.default.CMN_MONTH_STR_04
            : month === 4
              ? _uawmsgs.default.CMN_MONTH_STR_05
              : month === 5
                ? _uawmsgs.default.CMN_MONTH_STR_06
                : month === 6
                  ? _uawmsgs.default.CMN_MONTH_STR_07
                  : month === 7
                    ? _uawmsgs.default.CMN_MONTH_STR_08
                    : month === 8
                      ? _uawmsgs.default.CMN_MONTH_STR_09
                      : month === 9
                        ? _uawmsgs.default.CMN_MONTH_STR_10
                        : month === 10
                          ? _uawmsgs.default.CMN_MONTH_STR_11
                          : month === 11
                            ? _uawmsgs.default.CMN_MONTH_STR_12
                            : ''
  var dowStr =
    dow === 0
      ? _uawmsgs.default.CMN_DOW_STR_00
      : dow === 1
        ? _uawmsgs.default.CMN_DOW_STR_01
        : dow === 2
          ? _uawmsgs.default.CMN_DOW_STR_02
          : dow === 3
            ? _uawmsgs.default.CMN_DOW_STR_03
            : dow === 4
              ? _uawmsgs.default.CMN_DOW_STR_04
              : dow === 5
                ? _uawmsgs.default.CMN_DOW_STR_05
                : dow === 6
                  ? _uawmsgs.default.CMN_DOW_STR_06
                  : ''
  if (year === now.getFullYear()) {
    // this year
    return formatStr(
      _uawmsgs.default.CMN_FORMAT_DATE_WITH_DOW,
      year,
      month + 1,
      day,
      monthStr,
      dowStr,
    )
  } else {
    return formatStr(
      _uawmsgs.default.CMN_FORMAT_DATE_WITH_DOW_YEAR,
      year,
      month + 1,
      day,
      monthStr,
      dowStr,
    )
  }
})
var formatMessageDateTime = (exports.formatMessageDateTime =
  function formatMessageDateTime(timeValue) {
    var now = new Date()
    var yesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    )
    var time = timeValue ? new Date(timeValue) : now
    var year = time.getFullYear()
    var month = time.getMonth()
    var day = time.getDate()
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
      return _uawmsgs.default.CMN_YESTERDAY + ' ' + formatTime(timeValue)
    }
    var monthStr =
      month === 0
        ? _uawmsgs.default.CMN_MONTH_STR_01
        : month === 1
          ? _uawmsgs.default.CMN_MONTH_STR_02
          : month === 2
            ? _uawmsgs.default.CMN_MONTH_STR_03
            : month === 3
              ? _uawmsgs.default.CMN_MONTH_STR_04
              : month === 4
                ? _uawmsgs.default.CMN_MONTH_STR_05
                : month === 5
                  ? _uawmsgs.default.CMN_MONTH_STR_06
                  : month === 6
                    ? _uawmsgs.default.CMN_MONTH_STR_07
                    : month === 7
                      ? _uawmsgs.default.CMN_MONTH_STR_08
                      : month === 8
                        ? _uawmsgs.default.CMN_MONTH_STR_09
                        : month === 9
                          ? _uawmsgs.default.CMN_MONTH_STR_10
                          : month === 10
                            ? _uawmsgs.default.CMN_MONTH_STR_11
                            : month === 11
                              ? _uawmsgs.default.CMN_MONTH_STR_12
                              : ''
    if (year === now.getFullYear()) {
      // this year
      return (
        formatStr(
          _uawmsgs.default.CMN_FORMAT_DATE,
          year,
          month + 1,
          day,
          monthStr,
        ) +
        ' ' +
        formatTime(timeValue)
      )
    } else {
      return (
        formatStr(
          _uawmsgs.default.CMN_FORMAT_DATE_WITH_YEAR,
          year,
          month + 1,
          day,
          monthStr,
        ) +
        ' ' +
        formatTime(timeValue)
      )
    }
  })
var formatTopicDate = (exports.formatTopicDate = function formatTopicDate(
  timeValue,
) {
  var now = new Date()
  var time = new Date(timeValue)
  var year = time.getFullYear()
  var month = time.getMonth()
  var day = time.getDate()
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
  var monthStr =
    month === 0
      ? _uawmsgs.default.CMN_MONTH_STR_01
      : month === 1
        ? _uawmsgs.default.CMN_MONTH_STR_02
        : month === 2
          ? _uawmsgs.default.CMN_MONTH_STR_03
          : month === 3
            ? _uawmsgs.default.CMN_MONTH_STR_04
            : month === 4
              ? _uawmsgs.default.CMN_MONTH_STR_05
              : month === 5
                ? _uawmsgs.default.CMN_MONTH_STR_06
                : month === 6
                  ? _uawmsgs.default.CMN_MONTH_STR_07
                  : month === 7
                    ? _uawmsgs.default.CMN_MONTH_STR_08
                    : month === 8
                      ? _uawmsgs.default.CMN_MONTH_STR_09
                      : month === 9
                        ? _uawmsgs.default.CMN_MONTH_STR_10
                        : month === 10
                          ? _uawmsgs.default.CMN_MONTH_STR_11
                          : month === 11
                            ? _uawmsgs.default.CMN_MONTH_STR_12
                            : ''
  if (year === now.getFullYear()) {
    // this year
    return formatStr(
      _uawmsgs.default.CMN_FORMAT_DATE,
      year,
      month + 1,
      day,
      monthStr,
    )
  } else {
    return string(year)
  }
})
var parseDate = (exports.parseDate = function parseDate(str) {
  return new Date(
    int(str.substr(0, 4)),
    int(str.substr(5, 2)) - 1,
    int(str.substr(8, 2)),
    int(str.substr(11, 2)),
    int(str.substr(14, 2)),
    int(str.substr(17, 2)),
  )
})
var toPlainText = (exports.toPlainText = function toPlainText(html) {
  return unescapeHTML(string(html).replace(/<[^>]*>/g, ''))
})
var truncateWithEllipsis = (exports.truncateWithEllipsis =
  function truncateWithEllipsis(str, maxLength, ellipsis) {
    ellipsis = ellipsis || '...'
    if (maxLength < ellipsis.length) {
      ellipsis = ellipsis.substr(0, maxLength)
    }
    return str.length <= maxLength
      ? str
      : str.substr(0, maxLength - ellipsis.length) + ellipsis
  })
var parsePanelKey = (exports.parsePanelKey = function parsePanelKey(key) {
  var panelKey = string(key)
  var panelType = panelKey.split('_')[0]
  var panelCode = panelKey.substr((panelType + '_').length)
  return {
    panelType: panelType,
    panelCode: panelCode,
  }
})
