"use client"

import ToolKit from "@/types/tools/Tool";
import LayerToggle from "@/types/tools/LayerToggle";
import React from "react";
import style from "@/app/page.module.css"
import Image from "next/image";
import { JoinIcon, SlabIcon, WallIcon } from "@/assets/Icons/icon";
import ITool from "@/types/interfaces/ITool";

function ToolKitContext() {

  const WallLayerToggle = new LayerToggle("W-Num","wall", new WallIcon(), "walls")
  const JoinLayerToggle = new LayerToggle("J-Num","join", new JoinIcon(), "wallNodes")
  const SlabLayerToggle = new LayerToggle("S-Num","slab", new SlabIcon(), "slabs")

  const toolKit = new ToolKit("ToolKit", [WallLayerToggle,JoinLayerToggle,SlabLayerToggle] )

  return (
    <div className={style.toolBar} id={toolKit.Id}>
          <div className={style.toolBarButtons}>
            {toolKit && toolKit.Tools.map((tool) => {
                return(
                    <Tool tool={tool} key={tool.Id}/>
                )
            })}
          </div>
    </div>
  );
}

function Tool({ tool }: { tool: ITool}) {
  return (
    <div className={style.toolBarItem} id={tool.Id} key={tool.Id}>
      <button className={style.toolBarbutton}  onClick={() => {tool.OnClick()}}>
        <Image src={tool.Icon?.Src} alt={"ToolIcon_"+tool.Id} width={16} height={16}/>
      </button>
    </div>
  );
}

export default ToolKitContext;
