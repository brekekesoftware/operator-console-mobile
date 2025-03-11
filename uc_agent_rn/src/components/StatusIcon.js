import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import Svg, { Circle, Defs, Path } from 'react-native-svg'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

const colors = {
  statusAvailable: '#bdbdbd',
  statusInvisible: '#999999',
  statusIdle: '#f3c915',
  statusBusy: '#ff4526',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
  container: {
    width: 12,
    height: 12,
  },
  baseStatusIcon: {
    width: 12,
    height: 12,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
})

const getStatusColor = status => {
  switch (int(status)) {
    case 1:
      return colors.statusAvailable
    case 2:
      return colors.statusIdle
    case 3:
      return colors.statusBusy
    default:
      return colors.statusInvisible
  }
}

/**
 * StatusIcon
 * props.style - Additional style for the icon
 * props.status - Status number
 * props.degree - Degree for conic gradient (if applicable)
 */
export default props => {
  // if (props.status === 32767) {
  //   return null
  // }

  const statusColor = getStatusColor(props.status)
  const degree = props.degree || 0

  const createConicGradientPath = degree => {
    const radius = 6
    const centerX = 6
    const centerY = 6

    if (degree >= 360) {
      return `M ${centerX} ${centerY} m -${radius} 0 a ${radius} ${radius} 0 1 0 ${radius * 2} 0 a ${radius} ${radius} 0 1 0 -${radius * 2} 0`
    }

    const angleInRadians = (degree - 90) * (Math.PI / 180)
    const endX = centerX + radius * Math.cos(angleInRadians)
    const endY = centerY + radius * Math.sin(angleInRadians)

    let path = `M ${centerX} ${centerY} `
    path += `L ${centerX} ${centerY - radius} `

    if (degree > 0) {
      path += `A ${radius} ${radius} 0 ${degree > 180 ? 1 : 0} 1 ${endX} ${endY} `
    }

    path += 'Z'
    return path
  }

  return (
    <View style={[styles.container, props.style]}>
      <Svg width='12' height='12' style={styles.baseStatusIcon}>
        <Circle
          cx='6'
          cy='6'
          r='5'
          fill={statusColor}
          stroke={statusColor}
          strokeWidth='2'
        />
        {props.degree && (
          <Path
            d={createConicGradientPath(degree)}
            fill={colors.white}
            fillOpacity={0.5}
          />
        )}
      </Svg>
    </View>
  )
}
