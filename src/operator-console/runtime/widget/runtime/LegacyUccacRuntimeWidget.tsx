import { DynamicView, ViewRegistryProvider } from 'dynamic-renderer'
import { createRef, useRef } from 'react'
import { Dimensions, Modal, Text, TouchableOpacity, View } from 'react-native'

import { i18n } from '../../../i18n'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

export class LegacyUccacRuntimeWidget extends RuntimeWidget {
  _UccacWrapper
  _uccacAc
  _uccacRootElementRef
  _onUccacInitSuccessFunction
  _onUccacDeinitFunction
  refDynamicWebChatQueue
  refDynamicSearch
  refDynamicWebChatPickup
  constructor(props, context) {
    super(props, context)
    const oc = BrekekeOperatorConsole.getStaticInstance()
    this._UccacWrapper = oc.getUccacWrapper()

    this.state = { isRestartButtonDisabled: false, isShowModal: false }
    this._uccacAc = null

    this._uccacRootElementRef = createRef()
    const this_ = this
    this._onUccacInitSuccessFunction = function (uccacWrapperAsCaller) {
      this_._onInitUccacWrapperSuccessByUccacWrapper(uccacWrapperAsCaller)
    }
    this._UccacWrapper.addOnUccacInitSuccessFunction(
      this._onUccacInitSuccessFunction,
    )

    this._onUccacDeinitFunction = function (uccacWrapperAsCaller) {
      this_._onDeinitUccacWrapperByUccacWrapper(uccacWrapperAsCaller)
    }
    this._UccacWrapper.addOnUccacDeinitFunction(this._onUccacDeinitFunction)
    this.refDynamicSearch = createRef()
    this.refDynamicWebChatPickup = createRef()
    this.refDynamicWebChatQueue = createRef()
  }

  _refreshUccacAc() {
    if (this._UccacWrapper.isInitialized() === true) {
      this._initUccacAc()
    } else {
      this._destroyUccacAc()
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this._refreshUccacAc()
  }

  componentWillUnmount() {
    this._destroyUccacAc()
    this._UccacWrapper.removeOnUccacInitSuccessFunction(
      this._onUccacInitSuccessFunction,
    )
    this._UccacWrapper.removeOnUccacDeinitFunction(this._onUccacDeinitFunction)
    super.componentWillUnmount()
  }

  _onInitUccacWrapperSuccessByUccacWrapper(uccacWrapperAsCaller) {
    this._initUccacAc()
  }

  _onDeinitUccacWrapperByUccacWrapper(uccacWrapperAsCaller) {
    this._destroyUccacAc()
  }

  _destroyUccacAc() {
    if (!this._uccacAc) {
      return false
    }
    this._uccacAc.destroy()
    this._uccacAc = null
    return true
  }

  _initUccacAc() {
    if (this._uccacAc) {
      this._uccacAc.destroy()
      this._uccacAc = null
    }

    this._uccacAc = this._UccacWrapper.addUccacAc()
    const initUccacAcOptions = {
      acIconParentsWebchatqueue: 'webchatqueue',
      acIconParentsWebchatpickup: 'webchatpickup',
      acIconParentsSearch: 'search',
    }
    this._uccacAc.init(initUccacAcOptions)

    const oc = BrekekeOperatorConsole.getStaticInstance()

    oc.getLoginPassword().then(pass => {
      const startUCClientOptions = {
        ucclientWidgetParent: 'ucclientPanelRoot',
        ucclientUcurl: this._UccacWrapper.getUcurl(),
        ucclientTenant: oc.getLoginTenantname(),
        ucclientUser: oc.getLoginUsername(),
        ucclientPass: pass,
      }
      this.setState({ isRestartButtonDisabled: true }, () => {
        this._uccacAc.startUCClient(startUCClientOptions)
        setTimeout(() => {
          this.setState({ isRestartButtonDisabled: false })
        }, 8000)
      })
    })
  }

  _onClickRestart() {
    this.setState({ isRestartButtonDisabled: true, isShowModal: false }, () => {
      this._uccacAc.stopUCClient()
      const oc = BrekekeOperatorConsole.getStaticInstance()
      oc.getLoginPassword().then(pass => {
        const startUCClientOptions = {
          ucclientWidgetParent: 'ucclientPanelRoot',
          ucclientUcurl: this._UccacWrapper.getUcurl(),
          ucclientTenant: oc.getLoginTenantname(),
          ucclientUser: oc.getLoginUsername(),
          ucclientPass: pass,
        }
        this._uccacAc.startUCClient(startUCClientOptions)
        setTimeout(() => {
          this.setState({ isRestartButtonDisabled: false })
        }, 8000)
      })
    })
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.getWidgetData()

    const uccacwidgetFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getUccacwidgetFgColor(),
      '',
    )
    const uccacwidgetBgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getUccacwidgetBgColor(),
      'rgba(255,255,255,255)',
    )

    const borderRadius =
      widgetData.getBorderRadius() || widgetData.getBorderRadius() === 0
        ? widgetData.getBorderRadius()
        : undefined

