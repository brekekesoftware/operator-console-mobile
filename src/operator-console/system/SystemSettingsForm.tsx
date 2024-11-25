import { Checkbox, Form, Input, Radio } from '@ant-design/react-native'

import { CallHistory2 } from '../call/CallHistory2'
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
  return (
    <Form
      form={systemSettingsUseForm}
      initialValues={props.systemSettingsData.getData()}
      layout='vertical'
    >
      <section>
        <h1>{i18n.t('camponSettings')}</h1>
        <Form.Item label={i18n.t('timeoutSeconds')} name='camponTimeoutSeconds'>
          <InputNumber style={{ width: 100 }} />
        </Form.Item>
        <h1>{i18n.t('quickBusySettings')}</h1>
        <Form.Item name='quickBusyClickToCall' valuePropName='checked'>
          <Checkbox>{i18n.t('clickToCall')}</Checkbox>
        </Form.Item>
        <h1>{i18n.t('shortDialSettings')}</h1>
        <ShortDialSettings />
        <h1>{i18n.t('autoDialSettings')}</h1>
        <Form.Item label={i18n.t('maxSaveCount')} name='autoDialMaxSaveCount'>
          <InputNumber style={{ width: 100 }} />
        </Form.Item>
        <Form.Item
          label={i18n.t('maxDisplayCount')}
          name='autoDialMaxDisplayCount'
        >
          <InputNumber style={{ width: 100 }} />
        </Form.Item>
        <Form.Item
          label={i18n.t('RecentDisplayOrder')}
          name={'autoDialRecentDisplayOrder'}
        >
          <Select>
            <SelectOption
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
            </SelectOption>
          </Select>
        </Form.Item>
        <Form.Item
          label={i18n.t('PhonebookName')}
          name={'autoDialPhonebookName'}
        >
          <Input maxLength={300} style={{ width: 240 }} />
        </Form.Item>
        <h1>{i18n.t('ringtoneSettings')}</h1>
        <RingtoneSettings />
        <h1>{i18n.t('ucSettings')}</h1>
        <Form.Item label={i18n.t('ucUrl')} name='ucUrl'>
          <Input style={{ width: 500 }} maxLength={300} />
        </Form.Item>
        <Form.Item
          label={i18n.t('ucChatAgentComponent')}
          name='ucChatAgentComponentEnabled'
        >
          {/* <Radio.Group onChange={props.onChangeUcChatAgentComponentEnabledFunction}>*/}
          <Radio.Group>
            <Radio value={0}>{i18n.t('off')}</Radio>
            <Radio value={1}>{i18n.t('on')}</Radio>
          </Radio.Group>
        </Form.Item>
        <h1>{i18n.t('otherSettings')}</h1>
        <Form.Item label={i18n.t('phoneTerminal')} name='phoneTerminal'>
          <Radio.Group disabled={props['hasCall']}>
            <Radio value={'phoneTerminal_webphone'}>{i18n.t('webphone')}</Radio>
            <Radio value={'phoneTerminal_pal'}>
              {i18n.t('otherPhoneTerminal_pal')}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={i18n.t('extensionScript')} name='extensionScript'>
          <Input.TextArea
            rows={30}
            maxLength={1000000}
            style={{ minHeight: 600, minWidth: 800, marginRight: 30 }}
          />
        </Form.Item>
      </section>
    </Form>
  )
}
