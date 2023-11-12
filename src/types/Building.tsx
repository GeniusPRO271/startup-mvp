import React from "react";
import Floor from "./Floor";

export default class Building{

    public RawData: any;
    public Id: string;
    public Floors: Array<Floor>

    constructor(rawData: any, id: string){  
        this.RawData = rawData
        this.Id = id
        this.Floors = this.getFloors(rawData)
    }

    private getFloors(rawData: any) : Array<Floor> {
        try{
            let rawDataJSON 

            if(typeof rawData == "string"){
                rawDataJSON = JSON.parse(rawData)
            } else {
                rawDataJSON = rawData
            }
            
            console.log("rawDataJSON=",rawDataJSON)
            
            let floors: Array<Floor> = []

            let index = 0;

            for(const key in rawData){
                let floor = new Floor(key, rawData[key])
                floors.push(floor)
                index += 1
            }
            return floors

        } catch(error){
            console.log("Error at parsing the rawData")
            console.log(error)
            return []
        }
    }
    render(): React.ReactNode{
        console.log("test in Building")
        return(
            this.Floors.map((floor) => {
                return (
                  <g id={floor.FloorId} key={"floor_" + floor.FloorId}>
                    {floor.Layers.map((layerGroup) => {
                      return (
                        layerGroup.render()
                      );
                    })}
                  </g>
                );
              })
        )
    }
}