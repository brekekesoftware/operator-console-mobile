import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { Picker } from '@react-native-picker/picker'
import DatePicker from 'react-native-date-picker'
import '../utilities/disableamd.js'
import '../utilities/restoreamd.js'
import 'moment/locale/ja'
import 'moment/locale/zh-cn'
import moment from 'moment'
moment.locale('en')
uawMsgs.registerMoment(moment)

/**
 * SearchConditionsArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 */
export default class SearchConditionsArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showStartDatePicker: false,
      showEndDatePicker: false,
      inputValues: {},
    }
  }

  handleDatePickerChange(searchConditionIndex, isEnd, selectedDate) {
    const props = this.props
    const searchConditions = props.uiData.ucUiStore.getSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })

    if (searchConditions && searchConditions[searchConditionIndex]) {
      const startEnd = string(
        searchConditions[searchConditionIndex].conditionValue,
      ).split('-')

      const momentDate = moment(selectedDate)
      if (!isEnd) {
        startEnd[0] = string(momentDate.startOf('day').valueOf())
        startEnd[1] = string(startEnd[1])
        this.setState({ showStartDatePicker: false })
      } else {
        startEnd[0] = string(startEnd[0])
        startEnd[1] = string(momentDate.endOf('day').valueOf())
        this.setState({ showEndDatePicker: false })
      }

      searchConditions[searchConditionIndex].conditionValue = startEnd.join('-')
      props.uiData.ucUiAction.setSearchConditions({
        chatType: props.panelType,
        chatCode: props.panelCode,
        searchConditions: searchConditions,
      })
    }
  }

  handleSelectChange(searchConditionIndex, value) {
    this.changeSearchCondition(searchConditionIndex, value)
  }

  handleInputChange(searchConditionIndex, value) {
    const inputValues = { ...this.state.inputValues }
    inputValues[searchConditionIndex] = value
    this.setState({ inputValues })
  }

  handleInputBlur(searchConditionIndex) {
    const value = this.state.inputValues[searchConditionIndex]
    const inputValues = { ...this.state.inputValues }
    delete inputValues[searchConditionIndex]
    this.setState({ inputValues })
    this.changeSearchCondition(searchConditionIndex, value)
  }

  handleInputSubmit(searchConditionIndex) {
    const value = this.state.inputValues[searchConditionIndex]
    const inputValues = { ...this.state.inputValues }
    delete inputValues[searchConditionIndex]
    this.setState({ inputValues })
    this.changeSearchCondition(searchConditionIndex, value)

    this.props.uiData.ucUiAction.doSearch({
      chatType: this.props.panelType,
      chatCode: this.props.panelCode,
      emphasize: true,
    })
  }

  handleDoSearchPress() {
    this.props.uiData.ucUiAction.doSearch({
      chatType: this.props.panelType,
      chatCode: this.props.panelCode,
      emphasize: true,
    })
  }

  changeSearchCondition(searchConditionIndex, value) {
    const props = this.props
    const searchConditions = props.uiData.ucUiStore.getSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })

    if (searchConditions && searchConditions[searchConditionIndex]) {
      searchConditions[searchConditionIndex].conditionValue = value
      props.uiData.ucUiAction.setSearchConditions({
        chatType: props.panelType,
        chatCode: props.panelCode,
        searchConditions: searchConditions,
      })
    }
  }

  render() {
    const { props } = this
    const searchConditions = props.uiData.ucUiStore.getSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    const searchWorkData = props.uiData.ucUiStore.getSearchWorkData({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })

    return (
      <View style={styles.searchConditionsArea}>
        <ScrollView style={styles.conditionsContainer}>
          {searchConditions.map((searchCondition, i) => {
            const conditionLabel =
              searchCondition.conditionLabel ||
              (searchCondition.conditionKey === '_content'
                ? uawMsgs.LBL_SEARCH_CONDITION_CONTENT
                : searchCondition.conditionKey === '_datetime'
                  ? uawMsgs.LBL_SEARCH_CONDITION_DATETIME
                  : searchCondition.conditionKey === '_webchatIds'
                    ? uawMsgs.LBL_SEARCH_CONDITION_WEBCHATIDS
                    : '')

            if (searchCondition.hidden) {
              return null
            }

            return (
              <View key={i} style={styles.conditionRow}>
                <Text style={styles.labelColumn}>{conditionLabel}</Text>
                <View style={styles.inputColumn}>
                  {searchCondition.conditionKey === '_datetime' ? (
                    <View style={styles.datePickerContainer}>
                      <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() =>
                          this.setState({ showStartDatePicker: true })
                        }
                      >
                        <Text>
                          {this.getFormattedDate(
                            searchCondition.conditionValue,
                            false,
                          )}
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.separator}>-</Text>

                      <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() =>
                          this.setState({ showEndDatePicker: true })
                        }
                      >
                        <Text>
                          {this.getFormattedDate(
                            searchCondition.conditionValue,
                            true,
                          )}
                        </Text>
                      </TouchableOpacity>

                      <DatePicker
                        date={this.getDateValue(
                          searchCondition.conditionValue,
                          false,
                        )}
                        modal
                        mode='date'
                        open={this.state.showStartDatePicker}
                        onConfirm={date =>
                          this.handleDatePickerChange(i, false, date)
                        }
                        onCancel={() =>
                          this.setState({ showStartDatePicker: false })
                        }
                      />

                      {this.state.showEndDatePicker && (
                        <DatePicker
                          date={this.getDateValue(
                            searchCondition.conditionValue,
                            true,
                          )}
                          modal
                          mode='date'
                          open={this.state.showEndDatePicker}
                          onConfirm={date =>
                            this.handleDatePickerChange(i, true, date)
                          }
                          onCancel={() =>
                            this.setState({ showEndDatePicker: false })
                          }
                        />
                      )}
                    </View>
                  ) : searchCondition.options?.length ? (
                    <Picker
                      style={[
                        styles.picker,
                        searchCondition.conditionKey === '_content' &&
                          styles.contentPicker,
                        searchCondition.conditionKey === '_webchatIds' &&
                          styles.webchatIdsPicker,
                      ]}
                      selectedValue={searchCondition.conditionValue}
                      onValueChange={value => this.handleSelectChange(i, value)}
                    >
                      {searchCondition.options.map((option, j) => (
                        <Picker.Item
                          key={j}
                          label={option.optionLabel}
                          value={option.optionValue}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <TextInput
                      style={[
                        styles.textInput,
                        searchCondition.conditionKey === '_content' &&
                          styles.contentInput,
                        searchCondition.conditionKey === '_webchatIds' &&
                          styles.webchatIdsInput,
                      ]}
                      value={
                        this.state.inputValues[i] !== undefined
                          ? this.state.inputValues[i]
                          : searchCondition.conditionValue
                      }
                      onChangeText={text => this.handleInputChange(i, text)}
                      onBlur={() => this.handleInputBlur(i)}
                      onSubmitEditing={() => this.handleInputSubmit(i)}
                    />
                  )}
                </View>
              </View>
            )
          })}
          <View style={styles.searchButtonContainer}>
            <TouchableOpacity
              style={[
                styles.searchButtonContainer,
                styles.searchButton,
                searchWorkData.searching && styles.searchButtonDisabled,
              ]}
              disabled={searchWorkData.searching}
              onPress={() => this.handleDoSearchPress()}
              activeOpacity={0.8}
              pressRetentionOffset={{
                top: 10,
                left: 10,
                right: 10,
                bottom: 10,
              }}
            >
              <Text
                style={[
                  styles.searchButtonText,
                  searchWorkData.searching && styles.searchButtonDisabled,
                ]}
              >
                {uawMsgs.LBL_SEARCH_DO_BUTTON}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }

  getDateValue(conditionValue, isEnd) {
    const startEnd = string(conditionValue).split('-')
    const timestamp = isEnd ? startEnd[1] : startEnd[0]
    return timestamp ? new Date(int(timestamp)) : new Date()
  }

  getFormattedDate(conditionValue, isEnd) {
    const startEnd = string(conditionValue).split('-')
    const timestamp = isEnd ? startEnd[1] : startEnd[0]
    return timestamp
      ? moment(int(timestamp)).format('YYYY-MM-DD')
      : 'Select date'
  }
}

