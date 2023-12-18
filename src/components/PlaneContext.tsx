"use client"
import { GET_EDIT_STATE, GET_SCROLL_STATE, UPDATE_SCROLL_STATE } from "@/redux/slices/selectionSlice";
import Plane from "@/types/Plane";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PlaneContext(plane: Plane) {

    const scrolling = useSelector(GET_SCROLL_STATE)
    const isEditing = useSelector(GET_EDIT_STATE)
    const [clientX, setClientX] = useState(0);
    const [scrollX, setScrollX] = useState(0);
    const [clientY, setClientY] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const dispatch = useDispatch()
    if (typeof document !== 'undefined') {
      // code that relies on the document object
    }
    const onMouseDown = (e: any) => {
      console.log("MOUSE_DOWN_TO_SCROLL")
      if(isEditing == false){
        dispatch(UPDATE_SCROLL_STATE(true))
        // code that relies on the document object
        const whiteboard = document.getElementById("canvasBox")
        if(whiteboard ){
          setScrollX(whiteboard.scrollLeft)
          setScrollY(whiteboard.scrollTop)
        }
        setClientX(e.clientX)
        setClientY(e.clientY)
        const Cursor = document.getElementById("plane_container")
        if (Cursor) {
          Cursor.style.cursor = "grabbing"
        }
      }
 
      
    };
  
    const onMouseUp = () => {
      if(isEditing == false){
      dispatch(UPDATE_SCROLL_STATE(false))
        const Cursor = document.getElementById("plane_container")
        if (Cursor) {
          Cursor.style.cursor = "default"
      }
    }
    };
  
    const onMouseMove = (e: any)  => {
        const whiteboard = document.getElementById("canvasBox")
        if (scrolling && whiteboard &&  isEditing == false) {
          console.log("SCROLL_Y=", scrollY)
          console.log("SCROLL_X=", scrollX)
          console.log("CLIENT_Y=", e.clientY)
          console.log("CLIENT_X=", e.clientX)
          console.log("MOUSE_MOVING_FOR_SCROLLING")
          whiteboard.scrollLeft = scrollX - e.clientX + clientX;
          setScrollX((x) => { return (x - e.clientX + clientX)})
          setClientX(e.clientX)
          whiteboard.scrollTop = scrollY - e.clientY + clientY;
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
