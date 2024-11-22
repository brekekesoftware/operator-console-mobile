import MoreOutlined from '@ant-design/icons/MoreOutlined'
import { ActivityIndicator } from '@ant-design/react-native'
import { Button, Dropdown, Form, Input, Modal } from 'antd'
import Notification from 'antd/lib/notification'
import { useRef, useState } from 'react'

import { Popconfirm } from '../common/Popconfirm'
import { ScreenData } from '../data/ScreenData'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { BrekekeOperatorConsole } from '../OperatorConsole'
import {
  OpenLayoutModalForDropDownMenu,
  refreshNoteNamesContent,
} from './OpenLayoutModalForDropDownMenu'

const REGEX = /^[0-9a-zA-Z\-\_\ ]*$/

export const DropDownMenu = ({ operatorConsole }) => {
  let loginLabel = operatorConsole.state.loginUser.pbxTenant
    ? operatorConsole.state.loginUser.pbxTenant + ' / '
    : ''
  loginLabel += operatorConsole.state.loginUser.pbxUsername
  // const [newLayoutModalOpen, setNewLayoutModalOpen] = useState(false);
  const showNewLayoutModalFunc = () => {
    operatorConsole.setState({ newLayoutModalOpen: true })
  }

  const [openLayoutModalOpen, setOpenLayoutModalOpen] = useState(false)
  const [noteNamesContent, setNoteNamesContent] = useState(
    <ActivityIndicator />,
  )
  const [isLoading, setIsLoading] = useState(false)
  const showOpenLayoutModalFunc = () => {
    setOpenLayoutModalOpen(true)
    refreshNoteNamesContent(
      operatorConsole,
      setNoteNamesContent,
      setOpenLayoutModalOpen,
      setIsLoading,
    )
  }

  let items

  let signOutStyle
  let signOutOnClick
  const hasCall =
    operatorConsole.getPhoneClient().getCallInfos().getCallInfoCount() !== 0
  if (hasCall) {
    signOutStyle = { color: '#DDDDDD', cursor: 'default' }
    signOutOnClick = undefined
  } else {
    signOutStyle = undefined
    signOutOnClick = operatorConsole.logout
  }

  if (operatorConsole.getIsAdmin() === true) {
    items = [
      {
        key: '100',
        label: loginLabel,
        children: [
          {
            key: '101',
            label: (
              <a style={signOutStyle} onClick={signOutOnClick}>
                {i18n.t('signout')}
              </a>
            ),
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        key: '1',
        label: (
          <a onClick={operatorConsole.startEditingScreen_ver2}>
            {i18n.t('editLayout')}
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a onClick={operatorConsole.startShowScreen_ver2}>
            {i18n.t('show_screen')}
          </a>
        ),
      },
      {
        key: '3',
        label: <a onClick={showNewLayoutModalFunc}>{i18n.t('newLayout')}</a>,
      },
      {
        key: '4',
        label: <a onClick={showOpenLayoutModalFunc}>{i18n.t('openLayout')}</a>,
      },
      ,
      {
        key: '5',
        label: (
          <a onClick={operatorConsole.startSettingsScreen}>
            {i18n.t('settings_screen')}
          </a>
        ),
      },
      {
        key: '6',
        label: (
          <a onClick={() => operatorConsole.openAboutOCModalByState()}>
            {i18n.t('About_OperatorConsole')}
          </a>
        ),
      },
    ]
  } else {
    // user menu(not admin)
    items = [
      {
        key: '100',
        label: loginLabel,
        children: [
          {
            key: '101',
            label: (
              <a onClick={showOpenLayoutModalFunc}>{i18n.t('openLayout')}</a>
            ),
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        key: '1',
        label: <a onClick={showOpenLayoutModalFunc}>{i18n.t('openLayout')}</a>,
      },
      {
        key: '2',
        label: (
          <a onClick={operatorConsole.startSettingsScreen}>
            {i18n.t('settings_screen')}
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a onClick={() => operatorConsole.openAboutOCModalByState()}>
            {i18n.t('About_OperatorConsole')}
          </a>
        ),
      },
    ]
  }
  const displayLoadingStyle = isLoading ? 'block' : 'none'
  const spinScreen = useRef(null)
  if (spinScreen.current) {
    spinScreen.current.style.display = displayLoadingStyle
  }

  return (
    <>
      <NewLayoutDialog operatorConsole={operatorConsole} />
      <OpenLayoutModalForDropDownMenu
        noteNamesContent={noteNamesContent}
        operatorConsole={operatorConsole}
        useStateOpen={openLayoutModalOpen}
        useStateSetOpen={setOpenLayoutModalOpen}
      />
      <div ref={spinScreen} className='spinScreen'>
        <div>
          <ActivityIndicator />
        </div>
      </div>
      <Dropdown
        menu={{
          items,
        }}
        trigger='click'
      >
        <Button
          style={{ position: 'absolute', top: 4, right: 4, zIndex: 15 }}
          shape='circle'
          icon={<MoreOutlined />}
        ></Button>
      </Dropdown>
    </>
  )
}
const NewLayoutDialog = ({ operatorConsole }) => {
  // const [loading, setLoading] = useState(false);
  const [newLayoutUseForm] = Form.useForm()
  const [newLayoutConfirmOpen, setNewLayoutConfirmOpen] = useState(false)
  const [newLayoutName, setNewLayoutName] = useState('')

  const handleOk = () => {
    newLayoutUseForm.validateFields().then(values => {
      let layoutName = values.layoutName
      setNewLayoutName(layoutName)
      layoutName = layoutName.trim()
      if (layoutName.length === 0) {
        Notification.error({
          key: 'validation',
          message: i18n.t('OnlySpacesAreNotAllowed'),
          duration: 15,
        })
        return
      }

      const bMatch = REGEX.test(layoutName)
      if (!bMatch) {
        Notification.error({
          key: 'validation',
          message: i18n.t('newLayoutValidationError'),
          duration: 15,
        })
        return
      }

      // exists already?
      const layoutNoteName = BrekekeOperatorConsole.getOCNoteName(layoutName)
      const getNoteNamesOptions = {
        methodName: 'getNoteNames',
        methodParams: JSON.stringify({
          tenant: operatorConsole.getLoggedinTenant(),
        }),
        onSuccessFunction: noteNames => {
          let bNoteExists = true
          if (!noteNames || noteNames.length === 0) {
            bNoteExists = false
          } else {
            const sFind = noteNames.find(itm => itm === layoutNoteName)
            if (!sFind) {
              bNoteExists = false
            }
          }

          if (bNoteExists) {
            setNewLayoutConfirmOpen(true)
          } else {
            const systemSettingsData =
              BrekekeOperatorConsole.getStaticInstance().getDefaultSystemSettingsData()
            const systemSettingsDataData = systemSettingsData.getData()
            const oScreen_ver2 = new ScreenData().getDataAsObject()

            const layoutsAndSettingsData = {
              version: BrekekeOperatorConsole.getAppDataVersion(),
              screens: BrekekeOperatorConsole.getEmptyScreens(),
              systemSettings: systemSettingsDataData,
              screen_ver2: oScreen_ver2,
            }

            const noteContent = JSON.stringify(layoutsAndSettingsData)
            const noteName = BrekekeOperatorConsole.getOCNoteName(layoutName)

            const setNoteOptions = {
              methodName: 'setNote',
              methodParams: JSON.stringify({
                tenant: operatorConsole.getLoggedinTenant(),
                name: noteName,
                description: '',
                useraccess:
                  BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
                note: noteContent,
              }),
              onSuccessFunction: res => {
                operatorConsole.setOCNote(
                  layoutName,
                  layoutsAndSettingsData,
                  () => {
                    Notification.success({
                      message: i18n.t('saved_data_to_pbx_successfully'),
                    })
                    operatorConsole.setState({ newLayoutModalOpen: false })
                  },
                  e => {
                    // !testit
                    if (Array.isArray(e)) {
                      for (let i = 0; i < e.length; i++) {
                        const err = e[i]
                        console.error(
                          'setOCNote failed. errors[' + i + ']=',
                          err,
                        )
                      }
                    } else {
                      console.error('setOCNote failed. error=', e)
                    }
                    Notification.error({
                      message:
                        i18n.t('failed_to_save_data_to_pbx') + '\r\n' + e,
                      duration: 0,
                    })
                  },
                )
              },
              onFailFunction: errorOrResponse => {
                // !testit
                if (Array.isArray(errorOrResponse)) {
                  for (let i = 0; i < errorOrResponse.length; i++) {
                    const err = errorOrResponse[i]
                    console.error('setOCNote failed. errors[' + i + ']=', err)
                  }
                } else {
                  console.error('setOCNote failed. error=', errorOrResponse)
                }
                Notification.error({
                  message:
                    i18n.t('failed_to_save_data_to_pbx') +
                    '\r\n' +
                    errorOrResponse,
                  duration: 0,
                })
                operatorConsole.setState({ newLayoutModalOpen: false })
              },
            }
            operatorConsole.getPalRestApi().callPalRestApiMethod(setNoteOptions)
          }
        },
        onFailFunction: errOrResponse => {
          // !testit
          OCUtil.logErrorWithNotification(
            'Failed to getNoteNames from  PBX.',
            i18n.t('failed_to_load_data_from_pbx'),
            errOrResponse,
          )
        },
      }
      operatorConsole.getPalRestApi().callPalRestApiMethod(getNoteNamesOptions)
    })
  }
  const handleCancel = () => {
    operatorConsole.setState({ newLayoutModalOpen: false })
  }

  const confirmNewLayout = () => {
    const layoutName = newLayoutName

    const systemSettingsData =
      BrekekeOperatorConsole.getStaticInstance().getDefaultSystemSettingsData()
    const systemSettingsDataData = systemSettingsData.getData()
    const oScreen_ver2 = new ScreenData().getDataAsObject()

    const layoutsAndSettingsData = {
      version: BrekekeOperatorConsole.getAppDataVersion(),
      screens: BrekekeOperatorConsole.getEmptyScreens(),
      systemSettings: systemSettingsDataData,
      screen_ver2: oScreen_ver2,
    }

    const noteContent = JSON.stringify(layoutsAndSettingsData)
    const noteName = BrekekeOperatorConsole.getOCNoteName(layoutName)

    const setNoteOptions = {
      methodName: 'setNote',
      methodParams: JSON.stringify({
        tenant: operatorConsole.getLoggedinTenant(),
        name: noteName,
        description: '',
        useraccess: BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
        note: noteContent,
      }),
      onSuccessFunction: res => {
        operatorConsole.setOCNote(
          layoutName,
          layoutsAndSettingsData,
          () => {
            Notification.success({
              message: i18n.t('saved_data_to_pbx_successfully'),
            })
            operatorConsole.setState({ newLayoutModalOpen: false })
          },
          e => {
            // const message = eventArg.message;
            // //console.error("Failed to setOCNote.", sErr );
            // console.error("Failed to save data to PBX.", message);
            // const msg = i18n.t("failed_to_save_data_to_pbx") + " " + message;
            // Notification.error({message: msg, duration: 0});
            // !testit
            if (Array.isArray(e)) {
              for (let i = 0; i < e.length; i++) {
                const err = e[i]
                console.error('setOCNote failed. errors[' + i + ']=', err)
              }
            } else {
              console.error('setOCNote failed. error=', e)
            }

            try {
              const sError = JSON.stringify(e)
              Notification.error({
                message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + sError,
                duration: 0,
              })
            } catch (err) {
              Notification.error({
                message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + e,
                duration: 0,
              })
            }

            operatorConsole.setState({ newLayoutModalOpen: false })
          },
        )
      },
      onFailFunction: errorOrResponse => {
        if (Array.isArray(errorOrResponse)) {
          for (let i = 0; i < errorOrResponse.length; i++) {
            const err = errorOrResponse[i]
            console.error('setOCNote failed. errors[' + i + ']=', err)
          }
        } else {
          console.error('setOCNote failed. error=', errorOrResponse)
        }

        try {
          const sError = JSON.stringify(errorOrResponse)
          Notification.error({
            message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + sError,
            duration: 0,
          })
        } catch (err) {
          Notification.error({
            message:
              i18n.t('failed_to_save_data_to_pbx') + '\r\n' + errorOrResponse,
            duration: 0,
          })
        }

        // operatorConsole.setState({newLayoutModalOpen:false});
      },
    }
    operatorConsole.getPalRestApi().callPalRestApiMethod(setNoteOptions)
  }
  const cancelNewLayout = () => {
    setNewLayoutConfirmOpen(false)
    // message.error('Click on cancelNewLayout.');
  }
  const handleNewLayoutConfirmOpenChange = newOpen => {
    if (!newLayoutConfirmOpen) {
      return
    }
    // handleOk( { newLayoutConfirmOpen, setNewLayoutConfirmOpen } );
    setNewLayoutConfirmOpen(newOpen)
  }
  return (
    <>
      <Modal
        open={operatorConsole.getIsOpenAboutOCModalByState()}
        title={i18n.t('About_Brekeke_OperatorConsole')}
        onOk={() => operatorConsole.closeAboutOCModalByState()}
        onCancel={() => operatorConsole.closeAboutOCModalByState()}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={() => {
              operatorConsole.closeAboutOCModalByState()
            }}
          >
            {i18n.t('Close')}
          </Button>,
        ]}
      >
        <div>
          Brekeke Operator Console, {i18n.t('Version')}{' '}
          {BrekekeOperatorConsole.BREKEKE_OPERATOR_CONSOLE_VERSION}
        </div>
      </Modal>
      {/* <Button type="primary" onClick={showNewLayoutModalFunc}>*/}
      {/*    Open Modal with customized footer*/}
      {/* </Button>*/}
      <Modal
        open={operatorConsole.getState().newLayoutModalOpen}
        title={i18n.t('newLayout')}
        onOk={() => handleOk()}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            {i18n.t('cancel')}
          </Button>,

          <Popconfirm
            key='popconfirm'
            title={i18n.t('OverwriteLayout')}
            description={i18n.t('NewNoteOverwriteConfirm')}
            open={newLayoutConfirmOpen}
            onOpenChange={handleNewLayoutConfirmOpenChange}
            onConfirm={confirmNewLayout}
            onCancel={cancelNewLayout}
            okText={i18n.t('ok')}
            cancelText={i18n.t('no')}
          >
            {/* <Button type="link">Delete a task</Button>*/}
            {/* <Button key="submit" type="primary" onClick={handleOk}>*/}
            <Button key='submit' type='primary' onClick={handleOk}>
              {i18n.t('ok')}
            </Button>
          </Popconfirm>,

          // <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          // <Button
          //     key="link"
          //     href="https://google.com"
          //     type="primary"
          //     loading={loading}
          //     onClick={handleOk}
          // >
          //     Search on Google
          // </Button>,
        ]}
      >
        <NewLayoutForm newLayoutUseForm={newLayoutUseForm} />
      </Modal>
    </>
  )
}

const NewLayoutForm = ({ newLayoutUseForm }) => (
  <Form form={newLayoutUseForm} layout='vertical'>
    <section>
      <Form.Item
        name='layoutName'
        rules={[
          {
            required: true,
            message: i18n.t('layoutName_is_required'),
          },
        ]}
      >
        <Input placeholder={i18n.t('layoutName')} />
      </Form.Item>
    </section>
  </Form>
)
