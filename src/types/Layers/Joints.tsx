import { changeSelectedJoin } from "@/redux/slices/selectionSlice";
import React from "react";
import { useDispatch } from "react-redux";

export class Joints{
    public Coords: Array<Array<number>>
    public Id:string
    public PairOfJoins : Array<Join> | undefined

    

    constructor( id:string,coords:Array<Array<number>>) {
        this.Id = id
        this.Coords = coords
        this.PairOfJoins = this.getPairOfJoins(coords)
    }

    getPairOfJoins(coords:Array<Array<number>>) : Array<Join> | undefined{
        try {
            const orientation = this.getWallOrientationWithCoords(coords)
            let Join0 
            let Join1 
            if(orientation == "Vertical"){
                if (this.Coords[0][1] > this.Coords[1][1]){
                    Join1 = new Join("topJoin_"+this.Id, this.Coords[1], "top", "blue" , "blue")
                    Join0 = new Join("bottomJoin"+this.Id, this.Coords[0], "bottom", "blue" , "blue")
                } else{
                    Join0 = new Join("topJoin_"+this.Id, this.Coords[0], "top" , "blue" , "blue")
                    Join1 = new Join("bottomJoin"+this.Id, this.Coords[1], "bottom" , "blue" , "blue")
                }
            } else{
                if (this.Coords[0][0] > this.Coords[1][0]){
                    Join0 = new Join("rightJoin"+this.Id, this.Coords[0], "right" , "blue" , "blue")
                    Join1 = new Join("leftJoin"+this.Id, this.Coords[1], "left" , "blue" , "blue")
                } else{
                    Join1 = new Join("rightJoin"+this.Id, this.Coords[1], "right" , "blue" , "blue")
                    Join0 = new Join("leftJoin"+this.Id, this.Coords[0], "left" , "blue" , "blue")
                }
            }
            return [Join0, Join1]
        } catch(err){
            console.log("ERROR AT FUNCTION getPairOfJoins", err)
        }
    }

    getWallOrientationWithCoords(coords:Array<Array<number>>) {
        if (coords[0][0] == coords[1][0]) {
            return 'Vertical';
        } else if (coords[0][1] == coords[1][1]) {
            return 'Horizontal';
        } else {
          return 'undefined orientation'; // You might want to handle this case based on your requirements
        }
    }



    getWallOrientation() {
        if (this.Coords[0][0] == this.Coords[1][0]) {
          return 'Vertical';
        } else if (this.Coords[0][1] == this.Coords[1][1]) {
          return 'Horizontal';
        } else {
          return 'undefined orientation'; // You might want to handle this case based on your requirements
        }
    }



    render(): React.ReactNode {
        
            return(
                <>
                {this.PairOfJoins && this.PairOfJoins[0].render()}
                {this.PairOfJoins && this.PairOfJoins[1].render()}
                </>
            )
    }
}

export class  Join{
    public Coords: Array<number>
    public Id:string
    public Orientation: string
    public Color: string
    public FillColor: string

    constructor(id: string, coords: Array<number>, orientation: string, color:string, fillColor:string){
        this.Id = id
        this.Coords = coords
        this.Orientation =  orientation
        this.Color = color
        this.FillColor = fillColor
    }
    SerializedJoin() {
        return {
            Coords: this.Coords,
            Id: this.Id,
            Orientation: this.Orientation,
            Color: this.Color,
            FillColor: this.FillColor
        };
      }

    render(): React.ReactNode {
        const dispatch = useDispatch()

        return(
            <circle id={this.Id} key={this.Id} r={5} cx={(this.Coords[0] * 20) + 100} cy={this.Coords[1] * 20} color={this.Color} fill={this.FillColor} style={{position:"absolute", zIndex:200, cursor:"pointer"}} onClick={() => {dispatch(changeSelectedJoin(this.SerializedJoin()))}}/>
        )
    }
}