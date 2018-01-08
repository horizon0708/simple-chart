import * as React from "react";
import { observer } from "mobx-react";
import Store from "../../services/store";
import { container } from "../../constants/inversify.config";
import LegendModel from "../../models/legendModel";
import { LegendInput } from "../../components/legendInput";
import * as styles from './legendControl.css';

@observer
export default class LegendControl extends React.Component {
  store: Store;

  constructor(props: {}) {
    super(props);
    this.store = container.get<Store>(Store);
    this.getValue = this.getValue.bind(this);
  }

  handleInput = (name: string) => (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    let newData = Object.create(
      this.store.chartData[0].legendOption
    ) as LegendModel;
    newData[name] = target.value;
    this.store.chartData[0].legendOption = newData;
  };

  getValue(param: string): number {
    if (this.store.chartData[0].legendOption.hasOwnProperty(param)) {
      return this.store.chartData[0].legendOption[param];
    }
    return 0;
  }

  renderLegendInput(param: string, label?: string) {
    return (
      <LegendInput
        parameter={param}
        value={this.store.chartData[0].legendOption[param]}
        onChange={this.handleInput(param)}
        label={label || null}
      />
    );
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div>
          {this.renderLegendInput("fontSize")}
        </div>
        <div>
          {this.renderLegendInput("fontWeight")}
        </div>
        <div>
          {this.renderLegendInput("lineSpacing")}
        </div>
        <div>
          {this.renderLegendInput("xTranslate", "x position")}
        </div>
        <div>
          {this.renderLegendInput("yTranslate", "y position")}
        </div>
      </div>
    );
  }
}
