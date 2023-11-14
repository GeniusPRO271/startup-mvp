"use client"

import ToolKit from "@/types/tools/Tool";
import LayerToggle from "@/types/tools/LayerToggle";
import React, { useState } from "react";
import style from "@/app/page.module.css"
import Image from "next/image";
import { JoinIcon, SlabIcon, WallIcon } from "@/assets/Icons/icon";
import ITool from "@/types/interfaces/ITool";
import FloorPicker from "@/types/tools/FloorPicker";

function ToolKitContext() {

  const WallLayerToggle = new LayerToggle("W-Num","wall", new WallIcon(), "walls")
  const JoinLayerToggle = new LayerToggle("J-Num","join", new JoinIcon(), "wallNodes")
  const SlabLayerToggle = new LayerToggle("S-Num","slab", new SlabIcon(), "slabs")
  const FloorPickerButton = new FloorPicker("S")

  const toolKit = new ToolKit("ToolKit", [FloorPickerButton,WallLayerToggle,JoinLayerToggle,SlabLayerToggle] )
  return (
    <div className={style.toolBar} id={toolKit.Id}>
          <div className={style.toolBarButtons}>
            {toolKit && toolKit.Tools.map((tool) => {
                return(
                  <div key={tool.Id}>
                   { tool.render()}
                  </div>
                )
            })}
          </div>
    </div>
  );
}


export default ToolKitContext;
