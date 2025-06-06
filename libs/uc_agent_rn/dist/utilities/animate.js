'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = animate
var _strings = require('./strings.js')
var animatings = []
function animate(element, property, to, duration, tick) {
  if (!element) {
    return
  }
  var animating = {
    element: element,
    property: property,
    to: (0, _strings.int)(to),
    duration: Math.abs(duration) || 200,
    tick: Math.abs(tick) || 20,
  }
  animating.tick = Math.min(animating.duration, animating.tick)
  var existingAnimating = animatings.find(function (a) {
    return a.element === element && a.property === property
  })
  if (existingAnimating) {
    existingAnimating.to = animating.to
    existingAnimating.duration = animating.duration
    existingAnimating.tick = animating.tick
    return
  }
  animatings.push(animating)
  var _f = function f() {
    var from = (0, _strings.int)(animating.element[animating.property])
    var d =
      (0, _strings.int)(
        ((animating.to - from) * animating.tick) / animating.duration,
      ) || (animating.to > from ? 1 : -1)
    if (Math.abs(animating.to - from) <= Math.abs(d)) {
      animating.element[animating.property] = animating.to
      var i = animatings.findIndex(function (a) {
        return (
          a.element === animating.element && a.property === animating.property
        )
      })
      if (i >= 0) {
        animatings.splice(i, 1)
      }
    } else {
      animating.element[animating.property] = from + d
      animating.duration = Math.max(1, animating.duration - animating.tick)
      setTimeout(_f, animating.tick)
    }
  }
  setTimeout(_f, animating.tick)
}
