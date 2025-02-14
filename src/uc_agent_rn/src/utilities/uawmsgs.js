Object.defineProperty(exports, '__esModule', {
  value: true,
})
var Brekeke = (window.Brekeke = window.Brekeke || {})
Brekeke.UAWMsgs_default =
  Brekeke.UAWMsgs_default || require('../js/brekeke/uawmsgs/uawmsgs_default.js')

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
      setTimeout(() => {
        require(
          `${uawMsgs.current_script_url.DIR}../js/brekeke/uawmsgs_${lang}.js${uawMsgs.current_script_url.QUERY}`,
        )
      }, 0)
    }
    var tryCount = 0
    var f = function f() {
      if (!Brekeke['UAWMsgs_' + lang] && tryCount < 30) {
        tryCount++
        setTimeout(f, 100)
      } else {
        var msgs = Brekeke['UAWMsgs_' + lang] // current language
        if (!msgs) {
          msgs = Brekeke.UAWMsgs_default // default language
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
          uawMsgs.moments.forEach(
            moment =>
              typeof moment.locale === 'function' &&
              moment.locale(uawMsgs.CMN_MOMENT_LOCALE),
          )
        }
        if (func) {
          func(lang)
        }
      }
    }
    f()
  },
}
for (var key in Brekeke.UAWMsgs_default) {
  // default language
  uawMsgs[key] = Brekeke.UAWMsgs_default[key]
}

export default uawMsgs
