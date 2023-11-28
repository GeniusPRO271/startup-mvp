import {
  JoinSerialized,
  JoinsSerialized,
  changeSelectedJoin,
  selectSelectionSlice,
} from "@/redux/slices/selectionSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wall } from "./Wall";

export class Joints {
  public Coords: Array<Array<number>>;
  public Id: string;
  public PairOfJoins: Array<Join>;

  constructor(id: string, coords: Array<Array<number>>) {
    this.Id = id;
    this.Coords = coords;
    this.PairOfJoins = this.getPairOfJoins(coords);
  }

  public serializedJoints() {
    return {
      Coords: this.Coords,
      Id: this.Id,
      PairOfJoins: this.PairOfJoins.map((d) => {
        return d.SerializedJoin()
      })
    };
  }
  static fromJSON(json: JoinsSerialized) {
    const joins = new Joints(json.Id, json.Coords);
    return joins;
  }

  getPairOfJoins(coords: Array<Array<number>>): Array<any> {
    try {
      const orientation = this.getWallOrientationWithCoords(coords);
      let Join0;
      let Join1;
      if (orientation == "Vertical") {
        if (this.Coords[0][1] > this.Coords[1][1]) {
          Join1 = new Join(
            "topJoin_" + this.Id,
            this.Coords[1],
            "top",
            "blue",
            "blue"
          );
          Join0 = new Join(
            "bottomJoin_" + this.Id,
            this.Coords[0],
            "bottom",
            "blue",
            "blue"
          );
        } else {
          Join0 = new Join(
            "topJoin_" + this.Id,
            this.Coords[0],
            "top",
            "blue",
            "blue"
          );
          Join1 = new Join(
            "bottomJoin_" + this.Id,
            this.Coords[1],
            "bottom",
            "blue",
            "blue"
          );
        }
      } else {
        if (this.Coords[0][0] > this.Coords[1][0]) {
          Join0 = new Join(
            "rightJoin_" + this.Id,
            this.Coords[0],
            "right",
            "blue",
            "blue"
          );
          Join1 = new Join(
            "leftJoin_" + this.Id,
            this.Coords[1],
            "left",
            "blue",
            "blue"
          );
        } else {
          Join1 = new Join(
            "rightJoin_" + this.Id,
            this.Coords[1],
            "right",
            "blue",
            "blue"
          );
          Join0 = new Join(
            "leftJoin_" + this.Id,
            this.Coords[0],
            "left",
            "blue",
            "blue"
          );
        }
      }
      return [Join0, Join1];
    } catch (err) {
      console.log("ERROR AT FUNCTION getPairOfJoins", err);
      return [];
    }
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

  getWallOrientation() {
    if (this.Coords[0][0] == this.Coords[1][0]) {
      return "Vertical";
    } else if (this.Coords[0][1] == this.Coords[1][1]) {
      return "Horizontal";
    } else {
      return "undefined orientation"; // You might want to handle this case based on your requirements
    }
  }

  render(): React.ReactNode {
    return (
      <>
        {this.PairOfJoins && this.PairOfJoins[0].render()}
        {this.PairOfJoins && this.PairOfJoins[1].render()}
      </>
    );
  }
}

export class Join {
  public Coords: Array<number>;
  public Id: string;
  public Orientation: string;
  public Color: string;
  public FillColor: string;

  constructor(
    id: string,
    coords: Array<number>,
    orientation: string,
    color: string,
    fillColor: string
  ) {
    this.Id = id;
    this.Coords = coords;
    this.Orientation = orientation;
    this.Color = color;
    this.FillColor = fillColor;
  }
  SerializedJoin() {
    return {
      Coords: this.Coords,
      Id: this.Id,
      Orientation: this.Orientation,
      Color: this.Color,
      FillColor: this.FillColor,
    };
  }

  static fromJSON(json: JoinSerialized) {
    const join = new Join(json.Id,json.Coords, json.Orientation, json.Color, json.FillColor);
    return join;
  }

  render(): React.ReactNode {
    const dispatch = useDispatch();
    const selectedState = useSelector(selectSelectionSlice);
    const match = this.Id.match(/.+_(\d+)/);
    let isWall;
    let isSelected;
    if (match) {
      const numberFromJoin = parseInt(match[1]);
      isWall = parseInt(selectedState.wall.Id) == numberFromJoin;
      isSelected = selectedState.id == this.Id;
    }
    return (
      <circle
        id={this.Id}
        key={this.Id}
        r={5}
        cx={this.Coords[0] * 20 + 200}
        cy={this.Coords[1] * 20}
        color={isSelected ? "red" : this.Color}
        fill={isSelected ? "red" : this.FillColor}
        style={{
          position: "absolute",
          zIndex: 1000,
          cursor: this.Orientation != "none" ? "pointer" : "default",
          display: isWall ? "block" : "none",
        }}
        onClick={() => {
          if (this.Orientation != "none") {
            dispatch(changeSelectedJoin(this.SerializedJoin()));
          }
        }}
      />
    );
  }
}
