import { Animated, Easing } from 'react-native'

import {
  ANIMATED_ELASTIC_BOUNCINESS,
  ANIMATED_ELASTIC_DURATION,
  ANIMATED_SPRING_FRICTION,
  ANIMATED_SPRING_TENSION,
  ANIMATED_TIMING_IN,
} from './constants'

export const animateTiming = ({
  variable,
  toValue,
  duration = ANIMATED_TIMING_IN,
  delay = 0,
  easing = Easing.out(Easing.cubic),
}: any) =>
  Animated.timing(variable, {
    toValue,
    duration,
    easing,
    delay,
    useNativeDriver: true,
  })

export const animateLoop = ({
  variable,
  toValue,
  duration = 3223,
  easing = Easing.linear,
}: any) => {
  const animation = Animated.loop(
    Animated.timing(variable, {
      toValue,
      duration,
      easing,
      isInteraction: false,
      useNativeDriver: true,
    }),
  )
  animation.start()
  return animation
}

export const animateSpring = ({
  variable,
  toValue,
  delay = 0,
  tension = ANIMATED_SPRING_TENSION,
  friction = ANIMATED_SPRING_FRICTION,
}: any) =>
  Animated.spring(variable, {
    toValue,
    tension,
    friction,
    delay,
    useNativeDriver: true,
  })

export const animateElastic = (params: any) =>
  animateTiming({
    duration: ANIMATED_ELASTIC_DURATION,
    easing: Easing.elastic(ANIMATED_ELASTIC_BOUNCINESS),
    ...params,
  })