    const outsideShadow_horizontalOffset =
      widgetData.getOutsideShadow_horizontalOffset() ||
      widgetData.getOutsideShadow_horizontalOffset() === 0
        ? widgetData.getOutsideShadow_horizontalOffset()
        : ''
    const outsideShadow_verticalOffset =
      widgetData.getOutsideShadow_verticalOffset() ||
      widgetData.getOutsideShadow_verticalOffset() === 0
        ? widgetData.getOutsideShadow_verticalOffset()
        : ''
    const outsideShadow_blur =
      widgetData.getOutsideShadow_blur() ||
      widgetData.getOutsideShadow_blur() === 0
        ? widgetData.getOutsideShadow_blur()
        : ''
    const outsideShadow_spread =
      widgetData.getOutsideShadow_spread() ||
      widgetData.getOutsideShadow_spread() === 0
        ? widgetData.getOutsideShadow_spread()
        : ''
    const outsideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getOutsideShadow_color(),
      'rgba(0,0,0,0)',
    ) // "rgba(0,0,0,0.2)"  //!default

    const insideShadow_horizontalOffset =
      widgetData.getInsideShadow_horizontalOffset() ||
      widgetData.getInsideShadow_horizontalOffset() === 0
        ? widgetData.getInsideShadow_horizontalOffset()
        : ''
    const insideShadow_verticalOffset =
      widgetData.getInsideShadow_verticalOffset() ||
      widgetData.getInsideShadow_verticalOffset() === 0
        ? widgetData.getInsideShadow_verticalOffset()
        : ''
    const insideShadow_blur =
      widgetData.getInsideShadow_blur() ||
      widgetData.getInsideShadow_blur() === 0
        ? widgetData.getInsideShadow_blur()
        : ''
    const insideShadow_spread =
      widgetData.getInsideShadow_spread() ||
      widgetData.getInsideShadow_spread() === 0
        ? widgetData.getInsideShadow_spread()
        : ''
    const insideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getInsideShadow_color(),
      'rgba(0,0,0,0)',
    ) // "rgba(48,71,1,1)"  //!default

    const sBoxshadowOutside =
      outsideShadowColorRgb &&
      outsideShadow_horizontalOffset &&
      outsideShadow_verticalOffset &&
      outsideShadow_blur &&
      outsideShadow_spread
        ? outsideShadowColorRgb +
          ' ' +
          outsideShadow_horizontalOffset +
          'px ' +
          outsideShadow_verticalOffset +
          'px ' +
          outsideShadow_blur +
          'px ' +
          outsideShadow_spread +
          'px'
        : ''
    const sBoxshadowInside =
      insideShadowColorRgb &&
      insideShadow_horizontalOffset &&
      insideShadow_verticalOffset &&
      insideShadow_blur &&
      insideShadow_spread
        ? 'inset ' +
          insideShadowColorRgb +
          ' ' +
          insideShadow_horizontalOffset +
          'px ' +
          insideShadow_verticalOffset +
          'px ' +
          insideShadow_blur +
          'px ' +
          insideShadow_spread +
          'px'
        : ''
    const sBoxShadow =
      sBoxshadowOutside +
      (sBoxshadowOutside && sBoxshadowInside ? ',' : '') +
      sBoxshadowInside

    if (!this._UccacWrapper.isInitialized()) {
      return (
        <View
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            height: '100%',
            borderRadius,
            backgroundColor: uccacwidgetBgColor,
            padding: 6,
          }}
        >
          <Text style={{ color: uccacwidgetFgColor }}>
            {' '}
            {i18n.t('ucChatAgentComponentIsDisabled')}
          </Text>
        </View>
      )
    } else {
      return (
        <>
          <View
            style={{
              flex: 1,
              borderRadius,
              backgroundColor: uccacwidgetBgColor,
              // boxShadow: sBoxShadow,
            }}
          >
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexWrap: 'wrap',
                height: Dimensions.get('screen').height - 200,
              }}
            >
              <View
                style={{
                  position: 'relative',
                  width: '50%',
                  height: '100%',
                  flexDirection: 'row',
                  gap: 10,
                }}
              >
                <View>
                  <DynamicView viewId='webchatqueue' />
                </View>
                <View>
                  <DynamicView viewId='webchatpickup' />
                </View>
                <View>
                  <DynamicView viewId='search' />
                </View>
              </View>
              <View
                style={{ position: 'relative', width: '50%', height: '100%' }}
                ref={this._uccacRootElementRef}
              >
                <DynamicView viewId='ucclientPanelRoot' style={{ flex: 1 }} />
              </View>
            </View>
            <View style={{ padding: 4 }}>
              <TouchableOpacity
                disabled={this.state.isRestartButtonDisabled}
                onPress={() => this.setState({ isShowModal: true })}
                style={{
                  backgroundColor: 'white',
                  width: 80,
                  height: 30,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>{i18n.t('restart')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType='slide'
            transparent={true}
            visible={this.state.isShowModal}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 200,
                  height: 'auto',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  borderRadius: 10,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}
              >
                <View>
                  <Text>{i18n.t('confirmRestartUccac')}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.setState({ isShowModal: false })}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this._onClickRestart()}
                      style={{
                        backgroundColor: '#5fac3f',
                        padding: 5,
                        borderRadius: 5,
                        width: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ color: '#ffffff' }}>Ok</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )
    }
  }
}
