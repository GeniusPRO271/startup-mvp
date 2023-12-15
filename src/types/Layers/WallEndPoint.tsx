import {
  GET_SELECTED_WALL,
  GET_SELECTED_WALL_END_POINT,
  UPDATE_SELECTED_WALL_END_POINT,
  UPDATE_WALL_END_POINT_INFIMO,
  UPDATE_WALL_END_POINT_SUPREMO,
  WallSerialized,
} from "@/redux/slices/selectionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export class WallEndPoints {
  public Coords: Array<Array<number>>;
  public Id: string;
  public PairOfWallEndPoints: Array<WallEndPoint>;
  public WallEndPointsRestrictions: any;
  public WallEndPointsIds: Array<string>;
  constructor(
    id: string,
    coords: Array<Array<number>>,
    wallEndPointsIds: Array<string>,
    wallEndPointsRestrictions: any
  ) {
    this.Id = id;
    this.Coords = coords;
    this.WallEndPointsRestrictions = wallEndPointsRestrictions.joints;
    this.WallEndPointsIds = wallEndPointsIds;
    this.PairOfWallEndPoints = this.getPairOfJoins(
      coords,
      wallEndPointsIds,
      wallEndPointsRestrictions.joints
    );
  }

  SerlializedWallEndPoints() {
    return {
      Coords: this.Coords,
      Id: this.Id,
      PairOfJoins: this.PairOfWallEndPoints.map((d) => {
        return d.SerializedWallEndPoint();
      }),
      WallEndPointsIds: this.WallEndPointsIds,
      WallEndPointsRestrictions: this.WallEndPointsRestrictions,
    };
  }

  getPairOfJoins(
    coords: Array<Array<number>>,
    WALL_END_POINT_IDS: Array<string>,
    WALL_END_POINT_RESTRICTIONS: any
  ) {
    console.log(
      "WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]][alargar]=",
      WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["alargar"]
    );
    const orientation = this.getWallOrientationWithCoords(coords);
    let Join0;
    let Join1;
    let a = WALL_END_POINT_IDS[1];
    if (orientation == "Vertical") {
      if (this.Coords[0][1] > this.Coords[1][1]) {
        Join1 = new TopEndPoint(
          WALL_END_POINT_IDS[1],
          this.Coords[1],
          "top",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["acortar"]
        );
        Join0 = new BottomEndPoint(
          WALL_END_POINT_IDS[0],
          this.Coords[0],
          "bottom",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["acortar"]
        );
      } else {
        Join0 = new TopEndPoint(
          WALL_END_POINT_IDS[0],
          this.Coords[0],
          "top",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["acortar"]
        );
        Join1 = new BottomEndPoint(
          WALL_END_POINT_IDS[1],
          this.Coords[1],
          "bottom",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["acortar"]
        );
      }
    } else {
      if (this.Coords[0][0] > this.Coords[1][0]) {
        Join0 = new RightEndPoint(
          WALL_END_POINT_IDS[0],
          this.Coords[0],
          "right",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["acortar"]
        );
        Join1 = new LeftEndPoint(
          WALL_END_POINT_IDS[1],
          this.Coords[1],
          "left",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["acortar"]
        );
      } else {
        Join1 = new RightEndPoint(
          WALL_END_POINT_IDS[1],
          this.Coords[1],
          "right",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[1]]["acortar"]
        );
        Join0 = new LeftEndPoint(
          WALL_END_POINT_IDS[0],
          this.Coords[0],
          "left",
          "blue",
          "blue",
          [0, 0],
          [0, 0],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["alargar"],
          WALL_END_POINT_RESTRICTIONS[WALL_END_POINT_IDS[0]]["acortar"]
        );
      }
    }
    return [Join0, Join1];
  }

  getWallOrientationWithCoords(coords: Array<Array<number>>) {
    if (coords[0][0] == coords[1][0]) {
      return "Vertical";
    } else if (coords[0][1] == coords[1][1]) {
      return "Horizontal";
    } else {
      return "undefined orientation"; // You might want to handle this case based on your requirements
    }
  }

  render(): React.ReactNode {
    return (
      <>
        {this.PairOfWallEndPoints && this.PairOfWallEndPoints[0].render()}
        {this.PairOfWallEndPoints && this.PairOfWallEndPoints[1].render()}
      </>
    );
  }
}

