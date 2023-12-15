import { DeleteIcon, RevertIcon, XIcon } from "@/assets/Icons/icon";
import Image from "next/image";
import style from "../app/page.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_WALL_TO_DELETED_LIST,
  GET_DELTED_LIST,
  GET_SELECTED_WALL,
  GET_SELECTED_WALL_END_POINT,
  GET_SHOW_WALL_INFO_BOOL,
  REMOVE_WALL_FROM_DELETED_LIST,
  UPDATE_SHOW_WALL_INFO_TOGGLE,
} from "@/redux/slices/selectionSlice";
import { motion } from "framer-motion";

function WallInfo() {
  const xIcon = new XIcon();
  const deleteIcon = new DeleteIcon();
  const revertIcon = new RevertIcon()
  const dispatch = useDispatch();
  const selectedWall = useSelector(GET_SELECTED_WALL);
  const showWallInfo = useSelector(GET_SHOW_WALL_INFO_BOOL);
  const selectedWallEndPoint = useSelector(GET_SELECTED_WALL_END_POINT);

  const isDeleted = useSelector(GET_DELTED_LIST).some(
    (d) => d.Id === selectedWall.Id
  );

  console.log("DELETED_LIST_WALL_INFO=", useSelector(GET_DELTED_LIST))

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

  return (
    <motion.div
      id="popUp"
      className={style.WallInfoContainer}
      variants={popUp}
      animate={showWallInfo ? "show" : "hidden"}
      style={
        showWallInfo ? { visibility: "visible" } : { visibility: "hidden" }
      }
    >
      {selectedWall.Id != "" && (
        <>
          <button
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              cursor: "pointer",
              border: "none",
              background: "transparent",
            }}
            onClick={() => {
              dispatch(UPDATE_SHOW_WALL_INFO_TOGGLE(false));
            }}
          >
            <Image src={xIcon.Src} alt={xIcon.Id} width={16} height={16} />
          </button>
          <div className={style.WallInfoTitleContainer}>
            <div className={style.WallInfoTitle}>
              Muro Simple A-{selectedWall.Id}
            </div>
            {isDeleted ? (<button
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
            </button>) : <button
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
            </button>}
          </div>

          <div className="" style={{ display: "flex", paddingTop: "15px" }}>
            <div className={style.WallTable}>
              <div style={{ width: "40px", height: "22px" }} />

              <div className={style.WallCord}>X</div>
              <div className={style.WallCord}>Y</div>
            </div>
            <div className={style.WallTable}>
              <div className={style.WallBaseTitle}>Base</div>
              <div className={style.WallBase}>
                {selectedWallEndPoint.Id != "" &&
                  selectedWallEndPoint.Coords[0].toFixed(2)}
              </div>
              <div className={style.WallBase}>
                {selectedWallEndPoint.Id != "" &&
                  selectedWallEndPoint.Coords[1].toFixed(2)}
              </div>
            </div>
            <div className={style.WallTable}>
              <div className={style.WallBaseTitle}>Infimo</div>
              <div className={style.WallBase}>
                {selectedWallEndPoint.Infimo[0].toFixed(2)}
              </div>
              <div className={style.WallBase}>
                {selectedWallEndPoint.Infimo[1].toFixed(2)}
              </div>
            </div>
            <div className={style.WallTable}>
              <div className={style.WallBaseTitle}>Supremo</div>
              <div className={style.WallBase}>
                {selectedWallEndPoint.Supremo[0].toFixed(2)}
              </div>
              <div className={style.WallBase}>
                {selectedWallEndPoint.Supremo[1].toFixed(2)}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default WallInfo;
