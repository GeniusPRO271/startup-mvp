class Joint implements IBuildingLayer{
    public Coords: ILineCoords
    public JointId: string

    constructor(coords: ILineCoords, jointId: string){
        this.Coords = coords
        this.JointId = jointId
    }
}