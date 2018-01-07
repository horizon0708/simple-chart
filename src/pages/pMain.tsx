import * as React from "react";
import { observer } from "mobx-react";
import { container } from "../constants/inversify.config";
import Store from "../services/store";
import TestWrapper from "./pTestWrapper";
// import {ChartHelper} from "../services/chartHelper";

@observer
export default class Main extends React.Component<{}, {}> {
  store: Store;

  constructor(props: {}) {
    super(props);
    this.store = container.get<Store>(Store);
  }

  render() {
    return (
      <div>
        <TestWrapper {...this.store.chartData[0]} />
      </div>
    );
  }
}
