if (typeof define === 'function' && define.amd) {
  if (typeof Brekeke === 'undefined') {
    Brekeke = {}
  }
  Brekeke.ReactDojo = {
    amd: define.amd,
  }
  define.amd = null
}
module.exports = {}
