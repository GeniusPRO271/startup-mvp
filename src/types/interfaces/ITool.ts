import Icon from "@/assets/Icons/icon"

export default interface ITool{
    Id:string
    Icon:Icon|null
    OnClick():void
}