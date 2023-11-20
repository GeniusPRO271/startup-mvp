import { XIcon } from "@/assets/Icons/icon";
import Image from "next/image";
import style from "../app/page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeShowWallInfo, selectWall, selectWallSlice } from "@/redux/slices/wallSlice";
import { motion } from "framer-motion";
import { Wall } from "@/types/Layers/Wall";

function WallInfo() {
  const xIcon = new XIcon();
  const dispatch = useDispatch()
  const wallSlice = useSelector(selectWallSlice);
  const wall = wallSlice.wall as Wall;

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
        style={wallSlice.showWallInfo ? {visibility: "visible"} : {visibility:"hidden"}}
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
              onClick={() => {dispatch(changeShowWallInfo(false))}}
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
                  {wall.lineCords[0].toFixed(2)}
                </div>
                <div className={style.WallBase}>
                  {wall.lineCords[1].toFixed(2)}
                </div>
              </div>
              <div className={style.WallTable}>
                <div className={style.WallBaseTitle}>Infimo</div>
                <div className={style.WallBase}>Y</div>
                <div className={style.WallBase}>Y</div>
              </div>
              <div className={style.WallTable}>
                <div className={style.WallBaseTitle}>Supremo</div>
                <div className={style.WallBase}>Y</div>
                <div className={style.WallBase}>Y</div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    );

}

export default WallInfo;
