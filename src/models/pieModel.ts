import {
    Pie,
    BaseType,
    select,
    pie,
    arc,
    Arc
} from "d3";
import {Selection} from "d3-selection";
import {ChartDatum, ID3Pie, KeyToColor, Sort} from "./models";
import {observable} from "mobx";
import {defaultColor} from "../constants/constants";

export default class PieModel implements ID3Pie {
@observable draggable: boolean = true;
@observable visible: boolean = true;
    @observable xOffset: number = 0;
    @observable yOffset: number = 0;
    @observable xTranslate: number = 265;
    @observable yTranslate: number = 330;
    @observable radius: number = 200;
    @observable svgSelector: string;
    @observable color: string[] = defaultColor;


    @observable arcPadding: number = 0.02;
    @observable startAngle: number = 0;
    @observable sort: Sort = Sort.ascending;
    @observable innerRadius: number = 80; // this should be calculated based on width/height
    @observable outerRadius: number = 0;

    @observable keyToColorMap: KeyToColor[] = [];

    constructor(svgSelector: string) {
        this.svgSelector = svgSelector;
    }

    public getHeight(): number {
        return (
            +select<SVGElement, {}>(`#${this.svgSelector}`).attr("height")
        );
    }

    public getWidth(): number {
        return (
            +select<SVGElement, {}>(`#${this.svgSelector}`).attr("width")
        );
    }

    public getRadius(): number {
        return this.radius || Math.min(this.getHeight(), this.getHeight()) / 2;
    }

    public getSelection(): Selection<BaseType, {}, BaseType, any> {
        return select<SVGElement, {}>(`#${this.svgSelector}`);
    }

    public getEndAngle(): number {
        return this.startAngle + 7;
    }

    // null works but does not work when .sort() returns a null....
    public getPie(): Pie<any, ChartDatum> {
        return pie<ChartDatum>()
            .sort((a, b) => a.value - b.value)
            .value(d => d.value)
            .padAngle(this.arcPadding)
            .startAngle(this.startAngle)
            .endAngle(this.getEndAngle());
    }

    public getPiePath(): Arc<any, ChartDatum> {
        return arc<ChartDatum>()
            .outerRadius(this.getRadius() - this.outerRadius)
            .innerRadius(this.getRadius() - this.innerRadius);
    }
}
