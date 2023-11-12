import Icon, { WallIcon } from "@/assets/Icons/icon";
import ITool from "../interfaces/ITool";

class FloorPicker  implements   ITool{
    Id: string;
    Icon: Icon | null;

    constructor(id:string){
        this.Id = id
        this.Icon = null
    }

    OnClick(): void {
        
    }
}