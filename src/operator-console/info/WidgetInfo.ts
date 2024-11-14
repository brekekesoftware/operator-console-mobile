// Abstract class
export class WidgetInfo {
  _Object
  constructor(options) {
    this._Object = options.object
  }

  getWidgetObject() {
    const object = this._Object
    return object
  }
}
