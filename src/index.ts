import Components from "./components"
import Component from "./components/Component"
import { selectLayersByName } from "./utils/Selector"

const sketch2json = require('sketch2json')
const fs = require('fs')

const sketchFilePath = "./sample/sample1.sketch"

async function main() {
  const data = await sketch2json(fs.readFileSync(sketchFilePath))

  const meta:any[] = []
  
  Object.values(Components).forEach((ComponentClass:typeof Component) => {
    ComponentClass.alias.forEach((alias:string) => {
      const componentLayerNodes = selectLayersByName(data, '@' + alias, true)
      componentLayerNodes.forEach((componentLayerNode:any) => {
        const instance = new ComponentClass(componentLayerNode.value, componentLayerNode.path)
        const result = instance.toJson()
        meta.push(result)
      })
    })
  })

  console.log(meta)
}

main()