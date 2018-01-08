import * as React from "react";
import { IChartData } from "../models/models";
import { ChartHelper } from "../services/chartHelper";

export default class TestWrapper extends React.Component<IChartData, {}> {
  componentDidMount() {
    ChartHelper.drawLegend(this.props.legendOption, this.props.data);
    //ChartHelper.attachDrag(this.props.graphOption);
  }

  componentDidUpdate() {
    ChartHelper.delete(this.props.legendOption);
    ChartHelper.drawLegend(this.props.legendOption, this.props.data);
  }

  componentWillUnmount() {
    ChartHelper.delete(this.props.legendOption);
  }

  render() {
    return (
      <div id="chart-wrapper">
        <svg width={"100%"} height={600} >

          <g id="legend-svg" />
        </svg>
      </div>
    );
  }
}
