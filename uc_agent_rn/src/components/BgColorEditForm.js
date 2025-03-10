import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native'
import * as DocumentPicker from 'react-native-document-picker'
import * as FileSystem from 'react-native-fs'
import * as Sharing from 'react-native-share'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import DropDownMenu from './DropDownMenu.js'
import DndableSafe from './DndableSafe.js'
import MenuItem from './MenuItem.js'
import TextBox from './TextBox.js'

/**
 * BgColorEditForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.uiData.showingDialogVersion
 * props.uiData.preferenceWorkTable
 * props.params
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.exportObjectURL = null
    this.mustScroll = false
    this.state = {
      editCount: 0,
      nowEditing: null,
      editingType: '',
      editingFormat: '',
      editingData: '',
      editingColor: '',
      editingCustomColor: '',
      scrollToEnd: false,
    }
    this.scrollViewRef = React.createRef()
    this.entriesRef = React.createRef()
  }

  componentDidUpdate() {
    if (this.mustScroll) {
      this.mustScroll = false
      if (this.entriesRef.current) {
        const scrollView = this.entriesRef.current
        scrollView.measure((x, y, width, height, pageX, pageY) => {
          scrollView.scrollTo({ y: height, animated: true })
        })
      }
    }

    if (this.state.scrollToEnd) {
      if (this.entriesRef.current) {
        this.entriesRef.current.scrollToEnd({ animated: true })
      }
      this.setState({ scrollToEnd: false })
    }
  }

  componentWillUnmount() {
    // Remove URL.revokeObjectURL since it's not needed in React Native
  }

  getFormat(bgInfo) {
    const props = this.props

    const type = string(bgInfo && bgInfo.type)
    const data = string(bgInfo && bgInfo.data)

    if (
      type === 'subject' ||
      type === 'group' ||
      type === 'user_id' ||
      type === 'name'
    ) {
      if (data[0] === '^') {
        if (data[data.length - 1] === '$') {
          return 'exact'
        } else {
          return 'forward'
        }
      } else {
        if (data[data.length - 1] === '$') {
          return 'backward'
        } else {
          return 'partial'
        }
      }
    } else {
      return data
    }
  }

  getData(bgInfo) {
    const props = this.props

    let data = string(bgInfo && bgInfo.data)
    if (bgInfo.type === 'conf_type') {
      data = ''
    } else if (
      bgInfo.type === 'subject' ||
      bgInfo.type === 'group' ||
      bgInfo.type === 'user_id' ||
      bgInfo.type === 'name'
    ) {
      if (data[0] === '^') {
        data = data.substring(1)
      }
      if (data[data.length - 1] === '$') {
        data = data.substring(0, data.length - 1)
      }
    }
    return data
  }

  localizeType(type) {
    if (type === 'conf_type') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_CONF_TYPE
    } else if (type === 'subject') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_SUBJECT
    } else if (type === 'group') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_GROUP
    } else if (type === 'user_id') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_USER_ID
    } else if (type === 'name') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_NAME
    } else if (type === 'tag') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_TAG
    } else {
      return type
    }
  }

  localizeFormat(format) {
    if (format === 'exact') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_EXACT
    } else if (format === 'forward') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_FORWARD
    } else if (format === 'backward') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_BACKWARD
    } else if (format === 'partial') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_PARTIAL
    } else if (format === '^userchatconf$') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_USERCHATCONF
    } else if (format === '^webchat$') {
      return uawMsgs.LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_WEBCHAT
    } else {
      return format
    }
  }

  handleBgColorEditAddButtonClick(ev) {
    const props = this.props

    // stop editing
    if (this.state.nowEditing !== null) {
      this.handleBgColorEditEntryItemEditButtonClick(this.state.nowEditing)
    }

    // work
    const preferenceWork =
      props.uiData.preferenceWorkTable &&
      props.uiData.preferenceWorkTable[props.params && props.params.panelCode]
    let chatBgColorObject = null
    try {
      chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
      return
    }
    if (
      !chatBgColorObject ||
      !chatBgColorObject.list ||
      !chatBgColorObject.list.splice
    ) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'empty chatBgColorObject.list')
      return
    }

    // change
    const bgInfo = {
      type: 'conf_type',
      data: '^userchatconf$',
      color: '#ffffff',
    }
    chatBgColorObject.list.push(bgInfo)
    preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)

    // start editing
    this.setState({
      nowEditing: chatBgColorObject.list.length - 1,
      editingType: bgInfo.type,
      editingFormat: this.getFormat(bgInfo),
      editingData: this.getData(bgInfo),
      editingColor: bgInfo.color,
      editingCustomColor: '',
      editCount: this.state.editCount + 1,
    })

    // scroll
    this.mustScroll = true
  }

  async handleBgColorEditImportButtonClick() {
    const props = this.props

    // stop editing
    if (this.state.nowEditing !== null) {
      this.handleBgColorEditEntryItemEditButtonClick(this.state.nowEditing)
    }

    try {
      // Pick document
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })

      // Read file content
      const fileContent = await FileSystem.readFile(result[0].uri)
      this.handleImportedContent(fileContent)
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        props.uiData.ucUiStore.getLogger().log('warn', err)
      }
    }
  }

  handleImportedContent(content) {
    const props = this.props
    try {
      // Parse and validate JSON
      const chatBgColorImportedObject = JSON.parse(content)
      chatBgColorImportedObject.list.forEach(element => element.type.toString())

      // Update preference work
      const preferenceWork =
        props.uiData.preferenceWorkTable &&
        props.uiData.preferenceWorkTable[props.params && props.params.panelCode]

      if (!preferenceWork || !preferenceWork.chatBgColor) {
        props.uiData.ucUiStore
          .getLogger()
          .log('warn', 'empty preferenceWork.chatBgColor')
        return
      }

      preferenceWork.chatBgColor = content
      this.setState({ editCount: this.state.editCount + 1 })
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
    }
  }

  async handleBgColorEditExportButtonClick() {
    const props = this.props

    // stop editing
    if (this.state.nowEditing !== null) {
      this.handleBgColorEditEntryItemEditButtonClick(this.state.nowEditing)
    }

    try {
      const preferenceWork =
        props.uiData.preferenceWorkTable &&
        props.uiData.preferenceWorkTable[props.params && props.params.panelCode]

      if (!preferenceWork || !preferenceWork.chatBgColor) {
        props.uiData.ucUiStore
          .getLogger()
          .log('warn', 'empty preferenceWork.chatBgColor')
        return
      }

      // Create temporary file
      const fileName = 'chatbgcolor_' + Date.now() + '.dat'
      const path = `${FileSystem.TemporaryDirectoryPath}/${fileName}`
      await FileSystem.writeFile(path, preferenceWork.chatBgColor, 'utf8')

      // Share file
      await Sharing.open({
        url: `file://${path}`,
        type: 'text/plain',
        filename: fileName,
      })

      // Clean up temp file
      await FileSystem.unlink(path)
    } catch (error) {
      props.uiData.ucUiStore.getLogger().log('warn', error)
    }
  }

  handleBgColorEditDrop(dropTargetInfo, ev) {
    const props = this.props

    if (!(dropTargetInfo && ev && ev.dragSourceInfo)) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'invalid dragSourceInfo, dropTargetInfo')
      return
    }
    // parameters
    const dragSourceInfoType = ev.dragSourceInfo.dragSourceInfoType
    const dragSourceInfoCode = ev.dragSourceInfo.dragSourceInfoCode
    const dropTargetInfoType = dropTargetInfo.dropTargetInfoType
    const dropTargetInfoCode = dropTargetInfo.dropTargetInfoCode
    if (
      dragSourceInfoType !== 'bgColorEditEntryItem' ||
      dropTargetInfoType !== 'bgColorEditEntryItem'
    ) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'invalid dragSourceInfoType, dropTargetInfoType')
      return
    }

    // work
    const preferenceWork =
      props.uiData.preferenceWorkTable &&
      props.uiData.preferenceWorkTable[props.params && props.params.panelCode]
    let chatBgColorObject = null
    try {
      chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
      return
    }
    if (
      !chatBgColorObject ||
      !chatBgColorObject.list ||
      !chatBgColorObject.list.splice
    ) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'empty chatBgColorObject.list')
      return
    }

    // change
    const item = chatBgColorObject.list.splice(dragSourceInfoCode, 1)[0]
    chatBgColorObject.list.splice(dropTargetInfoCode, 0, item)
    preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)

    // render
    this.setState({ editCount: this.state.editCount + 1 })
  }

  handleBgColorEditEntryItemTypeMenuItemClick(type, ev) {
    const props = this.props

    if (
      type === 'conf_type' &&
      ['^userchatconf$', '^webchat$'].indexOf(this.state.editingFormat) === -1
    ) {
      this.setState({
        editingType: type,
        editingFormat: '^userchatconf$',
      })
    } else if (
      type !== 'conf_type' &&
      ['exact', 'forward', 'backward', 'partial'].indexOf(
        this.state.editingFormat,
      ) === -1
    ) {
      this.setState({
        editingType: type,
        editingFormat: 'exact',
      })
    } else {
      this.setState({
        editingType: type,
      })
    }
  }

  handleBgColorEditEntryItemFormatMenuItemClick(format, ev) {
    const props = this.props

    this.setState({ editingFormat: format })
  }

  handleBgColorEditEntryItemDataInputChange(ev) {
    const props = this.props

    this.setState({ editingData: string(ev.target.value) })
  }

  handleBgColorEditEntryItemColorMenuItemClick(color, ev) {
    const props = this.props

    this.setState({ editingColor: color })
  }

  handleBgColorEditEntryItemColorMenuItemCustomColorColorClick(ev) {
    const props = this.props

    this.setState({ editingColor: this.state.editingCustomColor })
    props.uiData.showingDialogVersion++
  }

  handleBgColorEditEntryItemColorMenuItemCustomColorInputChange(ev) {
    const props = this.props

    this.setState({ editingCustomColor: string(ev.target.value) })
  }

  handleBgColorEditEntryItemColorMenuItemCustomColorInputKeyDown(ev) {
    const props = this.props

    if (ev && ev.keyCode === 13 && !ev.shiftKey) {
      this.setState({ editingColor: this.state.editingCustomColor })
      props.uiData.showingDialogVersion++
      ev.stopPropagation()
    }
  }

  handleBgColorEditEntryItemEditButtonClick(i, ev) {
    const props = this.props

    // work
    const preferenceWork =
      props.uiData.preferenceWorkTable &&
      props.uiData.preferenceWorkTable[props.params && props.params.panelCode]
    let chatBgColorObject = null
    try {
      chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
      return
    }
    if (
      !chatBgColorObject ||
      !chatBgColorObject.list ||
      !chatBgColorObject.list.splice
    ) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'empty chatBgColorObject.list')
      return
    }
    const bgInfo = chatBgColorObject.list[i]
    if (!bgInfo) {
      props.uiData.ucUiStore.getLogger().log('warn', 'empty bgInfo')
      return
    }

    // start / stop editing
    if (this.state.nowEditing !== i) {
      this.setState({
        nowEditing: i,
        editingType: bgInfo.type,
        editingFormat: this.getFormat(bgInfo),
        editingData: this.getData(bgInfo),
        editingColor: bgInfo.color,
        editingCustomColor: '',
      })
    } else {
      // change
      const type = string(this.state.editingType)
      const format = string(this.state.editingFormat)
      let data = string(this.state.editingData)
      const color = string(this.state.editingColor)
      if (type === 'conf_type') {
        data = format
      } else if (
        type === 'subject' ||
        type === 'group' ||
        type === 'user_id' ||
        type === 'name'
      ) {
        if (format === 'exact' || format === 'forward') {
          data = '^' + data
        }
        if (format === 'exact' || format === 'backward') {
          data = data + '$'
        }
      }
      bgInfo.type = type
      bgInfo.data = data
      bgInfo.color = color
      preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)
      this.setState({
        nowEditing: null,
        editCount: this.state.editCount + 1,
      })
    }
  }

  handleBgColorEditEntryItemDeleteButtonClick(i, ev) {
    const props = this.props

    // work
    const preferenceWork =
      props.uiData.preferenceWorkTable &&
      props.uiData.preferenceWorkTable[props.params && props.params.panelCode]
    let chatBgColorObject = null
    try {
      chatBgColorObject = JSON.parse(preferenceWork.chatBgColor)
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
      return
    }
    if (
      !chatBgColorObject ||
      !chatBgColorObject.list ||
      !chatBgColorObject.list.splice
    ) {
      props.uiData.ucUiStore
        .getLogger()
        .log('warn', 'empty chatBgColorObject.list')
      return
    }

    // change
    chatBgColorObject.list.splice(i, 1)
    preferenceWork.chatBgColor = JSON.stringify(chatBgColorObject)

    // render
    this.setState({ editCount: this.state.editCount + 1 })
  }

  render() {
    const props = this.props
    const preferenceWork =
      (props.uiData.preferenceWorkTable &&
        props.uiData.preferenceWorkTable[
          props.params && props.params.panelCode
        ]) ||
      {}
    let chatBgColorList = []
    try {
      chatBgColorList = [].concat(
        JSON.parse(string(preferenceWork.chatBgColor) || '{}').list || [],
      )
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
    }
    let colorCands = [
      '#fcf8ff',
      '#f8faff',
      '#f8ffff',
      '#f8fff8',
      '#fefff6',
      '#fffbf6',
      '#fff8fa',
    ]
    if (props.uiData.configurations && props.uiData.configurations.colorCands) {
      try {
        colorCands = JSON.parse(props.uiData.configurations.colorCands)
      } catch (ex) {
        props.uiData.ucUiStore.getLogger().log('warn', ex)
      }
    }
    chatBgColorList
      .slice()
      .reverse()
      .forEach(bgInfo => {
        if (bgInfo && bgInfo.color && colorCands.indexOf(bgInfo.color) === -1) {
          colorCands.unshift(bgInfo.color)
        }
      })
    return (
      <View style={styles.brBgColorEditForm}>
        <View style={styles.brBgColorEditButtons}>
          <TouchableOpacity
            style={[styles.brBgColorEditButton, styles.addButton]}
            onPress={this.handleBgColorEditAddButtonClick.bind(this)}
          >
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.brBgColorEditButton, styles.importButton]}
            onPress={this.handleBgColorEditImportButtonClick.bind(this)}
          >
            <Text>↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.brBgColorEditButton, styles.exportButton]}
            onPress={this.handleBgColorEditExportButtonClick.bind(this)}
          >
            <Text>↓</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={this.entriesRef}
          style={styles.brBgColorEditEntries}
          showsVerticalScrollIndicator={true}
          onContentSizeChange={() => {
            if (this.mustScroll) {
              this.entriesRef.current?.scrollToEnd({ animated: true })
            }
          }}
        >
          {chatBgColorList.map((element, i) => {
            const bgInfo = element || {}
            if (this.state.nowEditing !== i) {
              return (
                <View key={i} style={styles.brBgColorEditEntryItem}>
                  <DndableSafe
                    uiData={props.uiData}
                    className={
                      'brBgColorEditEntryItem brBgInfoType_' + bgInfo.type
                    }
                    dragSourceInfo={{
                      dragSourceInfoType: 'bgColorEditEntryItem',
                      dragSourceInfoCode: i,
                    }}
                    onCheckCanDrop={ev =>
                      this.state.nowEditing === null &&
                      ev.dragSourceInfo &&
                      ev.dragSourceInfo.dragSourceInfoType ===
                        'bgColorEditEntryItem' &&
                      ev.dragSourceInfo.dragSourceInfoCode !== i
                    }
                    onDrop={this.handleBgColorEditDrop.bind(this, {
                      dropTargetInfoType: 'bgColorEditEntryItem',
                      dropTargetInfoCode: i,
                    })}
                  >
                    <View style={styles.brBgColorEditEntryItemArea}>
                      <View style={styles.brBgColorEditEntryItemLabelArea}>
                        <Text style={styles.brBgColorEditEntryItemType}>
                          {this.localizeType(bgInfo.type)}
                        </Text>
                        <Text style={styles.brBr1}></Text>
                        <Text style={styles.brBgColorEditEntryItemFormat}>
                          {this.localizeFormat(this.getFormat(bgInfo))}
                        </Text>
                        <Text style={styles.brBr2}></Text>
                        <Text style={styles.brBgColorEditEntryItemData}>
                          {this.getData(bgInfo)}
                        </Text>
                      </View>
                      <View style={styles.brBgColorEditEntryItemColorContainer}>
                        <View
                          style={[
                            styles.colorSwatch,
                            { backgroundColor: bgInfo.color },
                          ]}
                        ></View>
                      </View>
                      <TouchableOpacity
                        style={styles.editButton}
                        onPress={this.handleBgColorEditEntryItemEditButtonClick.bind(
                          this,
                          i,
                        )}
                      >
                        <Text style={styles.editButtonText}>✎</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={this.handleBgColorEditEntryItemDeleteButtonClick.bind(
                          this,
                          i,
                        )}
                      >
                        <Text style={styles.deleteButtonText}>✗</Text>
                      </TouchableOpacity>
                    </View>
                  </DndableSafe>
                </View>
              )
            } else {
              return (
                <View key={i} style={styles.brBgColorEditEntryItem}>
                  <View style={styles.brBgColorEditEntryItemArea}>
                    <View style={styles.brBgColorEditEntryItemInputArea}>
                      <DropDownMenu
                        uiData={props.uiData}
                        className='brBgColorEditEntryItemTypeMenu'
                        dialogClassName='brBgColorEditEntryItemDialog'
                        text={this.localizeType(this.state.editingType)}
                      >
                        {[
                          'conf_type',
                          'subject',
                          'group',
                          'user_id',
                          'name',
                          'tag',
                        ].map(type => (
                          <MenuItem
                            key={type}
                            className='brBgColorEditEntryItemTypeMenuItem'
                            dropDown={true}
                            onClick={this.handleBgColorEditEntryItemTypeMenuItemClick.bind(
                              this,
                              type,
                            )}
                          >
                            {this.localizeType(type)}
                          </MenuItem>
                        ))}
                      </DropDownMenu>
                      <Text style={styles.brBr1}></Text>
                      <DropDownMenu
                        uiData={props.uiData}
                        className='brBgColorEditEntryItemFormatMenu'
                        dialogClassName='brBgColorEditEntryItemDialog'
                        text={this.localizeFormat(this.state.editingFormat)}
                      >
                        {(this.state.editingType === 'conf_type'
                          ? ['^userchatconf$', '^webchat$']
                          : ['exact', 'forward', 'backward', 'partial']
                        ).map(format => (
                          <MenuItem
                            key={format}
                            className='brBgColorEditEntryItemFormatMenuItem'
                            dropDown={true}
                            onClick={this.handleBgColorEditEntryItemFormatMenuItemClick.bind(
                              this,
                              format,
                            )}
                          >
                            {this.localizeFormat(format)}
                          </MenuItem>
                        ))}
                      </DropDownMenu>
                      <Text style={styles.brBr2}></Text>
                      <TextBox
                        className='brBgColorEditEntryItemDataInput'
                        value={this.state.editingData}
                        onChange={this.handleBgColorEditEntryItemDataInputChange.bind(
                          this,
                        )}
                      />
                      <DropDownMenu
                        uiData={props.uiData}
                        className='brBgColorEditEntryItemColorMenu'
                        dialogClassName='brBgColorEditEntryItemDialog'
                        text={<View style={styles.colorSwatch}></View>}
                      >
                        {colorCands.map(color => (
                          <MenuItem
                            key={color}
                            className='brBgColorEditEntryItemColorMenuItem'
                            dropDown={true}
                            onClick={this.handleBgColorEditEntryItemColorMenuItemClick.bind(
                              this,
                              color,
                            )}
                          >
                            <View
                              style={[
                                styles.colorSwatch,
                                { backgroundColor: color },
                              ]}
                            ></View>
                          </MenuItem>
                        ))}
                        <MenuItem
                          className='brBgColorEditEntryItemColorMenuItem'
                          dropDown={true}
                        >
                          <TouchableOpacity
                            style={styles.colorMenuItem}
                            onPress={this.handleBgColorEditEntryItemColorMenuItemCustomColorColorClick.bind(
                              this,
                            )}
                          >
                            <View style={styles.colorMenuItemColor}></View>
                          </TouchableOpacity>
                          <TextBox
                            className='brBgColorEditEntryItemColorMenuItemCustomColorInput'
                            value={this.state.editingCustomColor}
                            onChange={this.handleBgColorEditEntryItemColorMenuItemCustomColorInputChange.bind(
                              this,
                            )}
                            onKeyDown={this.handleBgColorEditEntryItemColorMenuItemCustomColorInputKeyDown.bind(
                              this,
                            )}
                          />
                        </MenuItem>
                      </DropDownMenu>
                    </View>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={this.handleBgColorEditEntryItemEditButtonClick.bind(
                        this,
                        i,
                      )}
                    >
                      <Text style={styles.editButtonText}>✎</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brBgColorEditForm: {
    padding: 8,
    paddingHorizontal: 32,
  },
  brBgColorEditButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 4,
  },
  brBgColorEditButton: {
    marginLeft: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  brBgColorEditEntries: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: '#E5E5E5', // @platinum equivalent
    borderRadius: 4,
  },
  brBgColorEditEntryItem: {
    position: 'relative',
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 116,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  brBgColorEditEntryItemArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brBgColorEditEntryItemLabelArea: {
    flexDirection: 'column',
  },
  brBgColorEditEntryItemType: {
    fontSize: 13,
    color: '#1A2B2B', // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBr1: {
    marginBottom: 4,
  },
  brBgColorEditEntryItemFormat: {
    fontSize: 13,
    color: '#1A2B2B', // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBr2: {
    marginBottom: 4,
  },
  brBgColorEditEntryItemData: {
    fontSize: 13,
    color: '#1A2B2B', // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBgColorEditEntryItemColorContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'absolute',
    right: 76,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    position: 'absolute',
    right: 76,
  },
  editButton: {
    position: 'absolute',
    right: 36,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  brBgColorEditEntryItemInputArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brBgColorEditEntryItemColorMenu: {
    marginLeft: 8,
  },
  brBgColorEditEntryItemColorMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brBgColorEditEntryItemColorMenuItemColor: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  brBgColorEditEntryItemColorMenuItemLabel: {
    fontSize: 13,
    color: '#1A2B2B', // @dark_jungle_green equivalent
    letterSpacing: 0.3,
  },
  brBgColorEditEntryItemColorMenuItemCustomColorColor: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  brBgColorEditEntryItemColorMenuItemCustomColorInput: {
    flex: 1,
  },
  colorMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorMenuItemColor: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  // Add more styles as needed...
})
