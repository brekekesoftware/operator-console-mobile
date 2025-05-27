import { ActivityIndicator, Form, Input } from '@ant-design/react-native'
import { useMemo, useState } from 'react'
import { View } from 'react-native'

import { Button } from '../common/Button'
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
        console.log('#Duy Phan console success')
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
    setOpenLayoutOpen(false)

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
              operatorConsoleAsParent.onSelectOCNoteByShortnameFromNoScreensView(
                this,
              )
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
          // refreshNoteNames()
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

  const [isLoading, setIsLoading] = useState(false)

  const handleOpenLayoutOpen = () => {
    setOpen(false)
    setTimeout(() => {
      setOpenLayoutOpen(true)
    }, 1000)
  }

  const isAdmin = operatorConsoleAsParent.getLoggedinUserIsAdmin()

  const layoutContents = useMemo(() => {
    let newOrOpenLayoutFooter
    let newOrOpenLayoutTitle
    let newOrOpenLayoutText

    if (isAdmin === true) {
      newOrOpenLayoutTitle = i18n.t('NewOrOpenLayoutTitle')
      newOrOpenLayoutText = i18n.t('NewOrOpenLayoutText')
      newOrOpenLayoutFooter = [
        <Button
          key='back'
          onPress={() => handleCancel(operatorConsoleAsParent)}
        >
          {i18n.t('cancel')}
        </Button>,
        <Button
          key='submit'
          type='primary'
          style={{ marginLeft: 6 }}
          onPress={() => {
            setOpen(false)
            setTimeout(() => {
              operatorConsoleAsParent.setState({ newLayoutModalOpen: true })
            }, 1000)
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
        <Button
          key='back'
          onPress={() => handleCancel(operatorConsoleAsParent)}
        >
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
    return { newOrOpenLayoutFooter, newOrOpenLayoutTitle, newOrOpenLayoutText }
  }, [isAdmin])

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
        selectOCNoteByShortname={selectOCNoteByShortname}
        // useStateNoteNamesContent={noteNamesContent}
      />
      <Modal
        open={bNewLayoutModalOpen}
        title={i18n.t('newLayout')}
        onOk={handleNewLayoutOk}
        onCancel={handleNewLayoutCancel}
        width={400}
        style={{ width: 400, height: 300 }}
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

      <View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          zIndex: 999999,
          display: displayLoadingStyle,
        }}
      >
        <View>
          <ActivityIndicator />
        </View>
      </View>
      <Modal
        open={open}
        title={layoutContents.newOrOpenLayoutTitle}
        onOk={handleOk}
        onCancel={() => handleCancel(operatorConsoleAsParent)}
        onClose={() => setOpen(false)}
        footer={layoutContents.newOrOpenLayoutFooter}
        width={500}
        style={{ width: 500, height: 170 }}
        closable
      >
        {layoutContents.newOrOpenLayoutText}
      </Modal>
    </>
  )
}

const NewLayoutForm = ({ newLayoutUseForm }) => (
  <Form
    form={newLayoutUseForm}
    layout='vertical'
    styles={{
      Body: {
        backgroundColor: 'transparent',
        elevation: 0,
        borderColor: 'transparent',
      },
      BodyBottomLine: {
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
      name='layoutName'
      rules={[
        {
          required: true,
          message: i18n.t('layoutName_is_required'),
        },
      ]}
      styles={{
        Line: {
          backgroundColor: 'transparent',
          elevation: 0,
          borderColor: 'transparent',
          borderWidth: 0,
        },
        Item: {
          backgroundColor: 'transparent',
          elevation: 0,
          borderColor: 'transparent',
          height: 70,
        },
      }}
      style={{ elevation: 0, borderColor: 'transparent' }}
    >
      <Input
        placeholder={i18n.t('layoutName')}
        style={{
          borderRadius: 4,
          borderColor: '#e0e0e0',
          borderWidth: 1,
          padding: 10,
          height: 55,
        }}
      />
    </Form.Item>
  </Form>
)