export class WallEndPoint {
  public Coords: Array<number>;
  public Id: string;
  public Orientation: string;
  public Color: string;
  public FillColor: string;
  public MaxLimit: number;
  public MinLimit: number;
  public Infimo: Array<number>;
  public Supremo: Array<number>;

  constructor(
    id: string,
    coords: Array<number>,
    orientation: string,
    color: string,
    fillColor: string,
    infimo: Array<number>,
    supremo: Array<number>,
    maxLimit: number,
    minLimit: number
  ) {
    this.Id = id;
    this.Coords = coords;
    this.Orientation = orientation;
    this.Color = color;
    this.FillColor = fillColor;
    this.Infimo = infimo;
    this.Supremo = supremo;
    this.MaxLimit = maxLimit;
    this.MinLimit = minLimit;
  }

  SerializedWallEndPoint() {
    return {
      Coords: this.Coords,
      Id: this.Id,
      Orientation: this.Orientation,
      Color: this.Color,
      FillColor: this.FillColor,
      Infimo: this.Infimo,
      Supremo: this.Supremo,
      MaxLimit: this.MaxLimit,
      MinLimit: this.MinLimit,
    };
  }

  getWallWith(thisWall: WallSerialized): Array<number> {
    try {
      return [];
    } catch (err) {
      console.error("ERROR_AT_WALL_END_POINT_getWallWith()", err);
      return [];
    }
  }

  render(): React.ReactNode {
    return;
  }
}

class TopEndPoint extends WallEndPoint {
  getWallWith(thisWall: WallSerialized): Array<number> {
    try {
      let X1 = thisWall.Coords[0][0];
      let X2 = thisWall.Coords[2][0];
      return [X1, X2];
    } catch (err) {
      console.error("ERROR AT getWallWith()", err);
      return [];
    }
  }

  assignInfimo(coords: number[], distance: number): number[] {
    let acortar = this.MinLimit;
    if (acortar <= distance) {
      return [this.Coords[0], this.Coords[1] + acortar];
    } else if (0 >= distance) {
      return [this.Coords[0], this.Coords[1]];
    } else {
      return coords;
    }
  }

