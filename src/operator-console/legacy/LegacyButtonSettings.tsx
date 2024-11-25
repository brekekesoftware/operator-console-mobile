import { Form, Input } from '@ant-design/react-native'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Colorpicker } from 'antd-colorpicker'
import { debounce } from 'lodash'
import { Component, createRef } from 'react'
import { Text } from 'react-native'

import { InputNumber } from '../common/InputNumber'
import { Select, SelectOption } from '../common/Select'
import { i18n } from '../i18n'
import { LegacyButtonMap } from '../OperatorConsole'
import { LegacyKeypadButton } from './LegacyKeypadButton'
import { LegacyLineButton } from './LegacyLineButton'
import { LegacyOneTouchDialButton } from './LegacyOneTouchDialButton'
import { LegacyParkCallButton } from './LegacyParkCallButton'
import { LegacyQuickCallButton } from './LegacyQuickCallButton'

type Props = {
  widget: any
  widgetIndex: number
  onChange: () => void
}

type State = {
  widget: any
}

export class LegacyButtonSettings extends Component<Props, State> {
  formRef
  iconSelect
  onChangeDebounced
  constructor(props) {
    super(props)
    this.formRef = createRef()
    this.state = {
      widget: window.structuredClone(this.props.widget),
    }

    const operatorConsoleAsParent = props.operatorConsoleAsParent
    const defaultButtonFileInfos =
      operatorConsoleAsParent.getDefaultButtonImageFileInfos()
    let fileInfos = defaultButtonFileInfos.getFileInfos()
    if (!fileInfos) {
      fileInfos = new Array()
    }
    let key = -1
    this.iconSelect = (
      <Select
        showSearch
        allowClear
        filterOption={(input, option) =>
          (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
        }
      >
        <SelectOption value={''}></SelectOption>
        {[
          ...Object.values(fas),
          ...Object.values(far),
          ...Object.values(fab),
        ].map(icon => {
          const value = icon.prefix + ' fa-' + icon.iconName
          key++
          return (
            <SelectOption key={key} value={value}>
              <FontAwesomeIcon fixedWidth icon={icon} />
              <Text style={{ marginLeft: 4 }}>{icon.iconName}</Text>
            </SelectOption>
          )
        })}
        {fileInfos.map((fileInfo, i) => {
          key++
          const fileName = fileInfo['name']
          const fileUrl = fileInfo['url']
          const value = 'PATH:' + fileUrl
          return (
            <SelectOption key={key} value={value}>
              <div style={{ display: 'table', verticalAlign: 'middle' }}>
                <img
                  src={fileUrl}
                  width={32}
                  height={32}
                  style={{ verticalAlign: 'middle' }}
                />
                <div
                  style={{
                    display: 'table-cell',
                    paddingLeft: 4,
                    verticalAlign: 'middle',
                  }}
                >
                  {fileName}
                </div>
              </div>
            </SelectOption>
          )
        })}
      </Select>
    )
    this.onChangeDebounced = debounce(props.onChange, 250)
  }

  componentDidUpdate(prevProps) {
    if (this.props.widgetIndex != prevProps.widgetIndex) {
      const widget = window.structuredClone(this.props.widget)
      this.setState({ widget }, () => {
        this.formRef.current.resetFields()
      })
    }
    if (this.props.onChange != prevProps.onChange) {
      this.onChangeDebounced = debounce(this.props.onChange, 250)
    }
  }

  onSubtypeSelected = subtype => {
    this.setState({
      widget: {
        ...this.state.widget,
        subtype,
        label: i18n.t(`legacy_button_label.${subtype}`),
      },
    })
  }

  render() {
    return (
      <Form
        ref={this.formRef}
        layout='vertical'
        initialValues={this.state.widget}
        onValuesChange={this.onChangeDebounced}
      >
        <Form.Item label={i18n.t('function')}>
          <Form.Item name='subtype' noStyle>
            <Select style={{ width: '100%' }} onSelect={this.onSubtypeSelected}>
              {Object.keys(LegacyButtonMap).map((subtype, i) => (
                <SelectOption
                  key={i}
                  value={subtype}
                  title={i18n.t(`legacy_button_description.${subtype}`)}
                >
                  {i18n.t(`legacy_button_label.${subtype}`)}
                </SelectOption>
              ))}
            </Select>
          </Form.Item>
          <p style={{ marginTop: 12, marginBottom: 0 }}>
            {i18n.t(`legacy_button_description.${this.state.widget.subtype}`)}
          </p>
        </Form.Item>

        <Form.Item label={i18n.t('icon')} name='icon'>
          {this.iconSelect}
        </Form.Item>
        {this.state.widget.subtype !== LegacyKeypadButton.name && (
          <Form.Item label={i18n.t('label')} name='label'>
            <Input
              placeholder={i18n.t(
                `legacy_button_label.${this.state.widget.subtype}`,
              )}
              allowClear
            />
          </Form.Item>
        )}
        {this.state.widget.subtype === LegacyKeypadButton.name && (
          <Form.Item label={i18n.t('symbol')} name='symbol'>
            <Input allowClear />
          </Form.Item>
        )}
        {this.state.widget.subtype === LegacyLineButton.name && (
          <Form.Item label={i18n.t('line')} name='line'>
            <Input allowClear />
          </Form.Item>
        )}
        {this.state.widget.subtype === LegacyParkCallButton.name && (
          <Form.Item label={i18n.t('number')} name='number'>
            <Input allowClear />
          </Form.Item>
        )}
        {this.state.widget.subtype === LegacyQuickCallButton.name && (
          <>
            <Form.Item label='0' name='keypad_zero'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='1' name='keypad_one'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='2' name='keypad_two'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='3' name='keypad_three'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='4' name='keypad_four'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='5' name='keypad_five'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='6' name='keypad_six'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='7' name='keypad_seven'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='8' name='keypad_eight'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='9' name='keypad_nine'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='*' name='keypad_asterisk'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label='#' name='keypad_sharp'>
              <Input allowClear />
            </Form.Item>
          </>
        )}
        {this.state.widget.subtype === LegacyOneTouchDialButton.name && (
          <>
            <Form.Item label={i18n.t('number')} name='number'>
              <Input allowClear />
            </Form.Item>
            <Form.Item label={i18n.t('mode')} name='onetouchdialMode'>
              <Select
                // onChange={(value) => {
                // }}
                style={{ width: '100%' }}
                // placeholder="Please select a option"
                defaultValue={'callOnly'}
              >
                <SelectOption value='callOnly'>
                  {i18n.t('callOnly')}
                </SelectOption>
                <SelectOption value='attendedTransferOrCall'>
                  {i18n.t('attendedTransferOrCall')}
                </SelectOption>
                <SelectOption value='blindTransferOrCall'>
                  {i18n.t('blindTransferOrCall')}
                </SelectOption>
                <SelectOption value='attendedTransferOnly'>
                  {i18n.t('attendedTransferOnly')}
                </SelectOption>
                <SelectOption value='blindTransferOnly'>
                  {i18n.t('blindTransferOnly')}
                </SelectOption>
              </Select>
            </Form.Item>
          </>
        )}
        <Form.Item
          label={i18n.t('fgColor')}
          name={'buttonFgColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Colorpicker format='rgb' />
        </Form.Item>
        <Form.Item
          label={i18n.t('bgColor')}
          name={'buttonBgColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Colorpicker format='rgb' />
        </Form.Item>
        <Form.Item
          label={i18n.t('outerBorderColor')}
          name={'buttonOuterBorderColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Colorpicker format='rgb' />
        </Form.Item>
        <Form.Item
          label={i18n.t('outerBorderRadius')}
          name='buttonOuterBorderRadius'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <InputNumber min='0' />
        </Form.Item>
        <Form.Item
          label={i18n.t('outerBorderThickness')}
          name='buttonOuterBorderThickness'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <InputNumber min='1' />
        </Form.Item>
      </Form>
    )
  }
}
