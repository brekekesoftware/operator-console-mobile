import {
  Checkbox,
  Form,
  Input as AntdInput,
  Radio,
} from '@ant-design/react-native'
import type { StyleProp, TextStyle } from 'react-native'
import { Text } from 'react-native'

import { CallHistory2 } from '../call/CallHistory2'
import { Input } from '../common/Input'
import { InputNumber } from '../common/InputNumber'
import { Select, SelectOption } from '../common/Select'
import { i18n } from '../i18n'
import { RingtoneSettings } from './RingtoneSettings'
import { ShortDialSettings } from './ShortDialSettings'

// const [ systemSettingsUseForm ] = Form.useForm();
const systemSettingsUseForm = null

export const SystemSettingsForm = props => {
  const [systemSettingsUseForm] = Form.useForm()
  // setSystemSettingsUseFormFunction( systemSettingsUseForm );
  const setSystemSettingsUseFormBindedFunction =
    props.setSystemSettingsUseFormBindedFunction
  setSystemSettingsUseFormBindedFunction(systemSettingsUseForm)
  // const ucChatAgentComponentEnabled = props.systemSettingsData.getUcChatAgentComponentEnabled();

  const tStyle: StyleProp<TextStyle> = {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
  }

  const d = props.systemSettingsData.getData()
  const formItemStyle = {
    Item: {
      backgroundColor: 'transparent',
      elevation: 0,
      borderColor: 'transparent',
    },
    Line: {
      backgroundColor: 'transparent',
      elevation: 0,
      borderColor: 'transparent',
    },
  }
  return (
    <Form
      form={systemSettingsUseForm}
      initialValues={d}
      layout='vertical'
      style={{ backgroundColor: 'white' }}
    >
      <Text style={tStyle}>{i18n.t('camponSettings')}</Text>
      <Form.Item
        label={i18n.t('timeoutSeconds')}
        name='camponTimeoutSeconds'
        labelStyle={{ marginBottom: 10 }}
        styles={formItemStyle}
      >
        <InputNumber style={{ width: 100 }} />
      </Form.Item>
      <Text style={tStyle}>{i18n.t('quickBusySettings')}</Text>
      <Form.Item
        name='quickBusyClickToCall'
        valuePropName='checked'
        styles={formItemStyle}
      >
        <Checkbox>{i18n.t('clickToCall')}</Checkbox>
      </Form.Item>
      <Text style={tStyle}>{i18n.t('shortDialSettings')}</Text>
      <ShortDialSettings />
      <Text style={tStyle}>{i18n.t('autoDialSettings')}</Text>
      <Form.Item
        label={i18n.t('maxSaveCount')}
        name='autoDialMaxSaveCount'
        styles={formItemStyle}
        labelStyle={{ marginBottom: 10 }}
      >
        <InputNumber style={{ width: 150 }} />
      </Form.Item>
      <Form.Item
        label={i18n.t('maxDisplayCount')}
        name='autoDialMaxDisplayCount'
        styles={formItemStyle}
        labelStyle={{ marginBottom: 10 }}
      >
        <InputNumber style={{ width: 150 }} />
      </Form.Item>
      <Form.Item
        label={i18n.t('RecentDisplayOrder')}
        name={'autoDialRecentDisplayOrder'}
        styles={formItemStyle}
        labelStyle={{ marginBottom: 10 }}
      >
        <Select
          defaultValue={d.autoDialRecentDisplayOrder}
          onSelect={v =>
            systemSettingsUseForm.setFieldValue(
              'autoDialRecentDisplayOrder',
              v.value,
            )
          }
          data={[
            {
              title: i18n.t('CallOrIncomingCountDesc'),
              value:
                CallHistory2.RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC,
            },
            {
              title: i18n.t('StartDatetimeDesc'),
              value: CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC,
            },
          ]}
        >
          {/* <SelectOption
              value={
                CallHistory2.RECENT_DISPLAY_ORDERS.CALL_OR_INCOMING_COUNT_DESC
              }
            >
              {i18n.t('CallOrIncomingCountDesc')}
            </SelectOption>
            <SelectOption
              value={CallHistory2.RECENT_DISPLAY_ORDERS.ADD_DATETIME_DESC}
            >
              {i18n.t('StartDatetimeDesc')}
            </SelectOption> */}
        </Select>
      </Form.Item>
      <Form.Item
        label={i18n.t('PhonebookName')}
        name={'autoDialPhonebookName'}
        styles={formItemStyle}
        labelStyle={{ marginBottom: 10 }}
      >
        <Input maxLength={300} style={{ width: 240 }} />
      </Form.Item>
      <Text style={tStyle}>{i18n.t('ringtoneSettings')}</Text>
      <RingtoneSettings />
      {/* <Text style={tStyle}>{i18n.t('ucSettings')}</Text> */}
      {/* <Form.Item label={i18n.t('ucUrl')} name='ucUrl' styles={formItemStyle}>
        <Input style={{ width: 500 }} maxLength={300} />
      </Form.Item>
      <Form.Item
        label={i18n.t('ucChatAgentComponent')}
        name='ucChatAgentComponentEnabled'
        styles={formItemStyle}
      >
        <Radio.Group style={{ flexDirection: 'row' }}>
          <Radio value={'0'}>{i18n.t('off')}</Radio>
          <Radio value={'1'}>{i18n.t('on')}</Radio>
        </Radio.Group>
      </Form.Item> */}
      <Text style={tStyle}>{i18n.t('otherSettings')}</Text>
      <Form.Item
        label={i18n.t('phoneTerminal')}
        name='phoneTerminal'
        styles={formItemStyle}
        labelStyle={{ marginBottom: 10 }}
      >
        <Radio.Group
          disabled={props['hasCall']}
          style={{ flexDirection: 'row' }}
        >
          <Radio value={'phoneTerminal_webphone'}>{i18n.t('webphone')}</Radio>
          <Radio value={'phoneTerminal_pal'}>
            {i18n.t('otherPhoneTerminal_pal')}
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={i18n.t('extensionScript')}
        name='extensionScript'
        styles={formItemStyle}
        labelStyle={{ marginBottom: 10 }}
      >
        <AntdInput.TextArea
          rows={30}
          maxLength={1000000}
          style={{
            minHeight: 600,
            minWidth: 800,
            height: 600,
            marginRight: 30,
            borderWidth: 1,
            borderColor: '#e0e0e0',
          }}
        />
      </Form.Item>
    </Form>
  )
}
