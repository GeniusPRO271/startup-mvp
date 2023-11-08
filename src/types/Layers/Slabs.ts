class Slabs implements IBuildingLayer{
    public Coords: IBoxCoords
    public SlabsId: string

    constructor(coords: IBoxCoords, slabsId: string){
        this.Coords = coords
        this.SlabsId = slabsId
    }
}