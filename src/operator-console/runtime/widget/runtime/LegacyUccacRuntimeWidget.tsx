import { createRef } from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'

import SearchDialogIcon from '../../../../assets/searchdialog.png'
import WebChatPickupIcon from '../../../../assets/webchatpickup.png'
import WebChatQueueIcon from '../../../../assets/webchatqueue.png'

import { i18n } from '../../../i18n'
import { DynamicView } from '../../../lib/DynamicView'
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
  constructor(props) {
    super(props)
    const oc = BrekekeOperatorConsole.getStaticInstance()
    this._UccacWrapper = oc.getUccacWrapper()

    this.state = { isRestartButtonDisabled: false }
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
      acIconParentsWebchatqueue: this.refDynamicWebChatQueue,
      acIconParentsWebchatpickup: this.refDynamicWebChatPickup,
      acIconParentsSearch: this.refDynamicSearch,
    }
    this._uccacAc.init(initUccacAcOptions)

    const oc = BrekekeOperatorConsole.getStaticInstance()
    // TODO: Replace logic with Brekeke.ElementManager
    const startUCClientOptions = {
      ucclientWidgetParent: this._uccacRootElementRef,
      ucclientUcurl: this._UccacWrapper.getUcurl(),
      ucclientTenant: oc.getLoginTenantname(),
      ucclientUser: oc.getLoginUsername(),
      ucclientPass: oc.getLoginPassword(),
    }
    this.setState({ isRestartButtonDisabled: true }, () => {
      this._uccacAc.startUCClient(startUCClientOptions)
      setTimeout(() => {
        this.setState({ isRestartButtonDisabled: false })
      }, 8000)
    })
  }

  _initUccacAcTest(d) {
    if (this._uccacAc) {
      this._uccacAc.destroy()
      this._uccacAc = null
    }

    this._uccacAc = this._UccacWrapper.addUccacAc()
    const initUccacAcOptions = {
      acIconParentsWebchatqueue: this.refDynamicWebChatQueue,
      acIconParentsWebchatpickup: this.refDynamicWebChatPickup,
      acIconParentsSearch: this.refDynamicSearch,
    }
    this._uccacAc.init(initUccacAcOptions)

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const startUCClientOptions = {
      ucclientWidgetParent: this._uccacRootElementRef,
      ucclientUcurl: this._UccacWrapper.getUcurl(),
      ucclientTenant: oc.getLoginTenantname(),
      ucclientUser: oc.getLoginUsername(),
      ucclientPass: oc.getLoginPassword(),
    }
    this.setState({ isRestartButtonDisabled: true }, () => {
      this._uccacAc.startUCClient(startUCClientOptions)
      setTimeout(() => {
        this.setState({ isRestartButtonDisabled: false })
      }, 8000)
    })
  }

  _onClickRestart() {
    const bConfirm = confirm(i18n.t('confirmRestartUccac'))
    if (!bConfirm) {
      return
    }

    this.setState({ isRestartButtonDisabled: true }, () => {
      this._uccacAc.stopUCClient()

      const oc = BrekekeOperatorConsole.getStaticInstance()
      const startUCClientOptions = {
        ucclientWidgetParent: this._uccacRootElementRef,
        ucclientUcurl: this._UccacWrapper.getUcurl(),
        ucclientTenant: oc.getLoginTenantname(),
        ucclientUser: oc.getLoginUsername(),
        ucclientPass: oc.getLoginPassword(),
      }
      this._uccacAc.startUCClient(startUCClientOptions)
      setTimeout(() => {
        this.setState({ isRestartButtonDisabled: false })
      }, 8000)
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
              <DynamicView
                name={'webchatqueue'}
                ref={this.refDynamicWebChatQueue}
              ></DynamicView>
              <DynamicView
                name={'webchatpickup'}
                ref={this.refDynamicWebChatPickup}
              ></DynamicView>

              <DynamicView
                name={'search'}
                ref={this.refDynamicSearch}
              ></DynamicView>
              {/* <TouchableOpacity>
                <Image source={SearchDialogIcon as ImageSourcePropType} />
              </TouchableOpacity> */}
              <DynamicView
                name={'ucclientPanelRoot'}
                style={{ position: 'relative', width: '50%', height: '100%' }}
                ref={this._uccacRootElementRef}
              ></DynamicView>
              {/* <WebView
                source={{
                  html: `
    <html>
      <head> <script>
            function sendMessage() {
                  window.ReactNativeWebView.postMessage(window.Brekeke.UCAgentWidget);
                  console.log("Duy Phan console", !!window.Brekeke.UCAgentWidget)
                }
                  function sendErr() {
                  window.ReactNativeWebView.postMessage("Errp!");
                }
        </script>
        <script src="https://qavn01.brekeke.com:8443/uc/js/brekeke/ucagentwidget/ucagentwidget.js" onload="sendMessage()" onerror="sendErr()"></script>
       
      </head>
      <body>
        <span name={"webchatqueue"}></span>
        <span name={"webchatpickup"}></span>
        <span name={"search"}></span>
        <div name={"ucclientPanelRoot"}
              style={{position: "relative", width: "50%", height: "100%"}}>
        </div>
      </body>
    </html>
  `,
                }}
                onMessage={(e) =>console.log('#Duy Phan console mmm',e.nativeEvent.data)}
              /> */}
            </View>
            <View style={{ height: 30, padding: 4 }}>
              <TouchableOpacity
                disabled={this.state.isRestartButtonDisabled}
                onPress={this._onClickRestart.bind(this)}
              >
                <Text>{i18n.t('restart')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
  }
}
