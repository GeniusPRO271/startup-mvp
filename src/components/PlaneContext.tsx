import Plane from "@/app/types/Plane";
import React from "react";

function PlaneContext(plane: Plane) {
  const building = plane.Building;
  return (
    <svg id="plane_container" style={{width: "100%", height:"100%", position:"absolute"}} key={"plane_" + plane.PlaneId}>
      {building.render()}
    </svg>
  );
}




export default PlaneContext;
