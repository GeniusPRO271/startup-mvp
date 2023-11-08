class Building{
    private RawData: string;
    public Id: string;
    public Floors: [Floor]

    constructor(rawData: string, id: string, floors: [Floor]){
        this.RawData = rawData
        this.Id = id
        this.Floors = floors
    }
}