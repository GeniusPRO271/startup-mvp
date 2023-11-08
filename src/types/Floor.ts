class Floor{
    public FloorId : string
    public Layers:[IBuildingLayer]

    constructor(floorId:string, layers:[IBuildingLayer]){
        this.FloorId = floorId
        this.Layers = layers
    }
}