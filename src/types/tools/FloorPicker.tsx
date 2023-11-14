import Icon, { WallIcon } from "@/assets/Icons/icon";
import ITool from "../interfaces/ITool";
import style from "@/app/page.module.css";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveFloor,
  selectActiveFloor,
  selectFloors,
} from "@/app/redux/slices/floorSlice";
import Floor from "../Floor";

export default class FloorPicker implements ITool {
  Id: string;
  Icon: Icon | null;
  ActiveFloor: string;
  IsPopUpOpen: boolean;

  constructor(id: string) {
    this.Id = id;
    this.Icon = null;
    this.IsPopUpOpen = false;
    this.ActiveFloor = "S1";
  }

  private popUp(floorsString: any[]): ReactNode {
    const dispatch = useDispatch();
    const activeFloor = useSelector(selectActiveFloor);
    const floors = floorsString.map((floor) => {
      return JSON.parse(floor);
    });
    let floor: Array<Floor> = [];
    for (const key in floors) {
      for (const story in floors[key]) {
        let newFloor = new Floor(key, floors[key][story], story);
        floor.push(newFloor);
      }
    }

    return (
      <div id="FloorPickerPanel" style={{  visibility: "hidden", opacity: 0}}>
        <div className={style.basicPanel}>
          {floor.map((data) => {
            if(activeFloor == data.FloorNumber) {return (
              <div
                className={style.basicPanelContainer}
                id={"panelFloor" + data.FloorNumber}
              >
                <div
                  className={style.ActiveFloorTitle}
                  key={data.FloorNumber}
                >   
                  {data.FloorNumber}
                </div>
              </div>
            );}
          })}
        </div>
        <div className={style.floorsSidePanel}>
            {floor.map((data) => {
            return (
                <button className={style.floorsSidePanelItem} style={activeFloor == data.FloorNumber ? {backgroundColor: "#e4e4e4"} : {}} onClick={() => {dispatch(changeActiveFloor(data.FloorNumber))}}>{data.FloorNumber}</button>
            );
          })}
        </div>
        
      </div>
    );
  }
  render(): ReactNode {
    const floorsString = useSelector(selectFloors);
    const activeFloor = useSelector(selectActiveFloor);

    return (
      <div className={style.toolBarItem} id={this.Id} key={this.Id}>
        <button
          className={style.toolBarbutton}
          onClick={() => {
            const layer = document.getElementById("FloorPickerPanel");
            if (layer && this.IsPopUpOpen == true) {
              layer.style.visibility = "hidden";
              layer.style.opacity = "0";
            } else if (layer && this.IsPopUpOpen == false) {
              layer.style.visibility = "visible";
              layer.style.opacity = "1";
            }
            this.IsPopUpOpen = !this.IsPopUpOpen;
          }}
        >
          {activeFloor}
        </button>
        {this.popUp(floorsString)}
      </div>
    );
  }
}
