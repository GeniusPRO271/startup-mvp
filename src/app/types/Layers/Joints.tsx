import React from "react";
import BuildingLayer from "../BuildingLayer";

export default class Joints extends BuildingLayer{
    public CoordsGroup: Array<Joint>;

    constructor(rawData:any, id:string){
        super(rawData,id)
        this.Id = id
        this.CoordsGroup = this.getCoords(rawData)
        this.RawData = rawData
    }

    getCoords(rawData: any) {
        try{   

            let coordsGroup: Array<Joint> = []

            if(rawData){
                for(const coords in rawData){
                    let coordsDATA = new Joint(coords, rawData[coords], "blue", "blue")
    
                    coordsGroup.push(coordsDATA)
                }
            }
            return coordsGroup


        }catch(error){
            console.log(error)
            return []
        }
    }
}

export class Joint implements ILayer{
    public Coords: Array<Array<number>>
    public Id:string
    public Color: string;
    public FillColor:string
    

    constructor( id:string,coords:Array<Array<number>>, color:string, fillColor:string) {
        this.Id = id
        this.Coords = coords
        this.Color = color
        this.FillColor = fillColor
    }

    render(): React.ReactNode {
        return(
            <>
                <circle id={"T_"+this.Id} key={"T_"+this.Id} r={5} cx={(this.Coords[0][0] * 20) + 100} cy={this.Coords[0][1] * 20} color={this.Color} fill={this.FillColor} style={{position:"absolute", zIndex:200}}/>
                <circle id={"B_"+this.Id} key={"B_"+this.Id} r={5} cx={(this.Coords[1][0] * 20) + 100} cy={this.Coords[1][1] * 20} color={this.Color} fill={this.FillColor} style={{position:"absolute", zIndex:200}}/>
            </>
        )
    }
}