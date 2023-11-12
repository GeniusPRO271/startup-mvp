import Icon from "@/assets/Icons/icon";
import ITool from "../interfaces/ITool";

export default class LayerToggle implements ITool{
    Id: string;
    Type: string;
    Icon:Icon
    LayerState:boolean
    LayerId:string

    constructor(id:string,type:string, icon:any,layerId:string){
        this.Id = id
        this.Type = type
        this.Icon = icon
        this.LayerId = layerId
        this.LayerState = true
    }

    OnClick():void {
        try{
            console.log("Toggle ",this.LayerId,"to= ",!this.LayerState)
            let layer = document.getElementById(this.LayerId)
            if (layer && this.LayerState == true){
                layer.style.display = "none"
            } else if (layer && this.LayerState == false){
                layer.style.display = "block"
            } else {
                console.log("error changing state of layer=",this.LayerId )
            }
            this.LayerState = !this.LayerState
        } catch(err){
            console.log(err)
        }
    }
}