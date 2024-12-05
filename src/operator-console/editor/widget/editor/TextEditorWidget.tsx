import { Util } from '../../../Util'
import { EditorWidget } from './EditorWidget'

export class TextEditorWidget extends EditorWidget {
  constructor(props) {
    super(props)
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.props.widgetData
    const text = widgetData.getText()
    const textFontSize = widgetData.getTextFontSize()
      ? widgetData.getTextFontSize()
      : 14
    const textFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getTextFgColor(),
      '',
    )
    const textBgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getTextBgColor(),
      'rgb(245,245,245)',
    )
    const textBorderRadius =
      widgetData.getTextBorderRadius() || widgetData.getTextBorderRadius() === 0
        ? widgetData.getTextBorderRadius()
        : ''

    return (
      <div
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          wordBreak: 'break-all',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          fontSize: textFontSize,
          color: textFgColor,
          backgroundColor: textBgColor,
          borderRadius: textBorderRadius,
        }}
      >
        {text}
      </div>
    )
  }
}
