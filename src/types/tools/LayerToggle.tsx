import Icon from "@/assets/Icons/icon";
import ITool from "../interfaces/ITool";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";
import style from "@/app/page.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveFloor } from "@/redux/slices/floorSlice";

export default class LayerToggle implements ITool {
  Id: string;
  Type: string;
  Icon: Icon;
  LayerState: boolean;
  LayerId: string;

  constructor(id: string, type: string, icon: any, layerId: string) {
    this.Id = id;
    this.Type = type;
    this.Icon = icon;
    this.LayerId = layerId;
    this.LayerState = true;
  }

  OnClick(fatherId: string): void {
    try {
      const father = document.getElementById(fatherId);
      if (!father) {
        console.error("Father element not found:", fatherId);
        return;
      }
      const layer = father.querySelector(`#${this.LayerId}`) as HTMLElement;

      if (layer && this.LayerState == true) {
        layer.style.display = "none";
      } else if (layer && this.LayerState == false) {
        layer.style.display = "block";
      } else {
        console.log("error changing state of layer=", this.LayerId);
      }
      this.LayerState = !this.LayerState;
    } catch (err) {
      console.log("ERROR AT TOGGLE", err);
    }
  }
  render(): ReactNode {
    const fatherId = useSelector(selectActiveFloor);
    return (
      <div className={style.toolBarItem} id={this.Id} key={this.Id}>
        <button
          className={style.toolBarbutton}
          onClick={() => {
            this.OnClick(fatherId);
          }}
        >
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


export class PlantaArquitectureToggle extends LayerToggle {

  OnClick(): void {
    try {
      const layer = document.getElementById("PlantaArquitectura")
      if (layer && this.LayerState == true) {
        layer.style.display = "none";
      } else if (layer && this.LayerState == false) {
        layer.style.display = "block";
      } else {
        console.log("error changing state of layer=", this.LayerId);
      }
      this.LayerState = !this.LayerState;
    } catch (err) {
      console.log("ERROR AT TOGGLE", err);
    }
  }
  render(): ReactNode {

    return (
      <div className={style.toolBarItem} id={this.Id} key={this.Id}>
        <button
          className={style.toolBarbutton}
          style={ this.LayerState ? {background: "lightblue"} : {}}

          onClick={() => {
            this.OnClick()
          }}
        >
          <Image
            src={this.Icon.Src}
            alt={"ToolIcon_" + this.Id}
            width={32}
            height={32}
          />
        </button>
      </div>
    );
  }
}

