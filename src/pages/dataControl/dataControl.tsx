import * as React from "react";
import { observer } from "mobx-react";
import Store from "../../services/store";
import { container } from "../../constants/inversify.config";
import { DataInput } from "../../components/dataInput";
import {ChartDatum} from "../../models/models";
import * as styles from './dataControl.css';
import ColorHelper from "../../services/colorHelper";

interface colorPickerGroupProps {
    modelName: string;
    arraySize: number;
}


@observer
export default class DataControl extends React.Component<colorPickerGroupProps, {}> {
  store: Store;

  constructor(props: colorPickerGroupProps) {
    super(props);
    this.store = container.get<Store>(Store);
  }

  handleInput = (index: number, name: string) => (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    let newData = Object.create(this.store.chartData[0].data);
    this.store.editKeyName(newData[index][name], target.value);
    newData[index][name] = target.value;
    this.store.chartData[0].data = newData;
  };

    handleNumber = (index: number) => (
        event: React.FormEvent<HTMLInputElement>
    ) => {
        const target = event.target as HTMLInputElement;
        if(isNaN(+target.value)) { return }
        let newData = Object.create(this.store.chartData[0].data);
        newData[index].value = +target.value;
        this.store.chartData[0].data = newData;
    };

  addKeyValuePair = () => {
      let newData = Object.create(this.store.chartData[0].data);
        this.store.addKeyColor( `new datum ${newData.length}`);
    newData.push({
      key: `new datum ${newData.length}`,
      value: newData.length,
        y: "1"
    });
    this.store.chartData[0].data = newData;


  };

  deleteKeyValuePair = () => {
    if (this.store.chartData[0].data.length < 2) {
      return;
    }
    let newData = Object.create(this.store.chartData[0].data) as ChartDatum[];
    newData.splice(newData.length - 1, 1);
    this.store.chartData[0].data = newData;
  };

  delete = (index:number) => (e: React.MouseEvent<HTMLElement>)=> {
      if (this.store.chartData[0].data.length < 2) {
          return;
      }
      let newData = Object.create(this.store.chartData[0].data) as ChartDatum[];
      newData.splice(index, 1);
      this.store.chartData[0].data = newData;
  };

  changeColor = (key:string) => (color: any) => {
        this.store.updateKeyToColorMap(key, color.hex);
      let newData = Object.create(this.store.chartData[0].data) as ChartDatum[];
      this.store.chartData[0].data = newData;
  };

  renderDataList() {
    return this.store.chartData[0].data.map((x, i) => {
        const col = this.store.keyToColorMap.find((y:any)=>y.key === x.key);
        return <DataInput
              key={i}
              color={ col ? ColorHelper.hexToRgb(col.color): "#000000" }
              onColorChange={this.changeColor(x.key)}
              onValueChange={this.handleNumber(i)}
              onKeyChange={this.handleInput(i, "key")}
              name={x.key}
              value={x.value}
              onDelete={this.delete(i)}
            />
        }
    );
  }

  renderDeleteButton() {
    return this.store.chartData[0].data.length > 1
      ? <button className={`button`} onClick={this.deleteKeyValuePair}> Delete Datum </button>
      : null;
  }

  render() {
    return (
      <div>
        {this.renderDataList()}
          <div className={styles.buttons}>
              <div style={{width:"100%", display: "flex", justifyContent:"center"}}>
                <div>
                    <i style={{fontSize: "2em"}} className="fa fa-plus-circle" aria-hidden="true" onClick={this.addKeyValuePair}/>
                </div>
              </div>
          </div>

      </div>
    );
  }
}
