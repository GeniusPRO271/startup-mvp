import React, { ReactNode } from "react";
import BuildingLayer from "../BuildingLayer";
import { Joints } from "./Joints";
import { useDispatch } from "react-redux";
import {
  changeSelectedJoin,
  changeSelectedWall,
  changeShowWallInfo,
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
            join,
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
      <g id={this.Id} key={"walls_" + this.Id}>
        {this.CoordsGroup.map((wall: Wall) => {
          // Render the pair inside a group
          return (
            <g id={wall.wallOrientation + "_" + wall.Id} key={wall.Id}>
              {wall.render()}
              {wall.wallJoint.render()}
            </g>
          );
        })}
      </g>
    );
  }
}
export class Wall implements ILayer {
  public Coords: Array<Array<number>>;
  public Id: string;
  public Color: string;
  public FillColor: string;
  public wallLength: number;
  public wallOrientation: string;
  public wallJoint: Joints;

  constructor(
    id: string,
    coords: Array<Array<number>>,
    color: string,
    fillColor: string,
    joint: Joints,
  ) {
    this.Id = id;
    this.Coords = coords;
    this.Color = color;
    this.FillColor = fillColor;
    this.wallLength = this.CalculateWallLength(coords);
    this.wallJoint = joint;
    this.wallOrientation = joint.getWallOrientation();
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
      wallLength: this.wallLength,
      wallOrientation: this.wallOrientation,
    };
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const handlePolygonClick = (
      event: React.MouseEvent<SVGPolygonElement, MouseEvent>,
    ) => {
      const polygonPoints = event.currentTarget.getAttribute("points");
      if (polygonPoints && this.wallJoint.PairOfJoins) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        console.log("mouseX", mouseX);
        console.log("mouseY", mouseY);
        console.log("X cord", this.wallJoint.PairOfJoins[0].Coords[1]);
        console.log("Y cord", this.wallJoint.PairOfJoins[0].Coords[0]);
        // TESTING
      }
    };
    return (
      <polygon
        points={`
            ${this.Coords[0][0] * 20 + 100},${this.Coords[0][1] * 20} 
            ${this.Coords[1][0] * 20 + 100},${this.Coords[1][1] * 20} 
            ${this.Coords[2][0] * 20 + 100},${this.Coords[2][1] * 20} 
            ${this.Coords[3][0] * 20 + 100},${this.Coords[3][1] * 20}`}
        onClick={(event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => {
          dispatch(changeSelectedWall(this.SerializedWall()));
          dispatch(changeShowWallInfo(true));

          if (this.wallJoint.PairOfJoins) {
            dispatch(
              changeSelectedJoin(
                this.wallJoint.PairOfJoins[0].SerializedJoin(),
              ),
            );
          }

          handlePolygonClick(event);
        }}
        stroke={this.Color}
        fill={this.FillColor}
        id={"wall_" + this.Id}
        key={"wall_" + this.Id}
        style={{ position: "absolute", zIndex: 100, cursor: "pointer" }}
      ></polygon>
    );
  }
}