  assignSupremo(coords: number[], distance: number): number[] {
    let alargar = this.MaxLimit;
    alargar = alargar * -1;
    if (alargar >= distance) {
      return [this.Coords[0], this.Coords[1] + alargar];
    } else if (0 <= distance) {
      return [this.Coords[0], this.Coords[1]];
    } else {
      return coords;
    }
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const ThisWall = useSelector(GET_SELECTED_WALL);

    const [infimoCoord, setInfimoCoords] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const [supremoCoord, setSupremoCoord] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const selectedState = useSelector(GET_SELECTED_WALL);
    const selectedWallEndPoint = useSelector(GET_SELECTED_WALL_END_POINT);
    const wallWith = ThisWall.Id != "" ? this.getWallWith(ThisWall) : [0,0];

    let isWall = selectedState.WallEndPoints.WallEndPointsIds.includes(this.Id);

    let isSelected = selectedWallEndPoint.Id == this.Id;

    const logMousePositionInfimo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordY = event.clientY - container.y;

        let distance = 0;
        let X = this.Coords[0];
        let Y = coordY / 20;
        distance = Y - this.Coords[1];

        this.Infimo = this.assignInfimo([X, Y], distance);
        dispatch(UPDATE_WALL_END_POINT_INFIMO(this.Infimo))
        setInfimoCoords(this.Infimo);
      }
    };

    const logMousePositionSupremo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordY = event.clientY - container.y;

        let X = 0,
          Y = 0;
        let distance = 0;

        X = this.Coords[0];
        Y = coordY / 20;
        distance = Y - this.Coords[1];

        this.Supremo = this.assignSupremo([X, Y], distance);
        dispatch(UPDATE_WALL_END_POINT_SUPREMO(this.Supremo))
        setSupremoCoord(this.Supremo);
      }
    };

    const beginSlidingInfimo = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = logMousePositionInfimo;
        slider.setPointerCapture(e.pointerId);
      }
    };

    const beginSlidingSupremo = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = logMousePositionSupremo;
        slider.setPointerCapture(e.pointerId);
      }
    };

    const stopSliding = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = null;
        slider.releasePointerCapture(e.pointerId);
        console.log("THIS_SUPREMO ", this.Supremo);
        console.log("THIS_INFIMO ", this.Infimo);
      }
    };

    const handleChange = (event: any, type: string) => {
      let slider = document.getElementById(event.target.id);

      console.log("THIS_SUPREMO_INIT ", this.Supremo);
      console.log("THIS_INFIMO_INIT", this.Infimo);

      if (slider) {
        slider.onpointerdown =
          type == "INFIMO" ? beginSlidingInfimo : beginSlidingSupremo;
        slider.onpointerup = stopSliding;
      }
    };

    return (
      (this.MaxLimit != 0 && this.MinLimit != 0 && <>
        <circle
          id={"TOP_END_POINT-" + this.Id}
          key={"TOP_END_POINT-" + this.Id}
          r={5}
          cx={this.Coords[0] * 20 + 200}
          cy={this.Coords[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          style={{
            position: "absolute",
            zIndex: 200,
            cursor: "pointer",
            display: isWall ? "block" : "none",
          }}
          onClick={() => {
            dispatch(UPDATE_SELECTED_WALL_END_POINT(this.SerializedWallEndPoint()));
          }}
        />
        <circle
          id={"INFIMO-" + this.Id}
          key={"INFIMO-" + this.Id}
          r={5}
          cx={infimoCoord[0] * 20 + 200}
          cy={infimoCoord[1] * 20 + 2.5}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "INFIMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "s-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        <circle
          id={"SUPREMO-" + this.Id}
          key={"SUPREMO-" + this.Id}
          r={5}
          cx={supremoCoord[0] * 20 + 200}
          cy={supremoCoord[1] * 20 - 2.5}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "SUPREMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "n-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        <polygon
          points={`
                ${wallWith[0] * 20 + 200},${infimoCoord[1] * 20} 
                ${wallWith[1] * 20 + 200},${infimoCoord[1] * 20} 
                ${wallWith[1] * 20 + 200},${supremoCoord[1] * 20} 
                ${wallWith[0] * 20 + 200},${supremoCoord[1] * 20}`}
                stroke={"rgb(60,98,186)"}
          fill="rgb(138,164,217,0.5)"
          id={"UNDEFINED_ID-" + this.Id}
          key={"UNDEFINED_ID-" + this.Id}
          style={{
            position: "relative",
            zIndex: 10,
            display: isSelected ? "block" : "none",
          }}
        ></polygon>
      </>)
    );
  }
}

class BottomEndPoint extends WallEndPoint {
  getWallWith(thisWall: WallSerialized): Array<number> {
    try {
      let X1 = thisWall.Coords[0][0];
      let X2 = thisWall.Coords[2][0];
      return [X1, X2];
    } catch (err) {
      console.error("ERROR AT getWallWith()", err);
      return [];
    }
  }

