'use strict'

function _typeof(o) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o
          }),
    _typeof(o)
  )
}
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _constants = _interopRequireDefault(require('../utilities/constants'))
var _strings = require('../utilities/strings')
var _reactDom = _interopRequireDefault(require('react-dom'))
var _ButtonIconic = _interopRequireDefault(require('./ButtonIconic'))
var _ButtonLabeled = _interopRequireDefault(require('./ButtonLabeled'))
var _DndableSafe = _interopRequireDefault(require('./DndableSafe'))
var _DropDownMenu = _interopRequireDefault(require('./DropDownMenu'))
var _MenuBalloonDialog = _interopRequireDefault(require('./MenuBalloonDialog'))
var _MenuItem = _interopRequireDefault(require('./MenuItem'))
var _TextBox = _interopRequireDefault(require('./TextBox'))
var _reactNative = require('react-native')
var _AddFolderIcon = _interopRequireDefault(require('../icons/AddFolderIcon'))
var _MoreIcon = _interopRequireDefault(require('../icons/MoreIcon'))
var _ChevronUpIcon = _interopRequireDefault(require('../icons/ChevronUpIcon'))
var _ChevronDownIcon = _interopRequireDefault(
  require('../icons/ChevronDownIcon'),
)
var _CheckIcon = _interopRequireDefault(require('../icons/CheckIcon'))
var _SquareIcon = _interopRequireDefault(require('../icons/SquareIcon'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  )
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o)
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string')
  return 'symbol' == _typeof(i) ? i : i + ''
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t
  var e = t[Symbol.toPrimitive]
  if (void 0 !== e) {
    var i = e.call(t, r || 'default')
    if ('object' != _typeof(i)) return i
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return ('string' === r ? String : Number)(t)
}
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e),
    )
  )
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return _assertThisInitialized(t)
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t
  })()
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        }),
    _getPrototypeOf(t)
  )
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function')
  ;(t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    e && _setPrototypeOf(t, e)
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t
        }),
    _setPrototypeOf(t, e)
  )
} /**
 * UserListForm
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.params
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [props])
    _this.userListCreateGroupInputRef = /*#__PURE__*/ _react.default.createRef()
    var buddylist = JSON.parse(
      JSON.stringify((props && props.params && props.params.buddylist) || {}),
    )
    _this.state = {
      buddylist: buddylist,
      usedCount: (buddylist.user || []).filter(
        buddylist.screened
          ? function (buddy) {
              return buddy && buddy.user_id && !buddy.delete
            }
          : function (buddy) {
              return buddy && buddy.user_id
            },
      ).length,
      saveOrder: false,
      selectedSortOrderKey: '_name',
      expandedGroupIds: {},
      groupMenuShowingDialogVersion: null,
      groupMenuShowingDialogId: null,
      createGroupShowingDialogVersion: null,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'handleUserListAllUsersCheckClick',
      value: function handleUserListAllUsersCheckClick(ev) {
        var props = this.props
        if (props.params && props.params.allUsersCheckDisabled) {
          return
        }
        var buddylist = this.state.buddylist
        buddylist.screened = !Boolean(buddylist.screened)
        this.setState({
          buddylist: buddylist,
          usedCount: (buddylist.user || []).filter(
            buddylist.screened
              ? function (buddy) {
                  return buddy && buddy.user_id && !buddy.delete
                }
              : function (buddy) {
                  return buddy && buddy.user_id
                },
          ).length,
        })
      },
    },
    {
      key: 'handleUserListSaveOrderCheckClick',
      value: function handleUserListSaveOrderCheckClick(ev) {
        var props = this.props
        if (
          props.params &&
          props.params.buddy_mode === _constants.default.BUDDY_MODE_AUTO
        ) {
          return
        }
        var saveOrder = !Boolean(this.state.saveOrder)
        var selectedSortOrderKey = saveOrder ? '_group' : '_name'
        this.setState({
          saveOrder: saveOrder,
          selectedSortOrderKey: selectedSortOrderKey,
        })
      },
    },
    {
      key: 'handleUserListSortOrderGroupCheckClick',
      value: function handleUserListSortOrderGroupCheckClick(ev) {
        var props = this.props
        this.setState({
          selectedSortOrderKey:
            this.state.selectedSortOrderKey === '_group' ? '_name' : '_group',
        })
      },
    },
    {
      key: 'handleUserListSortOrderItemClick',
      value: function handleUserListSortOrderItemClick(key, ev) {
        var props = this.props
        this.setState({
          selectedSortOrderKey: key,
        })
      },
    },
    {
      key: 'handleUserListDrop',
      value: function handleUserListDrop(dropTargetInfo, ev) {
        var props = this.props
        if (!(dropTargetInfo && ev && ev.dragSourceInfo)) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'invalid dragSourceInfo, dropTargetInfo')
          return
        }
        if (
          !(
            this.state.saveOrder && this.state.selectedSortOrderKey === '_group'
          )
        ) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'invalid saveOrder, selectedSortOrderKey')
          return
        }
        // parameters
        var dragSourceInfoType = ev.dragSourceInfo.dragSourceInfoType
        var dragSourceInfoCode = ev.dragSourceInfo.dragSourceInfoCode
        var dropTargetInfoType = dropTargetInfo.dropTargetInfoType
        var dropTargetInfoCode = dropTargetInfo.dropTargetInfoCode

        // get buddylist
        var buddylist = this.state.buddylist
        var buddies = buddylist.user
        if (!buddies || !buddies.length) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'buddylist.user is empty')
          return
        }

        // get sourceBuddy, targetBuddy
        var sourceIndex = -1
        var sourceBuddy = null
        var targetIndex = -1
        var targetBuddy = null
        var sourcePredicate = null
        if (dragSourceInfoType === 'userListBuddyItem') {
          try {
            var dragSourceInfoCodeObject = JSON.parse(dragSourceInfoCode) || {}
            sourcePredicate = function sourcePredicate(buddy) {
              return (
                buddy &&
                buddy.user_id &&
                buddy.tenant === dragSourceInfoCodeObject.tenant &&
                buddy.user_id === dragSourceInfoCodeObject.user_id
              )
            }
          } catch (ex) {}
        } else if (dragSourceInfoType === 'userListGroupArea') {
          sourcePredicate = function sourcePredicate(buddy) {
            return buddy && buddy.id && buddy.id === dragSourceInfoCode
          }
        }
        var targetPredicate = null
        if (dropTargetInfoType === 'userListBuddyItem') {
          try {
            var dropTargetInfoCodeObject = JSON.parse(dropTargetInfoCode) || {}
            targetPredicate = function targetPredicate(buddy) {
              return (
                buddy &&
                buddy.user_id &&
                buddy.tenant === dropTargetInfoCodeObject.tenant &&
                buddy.user_id === dropTargetInfoCodeObject.user_id
              )
            }
          } catch (ex) {}
        } else if (dropTargetInfoType === 'userListGroupArea') {
          targetPredicate = function targetPredicate(buddy) {
            return buddy && buddy.id && buddy.id === dropTargetInfoCode
          }
        }
        buddies.forEach(function (buddy, index) {
          if (sourcePredicate && sourcePredicate(buddy)) {
            sourceIndex = index
            sourcePredicate = null
          }
          if (targetPredicate && targetPredicate(buddy)) {
            targetIndex = index
            targetPredicate = null
          }
        })
        sourceBuddy = buddies[sourceIndex]
        if (!sourceBuddy) {
          props.uiData.ucUiStore
            .getLogger()
            .log('warn', 'sourceBuddy not found')
          return
        }
        targetBuddy = buddies[targetIndex]
        if (!targetBuddy) {
          if (
            dragSourceInfoType === 'userListBuddyItem' &&
            dropTargetInfoType === 'userListGroupArea'
          ) {
            targetBuddy = {
              id: '',
            } // root group
          } else {
            props.uiData.ucUiStore
              .getLogger()
              .log('warn', 'targetBuddy not found')
            return
          }
        }

        // edit buddylist
        if (
          (dragSourceInfoType === 'userListBuddyItem' &&
            dropTargetInfoType === 'userListBuddyItem') ||
          (dragSourceInfoType === 'userListGroupArea' &&
            dropTargetInfoType === 'userListGroupArea')
        ) {
          if (sourceIndex < targetIndex) {
            // drag downward
            var newTargetIndex = targetIndex - 1 // after remove source
            if (sourceBuddy.group === targetBuddy.group) {
              // drag downward in the same group
              // move sourceBuddy after targetBuddy
              buddylist.user.splice(
                newTargetIndex + 1,
                0,
                buddylist.user.splice(sourceIndex, 1)[0],
              )
            } else {
              // drag downward to another group
              // move sourceBuddy before targetBuddy
              buddylist.user.splice(
                newTargetIndex,
                0,
                buddylist.user.splice(sourceIndex, 1)[0],
              )
            }
          } else {
            // drag upward
            // move sourceBuddy before targetBuddy
            buddylist.user.splice(
              targetIndex,
              0,
              buddylist.user.splice(sourceIndex, 1)[0],
            )
          }
          sourceBuddy.group = targetBuddy.group
        } else if (
          dragSourceInfoType === 'userListBuddyItem' &&
          dropTargetInfoType === 'userListGroupArea'
        ) {
          // move sourceBuddy to the last child of targetBuddy
          buddylist.user.push(buddylist.user.splice(sourceIndex, 1)[0])
          sourceBuddy.group = targetBuddy.id
        }

        // render buddylist
        this.setState({
          buddylist: buddylist,
        })
      },
    },
    {
      key: 'handleUserListBuddyItemClick',
      value: function handleUserListBuddyItemClick(buddy, ev) {
        var props = this.props
        var buddylist = this.state.buddylist
        if (buddylist.screened) {
          ;(buddylist.user || []).some(function (b) {
            if (b && b.tenant === buddy.tenant && b.user_id === buddy.user_id) {
              if (b.delete) {
                delete b.delete
              } else {
                b.delete = true
              }
              return true
            }
          })
          this.setState({
            buddylist: buddylist,
            usedCount: (buddylist.user || []).filter(
              buddylist.screened
                ? function (buddy) {
                    return buddy && buddy.user_id && !buddy.delete
                  }
                : function (buddy) {
                    return buddy && buddy.user_id
                  },
            ).length,
          })
        }
      },
    },
    {
      key: 'handleUserListGroupItemClick',
      value: function handleUserListGroupItemClick(buddy, ev) {
        var props = this.props
        var expandedGroupIds = this.state.expandedGroupIds
        var id = buddy && buddy.id
        if (expandedGroupIds[id]) {
          delete expandedGroupIds[id]
        } else {
          expandedGroupIds[id] = true
        }
        this.setState({
          expandedGroupIds: expandedGroupIds,
        })
      },
    },
    {
      key: 'handleUserListGroupMenuButtonClick',
      value: function handleUserListGroupMenuButtonClick(buddy, ev) {
        var props = this.props
        var id = buddy && buddy.id
        if (
          props.uiData.showingDialogVersion !==
            this.state.groupMenuShowingDialogVersion ||
          id !== this.state.groupMenuShowingDialogId
        ) {
          this.setState({
            groupMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
            groupMenuShowingDialogId: id,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
        }
      },
    },
    {
      key: 'handleUserListGroupCheckAllMenuItemClick',
      value: function handleUserListGroupCheckAllMenuItemClick(
        buddies,
        check,
        ev,
      ) {
        var props = this.props
        var buddylist = this.state.buddylist
        if (buddylist.screened) {
          buddies.some(function (buddy) {
            if (buddy.user_id) {
              ;(buddylist.user || []).some(function (b) {
                if (
                  b &&
                  b.tenant === buddy.tenant &&
                  b.user_id === buddy.user_id
                ) {
                  if (check) {
                    delete b.delete
                  } else {
                    b.delete = true
                  }
                  return true
                }
              })
            } else {
              return true // next group
            }
          })
          this.setState({
            buddylist: buddylist,
            usedCount: (buddylist.user || []).filter(
              buddylist.screened
                ? function (buddy) {
                    return buddy && buddy.user_id && !buddy.delete
                  }
                : function (buddy) {
                    return buddy && buddy.user_id
                  },
            ).length,
          })
        }
      },
    },
    {
      key: 'handleUserListGroupRemoveGroupMenuItemClick',
      value: function handleUserListGroupRemoveGroupMenuItemClick(id, ev) {
        var props = this.props
        if (
          !(
            this.state.saveOrder && this.state.selectedSortOrderKey === '_group'
          )
        ) {
          return
        }
        var buddylist = this.state.buddylist
        for (
          var i =
            (0, _strings.int)(
              buddylist && buddylist.user && buddylist.user.length,
            ) - 1;
          i >= 0;
          i--
        ) {
          if (buddylist.user[i].id === id) {
            buddylist.user.splice(i, 1)
          } else if (buddylist.user[i].group === id) {
            buddylist.user[i].group = ''
          }
        }
        this.setState({
          buddylist: buddylist,
        })
      },
    },
    {
      key: 'handleUserListCreateGroupButtonClick',
      value: function handleUserListCreateGroupButtonClick(ev) {
        var _this2 = this
        var props = this.props
        if (
          props.uiData.showingDialogVersion !==
          this.state.createGroupShowingDialogVersion
        ) {
          this.setState({
            createGroupShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
          })
          ev.stopPropagation()
          props.uiData.fire('showingDialog_update')
          setTimeout(function () {
            if (_this2.userListCreateGroupInputRef.current) {
              _this2.userListCreateGroupInputRef.current.focus()
            }
          }, 0)
        }
      },
    },
    {
      key: 'handleUserListCreateGroupInputKeyDown',
      value: function handleUserListCreateGroupInputKeyDown(ev) {
        var props = this.props
        if (ev && ev.keyCode === 13 && !ev.shiftKey) {
          this.handleUserListCreateGroupSubmitButtonClick(ev)
          ev.stopPropagation()
        } else if (ev && ev.keyCode === 27 && !ev.shiftKey) {
          this.setState({
            createGroupShowingDialogVersion: null,
          })
          ev.stopPropagation()
        }
      },
    },
    {
      key: 'handleUserListCreateGroupSubmitButtonClick',
      value: function handleUserListCreateGroupSubmitButtonClick(ev) {
        var props = this.props
        var input = this.userListCreateGroupInputRef.current
        var id = (0, _strings.string)(input && input.value)
        var buddylist = this.state.buddylist
        if (
          this.state.saveOrder &&
          this.state.selectedSortOrderKey === '_group' &&
          id &&
          !buddylist.user.some(function (buddy) {
            return buddy && buddy.id === id
          })
        ) {
          buddylist.user.push({
            id: id,
            name: id,
            group: '',
          })
          this.setState({
            buddylist: buddylist,
            createGroupShowingDialogVersion: null,
          })
          if (input) {
            input.clear()
          }
        } else {
          setTimeout(function () {
            if (input) {
              input.focus()
            }
          }, 0)
        }
      },
    },
    {
      key: 'sortBuddylist',
      value: function sortBuddylist(buddies, sortOrderKey) {
        var props = this.props
        if (sortOrderKey === '_name') {
          buddies = buddies.sort(function (a, b) {
            var name_a = (0, _strings.string)(a && (a.name || a.user_id))
            var name_b = (0, _strings.string)(b && (b.name || b.user_id))
            return name_a.localeCompare(name_b)
          })
        } else if (sortOrderKey === '_user_id') {
          buddies = buddies.sort(function (a, b) {
            var user_id_a = (0, _strings.string)(a && a.user_id)
            var user_id_b = (0, _strings.string)(b && b.user_id)
            return user_id_a.localeCompare(user_id_b)
          })
        } else if (sortOrderKey === '_group') {
          var groupPositions = {}
          buddies = buddies.sort(function (a, b) {
            var group_a =
              a && a.user_id
                ? (0, _strings.string)(a.group)
                : (0, _strings.string)(a && a.id)
            groupPositions[group_a] =
              groupPositions[group_a] ||
              buddies.findIndex(function (g) {
                return g.id === group_a
              }) + 1 ||
              buddies.length + 1
            var group_b =
              b && b.user_id
                ? (0, _strings.string)(b.group)
                : (0, _strings.string)(b && b.id)
            groupPositions[group_b] =
              groupPositions[group_b] ||
              buddies.findIndex(function (g) {
                return g.id === group_b
              }) + 1 ||
              buddies.length + 1
            if (groupPositions[group_a] !== groupPositions[group_b]) {
              return groupPositions[group_a] - groupPositions[group_b]
            } else {
              return !a.user_id && b.user_id
                ? -1
                : a.user_id && !b.user_id
                  ? 1
                  : 0
            }
          })
        } else {
          var buddiesOrg =
            ((props && props.params && props.params.buddylist) || {}).user || []
          var orgPositions = {}
          buddies = buddies.sort(function (a, b) {
            var key_a = a && a.user_id + a.id
            orgPositions[key_a] =
              orgPositions[key_a] ||
              buddiesOrg.findIndex(function (buddy) {
                return (buddy && buddy.user_id + buddy.id) === key_a
              }) + 1 ||
              buddiesOrg.length + 1
            var key_b = b && b.user_id + b.id
            orgPositions[key_b] =
              orgPositions[key_b] ||
              buddiesOrg.findIndex(function (buddy) {
                return (buddy && buddy.user_id + buddy.id) === key_b
              }) + 1 ||
              buddiesOrg.length + 1
            return orgPositions[key_a] - orgPositions[key_b]
          })
        }
        return buddies
      },
    },
    {
      key: 'render',
      value: function render() {
        var _props$params,
          _props$params2,
          _props$params3,
          _this3 = this
        var props = this.props
        var nameDisplayMode = (0, _strings.int)(
          props.uiData.ucUiStore.getOptionalSetting({
            key: ['name_display_mode'],
          }),
        )
        var sortOrders = []
        sortOrders.push({
          key: '',
          label: _uawmsgs.default.LBL_USER_LIST_SORT_ORDER_NONE,
        })
        sortOrders.push({
          key: '_name',
          label: _uawmsgs.default.LBL_USER_LIST_SORT_ORDER_NAME,
        })
        if (nameDisplayMode === 1) {
          sortOrders.push({
            key: '_user_id',
            label: _uawmsgs.default.LBL_USER_LIST_SORT_ORDER_USER_ID,
          })
        }
        sortOrders.push({
          key: '_group',
          label: _uawmsgs.default.LBL_USER_LIST_SORT_ORDER_GROUP,
        })
        var buddies = (this.state.buddylist.user || []).concat()
        var groupUserCountTable = {}
        if (this.state.selectedSortOrderKey !== '_group') {
          buddies = buddies.filter(function (buddy) {
            return buddy.user_id
          })
          buddies = this.sortBuddylist(buddies, this.state.selectedSortOrderKey)
        } else {
          buddies = buddies.concat({
            id: '',
            name: _uawmsgs.default.LBL_USER_LIST_NO_GROUP,
            group: '',
          })
          buddies = this.sortBuddylist(buddies, this.state.selectedSortOrderKey)
          var activeCount = 0
          var totalCount = 0
          buddies.reduceRight(function (a, buddy) {
            if (buddy && buddy.user_id) {
              if (!buddy.delete) {
                activeCount++
              }
              totalCount++
            } else if (buddy) {
              groupUserCountTable[buddy.id] = {
                activeCount: activeCount,
                totalCount: totalCount,
              }
              activeCount = 0
              totalCount = 0
            }
          }, null)
        }
        var currentGroupId = null
        return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: [
            styles.brUserListForm,
            styles[
              'brBuddyMode'.concat(
                (0, _strings.int)(props.params && props.params.buddy_mode),
              )
            ],
            this.state.buddylist.screened && styles.brScreened,
            this.state.saveOrder && styles.brSaveOrder,
          ],
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
              style: styles.brUserListTable,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brUserListAllUsersCheck,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                    _reactNative.TouchableOpacity,
                    {
                      style: [
                        styles.brUserListAllUsersCheck,
                        ((_props$params = props.params) === null ||
                        _props$params === void 0
                          ? void 0
                          : _props$params.allUsersCheckDisabled) &&
                          styles.brDisabled,
                        ((_props$params2 = props.params) === null ||
                        _props$params2 === void 0
                          ? void 0
                          : _props$params2.allUsersCheckHidden) &&
                          styles.brHidden,
                      ],
                      onPress: this.handleUserListAllUsersCheckClick.bind(this),
                      disabled:
                        (_props$params3 = props.params) === null ||
                        _props$params3 === void 0
                          ? void 0
                          : _props$params3.allUsersCheckDisabled,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: styles.brUserListAllUsersCheckIcon,
                          children: this.state.buddylist.screened
                            ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _SquareIcon.default,
                                {
                                  color: this.state.buddylist.screened
                                    ? null
                                    : 'white',
                                },
                              )
                            : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                _CheckIcon.default,
                                {
                                  color: this.state.buddylist.screened
                                    ? null
                                    : 'white',
                                },
                              ),
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: styles.brUserListAllUsersCheckLabel,
                          children:
                            _uawmsgs.default.LBL_USER_LIST_ALL_USERS_CHECK,
                        }),
                      ],
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.brUserListSaveOrderCheck,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                      _reactNative.TouchableOpacity,
                      {
                        style: styles.brUserListSaveOrderCheck,
                        onPress:
                          this.handleUserListSaveOrderCheckClick.bind(this),
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.brUserListSaveOrderCheckIcon,
                              children: this.state.saveOrder
                                ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _CheckIcon.default,
                                    {
                                      color: this.state.saveOrder
                                        ? null
                                        : 'white',
                                    },
                                  )
                                : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _SquareIcon.default,
                                    {
                                      color: this.state.saveOrder
                                        ? null
                                        : 'white',
                                    },
                                  ),
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.brUserListSaveOrderCheckLabel,
                              children:
                                _uawmsgs.default.LBL_USER_LIST_SAVE_ORDER_CHECK,
                            },
                          ),
                        ],
                      },
                    ),
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                      _reactNative.TouchableOpacity,
                      {
                        style: styles.brUserListSortOrderGroupCheck,
                        onPress:
                          this.handleUserListSortOrderGroupCheckClick.bind(
                            this,
                          ),
                        children: [
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.View,
                            {
                              style: styles.brUserListSortOrderGroupCheckIcon,
                              children:
                                this.state.selectedSortOrderKey === '_group'
                                  ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _CheckIcon.default,
                                      {
                                        color:
                                          this.state.selectedSortOrderKey ===
                                          '_group'
                                            ? null
                                            : 'white',
                                      },
                                    )
                                  : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                      _SquareIcon.default,
                                      {
                                        color:
                                          this.state.selectedSortOrderKey ===
                                          '_group'
                                            ? null
                                            : 'white',
                                      },
                                    ),
                            },
                          ),
                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                            _reactNative.Text,
                            {
                              style: styles.brUserListSortOrderGroupCheckLabel,
                              children:
                                _uawmsgs.default
                                  .LBL_USER_LIST_SORT_ORDER_GROUP_CHECK,
                            },
                          ),
                        ],
                      },
                    ),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.brUserListCaptionArea,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.Text,
                    {
                      children: _uawmsgs.default.LBL_USER_LIST_CAPTION,
                    },
                  ),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                  style: styles.brUserListCapacityArea,
                  children: [
                    /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                      style: styles.brUserListCapacityLabel,
                      children: _uawmsgs.default.LBL_USER_LIST_CAPACITY,
                    }),
                    /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
                      style: styles.brUserListCapacityValue,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: [
                            styles.brUserListCapacityUsed,
                            this.state.usedCount > props.params.buddy_max &&
                              styles.brOver,
                          ],
                          children: this.state.usedCount,
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          children: ' / ',
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: styles.brUserListCapacityMax,
                          children: props.params.buddy_max,
                        }),
                      ],
                    }),
                  ],
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
                  style: styles.brUserListBuddies,
                  children: buddies.map(function (buddy, i) {
                    if (buddy && buddy.user_id) {
                      var key = JSON.stringify({
                        tenant: buddy.tenant,
                        user_id: buddy.user_id,
                      })
                      var label =
                        (buddy.name || buddy.user_id) +
                        (nameDisplayMode === 1
                          ? ' ('.concat(buddy.user_id, ')')
                          : '')
                      return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _DndableSafe.default,
                        {
                          uiData: props.uiData,
                          style: [
                            styles.brUserListBuddyItem,
                            _this3.state.selectedSortOrderKey === '_group' &&
                              !_this3.state.expandedGroupIds[currentGroupId] &&
                              styles.brCollapsed,
                            {
                              zIndex: buddies.length - 1,
                            },
                          ],
                          dragSourceInfo: {
                            dragSourceInfoType: 'userListBuddyItem',
                            dragSourceInfoCode: key,
                          },
                          onCheckCanDrop: function onCheckCanDrop(ev) {
                            return (
                              _this3.state.saveOrder &&
                              _this3.state.selectedSortOrderKey === '_group' &&
                              ev.dragSourceInfo &&
                              ev.dragSourceInfo.dragSourceInfoType ===
                                'userListBuddyItem' &&
                              ev.dragSourceInfo.dragSourceInfoCode !== key
                            )
                          },
                          onDrop: _this3.handleUserListDrop.bind(_this3, {
                            dropTargetInfoType: 'userListBuddyItem',
                            dropTargetInfoCode: key,
                          }),
                          onPress: _this3.handleUserListBuddyItemClick.bind(
                            _this3,
                            buddy,
                          ),
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: styles.brUserListBuddyItemIcon,
                                children:
                                  _this3.state.buddylist.screened &&
                                  buddy.delete
                                    ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _SquareIcon.default,
                                        {
                                          color:
                                            _this3.state.buddylist.screened &&
                                            buddy.delete
                                              ? null
                                              : 'white',
                                        },
                                      )
                                    : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _CheckIcon.default,
                                        {
                                          color:
                                            _this3.state.buddylist.screened &&
                                            buddy.delete
                                              ? null
                                              : 'white',
                                        },
                                      ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.Text,
                              {
                                style: styles.brUserListBuddyItemLabel,
                                numberOfLines: 1,
                                children: label,
                              },
                            ),
                          ],
                        },
                        key,
                      )
                    } else if (buddy) {
                      currentGroupId = buddy.id
                      return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                        _DndableSafe.default,
                        {
                          uiData: props.uiData,
                          style: [
                            styles.brUserListGroupArea,
                            buddy.id && styles.brGroupId,
                            {
                              zIndex: buddies.length - i,
                            },
                          ],
                          dragSourceInfo: {
                            dragSourceInfoType: 'userListGroupArea',
                            dragSourceInfoCode: buddy.id,
                          },
                          onCheckCanDrop: function onCheckCanDrop(ev) {
                            return (
                              _this3.state.saveOrder &&
                              _this3.state.selectedSortOrderKey === '_group' &&
                              ev.dragSourceInfo &&
                              (ev.dragSourceInfo.dragSourceInfoType ===
                                'userListBuddyItem' ||
                                (ev.dragSourceInfo.dragSourceInfoType ===
                                  'userListGroupArea' &&
                                  ev.dragSourceInfo.dragSourceInfoCode !==
                                    buddy.id &&
                                  ev.dragSourceInfo.dragSourceInfoCode &&
                                  buddy.id))
                            )
                          },
                          onDrop: _this3.handleUserListDrop.bind(_this3, {
                            dropTargetInfoType: 'userListGroupArea',
                            dropTargetInfoCode: buddy.id,
                          }),
                          children: [
                            /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                              _reactNative.View,
                              {
                                style: styles.brUserListGroupMenuArea,
                                children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                  _ButtonIconic.default,
                                  {
                                    style: styles.brUserListGroupMenuButton,
                                    iconSource: /*#__PURE__*/ (0,
                                    _jsxRuntime.jsx)(_MoreIcon.default, {}),
                                    onPress:
                                      _this3.handleUserListGroupMenuButtonClick.bind(
                                        _this3,
                                        buddy,
                                      ),
                                    children: /*#__PURE__*/ (0,
                                    _jsxRuntime.jsxs)(
                                      _MenuBalloonDialog.default,
                                      {
                                        showing:
                                          props.uiData.showingDialogVersion ===
                                            _this3.state
                                              .groupMenuShowingDialogVersion &&
                                          buddy.id ===
                                            _this3.state
                                              .groupMenuShowingDialogId,
                                        style:
                                          styles.brUserListGroupMenuBalloonDialog,
                                        children: [
                                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _MenuItem.default,
                                            {
                                              style: [
                                                styles.brUserListGroupMenuItem,
                                                styles.brCheckAll,
                                              ],
                                              disabled:
                                                !_this3.state.buddylist
                                                  .screened,
                                              onPress:
                                                _this3.handleUserListGroupCheckAllMenuItemClick.bind(
                                                  _this3,
                                                  buddies.slice(i + 1),
                                                  true,
                                                ),
                                              children:
                                                _uawmsgs.default
                                                  .LBL_USER_LIST_GROUP_CHECK_ALL_MENU,
                                            },
                                          ),
                                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _MenuItem.default,
                                            {
                                              style: [
                                                styles.brUserListGroupMenuItem,
                                                styles.brUncheckAll,
                                              ],
                                              disabled:
                                                !_this3.state.buddylist
                                                  .screened,
                                              onPress:
                                                _this3.handleUserListGroupCheckAllMenuItemClick.bind(
                                                  _this3,
                                                  buddies.slice(i + 1),
                                                  false,
                                                ),
                                              children:
                                                _uawmsgs.default
                                                  .LBL_USER_LIST_GROUP_UNCHECK_ALL_MENU,
                                            },
                                          ),
                                          /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _MenuItem.default,
                                            {
                                              style: [
                                                styles.brUserListGroupMenuItem,
                                                styles.brRemoveGroup,
                                              ],
                                              disabled: !(
                                                _this3.state.saveOrder &&
                                                buddy.id
                                              ),
                                              onPress:
                                                _this3.handleUserListGroupRemoveGroupMenuItemClick.bind(
                                                  _this3,
                                                  buddy.id,
                                                ),
                                              children:
                                                _uawmsgs.default
                                                  .LBL_USER_LIST_GROUP_REMOVE_GROUP_MENU,
                                            },
                                          ),
                                        ],
                                      },
                                    ),
                                  },
                                ),
                              },
                            ),
                            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                              _reactNative.TouchableOpacity,
                              {
                                style: styles.brUserListGroupItem,
                                onPress:
                                  _this3.handleUserListGroupItemClick.bind(
                                    _this3,
                                    buddy,
                                  ),
                                children: [
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.View,
                                    {
                                      style: styles.brGroupIcon,
                                      children: _this3.state.expandedGroupIds[
                                        buddy.id
                                      ]
                                        ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _ChevronUpIcon.default,
                                            {},
                                          )
                                        : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                            _ChevronDownIcon.default,
                                            {},
                                          ),
                                    },
                                  ),
                                  /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.Text,
                                    {
                                      children: (0, _strings.string)(
                                        groupUserCountTable[buddy.id] &&
                                          buddy.name +
                                            ' ' +
                                            (_this3.state.buddylist.screened
                                              ? groupUserCountTable[buddy.id]
                                                  .activeCount
                                              : groupUserCountTable[buddy.id]
                                                  .totalCount) +
                                            '/' +
                                            groupUserCountTable[buddy.id]
                                              .totalCount,
                                      ),
                                    },
                                  ),
                                ],
                              },
                            ),
                          ],
                        },
                        currentGroupId,
                      )
                    }
                    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                      _reactNative.View,
                      {},
                      i,
                    )
                  }),
                }),
              ],
            }),
            this.state.saveOrder &&
              this.state.selectedSortOrderKey === '_group' &&
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonIconic.default, {
                style: styles.brUserListCreateGroupButton,
                iconSource: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _AddFolderIcon.default,
                  {},
                ),
                onPress: this.handleUserListCreateGroupButtonClick.bind(this),
              }),
            /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_MenuBalloonDialog.default, {
              showing:
                props.uiData.showingDialogVersion ===
                this.state.createGroupShowingDialogVersion,
              style: styles.brUserListCreateGroupBalloonDialog,
              children: [
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_TextBox.default, {
                  ref: this.userListCreateGroupInputRef,
                  style: styles.brUserListCreateGroupInput,
                  placeholder:
                    _uawmsgs.default
                      .LBL_USER_LIST_CREATE_GROUP_INPUT_PLACEHOLDER,
                  onKeyPress:
                    this.handleUserListCreateGroupInputKeyDown.bind(this),
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_ButtonLabeled.default, {
                  style: styles.brUserListCreateGroupSubmitButton,
                  onPress:
                    this.handleUserListCreateGroupSubmitButtonClick.bind(this),
                  children:
                    _uawmsgs.default.LBL_USER_LIST_CREATE_GROUP_SUBMIT_BUTTON,
                }),
              ],
            }),
          ],
        })
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create(
  _defineProperty(
    _defineProperty(
      {
        brUserListForm: {
          position: 'relative',
          padding: 8,
          paddingHorizontal: 32,
        },
        brUserListTable: {
          padding: 4,
          fontSize: 13 * (1 / 16),
          fontWeight: '500',
          letterSpacing: 0.3 * (1 / 16),
        },
        brUserListAllUsersCheck: {
          fontSize: 13 * (1 / 16),
          fontWeight: '400',
          lineHeight: 1.6,
          letterSpacing: 0.3 * (1 / 16),
          color: '#212121',
          flexWrap: 'nowrap',
        },
        brDisabled: {
          color: '#9e9e9e',
        },
        brHidden: {
          display: 'none',
        },
        brUserListAllUsersCheckIcon: {
          paddingLeft: 40,
        },
        brUserListSaveOrderCheck: {
          fontSize: 13 * (1 / 16),
          fontWeight: '400',
          lineHeight: 1.6,
          letterSpacing: 0.3 * (1 / 16),
          color: '#212121',
          flexWrap: 'nowrap',
        },
        brUserListSaveOrderCheckIcon: {
          paddingLeft: 40,
        },
        brUserListSortOrderGroupCheck: {
          fontSize: 13 * (1 / 16),
          fontWeight: '400',
          lineHeight: 1.6,
          letterSpacing: 0.3 * (1 / 16),
          color: '#212121',
          flexWrap: 'nowrap',
        },
        brUserListSortOrderGroupCheckIcon: {
          paddingLeft: 40,
        },
        brUserListCapacityArea: {
          alignSelf: 'flex-end',
        },
        brUserListCapacityLabel: {
          paddingLeft: 20,
          paddingRight: 4,
        },
        brUserListCapacityValue: {
          width: 60,
          textAlign: 'right',
          fontSize: 13 * (1 / 16),
          fontWeight: '400',
          lineHeight: 1.6,
          letterSpacing: 0.3 * (1 / 16),
          color: '#212121',
        },
        brUserListCapacityUsed: {
          color: '#212121',
        },
        brOver: {
          color: '#ff4526',
          fontWeight: '500',
        },
        brUserListBuddies: {
          width: 300,
          height: 200,
          borderWidth: 1,
          borderColor: '#e0e0e0',
          borderRadius: 4,
        },
        brUserListBuddyItem: {
          padding: 8,
          paddingRight: 12,
          fontSize: 13 * (1 / 16),
          fontWeight: '400',
          lineHeight: 1.6,
          letterSpacing: 0.3 * (1 / 16),
          color: '#212121',
          flexWrap: 'nowrap',
        },
        brCollapsed: {
          opacity: 0,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        brIsOver: {
          borderWidth: 3,
          borderColor: '#48d1cc',
        },
        brUserListBuddyItemIcon: {
          paddingLeft: 44,
        },
        brUserListGroupArea: {
          position: 'relative',
        },
        brUserListGroupMenuArea: {
          zIndex: 1,
          height: 0,
        },
        brUserListGroupMenuButton: {
          position: 'absolute',
          left: 238,
          width: 24,
          height: 24,
          transform: [
            {
              translateY: -12,
            },
          ],
        },
        brUserListGroupMenuBalloonDialog: {
          position: 'absolute',
          right: 0,
          top: 24,
        },
        brUserListGroupItem: {
          zIndex: 0,
          padding: 8,
          paddingHorizontal: 12,
          fontSize: 9 * (1 / 16),
          fontWeight: '400',
          lineHeight: 1.6,
          letterSpacing: 1.3 * (1 / 16),
          color: '#9e9e9e',
          flexWrap: 'nowrap',
        },
        brUserListCreateGroupButton: {
          position: 'absolute',
          right: 40,
          top: 40,
        },
        brUserListCreateGroupBalloonDialog: {
          position: 'absolute',
          zIndex: 9999,
          right: 40,
          top: 72,
          padding: 8,
        },
        brUserListCreateGroupInput: {
          marginBottom: 8,
        },
        brUserListBuddyItemHover: {
          backgroundColor: '#eeeeee',
        },
        brUserListGroupItemHover: {
          backgroundColor: '#eeeeee',
        },
        brBuddyMode1: {},
        brScreened: {},
        brSaveOrder: {},
        brUserListAllUsersCheckLabel: {
          fontSize: 14,
        },
        brUserListCaptionArea: {
          flex: 1,
        },
      },
      'brUserListCapacityValue',
      {
        flexDirection: 'row',
      },
    ),
    'brUserListCapacityMax',
    {},
  ),
)
