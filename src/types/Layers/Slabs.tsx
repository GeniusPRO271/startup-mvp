import React from "react";
import BuildingLayer from "./BuildingLayer";

export default class Slabs extends BuildingLayer {
  public CoordsGroup: Array<Slab>;

  constructor(rawData: any, id: string) {
    super(rawData, id);
    this.Id = id;
    this.CoordsGroup = this.getCoords(rawData);
    this.RawData = rawData;
  }

  getCoords(rawData: any) {
    try {
      let coordsGroup: Array<Slab> = [];

      if (rawData) {
        for (const coords in rawData) {
          let coordsDATA = new Slab(coords, rawData[coords], "black", "none");
          coordsGroup.push(coordsDATA);
        }
      }

      return coordsGroup;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  render(): React.ReactNode {
    return (
      <g id={this.Id} key={"slabs_"+this.Id}>
        {this.CoordsGroup.map((slab: Slab) => {
          return slab.render();
        })}
      </g>
    );
  }
}

class Slab implements ILayer {
  public Coords: Array<Array<number>>;
  public Id: string;
  public Color: string;
  public FillColor: string;

  constructor(
    id: string,
    coords: Array<Array<number>>,
    color: string,
    fillColor: string
  ) {
    this.Id = id;
    this.Coords = coords;
    this.Color = color;
    this.FillColor = fillColor;
  }
  render(): React.ReactNode {
    return (
      <polygon
        points={`
        ${(this.Coords[0][0] * 20) + 200},${this.Coords[0][1] * 20} 
        ${(this.Coords[1][0] * 20) + 200},${this.Coords[1][1] * 20} 
        ${(this.Coords[2][0] * 20) + 200},${this.Coords[2][1] * 20} 
        ${(this.Coords[3][0] * 20) + 200},${this.Coords[3][1] * 20}`}
        stroke={this.Color}
        fill={this.FillColor}
        id={this.Id}
        key={"slab_"+this.Id}
        style={{position:"absolute", zIndex: 100}}
      ></polygon>
    );
  }
}
