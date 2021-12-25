const jp = require('jsonpath')

const selectLayersByName = (root:any, name:string, isRecursive=false) => {
  const query = (isRecursive) ? `$..layers[?(@.name.indexOf('${name}')>-1)]` : `$.layers[?(@.name.indexOf('${name}')>-1)]`
  return jp.nodes(root, query)
}

const selectLayerByName = (root:any, name:string, isRecursive=false) => selectLayersByName(root, name, isRecursive)[0]

export {
  selectLayersByName,
  selectLayerByName
}