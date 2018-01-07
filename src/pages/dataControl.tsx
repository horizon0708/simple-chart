import * as React from "react";
import { observer } from "mobx-react";
import Store from "../services/store";
import { container } from "../constants/inversify.config";
import { DataInput } from "../components/dataInput";
import { ChartDatum } from "../models/models";

@observer
export default class DataControl extends React.Component {
  store: Store;

  constructor(props: {}) {
    super(props);
    this.store = container.get<Store>(Store);
  }

  handleInput = (index: number, name: string) => (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    let newData = Object.create(this.store.chartData[0].data);
    newData[index][name] = target.value;
    this.store.chartData[0].data = newData;
  }

  addKeyValuePair = () => {
    let newData = Object.create(this.store.chartData[0].data);
    newData.push({
      key: `new datum ${newData.length}`,
      value: newData.length
    });
    this.store.chartData[0].data = newData;
  }

  deleteKeyValuePair = () => {
    if (this.store.chartData[0].data.length < 2) {
      return;
    }
    let newData = Object.create(this.store.chartData[0].data) as ChartDatum[];
    newData.splice(newData.length - 1, 1);
    this.store.chartData[0].data = newData;
  }

  renderDataList() {
    return this.store.chartData[0].data.map((x, i) => {
      return (
        <DataInput
          key={i}
          onValueChange={this.handleInput(i, "value")}
          onKeyChange={this.handleInput(i, "key")}
          name={x.key}
          value={x.value}
        />
      );
    });
  }

  renderDeleteButton() {
    return this.store.chartData[0].data.length > 1
      ? <button onClick={this.deleteKeyValuePair}> Delete Datum </button>
      : null;
  }

  render() {
    return (
      <div>
        {this.renderDataList()}
        <button onClick={this.addKeyValuePair}> Add Datum </button>
        {this.renderDeleteButton()}
      </div>
    );
  }
}
