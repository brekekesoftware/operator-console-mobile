import { Form, Input } from '@ant-design/react-native'
import type { FormInstance } from '@ant-design/react-native/lib/form/Form'
import { useForm } from '@ant-design/react-native/lib/form/Form'
import React, { createRef } from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Image, StyleSheet, Text, View } from 'react-native'

import Logo from '../logo.png'

import { RnAsyncStorage } from '../../components/Rn'
import { Button } from '../common/Button'
import { i18n } from '../i18n'
import type { LoginParams } from '../octypes'
import type { BrekekeOperatorConsole } from '../OperatorConsole'

type Props = {
  operatorConsoleAsParent: BrekekeOperatorConsole
  initialValues: Promise<LoginParams>
  form: FormInstance
}
type State = {
  isSigningin: boolean
  message: string
  initialValues?: LoginParams
}

const withMyHook = Component =>
  function WrappedComponent(props) {
    const [form] = useForm()
    return <Component {...props} form={form} />
  }

class LoginC extends React.Component<Props, State> {
  _OperatorConsoleAsParent
  _LoginMessageElementRef
  refForm

  constructor(props) {
    super(props)
    this._OperatorConsoleAsParent = props.operatorConsoleAsParent
    this.refForm = createRef<any>()
    this.state = { isSigningin: false, message: '' }
  }

  _setMessage(message) {
    this.setState({ message })
  }

  componentDidMount(): void {
    this.props.initialValues.then(v => {
      this.setState({ initialValues: v })
      this.props.form.setFieldsValue(v)
    })
  }

  _hideMessage() {
    this.setState({ message: '' })
  }

  _onInitPalWrapperSuccess(loginParams) {
    const palWrapper = this._OperatorConsoleAsParent.getLoginPalWrapper()
    const getPalOptions = {
      tenant: loginParams.tenant,
      login_user: loginParams.username,
      login_password: loginParams.password,
      user: '*',
      line: '*',
      callrecording: 'self',
      voicemail: 'self',
      park: '*',
      status: true,
      registered: 'self',
      secure_login_password: false,
      ctype: 2,
    }
    const pal = palWrapper.getPal(getPalOptions)
    pal.debugLevel = 2

    const this_ = this
    pal.onClose = function () {
      console.log('Pal closed.')
      palWrapper.deinitPalWrapper()
      this_.setState({ isSigningin: false })
    }
    pal.onError = function (err) {
      console.warn('Pal error occurred.', err)
      pal.close()
      this_._setMessage(i18n.t('failedToLogin'))
    }
    // !fixit pal bug
    pal.login(
      (res, obj) => {
        const tenant = loginParams.tenant
        const user = loginParams.username
        const getExtensionsPropertiesOptions = {
          tenant,
          extension: user,
          property_names: ['admin', 'language'],
        }
        pal.getExtensionProperties(
          getExtensionsPropertiesOptions,
          (res, obj) => {
            const isAdmin = res[0].toLowerCase() === 'true'
            const language = res[1]
            this_.setState({ isSigningin: false })
            this_._OperatorConsoleAsParent.onLoggedinByLogin(
              pal,
              palWrapper.getPbxHost(),
              palWrapper.getPbxPort(),
              tenant,
              user,
              loginParams.password,
              isAdmin,
              language,
            )
          },
          error => {
            console.warn('Faild to getExtensionProperties. error=', error)
            pal.close()
            this_._setMessage(i18n.t('failedToLogin'))
          },
        )
      },
      ev => {
        console.warn('Faild to login. eventArg=', ev)
        pal.close()
        this_._setMessage(i18n.t('failedToLogin'))
      },
    )
  }

  _login = () => {
    const f = this.props.form
    f.submit()
    const fErrs = f.getFieldsError()
    const hasErr = fErrs.some(fe => fe.errors.length > 0)
    if (hasErr) {
      return
    }
    const params = f.getFieldsValue()

    // this._deinitAphone();
    this.setState({ isSigningin: true }, () => {
      const lastLoginAccount = {
        hostname: params.hostname,
        port: params.port,
        tenant: params.tenant,
        username: params.username,
        password: params.password,
        pbxDirectoryName: params.pbxDirectoryName,
      }
      this._OperatorConsoleAsParent.setLastLoginAccount(lastLoginAccount)
      RnAsyncStorage.setItem(
        'lastLoginAccount',
        JSON.stringify(lastLoginAccount),
      )

      const onInitPalRestApiSuccessFunction = () => {
        const palWrapper = this._OperatorConsoleAsParent.getLoginPalWrapper()
        palWrapper.deinitPalWrapper()
        const this_ = this
        const initPalWrapperOptions = {
          pbxHost: params.hostname,
          pbxPort: params.port,
          secure_login_password: false,
          pbxDirectoryName: params.pbxDirectoryName,
        }
        palWrapper.initPalWrapper(initPalWrapperOptions)
        this_._onInitPalWrapperSuccess(params)
      }
      const onInitPalRestApiFailFunction = err => {
        this.setState({ isSigningin: false })
        this._setMessage(i18n.t('Failed_to_init_pal_rest_api'))
      }

      // PAL rest api
      const initPalRestApiOptions = {
        // hostname: params.hostname,
        // port: params.port,
        tenant: params.tenant,
        username: params.username,
        password: params.password,
        port: params.port,
        hostname: params.hostname,
        pbxDirectoryName: params.pbxDirectoryName,
        onInitSuccessFunction: onInitPalRestApiSuccessFunction,
        onInitFailFunction: onInitPalRestApiFailFunction,
      }
      this._OperatorConsoleAsParent
        .getPalRestApi()
        .initPalRestApi(initPalRestApiOptions)
    })
  } // ~login

