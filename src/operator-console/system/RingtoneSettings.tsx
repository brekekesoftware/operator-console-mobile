import { IconOutline } from '@ant-design/icons-react-native'
import { Button, Flex, Form } from '@ant-design/react-native'
import React from 'react'
import { Text, View } from 'react-native'

import { Input } from '../common/Input'
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
                style={{
                  display: 'flex',
                  marginBottom: 8,
                  justifyContent: 'center',
                }}
                align='center'
                hasFlex
              >
                <Form.Item
                  {...restField}
                  styles={{
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
                  }}
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
                    style={{ flex: 1 }}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'ringtoneFilepathOrFileurl']}
                  styles={{
                    Line: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderColor: 'transparent',
                    },
                    Item: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderColor: 'transparent',
                    },
                  }}
                  rules={[
                    {
                      required: true,
                      message: i18n.t('missingRingtoneFilepathOrFileurl'),
                    },
                  ]}
                >
                  <Input
                    placeholder={i18n.t('ringtoneFilepathOrFileurl')}
                    style={{ flex: 1 }}
                  />
                </Form.Item>
                <View>
                  <IconOutline
                    name='minus-circle'
                    size={25}
                    onPress={() => remove(name)}
                  />
                </View>
              </Space>
            ))}
            <Form.Item
              styles={{
                Line: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
                Item: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
              }}
            >
              <Button
                onPress={() => add()}
                // icon={}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <IconOutline name='plus' size={20} />
                  <Text style={{ fontSize: 16 }}> {i18n.t('addField')}</Text>
                </View>
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    )
  }
}