  assignSupremo(coords: number[], distance: number): number[] {
    let alargar = this.MaxLimit;
    if (alargar <= distance) {
      return [this.Coords[0], this.Coords[1] + alargar];
    } else if (0 >= distance) {
      return [this.Coords[0], this.Coords[1]];
    } else {
      return coords;
    }
  }
  assignInfimo(coords: number[], distance: number): number[] {
    let acortar = this.MinLimit;

    acortar = acortar * -1;
    if (acortar >= distance) {
      return [this.Coords[0], this.Coords[1] + acortar];
    } else if (0 <= distance) {
      return [this.Coords[0], this.Coords[1]];
    } else {
      return coords;
    }
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const ThisWall = useSelector(GET_SELECTED_WALL);

    const [infimoCoord, setInfimoCoords] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const [supremoCoord, setSupremoCoord] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const selectedState = useSelector(GET_SELECTED_WALL);
    const selectedWallEndPoint = useSelector(GET_SELECTED_WALL_END_POINT);
    const wallWith = ThisWall.Id != "" ? this.getWallWith(ThisWall) : [0,0];

    let isWall = selectedState.WallEndPoints.WallEndPointsIds.includes(this.Id);

    let isSelected = selectedWallEndPoint.Id == this.Id;

    const logMousePositionInfimo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordY = event.clientY - container.y;

        let distance = 0;
        let X = this.Coords[0];
        let Y = coordY / 20;
        distance = Y - this.Coords[1];

        this.Infimo = this.assignInfimo([X, Y], distance);
        dispatch(UPDATE_WALL_END_POINT_INFIMO(this.Infimo))
        setInfimoCoords(this.Infimo);
      }
    };

    const logMousePositionSupremo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordY = event.clientY - container.y;

        let X = 0,
          Y = 0;
        let distance = 0;

        X = this.Coords[0];
        Y = coordY / 20;
        distance = Y - this.Coords[1];

        this.Supremo = this.assignSupremo([X, Y], distance);
        dispatch(UPDATE_WALL_END_POINT_SUPREMO(this.Supremo))
        setSupremoCoord(this.Supremo);
      }
    };

    const beginSlidingInfimo = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = logMousePositionInfimo;
        slider.setPointerCapture(e.pointerId);
      }
    };
    const beginSlidingSupremo = (e: any) => {
      let slider = document.getElementById(e.target.id);
      if (slider) {
        slider.onpointermove = logMousePositionSupremo;
        slider.setPointerCapture(e.pointerId);
      }
    };

    const stopSliding = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = null;
        slider.releasePointerCapture(e.pointerId);
      }
    };

    const handleChange = (event: any, type: string) => {
      let slider = document.getElementById(event.target.id);

      console.log("THIS_SUPREMO_INIT ", this.Supremo);
      console.log("THIS_INFIMO_INIT", this.Infimo);

      if (slider) {
        slider.onpointerdown =
          type == "INFIMO" ? beginSlidingInfimo : beginSlidingSupremo;
        slider.onpointerup = stopSliding;
      }
    };

    return (
      (this.MaxLimit != 0 && this.MinLimit != 0 && <>
        <circle
          id={"BOTTOM_END_POINT-" + this.Id}
          key={"BOTTOM_END_POINT-" + this.Id}
          r={5}
          cx={this.Coords[0] * 20 + 200}
          cy={this.Coords[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          style={{
            position: "absolute",
            zIndex: 200,
            cursor: "pointer",
            display: isWall ? "block" : "none",
          }}
          onClick={() => {
            dispatch(UPDATE_SELECTED_WALL_END_POINT(this.SerializedWallEndPoint()));
          }}
        />
        <circle
          id={"INFIMO-" + this.Id}
          key={"INFIMO-" + this.Id}
          r={5}
          cx={infimoCoord[0] * 20 + 200}
          cy={infimoCoord[1] * 20 - 2.5}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "INFIMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "n-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        <circle
          id={"SUPREMO-" + this.Id}
          key={"SUPREMO-" + this.Id}
          r={5}
          cx={supremoCoord[0] * 20 + 200}
          cy={supremoCoord[1] * 20 + 2.5}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "SUPREMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "s-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        <polygon
          points={`
                ${wallWith[0] * 20 + 200},${infimoCoord[1] * 20} 
                ${wallWith[1] * 20 + 200},${infimoCoord[1] * 20} 
                ${wallWith[1] * 20 + 200},${supremoCoord[1] * 20} 
                ${wallWith[0] * 20 + 200},${supremoCoord[1] * 20}`}
                stroke={"rgb(60,98,186)"}
                fill="rgb(138,164,217,0.5)"
          id={"UNDEFINED_ID-" + this.Id}
          key={"UNDEFINED_ID-" + this.Id}
          style={{
            position: "relative",
            zIndex: 10,
            display: isSelected ? "block" : "none",
          }}
        ></polygon>
      </>)
    );
  }
}

