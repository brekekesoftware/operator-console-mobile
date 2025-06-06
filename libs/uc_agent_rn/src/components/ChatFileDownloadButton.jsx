import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import Constants from '../utilities/constants'
import DownloadIcon from '../icons/DownloadIcon'

const colors = {
  darkGray: '#9e9e9e',
  mantis: '#74C365',
  isabellineTp: 'rgba(0, 0, 0, 0.065)',
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 4,
  },
  downloadButtonEnabled: {
    color: colors.mantis,
  },
  downloadButtonPressed: {
    backgroundColor: colors.isabellineTp,
    ...Platform.select({
      ios: {
        shadowColor: colors.isabellineTp,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  downloadButtonUnclickable: {
    opacity: 0.5,
  },
  icon: {
    width: 24,
    height: 20,
    marginRight: 4,
    resizeMode: 'contain',
  },
  iconDisabled: {
    opacity: 0.5,
  },
  fileName: {
    color: colors.darkGray,
  },
  fileNameEnabled: {
    color: colors.mantis,
  },
})

/**
 * ChatFileDownloadButton
 * props.uiData
 * props.uiData.ucUiAction
 * props.message
 * props.message.messageFile
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false,
      isPressed: false,
    }
  }

  checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download files',
          },
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    } else {
      return true
    }
  }

  downloadFile = async (url, fileName) => {
    const { dirs } = RNFetchBlob.fs
    const dirToSave =
      Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir

    const filePath = `${dirToSave}/${fileName}`

    try {
      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path: filePath,
          appendExt: fileName.split('.').pop(),
        },
        android: {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: filePath,
            description: 'Downloading file...',
          },
        },
      })

      const response = await RNFetchBlob.config(configOptions).fetch('GET', url)

      if (Platform.OS === 'ios') {
        await RNFetchBlob.ios.previewDocument(response.path())
      }
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  handleDownload = async () => {
    const { props } = this
    const { messageFile } = props.message

    if (
      this.state.clicked ||
      messageFile.status !== Constants.FILE_STATUS_UNACCEPTED
    ) {
      this.setState({ clicked: true })
      return
    }

    this.setState({ clicked: true })

    if (messageFile.inlineImage && messageFile.inlineImage.url) {
      const hasPermission = await this.checkPermission()
      if (hasPermission) {
        await this.downloadFile(messageFile.inlineImage.url, messageFile.name)
      }
    } else {
      props.uiData.ucUiAction.acceptFile({
        file_id: messageFile.file_id,
      })
    }
  }

  handlePressIn = () => {
    this.setState({ isPressed: true })
  }

  handlePressOut = () => {
    this.setState({ isPressed: false })
  }

  render() {
    const { props } = this
    const { messageFile } = props.message
    const { clicked, isPressed } = this.state

    const isEnabled =
      messageFile.status === Constants.FILE_STATUS_UNACCEPTED ||
      (messageFile.inlineImage && messageFile.inlineImage.url)

    const isUnclickable = messageFile.inlineImage?.url && clicked

    const buttonStyles = [
      styles.downloadButton,
      isEnabled && styles.downloadButtonEnabled,
      isPressed && styles.downloadButtonPressed,
      isUnclickable && styles.downloadButtonUnclickable,
    ]

    const iconStyles = [styles.icon, !isEnabled && styles.iconDisabled]

    const textStyles = [styles.fileName, isEnabled && styles.fileNameEnabled]

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={this.handleDownload}
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
          disabled={!isEnabled || isUnclickable}
          style={buttonStyles}
        >
          <View style={iconStyles}>
            <DownloadIcon />
          </View>

          <Text style={textStyles} numberOfLines={1}>
            {messageFile.name}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
