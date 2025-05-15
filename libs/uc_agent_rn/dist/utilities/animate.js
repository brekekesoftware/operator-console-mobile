import { int, string } from './strings.js'
const animatings = []
export default function animate(element, property, to, duration, tick) {
  if (!element) {
    return
  }
  const animating = {
    element: element,
    property: property,
    to: int(to),
    duration: Math.abs(duration) || 200,
    tick: Math.abs(tick) || 20,
  }
  animating.tick = Math.min(animating.duration, animating.tick)
  const existingAnimating = animatings.find(
    a => a.element === element && a.property === property,
  )
  if (existingAnimating) {
    existingAnimating.to = animating.to
    existingAnimating.duration = animating.duration
    existingAnimating.tick = animating.tick
    return
  }
  animatings.push(animating)
  const f = () => {
    const from = int(animating.element[animating.property])
    const d =
      int(((animating.to - from) * animating.tick) / animating.duration) ||
      (animating.to > from ? 1 : -1)
    if (Math.abs(animating.to - from) <= Math.abs(d)) {
      animating.element[animating.property] = animating.to
      const i = animatings.findIndex(
        a =>
          a.element === animating.element && a.property === animating.property,
      )
      if (i >= 0) {
        animatings.splice(i, 1)
      }
    } else {
      animating.element[animating.property] = from + d
      animating.duration = Math.max(1, animating.duration - animating.tick)
      setTimeout(f, animating.tick)
    }
  }
  setTimeout(f, animating.tick)
}
