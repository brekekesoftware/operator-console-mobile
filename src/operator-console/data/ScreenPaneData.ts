import { PaneData } from './PaneData'

export class ScreenPaneData extends PaneData {
  constructor(options) {
    super(options)
    // this._ScreenDataAsParent = options.paneDatasAsParent;
    this._PaneDatasAsParent = options['paneDatasAsParent']
  }

  getScreenDatasAsParent() {
    return this._PaneDatasAsParent
  }
}
