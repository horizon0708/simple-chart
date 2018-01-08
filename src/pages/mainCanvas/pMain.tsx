import * as React from "react";
import { observer } from "mobx-react";
import { container } from "../../constants/inversify.config";
import Store from "../../services/store";
import ChartCompWrapper from "../../components/chartCompWrapper/chartCompWrapper";

@observer
export default class Main extends React.Component<{}, {}> {
  store: Store;

  constructor(props: {}) {
    super(props);
    this.store = container.get<Store>(Store);
  }

  render() {
    const { graphOption, legendOption, data } = this.store.chartData[0];

    return (
      <div style={{border:"1px solid black", width: 800}}>
          <svg id={"chart-canvas"} width={800} height={800} >
            <ChartCompWrapper drawOption={graphOption} data={data} selector={graphOption.svgSelector} />
              <ChartCompWrapper drawOption={legendOption} data={data} selector={legendOption.svgSelector} />
          </svg>
      </div>
    );
  }
}
