import { Form } from '@ant-design/react-native'
import { Colorpicker } from 'antd-colorpicker'
import { debounce } from 'lodash'
import { Component, createRef } from 'react'

import { Divider } from '../common/Divider'
import { InputNumber } from '../common/InputNumber'
import { i18n } from '../i18n'

type Props = {
  widget: any
  getNoteNames: () => Promise<any[]>
  widgetIndex: number
  onChange: () => void
}

type State = {
  nameOptions: any
  widget: any
}

export class NoteSettings extends Component<Props, State> {
  formRef
  onChangeDebounced
  constructor(props) {
    super(props)
    this.formRef = createRef()
    this.state = {
      widget: window.structuredClone(this.props.widget),
      nameOptions: [],
    }
    this.onChangeDebounced = debounce(props.onChange, 250)
  }

  componentDidMount() {
    if (this.props.getNoteNames) {
      this.props.getNoteNames().then(names => {
        this.setState({ nameOptions: names.map(value => ({ value })) })
      })
    }
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

  render() {
    return (
      <Form
        ref={this.formRef}
        layout='vertical'
        initialValues={this.state.widget}
        onValuesChange={this.onChangeDebounced}
      >
        <Form.Item
          label={i18n.t('borderRadius')}
          name='noteBorderRadius'
          rules={[
            {
              required: false,
            },
          ]}
        >
          <InputNumber min='0' />
        </Form.Item>
        <Divider>{i18n.t('Note_name_settings')}</Divider>
        <Form.Item label={i18n.t('Name')} name='noteName'>
          <AutoComplete options={this.state.nameOptions} />
        </Form.Item>
        <Form.Item
          label={i18n.t('fgColor')}
          name={'noteNameFgColor'}
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
          name={'noteNameBgColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Colorpicker format='rgb' />
        </Form.Item>
        <Divider>{i18n.t('noteText_settings')}</Divider>
        <Form.Item
          label={i18n.t('fgColor')}
          name={'noteTextFgColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Colorpicker format='rgb' />
        </Form.Item>
        <Form.Item
          label={i18n.t('startBgColor')}
          name={'noteBgStartColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Colorpicker format='rgb' />
        </Form.Item>
        <Form.Item
          label={i18n.t('endBgColor')}
          name={'noteBgEndColor'}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Colorpicker format='rgb' />
        </Form.Item>
      </Form>
    )
  }
}
