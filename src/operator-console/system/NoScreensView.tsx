import {
  ActivityIndicator,
  Button,
  Form,
  Input,
} from '@ant-design/react-native'
import { useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { Modal } from '../common/Modal'
import { Notification } from '../common/Notification'
import { Popconfirm } from '../common/Popconfirm'
import { ScreenData } from '../data/ScreenData'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { BrekekeOperatorConsole } from '../OperatorConsole'
import { OpenLayoutModalForNoScreensView } from './OpenLayoutModalForNoScreensView'

const REGEX = /^[0-9a-zA-Z\-\_\ ]*$/

export const NoScreensView = props => {
  const operatorConsoleAsParent = props.operatorConsoleAsParent
  const [open, setOpen] = useState(true)
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    setOpen(false)
  }
  const handleCancel = operatorConsoleAsParent => {
    setOpen(false)
    operatorConsoleAsParent.logout()
  }

  const [newLayoutUseForm] = Form.useForm()
  const [newLayoutConfirmOpen, setNewLayoutConfirmOpen] = useState(false)
  const [newLayoutName, setNewLayoutName] = useState('')
  // const [newLayoutModalOpen, setNewLayoutModalOpen] = useState(false);

  const handleNewLayoutOk = () => {
    newLayoutUseForm.validateFields().then(values => {
      let layoutName = values.layoutName
      setNewLayoutName(layoutName)
      layoutName = layoutName.trim()
      if (layoutName.length === 0) {
        Notification.error({
          message: i18n.t('OnlySpacesAreNotAllowed'),
          duration: 15,
        })
        return
      }

      const bMatch = REGEX.test(layoutName)
      if (!bMatch) {
        Notification.error({
          message: i18n.t('newLayoutValidationError'),
          duration: 15,
        })
        return
      }

      // exists already?
      const getNoteNamesOptions = {
        methodName: 'getNoteNames',
        methodParams: JSON.stringify({
          tenant: operatorConsoleAsParent.getLoggedinTenant(),
        }),
        onSuccessFunction: res => {
          const layoutNoteName =
            BrekekeOperatorConsole.getOCNoteName(layoutName)
          const noteNames = res
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
            // const layoutNoteName = BrekekeOperatorConsole.getOCNoteName(layoutName);

            const setNoteOptions = {
              methodName: 'setNote',
              methodParams: JSON.stringify({
                tenant: operatorConsoleAsParent.getLoggedinTenant(),
                name: layoutNoteName,
                description: '',
                useraccess:
                  BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
                note: noteContent,
              }),
              onSuccessFunction: res => {
                operatorConsoleAsParent.setOCNote(
                  layoutName,
                  layoutsAndSettingsData,
                  () => {
                    operatorConsoleAsParent.onSavedNewLayoutFromNoScreensView(
                      layoutName,
                      layoutsAndSettingsData,
                    )
                    Notification.success({
                      message: i18n.t('saved_data_to_pbx_successfully'),
                    })
                  },
                  eventArg => {
                    // !testit
                    const message = eventArg.message
                    OCUtil.logErrorWithNotification(
                      'Failed to save data to PBX.',
                      i18n.t('failed_to_save_data_to_pbx'),
                      message,
                    )
                  },
                )
              },
              onFailFunction: errOrResponse => {
                // !testit
                OCUtil.logErrorWithNotification(
                  'Failed to save data to PBX.',
                  i18n.t('failed_to_save_data_to_pbx'),
                  errOrResponse,
                )
              },
            }
            operatorConsoleAsParent
              .getPalRestApi()
              .callPalRestApiMethod(setNoteOptions)
          }
        },
        onFailFunction: errorOrResponse => {
          // console.error("Failed to getNoteNames from PAL REST API.", errorOrResponse);

          let msg
          try {
            const s = JSON.stringify(errorOrResponse)
            msg = i18n.t('failed_to_load_data_from_pbx') + '\r\n' + s
          } catch (err) {
            msg =
              i18n.t('failed_to_load_data_from_pbx') + '\r\n' + errorOrResponse
          }
          Notification.error({ message: msg, duration: 0 })
        },
      }
      operatorConsoleAsParent
        .getPalRestApi()
        .callPalRestApiMethod(getNoteNamesOptions)
    })

    // setLoading(true);
    // setTimeout(() => {
    //     setLoading(false);
    //     setNewLayoutModalOpen(false);
    // }, 3000);
  }
  const handleNewLayoutCancel = () => {
    cancelConfirmNewLayout()
    operatorConsoleAsParent.setState({ newLayoutModalOpen: false })
    setOpen(true)
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
        tenant: operatorConsoleAsParent.getLoggedinTenant(),
        name: noteName,
        description: '',
        useraccess: BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
        note: noteContent,
      }),
      onSuccessFunction: res => {
        operatorConsoleAsParent.setOCNote(
          layoutName,
          layoutsAndSettingsData,
          () => {
            operatorConsoleAsParent.onSavedNewLayoutFromNoScreensView(
              layoutName,
              layoutsAndSettingsData,
            )
            Notification.success({
              message: i18n.t('saved_data_to_pbx_successfully'),
            })
            setNewLayoutConfirmOpen(false)
          },
          e => {
            // //!testit
            // const message = eventArg.message;
            // console.error("Failed to save data to PBX.", message);
            // const msg = i18n.t("failed_to_save_data_to_pbx") + " " + message;
            // Notification.error({message: msg, duration: 0});
            // !testit
            if (Array.isArray(e)) {
              for (let i = 0; i < e.length; i++) {
                const err = e[i]
                console.error(
                  'setSystemSettingsDataData failed. errors[' + i + ']=',
                  err,
                )
              }
            } else {
              console.error('setSystemSettingsDataData failed. error=', e)
            }
            Notification.error({
              message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + e,
              duration: 0,
            })
            setNewLayoutConfirmOpen(false)
          },
        )
      },
      onFailFunction: errOrResponse => {
        OCUtil.logErrorWithNotification(
          'Failed to setNote.',
          i18n.t('failed_to_save_data_to_pbx'),
          errOrResponse,
        )
      },
    }
    operatorConsoleAsParent.getPalRestApi().callPalRestApiMethod(setNoteOptions)
  }
  const cancelConfirmNewLayout = () => {
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

  const [openLayoutOpen, setOpenLayoutOpen] = useState(false)

  const selectOCNoteByShortname = shortname => {
    const noteName = BrekekeOperatorConsole.getOCNoteName(shortname)

    const getNoteByPalRestApiOptions = {
      methodName: 'getNote',
      methodParams: JSON.stringify({
        tenant: operatorConsoleAsParent.getLoggedinTenant(),
        name: noteName,
      }),
      onSuccessFunction: res => {
        if (res) {
          const noteInfo = res
          const sNote = noteInfo.note
          let oNote
          try {
            oNote = JSON.parse(sNote)
          } catch (err) {
            setIsLoading(false)
            OCUtil.logErrorWithNotification(
              null,
              i18n.t('failed_to_load_data_from_pbx'),
              err,
            )
            return
          }
          operatorConsoleAsParent.setOCNote(
            shortname,
            oNote,
            () => {
              setIsLoading(false)
              // operatorConsoleAsParent.onSelectOCNoteByShortnameFromNoScreensView(
              //   this,
              // )
            },
            e => {
              // !testit
              setIsLoading(false)
              if (Array.isArray(e)) {
                for (let i = 0; i < e.length; i++) {
                  const err = e[i]
                  console.error('setOCNote failed. errors[' + i + ']=', err)
                }
              } else {
                console.error('setOCNote failed. error=', e)
              }
              Notification.error({
                message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + e,
                duration: 0,
              })
            },
          )
        } else {
          setIsLoading(false)
          Notification.warning({ message: i18n.t('The_note_does_not_exist') })
          refreshNoteNames()
        }
      },
      onFailFunction: errorOrResponse => {
        // !testit
        setIsLoading(false)
        // const message = eventArg.message;
        console.error('Failed to getNote.', errorOrResponse)
        let err
        try {
          err = JSON.stringify(errorOrResponse)
        } catch (e) {
          err = e
        }
        Notification.error({
          message: i18n.t('Failed_to_get_note') + '\r\n' + err,
          duration: 0,
        })
      },
    }
    operatorConsoleAsParent
      .getPalRestApi()
      .callPalRestApiMethod(getNoteByPalRestApiOptions)

    setIsLoading(true)
  }

  const [noteNamesContent, setNoteNamesContent] = useState<
    React.ReactNode | string
  >(<ActivityIndicator />)
  const [isLoading, setIsLoading] = useState(false)

  const refreshNoteNames = () => {
    setNoteNamesContent(<ActivityIndicator />)

    const getNoteNamesByPalRestApiOptions = {
      methodName: 'getNoteNames',
      methodParams: JSON.stringify({
        tenant: operatorConsoleAsParent.getLoggedinTenant(),
      }),
      onSuccessFunction: res => {
        const allNoteNames = res
        if (!allNoteNames) {
          setNoteNamesContent(i18n.t('Layout_does_not_exist'))
          return
        }
        const noteNames = allNoteNames.filter(value =>
          value.startsWith(BrekekeOperatorConsole.LAYOUT_NOTE_NAME_PREFIX),
        )
        if (!noteNames || noteNames.length == 0) {
          setNoteNamesContent(i18n.t('Layout_does_not_exist'))
        } else {
          const jsxContents: JSX.Element[] = []
          for (let i = 0; i < noteNames.length; i++) {
            const noteName = noteNames[i]
            const noteShortname =
              BrekekeOperatorConsole.getOCNoteShortname(noteName)
            const sNoteShortname = (
              <View key={i}>
                <Text onPress={() => selectOCNoteByShortname(noteShortname)}>
                  {noteShortname}
                </Text>
                {/* <br /> */}
              </View>
            )
            jsxContents.push(sNoteShortname)
          }
          setNoteNamesContent(jsxContents)
        }
      },
      onFailFunction: errOrResponse => {
        // !testit
        OCUtil.logErrorWithNotification(
          null,
          i18n.t('failed_to_load_data_from_pbx'),
          errOrResponse,
        )
      },
    }
    operatorConsoleAsParent
      .getPalRestApi()
      .callPalRestApiMethod(getNoteNamesByPalRestApiOptions)
  }

  const handleOpenLayoutOpen = () => {
    setOpen(false)
    setOpenLayoutOpen(true)
    refreshNoteNames()
  }

  let newOrOpenLayoutFooter
  let newOrOpenLayoutTitle
  let newOrOpenLayoutText
  const isAdmin = operatorConsoleAsParent.getLoggedinUserIsAdmin()
  if (isAdmin === true) {
    newOrOpenLayoutTitle = i18n.t('NewOrOpenLayoutTitle')
    newOrOpenLayoutText = i18n.t('NewOrOpenLayoutText')
    newOrOpenLayoutFooter = [
      <Button key='back' onPress={() => handleCancel(operatorConsoleAsParent)}>
        {i18n.t('cancel')}
      </Button>,
      <Button
        key='submit'
        type='primary'
        style={{ marginLeft: 6 }}
        onPress={() => {
          setOpen(false)
          operatorConsoleAsParent.setState({ newLayoutModalOpen: true })
        }}
      >
        {i18n.t('newLayout')}
      </Button>,
      <Button
        key='submit2'
        type='primary'
        style={{ marginLeft: 6 }}
        onPress={handleOpenLayoutOpen}
      >
        {i18n.t('openLayout')}
      </Button>,
    ]
  } else {
    newOrOpenLayoutTitle = i18n.t('OpenLayoutTitle')
    newOrOpenLayoutText = i18n.t('OpenLayoutText')
    newOrOpenLayoutFooter = [
      <Button key='back' onPress={() => handleCancel(operatorConsoleAsParent)}>
        {i18n.t('cancel')}
      </Button>,
      <Button
        key='submit2'
        type='primary'
        onPress={handleOpenLayoutOpen}
        style={{ marginLeft: 6 }}
      >
        {i18n.t('openLayout')}
      </Button>,
    ]
  }

  const displayLoadingStyle = isLoading ? 'flex' : 'none'

  const bNewLayoutModalOpen =
    operatorConsoleAsParent.getState().newLayoutModalOpen
  return (
    <>
      <OpenLayoutModalForNoScreensView
        operatorConsoleAsParent={operatorConsoleAsParent}
        useStateOpen={openLayoutOpen}
        useStateSetOpen={setOpenLayoutOpen}
        useStateSetNewOrOpenLayoutOpen={setOpen}
        useStateNoteNamesContent={noteNamesContent}
      />
      <Modal
        open={bNewLayoutModalOpen}
        title={i18n.t('newLayout')}
        onOk={handleNewLayoutOk}
        onCancel={handleNewLayoutCancel}
        footer={[
          <Button key='back' onPress={handleNewLayoutCancel}>
            {i18n.t('cancel')}
          </Button>,

          <Popconfirm
            key='popconfirm'
            title={i18n.t('OverwriteLayout')}
            description={i18n.t('NewNoteOverwriteConfirm')}
            open={newLayoutConfirmOpen}
            onOpenChange={handleNewLayoutConfirmOpenChange}
            onConfirm={confirmNewLayout}
            onCancel={cancelConfirmNewLayout}
            okText={i18n.t('ok')}
            cancelText={i18n.t('cancel')}
          >
            <Button
              key='submit'
              type='primary'
              onPress={handleNewLayoutOk}
              style={{ marginLeft: 6 }}
            >
              {i18n.t('ok')}
            </Button>
          </Popconfirm>,
        ]}
      >
        <NewLayoutForm newLayoutUseForm={newLayoutUseForm} />
      </Modal>
      <Modal
        open={open}
        title={newOrOpenLayoutTitle}
        onOk={handleOk}
        onCancel={() => handleCancel(operatorConsoleAsParent)}
        footer={newOrOpenLayoutFooter}
      >
        {newOrOpenLayoutText}
      </Modal>
      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 100000000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View>
          <ActivityIndicator />
        </View>
      </View>
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
