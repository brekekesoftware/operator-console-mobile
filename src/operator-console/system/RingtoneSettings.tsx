import { IconOutline } from '@ant-design/icons-react-native'
import { Button, Form, Input } from '@ant-design/react-native'
import React from 'react'

import { Space } from '../common/Space'
import { i18n } from '../i18n'

export class RingtoneSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Form.List name='ringtoneInfos'>
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
                  name={[name, 'ringtoneCaller']}
                  rules={[
                    {
                      required: true,
                      message: i18n.t('missingRingtoneCaller'),
                    },
                  ]}
                >
                  <Input
                    placeholder={i18n.t('ringtoneCaller')}
                    style={{ width: 400 }}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'ringtoneFilepathOrFileurl']}
                  rules={[
                    {
                      required: true,
                      message: i18n.t('missingRingtoneFilepathOrFileurl'),
                    },
                  ]}
                >
                  <Input
                    placeholder={i18n.t('ringtoneFilepathOrFileurl')}
                    style={{ width: 600 }}
                  />
                </Form.Item>
                <IconOutline name='minus-circle' onPress={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<IconOutline name='plus' />}
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
