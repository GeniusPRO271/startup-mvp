import Icon from "@/assets/Icons/icon";
import ITool from "../interfaces/ITool";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import style from "@/app/page.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveFloor } from "@/redux/slices/floorSlice";
import { GET_DRAWING_STATE, UPDATE_DRAWING_STATE } from "@/redux/slices/selectionSlice";
import { GET_ZOOM_SCALE } from "@/redux/slices/zoomSlice";

export default class Drawing implements ITool {
  Id: string;
  Type: string;
  Icon: Icon;


  constructor(id: string, type: string, icon: any) {
    this.Id = id;
    this.Type = type;
    this.Icon = icon;
  }

  render(): ReactNode {
    const dispatch = useDispatch()
    const DRAWING_STATE = useSelector(GET_DRAWING_STATE)
    return (
      <div className={style.toolBarItem} id={this.Id} key={this.Id}>
        <button className={style.toolBarbutton} style={DRAWING_STATE ? {background:"lightblue"} : {}}onClick={() => {
            
            !DRAWING_STATE ? dispatch(UPDATE_DRAWING_STATE(true)) : dispatch(UPDATE_DRAWING_STATE(false))
            console.log("DRAWING_STATE_CHANGED_TO=", DRAWING_STATE)
        }}>
          <Image
            src={this.Icon.Src}
            alt={"ToolIcon_" + this.Id}
            width={16}
            height={16}
          />
        </button>
      </div>
    );
  }
}
