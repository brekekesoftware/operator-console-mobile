import { Button } from '../common/Button'
import { Modal } from '../common/Modal'
import { i18n } from '../i18n'

export const OpenLayoutModalForNoScreensView = props => {
  // const operatorConsoleAsParent = props.operatorConsoleAsParent;
  const open = props.useStateOpen
  const setOpen = props.useStateSetOpen
  const setNewOrOpenLayoutOpen = props.useStateSetNewOrOpenLayoutOpen
  const noteNamesContent = props.useStateNoteNamesContent

  const handleOk = () => {
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
    setNewOrOpenLayoutOpen(true)
  }

  console.log(
    'noteNamesContent.type?.displayName=' + noteNamesContent.type?.displayName,
  )
  console.log('#Duy Phan console open', open)

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
      {...props}
      open={open}
      title={i18n.t('selectLayout')}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{ width: 500, height: 200 }}
      closable
      footer={footer}
    >
      {noteNamesContent}
    </Modal>
  )
}
