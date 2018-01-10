import * as React from "react";
import { observer } from "mobx-react";
import { container } from "../../constants/inversify.config";
import Store from "../../services/store";
import ChartCompWrapper from "../../components/chartCompWrapper/chartCompWrapper";
import * as style from "./mainCanvas.css";
import ColorHelper from "../../services/colorHelper";

@observer
export default class Main extends React.Component<{}, {}> {
  store: Store;

  constructor(props: {}) {
    super(props);
    this.store = container.get<Store>(Store);
  }

  render() {
    const { graphOption, legendOption,titleOption, data } = this.store.chartData[0];
    const hex = ColorHelper.rgb2hex(this.store.canvasColor);
    return (
        <div className={style.wrapper}>
          <div className={style.container}>

              <svg  id={"chart-canvas"} width={this.store.canvasWidth} height={this.store.canvasHeight}>
                  <rect fill={hex} width={this.store.canvasWidth} height={this.store.canvasHeight} />


                  <ChartCompWrapper drawOption={graphOption} data={data} selector={graphOption.svgSelector}  color={this.store.keyToColorMap}/>
                  <ChartCompWrapper drawOption={legendOption} data={data} selector={legendOption.svgSelector}  color={this.store.keyToColorMap} />
                  <ChartCompWrapper drawOption={titleOption} data={data} selector={titleOption.svgSelector}  color={this.store.keyToColorMap}/>

              </svg>
          </div>
        </div>
    );
  }
}
