import { Button, Flex, Form } from '@ant-design/react-native'
import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { mdiMinusCircleOutline, mdiPlus } from '../../assets/icons'
import { RnIcon } from '../../components/RnIcon'
import { Input } from '../common/Input'
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
                align='center'
                hasFlex
              >
                <Form.Item
                  {...restField}
                  name={[name, 'shortDial']}
                  style={{ flex: 1 }}
                  styles={{
                    Item: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderColor: 'transparent',
                      // flex: 1,
                    },
                    Line: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderColor: 'transparent',
                    },
                  }}
                  rules={[
                    { required: true, message: i18n.t('missingShortDial') },
                  ]}
                >
                  <Flex style={{ flex: 1 }}>
                    <Input placeholder={i18n.t('shortDial')} />
                  </Flex>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'dial']}
                  // style={{ flex: 1 }}
                  styles={{
                    Item: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderColor: 'transparent',
                      flex: 1,
                    },
                    Line: {
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderColor: 'transparent',
                    },
                  }}
                  rules={[{ required: true, message: i18n.t('missingDial') }]}
                >
                  <Input placeholder={i18n.t('dial')} />
                </Form.Item>
                <TouchableWithoutFeedback onPress={() => remove(name)}>
                  <RnIcon path={mdiMinusCircleOutline} size={25} />
                </TouchableWithoutFeedback>
              </Space>
            ))}
            <Form.Item
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
            >
              <Button onPress={() => add()}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <RnIcon path={mdiPlus} size={20} />
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
