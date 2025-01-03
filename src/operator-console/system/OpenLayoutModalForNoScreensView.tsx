import { ActivityIndicator, View } from '@ant-design/react-native'
import { useEffect, useState } from 'react'
import { ScrollView, Text } from 'react-native'

import { Button } from '../common/Button'
import { Modal } from '../common/Modal'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { BrekekeOperatorConsole } from '../OperatorConsole'

export const OpenLayoutModalForNoScreensView = props => {
  // const operatorConsoleAsParent = props.operatorConsoleAsParent;
  const open = props.useStateOpen
  const setOpen = props.useStateSetOpen
  const setNewOrOpenLayoutOpen = props.useStateSetNewOrOpenLayoutOpen
  // const noteNamesContent = props.useStateNoteNamesContent

  const [noteNamesContent, setNoteNamesContent] = useState<
    React.ReactNode | any
  >(<ActivityIndicator />)

  const handleOk = () => {
    setOpen(false)
  }

  const refreshNoteNames = () => {
    setNoteNamesContent(<ActivityIndicator />)

    const getNoteNamesByPalRestApiOptions = {
      methodName: 'getNoteNames',
      methodParams: JSON.stringify({
        tenant: props.operatorConsoleAsParent.getLoggedinTenant(),
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
                <Text
                  style={{ color: '#1677ff', fontSize: 14 }}
                  onPress={() => props.selectOCNoteByShortname(noteShortname)}
                >
                  {noteShortname}
                </Text>
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
    props.operatorConsoleAsParent
      .getPalRestApi()
      .callPalRestApiMethod(getNoteNamesByPalRestApiOptions)
  }

  useEffect(() => {
    if (open) {
      refreshNoteNames()
    }
  }, [open])
  const handleCancel = () => {
    setOpen(false)
    setNewOrOpenLayoutOpen(true)
  }

  console.log(
    'noteNamesContent.type?.displayName=' + noteNamesContent.type?.displayName,
  )
  let footer
  if (noteNamesContent.type?.displayName === 'Spin') {
    footer = []
  } else {
    footer = [
      <Button key='back' onPress={handleCancel}>
        {i18n.t('cancel')}
      </Button>,
    ]
  }

  return (
    <Modal
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
