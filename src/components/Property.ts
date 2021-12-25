
export default  class Property {
  value:any //json
  path:string[] = []

  _extract(layerJson:any) {
    const { path, value } = this.extract(layerJson)
    this.path = path
    this.value = value
  }
  constructor(readonly name:string, readonly extract:Function){}

  toJson():any {
    return {
      name: this.name,
      path: this.path.join('/'),
      value: this.value
    }
  }
}