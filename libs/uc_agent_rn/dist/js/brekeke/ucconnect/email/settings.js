if (typeof Brekeke === 'undefined') {
  var Brekeke = {}
}
var BLIB = Brekeke
if (typeof Brekeke.ucconnect === 'undefined') {
  Brekeke.ucconnect = {}
}

if (typeof Brekeke.ucconnect.email_settings === 'undefined') {
  Brekeke.ucconnect.email_settings = {}
}

Brekeke.ucconnect.email_settings.start = function (
  token,
  node,
  baseurl,
  mt,
  tenant,
  sa,
  chatClient,
) {
  var me = {}
  if (tenant) {
    if (typeof Brekeke.ucconnect.email_settings.tenant === 'undefined') {
      Brekeke.ucconnect.email_settings.tenant = {}
    }
    Brekeke.ucconnect.email_settings.tenant[tenant] = me
  } else {
    Brekeke.ucconnect.email_settings.admin = me
  }

  ;(function (_me) {
    var escapeHTML = function (unsafe) {
      unsafe = unsafe || ''
      return unsafe.replace(/[&<"']/g, function (m) {
        switch (m) {
          case '&':
            return '&amp;'
          case '<':
            return '&lt;'
          case '"':
            return '&quot;'
          default:
            return '&#039;'
        }
      })
    }

    var isValidAppName = function (str) {
      if (!str) {
        return false
      }
      if (str.match(/^[A-Za-z0-9_]*$/)) {
        return true
      } else {
        return false
      }
    }

    _me.getAuthToken = function () {
      return this.chatClient.getChatSessionToken() + ' ' + (this.tenant || '-')
    }

    _me.start = function (token, node, baseurl, mt, tenant, sa, chatClient) {
      var _me = this
      _me.token = token
      _me.mt = mt
      _me.tenant = tenant
      _me.sa = sa
      _me.chatClient = chatClient
      if (!baseurl) {
        var u = window.location.href
        var idx = u.indexOf('/', 10)
        idx = u.indexOf('/', idx + 1)
        baseurl = u.substring(0, idx)
      } else {
        if (baseurl.endsWith('/')) {
          baseurl = baseurl.substring(0, baseurl.length - 1)
        }
      }
      _me.baseurl = baseurl
      _me.node = node
      node.innerHTML =
        '<div class="ucconnect_settings email_settings" ><form><div class="email_header" ></div><div><div class="ucconnect_message email_message" style="display:none;" ></div></div><div class="email_main" ></div><div class="email_footer" ></div></form></div>'
      _me.nodeSettings = node.getElementsByClassName('email_settings')[0]
      _me.nodeHeader = node.getElementsByClassName('email_header')[0]
      _me.nodeMsg = node.getElementsByClassName('email_message')[0]
      _me.nodeMain = node.getElementsByClassName('email_main')[0]
      _me.nodeFooter = node.getElementsByClassName('email_footer')[0]
      _me.messageId = 0
      _me.showApplicationList()
      window.addEventListener(
        'message',
        function (event) {
          console.log(event)
          _me.recvMessage(event)
        },
        false,
      )
    }

    _me.recvMessage = function (event) {
      if (event.data != 'refresh') {
        console.log(event)
        return
      }
      if (this.editAppName) {
        this.showApplicationEdit(this.editAppName)
      }
    }

    _me.showMessage = function (msg, timeRemove) {
      this.nodeMsg.innerHTML = msg
      this.nodeMsg.style.display = 'block'
      if (timeRemove > 0) {
        this.messageId++
        let m = this.messageId
        var _me = this
        setTimeout(function () {
          if (m == _me.messageId) {
            _me.nodeMsg.style.display = 'none'
          }
        }, timeRemove)
      }
    }

    _me.msgboxOkCancel = function (msg, fOk, fCancel) {
      var _me = this
      if (!this.nodeMsgBoxOkCancelBg) {
        var mbBg = document.createElement('DIV')
        mbBg.classList.add('msgbox_bg')
        mbBg.style.position = 'fixed'
        mbBg.style.top = '0'
        mbBg.style.left = '0'
        mbBg.style.right = '0'
        mbBg.style.bottom = '0'
        mbBg.style.backgroundColor = '#EEEEEE'
        mbBg.style.opacity = '0.5'
        mbBg.style.virticalAlign = 'middle'
        mbBg.style.zIndex = 9998
        var mb = document.createElement('DIV')
        mb.innerHTML =
          '<P>' +
          escapeHTML(msg) +
          '</P><form><INPUT type="button" name="ok" /><INPUT type="button" name="cancel" /></form>'
        mb.style.zIndex = 9999
        mb.style.position = 'fixed'
        mb.style.top = '50%'
        mb.style.left = '50%'
        mb.style.transform = 'translate(-50%, -50%)'
        mb.classList.add('msgbox')
        var ok = mb.querySelector("[name='ok']")
        var cancel = mb.querySelector("[name='cancel']")
        ok.value = 'OK'
        cancel.value = 'Cancel'
        ok.addEventListener('click', function () {
          _me.nodeSettings.removeChild(_me.nodeMsgBoxOkCancelBg)
          _me.nodeSettings.removeChild(_me.nodeMsgBoxOkCancel)
          _me.nodeMsgBoxOkCancelBg = null
          _me.nodeMsgBoxOkCancel = null
          fOk()
        })
        cancel.addEventListener('click', function () {
          _me.nodeSettings.removeChild(_me.nodeMsgBoxOkCancelBg)
          _me.nodeSettings.removeChild(_me.nodeMsgBoxOkCancel)
          _me.nodeMsgBoxOkCancelBg = null
          _me.nodeMsgBoxOkCancel = null
          fCancel()
        })
        this.nodeMsgBoxOkCancelBg = mbBg
        this.nodeMsgBoxOkCancel = mb
        _me.nodeSettings.appendChild(mbBg)
        _me.nodeSettings.appendChild(mb)
      }
    }

    _me.loadConfig = function () {
      var _me = this
      fetch(this.baseurl + '/email_rest/config/api_base_url', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        referrer: 'no-referrer', // *client, no-referrer
        headers: {
          Accept: 'application/json',
          Authorization: 'b-token ' + this.getAuthToken(),
          //'Origin': window.location.protocol + "://" + window.location.hostname
        },
      })
        .then(function (response) {
          if (response.status == 401) {
            _me.showMessage('Please close this screen and try again.', 45000)
            return
          }
          return response.json()
        })
        .then(function (json) {
          if (!json) {
            return
          }
          var hr = document.createElement('HR')
          _me.nodeMain.appendChild(hr)
          var h2 = document.createElement('H2')
          h2.innerHTML = 'General settings'
          _me.nodeMain.appendChild(h2)
          var div = document.createElement('DIV')
          div.innerHTML =
            '<LABEL>API base URL</LABEL><INPUT type="TEXT" name="api_base_url" class="long" maxlength="300" ><BR /><INPUT TYPE="button" name="btn_save_config" >'
          var api_base_url = div.querySelector("[name='api_base_url']")
          var btn_save_config = div.querySelector("[name='btn_save_config']")
          btn_save_config.value = 'Save'
          _me.nodeMain.appendChild(div)
          if (json.api_base_url) {
            api_base_url.value = json.api_base_url
          } else {
            var u = window.location.href
            if (true) {
              //u.startsWith( "https://" ) ){
              var idx = u.indexOf('/', 10)
              var o = u.substring(0, idx)
              idx = u.indexOf('/', idx + 1)
              api_base_url.value = u.substring(0, idx + 1)
              _me.saveApiBaseUrl()
            } else {
              api_base_url.value = ''
            }
          }
          btn_save_config.addEventListener('click', function (e) {
            _me.saveApiBaseUrl(e)
          })
        })
        .catch(function (e) {
          _me.showMessage('Error: ' + e.message, 15000)
        })
    }

    _me.saveApiBaseUrl = function () {
      var _me = this
      var api_base_url = _me.nodeMain.querySelector("[name='api_base_url']")
      var abu = api_base_url.value
      if (
        abu.startsWith('http://') == false &&
        abu.startsWith('https://') == false
      ) {
        _me.showMessage(
          'The API base URL needs to begin with http or https.',
          15000,
        )
        return
      }
      abu = abu.trim()
      if (abu.endsWith('/') == false) {
        abu = abu + '/'
      }
      if (abu.startsWith('http') == false) {
        abu = 'https://' + abu
      }
      if (api_base_url.value != abu) {
        api_base_url.value = abu
      }
      fetch(
        this.baseurl +
          '/email_rest/config/api_base_url?val=' +
          encodeURIComponent(abu),
        {
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          referrer: 'no-referrer', // *client, no-referrer
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'b-token ' + this.getAuthToken(),
            //'Origin': window.location.protocol + "://" + window.location.hostname
          },
        },
      )
        .then(function (response) {
          if (response.status == 401) {
            _me.showMessage('Please close this screen and try again.', 45000)
            return
          }
          if (response.status != 200) {
            _me.showMessage(
              'Failed to save the configuration.' + (response.message || ''),
              10000,
            )
          }
          return
        })
        .catch(function (e) {
          _me.showMessage('Error: ' + e.message, 15000)
        })
    }

    _me.loadApplicationList = function () {
      var _me = this
      _me.editAppName = null
      fetch(this.baseurl + '/email_rest/apps', {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        referrer: 'no-referrer', // *client, no-referrer
        headers: {
          Accept: 'application/json',
          Authorization: 'b-token ' + this.getAuthToken(),
          //'Origin': window.location.protocol + "://" + window.location.hostname
        },
      })
        .then(function (response) {
          if (response.status == 401) {
            _me.showMessage('Please close this screen and try again.', 45000)
            return
          }
          return response.json()
        })
        .then(function (json) {
          if (!json) {
            return
          }
          _me.nodeMain.innerHTML = ''
          _me.apps = json
          var table = document.createElement('TABLE')
          var tr = table.insertRow(-1)
          var td = tr.insertCell(-1)
          td.innerHTML = 'App name'
          td.classList.add('list_header')
          if (!_me.tenant && _me.mt) {
            td = tr.insertCell(-1)
            td.innerHTML = 'Tenant'
            td.classList.add('list_header')
          }
          td = tr.insertCell(-1)
          td.innerHTML = 'Descriptions'
          td.classList.add('list_header')
          td = tr.insertCell(-1)
          td.innerHTML = ''
          td.classList.add('list_header')
          for (let i = 0; i < json.length; i++) {
            var app = _me.apps[i]
            var r = table.insertRow(-1)
            var cName = r.insertCell(-1)
            cName.innerHTML = escapeHTML(app.name)
            cName.classList.add('name')
            if (!_me.tenant && _me.mt) {
              var cTenant = r.insertCell(-1)
              cTenant.innerHTML = escapeHTML(app.ex_id1)
            }
            var cNotes = r.insertCell(-1)
            cNotes.innerHTML = escapeHTML(app.notes)
            cNotes.classList.add('notes')

            var cDelete = r.insertCell(-1)
            cDelete.innerHTML = 'Delete'
            cDelete.classList.add('delete')
            cName.addEventListener(
              'click',
              (function (nm) {
                return function () {
                  _me.showApplicationEdit(nm)
                }
              })(app.name),
            )
            cDelete.addEventListener(
              'click',
              (function (nm) {
                return function () {
                  _me.msgboxOkCancel(
                    'Do you really want to delete the application "' +
                      escapeHTML(nm) +
                      "'?",
                    function () {
                      _me.deleteApplication(nm)
                    },
                    function () {},
                  )
                }
              })(app.name),
            )
            r.classList.add('app_row')
          }
          table.classList.add('app_list')
          _me.nodeMain.appendChild(table)

          var btns = document.createElement('DIV')
          btns.innerHTML =
            '<input type="button" class="email_btn_add" value="Add a new application" >'
          _me.nodeBtnAdd = btns.getElementsByClassName('email_btn_add')[0]
          _me.nodeMain.appendChild(btns)
          _me.nodeBtnAdd.addEventListener('click', function (e) {
            _me.btnAddClicked(e)
          })
          if (sa) {
            //_me.loadConfig();
          }
        })
        .catch(function (e) {
          _me.showMessage('Error: ' + e.message, 15000)
        })
    }

    _me.deleteApplication = function (name) {
      var _me = this
      fetch(this.baseurl + '/email_rest/apps/' + encodeURIComponent(name), {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        referrer: 'no-referrer', // *client, no-referrer
        headers: {
          Accept: 'application/json',
          Authorization: 'b-token ' + this.getAuthToken(),
          //'Origin': window.location.protocol + "://" + window.location.hostname
        },
      })
        .then(function (response) {
          console.log(response)
          if (response.status == 401) {
            _me.showMessage('Please close this screen and try again.', 45000)
            return
          }
          _me.showApplicationList()
        })
        .catch(function (e) {
          _me.showMessage('Error: ' + e.message, 15000)
        })
    }

    _me.loadApplication = function (name) {
      var _me = this
      fetch(this.baseurl + '/email_rest/apps/' + encodeURIComponent(name), {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        referrer: 'no-referrer', // *client, no-referrer
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'b-token ' + this.getAuthToken(),
          //'Origin': window.location.protocol + "://" + window.location.hostname
        },
      })
        .then(function (response) {
          if (response.status == 401) {
            _me.showMessage('Please close this screen and try again.', 45000)
            return
          }
          return response.json()
        })
        .then(function (json) {
          if (!json) {
            return
          }
          console.log(json)
          _me.startApplicationEditMain(json)
        })
        .catch(function (e) {
          _me.showMessage('Error: ' + e.message, 15000)
        })
    }

    _me.showApplicationList = function () {
      var _me = this
      this.nodeMain.innerHTML = ''
      this.nodeHeader.innerHTML = '<h2>Applications</h2>'
      this.nodeFooter.innerHTML = ''
      this.loadApplicationList()
    }

    _me.btnAddClicked = function () {
      this.showApplicationEdit(null)
    }

    _me.btnBackClicked = function () {
      this.showApplicationList()
    }

    _me.btnSaveClicked = function () {
      var _me = this
      _me.nodeBtnSave.disabled = true
      var app = this.applicationfromForm()
      if (!isValidAppName(app.name)) {
        _me.showMessage('Invalid Application name.', 15000)
        _me.nodeBtnSave.disabled = false
        return
      }
      console.debug(app)
      fetch(this.baseurl + '/email_rest/apps/' + encodeURIComponent(app.name), {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        method: this.editAppName ? 'PUT' : 'POST', // *GET, POST, PUT, DELETE, etc.
        referrer: 'no-referrer', // *client, no-referrer
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'b-token ' + this.getAuthToken(),
          //'Origin': window.location.protocol + "://" + window.location.hostname
        },
        body: JSON.stringify(app),
      })
        .then(function (response) {
          if (response.status == 200) {
            _me.showMessage('Saved successfully.', 15000)
            _me.showApplicationEdit(app.name)
            _me.nodeBtnSave.disabled = false
          } else {
            if (response.status == 401) {
              _me.showMessage('Please close this screen and try again.', 45000)
              return
            }
            return response.json()
          }
        })
        .then(function (json) {
          console.log(json)
          if (json) {
            _me.showMessage('Error: ' + json.message, 15000)
            _me.nodeBtnSave.disabled = false
          }
        })
        .catch(function (e) {
          _me.showMessage('Error: ' + e.message, 15000)
        })
    }

    _me.applicationfromForm = function () {
      var app = {}
      app.name =
        this.editAppName ||
        this.nodeMain.querySelector("[name='name']").value.trim()
      app.status = this.nodeMain.querySelector("[name='status']").checked
        ? 0
        : 1
      app.notes = this.nodeMain.querySelector("[name='notes']").value

      app.imaphost = this.nodeMain
        .querySelector("[name='imaphost']")
        .value.trim()
      app.smtphost = this.nodeMain
        .querySelector("[name='smtphost']")
        .value.trim()
      app.username = this.nodeMain
        .querySelector("[name='username']")
        .value.trim()
      app.password = this.nodeMain
        .querySelector("[name='password']")
        .value.trim()
      app.email_address = this.nodeMain
        .querySelector("[name='email_address']")
        .value.trim()
      app.service_id = this.nodeMain
        .querySelector("[name='service_id']")
        .value.trim()
      app.script_incoming = this.nodeMain
        .querySelector("[name='script_incoming']")
        .value.trim()
      app.ex_info = this.nodeMain.querySelector("[name='ex_info']").value
      return app
    }

    _me.composeApplicationEditMain = function (name) {
      var d
      this.nodeMain.innerHTML = ''
      this.editAppName = name
      d = document.createElement('H3')
      d.innerHTML = 'Email settings'
      this.nodeMain.appendChild(d)
      d = document.createElement('DIV')
      if (!name) {
        d.innerHTML =
          '<LABEL>Application name</LABEL><INPUT type="text" maxlength="50" name="name" value="' +
          escapeHTML(name) +
          '" >'
      } else {
        d.innerHTML =
          '<LABEL>Application name</LABEL><SPAN>' + escapeHTML(name) + '</SPAN>'
      }
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Disabled</LABEL><INPUT type="checkbox" name="status" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Descriptions</LABEL><INPUT type="text" maxlength="500" class="long" name="notes" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Imap host</LABEL><INPUT type="text" maxlength="500" class="long" name="imaphost" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Smtp host</LABEL><INPUT type="text" maxlength="500" class="long" name="smtphost" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>User name</LABEL><INPUT type="text" maxlength="500" class="long" name="username" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Password</LABEL><INPUT type="password" maxlength="500" class="long" name="password" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Email address</LABEL><INPUT type="text" maxlength="500" class="long" name="email_address" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('H3')
      d.innerHTML = 'UC settings'
      this.nodeMain.appendChild(d)
      if (!this.tenant && this.mt) {
        d = document.createElement('DIV')
        d.innerHTML =
          '<LABEL>Tenant</LABEL><INPUT type="text" maxlength="40" name="ex_id1" value="" >'
        this.nodeMain.appendChild(d)
      }
      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Service ID</LABEL><INPUT type="text" maxlength="200" name="service_id" value="" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Script (Incoming)<BR/><BR/><BR/><BR/><BR/><BR/></LABEL><TEXTAREA cols="100" rows="10" name="script_incoming" >'
      this.nodeMain.appendChild(d)

      d = document.createElement('DIV')
      d.innerHTML =
        '<LABEL>Options<BR/><BR/><BR/><BR/><BR/><BR/></LABEL><TEXTAREA cols="100" rows="10" name="ex_info" >'
      this.nodeMain.appendChild(d)

      var btns = document.createElement('DIV')
      btns.innerHTML =
        '<input type="button" class="email_btn_save" value="Save" >&nbsp;<input type="button" class="email_btn_back" value="Back" >'
      this.nodeBtnSave = btns.getElementsByClassName('email_btn_save')[0]
      this.nodeBtnBack = btns.getElementsByClassName('email_btn_back')[0]
      this.nodeBtnAdd = null
      this.nodeMain.appendChild(btns)
      this.nodeBtnSave.addEventListener('click', function (e) {
        _me.btnSaveClicked(e)
      })
      this.nodeBtnBack.addEventListener('click', function (e) {
        _me.btnBackClicked(e)
      })
    }

    _me.showApplicationEdit = function (name) {
      var _me = this
      this.nodeHeader.innerHTML = '<h2>Application</h2>'
      this.nodeFooter.innerHTML = ''
      this.composeApplicationEditMain(name)
      if (name) {
        this.loadApplication(name)
      } else {
        this.startApplicationEditMain()
      }
    }

    _me.startApplicationEditMain = function (data) {
      var _me = this
      var name = this.nodeMain.querySelector("[name='name']")
      var service_id = this.nodeMain.querySelector("[name='service_id']")
      var script_incoming = this.nodeMain.querySelector(
        "[name='script_incoming']",
      )
      var imaphost = this.nodeMain.querySelector("[name='imaphost']")
      var smtphost = this.nodeMain.querySelector("[name='smtphost']")
      var username = this.nodeMain.querySelector("[name='username']")
      var password = this.nodeMain.querySelector("[name='password']")
      var email_address = this.nodeMain.querySelector("[name='email_address']")
      var status = this.nodeMain.querySelector("[name='status']")
      var notes = this.nodeMain.querySelector("[name='notes']")
      var ex_info = this.nodeMain.querySelector("[name='ex_info']")
      if (data) {
        status.checked = data.status == 0
        notes.value = data.notes
        imaphost.value = data.imaphost
        smtphost.value = data.smtphost
        username.value = data.username
        password.value = data.password
        email_address.value = data.email_address
        service_id.value = data.service_id
        script_incoming.value = data.script_incoming
        ex_info.value = data.ex_info
      } else {
      }
    }
  })(me)
  me.start(token, node, baseurl, mt, tenant, sa, chatClient)
}
