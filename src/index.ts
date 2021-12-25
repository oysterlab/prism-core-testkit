import Components from "./components"
import Component from "./components/Component"
import { selectLayerByName, selectLayersByName } from "./utils/Selector"

const sketch2json = require('sketch2json')
const fs = require('fs')

const sketchFilePath = "./sample/sample1.sketch"

async function main() {
  const data = await sketch2json(fs.readFileSync(sketchFilePath))

  Object.values(Components).forEach((ComponentClass:typeof Component) => {
    ComponentClass.alias.forEach((alias:string) => {
      const componentLayerNodes = selectLayersByName(data, '@' + alias, true)
      componentLayerNodes.forEach((componentLayerNode:any) => {
        const instance = new ComponentClass(componentLayerNode.value, componentLayerNode.path)
        const result = instance.toJson()
        console.log(result)
        console.log() 
      })
    })
  })

  // const componentLayerNode = selectLayerByName(data, '@C_ImageBox_01', true)
  // if (!componentLayerNode) return
  // const instance = new CImageBox01(componentLayerNode.value, componentLayerNode.path)
  // const result = instance.toJson()
  // console.log(result)  
}

main()