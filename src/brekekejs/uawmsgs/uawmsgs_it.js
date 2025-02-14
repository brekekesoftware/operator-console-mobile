;(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.Brekeke = root.Brekeke || {}
    root.Brekeke.UAWMsgs = root.Brekeke.UAWMsgs_it = factory()
  }
})(this, () => ({
  CMN_OK: 'Ok',
  CMN_CANCEL: 'Annulla',
  CMN_ALERT: 'Avviso',
  CMN_SAVE: 'Salva',
  CMN_CLOSE: 'Fine',
  CMN_ON: 'on',
  CMN_OFF: 'off',
  CMN_OWN_STATUS_STRING_OFFLINE: 'Disconnesso',
  CMN_OWN_STATUS_STRING_INVISIBLE: 'invisibile',
  CMN_OWN_STATUS_STRING_AVAILABLE: 'Disponibile',
  CMN_OWN_STATUS_STRING_IDLE: 'Inattivo',
  CMN_OWN_STATUS_STRING_BUSY: 'Occupato',
  CMN_FORMAT_DATE: '{3} {2}',
  CMN_FORMAT_DATE_WITH_YEAR: '{3} {2} {0}',
  CMN_FORMAT_DATE_WITH_DOW: '{4}, {3} {2}',
  CMN_FORMAT_DATE_WITH_DOW_YEAR: '{4}, {3} {2} {0}',
  CMN_MONTH_STR_01: 'Gen',
  CMN_MONTH_STR_02: 'Feb',
  CMN_MONTH_STR_03: 'Mar',
  CMN_MONTH_STR_04: 'Apr',
  CMN_MONTH_STR_05: 'Mag',
  CMN_MONTH_STR_06: 'Giu',
  CMN_MONTH_STR_07: 'Lug',
  CMN_MONTH_STR_08: 'Ago',
  CMN_MONTH_STR_09: 'Set',
  CMN_MONTH_STR_10: 'Ott',
  CMN_MONTH_STR_11: 'Nov',
  CMN_MONTH_STR_12: 'Dic',
  CMN_DOW_STR_00: 'Dom',
  CMN_DOW_STR_01: 'Lun',
  CMN_DOW_STR_02: 'Mar',
  CMN_DOW_STR_03: 'Mer',
  CMN_DOW_STR_04: 'Gio',
  CMN_DOW_STR_05: 'Ven',
  CMN_DOW_STR_06: 'Sab',
  CMN_TODAY: 'oggi',
  CMN_YESTERDAY: 'Ieri',
  CMN_FORMAT_TIME: '{1}:{2} {3}',
  CMN_FORMAT_TIME_WITH_SECOND: '{1}:{2}:{4} {3}',
  CMN_FORMAT_HOURS_AGO: '{0}H',
  CMN_FORMAT_MINUTES_AGO: '{0}M',
  CMN_AM_STR: 'AM',
  CMN_PM_STR: 'PM',
  CMN_FILESIZE_BYTE: '{0}B',
  CMN_FILESIZE_BYTES: '{0}B',
  CMN_FILESIZE_GIGABYTES: '{0}GB',
  CMN_FILESIZE_KILOBYTES: '{0}KB',
  CMN_FILESIZE_MEGABYTES: '{0}MB',
  CMN_LANGUAGE_THIS: 'Italiano',
  CMN_LANGUAGE_EN: 'Inglese',
  CMN_LANGUAGE_IT: 'Italiano',
  CMN_LANGUAGE_JA: 'Giaponese',
  CMN_LANGUAGE_ZH: 'Cinese',
  CMN_MOMENT_LOCALE: 'en',

  MSG_ABOUT_DIALOG_TITLE: 'Informazioni su {0}',
  MSG_CALL_DEVICE_WARNING:
    'Please check for problems of the microphone or the camera.',
  MSG_CALL_MISSED_NOTIFICATION: 'Missed call',
  MSG_CALL_NETWORK_WARNING: 'Please check for network problems.',
  MSG_CALL_NOTIFICATION: 'Chiamata voce',
  MSG_CALL_NOTIFICATION_WITH_VIDEO: 'Chiamata video',
  MSG_CALL_RTC_ANSWER_ERROR: 'Failed to answer call.',
  MSG_CALL_RTC_CAMERA_ERROR: 'Failed to make video call.',
  MSG_CALL_RTC_ERROR: 'Impossibile effettuare la chiamata.',
  MSG_CALL_RTC_MICROPHONE_ERROR: 'Failed to call.',
  MSG_CHAT_CLOSED: 'La chat è chiusa',
  MSG_CHAT_OFFLINE: 'The connection has been offline.',
  MSG_CLOSE_CHAT_CONFIRM: 'Sei sicuro di voler lasciare la conferenza?',
  MSG_CLOSE_CHAT_CONFIRM_TITLE: 'Lasciare la conferenza',
  MSG_CLOSE_TALKING_WEBCHAT_CONFIRM: 'Sei sicuro di voler chiudere la chat?',
  MSG_CLOSE_TALKING_WEBCHAT_CONFIRM_TITLE: 'Fine chat',
  MSG_CONFERENCE_INVITED: '{0} is inviting you to the conference.',
  MSG_CONFERENCE_INVITE_SUBJECT_REQUIRED: 'This field is required.',
  MSG_CONFERENCE_INVITING: 'Inviting {0} to the conference.',
  MSG_CONFERENCE_MEMBER_JOINED: '{0} è entrato nella chat.',
  MSG_CONFERENCE_MEMBER_LEFT: '{0} ha lasciato la chat.',
  MSG_CONFERENCE_MEMBER_OFFLINE: '{0} is offline now.',
  MSG_CONFERENCE_MEMBER_ONLINE: '{0} is online now.',
  MSG_CONFERENCE_ME_JOINED: 'Ti sei unito alla chat.',
  MSG_CONFERENCE_ME_LEFT: 'Hai lasciato la chat.',
  MSG_CONFERENCE_REPLY: 'Replying...',
  MSG_CREATE_CONFERENCE_DIALOG_TITLE: 'Crea una sala conferenze',
  MSG_CREATE_CONFERENCE_FAILED: 'Impossibile creare una conferenza.',
  MSG_CREATE_GROUP_DIALOG_PLACEHOLDER: 'Nome gruppo',
  MSG_CREATE_GROUP_DIALOG_TITLE: 'Crea un nuovo gruppo',
  MSG_CREATE_OUTGOING_AMBIGUOUS: 'Select a webchat service.',
  MSG_DROP_TALKING_WEBCHAT_CONFIRM: 'Sei sicuro di voler chiudere la chat?',
  MSG_DROP_TALKING_WEBCHAT_CONFIRM_TITLE: 'Fine chat',
  MSG_END_CHAT_CONFIRM: 'Sei sicuro di voler chiudere la chat?',
  MSG_END_CHAT_CONFIRM_TITLE: 'Fine chat',
  MSG_ERROR_POPUP_BLOCKED: 'La finestra UC è potrebbe essere bloccata.',
  MSG_EXTERNAL_CALL_DIALOG_PLACEHOLDER: 'Phone number',
  MSG_EXTERNAL_CALL_DIALOG_TITLE: 'Open an external call panel',
  MSG_FILE_CANCEL_CONFIRM: 'Are you sure you want to stop transferring?',
  MSG_FILE_CANCEL_CONFIRM_TITLE: 'File transferring',
  MSG_FILE_STATUS_ERROR: 'Errore. (Impossibile trasferire il file.)',
  MSG_INCOMINGBAR_MESSAGE: 'Incoming call from {0}...',
  MSG_INCOMINGBAR_MESSAGE_WITH_VIDEO: 'Incoming call from {0}... (Video)',
  MSG_INVITE_TO_CONFERENCE_DIALOG_TITLE: 'Invita alla conferenza',
  MSG_INVITE_TO_CONFERENCE_FAILED: 'Impossibile invitare alla conferenza.',
  MSG_JOIN_CONFERENCE_ERROR:
    'Errore. (Impossibile partecipare alla conferenza.)',
  MSG_JOIN_CONFERENCE_FAILED: 'Impossibile partecipare alla conferenza.',
  MSG_KICK_TALKING_WEBCHAT_CONFIRM: 'Sei sicuro di voler chiudere la chat?',
  MSG_KICK_TALKING_WEBCHAT_CONFIRM_TITLE: 'Fine chat',
  MSG_LEAVE_CONFERENCE_CONFIRM: 'Sei sicuro di voler lasciare la conferenza?',
  MSG_LEAVE_CONFERENCE_CONFIRM_TITLE: 'Lascia la conferenza',
  MSG_LEAVE_CONFERENCE_ERROR: 'Errore. (Impossibile lasciare la conferenza.)',
  MSG_LEAVE_CONFERENCE_FAILED: 'Impossibile lasciare la conferenza.',
  MSG_MESSAGEBAR_CONNECTING: 'Connessione...',
  MSG_MESSAGEBAR_DISCONNECTED: 'Sei stato disconnesso dal server.',
  MSG_MESSAGEBAR_MAINTENANCE:
    'Il servizio è ora interrotto a causa della manutenzione del sistema.',
  MSG_MESSAGEBAR_PLEONASTIC:
    "Sei stato disconnesso perché hai effettuato l'accesso in un'altra postazione",
  MSG_MESSAGEBAR_RETRY: 'Retrying in {0} sec.',
  MSG_OUTGOING_WEBCHAT_DIALOG_TITLE: 'Open a new outgoing webchat panel',
  MSG_PREFERENCE_AUDIO_SOURCE_TESTING:
    'Getting an access to the microphone now...',
  MSG_PREFERENCE_CHAT_BG_COLOR_EDIT_DIALOG_TITLE: 'Chat background colors',
  MSG_PREFERENCE_LAMP_TYPE_TEST_NOTIFICATION_BODY: 'Notification type test',
  MSG_PREFERENCE_LAMP_TYPE_TEST_NOTIFICATION_TITLE: 'Test',
  MSG_PREFERENCE_LOAD_FAILED: 'Failed to load preferences.',
  MSG_PREFERENCE_PROFILE_IMAGE_UPLOAD_FAILED:
    "Impossibile caricare l'immagine del profilo.",
  MSG_PREFERENCE_SAVE_CALLING: 'During a call.',
  MSG_PREFERENCE_SAVE_FAILED: 'Impossibile salvare le preferenze.',
  MSG_PREFERENCE_SAVE_SUCCESSFUL: 'Salvato con successo.',
  MSG_PREFERENCE_SAVE_TRANSFERRING: 'Trasferimento file.',
  MSG_RECEIVE_MORE_TEXTS_FAILED: 'Failed to receive messages.',
  MSG_RECEIVE_MORE_UNREAD_TEXTS_FAILED: 'Failed to receive unread messages.',
  MSG_REMOVE_GROUP_CONFIRM: 'Are you sure you want to remove the group?',
  MSG_REMOVE_GROUP_CONFIRM_TITLE: 'Rimuovi gruppo',
  MSG_REPLY_MANUAL_CONTINUATION_DIALOG_TITLE: 'Reentry code',
  MSG_SEARCH_TOPICS_FAILED: 'Ricerca non possibile',
  MSG_SEND_BROADCAST_TEXT_DIALOG_TITLE: 'Send a broadcast message',
  MSG_SEND_FILE_ERROR: 'Errore. (Impossibile inviare il file.)',
  MSG_SEND_FILE_MODAL_TITLE: 'Inviare file',
  MSG_SEND_TEXT_CONFIRM: 'Sei sicuro di voler inviare il messaggio?',
  MSG_SEND_TEXT_CONFIRM_TITLE: 'Invia testo',
  MSG_SEND_TEXT_ERROR: 'Errore. (Impossibile inviare il tuo messaggio.)',
  MSG_SIGN_IN_AUTHENTICATION_FAILED:
    'Impossibile accedere. Utilizza la password corretta.',
  MSG_SIGN_IN_FAILED: 'Errore.',
  MSG_SIGN_IN_IP_NOT_ALLOWED: 'Accesso non consentito',
  MSG_SIGN_IN_OVER_MAX_LOGIN_COUNT:
    'Hai superato il numero massimo di accessi degli utenti',
  MSG_SIGN_IN_SIGN_IN_FAILED: 'Impossibile accedere.',
  MSG_SIGN_IN_VALIDATION_ERROR_FORM: 'Si prega di compilare il modulo.',
  MSG_SIGN_IN_VERSION_INVALID: 'Si prega di ricaricare la pagina.',
  MSG_SIGN_OUT_CONFIRM: 'Are you sure you want to sign out?',
  MSG_SIGN_OUT_CONFIRM_TITLE: 'Disconnessione',
  MSG_STATUSBAR_MESSAGE_HEADER: 'Your status:',
  MSG_STATUS_DISPLAY_DIALOG_TITLE: 'Nota di stato',
  MSG_TOO_LONG: 'Messaggio troppo lungo.',
  MSG_TYPING: '{0} sta scrivendo...',
  MSG_UNKNOWN_CONTENTS: 'Contenuti sconosciuti',
  MSG_USER_LIST_DIALOG_TITLE: 'Edit the user list',
  MSG_WEBRTC_UNAVAILABLE_1: 'Non hai un ID  del telefono  WebRTC.',
  MSG_WEBRTC_UNAVAILABLE_2: 'Vorresti aggiungere un nuovo numero di telefono?',

  TAB_HISTORYDETAIL: 'History - ',
  TAB_HISTORYSUMMARIES: 'History',
  TAB_PREFERENCE: 'Preferenze',
  TAB_WEBCHATQUEUE: 'Webchat',

  LBL_BROADCAST_BUDDIES: 'Members',
  LBL_BROADCAST_GROUP: 'Group',
  LBL_BROADCAST_GROUP_NONE: '(None)',
  LBL_BROADCAST_MARK_CHECK_CAPTION: 'Mark',
  LBL_BROADCAST_MARK_ICON_TOOLTIP: 'Trasmissione',
  LBL_BROADCAST_TEXT_TEXTAREA_PLACEHOLDER: 'Inserisci il messaggio qui.',
  LBL_BUDDYLIST_BUTON_TOOLTIP: 'Agenti',
  LBL_CALL_ANSWER_BUTTON_TOOLTIP: 'Answer',
  LBL_CALL_ANSWER_WITH_VIDEO_BUTTON_TOOLTIP: 'Answer with video',
  LBL_CALL_CAMERA_CHANGE: 'Telecamera',
  LBL_CALL_CAMERA_MENU_BUTTON: 'Telecamera',
  LBL_CALL_CAMERA_MENU_BUTTON_TOOLTIP: 'Camera menu',
  LBL_CALL_CAMERA_MUTE_BUTTON: 'Video',
  LBL_CALL_CAMERA_MUTE_BUTTON_TOOLTIP: 'Stop video',
  LBL_CALL_CAMERA_UNMUTE_BUTTON: 'Video',
  LBL_CALL_CAMERA_UNMUTE_BUTTON_TOOLTIP: 'Start video',
  LBL_CALL_DECLINE_BUTTON_TOOLTIP: 'Rifiuta',
  LBL_CALL_DEVICE_ALL: 'All',
  LBL_CALL_DEVICE_AUTO: 'Automatico',
  LBL_CALL_DEVICE_SOUND_ONLY: 'Solo suono',
  LBL_CALL_DTMF_MENU_BUTTON: 'DTMF',
  LBL_CALL_DTMF_MENU_BUTTON_TOOLTIP: 'DTMF',
  LBL_CALL_FULLSCREEN_BUTTON: 'Schermo intero',
  LBL_CALL_FULLSCREEN_BUTTON_TOOLTIP: 'Schermo intero',
  LBL_CALL_HANG_UP_BUTTON_TOOLTIP: 'svuota',
  LBL_CALL_HOLD_BUTTON: 'Attesa',
  LBL_CALL_HOLD_BUTTON_TOOLTIP: 'Attesa',
  LBL_CALL_INCOMING: 'Chiamata in arrivo...',
  LBL_CALL_INCOMING_WITH_VIDEO: 'Chiamata in arrivo... (Video)',
  LBL_CALL_MENU_BUTTON_TOOLTIP: 'Call options',
  LBL_CALL_MICROPHONE_CHANGE: 'Microfono',
  LBL_CALL_MICROPHONE_MENU_BUTTON: 'Microfono',
  LBL_CALL_MICROPHONE_MENU_BUTTON_TOOLTIP: 'Microphone menu',
  LBL_CALL_MICROPHONE_MUTE_BUTTON: 'Mute',
  LBL_CALL_MICROPHONE_MUTE_BUTTON_TOOLTIP: 'Mute microphone',
  LBL_CALL_MICROPHONE_UNMUTE_BUTTON: 'Unmute',
  LBL_CALL_MICROPHONE_UNMUTE_BUTTON_TOOLTIP: 'Unmute microphone',
  LBL_CALL_MUTE_CAM_BUTTON_TOOLTIP: 'Telecamera Muta',
  LBL_CALL_MUTE_MIC_BUTTON_TOOLTIP: 'Microfono Muto',
  LBL_CALL_OUTGOING: 'Chimata in uscita...',
  LBL_CALL_RTC_ERROR_CHECK: 'Reset the device setting',
  LBL_CALL_SCREEN_BUTTON_TOOLTIP: 'Start screen sharing',
  LBL_CALL_SCREEN_END_BUTTON_TOOLTIP: 'Stop screen sharing',
  LBL_CALL_SPEAKER_CHANGE: 'Altoparlante',
  LBL_CALL_TRANSFER_CANCEL_BUTTON: 'Annulla',
  LBL_CALL_TRANSFER_CANCEL_BUTTON_TOOLTIP: 'Annulla',
  LBL_CALL_TRANSFER_COMPLETE_BUTTON: 'Trasferimento',
  LBL_CALL_TRANSFER_COMPLETE_BUTTON_TOOLTIP: 'Trasferimento',
  LBL_CALL_TRANSFER_CONFERENCE_BUTTON: 'Conferenza',
  LBL_CALL_TRANSFER_CONFERENCE_BUTTON_TOOLTIP: 'Conferenza',
  LBL_CALL_TRANSFER_MENU_BUTTON: 'Trasferisci',
  LBL_CALL_TRANSFER_MENU_BUTTON_TOOLTIP: 'Trasferisci',
  LBL_CALL_TRANSFER_TARGET_BUTTON: 'Chiamata',
  LBL_CALL_TRANSFER_TARGET_BUTTON_TOOLTIP: 'Chiamata',
  LBL_CALL_TRANSFER_USER_BUTTON: 'Chiamata',
  LBL_CALL_TRANSFER_USER_BUTTON_TOOLTIP: 'Chiamata',
  LBL_CALL_UNHOLD_BUTTON: 'Unhold',
  LBL_CALL_UNHOLD_BUTTON_TOOLTIP: 'Unhold',
  LBL_CALL_VIDEO_OPTIONS_HIDE_MENU: 'Do not display the menu',
  LBL_CALL_VIDEO_REFRESH_BUTTON_TOOLTIP: 'Refresh video',
  LBL_CHAT_AREA_SCROLL_TO_BOTTOM_BUTTON_TOOLTIP: 'Scroll down',
  LBL_CHAT_BROADCAST_MARK_TOOLTIP: 'Trasmissione',
  LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING: 'Call',
  LBL_CHAT_CALL_RESULT_DIRECTION_INCOMING_MISSED: 'Missed call',
  LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING: 'Call',
  LBL_CHAT_CALL_RESULT_DIRECTION_OUTGOING_MISSED: '',
  LBL_CHAT_CALL_RESULT_LENGTH_MIN: '{0} min {1} sec',
  LBL_CHAT_CALL_RESULT_LENGTH_SEC: '{0} sec',
  LBL_CHAT_FILE_CANCEL_BUTTON_TOOLTIP: 'Stop file transferring',
  LBL_CHAT_FILE_ICON_TOOLTIP: 'File',
  LBL_CHAT_FILE_INLINE_IMAGE_TOOLTIP: 'Open in new window',
  LBL_CHAT_LIST_OPEN_DETAIL_LINK_CONTENT: 'Open older messages',
  LBL_CHAT_OPTION_BUTTONS_REPLY_WEBCHAT_BUTTON: 'Reply',
  LBL_CHAT_OPTION_BUTTONS_REPLY_WEBCHAT_BUTTON_TOOLTIP: 'Reply',
  LBL_CHAT_SHOWMORELINK_CONTENT: 'Mostra più messaggi',
  LBL_CHAT_UNREAD_CONTENT: 'Non letto',
  LBL_CONFERENCE_INVITE_BUDDIES: 'Members',
  LBL_CONFERENCE_INVITE_GROUP: 'Group',
  LBL_CONFERENCE_INVITE_GROUP_NONE: '(None)',
  LBL_CONFERENCE_INVITE_SUBJECT: 'Title',
  LBL_CONFERENCE_INVITE_SUBJECT_NONE: '(No title)',
  LBL_CONFERENCE_JOIN_BUTTON: 'Aderisci',
  LBL_CONFERENCE_JOIN_BUTTON_TOOLTIP: 'Unisci conferenza',
  LBL_CONFERENCE_REJECT_BUTTON: 'Rifiuta',
  LBL_CONFERENCE_REJECT_BUTTON_TOOLTIP: 'Rifiuta',
  LBL_CONFERENCE_REJOIN_BUTTON: 'Rejoin',
  LBL_CONFERENCE_REJOIN_BUTTON_TOOLTIP: 'Rejoin conference',
  LBL_CUSTOMER_CHAT_RECONNECT_BUTTON: 'Reconnect',
  LBL_CUSTOMER_CHAT_RECONNECT_BUTTON_TOOLTIP: 'Reconnect',
  LBL_DIALOG_CLOSE_BUTTON_TOOLTIP: 'Fine',
  LBL_DIALOG_HIDE_BUTTON_TOOLTIP: 'Nascondi',
  LBL_EDITOR_END_CHAT_LINK: 'Fine chat',
  LBL_EDITOR_FILE_LINK: 'Invia file',
  LBL_EDITOR_HISTORY_LINK: 'History search',
  LBL_EDITOR_INVITE_LINK: 'Invita alla conferenza',
  LBL_EDITOR_KICK_LINK: 'End this chat',
  LBL_EDITOR_LEAVE_LINK: 'Lascia la conferenza',
  LBL_EDITOR_LEAVE_REJOINABLE_BUTTON: 'OK (Rejoinable)',
  LBL_EDITOR_MAKE_CALL_LINK: 'Chiama',
  LBL_EDITOR_OPTIONS_LINK: 'Opzioni',
  LBL_EDITOR_REPLY_LINK: 'Reply',
  LBL_EDITOR_REPLY_MANUAL_CONTINUATION_MENU: 'Webchat reentry',
  LBL_EDITOR_SCREEN_LINK: 'Condividi schermo',
  LBL_EDITOR_SEND_BUTTON: 'Invia',
  LBL_EDITOR_SEND_BUTTON_TOOLTIP: 'Invia',
  LBL_EDITOR_SEND_FILE_LINK: 'Invia file',
  LBL_EDITOR_SUBJECT_PLACEHOLDER: 'Subject',
  LBL_EDITOR_TEXTAREA_PLACEHOLDER: 'Inserisci il messaggio qui.',
  LBL_EDITOR_VIDEO_LINK: 'Chiamata video',
  LBL_EDITOR_VOICE_LINK: 'Chiamata voce',
  LBL_EXTERNAL_CALL_DIALOG_CALL: 'Chiamata voce',
  LBL_EXTERNAL_CALL_DIALOG_OPEN: 'Open',
  LBL_HISTORY_DATE: 'Data',
  LBL_HISTORY_NO_RESULTS: 'Nessun risultato',
  LBL_HISTORY_OPEN_DETAIL_BUTTON_TOOLTIP: 'Open new panel',
  LBL_HISTORY_REPLY_BUTTON_TOOLTIP: 'Reply',
  LBL_HISTORY_REPLY_MANUAL_CONTINUATION_MENU: 'Webchat reentry',
  LBL_HISTORY_SUMMARY_CALL: 'Call',
  LBL_HISTORY_SUMMARY_FILE: 'File',
  LBL_HISTORY_SUMMARY_OBJECT: 'Object',
  LBL_HISTORY_TYPE_CONFERENCE: 'Conferenza',
  LBL_HISTORY_TYPE_WEBCHAT: 'Webchat',
  LBL_HISTORY_WEBCHATS: 'Webchats',
  LBL_HISTORY_YOUR_CHATS: 'Your chats',
  LBL_INCOMINGBAR_CALL_MENU_BUTTON_TOOLTIP: 'Call options',
  LBL_MESSAGEBAR_CANCEL_BUTTON: 'Stop',
  LBL_MESSAGEBAR_CANCEL_BUTTON_TOOLTIP: 'Stop',
  LBL_MESSAGEBAR_RELOAD_BUTTON: 'Reload',
  LBL_MESSAGEBAR_RELOAD_BUTTON_TOOLTIP: 'Reload',
  LBL_MESSAGEBAR_RETRY_BUTTON: 'Riprova',
  LBL_MESSAGEBAR_RETRY_BUTTON_TOOLTIP: 'Riprova',
  LBL_OUTGOING_WEBCHAT_DIALOG_OPEN: 'Open',
  LBL_OUTGOING_WEBCHAT_REPLY_TYPE: 'Channel',
  LBL_OUTGOING_WEBCHAT_SERVICE_ID: 'Service ID',
  LBL_OUTGOING_WEBCHAT_TEXT_PLACEHOLDER: 'Address',
  LBL_PANEL_HEADER_CHAT_BUTTON_TOOLTIP: 'Chat',
  LBL_PANEL_HEADER_CLOSE_CHAT_BUTTON_TOOLTIP: 'Lascia',
  LBL_PANEL_HEADER_DOCK_BUTTON_TOOLTIP: 'Ristabilire',
  LBL_PANEL_HEADER_FILE_BUTTON_TOOLTIP: 'Invia file',
  LBL_PANEL_HEADER_HIDE_BUTTON_TOOLTIP: 'Chiudere tab',
  LBL_PANEL_HEADER_HIDE_SUB_BUTTON_TOOLTIP: 'Chiudi finestra',
  LBL_PANEL_HEADER_HISTORYDETAIL_TITLE: 'History - ',
  LBL_PANEL_HEADER_HISTORYSUMMARIES_TITLE: 'History search',
  LBL_PANEL_HEADER_HISTORY_BUTTON_TOOLTIP: 'History search',
  LBL_PANEL_HEADER_INVITE_BUTTON_TOOLTIP: 'Invita alla conferenza',
  LBL_PANEL_HEADER_KICK_BUTTON_TOOLTIP: 'End this chat',
  LBL_PANEL_HEADER_LEAVE_BUTTON_TOOLTIP: 'Lascia la conferenza',
  LBL_PANEL_HEADER_PREFERENCE_TITLE: 'Preferenze personali',
  LBL_PANEL_HEADER_REJOIN_BUTTON_TOOLTIP: 'Aderisci',
  LBL_PANEL_HEADER_REPLY_BUTTON_TOOLTIP: 'Reply',
  LBL_PANEL_HEADER_REPLY_MANUAL_CONTINUATION_MENU: 'Webchat reentry',
  LBL_PANEL_HEADER_SCREEN_BUTTON_TOOLTIP: 'Condividi schermo',
  LBL_PANEL_HEADER_SEARCH_BUTTON_TOOLTIP: 'Cerca',
  LBL_PANEL_HEADER_SEARCH_DETAIL_BUTTON_TOOLTIP: 'Ricerca avanzata',
  LBL_PANEL_HEADER_SEARCH_INPUT_PLACEHOLDER: 'Cerca',
  LBL_PANEL_HEADER_SEARCH_USER_ALL: 'Tutti',
  LBL_PANEL_HEADER_UNDOCK_BUTTON_TOOLTIP: 'Mostra in una nuova finestra',
  LBL_PANEL_HEADER_VIDEO_BUTTON_TOOLTIP: 'Chiamata video',
  LBL_PANEL_HEADER_VOICE_BUTTON_TOOLTIP: 'Chiamata voce',
  LBL_PREFERENCE_AUDIO_SOURCE: 'Microfono',
  LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON: 'Stop',
  LBL_PREFERENCE_AUDIO_SOURCE_STOP_BUTTON_TOOLTIP: 'Stop test',
  LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON: 'Test',
  LBL_PREFERENCE_AUDIO_SOURCE_TEST_BUTTON_TOOLTIP: 'Test',
  LBL_PREFERENCE_AUDIO_TARGET: 'Altoparlante',
  LBL_PREFERENCE_AUDIO_TARGET_STOP_BUTTON: 'Stop',
  LBL_PREFERENCE_AUDIO_TARGET_STOP_BUTTON_TOOLTIP: 'Stop test',
  LBL_PREFERENCE_AUDIO_TARGET_TEST_BUTTON: 'Test',
  LBL_PREFERENCE_AUDIO_TARGET_TEST_BUTTON_TOOLTIP: 'Test',
  LBL_PREFERENCE_AUTO_SIGN_IN: 'Accesso automatico',
  LBL_PREFERENCE_AUTO_SIGN_IN_CHECK: 'Salta la schermata di accesso ',
  LBL_PREFERENCE_BELL_AUDIO_TARGET: 'Notification sound device',
  LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON: 'Test',
  LBL_PREFERENCE_BELL_AUDIO_TARGET_TEST_BUTTON_TOOLTIP: 'Test',
  LBL_PREFERENCE_CATEGORY_TERMINAL: 'Impostazioni del terminale',
  LBL_PREFERENCE_CATEGORY_USER: 'Impostazioni utente',
  LBL_PREFERENCE_CATEGORY_WEBCHAT: 'Impostazioni webchat',
  LBL_PREFERENCE_CHAT_BG_COLOR: 'Chat background colors',
  LBL_PREFERENCE_CHAT_BG_COLOR_ADD_BUTTON_TOOLTIP: 'Add',
  LBL_PREFERENCE_CHAT_BG_COLOR_CUSTOM: 'Custom',
  LBL_PREFERENCE_CHAT_BG_COLOR_DELETE_BUTTON_TOOLTIP: 'Delete',
  LBL_PREFERENCE_CHAT_BG_COLOR_EDIT_BUTTON_TOOLTIP: 'Edit',
  LBL_PREFERENCE_CHAT_BG_COLOR_EXPORT_BUTTON_TOOLTIP: 'Export',
  LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_BACKWARD: 'ends with',
  LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_EXACT: 'equals',
  LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_FORWARD: 'begins with',
  LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_PARTIAL: 'contains',
  LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_USERCHATCONF: 'Conference',
  LBL_PREFERENCE_CHAT_BG_COLOR_FORMAT_WEBCHAT: 'Webchat',
  LBL_PREFERENCE_CHAT_BG_COLOR_IMPORT_BUTTON_TOOLTIP: 'Import',
  LBL_PREFERENCE_CHAT_BG_COLOR_STANDARD: 'Standard',
  LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_CONF_TYPE: 'Type',
  LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_GROUP: 'Group',
  LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_NAME: 'Name',
  LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_SUBJECT: 'Subject',
  LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_TAG: 'Data',
  LBL_PREFERENCE_CHAT_BG_COLOR_TYPE_USER_ID: 'Extension',
  LBL_PREFERENCE_DBGOPT: 'Debug options',
  LBL_PREFERENCE_DISPLAY_NAME: 'Nome da visualizzare',
  LBL_PREFERENCE_DISPLAY_PERIOD: 'Display period',
  LBL_PREFERENCE_DISPLAY_PERIOD_LABEL:
    'Show messages in chat panel for {0} days',
  LBL_PREFERENCE_DTMF_SHORTCUT: 'Dialing functions',
  LBL_PREFERENCE_DTMF_SHORTCUT_0_CHECK: 'Hold button',
  LBL_PREFERENCE_DTMF_SHORTCUT_1_CHECK: 'Transfer button',
  LBL_PREFERENCE_DTMF_SHORTCUT_2_CHECK: 'Transferable to offline users',
  LBL_PREFERENCE_DTMF_SHORTCUT_3_CHECK: 'Conference button',
  LBL_PREFERENCE_INITIAL_STATUS: 'Stato iniziale',
  LBL_PREFERENCE_LAMP_TYPE: 'Notification type',
  LBL_PREFERENCE_LAMP_TYPE_SILENT: 'Silent',
  LBL_PREFERENCE_LAMP_TYPE_STANDARD: 'Standard',
  LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON: 'Test',
  LBL_PREFERENCE_LAMP_TYPE_TEST_BUTTON_TOOLTIP: 'Test',
  LBL_PREFERENCE_LANGUAGE: 'Lingua',
  LBL_PREFERENCE_LANGUAGE_AUTO: 'automatico',
  LBL_PREFERENCE_LOGIN_PASSWORD: 'Login password',
  LBL_PREFERENCE_LOGIN_PASSWORD_CONFIRM: 'Login password (confirm)',
  LBL_PREFERENCE_NAME_DISPLAY_MODE: 'Extensions',
  LBL_PREFERENCE_NAME_DISPLAY_MODE_CHECK: 'Show',
  LBL_PREFERENCE_NOTIFY_CALL_STATUS: 'Call status',
  LBL_PREFERENCE_NOTIFY_CALL_STATUS_CHECK: 'Public',
  LBL_PREFERENCE_NOTIFY_CONF_STATUS: 'Conference status',
  LBL_PREFERENCE_NOTIFY_CONF_STATUS_CHECK: 'Public',
  LBL_PREFERENCE_NO_VIDEO_MODE: 'Video in voice call',
  LBL_PREFERENCE_NO_VIDEO_MODE_CONFERENCE: 'Sound only in conference',
  LBL_PREFERENCE_NO_VIDEO_MODE_DISPLAY: 'Display video from the opposite party',
  LBL_PREFERENCE_NO_VIDEO_MODE_SOUND: 'Sound only',
  LBL_PREFERENCE_PROFILE_IMAGE: 'Immagine del profilo',
  LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON: 'Remove',
  LBL_PREFERENCE_PROFILE_IMAGE_DELETE_BUTTON_TOOLTIP: 'Remove',
  LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON: 'Replace',
  LBL_PREFERENCE_PROFILE_IMAGE_UPLOAD_BUTTON_TOOLTIP: 'Replace',
  LBL_PREFERENCE_SENDING_CONFIRMATION: 'Invio di conferma',
  LBL_PREFERENCE_SENDING_CONFIRMATION_CHECK:
    'Conferma prima di inviare il messaggio',
  LBL_PREFERENCE_STATUS_OPTIONS_ENABLED: 'Status options',
  LBL_PREFERENCE_STATUS_OPTIONS_ENABLED_CHECK: 'Default',
  LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE: 'Notification type',
  LBL_PREFERENCE_STATUS_OPTIONS_LAMP_TYPE_DEFAULT: 'Default',
  LBL_PREFERENCE_VIDEO_SOURCE: 'Telecamera',
  LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON: 'Stop',
  LBL_PREFERENCE_VIDEO_SOURCE_STOP_BUTTON_TOOLTIP: 'Stop test',
  LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON: 'Test',
  LBL_PREFERENCE_VIDEO_SOURCE_TEST_BUTTON_TOOLTIP: 'Test',
  LBL_PREFERENCE_WEBCHAT_DISPLAY_NAME: 'Webchat display name',
  LBL_PREFERENCE_WEBRTC_ENABLED: 'WebRTC',
  LBL_PREFERENCE_WEBRTC_ENABLED_CHECK: 'Abilitato',
  LBL_PREFERENCE_WEBRTC_TYPE: 'Tipo WebRTC',
  LBL_PREFERENCE_WEBRTC_TYPE_DEFAULT: 'Default',
  LBL_PREFERENCE_WEBRTC_TYPE_STANDARD: 'Standard',
  LBL_SEARCH_CONDITION_CONTENT: 'Testo',
  LBL_SEARCH_CONDITION_DATETIME: 'Data',
  LBL_SEARCH_DIALOG_BUTTON_TOOLTIP: 'Ricerca Chat',
  LBL_SEARCH_DIALOG_TITLE: 'Ricerca Chat',
  LBL_SEARCH_DO_BUTTON: 'Ricerca',
  LBL_SEARCH_DO_BUTTON_TOOLTIP: 'Ricerca',
  LBL_SEARCH_MORE_BUTTON: 'Mostra di più',
  LBL_SEARCH_MORE_BUTTON_TOOLTIP: 'Mostra di più',
  LBL_SEARCH_SEARCHING: 'Ricerca in corso',
  LBL_SEARCH_SELECT_ALL_BUTTON: 'Seleziona tutto',
  LBL_SEARCH_SELECT_ALL_BUTTON_TOOLTIP: 'Seleziona tutto',
  LBL_SEARCH_SELECT_BUTTON: 'Seleziona',
  LBL_SEARCH_SELECT_BUTTON_TOOLTIP: 'Seleziona',
  LBL_SIDEBAR_ABOUT_ITEM: 'Informazioni su {0}',
  LBL_SIDEBAR_AREA_SPLITTER_BUTTON_TOOLTIP: 'Split',
  LBL_SIDEBAR_AREA_SPLITTER_ITEM_0: '1 column',
  LBL_SIDEBAR_AREA_SPLITTER_ITEM_1: '2 columns',
  LBL_SIDEBAR_AREA_SPLITTER_ITEM_2: '2 columns and 2 rows',
  LBL_SIDEBAR_BUDDYLIST_FILTER_BUTTON_TOOLTIP: 'Filter options',
  LBL_SIDEBAR_BUDDYLIST_FILTER_INPUT_PLACEHOLDER: 'Filtra',
  LBL_SIDEBAR_BUDDYLIST_ITEM_CALL: 'Call',
  LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_DIRECTION_INCOMING_MISSED:
    'Missed call',
  LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_LENGTH_MIN: '{0} min',
  LBL_SIDEBAR_BUDDYLIST_ITEM_CALL_RESULT_LENGTH_SEC: '{0} sec',
  LBL_SIDEBAR_CALL_STATUS_ICON_TOOLTIP: 'In a call',
  LBL_SIDEBAR_CONFERENCE_STATUS_ICON_TOOLTIP: 'In a conference',
  LBL_SIDEBAR_CONTROL_BUTTONS_COLLAPSED_MENU_BUTTON_TOOLTIP: 'Menu',
  LBL_SIDEBAR_CREATE_CONFERENCE_BUTTON_TOOLTIP: 'Crea una sala conferenze',
  LBL_SIDEBAR_CREATE_GROUP_BUTTON_TOOLTIP: 'Crea un nuovo gruppo',
  LBL_SIDEBAR_EDIT_STATUS_DISPLAY_BUTTON_TOOLTIP: 'Nota di stato',
  LBL_SIDEBAR_EXTERNAL_CALL_BUTTON_TOOLTIP: 'External call',
  LBL_SIDEBAR_HISTORY_ITEM: 'History search',
  LBL_SIDEBAR_ONLINE_ONLY_ITEM: 'Solo online',
  LBL_SIDEBAR_OUTGOING_WEBCHAT_BUTTON_TOOLTIP: 'Outgoing webchat',
  LBL_SIDEBAR_PREFERENCE_ITEM: 'Preferenze personali',
  LBL_SIDEBAR_SEND_BROADCAST_TEXT_BUTTON_TOOLTIP: 'Trasmissione',
  LBL_SIDEBAR_SERVER_PROPERTIES_ITEM: 'Impostazioni del server',
  LBL_SIDEBAR_SIGN_OUT_BUTTON_TOOLTIP: 'Disconnessione',
  LBL_SIDEBAR_USER_LIST_BUTTON_TOOLTIP: 'User list',
  LBL_SIDEBAR_WEBCHAT_REQUESTS_ITEM: 'Richieste Webchat',
  LBL_SIGN_IN_ADMIN_MODE: 'Admin mode',
  LBL_SIGN_IN_BUTTON: 'Inizia a chattare',
  LBL_SIGN_IN_PASSWORD: 'Password',
  LBL_SIGN_IN_REMEMBERME: 'Ricordami',
  LBL_SIGN_IN_SIGNIN: 'Registrati',
  LBL_SIGN_IN_TENANT: 'Tenant',
  LBL_SIGN_IN_TITLE: 'Registrati',
  LBL_SIGN_IN_USERID: 'Utente',
  LBL_STATUS_DISPLAY_CLEAR_BUTTON_TOOLTIP: 'Clear',
  LBL_STATUS_DISPLAY_ITEM_DELETE_BUTTON_TOOLTIP: 'Delete',
  LBL_STATUS_DISPLAY_ITEM_EDIT_BUTTON_TOOLTIP: 'Edit',
  LBL_STATUS_DISPLAY_USE_LATER_BUTTON_TOOLTIP: 'Use later',
  LBL_SUB_WINDOW_MODULE_TITLE: 'Chat',
  LBL_TAB_LINK_HIDE_BUTTON_TOOLTIP: 'Fine',
  LBL_TAB_LINK_HIDE_MENU: 'Fine',
  LBL_TAB_LINK_MOVE_DOWN_MENU: 'Move down',
  LBL_TAB_LINK_MOVE_LEFT_MENU: 'Move left',
  LBL_TAB_LINK_MOVE_RIGHT_MENU: 'Move right',
  LBL_TAB_LINK_MOVE_UP_MENU: 'Move up',
  LBL_USER_LIST_ALL_USERS_CHECK: 'Add all users to the list',
  LBL_USER_LIST_CAPACITY: 'Capacity',
  LBL_USER_LIST_CAPTION: 'User list',
  LBL_USER_LIST_CREATE_GROUP_BUTTON_TOOLTIP: 'Crea un nuovo gruppo',
  LBL_USER_LIST_CREATE_GROUP_INPUT_PLACEHOLDER: 'Nome gruppo',
  LBL_USER_LIST_CREATE_GROUP_SUBMIT_BUTTON: 'Create',
  LBL_USER_LIST_CREATE_GROUP_SUBMIT_BUTTON_TOOLTIP: 'Create',
  LBL_USER_LIST_GROUP_CHECK_ALL_MENU: 'Check all',
  LBL_USER_LIST_GROUP_REMOVE_GROUP_MENU: 'Remove group',
  LBL_USER_LIST_GROUP_UNCHECK_ALL_MENU: 'Uncheck all',
  LBL_USER_LIST_NO_GROUP: '(No group)',
  LBL_USER_LIST_SAVE_ORDER_CHECK: 'Save the order of users',
  LBL_USER_LIST_SORT_ORDER: 'Sort order',
  LBL_USER_LIST_SORT_ORDER_GROUP: 'Group',
  LBL_USER_LIST_SORT_ORDER_GROUP_CHECK: 'Display with grouping',
  LBL_USER_LIST_SORT_ORDER_NAME: 'Name',
  LBL_USER_LIST_SORT_ORDER_NONE: '(None)',
  LBL_USER_LIST_SORT_ORDER_USER_ID: 'Extension',
  LBL_WEBCHAT_DROP_BUTON_TOOLTIP: 'Fine chat',
  LBL_WEBCHAT_PICKUP_BUTON_TOOLTIP: 'Rispondi alla chat',
  LBL_WEBCHAT_QUEUE_BUTON_OFFLINE_TOOLTIP: 'Disconnesso',
  LBL_WEBCHAT_QUEUE_BUTON_STARTING_TOOLTIP: 'Registrarsi',
  LBL_WEBCHAT_QUEUE_BUTON_TOOLTIP: 'Coda di chat',
  LBL_WEBCHAT_QUEUE_SHOW_ALL_LINK: 'Mostra tutte le chat',
  LBL_WEBCHAT_QUEUE_SHOW_ALL_LINK_TOOLTIP: 'Mostra tutte le chat',
  LBL_WEBCHAT_QUEUE_TABLE_AGENT_COLUMN: 'Assegnato',
  LBL_WEBCHAT_QUEUE_TABLE_MESSAGE_COLUMN: 'Messaggio',
  LBL_WEBCHAT_QUEUE_TABLE_NAME_COLUMN: 'Cliente',
  LBL_WEBCHAT_ROOM_CHAT_BUTON: 'Risposta',
  LBL_WEBCHAT_ROOM_CHAT_BUTON_TOOLTIP: 'Risposta',
  LBL_WEBCHAT_ROOM_HIDE_BUTON: 'Fine',
  LBL_WEBCHAT_ROOM_HIDE_BUTON_TOOLTIP: 'Fine',
  LBL_WEBCHAT_ROOM_JOIN_BUTON: 'Aderisci',
  LBL_WEBCHAT_ROOM_JOIN_BUTON_TOOLTIP: 'Aderisci',
  LBL_WEBCHAT_ROOM_SHOW_BUTON: 'Mostra',
  LBL_WEBCHAT_ROOM_SHOW_BUTON_TOOLTIP: 'Mostra',
  LBL_WEBRTC_UNAVAILABLE_NEVER: 'Non usare WebRTC',
  LBL_WEBRTC_UNAVAILABLE_NO: 'Non ora',
  LBL_WEBRTC_UNAVAILABLE_YES: 'Sì',

  DUMMY: '',
}))
