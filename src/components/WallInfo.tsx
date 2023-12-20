import { DeleteIcon, RevertIcon, XIcon } from "@/assets/Icons/icon";
import Image from "next/image";
import style from "../app/page.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_WALL_TO_DELETED_LIST,
  DELETE_WALL_STATE,
  GET_DELTED_LIST,
  GET_SELECTED_WALL,
  GET_SELECTED_WALL_END_POINT,
  GET_SHOW_WALL_INFO_BOOL,
  REMOVE_WALL_FROM_DELETED_LIST,
  UPDATE_SELECTED_WALL_END_POINT,
  UPDATE_SHOW_WALL_INFO_TOGGLE,
} from "@/redux/slices/selectionSlice";
import { motion } from "framer-motion";

function WallInfo() {
  const xIcon = new XIcon();
  const deleteIcon = new DeleteIcon();
  const revertIcon = new RevertIcon();
  const dispatch = useDispatch();
  const selectedWall = useSelector(GET_SELECTED_WALL);
  const showWallInfo = useSelector(GET_SHOW_WALL_INFO_BOOL);
  const selectedWallEndPoint = useSelector(GET_SELECTED_WALL_END_POINT);

  const isDeleted = useSelector(GET_DELTED_LIST).some(
    (d) => d.Id === selectedWall.Id
  );
  
  const isSelected = selectedWall.WallEndPoints.WallEndPointsIds.includes(selectedWallEndPoint.Id)
  console.log("DELETED_LIST_WALL_INFO=", useSelector(GET_DELTED_LIST));

  console.log("SELECTED_WALL_END_POINT=", selectedWallEndPoint);

  const popUp = {
    hidden: {
      opacity: 0,
      x: 100,
      transition: {
        duration: 0,
      },
    },
    show: {
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
      x: 30,
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

  return (
    <div >
      <motion.div
        id="popUp"
        className={style.WallInfoContainer}
        variants={popUp}
        animate={showWallInfo && isSelected ? "show" : "hidden"}
        style={
          showWallInfo && isSelected? { visibility: "visible" } : { visibility: "hidden" }
        }
      >
        {selectedWall.Id != "" && isSelected && (
          <>
            <button
              style={{
                position: "absolute",
                right: "5px",
                top: "10px",
                cursor: "pointer",
                border: "none",
                background: "transparent",
              }}
              onClick={() => {
                dispatch(UPDATE_SHOW_WALL_INFO_TOGGLE(false));
                dispatch(DELETE_WALL_STATE())
              }}
            >
              <Image src={xIcon.Src} alt={xIcon.Id} width={12} height={12} />
            </button>
            <div className={style.WallInfoTitleContainer}>
              <div className={style.WallInfoTitle}>Muro {selectedWall.Id}</div>
              {isDeleted ? (
                <button
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                  }}
                  onClick={() => {
                    dispatch(REMOVE_WALL_FROM_DELETED_LIST(selectedWall));
                  }}
                >
                  <Image
                    src={revertIcon.Src}
                    alt={revertIcon.Id}
                    width={16}
                    height={16}
                  />
                </button>
              ) : (
                <button
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                  }}
                  onClick={() => {
                    dispatch(ADD_WALL_TO_DELETED_LIST(selectedWall));
                  }}
                >
                  <Image
                    src={deleteIcon.Src}
                    alt={deleteIcon.Id}
                    width={16}
                    height={16}
                  />
                </button>
              )}
            </div>

            <div className="" style={{ display: "flex", paddingTop: "15px" }}>
              <div className={style.WallTable}>
                <div className={style.WallText}>Infimo</div>
                <div className={style.WallText}>Supremo</div>
              </div>
              <div className={style.WallTable}>
                <div className={style.WallBase} style={{ width: 63 }}>
                  {selectedWallEndPoint.InfimoDistance.toFixed(2)}
                </div>
                <div className={style.WallBase} style={{ width: 63 }}>
                  {selectedWallEndPoint.SupremoDistance.toFixed(2)}
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
      <motion.div
        className={style.wallSidePanel}
        variants={panelSide}
        animate={showWallInfo && isSelected ? "Active" : "NotActive"}
      >
        {selectedWall.WallEndPoints.PairOfJoins.map((WALL_END_POINT) => {
          return (
            <button
              className={style.floorsSidePanelItem}
              key={"SIDE_PANEL-" + WALL_END_POINT.Id}
              style={selectedWallEndPoint.Id == WALL_END_POINT.Id ? {backgroundColor: "rgb(228, 228, 228)"} : {}}
              onClick={() => {
                dispatch(UPDATE_SELECTED_WALL_END_POINT(WALL_END_POINT))
              }}
            >
              {WALL_END_POINT.Id}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}

export default WallInfo;
