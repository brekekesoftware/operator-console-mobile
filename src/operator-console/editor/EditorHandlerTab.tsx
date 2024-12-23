import { useRef } from 'react'
import { View } from 'react-native'

import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Popconfirm } from '../common/Popconfirm'
import { i18n } from '../i18n'

export const EditorHandlerTap = ({
  _onClickAddTab,
  _onClickRenameTab,
  _onClickRemoveTab,
}) => {
  const refTabLabel = useRef<any>()

  return (
    <>
      <View>
        <Input
          ref={refTabLabel}
          type='text'
          defaultValue={i18n.t('UntitledTab')}
        />
        <Button onPress={() => _onClickAddTab(refTabLabel.current.getValue())}>
          {i18n.t('Add_tab')}
        </Button>
        <Button
          onPress={() => _onClickRenameTab(refTabLabel.current.getValue())}
        >
          {i18n.t('Rename_tab')}
        </Button>
      </View>
      <View>
        <Popconfirm
          title={i18n.t('Are_you_sure_you_want_to_remove_the_tab')}
          onConfirm={() => _onClickRemoveTab()}
          okText={i18n.t('yes')}
          cancelText={i18n.t('no')}
        >
          <Button disabled>{i18n.t('Remove_tab')}</Button>
        </Popconfirm>
      </View>
    </>
  )
}
