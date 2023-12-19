import React, { ReactNode } from "react";
import BuildingLayer from "./BuildingLayer";
import { WallEndPoints } from "./WallEndPoint";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_DELTED_LIST,
  GET_SELECTED_WALL,
  UPDATE_SELECTED_WALL,
  UPDATE_SELECTED_WALL_END_POINT,
  UPDATE_SHOW_WALL_INFO_TOGGLE,
} from "@/redux/slices/selectionSlice";

export default class Walls extends BuildingLayer {
  public CoordsGroup: Array<Wall>;
  public WallEndPointsRestrictions: any;

  constructor(
    rawData: any,
    id: string,
    wallEndPointsRestrictions: any,
    coordsGroup?: Array<Wall>
  ) {
    super(rawData, id);
    this.WallEndPointsRestrictions = wallEndPointsRestrictions;
    this.CoordsGroup = coordsGroup ? coordsGroup : this.getCoords(rawData);
  }

  getCoords(rawData: any) {
    try {
      let coordsGroup: Array<Wall> = [];
      console.log("WALL_RESTRICTIONS=", this.WallEndPointsRestrictions);
      if (rawData.box && rawData.line && this.WallEndPointsRestrictions) {
        for (const INDEX in rawData.box) {
          console.log("RAW_DATA_WALL_COORDS=", rawData.line[INDEX].coords);
          console.log("WALL_END_POINT_INDEXS=", rawData.line[INDEX].joints);
          console.log(
            "WALL_RESTRICTIONS_AT",
            INDEX,
            "=",
            this.WallEndPointsRestrictions[INDEX]
          );
          console.log("RAW_DATA_WIDTH=",  rawData.box[INDEX][0][0], rawData.box[INDEX][2][0] );
          const NEW_WALL_TO_PUSH = Wall.getWallOrientation(
            rawData.line[INDEX].coords,
            INDEX,
            rawData.box[INDEX],
            "rgb(148,148,148)",
            "rgb(55,68,97)",
            rawData,
            this.WallEndPointsRestrictions
          );
          coordsGroup.push(NEW_WALL_TO_PUSH);
        }
      }
      return coordsGroup;
    } catch (error) {
      console.error("ERROR_AT_WALL_GET_COORDS", error);
      return [];
    }
  }
  render(): ReactNode {
    return (
      <g id={this.Id} key={"WALLS_" + this.Id}>
        {this.CoordsGroup.map((wall: Wall) => {
          // Render the pair inside a group
          return (
            <g id={"WALL-" + wall.Id} key={wall.Id}>
              {wall.render()}
              {wall.WallEndPoints.render()}
            </g>
          );
        })}
      </g>
    );
  }
}
export class Wall {
  public Coords: Array<Array<number>>;
  public Id: string;
  public Color: string;
  public FillColor: string;
  public WallEndPoints: WallEndPoints;

  constructor(
    id: string,
    coords: Array<Array<number>>,
    color: string,
    fillColor: string,
    wallEndPoints: WallEndPoints
  ) {
    this.Id = id;
    this.Coords = coords;
    this.Color = color;
    this.FillColor = fillColor;
    this.WallEndPoints = wallEndPoints;
  }

  SerializedWall() {
    return {
      Coords: this.Coords,
      Id: this.Id,
      Color: this.Color,
      FillColor: this.FillColor,
      WallEndPoints: this.WallEndPoints.SerlializedWallEndPoints(),
    };
  }

  static getWallOrientation(
    Coords: Array<Array<number>>,
    id: string,
    coords: Array<Array<number>>,
    color: string,
    fillColor: string,
    rawData: any,
    wallRestrictions : any
  ): Wall {


    if (Coords[0][0] == Coords[1][0]) {
      const WALL_WIDTH = [coords[0][0],coords[2][0]]
    
      const WALL_END_POINT = new WallEndPoints(
        rawData.line[id],
        rawData.line[id].coords,
        rawData.line[id].joints,
        wallRestrictions[id],
        WALL_WIDTH
      );

      return new VerticalWall(id, coords, color, fillColor, WALL_END_POINT);
    } else {

      const WALL_WIDTH = [coords[0][1],coords[2][1]]
    
      const WALL_END_POINT = new WallEndPoints(
        rawData.line[id],
        rawData.line[id].coords,
        rawData.line[id].joints,
        wallRestrictions[id],
        WALL_WIDTH
      );

      return new HorizontalWall(id, coords, color, fillColor, WALL_END_POINT);
    }
  }