const styles = StyleSheet.create({
  searchConditionsArea: {
    borderWidth: 1,
    borderColor: '#dcdcd5',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  conditionsContainer: {
    flex: 1,
    padding: 16,
  },
  conditionRow: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'center',
  },
  labelColumn: {
    padding: 1,
    textAlign: 'right',
    width: 120,
    color: '#333333',
    fontSize: 14,
  },
  inputColumn: {
    paddingVertical: 1,
    paddingLeft: 4,
    paddingRight: 1,
    flex: 1,
  },
  textInput: {
    height: 32,
    width: 150,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    paddingVertical: 1,
    paddingHorizontal: 0,
  },
  contentInput: {
    width: 200,
  },
  datePickerContainer: {
    width: 220,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerButton: {
    width: 100,
    height: 32,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  separator: {
    marginHorizontal: 2,
  },
  searchButtonContainer: {
    padding: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  searchButton: {
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    borderRadius: 1,
    backgroundColor: '#f8f8f6',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchButtonText: {
    color: '#888169',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  searchButtonPressed: {
    backgroundColor: '#ffffff',
  },
  searchButtonPressedText: {
    color: '#685947',
  },
  searchButtonActive: {
    backgroundColor: '#ccccc2',
  },
  searchButtonDisabled: {
    opacity: 0.33,
  },
  picker: {
    height: 32,
    width: 150,
    borderWidth: 1,
    borderColor: '#dcdcd5',
  },
  contentPicker: {
    width: 200,
  },
  webchatIdsPicker: {
    width: 150,
  },
  hidden: {
    display: 'none',
  },
})
