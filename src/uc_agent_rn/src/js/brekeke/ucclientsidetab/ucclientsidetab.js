;(function () {
  var int = function (value) {
    return parseInt(value, 10) || 0
  }
  var string = function (value) {
    return String(value || value === 0 || value === false ? value : '')
  }
  var addPx = function (value) {
    return string(int(value)) === string(value) ? value + 'px' : string(value)
  }
  if (!window.$brUCClientSidetabCreated && window.$brUCClientSidetabOption) {
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

    var widgetProps = {
      url: string(p_o.widgetProps && p_o.widgetProps.url) || '',
      cacheBust: string(p_o.widgetProps && p_o.widgetProps.cacheBust) || '',
      fileRelease:
        string(p_o.widgetProps && p_o.widgetProps.fileRelease) ||
        'uccustomerwidget.min.js',
      windowTitle:
        string(p_o.widgetProps && p_o.widgetProps.windowTitle) || 'Chat',
      viewportContent:
        string(p_o.widgetProps && p_o.widgetProps.viewportContent) ||
        'width=device-width,initial-scale=1',
      charset: string(p_o.widgetProps && p_o.widgetProps.charset) || 'utf-8',
      language: string(p_o.widgetProps && p_o.widgetProps.language) || '',
      useWebRTC: Boolean(p_o.widgetProps && p_o.widgetProps.useWebRTC),
    }
    var cacheBustQuery = widgetProps.cacheBust
      ? '?' + widgetProps.cacheBust
      : ''

    var sidetabStyle = {
      className:
        string(p_o.sidetabStyle && p_o.sidetabStyle.className) ||
        'brUCClientSidetab',
      innerHTML: string(p_o.sidetabStyle && p_o.sidetabStyle.innerHTML) || ' ',
      width: string(p_o.sidetabStyle && p_o.sidetabStyle.width) || '50',
      height: string(p_o.sidetabStyle && p_o.sidetabStyle.height) || '100',
      widthOnHover:
        string(p_o.sidetabStyle && p_o.sidetabStyle.widthOnHover) || '200',
      heightOnHover:
        string(p_o.sidetabStyle && p_o.sidetabStyle.heightOnHover) || '100',
      left: string(p_o.sidetabStyle && p_o.sidetabStyle.left) || 'auto',
      top: string(p_o.sidetabStyle && p_o.sidetabStyle.top) || 'auto',
      right: string(p_o.sidetabStyle && p_o.sidetabStyle.right) || '0',
      bottom: string(p_o.sidetabStyle && p_o.sidetabStyle.bottom) || '100',
      background:
        string(p_o.sidetabStyle && p_o.sidetabStyle.background) || '#6ebb5b',
      opacity: string(p_o.sidetabStyle && p_o.sidetabStyle.opacity) || '.7',
      borderRadius:
        string(p_o.sidetabStyle && p_o.sidetabStyle.borderRadius) ||
        '8px 0px 0px 8px',
      transitionDuration:
        string(p_o.sidetabStyle && p_o.sidetabStyle.transitionDuration) ||
        '.3s',
      extraStyle: string(p_o.sidetabStyle && p_o.sidetabStyle.extraStyle) || '',
      extraStyleOnHover:
        string(p_o.sidetabStyle && p_o.sidetabStyle.extraStyleOnHover) || '',
      styleStorage:
        string(p_o.sidetabStyle && p_o.sidetabStyle.styleStorage) ||
        'sessionStorage.uc_ucclientsidetab_style',
      minimizedClassName:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedClassName) ||
        'brUCClientMinimized',
      minimizedWidth:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedWidth) || '',
      minimizedHeight:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedHeight) || '',
      minimizedWidthOnHover:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedWidthOnHover) ||
        '',
      minimizedHeightOnHover:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedHeightOnHover) ||
        '',
      minimizedLeft:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedLeft) || '',
      minimizedTop:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedTop) || '',
      minimizedRight:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedRight) || '',
      minimizedBottom:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedBottom) || '',
      minimizedBackground:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedBackground) || '',
      minimizedOpacity:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedOpacity) || '',
      minimizedBorderRadius:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedBorderRadius) ||
        '',
      minimizedTransitionDuration:
        string(
          p_o.sidetabStyle && p_o.sidetabStyle.minimizedTransitionDuration,
        ) || '',
      minimizedExtraStyle:
        string(p_o.sidetabStyle && p_o.sidetabStyle.minimizedExtraStyle) || '',
      minimizedExtraStyleOnHover:
        string(
          p_o.sidetabStyle && p_o.sidetabStyle.minimizedExtraStyleOnHover,
        ) || '',
      restoreClassName:
        string(p_o.sidetabStyle && p_o.sidetabStyle.restoreClassName) ||
        'brUCClientRestore',
      restoreBackground:
        string(p_o.sidetabStyle && p_o.sidetabStyle.restoreBackground) || '',
      restoreBorderRadius:
        string(p_o.sidetabStyle && p_o.sidetabStyle.restoreBorderRadius) || '',
      restoreExtraStyle:
        string(p_o.sidetabStyle && p_o.sidetabStyle.restoreExtraStyle) || '',
      restoreExtraStyleOnHover:
        string(p_o.sidetabStyle && p_o.sidetabStyle.restoreExtraStyleOnHover) ||
        '',
      notificationClassName:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationClassName) ||
        'brUCClientNotification',
      notificationLeft:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationLeft) || '-6',
      notificationTop:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationTop) || '-6',
      notificationWidth:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationWidth) || '16',
      notificationHeight:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationHeight) || '16',
      notificationBackground:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationBackground) ||
        'red',
      notificationColor:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationColor) ||
        'white',
      notificationFontFamily:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationFontFamily) ||
        '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
      notificationFontSize:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationFontSize) ||
        '14px',
      notificationFontWeight:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationFontWeight) ||
        '700',
      notificationExtraStyle:
        string(p_o.sidetabStyle && p_o.sidetabStyle.notificationExtraStyle) ||
        '',
      notificationBeforeContent:
        string(
          p_o.sidetabStyle && p_o.sidetabStyle.notificationBeforeContent,
        ) || '!',
      notificationBeforeExtraStyle:
        string(
          p_o.sidetabStyle && p_o.sidetabStyle.notificationBeforeExtraStyle,
        ) || '',
      onloadTimerInterval:
        string(p_o.sidetabStyle && p_o.sidetabStyle.onloadTimerInterval) ||
        '100',
      onloadTimerCntMaxDefault:
        string(p_o.sidetabStyle && p_o.sidetabStyle.onloadTimerCntMaxDefault) ||
        '60000',
      delay: string(p_o.sidetabStyle && p_o.sidetabStyle.delay) || '2000',
      parentId: string(p_o.sidetabStyle && p_o.sidetabStyle.parentId) || '',
      getParent: p_o.sidetabStyle && p_o.sidetabStyle.getParent,
      showFunction: p_o.sidetabStyle && p_o.sidetabStyle.showFunction,
      windowUrl: string(p_o.sidetabStyle && p_o.sidetabStyle.windowUrl) || '',
      windowName:
        string(p_o.sidetabStyle && p_o.sidetabStyle.windowName) ||
        'bruccustomerwidget',
      windowFeatures:
        string(p_o.sidetabStyle && p_o.sidetabStyle.windowFeatures) ||
        'top=0,left=0,width=300,height=400,resizable=yes',
      onBeforePopup: p_o.sidetabStyle && p_o.sidetabStyle.onBeforePopup,
      onAfterPopup: p_o.sidetabStyle && p_o.sidetabStyle.onAfterPopup,
    }
    var widgetStyle = {
      className:
        string(p_o.widgetStyle && p_o.widgetStyle.className) ||
        'brUCClientWidget',
      width: string(p_o.widgetStyle && p_o.widgetStyle.width) || '320',
      height: string(p_o.widgetStyle && p_o.widgetStyle.height) || '480',
      minWidth: string(p_o.widgetStyle && p_o.widgetStyle.minWidth) || '320',
      minHeight: string(p_o.widgetStyle && p_o.widgetStyle.minHeight) || '480',
      left: string(p_o.widgetStyle && p_o.widgetStyle.left) || 'auto',
      top: string(p_o.widgetStyle && p_o.widgetStyle.top) || 'auto',
      right: string(p_o.widgetStyle && p_o.widgetStyle.right) || '10',
      bottom: string(p_o.widgetStyle && p_o.widgetStyle.bottom) || '10',
      background:
        string(p_o.widgetStyle && p_o.widgetStyle.background) || '#6ebb5b',
      extraStyle: string(p_o.widgetStyle && p_o.widgetStyle.extraStyle) || '',
      contentClassName:
        string(p_o.widgetStyle && p_o.widgetStyle.contentClassName) ||
        'brUCClientWidgetContent',
      contentLeft:
        string(p_o.widgetStyle && p_o.widgetStyle.contentLeft) || '1',
      contentTop: string(p_o.widgetStyle && p_o.widgetStyle.contentTop) || '28',
      contentRight:
        string(p_o.widgetStyle && p_o.widgetStyle.contentRight) || '1',
      contentBottom:
        string(p_o.widgetStyle && p_o.widgetStyle.contentBottom) || '1',
      contentExtraStyle:
        string(p_o.widgetStyle && p_o.widgetStyle.contentExtraStyle) || '',
      positionStorage:
        string(p_o.widgetStyle && p_o.widgetStyle.positionStorage) ||
        'sessionStorage.uc_ucclientwidget_position',
      draggable: !Boolean(
        p_o.widgetStyle && p_o.widgetStyle.draggable === false,
      ),
      draggableClassName:
        string(p_o.widgetStyle && p_o.widgetStyle.draggableClassName) ||
        'brUCClientDraggable',
      draggableHeight:
        string(p_o.widgetStyle && p_o.widgetStyle.draggableHeight) || '28',
      draggableExtraStyle:
        string(p_o.widgetStyle && p_o.widgetStyle.draggableExtraStyle) || '',
      resizable:
        string(p_o.widgetStyle && p_o.widgetStyle.resizable) ||
        'n,e,s,w,ne,se,sw,nw',
      resizableClassName:
        string(p_o.widgetStyle && p_o.widgetStyle.resizableClassName) ||
        'brUCClientResizable',
      resizableWidth:
        string(p_o.widgetStyle && p_o.widgetStyle.resizableWidth) || '8',
      resizableHeight:
        string(p_o.widgetStyle && p_o.widgetStyle.resizableHeight) || '8',
      resizableExtraStyle:
        string(p_o.widgetStyle && p_o.widgetStyle.resizableExtraStyle) || '',
      closeable: string(p_o.widgetStyle && p_o.widgetStyle.closeable) || 'true',
      closeableClassName:
        string(p_o.widgetStyle && p_o.widgetStyle.closeableClassName) ||
        'brUCClientCloseable brUCClientCloseIcon',
      closeableRight:
        string(p_o.widgetStyle && p_o.widgetStyle.closeableRight) || '0',
      closeableTop:
        string(p_o.widgetStyle && p_o.widgetStyle.closeableTop) || '0',
      closeableWidth:
        string(p_o.widgetStyle && p_o.widgetStyle.closeableWidth) || '28',
      closeableHeight:
        string(p_o.widgetStyle && p_o.widgetStyle.closeableHeight) || '28',
      closeableExtraStyle:
        string(p_o.widgetStyle && p_o.widgetStyle.closeableExtraStyle) || '',
      minimizable: !Boolean(
        p_o.widgetStyle && p_o.widgetStyle.minimizable === false,
      ),
      minimizableClassName:
        string(p_o.widgetStyle && p_o.widgetStyle.minimizableClassName) ||
        'brUCClientMinimizable brUCClientMinimizeIcon',
      minimizableRight:
        string(p_o.widgetStyle && p_o.widgetStyle.minimizableRight) || '28',
      minimizableTop:
        string(p_o.widgetStyle && p_o.widgetStyle.minimizableTop) || '0',
      minimizableWidth:
        string(p_o.widgetStyle && p_o.widgetStyle.minimizableWidth) || '28',
      minimizableHeight:
        string(p_o.widgetStyle && p_o.widgetStyle.minimizableHeight) || '28',
      minimizableExtraStyle:
        string(p_o.widgetStyle && p_o.widgetStyle.minimizableExtraStyle) || '',
      extraRule: string(p_o.widgetStyle && p_o.widgetStyle.extraRule) || '',
    }
    var css = document.createElement('style')
    var rule = document.createTextNode(
      '\
            .brUCClientSidetab {\
                position: fixed;\
                width: ' +
        addPx(sidetabStyle.width) +
        ';\
                height: ' +
        addPx(sidetabStyle.height) +
        ';\
                left: ' +
        addPx(sidetabStyle.left) +
        ';\
                top: ' +
        addPx(sidetabStyle.top) +
        ';\
                right: ' +
        addPx(sidetabStyle.right) +
        ';\
                bottom: ' +
        addPx(sidetabStyle.bottom) +
        ';\
                background: ' +
        sidetabStyle.background +
        ';\
                cursor: pointer;\
                opacity: ' +
        sidetabStyle.opacity +
        ';\
                -moz-border-radius: ' +
        sidetabStyle.borderRadius +
        ';\
                border-radius: ' +
        sidetabStyle.borderRadius +
        ';\
                transition-property: width, height;\
                -webkit-transition-duration: ' +
        sidetabStyle.transitionDuration +
        ';\
                -moz-transition-duration: ' +
        sidetabStyle.transitionDuration +
        ';\
                transition-duration: ' +
        sidetabStyle.transitionDuration +
        ';\
                ' +
        sidetabStyle.extraStyle +
        '\
            }\
            .brUCClientSidetab:hover {\
                width: ' +
        addPx(sidetabStyle.widthOnHover) +
        ';\
                height: ' +
        addPx(sidetabStyle.heightOnHover) +
        ';\
                ' +
        sidetabStyle.extraStyleOnHover +
        '\
            }\
            .brUCClientMinimized {\
                position: fixed;\
                width: ' +
        addPx(sidetabStyle.minimizedWidth || sidetabStyle.width) +
        ';\
                height: ' +
        addPx(sidetabStyle.minimizedHeight || sidetabStyle.height) +
        ';\
                left: ' +
        addPx(sidetabStyle.minimizedLeft || sidetabStyle.left) +
        ';\
                top: ' +
        addPx(sidetabStyle.minimizedTop || sidetabStyle.top) +
        ';\
                right: ' +
        addPx(sidetabStyle.minimizedRight || sidetabStyle.right) +
        ';\
                bottom: ' +
        addPx(sidetabStyle.minimizedBottom || sidetabStyle.bottom) +
        ';\
                background: ' +
        (sidetabStyle.minimizedBackground || sidetabStyle.background) +
        ';\
                cursor: pointer;\
                opacity: ' +
        (sidetabStyle.minimizedOpacity || sidetabStyle.opacity) +
        ';\
                -moz-border-radius: ' +
        (sidetabStyle.minimizedBorderRadius || sidetabStyle.borderRadius) +
        ';\
                border-radius: ' +
        (sidetabStyle.minimizedBorderRadius || sidetabStyle.borderRadius) +
        ';\
                transition-property: width, height;\
                -webkit-transition-duration: ' +
        (sidetabStyle.minimizedTransitionDuration ||
          sidetabStyle.transitionDuration) +
        ';\
                -moz-transition-duration: ' +
        (sidetabStyle.minimizedTransitionDuration ||
          sidetabStyle.transitionDuration) +
        ';\
                transition-duration: ' +
        (sidetabStyle.minimizedTransitionDuration ||
          sidetabStyle.transitionDuration) +
        ';\
                ' +
        (sidetabStyle.minimizedExtraStyle || sidetabStyle.extraStyle) +
        '\
            }\
            .brUCClientMinimized:hover {\
                width: ' +
        addPx(sidetabStyle.minimizedWidthOnHover || sidetabStyle.widthOnHover) +
        ';\
                height: ' +
        addPx(
          sidetabStyle.minimizedHeightOnHover || sidetabStyle.heightOnHover,
        ) +
        ';\
                ' +
        (sidetabStyle.minimizedExtraStyleOnHover ||
          sidetabStyle.extraStyleOnHover) +
        '\
            }\
            .brUCClientMinimized>:not(.brUCClientRestore) {\
                visibility: hidden;\
            }\
            .brUCClientRestore {\
                position: absolute;\
                left: 0;\
                top: 0;\
                width: 100%;\
                height: 100%;\
                background: ' +
        (sidetabStyle.restoreBackground ||
          sidetabStyle.minimizedBackground ||
          sidetabStyle.background) +
        ';\
                cursor: pointer;\
                -moz-border-radius: ' +
        (sidetabStyle.restoreBorderRadius ||
          sidetabStyle.minimizedBorderRadius ||
          sidetabStyle.borderRadius) +
        ';\
                border-radius: ' +
        (sidetabStyle.restoreBorderRadius ||
          sidetabStyle.minimizedBorderRadius ||
          sidetabStyle.borderRadius) +
        ';\
                ' +
        sidetabStyle.restoreExtraStyle +
        '\
            }\
            .brUCClientRestore:hover {\
                ' +
        sidetabStyle.restoreExtraStyleOnHover +
        '\
            }\
            .brUCClientNotification {\
                position: absolute;\
                left: ' +
        addPx(sidetabStyle.notificationLeft) +
        ';\
                top: ' +
        addPx(sidetabStyle.notificationTop) +
        ';\
                width: ' +
        addPx(sidetabStyle.notificationWidth) +
        ';\
                height: ' +
        addPx(sidetabStyle.notificationHeight) +
        ';\
                line-height: ' +
        addPx(sidetabStyle.notificationHeight) +
        ';\
                border-radius: 50%;\
                background: ' +
        sidetabStyle.notificationBackground +
        ';\
                color: ' +
        sidetabStyle.notificationColor +
        ';\
                text-align: center;\
                font-family: ' +
        sidetabStyle.notificationFontFamily +
        ';\
                font-size: ' +
        sidetabStyle.notificationFontSize +
        ';\
                font-weight: ' +
        sidetabStyle.notificationFontWeight +
        ';\
                ' +
        sidetabStyle.notificationExtraStyle +
        '\
            }\
            .brUCClientNotification::before {\
                content: "' +
        sidetabStyle.notificationBeforeContent +
        '";\
                ' +
        sidetabStyle.notificationBeforeExtraStyle +
        '\
            }\
            .brUCClientWidget {\
                position: fixed;\
                width: ' +
        addPx(widgetStyle.width) +
        ';\
                height: ' +
        addPx(widgetStyle.height) +
        ';\
                min-width: ' +
        addPx(widgetStyle.minWidth) +
        ';\
                min-height: ' +
        addPx(widgetStyle.minHeight) +
        ';\
                left: ' +
        addPx(widgetStyle.left) +
        ';\
                top: ' +
        addPx(widgetStyle.top) +
        ';\
                right: ' +
        addPx(widgetStyle.right) +
        ';\
                bottom: ' +
        addPx(widgetStyle.bottom) +
        ';\
                background: ' +
        widgetStyle.background +
        ';\
                ' +
        widgetStyle.extraStyle +
        '\
            }\
            .brUCClientWidgetContent {\
                position: absolute;\
                left: ' +
        addPx(widgetStyle.contentLeft) +
        ';\
                top: ' +
        addPx(widgetStyle.contentTop) +
        ';\
                right: ' +
        addPx(widgetStyle.contentRight) +
        ';\
                bottom: ' +
        addPx(widgetStyle.contentBottom) +
        ';\
                ' +
        widgetStyle.contentExtraStyle +
        '\
            }\
            .brUCClientDraggable {\
                position: absolute;\
                left: 0px;\
                top: 0px;\
                right: 0px;\
                height: ' +
        addPx(widgetStyle.draggableHeight) +
        ';\
                cursor: move;\
                user-select: none;\
                ' +
        widgetStyle.draggableExtraStyle +
        '\
            }\
            .brUCClientResizable {\
                position: absolute;\
                user-select: none;\
                ' +
        widgetStyle.resizableExtraStyle +
        '\
            }\
            .brUCClientResizable.n {\
                left: 0px;\
                top: 0px;\
                right: 0px;\
                height: ' +
        addPx(widgetStyle.resizableHeight) +
        ';\
                cursor: ns-resize;\
            }\
            .brUCClientResizable.e {\
                top: 0px;\
                right: 0px;\
                bottom: 0px;\
                width: ' +
        addPx(widgetStyle.resizableWidth) +
        ';\
                cursor: ew-resize;\
            }\
            .brUCClientResizable.s {\
                right: 0px;\
                bottom: 0px;\
                left: 0px;\
                height: ' +
        addPx(widgetStyle.resizableHeight) +
        ';\
                cursor: ns-resize;\
            }\
            .brUCClientResizable.w {\
                bottom: 0px;\
                left: 0px;\
                top: 0px;\
                width: ' +
        addPx(widgetStyle.resizableWidth) +
        ';\
                cursor: ew-resize;\
            }\
            .brUCClientResizable.ne {\
                top: 0px;\
                right: 0px;\
                width: ' +
        addPx(widgetStyle.resizableWidth) +
        ';\
                height: ' +
        addPx(widgetStyle.resizableHeight) +
        ';\
                cursor: nesw-resize;\
            }\
            .brUCClientResizable.se {\
                right: 0px;\
                bottom: 0px;\
                width: ' +
        addPx(widgetStyle.resizableWidth) +
        ';\
                height: ' +
        addPx(widgetStyle.resizableHeight) +
        ';\
                cursor: nwse-resize;\
            }\
            .brUCClientResizable.sw {\
                bottom: 0px;\
                left: 0px;\
                width: ' +
        addPx(widgetStyle.resizableWidth) +
        ';\
                height: ' +
        addPx(widgetStyle.resizableHeight) +
        ';\
                cursor: nesw-resize;\
            }\
            .brUCClientResizable.nw {\
                left: 0px;\
                top: 0px;\
                width: ' +
        addPx(widgetStyle.resizableWidth) +
        ';\
                height: ' +
        addPx(widgetStyle.resizableHeight) +
        ';\
                cursor: nwse-resize;\
            }\
            .brUCClientCloseable {\
                position: absolute;\
                right: ' +
        addPx(widgetStyle.closeableRight) +
        ';\
                top: ' +
        addPx(widgetStyle.closeableTop) +
        ';\
                width: ' +
        addPx(widgetStyle.closeableWidth) +
        ';\
                height: ' +
        addPx(widgetStyle.closeableHeight) +
        ';\
                cursor: pointer;\
                user-select: none;\
                ' +
        widgetStyle.closeableExtraStyle +
        '\
            }\
            .brUCClientCloseIcon::before {\
                content: "";\
                display: block;\
                position: absolute;\
                left: 33.33%;\
                top: 33.33%;\
                width: 47.15%;\
                height: 1px;\
                transform: rotate(45deg);\
                transform-origin: left top;\
                background: white;\
            }\
            .brUCClientCloseIcon::after {\
                content: "";\
                display: block;\
                position: absolute;\
                right: 33.33%;\
                top: 33.33%;\
                width: 47.15%;\
                height: 1px;\
                transform: rotate(-45deg);\
                transform-origin: right top;\
                background: white;\
            }\
            .brUCClientCloseIcon:hover::before {\
                background: black;\
            }\
            .brUCClientCloseIcon:hover::after {\
                background: black;\
            }\
            .brUCClientMinimizable {\
                position: absolute;\
                right: ' +
        addPx(widgetStyle.minimizableRight) +
        ';\
                top: ' +
        addPx(widgetStyle.minimizableTop) +
        ';\
                width: ' +
        addPx(widgetStyle.minimizableWidth) +
        ';\
                height: ' +
        addPx(widgetStyle.minimizableHeight) +
        ';\
                cursor: pointer;\
                user-select: none;\
                ' +
        widgetStyle.minimizableExtraStyle +
        '\
            }\
            .brUCClientMinimizeIcon::before {\
                content: "";\
                display: block;\
                position: absolute;\
                left: 33.33%;\
                top: 50%;\
                right: 33.33%;\
                height: 1px;\
                background: white;\
            }\
            .brUCClientMinimizeIcon:hover::before {\
                background: black;\
            }\
            ' +
        widgetStyle.extraRule +
        '\
        ',
    )
    css.type = 'text/css'
    if (css.styleSheet) {
      css.styleSheet.cssText = rule.nodeValue
    } else {
      css.appendChild(rule)
    }
    document.getElementsByTagName('head')[0].appendChild(css)

    var sidetabDiv = document.createElement('div')
    var widgetContent = null
    sidetabDiv.className = sidetabStyle.className
    sidetabDiv.innerHTML = sidetabStyle.innerHTML

    // restore style
    var styleInfo = {}
    var styleStorage = null
    var styleStorageKey = null
    if (sidetabStyle.styleStorage) {
      var styleStorageArray = string(sidetabStyle.styleStorage).split('.')
      if (styleStorageArray.length >= 2) {
        styleStorage = (document.defaultView || window)[
          styleStorageArray.shift()
        ]
        while (styleStorage && styleStorageArray.length >= 2) {
          styleStorage = styleStorage[styleStorageArray.shift()]
        }
        if (styleStorage && styleStorageArray.length === 1) {
          styleStorageKey = styleStorageArray[0]
          try {
            var item = styleStorage.getItem(styleStorageKey)
            if (item) {
              styleInfo = JSON.parse(item) || styleInfo
            }
          } catch (ex) {
            console.warn(
              'ucclientsidetab.js styleStorage.getItem() failed. styleStorage=' +
                sidetabStyle.styleStorage +
                ', ex=' +
                ex,
            )
          }
        } else {
          console.warn(
            'ucclientsidetab.js invalid styleStorage=' +
              sidetabStyle.styleStorage,
          )
        }
      }
    }
    Object.keys(styleInfo).forEach(function (p) {
      if (
        styleInfo[p] === 'NONE' &&
        document.referrer.indexOf(window.location.hostname) === -1
      ) {
        delete styleInfo[p]
        try {
          styleStorage.setItem(styleStorageKey, JSON.stringify(styleInfo))
        } catch (ex) {
          console.warn(
            'ucclientsidetab.js styleStorage.setItem() failed. styleStorage=' +
              sidetabStyle.styleStorage +
              ', ex=' +
              ex,
          )
        }
      } else {
        sidetabDiv.style[p] = styleInfo[p]
      }
    })

    if (p_o.widgetProps && p_o.widgetProps.widgetType === '2') {
      // Embedded
      if (p_o.events) {
        for (var k in p_o.events) {
          if (p_o.events[k] && p_o.events[k].bind) {
            initOption.handler[k] = p_o.events[k].bind(p_o.events, p_o)
          }
        }
      }

      var script0 = document.getElementsByTagName('script')[0]
      var script
      script = document.createElement('script')
      script.async = true
      script.setAttribute('charset', 'utf-8')
      script.src =
        widgetProps.url +
        'js/brekeke/uccustomerwidget/' +
        widgetProps.fileRelease +
        cacheBustQuery
      script.type = 'text/javascript'
      script0.parentNode.insertBefore(script, script0)
      if (widgetProps.useWebRTC) {
        script = document.createElement('script')
        script.async = true
        script.setAttribute('charset', 'utf-8')
        script.src =
          widgetProps.url + 'js/jssip/jssip-3.2.15.js' + cacheBustQuery
        script.type = 'text/javascript'
        script0.parentNode.insertBefore(script, script0)
        script = document.createElement('script')
        script.async = true
        script.setAttribute('charset', 'utf-8')
        script.src =
          widgetProps.url +
          'js/brekeke/webrtcclient/webrtcclient.js' +
          cacheBustQuery
        script.type = 'text/javascript'
        script0.parentNode.insertBefore(script, script0)
      }
      script = document.createElement('link')
      script.rel = 'stylesheet'
      script.href =
        widgetProps.url + 'css/uccustomerwidget.css' + cacheBustQuery
      script0.parentNode.insertBefore(script, script0)

      // check reenter_storage
      var isReentering = false
      var reenter_info = {}
      string(
        p_o.initOption &&
          p_o.initOption.configurations &&
          p_o.initOption.configurations.reenterTypeStorage,
      )
        .split(':')[0]
        .split(',')
        .some(function (reenter_storage) {
          var storage_array = reenter_storage.split('.')
          if (storage_array.length >= 2) {
            var storage = (document.defaultView || window)[
              storage_array.shift()
            ]
            while (storage && storage_array.length >= 2) {
              storage = storage[storage_array.shift()]
            }
            if (storage && storage_array.length === 1) {
              var key = storage_array[0]
              try {
                var reenter_code = storage.getItem(key)
                if (reenter_code) {
                  console.debug(
                    'ucclientsidetab.js storage.getItem() ok. reenter_storage=' +
                      reenter_storage +
                      ', reenter_code=' +
                      reenter_code,
                  )
                  var reenter_code_array = string(reenter_code).split(',')
                  reenter_info.expires = reenter_code_array[0]
                  reenter_info.reenter_conf_id = reenter_code_array[1]
                  reenter_info.reenter_user_id = reenter_code_array[2]
                  return true
                }
              } catch (ex) {
                console.warn(
                  'ucclientsidetab.js storage.getItem() failed. reenter_storage=' +
                    reenter_storage +
                    ', ex=' +
                    ex,
                )
              }
            } else {
              console.warn(
                'ucclientsidetab.js invalid reenter_storage=' + reenter_storage,
              )
            }
          }
        })
      if (
        Date.now() <= int(reenter_info.expires) &&
        reenter_info.reenter_conf_id &&
        reenter_info.reenter_user_id
      ) {
        // reenter conference
        isReentering = true
        sidetabStyle.delay = '0'
      }

      var onloadTimerCnt = 0
      var onloadTimerInterval = int(sidetabStyle.onloadTimerInterval) || 100
      var onloadTimerCntMax =
        Math.max(
          int(sidetabStyle.onloadTimerCntMaxDefault),
          int(sidetabStyle.delay),
        ) / onloadTimerInterval
      var onloadTimer = setInterval(function () {
        onloadTimerCnt++
        if (
          typeof Brekeke === 'undefined' ||
          typeof Brekeke.UcUiAction === 'undefined' ||
          typeof Brekeke.UcUiStore === 'undefined' ||
          typeof Brekeke.UCCustomerWidget === 'undefined'
        ) {
          if (onloadTimerCnt >= onloadTimerCntMax) {
            clearInterval(onloadTimer)
            console.warn('onloadTimerCnt=' + onloadTimerCnt)
          }
          return
        }
        if (
          widgetProps.useWebRTC &&
          (typeof Brekeke.WebrtcClient === 'undefined' ||
            typeof JsSIP === 'undefined')
        ) {
          if (onloadTimerCnt >= onloadTimerCntMax) {
            clearInterval(onloadTimer)
            console.warn(
              'onloadTimerCnt=' + onloadTimerCnt + ' (WebrtcClient not found)',
            )
          }
          return
        }
        if (!sidetabDiv.parentElement) {
          if (onloadTimerCnt >= onloadTimerCntMax) {
            clearInterval(onloadTimer)
            console.warn(
              'onloadTimerCnt=' +
                onloadTimerCnt +
                ' (!sidetabDiv.parentElement)',
            )
          }
          return
        }
        clearInterval(onloadTimer)
        console.debug('onloadTimerCnt=' + onloadTimerCnt)

        if (isReentering) {
          // init automatically
          initUiData()
        } else {
          // init after clicking sidetabDiv
          sidetabDiv.addEventListener('click', initUiData)
        }
      }, onloadTimerInterval)
      var initUiData = function () {
        // clear sidetabDiv
        sidetabDiv.removeEventListener('click', initUiData)
        sidetabDiv.className = widgetStyle.className
        if (widgetContent) {
          sidetabDiv.removeChild(widgetContent)
        }
        var sidetabDivParentListeners = {}

        // create widgetContent
        widgetContent = document.createElement('div')
        widgetContent.className = widgetStyle.contentClassName
        sidetabDiv.appendChild(widgetContent)

        // restore position
        var positionInfo = {}
        var positionStorage = null
        var positionStorageKey = null
        if (widgetStyle.positionStorage) {
          var positionStorageArray = string(widgetStyle.positionStorage).split(
            '.',
          )
          if (positionStorageArray.length >= 2) {
            positionStorage = (document.defaultView || window)[
              positionStorageArray.shift()
            ]
            while (positionStorage && positionStorageArray.length >= 2) {
              positionStorage = positionStorage[positionStorageArray.shift()]
            }
            if (positionStorage && positionStorageArray.length === 1) {
              positionStorageKey = positionStorageArray[0]
              try {
                var item = positionStorage.getItem(positionStorageKey)
                if (item) {
                  positionInfo = JSON.parse(item) || positionInfo
                }
              } catch (ex) {
                console.warn(
                  'ucclientsidetab.js storage.getItem() failed. positionStorage=' +
                    widgetStyle.positionStorage +
                    ', ex=' +
                    ex,
                )
              }
            } else {
              console.warn(
                'ucclientsidetab.js invalid positionStorage=' +
                  widgetStyle.positionStorage,
              )
            }
          }
        }
        Object.keys(positionInfo).forEach(function (p) {
          if (widgetStyle[p] !== 'auto') {
            sidetabDiv.style[p] = positionInfo[p] + 'px'
          } else {
            delete positionInfo[p]
          }
        })

        // create draggableDiv
        if (widgetStyle.draggable) {
          var draggableDiv = document.createElement('div')
          draggableDiv.className = widgetStyle.draggableClassName
          sidetabDiv.appendChild(draggableDiv)
          var dragInfo = null
          draggableDiv.addEventListener('mousedown', function (e) {
            dragInfo = {
              mousedownX: e.clientX,
              mousedownY: e.clientY,
              orgLeft:
                typeof positionInfo.left !== 'undefined'
                  ? positionInfo.left
                  : int(widgetStyle.left),
              orgTop:
                typeof positionInfo.top !== 'undefined'
                  ? positionInfo.top
                  : int(widgetStyle.top),
              orgRight:
                typeof positionInfo.right !== 'undefined'
                  ? positionInfo.right
                  : int(widgetStyle.right),
              orgBottom:
                typeof positionInfo.bottom !== 'undefined'
                  ? positionInfo.bottom
                  : int(widgetStyle.bottom),
            }
          })
          sidetabDiv.parentElement.addEventListener(
            'mousemove',
            (sidetabDivParentListeners[
              'mousemove,' + Object.keys(sidetabDivParentListeners).length
            ] = function (e) {
              if (!dragInfo) {
                return
              }
              if (widgetStyle.left !== 'auto') {
                positionInfo.left =
                  dragInfo.orgLeft + e.clientX - dragInfo.mousedownX
                sidetabDiv.style.left = positionInfo.left + 'px'
              } else {
                positionInfo.right =
                  dragInfo.orgRight - e.clientX + dragInfo.mousedownX
                sidetabDiv.style.right = positionInfo.right + 'px'
              }
              if (widgetStyle.top !== 'auto') {
                positionInfo.top =
                  dragInfo.orgTop + e.clientY - dragInfo.mousedownY
                sidetabDiv.style.top = positionInfo.top + 'px'
              } else {
                positionInfo.bottom =
                  dragInfo.orgBottom - e.clientY + dragInfo.mousedownY
                sidetabDiv.style.bottom = positionInfo.bottom + 'px'
              }
            }),
          )
          sidetabDiv.parentElement.addEventListener(
            'mouseup',
            (sidetabDivParentListeners[
              'mouseup,' + Object.keys(sidetabDivParentListeners).length
            ] = function (e) {
              if (!dragInfo) {
                return
              }
              dragInfo = null
              if (positionStorage && positionStorageKey) {
                try {
                  positionStorage.setItem(
                    positionStorageKey,
                    JSON.stringify(positionInfo),
                  )
                } catch (ex) {
                  console.warn(
                    'ucclientsidetab.js positionStorage.setItem() failed. positionStorage=' +
                      widgetStyle.positionStorage +
                      ', ex=' +
                      ex,
                  )
                }
              }
            }),
          )
        }

        // create resizableDiv
        if (widgetStyle.resizable) {
          var resizeInfo = null
          string(widgetStyle.resizable)
            .split(',')
            .forEach(function (direction) {
              var resizableDiv = document.createElement('div')
              resizableDiv.className =
                widgetStyle.resizableClassName + ' ' + direction
              sidetabDiv.appendChild(resizableDiv)
              resizableDiv.addEventListener('mousedown', function (e) {
                resizeInfo = {
                  direction: direction,
                  mousedownX: e.clientX,
                  mousedownY: e.clientY,
                  orgLeft:
                    typeof positionInfo.left !== 'undefined'
                      ? positionInfo.left
                      : int(widgetStyle.left),
                  orgTop:
                    typeof positionInfo.top !== 'undefined'
                      ? positionInfo.top
                      : int(widgetStyle.top),
                  orgRight:
                    typeof positionInfo.right !== 'undefined'
                      ? positionInfo.right
                      : int(widgetStyle.right),
                  orgBottom:
                    typeof positionInfo.bottom !== 'undefined'
                      ? positionInfo.bottom
                      : int(widgetStyle.bottom),
                  orgWidth:
                    typeof positionInfo.width !== 'undefined'
                      ? positionInfo.width
                      : int(widgetStyle.width),
                  orgHeight:
                    typeof positionInfo.height !== 'undefined'
                      ? positionInfo.height
                      : int(widgetStyle.height),
                }
              })
            })
          sidetabDiv.parentElement.addEventListener(
            'mousemove',
            (sidetabDivParentListeners[
              'mousemove,' + Object.keys(sidetabDivParentListeners).length
            ] = function (e) {
              if (!resizeInfo) {
                return
              }
              if (resizeInfo.direction.indexOf('n') !== -1) {
                positionInfo.height =
                  resizeInfo.orgHeight - e.clientY + resizeInfo.mousedownY
                if (positionInfo.height < int(widgetStyle.minHeight)) {
                  positionInfo.height = int(widgetStyle.minHeight)
                } else {
                  sidetabDiv.style.height = positionInfo.height + 'px'
                  if (widgetStyle.top !== 'auto') {
                    positionInfo.top =
                      resizeInfo.orgTop + e.clientY - resizeInfo.mousedownY
                    sidetabDiv.style.top = positionInfo.top + 'px'
                  }
                }
              }
              if (resizeInfo.direction.indexOf('e') !== -1) {
                positionInfo.width =
                  resizeInfo.orgWidth + e.clientX - resizeInfo.mousedownX
                if (positionInfo.width < int(widgetStyle.minWidth)) {
                  positionInfo.width = int(widgetStyle.minWidth)
                } else {
                  sidetabDiv.style.width = positionInfo.width + 'px'
                  if (widgetStyle.right !== 'auto') {
                    positionInfo.right =
                      resizeInfo.orgRight - e.clientX + resizeInfo.mousedownX
                    sidetabDiv.style.right = positionInfo.right + 'px'
                  }
                }
              }
              if (resizeInfo.direction.indexOf('s') !== -1) {
                positionInfo.height =
                  resizeInfo.orgHeight + e.clientY - resizeInfo.mousedownY
                if (positionInfo.height < int(widgetStyle.minHeight)) {
                  positionInfo.height = int(widgetStyle.minHeight)
                } else {
                  sidetabDiv.style.height = positionInfo.height + 'px'
                  if (widgetStyle.bottom !== 'auto') {
                    positionInfo.bottom =
                      resizeInfo.orgBottom - e.clientY + resizeInfo.mousedownY
                    sidetabDiv.style.bottom = positionInfo.bottom + 'px'
                  }
                }
              }
              if (resizeInfo.direction.indexOf('w') !== -1) {
                positionInfo.width =
                  resizeInfo.orgWidth - e.clientX + resizeInfo.mousedownX
                if (positionInfo.width < int(widgetStyle.minWidth)) {
                  positionInfo.width = int(widgetStyle.minWidth)
                } else {
                  sidetabDiv.style.width = positionInfo.width + 'px'
                  if (widgetStyle.left !== 'auto') {
                    positionInfo.left =
                      resizeInfo.orgLeft + e.clientX - resizeInfo.mousedownX
                    sidetabDiv.style.left = positionInfo.left + 'px'
                  }
                }
              }
            }),
          )
          sidetabDiv.parentElement.addEventListener(
            'mouseup',
            (sidetabDivParentListeners[
              'mouseup,' + Object.keys(sidetabDivParentListeners).length
            ] = function (e) {
              if (!resizeInfo) {
                return
              }
              resizeInfo = null
              if (positionStorage && positionStorageKey) {
                try {
                  positionStorage.setItem(
                    positionStorageKey,
                    JSON.stringify(positionInfo),
                  )
                } catch (ex) {
                  console.warn(
                    'ucclientsidetab.js positionStorage.setItem() failed. positionStorage=' +
                      widgetStyle.positionStorage +
                      ', ex=' +
                      ex,
                  )
                }
              }
            }),
          )
        }

        // create closeableDiv
        if (
          widgetStyle.closeable &&
          widgetStyle.closeable !== 'false' &&
          widgetStyle.closeable !== '0'
        ) {
          var closeableDiv = document.createElement('div')
          closeableDiv.className = widgetStyle.closeableClassName
          sidetabDiv.appendChild(closeableDiv)
          closeableDiv.addEventListener('click', function (e) {
            ud.signOutIntentionally({ confirms: 1 }).then(function (value) {
              if (value && value.cancelled) {
                return
              }
              // destroy uc client and doms
              ud.destroyApp()
              ucUiStoreInstance.destroy()
              widgetContent = null
              Object.keys(sidetabDivParentListeners).forEach(function (p) {
                try {
                  sidetabDiv.parentElement.removeEventListener(
                    p.split(',')[0],
                    sidetabDivParentListeners[p],
                  )
                } catch (ex) {
                  console.warn(
                    'sidetabDiv.parentElement.removeEventListener() failed. p=' +
                      p +
                      ', ex=' +
                      ex,
                  )
                }
              })
              Object.keys(positionInfo).forEach(function (p) {
                sidetabDiv.style[p] = ''
              })
              sidetabDiv.className = sidetabStyle.className
              sidetabDiv.innerHTML = sidetabStyle.innerHTML
              if (widgetStyle.closeable === '1') {
                setTimeout(
                  sidetabDiv.addEventListener.bind(
                    sidetabDiv,
                    'click',
                    initUiData,
                  ),
                  0,
                )
              } else {
                sidetabDiv.style.display = 'none'
                if (
                  widgetStyle.closeable === '3' ||
                  widgetStyle.closeable === '4'
                ) {
                  styleInfo.display =
                    widgetStyle.closeable === '3' ? 'NONE' : 'none'
                  if (styleStorage && styleStorageKey) {
                    try {
                      styleStorage.setItem(
                        styleStorageKey,
                        JSON.stringify(styleInfo),
                      )
                    } catch (ex) {
                      console.warn(
                        'ucclientsidetab.js styleStorage.setItem() failed. styleStorage=' +
                          sidetabStyle.styleStorage +
                          ', ex=' +
                          ex,
                      )
                    }
                  }
                }
              }
            })
          })
        }

        // create minimizableDiv, restoreDiv, notificationDiv
        var notificationDiv = null
        if (widgetStyle.minimizable) {
          var minimizableDiv = document.createElement('div')
          minimizableDiv.className = widgetStyle.minimizableClassName
          sidetabDiv.appendChild(minimizableDiv)
          minimizableDiv.addEventListener('click', function (e) {
            notificationDiv.style.display = 'none'
            restoreDiv.style.display = ''
            Object.keys(positionInfo).forEach(function (p) {
              sidetabDiv.style[p] = ''
            })
            sidetabDiv.className = sidetabStyle.minimizedClassName
          })

          var restoreDiv = document.createElement('div')
          restoreDiv.className = sidetabStyle.restoreClassName
          restoreDiv.style.display = 'none'
          sidetabDiv.appendChild(restoreDiv)
          restoreDiv.addEventListener('click', function (e) {
            sidetabDiv.className = widgetStyle.className
            Object.keys(positionInfo).forEach(function (p) {
              sidetabDiv.style[p] = positionInfo[p] + 'px'
            })
            restoreDiv.style.display = 'none'
          })

          notificationDiv = document.createElement('div')
          notificationDiv.className = sidetabStyle.notificationClassName
          notificationDiv.style.display = 'none'
          restoreDiv.appendChild(notificationDiv)
        }

        // initialize uc client
        initOption.parentElement = widgetContent

        var ucUiActionInstance = new Brekeke.UcUiAction()
        var ucUiStoreInstance = new Brekeke.UcUiStore({
          ucUiAction: ucUiActionInstance,
        })
        ucUiStoreInstance.addHandler({
          checkRequiresNotification: function (evObj) {
            notificationDiv.style.display = ''
          },
        })
        initOption.ucUiAction = ucUiActionInstance
        initOption.ucUiStore = ucUiStoreInstance
        if (widgetProps.useWebRTC) {
          initOption.phone = new Brekeke.WebrtcClient.Phone({
            logLevel: 'debug',
          })
        }

        initOption.handler.customerChatReconnectButton_onClick = function () {
          initUiData()
        }

        var ud = new Brekeke.UCCustomerWidget.uiData(initOption)
        ud.render()
        var language = widgetProps.language
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
      }
    } else {
      // Pop-up
      sidetabDiv.addEventListener('click', function () {
        var subWindow = window.open(
          '',
          sidetabStyle.windowName,
          sidetabStyle.windowFeatures,
        )
        if (!subWindow.$brUCCustomerWidgetCreated) {
          var f = function () {
            if (p_o.events && typeof p_o.events.onBeforePopup === 'function') {
              p_o.events.onBeforePopup(p_o, subWindow)
            }
            if (
              sidetabStyle.onBeforePopup &&
              typeof sidetabStyle.onBeforePopup === 'function'
            ) {
              sidetabStyle.onBeforePopup(p_o)
            }
            var initOptionEscapedStr = JSON.stringify(initOption)
              .replace(/\\/g, '\\\\')
              .replace(/"/g, '\\"')
            subWindow.document.open()
            subWindow.$brUCCustomerWidgetCreated =
              '\
                            <!doctype html>\
                            <html>\
                            <head>\
                                <meta charset="' +
              widgetProps.charset +
              '">\
                                <meta name="viewport" content="' +
              widgetProps.viewportContent +
              '">\
                                <title>\
                                    ' +
              widgetProps.windowTitle +
              '\
                                </title>\
                                <link rel="stylesheet" href="' +
              widgetProps.url +
              'css/uccustomerwidget.css' +
              cacheBustQuery +
              '" />\
                                <style>\
                                    body {\
                                        overflow-y: hidden;\
                                    }\
                                </style>\
                            </head>\
                            <body>\
                                <div id="content">\
                                </div>\
                                <script charset="utf-8" src="' +
              widgetProps.url +
              'js/brekeke/uccustomerwidget/' +
              widgetProps.fileRelease +
              cacheBustQuery +
              '" async></script>\
                                ' +
              (widgetProps.useWebRTC
                ? '\
                                <script charset="utf-8" src="' +
                  widgetProps.url +
                  'js/jssip/jssip-3.2.15.js' +
                  cacheBustQuery +
                  '" async></script>\
                                <script charset="utf-8" src="' +
                  widgetProps.url +
                  'js/brekeke/webrtcclient/webrtcclient.js' +
                  cacheBustQuery +
                  '" async></script>\
                                '
                : '') +
              '\
                                <script>\
                                    var ucUiActionInstance;\
                                    var ucUiStoreInstance;\
                                    var onloadTimerCnt = 0;\
                                    var onloadTimer = setInterval(function() {\
                                        onloadTimerCnt++;\
                                        if (typeof Brekeke === "undefined" || typeof Brekeke.UcUiAction === "undefined" || typeof Brekeke.UcUiStore === "undefined" || typeof Brekeke.UCCustomerWidget === "undefined") {\
                                            if (onloadTimerCnt >= 600) {\
                                                clearInterval(onloadTimer);\
                                                console.warn("onloadTimerCnt=" + onloadTimerCnt);\
                                            }\
                                            return;\
                                        }\
                                        ' +
              (widgetProps.useWebRTC
                ? '\
                                        if (typeof Brekeke.WebrtcClient === "undefined" || typeof JsSIP === "undefined") {\
                                            if (onloadTimerCnt >= 600) {\
                                                clearInterval(onloadTimer);\
                                                console.warn("onloadTimerCnt=" + onloadTimerCnt + " (WebrtcClient not found)");\
                                            }\
                                            return;\
                                        }\
                                        '
                : '') +
              '\
                                        clearInterval(onloadTimer);\
                                        console.debug("onloadTimerCnt=" + onloadTimerCnt);\
                                        ucUiActionInstance = new Brekeke.UcUiAction();\
                                        ucUiStoreInstance = new Brekeke.UcUiStore({ ucUiAction: ucUiActionInstance });\
                                        var option = "' +
              initOptionEscapedStr +
              '";\
                                        try {\
                                            option = JSON.parse(option);\
                                            option.ucUiAction = ucUiActionInstance;\
                                            option.ucUiStore = ucUiStoreInstance;\
                                            ' +
              (widgetProps.useWebRTC
                ? '\
                                            option.phone = new Brekeke.WebrtcClient.Phone({ logLevel: "debug" });\
                                            '
                : '') +
              '\
                                            option.handler = {};\
                                            var events = window.opener && window.opener.$brUCClientSidetabOption && window.opener.$brUCClientSidetabOption.events;\
                                            if (events) {\
                                                for (var k in events) {\
                                                    if (events[k] && events[k].bind) {\
                                                        option.handler[k] = events[k].bind(events, window.opener.$brUCClientSidetabOption);\
                                                    }\
                                                }\
                                            }\
                                            option.handler.customerChatReconnectButton_onClick = function() {\
                                                document.open();\
                                                document.write($brUCCustomerWidgetCreated);\
                                                document.close();\
                                            };\
                                            var ud = new Brekeke.UCCustomerWidget.uiData(option);\
                                            ud.render();\
                                            var language = "' +
              widgetProps.language +
              '";\
                                            if (!language || language === "auto" || language === "user") {\
                                                language = ((navigator.browserLanguage || navigator.language || navigator.userLanguage || "") + "en").substr(0, 2);\
                                            }\
                                            if (language === "en") {\
                                                language = "default";\
                                            }\
                                            Brekeke.UCCustomerWidget.uawMsgs.loadLanguage(language, ud.render.bind(ud));\
                                            window.$brUCUiDataInstance = ud;\
                                        } catch (e) {\
                                            document.getElementById("content").innerHTML = e.message;\
                                        }\
                                    }, 100);\
                                </script>\
                            </body>\
                        '
            subWindow.document.write(subWindow.$brUCCustomerWidgetCreated)
            subWindow.document.close()
            if (p_o.events && typeof p_o.events.onAfterPopup === 'function') {
              p_o.events.onAfterPopup(p_o, subWindow)
            }
            if (
              sidetabStyle.onAfterPopup &&
              typeof sidetabStyle.onAfterPopup === 'function'
            ) {
              sidetabStyle.onAfterPopup(p_o)
            }
          }
          if (sidetabStyle.windowUrl) {
            var hrefOrg = subWindow.location.href
            subWindow.location.href = sidetabStyle.windowUrl
            var intervalID = setInterval(function () {
              if (subWindow.location.href !== hrefOrg) {
                clearInterval(intervalID)
                f()
                subWindow.history.pushState(
                  { page: 'backed' },
                  null,
                  sidetabStyle.windowUrl,
                )
                subWindow.history.pushState(
                  { page: 'forwarded' },
                  null,
                  sidetabStyle.windowUrl,
                )
                subWindow.onpopstate = function (event) {
                  if (event && event.state && event.state.page === 'backed') {
                    subWindow.close()
                    subWindow.history.pushState(
                      { page: 'forwarded' },
                      null,
                      sidetabStyle.windowUrl,
                    )
                  }
                }
              }
            }, 10)
          } else {
            f()
          }
        }
        subWindow.focus()
      })
    }

    if (
      sidetabStyle.showFunction &&
      typeof sidetabStyle.showFunction === 'function'
    ) {
      sidetabStyle.showFunction(sidetabDiv)
    } else {
      var getParent
      if (
        sidetabStyle.getParent &&
        typeof sidetabStyle.getParent === 'function'
      ) {
        getParent = sidetabStyle.getParent
      } else if (sidetabStyle.parentId) {
        getParent = function () {
          return document.getElementById(sidetabStyle.parentId)
        }
      } else {
        getParent = function () {
          return document.body
        }
      }
      var appendChildTryCount = 0
      var appendChild = function () {
        var parent = getParent()
        if (parent && parent.appendChild) {
          parent.appendChild(sidetabDiv)
        } else if (appendChildTryCount < 30) {
          appendChildTryCount++
          setTimeout(appendChild, 100)
        }
      }
      if (document.referrer.indexOf(window.location.hostname) !== -1) {
        appendChild()
      } else {
        setTimeout(appendChild, int(sidetabStyle.delay))
      }
    }

    window.$brUCClientSidetabCreated = true
  }
})()
