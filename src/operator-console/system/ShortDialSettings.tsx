import {
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons-react-native'
import { Button, Form, Input } from '@ant-design/react-native'
import React from 'react'

import { Space } from '../common/Space'
import { i18n } from '../i18n'

export class ShortDialSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Form.List name='shortDials'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align='baseline'
              >
                <Form.Item
                  {...restField}
                  name={[name, 'shortDial']}
                  rules={[
                    { required: true, message: i18n.t('missingShortDial') },
                  ]}
                >
                  <Input placeholder={i18n.t('shortDial')} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'dial']}
                  rules={[{ required: true, message: i18n.t('missingDial') }]}
                >
                  <Input placeholder={i18n.t('dial')} />
                </Form.Item>
                <MinusCircleOutlined onPress={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onPress={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {i18n.t('addField')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    )
  }
}
