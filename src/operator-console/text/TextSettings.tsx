import { Form, Input } from '@ant-design/react-native'
import { cloneDeep, debounce } from 'lodash'
import { Component, createRef } from 'react'

import { ColorPicker } from '../common/ColorPicker'
import { InputNumber } from '../common/InputNumber'
import { i18n } from '../i18n'

type Props = {
  widget: any
  widgetIndex: number
  onChange: () => void
}

type State = {
  widget: any
}

export class TextSettings extends Component<Props, State> {
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
        <Form.Item label={i18n.t('text')} name='text'>
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          label={i18n.t('fgColor')}
          name={'textFgColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <ColorPicker />
        </Form.Item>
        <Form.Item
          label={i18n.t('bgColor')}
          name={'textBgColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <ColorPicker />
        </Form.Item>
        <Form.Item
          label={i18n.t('borderRadius')}
          name='textBorderRadius'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    )
  }
}
