// !abstract class
export class EditorWidgetTemplate {
  _EditorWidgetTemplateFactoryAsParent
  _WidgetTypeId
  constructor(editorWidgetTemplateFactoryAsParent, widgetTypeId) {
    this._EditorWidgetTemplateFactoryAsParent =
      editorWidgetTemplateFactoryAsParent
    this._WidgetTypeId = widgetTypeId
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
      <div
        key={jsxKey}
        data-br-widget-type-id={this._WidgetTypeId}
        style={{
          width,
          height,
          marginBottom: 4,
        }}
        draggable={true}
        onDragStart={ev =>
          editScreenViewAsCaller.onDragEditorWidgetTemplateStart(ev)
        }
      >
        {renderMainJsx}
      </div>
    )
  }
}
