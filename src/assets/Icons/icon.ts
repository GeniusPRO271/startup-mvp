import wallIcon from "../block-brick.svg"
import joinIcon from "../circle-solid.svg"
import slabIcon from "../square-regular.svg"

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