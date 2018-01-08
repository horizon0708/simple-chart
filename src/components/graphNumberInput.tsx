import { container } from "../constants/inversify.config";
import Store from "../services/store";
import * as React from "react";
import { observer } from "mobx-react";

interface GraphInputProps {
  label?: string;
  parameter: string;
}

@observer
export default class GraphNumberInput extends React.Component<
  GraphInputProps,
  {}
> {
  store: Store;

  constructor(props: GraphInputProps) {
    super(props);
    this.store = container.get<Store>(Store);
  }

  handleNumericalInput = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
      let target = event.target as HTMLInputElement;
      if(isNaN(+target.value)) return;
    let newGO = Object.create(this.store.chartData[0].graphOption);
    newGO[name] = +target.value; //+ necessary because i lost type-safety!!!
    this.store.chartData[0].graphOption = newGO;
    this.store.test.b = target.value;
  }

  render() {
    return (
      <div className="field">
        <label className="label">
          {this.props.label || this.props.parameter}
        </label>
        <div className="control">
          <input
            value={this.store.chartData[0].graphOption[this.props.parameter]}
            onChange={this.handleNumericalInput(this.props.parameter)}
            className="input"
            type="text"
            placeholder="Text input"
          />
        </div>
      </div>
    );
  }
}
