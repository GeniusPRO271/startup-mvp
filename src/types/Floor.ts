import Slabs from "./Layers/Slabs"
import Walls from "./Layers/Wall"
import BuildingLayer from "./BuildingLayer"


export default class Floor{
    public FloorId : string
    public Layers: Array<BuildingLayer>
    public RawData: any

    constructor(floorId:string, rawData: any){
        this.FloorId = floorId
        this.Layers = this.getLayers(rawData)
        this.RawData = rawData
    }

    private getLayers(rawData:any) : Array<BuildingLayer>{
        try{
            let layers: Array<BuildingLayer> = []

            for(const layer in rawData){
                if(layer == "walls"){
                    const layerData =  new Walls(rawData[layer],layer)
                    layers.push(layerData)
                } else if(layer == "slabs"){
                    const layerData =  new Slabs(rawData[layer],layer)
                    layers.push(layerData)
                }
            }
            return layers


        }catch(error){
            console.log(error)
            return []
        }
    }
}