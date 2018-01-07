import {
    Pie,
    scaleOrdinal,
    schemeCategory10,
    BaseType,
    select,
    pie,
    arc,
    Arc
} from "d3";
import {Selection} from "d3-selection";
import * as d3 from "d3";
import {ChartDatum, ID3Pie, IDraggable, Sort} from "./models";
import {observable} from "mobx";

export default class PieModel implements ID3Pie, IDraggable {
    @observable xOffset: number = 0;
    @observable yOffset: number = 0;
    @observable xTranslate: number = 300;
    @observable yTranslate: number = 300;
    @observable radius: number;
    @observable svgSelector: string;
    @observable color: d3.ScaleOrdinal<string, string> = scaleOrdinal(
        schemeCategory10
    );

    @observable arcPadding: number = 0.02;
    @observable startAngle: number = 0;
    @observable sort: Sort = Sort.ascending;
    @observable innerRadius: number = 80; // this should be calculated based on width/height
    @observable outerRadius: number = 0;

    constructor(svgSelector: string) {
        this.svgSelector = svgSelector;
    }

    public getHeight(): number {
        return (
            +select<SVGElement, {}>(this.svgSelector).attr("height")
        );
    }

    public getWidth(): number {
        return (
            +select<SVGElement, {}>(this.svgSelector).attr("width")
        );
    }

    public getRadius(): number {
        return this.radius || Math.min(this.getHeight(), this.getHeight()) / 2;
    }

    public getSelection(): Selection<BaseType, {}, BaseType, any> {
        return select<SVGElement, {}>(this.svgSelector);
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

    onDragStart= ()=>{
        d3
            .selectAll(".pie-chart")
            .classed("drag-selected", true)
    };

    onDragged =()=> {
        this.xTranslate += d3.event.dx;
        this.yTranslate += d3.event.dy;
        d3
            .selectAll(".pie-chart")
            .attr("transform", `translate(${[this.xTranslate, this.yTranslate]})`)
    };

    onDragEnd  =() => {
        d3
            .selectAll(".pie-chart")
            .classed("drag-selected", false);
    };
}
