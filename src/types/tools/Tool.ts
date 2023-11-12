import ITool from "../interfaces/ITool"

export default class ToolKit{
    public Id:string
    public Tools: ITool[]

    constructor(id:string, tools: ITool[]){
        this.Id = id
        this.Tools = tools
    }
}