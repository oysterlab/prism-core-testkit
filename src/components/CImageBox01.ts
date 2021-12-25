import { rgbToHex } from "../utils/Convertor";
import { selectLayerByName } from "../utils/Selector"
import Component from "./Component"
import Property from "./Property"
const jp = require('jsonpath')

export default class CImageBox01 extends Component {
  static alias = ['CImageBox01', 'C_ImageBox_01']

  prepareProperties():void {
    [
      this.getBackgroundColor(),
      this.getResourceUrlProp(),
      this.getScaledTypeProp()
    ]
    .forEach((prop:Property) => this.addProperty(prop))
  }  

  getBackgroundColor():Property {
    const name:string = 'BackgroundColor'
    const extract:Function = (componentLayer:any) => {
      const node = selectLayerByName(componentLayer, '#BackgroundColor')
      if (!node) return false
      const query = `$.style.fills[?(@.fillType==0)].color`
      const fill:any = jp.query(node.value, query)[0]
      if (!fill) return false
      const value = rgbToHex(parseInt((fill.red * 255.0) + ''), parseInt((fill.green * 255.0) + ''), parseInt((fill.blue * 255.0) + ''), parseInt(fill.alpha))
      return {
        path: [...this.path, ...node.path.slice(1)],
        value, 
      }
    }

    return new Property(name, extract)
  }

  getResourceUrlProp() {
    const name:string = 'ResourceUrl'
    const extract:Function = (componentLayer:any) => {
      const node = selectLayerByName(componentLayer, '#ResourceUrl')
      if (!node) return false
      const query = `$.style.fills[?(@.image)]`
      const fillNode = jp.nodes(node.value, query)[0]
      if (!fillNode) return false
      const { image: {_ref: src} } = fillNode.value
      return {
        path: [...this.path, ...node.path.slice(1), ...fillNode.path.slice(1)],
        value: src
      }
    }

    return new Property(name, extract)
  }

  getScaledTypeProp() {
    const name:string = 'ScaledType'
    const extract:Function = (componentLayer:any) => {
      const imageLayer = selectLayerByName(componentLayer, 'ResourceUrl')
      const maskLayer = selectLayerByName(componentLayer, 'Mask')
      let result = 'Fit'
      if (!imageLayer && !maskLayer) result = 'Fit'
      else if (imageLayer && !maskLayer) {
        const imageQuery = `$.style.fills[?(@.image)]`
        const fill = jp.query(imageLayer.value, imageQuery)[0]
        if (!fill) result = 'Fit'
        result = (fill.patternFillType == 3) ? 'Fit' : 'Fill'
      } else {
        result = 'Crop'
      }

      return {
        path: [...this.path],
        value: result
      }
    }

    return new Property(name, extract)    
  }
}