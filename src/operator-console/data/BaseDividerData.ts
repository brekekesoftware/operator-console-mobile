const _dividerDirections = {
  horizontal: 0,
  vertical: 1,
}

export class BaseDividerData {
  _PanelDataAsParent?: any
  constructor(panelDataAsParent) {
    this._PanelDataAsParent = panelDataAsParent
  }

  static get DIVIDER_DIRECTIONS() {
    return _dividerDirections
  }

  // abstract
  getDividerDirection() {
    throw new Error('Not implemented.')
  }

  setDividerDataToObject(o) {
    o['dividerDirection'] = this.getDividerDirection()
  }
}
