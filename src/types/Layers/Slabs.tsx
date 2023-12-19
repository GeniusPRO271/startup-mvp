import React, { useState } from "react";
import BuildingLayer from "./BuildingLayer";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_DRAWING_STATE,
  UPDATE_DRAWING_STATE,
} from "@/redux/slices/selectionSlice";
import { GET_ZOOM_SCALE } from "@/redux/slices/zoomSlice";

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
      <g id={this.Id} key={"SLABS-" + this.Id}>
        {this.CoordsGroup.map((slab: Slab) => {
          
          return (
            <g key={"SLABS-" + slab.Id}>
              { slab.render()}
            </g>
           
          )
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

  GenerateWall() {}

  ClosesTo(coord: number, orientation: string) {
    if ("HORIZONTAL" == orientation) {
      let pos0 = this.Coords[0][1];
      let pos1 = this.Coords[2][1];
      let distance0 = coord - pos0;
      let distance1 = coord - pos1;
      console.log("DISTANCE0=", distance0);
      console.log("DISTANCE1=", distance1);
      if (distance0 < 0) distance0 = distance0 * -1;
      if (distance1 < 0) distance1 = distance1 * -1;

      if (distance0 < distance1) {
        console.log("CLOSER_TO_DISTANCE_0=", this.Coords[0][1] * 20);
        return pos0;
      } else {
        console.log("CLOSER_TO_DISTANCE_1=", this.Coords[2][1] * 20);
        return pos1;
      }
    } else if ("VERTICAL" == orientation) {
      let pos0 = this.Coords[0][0];
      let pos1 = this.Coords[2][0];
      let distance0 = coord - pos0;
      let distance1 = coord - pos1;
      console.log("DISTANCE0=", distance0);
      console.log("DISTANCE1=", distance1);
      if (distance0 < 0) distance0 = distance0 * -1;
      if (distance1 < 0) distance1 = distance1 * -1;

      if (distance0 < distance1) {
        console.log("CLOSER_TO_DISTANCE_0=", this.Coords[0][1] * 20);
        return pos0;
      } else {
        console.log("CLOSER_TO_DISTANCE_1=", this.Coords[2][1] * 20);
        return pos1;
      }
    }
    return 0;
  }

  isVerticalSide(vertices: any, sideIndex: any, mouseX: any) {
    const [x1, y1] = vertices[sideIndex];
    const [x2, y2] = vertices[(sideIndex + 1) % 4]; // Wrap around for the last side

    console.log("VERTICAL_SIDE_AT INDEX, ", sideIndex, "=", x1, y1);
    // Set a threshold for considering a side vertical (adjust as needed)
    const threshold = 0.5;

    return (
      Math.abs(x1 - mouseX) < threshold || Math.abs(x2 - mouseX) < threshold
    );
  }

  isHorizontalSide(
    vertices: Array<Array<number>>,
    sideIndex: any,
    mouseY: any
  ) {
    const [x1, y1] = vertices[sideIndex];
    const [x2, y2] = vertices[(sideIndex + 1) % 4]; // Wrap around for the last side

    console.log("HORIZONTAL_SIDE_AT INDEX, ", sideIndex, "=", x1, y1);

    // Set a threshold for considering a side horizontal (adjust as needed)
    const threshold = 0.5;

    return (
      Math.abs(y1 - mouseY) < threshold || Math.abs(y2 - mouseY) < threshold
    );
  }

  getSide(vertices: any, mouseX: any, mouseY: any) {
    console.log("VERTICES_PYGON=", vertices);
    for (let i = 0; i < 4; i++) {
      if (this.isVerticalSide(vertices, i, mouseX)) {
        return "VERTICAL";
      } else if (this.isHorizontalSide(vertices, i, mouseY)) {
        return "HORIZONTAL";
      }
    }
    return ""; // No side found
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const IS_DRAWING = useSelector(GET_DRAWING_STATE);
    const zoomScale = useSelector(GET_ZOOM_SCALE);
    const [INITcoords, setINITCoords] = useState<number[]>();
    const [FINALcoords, setFINALCoords] = useState<number[]>();
    const [_orientation, setOrientation] = useState<string>("");

    const startDrawing = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();

      if (container && IS_DRAWING) {
        const coordX = (event.clientX - container.x) / zoomScale;
        const coordY = (event.clientY - container.y) / zoomScale;

        let X = (coordX - 200) / 20;
        let Y = coordY / 20;

        let orientation = this.getSide(this.Coords, X, Y);
        setOrientation(orientation);

        console.log("DRAWING_CREATED=", this.Id);
        console.log("PRESSED_POSITION=", [coordX,coordY])
        if (orientation == "VERTICAL") {
          let X_TO_UPDATE = this.ClosesTo(X, "VERTICAL");;
          let Y_TO_UPDATE = coordY / 20;

          setINITCoords([X_TO_UPDATE, Y_TO_UPDATE]);
          const wrapperFunction = (event: any) => {
            return logMousePosition(event, X_TO_UPDATE, orientation);
          };

          const slab = document.getElementById("plane_container");
          if (slab) {
            slab.onmousemove = wrapperFunction;
            slab.onmousedown = stopSliding;
          }
        } else if (orientation == "HORIZONTAL") {
          console.log("ENTER_HORIZONTAL_CREATION=", orientation);
          let X_TO_UPDATE = (coordX - 200) / 20;
          let Y_TO_UPDATE = this.ClosesTo(Y, "HORIZONTAL");

          setINITCoords([X_TO_UPDATE, Y_TO_UPDATE]);

          const wrapperFunction = (event: any) => {
            return logMousePosition(event, Y_TO_UPDATE, orientation);
          };

          const slab = document.getElementById("plane_container");
          if (slab) {
            slab.onmousemove = wrapperFunction;
            slab.onmousedown = stopSliding;
          }
        }
      }
    };

    const stopSliding = (e: any) => {
      let slider = document.getElementById("plane_container");

      if (slider) {
        slider.onmousemove = null;
        slider.onmousedown = null;
      }
      dispatch(UPDATE_DRAWING_STATE(false));
    };

    const logMousePosition = (
      event: any,
      TO_UPDATE: number,
      orientation: string
    ) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordX = (event.clientX - container.x) / zoomScale;
        const coordY = (event.clientY - container.y) / zoomScale;

        let X = (coordX - 200) / 20;
        let Y = coordY / 20;

        if (orientation == "VERTICAL") {
          const coords = [TO_UPDATE, Y];
          setFINALCoords(coords);
          console.log("MOUSE_POSITION=", [TO_UPDATE, Y]);
        } else if (orientation == "HORIZONTAL") {
          const coords = [X, TO_UPDATE];
          setFINALCoords(coords);
          console.log("MOUSE_POSITION_HORIZONTAL=", coords);
        }
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
          stroke={this.Color}
          fill={this.FillColor}
          id={"SLAB-"+this.Id}
          key={"SLAB-" + this.Id}
          onClick={(e) => {
            startDrawing(e);
          }}
          style={{
            position: "absolute",
            zIndex: 100,
            cursor: IS_DRAWING ? "pointer" : "default",
          }}
        ></polygon>
        { INITcoords && FINALcoords && (_orientation == "HORIZONTAL" ? (<polygon
          points={
`
        ${FINALcoords[0] * 20 + 200},${INITcoords[1] * 20 - 1.88} 
        ${INITcoords[0] * 20 + 200},${INITcoords[1] * 20 - 1.88} 
        ${INITcoords[0] * 20 + 200},${FINALcoords[1] * 20 + 2.18} 
        ${FINALcoords[0] * 20 + 200},${FINALcoords[1] * 20 + 2.18}`
  
          }
          stroke={"rgb(158,215,104)"}
          fill={"rgb(187,227,145)"}
          id={"DRAWING_HORIZONTAL-" + this.Id}
          key={"DRAWING_HORIZONTAL-" + this.Id}
          style={{
            position: "absolute",
            zIndex: 100,
          }}
        ></polygon>)
         : ( <polygon
          points={ `
        ${INITcoords[0] * 20 - 1.88 + 200},${(FINALcoords[1]) * 20} 
        ${INITcoords[0] * 20 - 1.88 + 200},${(INITcoords[1]) * 20} 
        ${FINALcoords[0] * 20 + 2.18 + 200},${(INITcoords[1]) * 20 } 
        ${FINALcoords[0] * 20 + 2.18 + 200},${(FINALcoords[1]) * 20}`
          }
          stroke={"rgb(158,215,104)"}
          fill={"rgb(187,227,145)"}
          id={"DRAWING_VERTICAL-" + this.Id}
          key={"DRAWING_VERTICAL-" + this.Id}
          style={{
            position: "absolute",
            zIndex: 100,
          }}
        ></polygon>))}
      </>
    );
  }
}
