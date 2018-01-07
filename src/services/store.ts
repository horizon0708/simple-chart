import {injectable} from "inversify";
import {action, computed, observable} from "mobx";
import PieModel from "../models/pieModel";
import LegendModel from "../models/legendModel";
import {ChartData, ChartDatum, ChartType } from "../models/models";
import * as d3 from "d3";

@injectable()
export default class Store {
    @observable chartData: ChartData[] = [
        {
            type: ChartType.pie,
            graphOption: new PieModel("#chart-svg"),
            legendOption: new LegendModel("#chart-svg"),
            data: [
                {
                    key: "hello",
                    value: 52
                },
                {
                    key: "hi",
                    value: 52
                },
                {
                    key: "toaster",
                    value: 52
                }
            ]
        }
    ];
    @observable currentChartType: ChartType;
    @observable test: any = {
      a: "hi",
      b: "toaster"
    };

    // getters for current chart
    @computed get currentChart(): ChartData {
        return this.chartData.find(x=>x.type === this.currentChartType) || this.chartData[0];
    }
    //missing call signature ???
    @computed get graphOption(): PieModel{
        return this.chartData[0].graphOption;
    }
    @computed get legendOption(): LegendModel {
        return this.chartData[0].legendOption;
    }
    @computed get data(): ChartDatum[]{
        return this.chartData[0].data;
    }

    @action onDragStart(): void {
        d3
            .selectAll(".arc")
            .classed("drag-selected", true)
    }

    @action onDragged(): void {
        this.chartData[0].graphOption.xTranslate = d3.event.dx;
        this.chartData[0].graphOption.yTranslate  = d3.event.dy;
        console.log(d3.event.dy);
        d3
            .selectAll(".arc")
            .attr("transform", `translate(${[this.chartData[0].graphOption.xTranslate , this.chartData[0].graphOption.yTranslate]})`)
    }

    @action onDragEnd(): void {
    d3
    .selectAll(".arc")
    .classed("drag-selected", false);
}
}