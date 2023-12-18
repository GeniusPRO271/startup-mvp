"use client"
import Plane from "@/types/Plane";
import React, { useEffect, useState } from "react";

function PlaneContext(plane: Plane) {

    const [scrolling, setIsScrolling] = useState(false);
    const [clientX, setClientX] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const [clientY, setClientY] = useState(0);
    const [scrollY, setScrollY] = useState(0);
  
    const onMouseDown = (e: any) => {
      setIsScrolling(true)
      console.log("MOUSE_DOWN_FOR_SCROLLING")
      console.log("SCROLL_Y=", scrollY)
      console.log("SCROLL_X=", scrollX)
      console.log("CLIENT_Y=", e.clientY)
      console.log("CLIENT_X=", e.clientX)
      const whiteboard = document.getElementById("canvasBox")
      if(whiteboard){
        setScrollX(whiteboard.scrollLeft)
        setScrollY(whiteboard.scrollTop)
      }
      setClientX(e.clientX)
      setClientY(e.clientY)
 
      

      const Cursor = document.getElementById("plane_container")
      if (Cursor) {
        Cursor.style.cursor = "grabbing"
      }
    };
  
    const onMouseUp = () => {
      setIsScrolling(false)
      const Cursor = document.getElementById("plane_container")
      if (Cursor) {
        Cursor.style.cursor = "default"
      }
    };
  
    const onMouseMove = (e: any)  => {
    
      const whiteboard = document.getElementById("canvasBox")
      if (scrolling && whiteboard) {
        console.log("SCROLL_Y=", scrollY)
        console.log("SCROLL_X=", scrollX)
        console.log("CLIENT_Y=", e.clientY)
        console.log("CLIENT_X=", e.clientX)
        console.log("MOUSE_MOVING_FOR_SCROLLING")
        whiteboard.scrollLeft = scrollX + e.clientX - clientX;
        setScrollX((x) => { return x - e.clientX + clientX})
        setClientX(e.clientX)
        whiteboard.scrollTop = scrollY + e.clientY - clientY;
        setScrollY((x) => { return x - e.clientY + clientY})
        setClientY(e.clientY)
      }
    };
  const building = plane.Building;
  return (
    <svg
      id="plane_container"
      style={{ width: "100%", height: "100%", position: "absolute", cursor: "default" }}
      key={"plane_" + plane.PlaneId}
      onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
    >
      {building.render()}
    </svg>
  );
}

export default PlaneContext;