class RightEndPoint extends WallEndPoint {
  getWallWith(thisWall: WallSerialized): Array<number> {
    try {
      let X1 = thisWall.Coords[0][1];
      let X2 = thisWall.Coords[2][1];
      return [X1, X2];
    } catch (err) {
      console.error("ERROR AT getWallWith()", err);
      return [];
    }
  }

  assignSupremo(coords: number[], distance: number): number[] {
    let alargar = this.MaxLimit;
    alargar = alargar * -1;
    if (alargar >= distance) {
      return [alargar * -1 + this.Coords[0], this.Coords[1]];
    } else if (0 <= distance) {
      return [this.Coords[0], this.Coords[1]];
    } else {
      return coords;
    }
  }
  assignInfimo(coords: number[], distance: number): number[] {
    let acortar = this.MinLimit;
    if (acortar <= distance) {
      return [this.Coords[0] - acortar, this.Coords[1]];
    } else if (0 >= distance) {
      return [this.Coords[0], this.Coords[1]];
    } else {
      return coords;
    }
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const ThisWall = useSelector(GET_SELECTED_WALL);

    const [infimoCoord, setInfimoCoords] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const [supremoCoord, setSupremoCoord] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const selectedState = useSelector(GET_SELECTED_WALL);
    const selectedWallEndPoint = useSelector(GET_SELECTED_WALL_END_POINT);
    const wallWith = ThisWall.Id != "" ? this.getWallWith(ThisWall) : [0,0];

    let isWall = selectedState.WallEndPoints.WallEndPointsIds.includes(this.Id);


    let isSelected = selectedWallEndPoint.Id == this.Id;

    const logMousePositionInfimo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordX = event.clientX - container.x;

        let distance = 0;
        let X = (coordX - 200) / 20;
        let Y = this.Coords[1];
        distance = this.Coords[0] - X;

        this.Infimo = this.assignInfimo([X, Y], distance);
        dispatch(UPDATE_WALL_END_POINT_INFIMO(this.Infimo))
        setInfimoCoords(this.Infimo);
      }
    };

    const logMousePositionSupremo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordX = event.clientX - container.x;

        let distance = 0;
        let X = (coordX - 200) / 20;
        let Y = this.Coords[1];
        distance = this.Coords[0] - X;

        this.Supremo = this.assignSupremo([X, Y], distance);
        dispatch(UPDATE_WALL_END_POINT_SUPREMO(this.Supremo))
        setSupremoCoord(this.Supremo);
      }
    };

    const beginSlidingInfimo = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = logMousePositionInfimo;
        slider.setPointerCapture(e.pointerId);
      }
    };
    const beginSlidingSupremo = (e: any) => {
      let slider = document.getElementById(e.target.id);
      if (slider) {
        slider.onpointermove = logMousePositionSupremo;
        slider.setPointerCapture(e.pointerId);
      }
    };

    const stopSliding = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = null;
        slider.releasePointerCapture(e.pointerId);
      }
    };

    const handleChange = (event: any, type: string) => {
      let slider = document.getElementById(event.target.id);

      console.log("THIS_SUPREMO_INIT ", this.Supremo);
      console.log("THIS_INFIMO_INIT", this.Infimo);
      console.log("MAX_LIMIT_WALL_END_POINT", this.MaxLimit);
      console.log("MIN_LIMIT_WALL_END_POINT", this.MinLimit);

      if (slider) {
        slider.onpointerdown =
          type == "INFIMO" ? beginSlidingInfimo : beginSlidingSupremo;
        slider.onpointerup = stopSliding;
      }
    };

    return (
 (  this.MaxLimit != 0 && this.MinLimit != 0 && <>
        <circle
          id={"RIGHT_END_POINT-" + this.Id}
          key={"RIGHT_END_POINT-" + this.Id}
          r={5}
          cx={this.Coords[0] * 20 + 200}
          cy={this.Coords[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          style={{
            position: "absolute",
            zIndex: 200,
            cursor: "pointer",
            display: isWall ? "block" : "none",
          }}
          onClick={() => {
            dispatch(UPDATE_SELECTED_WALL_END_POINT(this.SerializedWallEndPoint()));
          }}
        />
        <circle
          id={"INFIMO-" + this.Id}
          key={"INFIMO-" + this.Id}
          r={5}
          cx={infimoCoord[0] * 20 + 200 - 2.5}
          cy={infimoCoord[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "INFIMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "w-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        <circle
          id={"SUPREMO-" + this.Id}
          key={"SUPREMO-" + this.Id}
          r={5}
          cx={supremoCoord[0] * 20 + 200 + 2.5}
          cy={supremoCoord[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "SUPREMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "e-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        
        <polygon
          points={`
          ${infimoCoord[0] * 20 + 200},${wallWith[0] * 20} 
          ${infimoCoord[0] * 20 + 200},${wallWith[1] * 20} 
          ${supremoCoord[0] * 20 + 200},${wallWith[1] * 20} 
          ${supremoCoord[0] * 20 + 200},${wallWith[0] * 20}`}
          stroke={"rgb(60,98,186)"}
          fill="rgb(138,164,217,0.5)"
          id={"UNDEFINED_ID-" + this.Id}
          key={"UNDEFINED_ID-" + this.Id}
          style={{
            opacity: 1,
            position: "relative",
            zIndex: 10,
            display: isSelected ? "block" : "none",
          }}
        ></polygon>
      </>)
    );
  }
}

class LeftEndPoint extends WallEndPoint {
  getWallWith(thisWall: WallSerialized): Array<number> {
    try {
      let X1 = thisWall.Coords[0][1];
      let X2 = thisWall.Coords[2][1];
      return [X1, X2];
    } catch (err) {
      console.error("ERROR AT getWallWith()", err);
      return [];
    }
  }

  assignSupremo(coords: number[], distance: number): number[] {
    let alargar = this.MaxLimit;
    if (alargar <= distance) {

      return ([this.Coords[0] - alargar, this.Coords[1]])
    } else if (0 >= distance){

      return ([this.Coords[0], this.Coords[1]])
    } else {

      return coords
    }
  }
  assignInfimo(coords: number[], distance: number): number[] {
    let acortar = this.MinLimit;
    acortar = acortar * -1
  
    if (acortar >= distance) {
      
      return ([acortar * -1  + this.Coords[0]  , this.Coords[1]])
    } else if (0 <= distance){
    
      return ([this.Coords[0], this.Coords[1]])
    } else {

      return coords
    }
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const ThisWall = useSelector(GET_SELECTED_WALL);

    const [infimoCoord, setInfimoCoords] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const [supremoCoord, setSupremoCoord] = useState([
      this.Coords[0],
      this.Coords[1],
    ]);

    const selectedState = useSelector(GET_SELECTED_WALL);
    const selectedWallEndPoint = useSelector(GET_SELECTED_WALL_END_POINT);
    const wallWith = ThisWall.Id != "" ? this.getWallWith(ThisWall) : [0,0];

    let isWall = selectedState.WallEndPoints.WallEndPointsIds.includes(this.Id);

    let isSelected = selectedWallEndPoint.Id == this.Id;

    const logMousePositionInfimo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordX = event.clientX - container.x;

        let distance = 0;
        let X = (coordX - 200) / 20;
        let Y = this.Coords[1];
        distance = this.Coords[0] - X;

        this.Infimo = this.assignInfimo([X, Y], distance);

        dispatch(UPDATE_WALL_END_POINT_INFIMO(this.Infimo))
        setInfimoCoords(this.Infimo);
      }
    };

    const logMousePositionSupremo = (event: any) => {
      const container = document
        .getElementById("plane_container")
        ?.getBoundingClientRect();
      if (container) {
        const coordX = event.clientX - container.x;

        let distance = 0;
        let X = (coordX - 200) / 20;
        let Y = this.Coords[1];
        distance = this.Coords[0] - X;

        this.Supremo = this.assignSupremo([X, Y], distance);
        setSupremoCoord(this.Supremo);
        dispatch(UPDATE_WALL_END_POINT_SUPREMO(this.Supremo ))
      }
    };

    const beginSlidingInfimo = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = logMousePositionInfimo;
        slider.setPointerCapture(e.pointerId);
      }
    };
    const beginSlidingSupremo = (e: any) => {
      let slider = document.getElementById(e.target.id);
      if (slider) {
        slider.onpointermove = logMousePositionSupremo;
        slider.setPointerCapture(e.pointerId);
      }
    };

    const stopSliding = (e: any) => {
      let slider = document.getElementById(e.target.id);

      if (slider) {
        slider.onpointermove = null;
        slider.releasePointerCapture(e.pointerId);
      }
    };

    const handleChange = (event: any, type: string) => {
      let slider = document.getElementById(event.target.id);

      console.log("THIS_SUPREMO_INIT ", this.Supremo);
      console.log("THIS_INFIMO_INIT", this.Infimo);

      if (slider) {
        slider.onpointerdown =
          type == "INFIMO" ? beginSlidingInfimo : beginSlidingSupremo;
        slider.onpointerup = stopSliding;
      }
    };

    return (
      (this.MaxLimit != 0 && this.MinLimit != 0 &&<>
        <circle
          id={"RIGHT_END_POINT-" + this.Id}
          key={"RIGHT_END_POINT-" + this.Id}
          r={5}
          cx={this.Coords[0] * 20 + 200}
          cy={this.Coords[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          style={{
            position: "absolute",
            zIndex: 200,
            cursor: "pointer",
            display: isWall ? "block" : "none",
          }}
          onClick={() => {
            dispatch(UPDATE_SELECTED_WALL_END_POINT(this.SerializedWallEndPoint()));
          }}
        />
        <circle
          id={"INFIMO-" + this.Id}
          key={"INFIMO-" + this.Id}
          r={5}
          cx={infimoCoord[0] * 20 + 200 }
          cy={infimoCoord[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "INFIMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "e-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        <circle
          id={"SUPREMO-" + this.Id}
          key={"SUPREMO-" + this.Id}
          r={5}
          cx={supremoCoord[0] * 20 + 200 - 2.5}
          cy={supremoCoord[1] * 20}
          color={"transparent"}
          fill={"transparent"}
          onMouseEnter={(e) => handleChange(e, "SUPREMO")}
          style={{
            position: "absolute",
            zIndex: 1000,
            cursor: "w-resize",
            display: isSelected ? "block" : "none",
          }}
        />
        <polygon
          points={`
          ${infimoCoord[0] * 20 + 200},${wallWith[0] * 20} 
          ${infimoCoord[0] * 20 + 200},${wallWith[1] * 20} 
          ${supremoCoord[0] * 20 + 200},${wallWith[1] * 20} 
          ${supremoCoord[0] * 20 + 200},${wallWith[0] * 20}`}
          stroke={"rgb(60,98,186)"}
          fill="rgb(138,164,217,0.5)"
          id={"UNDEFINED_ID-" + this.Id}
          key={"UNDEFINED_ID-" + this.Id}
          style={{
            opacity: 1,
            position: "relative",
            zIndex: 10,
            display: isSelected ? "block" : "none",
          }}
        ></polygon>
      </>)
    );
  }
}
