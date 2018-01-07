import { BaseType } from "d3";
import * as d3 from "d3";
import LegendModel from "../models/legendModel";
import { ChartDatum, ID3Base, IDraggable, Sort } from "../models/models";
import PieModel from "../models/pieModel";

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

  static drawPieArc(pieModel: PieModel, data: ChartDatum[]) {
    let selection = pieModel.getSelection();
    let arc = <d3.Selection<BaseType, any, BaseType, any>>selection
      .append("g")
      .attr("class", "pie-chart")
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
      .selectAll(".pie-chart-text")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "pie-chart-text-group")
      .attr(
        "transform",
        `translate(${[legend.xTranslate, legend.yTranslate]})`
      );
    // const group = <d3.Selection<BaseType, {}, any, any>>textSelection;

    textSelection
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

  static attachDrag(option: IDraggable) {
    option
      .getSelection()
      .call(
        d3
          .drag()
          .on("start", option.onDragStart)
          .on("drag", option.onDragged)
          .on("end", option.onDragEnd)
      );
  }
}
