import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const styles = StyleSheet.create({
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    minWidth: 224,
    minHeight: 48,
    height: 48,
    paddingLeft: 4,
  },
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#f6f6f6',
    borderBottomWidth: 1,
    borderBottomColor: '#b2b2b2',
    // zIndex: 1,
  },
  // Style for child ToolbarButton components
  toolbarButton: {
    margin: 5,
    marginRight: 4,
  },
})

/**
 * Toolbar
 * props.children - Toolbar buttons or other components
 * props.style - Additional custom styles for the toolbar
 */
export default function Toolbar(props) {
  // On iOS and Android, we'll use LinearGradient for the background
  if (Platform.OS === 'web') {
    return (
      <LinearGradient
        style={[styles.toolbar, props.style]}
        colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,0)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <View style={styles.toolbarContent}>
          {React.Children.map(props.children, child => {
            // Apply toolbar button styles to ToolbarButton children
            if (child?.type?.name === 'ToolbarButton') {
              return React.cloneElement(child, {
                style: [styles.toolbarButton, child.props.style],
              })
            }
            return child
          })}
        </View>
      </LinearGradient>
    )
  }

  // For web, we can use the regular View with background gradient
  return (
    <View
      style={[
        styles.toolbar,
        // {
        //   backgroundImage:
        //     'linear-gradient(rgba(255,255,255,0.7) 0, rgba(255,255,255,0) 100%)',
        // },
        props.style,
      ]}
    >
      <View style={styles.toolbarContent}>
        {React.Children.map(props.children, child => {
          // Apply toolbar button styles to ToolbarButton children
          if (child?.type?.name === 'ToolbarButton') {
            return React.cloneElement(child, {
              style: [styles.toolbarButton, child.props.style],
            })
          }
          return child
        })}
      </View>
    </View>
  )
}