  render() {
    return (
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -4,
            flexDirection: 'row',
          }}
        >
          <Image width={158} height={39} source={Logo as ImageSourcePropType} />
          <View
            style={{
              backgroundColor: '#4bc5de',
              borderRadius: 3,
              padding: 4,
              position: 'relative',
              top: 3,
              marginLeft: -24,
              marginTop: 2,
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}
            >
              Operator Console
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            width: 352,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#e0e0e0',
            paddingTop: 30,
            paddingRight: 20,
            paddingBottom: 7,
            paddingLeft: 20,
            backgroundColor: '#ffffff',
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              marginBottom: 20,
              textAlign: 'left',
              textTransform: 'capitalize',
              fontSize: 24,
              fontWeight: 'bold',
              fontStyle: 'normal',
              // lineHeight: 1.23,
              letterSpacing: 0.3,
              color: '#212121',
            }}
          >
            Sign In
          </Text>
          {!!this.state.message && (
            <View
              style={{
                borderLeftWidth: 2,
                borderColor: 'rgb(112, 180, 197)',
                borderStyle: 'solid',
                marginTop: 2,
                marginBottom: 18,
                borderRadius: 4,
                paddingTop: 15,
                paddingRight: 26,
                paddingBottom: 15,
                paddingLeft: 32,
                // elevation: 0.5
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  // lineHeight: 1.62,
                  letterSpacing: 0.3,
                  color: '#000',
                }}
              >
                {this.state.message}
              </Text>
            </View>
          )}
          <Form
            name='login'
            initialValues={this.state.initialValues}
            ref={r => (this.refForm = r)}
            form={this.props.form}
            styles={{
              Body: {
                backgroundColor: 'transparent',
                elevation: 0,
                borderColor: 'transparent',
              },
            }}
            style={{
              backgroundColor: 'transparent',
              elevation: 0,
              borderColor: 'transparent',
            }}
          >
            <Form.Item
              name='hostname'
              style={{ elevation: 0 }}
              rules={[
                {
                  required: true,
                  message: i18n.t('hostname_is_required'),
                },
              ]}
              styles={{
                Line: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
              }}
            >
              <Input style={styles.input} placeholder={i18n.t('hostname')} />
            </Form.Item>
            <Form.Item
              name='port'
              rules={[
                {
                  required: true,
                  message: i18n.t('port_is_required'),
                },
              ]}
              styles={{
                Line: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
              }}
            >
              <Input style={styles.input} placeholder={i18n.t('port')} />
            </Form.Item>
            <Form.Item
              name='tenant'
              rules={[
                {
                  required: true,
                  message: i18n.t('tenant_is_required'),
                },
              ]}
              styles={{
                Line: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
              }}
            >
              <Input style={styles.input} placeholder={i18n.t('tenant')} />
            </Form.Item>
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: i18n.t('username_is_required'),
                },
              ]}
              styles={{
                Line: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
              }}
            >
              <Input style={styles.input} placeholder={i18n.t('username')} />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: i18n.t('password_is_required'),
                },
              ]}
              styles={{
                Line: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
              }}
            >
              <Input
                style={styles.input}
                type='password'
                placeholder={i18n.t('password')}
              />
            </Form.Item>
            <Form.Item
              name='pbxDirectoryName'
              rules={[
                {
                  required: true,
                  message: i18n.t('username_is_required'),
                },
              ]}
              style={{ display: 'none' }}
            >
              <Input
                style={styles.input}
                placeholder={i18n.t('username')}
                // type='hidden'
              />
            </Form.Item>
            <Form.Item
              styles={{
                Line: {
                  backgroundColor: 'transparent',
                  elevation: 0,
                  borderColor: 'transparent',
                },
              }}
            >
              <Button
                type='success'
                disabled={this.state.isSigningin}
                onPress={this._login}
                style={{ height: 40, borderRadius: 5 }}
              >
                <Text style={styles.button}>{i18n.t('signin')}</Text>
              </Button>
            </Form.Item>
          </Form>
        </View>
      </View>
    )
  }
}

export const Login = withMyHook(LoginC)

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f5f5f5',
    height: 40,
    borderRadius: 5,
  },
  button: {
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
    color: 'white',
  },
})
