import React, { ReactNode } from "react"
import BuildingLayer from "../BuildingLayer"
import Joints, { Joint } from "./Joints"
import { createPortal, render } from 'react-dom';
import style from "@/app/page.module.css"
import { XIcon } from "@/assets/Icons/icon";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { changeShowfloorInfo } from "@/app/redux/slices/floorSlice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
export default class Walls extends BuildingLayer{
    public WallNodes : Joints
    public CoordsGroup : Array<Wall>

    constructor(rawData:any, id:string){
        super(rawData,id)
        this.Id = id
        this.CoordsGroup = this.getCoords(rawData)
        this.RawData = rawData
        this.WallNodes = new Joints(rawData.line, "wallNodes")
    }
    
    getCoords(rawData: any) {
        try{   
            let coordsGroup: Array<Wall> = []
            if(rawData.box){
                for(const coords in rawData.box){
                    let coordsDATA = new Wall(coords, rawData.box[coords], "red", "red")
                    coordsGroup.push(coordsDATA)
                }
            }
            return coordsGroup


        }catch(error){
            console.log(error)
            return []
        }
    }
    render(): ReactNode {
        return(
            <>
                <g id={this.Id} key={"walls_"+this.Id}>
                    {this.CoordsGroup.map((wall:Wall) => {
                        return (
                            wall.render()
                        )
                    })}
                </g>
                <g id={this.WallNodes.Id} key={"joins_"+this.WallNodes.Id}>
                    {this.WallNodes.CoordsGroup.map((joint:Joint) => {
                        return (
                            <g key={"group"+joint.Id}>
                                {joint.render()}
                            </g>
                        )
                    })}
                </g>
            </>
        )
    }
}
export class Wall implements ILayer{
    public Coords: Array<Array<number>>
    public Id:string
    public Color: string;
    public FillColor:string
    public lineCords: Array<number>

    constructor( id:string,coords:Array<Array<number>>, color:string, fillColor:string) {
        this.Id = id
        this.Coords = coords
        this.Color = color
        this.FillColor = fillColor
        this.lineCords = this.getLineCords(coords)
    }

    getLineCords(data:Array<Array<number>>){
        const xValues = data.map(coord => coord[0]);
        const yValues = data.map(coord => coord[1]);

        const xMidpoint = (Math.min(...xValues) + Math.max(...xValues)) / 2;
        const yMidpoint = (Math.min(...yValues) + Math.max(...yValues)) / 2;

        return([xMidpoint,yMidpoint])
    }

    WallInfo(dispatch:Dispatch<AnyAction>): any {
        const popUpDiv = document.getElementById("popUp");
        const xIcon = new XIcon()
        if (popUpDiv) {
            popUpDiv.innerHTML = ""
            return render(createPortal(
                <>
                    <button style={{position:"absolute", right:"20px", top: "20px",cursor:"pointer", border:"none", background:"transparent"}} 
                    onClick={() => {dispatch(changeShowfloorInfo(false))}}>
                        <Image src={xIcon.Src} alt={xIcon.Id} width={16} height={16}/>
                    </button>
                    <div className={style.WallInfoTitle}>
                        Muro A-{this.Id}
                    </div>
                    <div className="" style={{display:"flex", paddingTop:"15px"}}>
                        <div className={style.WallTable}>
                            <div style={{width: "40px" , height:"22px"}}/>
                            
                            <div className={style.WallCord}>
                                X
                            </div>
                            <div className={style.WallCord}>
                                Y
                            </div>
                        </div>
                        <div className={style.WallTable}>
                            <div className={style.WallBaseTitle}>
                                Base
                            </div>
                            <div className={style.WallBase}>
                                {(this.lineCords[0]).toFixed(2)}
                            </div>
                            <div className={style.WallBase}>
                            {(this.lineCords[1]).toFixed(2)}
                            </div>
                        </div>
                        <div className={style.WallTable}>
                            <div className={style.WallBaseTitle}>
                                Infimo
                            </div>
                            <div className={style.WallBase}>
                                Y
                            </div>
                            <div className={style.WallBase}>
                                Y
                            </div>
                        </div>
                        <div className={style.WallTable}>
                            <div className={style.WallBaseTitle}>
                                Supremo
                            </div>
                            <div className={style.WallBase}>
                                Y
                            </div>
                            <div className={style.WallBase}>
                                Y
                            </div>
                        </div>
                    </div>
                </>
                




            , popUpDiv), document.createElement("div"));
        }
    }

    render(): React.ReactNode {
        return(
            <polygon
            points={`
            ${(this.Coords[0][0] * 20) + 100},${this.Coords[0][1] * 20} 
            ${(this.Coords[1][0] * 20) + 100},${this.Coords[1][1] * 20} 
            ${(this.Coords[2][0] * 20) + 100},${this.Coords[2][1] * 20} 
            ${(this.Coords[3][0] * 20) + 100},${this.Coords[3][1] * 20}`}
            stroke={this.Color}
            fill={this.FillColor}
            id={this.Id}
            key={"wall_"+this.Id}
            style={{position:"absolute", zIndex: 100}}
          ></polygon>
        )
    }


}