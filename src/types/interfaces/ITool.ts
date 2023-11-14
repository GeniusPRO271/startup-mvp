import Icon from "@/assets/Icons/icon"
import React, { Dispatch, SetStateAction } from "react"

export default interface ITool{
    Id:string
    Icon:Icon|null
    render():React.ReactNode
}