import { ActivityIndicator, Button } from '@ant-design/react-native'
import { ScrollView, Text, View } from 'react-native'

import { Modal } from '../common/Modal'
import { Notification } from '../common/Notification'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { BrekekeOperatorConsole } from '../OperatorConsole'

export const OpenLayoutModalForDropDownMenu = props => {
  const open = props.useStateOpen
  const setOpen = props.useStateSetOpen
  const noteNamesContent = props.noteNamesContent
  const handleOk = () => {
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
    // setNewOrOpenLayoutOpen(true);
  }

  const footer = [
    <Button key='back' onPress={handleCancel}>
      {i18n.t('cancel')}
    </Button>,
  ]

  return (
    <Modal
      {...props}
      open={open}
      title={i18n.t('selectLayout')}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ width: 500, height: 300, minHeight: 300 }}
      footer={footer}
    >
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {noteNamesContent}
      </ScrollView>
    </Modal>
  )
}

export const refreshNoteNamesContent = (
  operatorConsole,
  setNoteNamesContentFunc,
  setOpenLayoutModalOpenFunc,
  setIsLoading,
) => {
  const selectOCNoteByShortname = (operatorConsole, shortname) => {
    const noteName = BrekekeOperatorConsole.getOCNoteName(shortname)
    const getNoteOptions = {
      methodName: 'getNote',
      methodParams: JSON.stringify({
        tenant: operatorConsole.getLoggedinTenant(),
        name: noteName,
      }),
      onSuccessFunction: res => {
        if (res) {
          const sNote = res.note
          let oNote
          try {
            oNote = JSON.parse(sNote)
          } catch (err) {
            console.error(err)
            setIsLoading(false)
            setOpenLayoutModalOpenFunc(false)
            Notification.error({
              message: i18n.t('Failed_to_get_note') + '\r\n' + err,
              duration: 0,
            })
            return
          }

          operatorConsole.setOCNote(
            shortname,
            oNote,
            () => {
              // operatorConsole.onSelectOCNoteByShortnameFromNoScreensView(  this );
              setIsLoading(false)
              setOpenLayoutModalOpenFunc(false)
            },
            e => {
              // const message = eventArg.message;
              // console.error("Failed to setOCNote.", message);
              // Notification.error({message: i18n.t("failed_to_load_data_from_pbx") + " " + message,duration:0});
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

              try {
                const sError = JSON.stringify(e)
                Notification.error({
                  message:
                    i18n.t('failed_to_save_data_to_pbx') + '\r\n' + sError,
                  duration: 0,
                })
              } catch (err) {
                Notification.error({
                  message: i18n.t('failed_to_save_data_to_pbx') + '\r\n' + e,
                  duration: 0,
                })
              }
              // Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  e, duration:0 });

              setOpenLayoutModalOpenFunc(false)
            },
          )
        } else {
          setIsLoading(false)
          // setOpenLayoutModalOpenFunc(false);
          Notification.warning({ message: i18n.t('The_note_does_not_exist') })
        }
      },
      onFailFunction: errorOrResponse => {
        OCUtil.logErrorWithNotification(
          'Failed to get note.',
          i18n.t('Failed_to_get_note'),
          errorOrResponse,
        )
        setIsLoading(false)
      },
    }
    operatorConsole.getPalRestApi().callPalRestApiMethod(getNoteOptions)
  }

  setNoteNamesContentFunc(<ActivityIndicator />)

  const getNoteNamesOptions = {
    methodName: 'getNoteNames',
    methodParams: JSON.stringify({
      tenant: operatorConsole.getLoggedinTenant(),
    }),
    onSuccessFunction: noteNames => {
      if (!noteNames || noteNames.length == 0) {
        setNoteNamesContentFunc(i18n.t('Layout_does_not_exist'))
      } else {
        const jsxContents: JSX.Element[] = []
        for (let i = 0; i < noteNames.length; i++) {
          const noteName = noteNames[i]
          const noteShortname =
            BrekekeOperatorConsole.getOCNoteShortname(noteName)
          const sNoteShortname = (
            <View key={i}>
              <Text
                onPress={() =>
                  selectOCNoteByShortname(operatorConsole, noteShortname)
                }
                style={{ fontSize: 14 }}
              >
                {noteShortname}
              </Text>
            </View>
          )
          jsxContents.push(sNoteShortname)
        }
        setNoteNamesContentFunc(jsxContents)
      }
    },
    onFailFunction: errOrResponse => {
      OCUtil.logErrorWithNotification(
        'Failed to get note names.',
        i18n.t('Failed_to_get_note_names'),
        errOrResponse,
      )
    },
  }
  operatorConsole.getPalRestApi().callPalRestApiMethod(getNoteNamesOptions)
}
