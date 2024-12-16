import { View } from 'react-native'

import { dndEventEmiter } from '../../../lib/rnd/DndEventEmiter'
import { Draggable } from '../../../lib/rnd/Draggable'

// !abstract class
export class EditorWidgetTemplate {
  _EditorWidgetTemplateFactoryAsParent
  _WidgetTypeId
  constructor(editorWidgetTemplateFactoryAsParent, widgetTypeId) {
    this._EditorWidgetTemplateFactoryAsParent =
      editorWidgetTemplateFactoryAsParent
    this._WidgetTypeId = widgetTypeId
  }
  _initPosition = {
    px: 0,
    py: 0,
  }

  getWidgetTypeId() {
    return this._WidgetTypeId
  }

  // !abstract
  getWidth(): number {
    throw new Error('Not implemented.')
  }

  // !abstract
  getHeight(): number {
    throw new Error('Not implemented.')
  }

  // !abstract
  getRenderMainJsx(): React.ReactNode {
    throw new Error('Not implemented.')
  }

  getRenderJsx(jsxKey, editScreenViewAsCaller) {
    const width = this.getWidth()
    const height = this.getHeight()
    const renderMainJsx = this.getRenderMainJsx()
    return (
      <Draggable
        key={jsxKey}
        data-br-widget-type-id={this._WidgetTypeId}
        style={{
          width,
          height,
          marginBottom: 4,
        }}
        onDragStart={ev => {
          this._initPosition.px = ev.px
          this._initPosition.py = ev.py
        }}
        onDragEnd={([nX, nY], gestureState) =>
          dndEventEmiter.emit('drop', {
            editorWidgetTypeId: String(this._WidgetTypeId),
            nX,
            nY,
            gestureState,
            px: this._initPosition.px,
            py: this._initPosition.py,
          })
        }
      >
        {renderMainJsx}
      </Draggable>
    )
  }
}
