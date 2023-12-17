import React from "react";
import style from "@/app/page.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { GET_ZOOM_SCALE, UPDATE_ZOOM_SCALE } from "@/redux/slices/zoomSlice";

function Zoom() {
  const dispatch = useDispatch();
  const scale = useSelector(GET_ZOOM_SCALE);

  function PlusZoom() {
    let newScale = scale + 0.2;
    const container = document.getElementById("layer_wrapper")
    const canvas = document.getElementById("canvaId")
    if (newScale > 2 && container) return;
    if(container && canvas){
      container.style.transform = `scale(${newScale})`;

      canvas.style.height = `${91800 * newScale}`;
      canvas.style.minHeight = `${91800 * newScale}`;
      canvas.style.width = `${85400 * newScale}`;
      canvas.style.minWidth = `${85400 * newScale}`;

      container.style.height = `${100 / newScale}%`;
      container.style.width = `${100 / newScale}%`;
    }
    dispatch(UPDATE_ZOOM_SCALE(newScale))
    console.log("PLUS_ZOOM");
  }
  function MinusZoom() {
    let newScale = scale - 0.2;
    if (newScale < 0.25) return;
    const container = document.getElementById("layer_wrapper")
    const canvas = document.getElementById("canvaId")
    if (newScale > 2 && container) return;
    if(container && canvas){
      container.style.transform = `scale(${newScale})`;

      canvas.style.height = `${85400 * newScale}`;
      canvas.style.minHeight = `${85400 * newScale}`;
      canvas.style.width = `${91800 * newScale}`;
      canvas.style.minWidth = `${91800 * newScale}`;

      container.style.height = `${100 / newScale}%`;
      container.style.width = `${100 / newScale}%`;
    }
    dispatch(UPDATE_ZOOM_SCALE(newScale))
    console.log("MINUS_ZOOM");
  }

  return (
    <div className={style.zoomContainer}>
      <div className={style.zoomBoxContainer}>
        <button  className={style.zoomBarbutton} onClick={() => {MinusZoom()}}>
          -
        </button>
        <div className={style.zoomText}>{(scale * 100).toFixed(0)}</div>
        <button className={style.zoomBarbutton} onClick={() => {PlusZoom()}} >+</button>
      </div>
    </div>
  );
}

export default Zoom;
