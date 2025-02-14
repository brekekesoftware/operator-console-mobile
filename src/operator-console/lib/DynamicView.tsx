import { Component } from 'react'
import { Text, View } from 'react-native'

export class DynamicView extends Component<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      childrens: [],
      name: props.name,
    }
  }
  addChild(c) {
    this.setState(prev => ({
      ...prev,
      childrens: [
        ...prev.childrens,
        { id: prev.length + 1, text: `Child ${prev.length + 1}` },
      ],
    }))
  }
  render() {
    const { childrens } = this.state
    return (
      <View style={this.props.style}>
        {childrens.map(child => (
          <View key={child.id}>
            <Text>{child.text}</Text>
          </View>
        ))}
      </View>
    )
  }
}
