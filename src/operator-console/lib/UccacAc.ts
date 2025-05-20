import type { Uccac } from './Uccac'

const UCCAC_AC_STATES = {
  deinit: 0,
  init: 1,
}
export class UccacAc {
  _state: number
  _UccacAsParent: Uccac
  _AgentComponent
  _UccacAcNo: number
  _onAcErrorOccurredFunctionForUser
  _confirmMessageWhenClosingWebchat
  constructor(uccacAsParent, uccacAcNo) {
    this._state = UCCAC_AC_STATES.deinit
    this._UccacAsParent = uccacAsParent
    this._AgentComponent = new window.Brekeke.UCAgentWidget.AgentComponent()
    this._UccacAcNo = uccacAcNo
    this._onAcErrorOccurredFunctionForUser = null
    this._confirmMessageWhenClosingWebchat = null
  }

  getUccacAcNo() {
    return this._UccacAcNo
  }

  init(options) {
    if (this._state !== UCCAC_AC_STATES.deinit) {
      return false
    }
    this._confirmMessageWhenClosingWebchat =
      options.confirmMessageWhenClosingWebchat
    this._onAcErrorOccurredFunctionForUser = options.onAcErrorOccurredFunction
    let acLoggerLevel
    if (options.acLoggerLevel) {
      acLoggerLevel = options.acLoggerLevel
    } else {
      acLoggerLevel = 'all' // !default
    }
    let acConsoleLogType
    if (options.acConsoleLogType) {
      acConsoleLogType = options.acConsoleLogType
    } else {
      acConsoleLogType = null // !default
    }
    let acConfigurations

    if (options.acConfigurations) {
      acConfigurations = options.acConfigurations
    } else {
      acConfigurations = {
        queueLines: 2,
        undockable: true,
        panelHeader: true,
        headerButtonsVisible: true,
        queuePanel: true
      } // !default
    }

    const this_ = this
    const acHandler = {
      errorOccurred(ev) {
        this_._onAcErrorOccurred(ev)
      },
      webchatCreated(ev) {
        this_._onWebchatCreated(ev)
      },
      webchatOpened(ev) {
        this_._onWebchatOpened(ev)
      },
      webchatStarted(ev) {
        this_._onWebchatStarted(ev)
      },
      webchatFocused(ev) {
        this_._onWebchatFocused(ev)
      },
      webchatClosing(ev, continueEvent) {
        this_._onWebchatClosing(ev, continueEvent)
      },
      webchatClosed(ev) {
        this_._onWebchatClosed(ev)
      },
      webchatInfoChanged(ev) {
        this_._onWebchatInfoChanged(ev)
      },
      webchatStateChanged(ev) {
        this_._onWebchatStateChanged(ev)
      },
      iconClicked(ev) {
        this_._onIconClicked(ev)
      },
      replyButtonClicked(ev) {
        this_._onReplyButtonClicked(ev)
      },
      searchDialogChanged(ev) {
        this_._onSearchDialogChanged(ev)
      },
      searchConditionsChanged(ev) {
        this_._onSearchConditionsChanged(ev)
      },
      searchResultChanged(ev) {
        this_._onSearchResultChanged(ev)
      },
      searchResultSelected(ev) {
        this_._onSearchResultSelected(ev)
      },
      searchDialogButtonClicked(ev) {
        this_._onSearchDialogButtonClicked(ev)
      },
    }
    console.log('#Duy Phan console (options.acConfigurations', acConfigurations)
    const acOptions = {
      iconParents: {
        webchatqueue: options['acIconParentsWebchatqueue'],
        webchatpickup: options['acIconParentsWebchatpickup'],
        search: options['acIconParentsSearch'],
      },
      loggerLevel: acLoggerLevel,
      consoleLogType: acConsoleLogType,
      configurations: acConfigurations,
      language: options.acLanguage,
      handler: acHandler,
      phone: true,
    }
    this._AgentComponent.initComponent(acOptions)

    this._state = UCCAC_AC_STATES.init
    return true
  }

  _onAcErrorOccurred(ev) {
    // console.error(ev.errorMessage + ' (' + ev.errorCode + ')');
    if (this._onAcErrorOccurredFunctionForUser) {
      this._onAcErrorOccurredFunctionForUser(ev)
    }
  }

  _onWebchatCreated(ev) {}

  _onWebchatOpened(ev) {}

  _onWebchatStarted(ev) {
    const webchatId = ev.webchatId
  }

  _onWebchatFocused(ev) {}

  _onWebchatClosing(ev, continueEvent) {
    if (this._confirmMessageWhenClosingWebchat) {
      const bConfirm = confirm(this._confirmMessageWhenClosingWebchat)
      continueEvent(bConfirm)
    } else {
      continueEvent(true)
    }
    // const bConfirm = confirm("Do you want to close the webchat?");
    // continueEvent( bConfirm );
  }

  _onWebchatClosed(ev) {}

  _onWebchatInfoChanged(ev) {}

  _onWebchatStateChanged(ev) {}

  _onIconClicked(ev) {}

  _onReplyButtonClicked(ev) {}

  _onSearchDialogChanged(ev) {}

  _onSearchConditionsChanged(ev) {}

  _onSearchResultChanged(ev) {}

  _onSearchResultSelected(ev) {}

  _onSearchDialogButtonClicked(ev) {}

  startUCClient(options) {
    let ucclientOffline
    if (options.ucclientOffline === true) {
      ucclientOffline = true
    } else {
      ucclientOffline = false
    }
    let ucclientWidgetParent
    if (options.ucclientWidgetParent) {
      ucclientWidgetParent = options.ucclientWidgetParent
    } else {
      ucclientWidgetParent = null
    }

    let url = options['ucclientUcurl']
    if (url[url.length - 1] !== '/') {
      url += '/'
    }

    const ucclientSIgnInOption = {
      url,
      tenant: options['ucclientTenant'],
      user: options['ucclientUser'],
      pass: options['ucclientPass'],
    }
    const ucclientOptions = {
      offline: ucclientOffline,
      widgetParent: ucclientWidgetParent,
      signInOption: ucclientSIgnInOption,
    }
    this._AgentComponent.startUCClient(ucclientOptions)
  }

  stopUCClient() {
    this._AgentComponent.stopUCClient()
  }

  deinit() {
    if (this._state !== UCCAC_AC_STATES.init) {
      return false
    }
    this._onAcErrorOccurredFunctionForUser = null
    this._confirmMessageWhenClosingWebchat = null
    this._AgentComponent.destroyComponent()

    this._state = UCCAC_AC_STATES.deinit
    return true
  }

  destroy() {
    this._UccacAsParent.deinitAndRemoveUccacAc(this._UccacAcNo)
  }
}
