import { Button } from '@ant-design/react-native'
import { Space } from 'antd'
import Notification from 'antd/lib/notification'
import React from 'react'

import { Popconfirm } from '../common/Popconfirm'
import { i18n } from '../i18n'
import { BrekekeOperatorConsole } from '../OperatorConsole'
import { SystemSettingsForm } from './SystemSettingsForm'

export const OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_ID =
  'operatorConsole_systemSettings'
export const OPERATOR_CONSOLE_SYSTEM_SETTINGS_DATA_VERSION = '0.1'

// const SystemSettingsDownloadStates = {
//     None: 0,
//     Downloading: 1,
//     DownloadOk: 2,
//     DownloadNg: 3,
// };

type Props = {
  operatorConsole: BrekekeOperatorConsole
}

export class SystemSettingsView extends React.Component<Props> {
  operatorConsoleAsParent: BrekekeOperatorConsole
  setSystemSettingsUseFormBindedFunction
  _systemSettingsUseForm
  constructor(props) {
    super(props)
    this.state = {}
    this.operatorConsoleAsParent = this.props.operatorConsole
    this.setSystemSettingsUseFormBindedFunction =
      this.setSystemSettingsUseForm.bind(this)
    this.operatorConsoleAsParent.setSystemSettingsView(this)
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  // }

  // componentDidMount() {
  //     this.setState({ downloadingSystemSettings: true }
  //     , () => this._syncDown() );
  // }

  saveSystemSettings = () => {
    this._systemSettingsUseForm
      .validateFields()
      .then(values => {
        // const systemSettingsAppData = Object.assign( {}, values); //!optimize isRequire?

        // screens[this.state.currentScreenIndex] = {
        //     widgets: this.state.editingWidgets,
        //     background: this.state.editingScreenBackground,
        //     width: this.state.editingScreenWidth,
        //     height: this.state.editingScreenHeight,
        //     grid: this.state.editingScreenGrid,
        // }

        // check ucUrl
        if (values.ucUrl !== undefined && values.ucUrl !== null) {
          values.ucUrl = values.ucUrl.trim()
          if (
            values.ucUrl.length === 0 &&
            values.ucChatAgentComponentEnabled === false
          ) {
          } else {
            try {
              const url = new URL(values.ucUrl)
            } catch (err) {
              Notification.error({
                message:
                  i18n.t('inputContentIsInvalidWithColon') + i18n.t('ucUrl'),
              })
              return
            }
          }
        }

        const systemSettings =
          this.operatorConsoleAsParent.getSystemSettingsData()
        const hasCall =
          this.operatorConsoleAsParent
            .getPhoneClient()
            .getCallInfos()
            .getCallInfoCount() !== 0
        if (hasCall) {
          const data = systemSettings.getData()
          const ptData = data['phoneTerminal']
          const ptValue = values['phoneTerminal']
          if (ptData !== ptValue) {
            Notification.error({
              message: i18n.t('cannotChangeThePhoneTerminal'),
            })
            return
          }
        }

        // !later validation
        // values.ucChatAgentComponentEnabled

        // try {
        //     eval(values.extensionScript);
        // }
        // catch(err){
        //     Notification.error({message: i18n.t('aScriptErrorHasOccurred') + "\r\n" +  err });
        //      return;
        // }

        console.log('saving systemSettings...', values)
        const this_ = this

        this.setState({ isSystemSettingsSaving: true }, () => {
          systemSettings.setSystemSettingsDataData(
            values,
            () => {
              this_._onSetSystemSettingsDataSuccess(systemSettings)
            },
            e => {
              this_._onSetSystemSettingsDataFail(e)
            },
          )
        })
      })
      .catch(errorInfo => {
        console.error(
          i18n.t('CouldNotSavePleaseCheckYourEntries') + ' error=',
          errorInfo,
        )
        Notification.error({
          message: i18n.t('CouldNotSavePleaseCheckYourEntries'),
          duration: 15,
        }) // !todo show error message.
      })
  }

  _onEndSetSystemSettings() {
    this.setState({ isSystemSettingsSaving: false })
  }

  _onSetSystemSettingsDataFail(e) {
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
    try {
      e = JSON.stringify(e)
    } catch (err) {}
    Notification.error({
      message: i18n.t('failedToSetupSystemSettingsDataData') + '\r\n' + e,
      duration: 0,
    })
    this._onEndSetSystemSettings()
  }

  _onSetSystemSettingsDataSuccess(systemSettings) {
    this.operatorConsoleAsParent.onSavingSystemSettings(this)
    this._syncUp()
    this._onEndSetSystemSettings()
  }

  _onSetOCNoteFailAtSyncUp(e) {
    if (Array.isArray(e)) {
      for (let i = 0; i < e.length; i++) {
        const err = e[i]
        console.error('setOCNote failed. errors[' + i + ']=', err)
      }
    } else {
      console.error('setOCNote failed. error=', e)
    }
    // Notification.error({message: i18n.t('failed_to_save_data_to_pbx') + "\r\n" +  e, duration:0 });
    Notification.error({
      key: 'sync',
      message: i18n.t('failed_to_save_data_to_pbx'),
      btn: (
        <Button
          type='primary'
          size='small'
          onPress={() => {
            // Notification.close('sync');
            this._syncUp()
          }}
        >
          {i18n.t('retry')}
        </Button>
      ),
      duration: 0,
    })
  }

  _onSetOCNoteSuccessAtSyncUp() {
    Notification.success({
      key: 'sync',
      message: i18n.t('saved_data_to_pbx_successfully'),
    })
    this.operatorConsoleAsParent.abortSystemSettings()
  }

  _syncUp = async () => {
    // if (!pal) return;
    const systemSettingsData =
      this.operatorConsoleAsParent.getSystemSettingsData()
    const systemSettingsDataData = systemSettingsData.getData()
    const screenData_ver2 = this.operatorConsoleAsParent.getScreenData_ver2()
    const oScreen_ver2 = screenData_ver2.getDataAsObject()

    const layoutsAndSettingsData = {
      version: BrekekeOperatorConsole.getAppDataVersion(),
      screens: this.operatorConsoleAsParent.state.screens,
      systemSettings: systemSettingsDataData,
      screen_ver2: oScreen_ver2,
    }

    const shortname = this.operatorConsoleAsParent.getLastLayoutShortname()
    const noteContent = JSON.stringify(layoutsAndSettingsData)
    let error
    const this_ = this
    const noteName = BrekekeOperatorConsole.getOCNoteName(shortname)

    const setNoteOptions = {
      methodName: 'setNote',
      methodParams: JSON.stringify({
        tenant: this.operatorConsoleAsParent.getLoggedinTenant(),
        name: noteName,
        description: '',
        useraccess: BrekekeOperatorConsole.PAL_NOTE_USERACCESSES.ReadWrite,
        note: noteContent,
      }),
      onSuccessFunction: res => {
        // this.operatorConsoleAsParent.setLastSystemSettingsDataData( systemSettingsDataData );
        this.operatorConsoleAsParent.setOCNote(
          shortname,
          layoutsAndSettingsData,
          () => {
            this_._onSetOCNoteSuccessAtSyncUp()
          },
          e => {
            this_._onSetOCNoteFailAtSyncUp(e)
          },
          false,
          true,
        )
        // if( sErr ){
        //     console.error("Failed to set OCNote.", sErr );
        //     throw new Error(sErr);
        // }
        //        }  );
      },
      onFailFunction: errorOrResponse => {
        // !testit
        console.error('Failed to setOCNote.', errorOrResponse)

        try {
          const sErr = JSON.stringify(errorOrResponse)
          Notification.error({
            message: i18n.t('Failed_to_save_note') + '\r\n' + sErr,
            duration: 0,
          })
        } catch (err2) {
          Notification.error({
            message: i18n.t('Failed_to_save_note') + '\r\n' + errorOrResponse,
            duration: 0,
          })
        }
      },
    }
    this.operatorConsoleAsParent
      .getPalRestApi()
      .callPalRestApiMethod(setNoteOptions)
  }

  setSystemSettingsUseForm = systemSettingsUseForm => {
    this._systemSettingsUseForm = systemSettingsUseForm
  }

  // _onChangeUcChatAgentComponentEnabled(ev){
  //     const operatorConsole = this.operatorConsoleAsParent;
  //     const uccac = operatorConsole.getUccac();
  //     const ucChatAgentComponentEnabled = ev.target.value;
  //
  //     //!later init/deinit uccac
  //     if( ucChatAgentComponentEnabled === true ){
  //         uccac.init();
  //     }
  //     else{
  //         uccac.deinit();
  //     }
  // }

  render() {
    const hasCall =
      this.operatorConsoleAsParent
        .getPhoneClient()
        .getCallInfos()
        .getCallInfoCount() !== 0
    const this_ = this
    const isButtonsEnabled = this.state.isSystemSettingsSaving === true
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 4,
            borderBottom: 'solid 1px #e0e0e0',
          }}
        >
          <div>
            <Space>
              <Popconfirm
                title={i18n.t('are_you_sure')}
                onConfirm={this.operatorConsoleAsParent.abortSystemSettings}
                okText={i18n.t('yes')}
                cancelText={i18n.t('no')}
              >
                <Button type='secondary' disabled={isButtonsEnabled}>
                  {i18n.t('discard')}
                </Button>
              </Popconfirm>
              <Space />
              <Button
                type='success'
                htmlType='cancel'
                onClick={this.saveSystemSettings}
                disabled={isButtonsEnabled}
              >
                {i18n.t('save')}
              </Button>
            </Space>
          </div>
        </div>
        {/* <div style={{position:"absolute",top:40,margin:"0px 20px 0px 20px",paddingBottom:"20px",height:"calc(100% - 40px)",overflow:"scroll",width:"calc(100% - 20px)"}}>*/}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 40,
            paddingRight: 20,
            paddingBottom: 20,
            width: 'calc(100% - 40px)',
            height: 'calc(100% - 60px)',
            overflow: 'scroll',
          }}
        >
          <div>
            <SystemSettingsForm
              hasCall={hasCall}
              setSystemSettingsUseFormBindedFunction={
                this.setSystemSettingsUseFormBindedFunction
              }
              systemSettingsData={this.operatorConsoleAsParent.getSystemSettingsData()}
              // onChangeUcChatAgentComponentEnabledFunction ={this._onChangeUcChatAgentComponentEnabled}
              // setAceEditorFunction={ function( aceEditor ){ this_.setAceEditor( aceEditor ) }}
            />
          </div>
        </div>
      </>
    )
  }
}
