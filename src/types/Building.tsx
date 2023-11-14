import React from "react";
import Floor from "./Floor";
import { useDispatch, useSelector } from "react-redux";
import { addFloors, replaceFloors, selectActiveFloor } from "@/app/redux/slices/floorSlice";
import "@/app/page.module.css"

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
        const dispatch = useDispatch()
        
        try{
            let rawDataJSON 

            if(typeof rawData == "string"){
                rawDataJSON = JSON.parse(rawData)
            } else {
                rawDataJSON = rawData
            }
            
            console.log("rawDataJSON=",rawDataJSON)
            
            let floors: Array<Floor> = []
            let floorsRedux: Array<string> = []
            let index = 0;

            for(const key in rawData){
                console.log("rawData[key]=", rawData[key])
                let floor = new Floor(key, rawData[key], key)
                floorsRedux.push(JSON.stringify({[key]: rawData[key]}))
                floors.push(floor)
                index += 1
            }
            
            console.log(floorsRedux)
            dispatch(replaceFloors(floorsRedux))
            console.log("floors",floors)
            return floors

        } catch(error){
            console.log("Error at parsing the rawData")
            console.log(error)
            return []
        }
    }
    
    render(): React.ReactNode{
        console.log("test in Building")
        const activeFloor = useSelector(selectActiveFloor)
        return(
            this.Floors.map((floor) => {
                return (
                  <g id={floor.FloorId}  key={"floor_" + floor.FloorId} style={{display: activeFloor == floor.FloorId ? "block" : "none"}}>
                    {floor.Layers.map((layerGroup) => {
                      return (
                       
                        <g key={layerGroup.Id + "layer"}>
                            {layerGroup.render()}
                        </g>
                      );
                    })}
                  </g>
                );
              })
        )
    }
}