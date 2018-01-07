import * as React from "react";
import { IChartData } from "../models/models";
import { ChartHelper } from "../services/chartHelper";

export default class TestWrapper extends React.Component<IChartData, {}> {
  componentDidMount() {
    ChartHelper.drawPieArc(this.props.graphOption, this.props.data);
    ChartHelper.drawLegend(this.props.legendOption, this.props.data);
    //ChartHelper.attachDrag(this.props.graphOption);
  }

  componentDidUpdate() {
    ChartHelper.delete(this.props.graphOption);
    ChartHelper.delete(this.props.legendOption);
    ChartHelper.drawPieArc(this.props.graphOption, this.props.data);
    ChartHelper.drawLegend(this.props.legendOption, this.props.data);
  }

  componentWillUnmount() {
    ChartHelper.delete(this.props.graphOption);
    ChartHelper.delete(this.props.legendOption);
  }

  render() {
    return (
      <div id="chart-wrapper">
        <svg id="chart-svg" width={"100%"} height={600} />
      </div>
    );
  }
}
