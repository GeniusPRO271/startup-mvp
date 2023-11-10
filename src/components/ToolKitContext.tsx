import ToolKit from "@/app/types/Tool";
import LayerToggle from "@/app/types/tools/LayerToggle";
import React from "react";
import style from "@/app/page.module.css"
import Image from "next/image";
import WallIcon from "@/assets/block-brick.svg"

function ToolKitContext() {

    const WallLayerToggle = new LayerToggle("W-Num","wall")
    const SlabLayerToggle = new LayerToggle("Slab-Num","Slab")
    const JointLayerToggle = new LayerToggle("Joint-Num","Joint")

    const toolKit = new ToolKit("ToolKit", [WallLayerToggle,SlabLayerToggle,JointLayerToggle] )

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
    console.log(tool)
  return (
    <div className={style.toolBarItem} id={tool.Id} key={tool.Id}>
      <button className={style.toolBarbutton}>
        <Image src={WallIcon} alt="WallIcon" width={16} height={16}/>
      </button>
    </div>
  );
}

export default ToolKitContext;
