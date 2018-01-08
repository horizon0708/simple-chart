import LegendModel from "./legendModel";
import PieModel from "./pieModel";

export enum TextAnchor{
    start ="start",
    left = "start",
    middle = "middle",
    end = "end",
    right = "right"
}

export enum FontWeight{
    normal = "normal",
    bold = "bold",
    bolder = "bolder",
    thick = "bold",
    thicker = "bolder",
    lighter = "light"
}

export enum Sort{
    ascending,
    descending
}

export enum ChartType {
    pie = "CHART_TYPE_PIE"
}

export interface IChartData{
    type: ChartType;
    data: ChartDatum[];
    graphOption: PieModel;
    legendOption: LegendModel;
}
export class ChartData implements IChartData{
    type: ChartType;
    data: ChartDatum[];
    graphOption: PieModel;
    legendOption: LegendModel;
    constructor(type: ChartType, data: ChartDatum[], go: PieModel, lo:LegendModel){
        this.type = type;
        this.data = data;
        this.graphOption = go;
        this.legendOption = lo;
    }
}


export class ChartDatum {
    key: string;
    value: number;
    constructor(key:string, value: number){
        this.key = key;
        this.value = value;
    }
}

export interface ID3Base {
    svgSelector: string;
    draggable: boolean;
    visible: boolean;
    sort: Sort;
    xOffset: number;
    yOffset: number;
    xTranslate: number;
    yTranslate: number;
    color: d3.ScaleOrdinal<string, string>

    getSelection(): any;

}


export interface ID3Text extends ID3Base {
    fontSize: number;
    fontWeight: FontWeight | number;
    lineSpacing: number;
}

export interface ID3Pie extends ID3Base {
    radius: number;
    arcPadding: number;
    startAngle: number;
    innerRadius: number;
    outerRadius: number;
    getPie(): any;
    getPiePath(): any;
}

export interface IDraggable extends ID3Base{
    onDragStart:  ()=>void;
    onDragged:  ()=>void;
    onDragEnd: ()=>void;
}