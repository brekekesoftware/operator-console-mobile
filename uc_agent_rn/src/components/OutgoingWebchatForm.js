import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import DropDownMenu from './DropDownMenu.js'
import MenuItem from './MenuItem.js'
import TextBox from './TextBox.js'

/**
 * OutgoingWebchatForm
 * props.uiData
 * props.params
 */
export default class OutgoingWebchatForm extends React.Component {
  constructor(props) {
    super(props)
    const defaultReplyType = string(props?.params?.replyTypes?.[0])
    this.state = {
      replyType: defaultReplyType,
      serviceId: string(
        props?.params?.webchatServiceIds?.[defaultReplyType]?.[0],
      ),
      text: '',
    }
    this.outgoingWebchatTextInputRef = React.createRef()
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.outgoingWebchatTextInputRef.current) {
        this.outgoingWebchatTextInputRef.current.focus()
      }
    }, 0)
  }

  handleOutgoingWebchatReplyTypeItemClick = replyType => {
    const { props } = this
    if (this.state.replyType !== replyType) {
      this.setState({
        replyType: replyType,
        serviceId: string(props?.params?.webchatServiceIds?.[replyType]?.[0]),
      })
    }
  }

  handleOutgoingWebchatServiceIdItemClick = serviceId => {
    if (this.state.serviceId !== serviceId) {
      this.setState({ serviceId })
    }
  }

  handleOutgoingWebchatTextInputChange = text => {
    this.setState({ text: string(text) })
  }

  render() {
    const { props } = this
    const replyTypes = props?.params?.replyTypes || []
    const webchatServiceIds =
      props?.params?.webchatServiceIds?.[this.state.replyType] || []

    return (
      <View style={styles.brOutgoingWebchatForm}>
        <View style={styles.brOutgoingWebchatTable}>
          <View style={styles.tableRow}>
            <Text style={styles.brOutgoingWebchatLabelCell}>
              {uawMsgs.LBL_OUTGOING_WEBCHAT_REPLY_TYPE}
            </Text>
            <View style={styles.brOutgoingWebchatInputCell}>
              <DropDownMenu
                uiData={props.uiData}
                style={styles.brOutgoingWebchatReplyTypeMenu}
                text={this.state.replyType}
              >
                {replyTypes.map(replyType => (
                  <MenuItem
                    key={replyType}
                    style={[
                      styles.brOutgoingWebchatFormMenuItem,
                      styles.brOutgoingWebchatReplyTypeItem,
                    ]}
                    dropDown={true}
                    onPress={() =>
                      this.handleOutgoingWebchatReplyTypeItemClick(replyType)
                    }
                  >
                    {replyType}
                  </MenuItem>
                ))}
              </DropDownMenu>
            </View>
          </View>
          {webchatServiceIds.length >= 2 && (
            <View style={styles.tableRow}>
              <Text style={styles.brOutgoingWebchatLabelCell}>
                {uawMsgs.LBL_OUTGOING_WEBCHAT_SERVICE_ID}
              </Text>
              <View style={styles.brOutgoingWebchatInputCell}>
                <DropDownMenu
                  uiData={props.uiData}
                  style={styles.brOutgoingWebchatServiceIdMenu}
                  text={this.state.serviceId}
                >
                  {webchatServiceIds.map(serviceId => (
                    <MenuItem
                      key={serviceId}
                      style={[
                        styles.brOutgoingWebchatFormMenuItem,
                        styles.brOutgoingWebchatServiceIdItem,
                      ]}
                      dropDown={true}
                      onPress={() =>
                        this.handleOutgoingWebchatServiceIdItemClick(serviceId)
                      }
                    >
                      {serviceId}
                    </MenuItem>
                  ))}
                </DropDownMenu>
              </View>
            </View>
          )}

          <View style={styles.tableRow}>
            <TextBox
              ref={this.outgoingWebchatTextInputRef}
              style={styles.brOutgoingWebchatTextInput}
              value={this.state.text}
              placeholder={uawMsgs.LBL_OUTGOING_WEBCHAT_TEXT_PLACEHOLDER}
              autoCapitalize='none'
              onChangeText={this.handleOutgoingWebchatTextInputChange}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brOutgoingWebchatForm: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },
  brOutgoingWebchatTable: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  brOutgoingWebchatLabelCell: {
    padding: 4,
    fontSize: 13 * (1 / 16),
    fontWeight: '500',
    letterSpacing: 0.3 * (1 / 16),
    minWidth: 80,
  },
  brOutgoingWebchatInputCell: {
    padding: 4,
    fontSize: 13 * (1 / 16),
    fontWeight: '500',
    letterSpacing: 0.3 * (1 / 16),
    flex: 1,
    minWidth: 80,
  },
  brOutgoingWebchatReplyTypeMenu: {
    minWidth: 150,
  },
  brOutgoingWebchatServiceIdMenu: {
    minWidth: 150,
  },
  brOutgoingWebchatTextInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  brOutgoingWebchatFormMenuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  brOutgoingWebchatReplyTypeItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  brOutgoingWebchatServiceIdItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
})
