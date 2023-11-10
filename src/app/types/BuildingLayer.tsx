import React from "react"

export default class BuildingLayer{

    public CoordsGroup:Array<ILayer>
    public RawData:any
    public Id: string // for future implementations

    constructor(rawData : any, id: string){
        this.CoordsGroup = this.getCoords(rawData)
        this.Id = id
        this.RawData = rawData
    }

    render() : React.ReactNode {
        return(
            <g id={this.Id} key={"BuildingLayer" + this.Id}>

            </g>
        )
    }

    getCoords(rawData:any) : any{}

    ParseCoords(Coords:Array<Array<number>>, id:string, type:string="box"){
        //for fututure implementation
    }
}