  render(): React.ReactNode {
    return;
  }
}

class VerticalWall extends Wall {
  getWallWith(): Array<number> {
    try {
      
      let X1 = this.Coords[0][0];
      let X2 = this.Coords[2][0];
      return [X1, X2];
    } catch (err) {
      console.error("ERROR AT getWallWith()", err);
      return [];
    }
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const isDeleted = useSelector(GET_DELTED_LIST).some(
      (d) => d.Id === this.Id
    );
    const isSelected = useSelector(GET_SELECTED_WALL).Id == this.Id
   
    const deletedColorStroke = "rgb(252,96,101)";
    const deletedColorFill = "rgb(251,0, 17)";
    return (
      <polygon
        points={`
            ${this.Coords[0][0] * 20 + 200},${this.Coords[0][1] * 20} 
            ${this.Coords[1][0] * 20 + 200},${this.Coords[1][1] * 20} 
            ${this.Coords[2][0] * 20 + 200},${this.Coords[2][1] * 20} 
            ${this.Coords[3][0] * 20 + 200},${this.Coords[3][1] * 20}`}
        onClick={(event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
          dispatch(UPDATE_SELECTED_WALL(this.SerializedWall()));
          dispatch(UPDATE_SHOW_WALL_INFO_TOGGLE(true));

          if (this.WallEndPoints.PairOfWallEndPoints) {
            dispatch(
              UPDATE_SELECTED_WALL_END_POINT(
                this.WallEndPoints.PairOfWallEndPoints[0].SerializedWallEndPoint()
              )
            );
          }
        }}
        stroke={isDeleted ? deletedColorStroke : (isSelected ? "rgb(255,221,51)": this.Color)}
        fill={isDeleted ? deletedColorFill : (isSelected ? "rgb(255,231,112)" : this.FillColor)}
        id={"VERTICAL_WALL-" + this.Id}
        key={"VERTICAL_WALL-" + this.Id}
        style={{  
          position: "absolute",
          zIndex: 100,
          cursor: "pointer"
        }}
      ></polygon>
    );
  }
}

class HorizontalWall extends Wall {
  render(): React.ReactNode {
    const dispatch = useDispatch();
    const isDeleted = useSelector(GET_DELTED_LIST).some(
      (d) => d.Id === this.Id
    );
    const deletedColorStroke = "rgb(252,96,101)";
    const deletedColorFill = "rgb(251,0, 17)";
    const isSelected = useSelector(GET_SELECTED_WALL).Id == this.Id
    return (
      <polygon
        points={`
            ${this.Coords[0][0] * 20 + 200},${this.Coords[0][1] * 20} 
            ${this.Coords[1][0] * 20 + 200},${this.Coords[1][1] * 20} 
            ${this.Coords[2][0] * 20 + 200},${this.Coords[2][1] * 20} 
            ${this.Coords[3][0] * 20 + 200},${this.Coords[3][1] * 20}`}
        onClick={(event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
          dispatch(UPDATE_SELECTED_WALL(this.SerializedWall()));
          dispatch(UPDATE_SHOW_WALL_INFO_TOGGLE(true));
          console.log("WALL_PRESSED_COORDS=", this.Coords)
          if (this.WallEndPoints.PairOfWallEndPoints) {
            dispatch(
              UPDATE_SELECTED_WALL_END_POINT(
                this.WallEndPoints.PairOfWallEndPoints[0].SerializedWallEndPoint()
              )
            );
          }
        }}
        stroke={isDeleted ? deletedColorStroke : (isSelected ? "rgb(255,221,51)": this.Color)}
        fill={isDeleted ? deletedColorFill : (isSelected ? "rgb(255,231,112)" : this.FillColor)}
        id={"HORIZONTAL_WALL-" + this.Id}
        key={"HORIZONTAL_WALL-" + this.Id}
        style={{
          position: "absolute",
          zIndex: 100,
          cursor: "pointer"
        }}
      ></polygon>
    );
  }
}
