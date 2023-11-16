import wallIcon from "../block-brick.svg"
import joinIcon from "../circle-solid.svg"
import slabIcon from "../square-regular.svg"
import xIcon from "../x-solid.svg"
import infoIcon from "../circle-info-solid.svg"
export default interface Icon{
    Src:any
    Id:string
}

export class WallIcon implements Icon{
    Src: any
    Id: string

    constructor(){
        this.Id = "block-brick.svg"
        this.Src = wallIcon
    }
}

export class JoinIcon implements Icon{
    Src: any
    Id: string

    constructor(){
        this.Id = "circle-solid.svg"
        this.Src = joinIcon
    }
}

export class SlabIcon implements Icon{
    Src: any
    Id: string

    constructor(){
        this.Id = "square-regular.svg"
        this.Src = slabIcon
    }
}

export class XIcon implements Icon{
    Src: any
    Id: string

    constructor(){
        this.Id = "x-solid.svg"
        this.Src = xIcon
    }
}
export class InfoIcon implements Icon{
    Src: any
    Id: string

    constructor(){
        this.Id = "circle-info-solid.svg"
        this.Src = infoIcon
    }
}