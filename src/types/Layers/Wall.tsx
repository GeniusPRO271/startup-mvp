import React, { ChangeEvent, ReactNode } from "react";
import BuildingLayer from "../BuildingLayer";
import { Join, Joints } from "./Joints";
import { useDispatch, useSelector } from "react-redux";
import {
  WallSerialized,
  changeSelectedJoin,
  changeSelectedWall,
  changeShowWallInfo,
  selectWall,
} from "@/redux/slices/selectionSlice";
export default class Walls extends BuildingLayer {
  public CoordsGroup: Array<Wall>;

  constructor(rawData: any, id: string) {
    super(rawData, id);
    this.Id = id;
    this.CoordsGroup = this.getCoords(rawData);
    this.RawData = rawData;
  }
  getCoords(rawData: any) {
    try {
      let coordsGroup: Array<Wall> = [];
      if (rawData.box && rawData.line) {
        for (const coords in rawData.box) {
          const join = new Joints(coords, rawData.line[coords]);
          let coordsDATA = new Wall(
            coords,
            rawData.box[coords],
            "brown",
            "brown",
            join
          );
          coordsGroup.push(coordsDATA);
        }
      }
      return coordsGroup;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  render(): ReactNode {
    return (
      <>
        <g id={this.Id} key={"walls_" + this.Id}>
          {this.CoordsGroup.map((wall: Wall) => {
            // Render the pair inside a group
            return (
              <>
                <g
                  id={wall.WallOrientation + "_" + wall.Id}
                  key={wall.Id}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {wall.render()}
                </g>
                <g
                  id={"Join_" + wall.Id}
                  key={"Join_" + wall.Id}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {wall.WallJoint.render()}
                </g>
              </>
            );
          })}
        </g>
        <g id={"joins_" + this.Id} key={"joins_" + this.Id}>
          {this.CoordsGroup.map((wall: Wall) => {
            // Render the pair inside a group
            return (
              <>
                <g
                  id={"Join_" + wall.Id}
                  key={"Join_" + wall.Id}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  {wall.WallJoint.render()}
                </g>
              </>
            );
          })}
        </g>
      </>
    );
  }
}
export class Wall implements ILayer {
  public Coords: Array<Array<number>>;
  public Id: string;
  public Color: string;
  public FillColor: string;
  public WallLength: number;
  public WallOrientation: string;
  public WallJoint: Joints;
  public Infimo: Join;
  public Supremo: Join;

  constructor(
    id: string,
    coords: Array<Array<number>>,
    color: string,
    fillColor: string,
    joint: Joints,
    wallOrientation? : string,
    wallLength? : number,
    infimo? : Array<number>,
    supremo? : Array<number>
  ) {
    this.Id = id 
    this.Coords = coords || [[0,0],[0,0]];
    this.Color = color 
    this.FillColor = fillColor 
    this.WallLength = wallLength || this.CalculateWallLength(coords) 
    this.WallJoint = joint 
    this.WallOrientation = wallOrientation || joint.getWallOrientation() 
    this.Infimo = infimo ? new Join(
      "infimo_" + this.Id,
      infimo,
      "none",
      "yellow",
      "yellow"
    ) : new Join(
      "infimo_" + this.Id,
      [0,0],
      "none",
      "yellow",
      "yellow"
    );
    this.Supremo = supremo ? new Join(
      "supremo_" + this.Id,
      supremo,
      "none",
      "green",
      "green"
    ) : new Join(
      "supremo_" + this.Id,
      [0,0],
      "none",
      "green",
      "green"
    );
  }



  private CalculateWallLength(coord: Array<Array<number>>) {
    return 0;
  }
  SerializedWall() {
    return {
      Coords: this.Coords,
      Id: this.Id,
      Color: this.Color,
      FillColor: this.FillColor,
      Join: this.WallJoint.serializedJoints(),
      wallLength: this.WallLength,
      wallOrientation : this.WallOrientation,
      Infimo : this.Infimo.SerializedJoin(),
      Supremo: this.Supremo.SerializedJoin()
    };
  }
  
  static fromJSON(json: WallSerialized){
    const wall = new Wall(json.Id, json.Coords, json.Color, json.FillColor, Joints.fromJSON(json.Join), json.wallOrientation, json.wallLength, json.Infimo.Coords, json.Supremo.Coords)
    return wall
  }
  private getBiggerSmaller() {
    try {
      let smaller = 0 , bigger = 0, fixed = 0;
      if (this.WallOrientation == "Horizontal" && this.WallJoint.PairOfJoins) {
        if (
          this.WallJoint.PairOfJoins[0].Coords[0] >
          this.WallJoint.PairOfJoins[1].Coords[0]
        ) {
          bigger = this.WallJoint.PairOfJoins[0].Coords[0];
          smaller = this.WallJoint.PairOfJoins[1].Coords[0];
        } else {
          bigger = this.WallJoint.PairOfJoins[1].Coords[0];
          smaller = this.WallJoint.PairOfJoins[0].Coords[0];
        }
        fixed = this.WallJoint.PairOfJoins[0].Coords[1];
      } else if (
        this.WallOrientation == "Vertical" &&
        this.WallJoint.PairOfJoins
      ) {
        if (
          this.WallJoint.PairOfJoins[0].Coords[1] >
          this.WallJoint.PairOfJoins[1].Coords[1]
        ) {
          bigger = this.WallJoint.PairOfJoins[0].Coords[1];
          smaller = this.WallJoint.PairOfJoins[1].Coords[1];
        } else {
          bigger = this.WallJoint.PairOfJoins[1].Coords[1];
          smaller = this.WallJoint.PairOfJoins[0].Coords[1];
        }
        fixed = this.WallJoint.PairOfJoins[0].Coords[0];
      }
      console.log("bigger and smaller=", bigger, smaller);

      return { bigger, smaller, fixed };
    } catch (err) {
      console.log("ERROR AT getBiggerSmaller() ", err);
    }
  }

  public addInfimo(event : ChangeEvent<HTMLInputElement>) {
    try {
      console.log("running addInfimo() ----- ")
      var infimo = parseFloat(event.target.value) ?? -1 
      console.log("infimo= ", infimo)
      const result = this.getBiggerSmaller();
      if (result && infimo > -1) {
        const { bigger, smaller, fixed} = result;
        if(bigger > infimo && smaller < infimo && this.WallOrientation == "Horizontal"){
          console.log("Entered assigment Horizontal")
          const coords = [infimo,fixed]
          this.Infimo.Coords = coords
          return this
        } else if (bigger > infimo && smaller < infimo && this.WallOrientation == "Vertical"){
          console.log("Entered assigment Vertical")
          const coords = [fixed,infimo]
          this.Infimo.Coords = coords
          return this
        }
        
      }
    } catch (err) {
      console.log("ERROR AT  addInfimo()", err);

    }
  }
  public addSupremo(event : ChangeEvent<HTMLInputElement>) {
    try {
      console.log("running addSupremo() ----- ")
      var supremo = parseFloat(event.target.value) ?? -1 
      console.log("infimo= ", supremo)
      const result = this.getBiggerSmaller();
      if (result && supremo > -1) {
        const { bigger, smaller, fixed} = result;
        if(bigger > supremo && smaller < supremo && this.WallOrientation == "Horizontal"){
          console.log("Entered assigment Horizontal")
          const coords = [supremo,fixed]
          this.Supremo.Coords = coords
          return this
        } else if (bigger > supremo && smaller < supremo && this.WallOrientation == "Vertical"){
          console.log("Entered assigment Vertical")
          const coords = [fixed,supremo]
          this.Supremo.Coords = coords
          return this
        }
        
      }
    } catch (err) {
      console.log("ERROR AT  addSupremo()", err);

    }
  }
  private ReplaceData(data: Wall){
    this.Coords = data.Coords,
    this.Id = data.Id,
    this.Color = data.Color,
    this.FillColor =  data.FillColor
    this.WallJoint = data.WallJoint
    this.WallLength = data.WallLength
    this.WallOrientation = data.WallOrientation
    this.Infimo = data.Infimo
    this.Supremo = data.Supremo
  }
  render(): React.ReactNode {
    const dispatch = useDispatch();
    const updatedWall = Wall.fromJSON(useSelector(selectWall))
    updatedWall.Id == this.Id && this.ReplaceData(updatedWall)
    const handlePolygonClick = (
      event: React.MouseEvent<SVGPolygonElement, MouseEvent>
    ) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (this.WallJoint.PairOfJoins && container) {
        let X, Y;
        const coordX = event.clientX - container.x;
        const coordY = event.clientY - container.y;
        if (this.WallOrientation == "Horizontal") {
          X = (coordX - 200) / 20;
          Y = this.WallJoint.PairOfJoins[0].Coords[1];
          console.log("Point added at = ", X, Y);
          // this.Infimo.Coords[0] = X
          // this.Infimo.Coords[1] = Y
        } else if (this.WallOrientation == "Vertical") {
          X = this.WallJoint.PairOfJoins[0].Coords[0];
          Y = coordY / 20;
          console.log("Point added at = ", X, Y);
          // this.Infimo.Coords[0] = X
          // this.Infimo.Coords[1] = Y
        }
        // TESTING
      }
    };
    return (
      <>
        <polygon
          points={`
              ${this.Coords[0][0] * 20 + 200},${this.Coords[0][1] * 20} 
              ${this.Coords[1][0] * 20 + 200},${this.Coords[1][1] * 20} 
              ${this.Coords[2][0] * 20 + 200},${this.Coords[2][1] * 20} 
              ${this.Coords[3][0] * 20 + 200},${this.Coords[3][1] * 20}`}
          onClick={(event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
            dispatch(changeSelectedWall(this.SerializedWall()));
            dispatch(changeShowWallInfo(true));

            if (this.WallJoint.PairOfJoins) {
              dispatch(
                changeSelectedJoin(
                  this.WallJoint.PairOfJoins[0].SerializedJoin()
                )
              );
            }

            handlePolygonClick(event);
          }}
          stroke={this.Color}
          fill={this.FillColor}
          id={"wall_" + this.Id}
          key={"wall_" + this.Id}
          style={{
            position: "relative",
            zIndex: 10,
            cursor:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' style='fill:%23FF0000;'><circle cx='4' cy='4' r='4' /></svg>\"), auto",
          }}
        ></polygon>
        {this.Infimo.render()}
        {this.Supremo.render()}
      </>
    );
  }
}
