import {arc, Arc, BaseType, pie, Pie, select} from "d3";
import * as d3 from "d3";
import LegendModel from "../models/legendModel";
import {ChartDatum, ID3Base, Sort} from "../models/models";
import PieModel from "../models/pieModel";
import {Selection} from "d3-selection";

export class ChartHelper {
  public static sort(sort: Sort) {
    if (sort === Sort.ascending) {
      return (a: ChartDatum, b: ChartDatum): number => a.value - b.value;
    }
    return (a: ChartDatum, b: ChartDatum): number => b.value - a.value;
  }

  static delete(model: ID3Base) {
    let selection = model.getSelection();
    selection.selectAll("*").remove();
  }

  static draw(model: ID3Base, data: ChartDatum[]) {
    if(model instanceof PieModel){
      console.log("pie");
      ChartHelper.drawPieArc(model, data);
    }
    if(model instanceof LegendModel){
        console.log("legend");

        ChartHelper.drawLegend(model, data);
    }
  }

  static drawPieArc(pieModel: PieModel, data: ChartDatum[]) {
    let selection = pieModel.getSelection();
    let arc = <d3.Selection<BaseType, any, BaseType, any>>selection
      .attr(
        "transform",
        `translate(${[pieModel.xTranslate, pieModel.yTranslate]})`
      )
      .selectAll(".arc")
      .data(pieModel.getPie()(data))
      .enter()
      .append("g")
      .attr("class", "arc");
    arc
      .append("path")
      .attr("d", pieModel.getPiePath())
      .attr("fill", (f: any) => pieModel.color(f.data.key));

  }

  static drawLegend(legend: LegendModel, data: ChartDatum[]): void {
    let selection = legend.getSelection();
    const textSelection = selection
      .attr(
        "transform",
        `translate(${[legend.xTranslate, legend.yTranslate]})`
      );
    // const group = <d3.Selection<BaseType, {}, any, any>>textSelection;

    textSelection
        .selectAll(".pie-chart-text")
        .data(data)
        .enter()
      .append("text")
      .sort((a, b) => a.value - b.value)
      .attr("class", "pie-chart-text")
      .attr("text-anchor", `${legend.textAnchor}`)
      .style("font-size", `${legend.fontSize}px`)
      .style("font-weight", `${legend.fontWeight}`)
      .attr("fill", d => legend.color(d.key))
      .attr("y", (d, i, node) => legend.getY(d, i, node))
      .attr("x", () => legend.getX())
      .text(d => d.key);
  }

    static getSelection(model: ID3Base): Selection<BaseType, {}, BaseType, any> {
        return select<SVGElement, {}>(`#${model.svgSelector}`);
    }

    static getPie(model: PieModel): Pie<any, ChartDatum> {
        return pie<ChartDatum>()
            .sort((a, b) => a.value - b.value)
            .value(d => d.value)
            .padAngle(model.arcPadding)
            .startAngle(model.startAngle)
            .endAngle(model.getEndAngle());
    }

    static getPiePath(model: PieModel): Arc<any, ChartDatum> {
        return arc<ChartDatum>()
            .outerRadius(model.getRadius() - model.outerRadius)
            .innerRadius(model.getRadius() - model.innerRadius);
    }

    static onDragStart = (model: ID3Base) => {
        if(!model.draggable) return;
        d3.select(`#${model.svgSelector}`)
            .attr("stroke-linejoin", "round").attr("stroke-dasharray", "12,12");
    };

    static onDragged = (model: ID3Base) => {
        if(!model.draggable) return;
        //const container = document.getElementById("chart-canvas") as HTMLElement;
        // model.xTranslate = d3.mouse(container)[0];
        // model.yTranslate = d3.mouse(container)[1];
        model.xTranslate += d3.event.dx;
        model.yTranslate += d3.event.dy;
        d3.select(`#${model.svgSelector}`)
            .attr("transform",`translate(${[model.xTranslate,model.yTranslate]}
        )`)

    };

    static onDragEnd = (model: ID3Base) => {
        if(!model.draggable) return;
        d3.select(`#${model.svgSelector}`)
            .attr("stroke-linecap","round")
            .attr("stroke-linejoin", "round").attr("stroke-dasharray", "0");
    };

    static attachDrag = (model: ID3Base) => {
        d3.select(`#${model.svgSelector}`).call(
            d3.drag()
                .on("drag", ()=>ChartHelper.onDragged(model))
                .on("start", ()=>ChartHelper.onDragStart(model))
                .on("end",()=>ChartHelper.onDragEnd(model))
        );
    }


}
