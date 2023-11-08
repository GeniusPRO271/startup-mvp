class Wall implements IBuildingLayer{
    public Coords: IBoxCoords
    public WallId: string
    public WallType: IWallType

    constructor(coords: IBoxCoords, wallId: string, wallType:IWallType){
        this.Coords = coords
        this.WallId = wallId
        this.WallType = wallType
    }
}