import Icon, { LayerIcon } from "@/assets/Icons/icon";
import ITool from "../interfaces/ITool";
import style from "@/app/page.module.css";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeActiveFloor,
  selectActiveFloor,
  selectFloors,
} from "@/redux/slices/floorSlice";
import Floor from "../Floor";
import { motion } from "framer-motion";
import {
  changeActiveButton,
  changeIsButtonActive,
  selectActiveButton,
  selectIsbuttonActive,
} from "@/redux/slices/buttonSlice";
import Building from "../Building";
import Image from "next/image";

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

  private popUp(
    floorsString: any[],
    IsbuttonActive: boolean
  ): ReactNode {
    const dispatch = useDispatch();
    const activeFloor = useSelector(selectActiveFloor);
    const floors = useSelector(selectFloors)
    const floorNames = Building.getFloorNames(floors)
    const wallNames = Building.getFloorWalls(floors)
    console.log("FLOOR_PCIKER_FLOOR_NAMES=", floorNames)
    const panel = {
      NotActive: {
        opacity: 0,
        x: -30,
      },
      Active: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.15,
        },
      },
    };
    const panelSide = {
      NotActive: {
        opacity: 0,
        x: -30,
      },
      Active: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.15,
          delayChildren: 0,
          staggerChildren: 0.1,
        },
      },
    };
    const panelSideButton = {
      NotActive: { opacity: 0, y: 10 },
      Active: {
        opacity: 1,
        y: 0,
      },
    };
   
    return (
      <div
        id="FloorPickerPanel"
        style={
          IsbuttonActive
            ? { position: "relative", top: 0, zIndex: -1, display: "block" }
            : { position: "relative", top: 0, zIndex: -1, display: "none" }
        }
      >
        <motion.div
          className={style.basicPanel}
          variants={panel}
          animate={IsbuttonActive ? "Active" : "NotActive"}
        >
          {floorNames.map((FLOOR_NUM) => {
            console.log("FLOOR_NUM=")
            if (activeFloor == FLOOR_NUM) {
              return (
                <div
                  className={style.basicPanelContainer}
                  id={"FLOOR_PANEL" + FLOOR_NUM}
                  key={"FLOOR_PANEL" + FLOOR_NUM}
                >
                  <div
                    className={style.ActiveFloorTitle}
                  >
                    {FLOOR_NUM}
                  </div>
                  <div className={style.WallListText}>
                    Lista de Muros:
                  </div>
                  <div className={style.WallListTextButtonContainer}>
                    {wallNames &&
                      wallNames.map((FLOOR_DATA) => {
                        {
                          return FLOOR_DATA[FLOOR_NUM] && FLOOR_DATA[FLOOR_NUM].walls.map((WALL_NUMBER) => {
                            return (
                              <button
                                className={style.WallListTextButton}
                                key={"FLOOR_PICKER-"+WALL_NUMBER}
                                // onClick={() => {
                                //   dispatch(changeSelectedWall(wallLayer.SerializedWall()))
                                //   dispatch(changeShowWallInfo(true))
                                //   if(wallLayer.wallJoint.PairOfJoins){
                                //     dispatch(changeSelectedJoin(wallLayer.wallJoint.PairOfJoins[0].SerializedJoin()))
                                //   }
                                // }
                                // }
                                  >
                                    A-{WALL_NUMBER}
                                  </button>
                            );
                          })
                          

                          
                        }
                      })}
                  </div>
                </div>
              );
            }
          })}
        </motion.div>
        <motion.div
          className={style.floorsSidePanel}
          variants={panelSide}
          animate={IsbuttonActive ? "Active" : "NotActive"}
        >
          {floorNames.map((FLOOR_NUM) => {
            return (
              <motion.button
                className={style.floorsSidePanelItem}
                variants={panelSideButton}
                key={"SIDE_PANEL-"+ FLOOR_NUM}
                style={
                  activeFloor == FLOOR_NUM
                    ? { backgroundColor: "#e4e4e4" }
                    : {}
                }
                onClick={() => {
                  dispatch(changeActiveFloor(FLOOR_NUM));
                }}
              >
                {FLOOR_NUM}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    );
  }
  render(): ReactNode {
    const floorsString = useSelector(selectFloors);
    const activeButton = useSelector(selectActiveButton);
    const buttonState = useSelector(selectIsbuttonActive);
    const layerIcon = new LayerIcon()
    const dispatch = useDispatch();
    return (
      <div className={style.toolBarItem} id={this.Id} key={this.Id}>
        {this.popUp(floorsString, buttonState)}
        <button
          className={style.toolBarbutton}
          onClick={() => {
            if (activeButton != this.Id) {
              dispatch(changeActiveButton(this.Id));
            }
            if (buttonState == true) {
              dispatch(changeIsButtonActive(false));
            } else if (buttonState == false) {
              dispatch(changeIsButtonActive(true));
            }
          }}
        >
          <Image
          src={layerIcon.Src}
          alt={layerIcon.Id}
          width={16}
          height={16}
          />
        </button>
      </div>
    );
  }
}
