import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import ButtonLabeled from './ButtonLabeled.js'
import TextBox from './TextBox.js'

const colors = {
  white: '#FFFFFF',
  platinum: '#E0E0E0',
  darkJungleGreen: '#212121',
  isabelline: '#EEEEEE',
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  tableCell: {
    padding: 4,
  },
  cellText: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  inputArea: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 300,
  },
  useLaterButton: {
    position: 'absolute',
    right: 37,
    display: 'none', // Note: Will handle this in render logic
  },
  clearButton: {
    position: 'absolute',
    right: 1,
  },
  itemsContainer: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
  },
  item: {
    position: 'relative',
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 44,
    backgroundColor: colors.white,
  },
  itemHovered: {
    backgroundColor: colors.isabelline,
  },
  itemText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  editButton: {
    position: 'absolute',
    right: 36,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
})

/**
 * StatusDisplayForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.statusDisplayUseLaterButton_onClick
 * props.uiData.statusDisplayItemDeleteButton_onClick
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      hoveredItemIndex: null,
    }
    this.inputRef = React.createRef()
  }

  componentDidMount() {
    const statusMe = this.props.uiData.ucUiStore.getChatClient().getStatus()
    if (statusMe.display) {
      this.setState({ inputValue: string(statusMe.display) })
    }

    setTimeout(() => {
      if (this.inputRef.current) {
        this.inputRef.current.focus()
        this.inputRef.current.select()
      }
    }, 100)
  }

  handleInputChange = text => {
    this.setState({ inputValue: string(text) })
  }

  handleUseLaterPress = () => {
    const item = string(this.state.inputValue)
    this.setState({ inputValue: '' })
    this.props.uiData.fire('statusDisplayUseLaterButton_onClick', item)

    setTimeout(() => {
      if (this.inputRef.current) {
        this.inputRef.current.focus()
      }
    }, 100)
  }

  handleClearPress = () => {
    this.setState({ inputValue: '' })
    setTimeout(() => {
      if (this.inputRef.current) {
        this.inputRef.current.focus()
      }
    }, 100)
  }

  handleItemPress = item => {
    this.setState({ inputValue: string(item) }, () => {
      if (this.props.onOkPress) {
        this.props.onOkPress()
      }
    })
  }

  handleItemEdit = (item, event) => {
    this.setState({ inputValue: string(item) })
    this.props.uiData.fire('statusDisplayItemDeleteButton_onClick', item)

    setTimeout(() => {
      if (this.inputRef.current) {
        this.inputRef.current.focus()
        // Note: setSelectionRange equivalent should be handled in TextBox component
      }
    }, 100)
  }

  handleItemDelete = (item, event) => {
    this.props.uiData.fire('statusDisplayItemDeleteButton_onClick', item)
  }

  render() {
    const settings = this.props.uiData.ucUiStore.getChatClient().getSettings()
    const statusDisplayHistory =
      settings?.optional_settings?.status_display_history || []

    return (
      <View style={styles.container}>
        <View style={styles.tableCell}>
          <View style={styles.inputArea}>
            <TextBox
              ref={this.inputRef}
              style={styles.input}
              value={this.state.inputValue}
              onChangeText={this.handleInputChange}
            />
            <ButtonIconic
              style={styles.useLaterButton}
              iconSource={require('../assets/images/download.png')}
              title={uawMsgs.LBL_STATUS_DISPLAY_USE_LATER_BUTTON_TOOLTIP}
              onPress={this.handleUseLaterPress}
            />
            <ButtonIconic
              style={styles.clearButton}
              iconSource={require('../assets/images/close.png')}
              title={uawMsgs.LBL_STATUS_DISPLAY_CLEAR_BUTTON_TOOLTIP}
              onPress={this.handleClearPress}
            />
          </View>
        </View>

        <View style={styles.tableCell}>
          <View style={styles.itemsContainer}>
            <ScrollView style={styles.scrollView}>
              {statusDisplayHistory.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.item,
                    this.state.hoveredItemIndex === i && styles.itemHovered,
                  ]}
                  onPress={() => this.handleItemPress(item)}
                  onPressIn={() => this.setState({ hoveredItemIndex: i })}
                  onPressOut={() => this.setState({ hoveredItemIndex: null })}
                >
                  <Text style={styles.itemText} numberOfLines={1}>
                    {item}
                  </Text>
                  <ButtonIconic
                    style={styles.editButton}
                    iconSource={require('../assets/images/edit.png')}
                    title={uawMsgs.LBL_STATUS_DISPLAY_ITEM_EDIT_BUTTON_TOOLTIP}
                    onPress={() => this.handleItemEdit(item)}
                  />
                  <ButtonIconic
                    style={styles.deleteButton}
                    iconSource={require('../assets/images/close.png')}
                    title={
                      uawMsgs.LBL_STATUS_DISPLAY_ITEM_DELETE_BUTTON_TOOLTIP
                    }
                    onPress={() => this.handleItemDelete(item)}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
