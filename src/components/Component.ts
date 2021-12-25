import Property from "./Property";

export default class Component {
  static alias:string[] = []
  readonly id:string
  readonly name:string

  constructor(readonly layerJson:any, readonly path:string[]) { 
    this.id = layerJson.do_objectID
    this.name = layerJson.name
    this.prepareProperties()
    this.extract()
  }
  
  get type():string {
    return this.constructor.name
  }
  properties:Property[] = []

  prepareProperties():void {}

  addProperty(property:Property) {
    this.properties.push(property)
  }

  extract() {
    this.properties.forEach((prop:Property) => prop._extract(this.layerJson))
  }

  toJson():any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      path: this.path.join('/'),
      properties: this.properties.map((prop:Property) => prop.toJson())
    }
  }
}