class Plane {
    public PlaneId: string
    public Building:Building

    constructor(planeId: string, building: Building){
        this.PlaneId = planeId
        this.Building = building
    }
}