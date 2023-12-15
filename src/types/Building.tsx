import React from "react";
import Floor from "./Floor";
import { useDispatch, useSelector } from "react-redux";
import {
  addFloors,
  replaceFloors,
  selectActiveFloor,
} from "@/redux/slices/floorSlice";
import "@/app/page.module.css";

export default class Building {
  public RawData: any;
  public Id: string;
  public Floors: Array<Floor>;
  private Restrictions : any

  constructor(rawData: any, id: string, restrictions:any) {
    this.RawData = rawData;
    this.Id = id;
    this.Restrictions = restrictions
    this.Floors = this.getFloors(rawData,restrictions);
  }

  private getFloors(rawData: any , restrictions:any): Array<Floor> {
    const dispatch = useDispatch();
    try {
      let rawDataJSON;

      if (typeof rawData == "string") {
        rawDataJSON = JSON.parse(rawData);
      } else {
        rawDataJSON = rawData;
      }

      let floors: Array<Floor> = [];
      let index = 0;

      for (const FLOOR_NUM in rawData) {
        console.log("FLOOR_NUMBER_BUILDING=", FLOOR_NUM);
        console.log("FLOOR_RESTRICTIONS_BUILDING=", restrictions[FLOOR_NUM]);
        let floor = new Floor(FLOOR_NUM, rawData[FLOOR_NUM], FLOOR_NUM , restrictions[FLOOR_NUM]);
        floors.push(floor);
        index += 1;
      }

      console.log("FLOORS_BUILDING=", floors)
      dispatch(replaceFloors(rawData));
      return floors;
    } catch (error) {
      console.log("ERROR_AT_BUILDING_GET_FLOORS", error);

      return [];
    }
  }

  static getFloorNames(RAW_DATA: any){
    let FLOORS = []

    for(const FLOOR_NUMBER in RAW_DATA){
      FLOORS.push(FLOOR_NUMBER)
    }

    return FLOORS
  }

  static getFloorWalls(RAW_DATA: any){
    let FLOORS = []
    let WALLS = []

    for(const FLOOR_NUMBER in RAW_DATA){
     

      for(const WALL_NUMBER in RAW_DATA[FLOOR_NUMBER]["walls"].box){
        WALLS.push(WALL_NUMBER)
      }
      let FLOOR_DATA = { [FLOOR_NUMBER] : {walls : WALLS}}
      WALLS = []
      FLOORS.push(FLOOR_DATA)
    }
    return FLOORS
  }

  render(): React.ReactNode {
    const activeFloor = useSelector(selectActiveFloor);
    return this.Floors.map((floor) => {
      return (
        <g
          id={floor.FloorId}
          key={"floor_" + floor.FloorId}
          style={{ display: activeFloor == floor.FloorId ? "block" : "none" }}
        >
          {floor.Layers.map((layerGroup) => {
            return <g key={layerGroup.Id + "layer"}>{layerGroup.render()}</g>;
          })}
        </g>
      );
    });
  }
}
