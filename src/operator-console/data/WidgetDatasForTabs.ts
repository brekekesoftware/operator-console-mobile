import { WidgetDatas } from './WidgetDatas'

export class WidgetDatasForTabs extends WidgetDatas {
  _TabDataAsParent
  constructor(
    tabDataAsParent,
    cloneSrcWidgetDatasForTabs = null,
    oWidgetDatas = null,
  ) {
    super(cloneSrcWidgetDatasForTabs, oWidgetDatas)
    this._TabDataAsParent = tabDataAsParent
  }

  setWidgetDatasForTabsToObject(o) {
    super._setWidgetDatasToObject(o)
  }
}
