import { Form, Input } from '@ant-design/react-native'
import { cloneDeep, debounce } from 'lodash'
import { Component, createRef } from 'react'

import { ColorPicker } from '../common/ColorPicker'
import { i18n } from '../i18n'

type Props = {
  widget: any
  widgetIndex: number
  onChange: () => void
}

type State = {
  widget: any
}

export class LegacyExtensionStatusSettings extends Component<Props, State> {
  formRef
  onChangeDebounced
  constructor(props) {
    super(props)
    this.formRef = createRef()
    this.state = {
      widget: cloneDeep(this.props.widget),
    }
    this.onChangeDebounced = debounce(props.onChange, 250)
  }

  componentDidUpdate(prevProps) {
    if (this.props.widgetIndex != prevProps.widgetIndex) {
      const widget = cloneDeep(this.props.widget)
      this.setState({ widget }, () => {
        this.formRef.current.resetFields()
      })
    }
    if (this.props.onChange != prevProps.onChange) {
      this.onChangeDebounced = debounce(this.props.onChange, 250)
    }
  }

  render() {
    return (
      <Form
        ref={this.formRef}
        layout='vertical'
        initialValues={this.state.widget}
        onValuesChange={this.onChangeDebounced}
      >
        <Form.Item label={i18n.t('extension')} name='extension'>
          <Input />
        </Form.Item>
        <Form.Item
          label={i18n.t('fgColor')}
          name={'exStatusFgColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <ColorPicker />
        </Form.Item>
      </Form>
    )
  }
}
