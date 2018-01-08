import { injectable } from "inversify";
import { computed, observable } from "mobx";
import PieModel from "../models/pieModel";
import LegendModel from "../models/legendModel";
import { ChartData, ChartDatum, ChartType } from "../models/models";

@injectable()
export default class Store {
  constructor(){

  }


    @observable
  chartData: ChartData[] = [
    {
      type: ChartType.pie,
      graphOption: new PieModel("chart-svg"),
      legendOption: new LegendModel("legend-svg"),
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
  @observable
  test: any = {
    a: "hi",
    b: "toaster"
  };

  // getters for current chart
  @computed
  get currentChart(): ChartData {
    return (
      this.chartData.find(x => x.type === this.currentChartType) ||
      this.chartData[0]
    );
  }
  //missing call signature ???
  @computed
  get graphOption(): PieModel {
    return this.chartData[0].graphOption;
  }
  @computed
  get legendOption(): LegendModel {
    return this.chartData[0].legendOption;
  }
  @computed
  get data(): ChartDatum[] {
    return this.chartData[0].data;
  }

}
