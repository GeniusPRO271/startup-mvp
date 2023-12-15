import Slabs from "./Layers/Slabs"
import Walls from "./Layers/Wall"
import BuildingLayer from "./Layers/BuildingLayer"


export default class Floor{
    public FloorId : string
    public FloorNumber: string
    public Layers: Array<BuildingLayer>
    private FloorRestriction: any

    constructor(floorId:string, rawData: any, floorNumber:string, floorRestrictions:any){
        
        this.FloorId = floorId
        this.FloorRestriction = floorRestrictions
        this.Layers = this.getLayers(rawData, floorRestrictions)
        this.FloorNumber = floorNumber 
    }

    private getLayers(rawData:any , floorRestrictions:any) : Array<BuildingLayer>{
        try{
            let layers: Array<BuildingLayer> = []

            for(const layer in rawData){
                console.log("LAYER_FLOOR_NAMES=", layer)
                console.log("LAYER_FLOOR_RESTRICTIONS=", floorRestrictions["walls restrictions"])
                if(layer == "walls"){
                    const layerData =  new Walls(rawData[layer],layer,floorRestrictions["walls restrictions"])
                    layers.push(layerData)
                } else if(layer == "slabs"){
                    const layerData =  new Slabs(rawData[layer],layer)
                    layers.push(layerData)
                }
            }
            return layers


        }catch(error){
            console.error("ERROR_AT_FLOOR_GET_LAYER=", error)
            return []
        }
    }
}