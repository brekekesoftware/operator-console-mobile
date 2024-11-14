import { WidgetDatas } from './WidgetDatas'

export class WidgetDatasForTabs extends WidgetDatas {
  _TabDataAsParent
  constructor(tabDataAsParent, cloneSrcWidgetDatasForTabs, oWidgetDatas) {
    super(cloneSrcWidgetDatasForTabs, oWidgetDatas)
    this._TabDataAsParent = tabDataAsParent
  }

  setWidgetDatasForTabsToObject(o) {
    super._setWidgetDatasToObject(o)
  }
}
