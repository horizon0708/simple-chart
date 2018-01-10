import { injectable } from "inversify";
import {action, computed, observable} from "mobx";
import PieModel from "../models/pieModel";
import LegendModel from "../models/legendModel";
import {ChartData, ChartDatum, ChartType, KeyToColor, RGBA} from "../models/models";
import TitleModel from "../models/titleModel";
import {defaultColor} from "../constants/constants";
import {SortHelper} from "./sortHelper";
import ColorHelper from "./colorHelper";

@injectable()
export default class Store {
  constructor(){
   this.initializeKeyToColorMap();

  }


    @observable
  chartData: ChartData[] = [
    {
      type: ChartType.pie,
        titleOption: new TitleModel("title-svg"),
      graphOption: new PieModel("chart-svg"),
      legendOption: new LegendModel("legend-svg"),
      data: [
        {
          key: "Nic is driving",
          value: 2,
            y: "1"
        },
        {
          key: "Alex",
          value: 52,
            y: "1"
        },
          {
              key: "I can't aim",
              value: 1,
              y: "1"
          },
          {
              key: "Duck bans my life",
              value: 3,
              y: "1"
          }
      ]
    }
  ];
  @observable canvasWidth: number = 800;
  @observable canvasHeight: number= 600;
  //color
  @observable canvasColor: RGBA = {
    r: 247,
      g: 245,
      b: 239,
      a: 1
  };
  @observable chartColor: string[] = defaultColor;
  @observable keyToColorMap: KeyToColor[] = [];

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

  @action
  setCanvasHeight(value:number){
    if(value> 1200){
      return this.canvasHeight = 1200;
    }
    if(value < 100){
      return this.canvasHeight = 100;
    }
    return this.canvasHeight = value;
  }

  @action
  setColor(modelName:string ,hexs: string[]){
    let output = Object.create(this.chartData[0][modelName]);
    this.chartColor = hexs;
    output.color = this.chartColor;
    this.chartData[0][modelName] = output;
  }

  @action
  initializeKeyToColorMap(){
    let keys = SortHelper.getUniqueKeys(this.chartData[0].data);
    this.keyToColorMap = keys.map((x,i)=>{
      let output = new KeyToColor();
      output.color = defaultColor[i];
      output.key = x;
      return output;
    });
  }

  @action
  editKeyName(keyName:string, newKey:string){
      let keytoUpdate = this.keyToColorMap.find(x=>x.key === keyName);
      if(keytoUpdate) {
          keytoUpdate.key = newKey;
      } else{
          console.log("key not found");
      }
  }

  @action
  addKeyColor(keyName:string){
      this.keyToColorMap.push({key: keyName, color: ColorHelper.getRandomColor()});
  }

  @action
  updateKeyToColorMap(keyName: string, hexColor:string){
      let keytoUpdate = this.keyToColorMap.find(x=>x.key === keyName);
      if(keytoUpdate) {
          keytoUpdate.color = hexColor;
      } else{
        console.log("key not found");
      }
  }
}
