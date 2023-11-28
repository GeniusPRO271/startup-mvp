import { XIcon } from "@/assets/Icons/icon";
import Image from "next/image";
import style from "../app/page.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSelectedWall,
  changeShowWallInfo,
  selectSelectionSlice,
  selectValueInput,
} from "@/redux/slices/selectionSlice";
import { motion } from "framer-motion";
import { Wall } from "@/types/Layers/Wall";
import { Join } from "@/types/Layers/Joints";

function WallInfo() {
  const xIcon = new XIcon();
  const dispatch = useDispatch();
  const wallSlice = useSelector(selectSelectionSlice);
  const wall = Wall.fromJSON(wallSlice.wall)
  console.log(wall)
  const pivot = wallSlice.join as Join;

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
      animate={wallSlice.showWallInfo ? "show" : "hidden"}
      style={
        wallSlice.showWallInfo
          ? { visibility: "visible" }
          : { visibility: "hidden" }
      }
    >
      {wall.Id != "" && (
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
              dispatch(changeShowWallInfo(false));
            }}
          >
            <Image src={xIcon.Src} alt={xIcon.Id} width={16} height={16} />
          </button>
          <div className={style.WallInfoTitle}>Muro Simple A-{wall.Id}</div>
          <div className="" style={{ display: "flex", paddingTop: "15px" }}>
            <div className={style.WallTable}>
              <div style={{ width: "40px", height: "22px" }} />

              <div className={style.WallCord}>X</div>
              <div className={style.WallCord}>Y</div>
            </div>
            <div className={style.WallTable}>
              <div className={style.WallBaseTitle}>Base</div>
              <div className={style.WallBase}>
                {pivot.Id != "" && pivot.Coords[0].toFixed(2)}
              </div>
              <div className={style.WallBase}>
                {pivot.Id != "" && pivot.Coords[1].toFixed(2)}
              </div>
            </div>
            <div className={style.WallTable}>
              <div className={style.WallBaseTitle}>Infimo</div>
              {wall.WallOrientation == "Vertical" ? (
                <>
                  <div className={style.WallBase}>{pivot.Id != "" && pivot.Coords[0].toFixed(2)}</div>
                  <input
                    className={style.WallBase}
                    style={{ border: "none" }}
                    placeholder={wall.Infimo.Coords[1] != 0 ? `${wall.Infimo.Coords[1]}` : "Y"}
                    onChange={(event) => {
                      let updatedWall = wall.addInfimo(event)
                      updatedWall && dispatch(changeSelectedWall(updatedWall.SerializedWall()))
                    }}
                  />
                </>
              ) : (
                <>
                  <input
                    className={style.WallBase}
                    style={{ border: "none" }}
                    placeholder={wall.Infimo.Coords[0] != 0 ? `${wall.Infimo.Coords[0]}` : "Y"}
                    onChange={(event) => {
                      let updatedWall = wall.addInfimo(event)
                      updatedWall && dispatch(changeSelectedWall(updatedWall.SerializedWall()))
                    }}
                  />
                  <div className={style.WallBase}>{pivot.Id != "" && pivot.Coords[1].toFixed(2)}</div>
                </>
              )}
            </div>
            <div className={style.WallTable}>
              <div className={style.WallBaseTitle}>Supremo</div>
              {wall.WallOrientation == "Vertical" ? (
                <>
                  <div className={style.WallBase}>{pivot.Id != "" && pivot.Coords[0].toFixed(2)}</div>
                  <input
                    className={style.WallBase}
                    style={{ border: "none" }}
                    placeholder={wall.Supremo.Coords[1] != 0 ? `${wall.Supremo.Coords[1]}` : "Y"}
                    onChange={(event) => {
                      let updatedWall = wall.addSupremo(event)
                      updatedWall && dispatch(changeSelectedWall(updatedWall.SerializedWall()))
                    }}
                  />
                </>
              ) : (
                <>
                  <input
                    className={style.WallBase}
                    style={{ border: "none" }}
                    placeholder={wall.Supremo.Coords[0] != 0 ? `${wall.Supremo.Coords[0]}` : "Y"}
                    onChange={(event) => {
                      let updatedWall = wall.addSupremo(event)
                      updatedWall && dispatch(changeSelectedWall(updatedWall.SerializedWall()))
                    }}
                  />
                  <div className={style.WallBase}>{pivot.Id != "" && pivot.Coords[1].toFixed(2)}</div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default WallInfo;
