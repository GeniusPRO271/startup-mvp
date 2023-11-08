"use client"
import React, { useState } from 'react'
import style from "@/app/page.module.css"
// Interface o whiteboard in the future should be a class with mothods
interface WhiteBoard{
    plane:Plane
    //owner: User for future user with User 
    // memebers:[User] for future use with Users
}
function WhiteBoardContext() {
    const [height, setHeight] = useState(85400)
    const [width, setWidth] = useState(91800)
    const [heightPerc, setHeightPerc] = useState(100)
    const [widthPerc, setWidthPerc] = useState(100)
    const [scale, setScale] = useState(1)
  
  return (
    <div className={style.canvasBox} style={{ touchAction: 'none', overflow:"scroll" }}>
        <div id="canvaId" className={style.canvas} style={{width: width, minWidth:width, height: height, minHeight: height }}>
            <div className={style.layer_wrapper} style={{transform: `scale(${scale})`, height: `${heightPerc}%`,width: `${widthPerc}%`}}>
                <div className={style.canvas_grid}/>
            </div>
        </div>
    </div>
  )
}

export default WhiteBoardContext