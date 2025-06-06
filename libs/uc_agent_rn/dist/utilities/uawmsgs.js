'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var Brekeke = (window.Brekeke = window.Brekeke || {})
Brekeke.UAWMsgs_default =
  Brekeke.UAWMsgs_default || require('../js/brekeke/uawmsgs/uawmsgs_default.js')
var languageFiles = {
  default: require('../js/brekeke/uawmsgs/uawmsgs_default.js'),
  it: require('../js/brekeke/uawmsgs/uawmsgs_it.js'),
  ja: require('../js/brekeke/uawmsgs/uawmsgs_ja.js'),
  zh: require('../js/brekeke/uawmsgs/uawmsgs_zh.js'),
}
var uawMsgs = {
  init: function init(options) {
    if (!options) {
      return
    }
    uawMsgs.current_script_url = {
      DIR: options.DIR,
      FILE: options.FILE,
      QUERY: options.QUERY,
    }
  },
  registerMoment: function registerMoment(moment) {
    if (!moment) {
      return
    }
    if (!uawMsgs.moments) {
      uawMsgs.moments = []
    }
    uawMsgs.moments.push(moment)
  },
  loadLanguage: function loadLanguage(lang, func) {
    if (!Brekeke['UAWMsgs_' + lang]) {
      try {
        Brekeke['UAWMsgs_' + lang] =
          languageFiles[lang] || languageFiles.default
      } catch (e) {
        console.error('Error loading language file:', e)
        Brekeke['UAWMsgs_' + lang] = languageFiles.default
      }
    }
    var tryCount = 0
    var _f = function f() {
      if (!Brekeke['UAWMsgs_' + lang] && tryCount < 30) {
        tryCount++
        setTimeout(_f, 100)
      } else {
        var msgs = Brekeke['UAWMsgs_' + lang]
        if (!msgs) {
          msgs = Brekeke.UAWMsgs_default
          lang = 'default'
        }
        for (var key in msgs) {
          uawMsgs[key] = msgs[key]
        }
        if (
          uawMsgs.moments &&
          typeof uawMsgs.moments.forEach === 'function' &&
          uawMsgs.CMN_MOMENT_LOCALE
        ) {
          uawMsgs.moments.forEach(function (moment) {
            return (
              typeof moment.locale === 'function' &&
              moment.locale(uawMsgs.CMN_MOMENT_LOCALE)
            )
          })
        }
        if (func) {
          func(lang)
        }
      }
    }
    _f()
  },
}
for (var key in Brekeke.UAWMsgs_default) {
  uawMsgs[key] = Brekeke.UAWMsgs_default[key]
}
var _default = (exports.default = uawMsgs)
