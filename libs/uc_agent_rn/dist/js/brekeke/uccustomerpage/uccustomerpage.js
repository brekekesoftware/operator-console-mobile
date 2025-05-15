;(function () {
  var string = function (value) {
    return String(value || value === 0 || value === false ? value : '')
  }
  if (window.$brUCClientSidetabOption) {
    var p_o = window.$brUCClientSidetabOption

    var initOption = {
      parentElement: 'content',
      configurations: {
        signInFormStyles:
          (p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.signInFormStyles) ||
          {},
        signInButtonLabel: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.signInButtonLabel,
        ),
        signInButtonInnerHTML: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.signInButtonInnerHTML,
        ),
        profinfoInputsLabel: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.profinfoInputsLabel,
        ),
        profinfoInputsInnerHTML: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.profinfoInputsInnerHTML,
        ),
        profinfoInputs:
          (p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.profinfoInputs) ||
          [],
        webchatOptionsLabel: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.webchatOptionsLabel,
        ),
        webchatOptionsInnerHTML: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.webchatOptionsInnerHTML,
        ),
        webchatOptions:
          (p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.webchatOptions) ||
          [],
        autoSignIn: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.autoSignIn === false,
        ),
        confirmUnload: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.confirmUnload === false,
        ),
        casualChat: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.casualChat === false,
        ),
        sendButton: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.sendButton === false,
        ),
        cameraButton: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.cameraButton === false,
        ),
        screenButton: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.screenButton === false,
        ),
        fullscreenButton: Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.fullscreenButton,
        ),
        theaterButton: Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.theaterButton,
        ),
        webRTCTypeName: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.webRTCTypeName,
        ),
        ringTone: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.ringTone === false,
        ),
        ringbackTone: !Boolean(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.ringbackTone === false,
        ),
        menuOptions: (p_o.initOption &&
          p_o.initOption.configurations &&
          p_o.initOption.configurations.menuOptions) || ['end'],
        iceGatheringWarning: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.iceGatheringWarning,
        ),
        iceConnectionWarning: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.iceConnectionWarning,
        ),
        socketKeepAlive: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.socketKeepAlive,
        ),
        reenterTypeStorage: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.reenterTypeStorage,
        ),
        renderingInterval: string(
          p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.renderingInterval,
        ),
        webchatTags:
          (p_o.initOption &&
            p_o.initOption.configurations &&
            p_o.initOption.configurations.webchatTags) ||
          {},
      },
      signInParams: {
        url:
          string(
            p_o.initOption &&
              p_o.initOption.signInParams &&
              p_o.initOption.signInParams.url,
          ) || '',
        tenant:
          string(
            p_o.initOption &&
              p_o.initOption.signInParams &&
              p_o.initOption.signInParams.tenant,
          ) || '-',
      },
      dndEnabled: !Boolean(
        p_o.initOption && p_o.initOption.dndEnabled === false,
      ),
      bindsFunctions: !Boolean(
        p_o.initOption && p_o.initOption.bindsFunctions === false,
      ),
      handler: {},
    }
    if (p_o.events) {
      for (var k in p_o.events) {
        if (p_o.events[k] && p_o.events[k].bind) {
          initOption.handler[k] = p_o.events[k].bind(p_o.events, p_o)
        }
      }
    }

    document.title =
      string(p_o.widgetProps && p_o.widgetProps.windowTitle) || 'Chat'
    var url = string(p_o.widgetProps && p_o.widgetProps.url) || ''
    var cacheBust = string(p_o.widgetProps && p_o.widgetProps.cacheBust) || ''
    var fileRelease =
      string(p_o.widgetProps && p_o.widgetProps.fileRelease) ||
      'uccustomerwidget.min.js'
    var language = string(p_o.widgetProps && p_o.widgetProps.language) || ''
    var useWebRTC = Boolean(p_o.widgetProps && p_o.widgetProps.useWebRTC)
    var cacheBustQuery = cacheBust ? '?' + cacheBust : ''

    var script0 = document.getElementsByTagName('script')[0]
    var script
    script = document.createElement('script')
    script.async = true
    script.setAttribute('charset', 'utf-8')
    script.src =
      url + 'js/brekeke/uccustomerwidget/' + fileRelease + cacheBustQuery
    script.type = 'text/javascript'
    script0.parentNode.insertBefore(script, script0)
    if (useWebRTC) {
      script = document.createElement('script')
      script.async = true
      script.setAttribute('charset', 'utf-8')
      script.src = url + 'js/jssip/jssip-3.2.15.js' + cacheBustQuery
      script.type = 'text/javascript'
      script0.parentNode.insertBefore(script, script0)
      script = document.createElement('script')
      script.async = true
      script.setAttribute('charset', 'utf-8')
      script.src =
        url + 'js/brekeke/webrtcclient/webrtcclient.js' + cacheBustQuery
      script.type = 'text/javascript'
      script0.parentNode.insertBefore(script, script0)
    }
    script = document.createElement('link')
    script.rel = 'stylesheet'
    script.href = url + 'css/uccustomerwidget.css' + cacheBustQuery
    script0.parentNode.insertBefore(script, script0)

    var content = document.createElement('div')
    content.id = 'content'
    document.body.appendChild(content)

    var onloadTimerCnt = 0
    var onloadTimer = setInterval(function () {
      onloadTimerCnt++
      if (
        typeof Brekeke === 'undefined' ||
        typeof Brekeke.UcUiAction === 'undefined' ||
        typeof Brekeke.UcUiStore === 'undefined' ||
        typeof Brekeke.UCCustomerWidget === 'undefined'
      ) {
        if (onloadTimerCnt >= 600) {
          clearInterval(onloadTimer)
          console.warn('onloadTimerCnt=' + onloadTimerCnt)
        }
        return
      }
      if (
        useWebRTC &&
        (typeof Brekeke.WebrtcClient === 'undefined' ||
          typeof JsSIP === 'undefined')
      ) {
        if (onloadTimerCnt >= 600) {
          clearInterval(onloadTimer)
          console.warn(
            'onloadTimerCnt=' + onloadTimerCnt + ' (WebrtcClient not found)',
          )
        }
        return
      }
      clearInterval(onloadTimer)
      console.debug('onloadTimerCnt=' + onloadTimerCnt)

      var ucUiActionInstance = new Brekeke.UcUiAction()
      var ucUiStoreInstance = new Brekeke.UcUiStore({
        ucUiAction: ucUiActionInstance,
      })
      initOption.ucUiAction = ucUiActionInstance
      initOption.ucUiStore = ucUiStoreInstance
      if (useWebRTC) {
        initOption.phone = new Brekeke.WebrtcClient.Phone({ logLevel: 'debug' })
      }
      initOption.handler.customerChatReconnectButton_onClick =
        location.reload.bind(location)
      var ud = new Brekeke.UCCustomerWidget.uiData(initOption)
      ud.render()
      if (!language || language === 'auto' || language === 'user') {
        language = (
          (navigator.browserLanguage ||
            navigator.language ||
            navigator.userLanguage ||
            '') + 'en'
        ).substr(0, 2)
      }
      if (language === 'en') {
        language = 'default'
      }
      Brekeke.UCCustomerWidget.uawMsgs.loadLanguage(
        language,
        ud.render.bind(ud),
      )
      window.$brUCUiDataInstance = ud
    }, 100)
  } else {
    console.warn(
      'window.$brUCClientSidetabOption=' + window.$brUCClientSidetabOption,
    )
  }
})()
