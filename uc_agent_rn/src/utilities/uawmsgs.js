const Brekeke = (window.Brekeke = window.Brekeke || {})
Brekeke.UAWMsgs_default =
  Brekeke.UAWMsgs_default || require('../js/brekeke/uawmsgs/uawmsgs_default.js')

const languageFiles = {
  default: require('../js/brekeke/uawmsgs/uawmsgs_default.js'),
  en: require('../js/brekeke/uawmsgs/uawmsgs_en.js'),
  ja: require('../js/brekeke/uawmsgs/uawmsgs_ja.js'),
}

const uawMsgs = {
  init: function (options) {
    if (!options) {
      return
    }
    uawMsgs.current_script_url = {
      DIR: options.DIR,
      FILE: options.FILE,
      QUERY: options.QUERY,
    }
  },
  registerMoment: function (moment) {
    if (!moment) {
      return
    }
    if (!uawMsgs.moments) {
      uawMsgs.moments = []
    }
    uawMsgs.moments.push(moment)
  },
  loadLanguage: function (lang, func) {
    if (!Brekeke['UAWMsgs_' + lang]) {
      try {
        Brekeke['UAWMsgs_' + lang] =
          languageFiles[lang] || languageFiles.default
      } catch (e) {
        console.error('Error loading language file:', e)
        Brekeke['UAWMsgs_' + lang] = languageFiles.default
      }
    }
    let tryCount = 0
    const f = function () {
      if (!Brekeke['UAWMsgs_' + lang] && tryCount < 30) {
        tryCount++
        setTimeout(f, 100)
      } else {
        let msgs = Brekeke['UAWMsgs_' + lang]
        if (!msgs) {
          msgs = Brekeke.UAWMsgs_default
          lang = 'default'
        }
        for (let key in msgs) {
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

for (let key in Brekeke.UAWMsgs_default) {
  uawMsgs[key] = Brekeke.UAWMsgs_default[key]
}

export default uawMsgs
