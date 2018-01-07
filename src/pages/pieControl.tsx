import * as React from "react";
import GraphNumberInput from "../components/graphNumberInput";
import "./grid.css";

export default class PieControl extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <div>
          <GraphNumberInput parameter={"xTranslate"} label={"x position"} />
        </div>
        <div>
          <GraphNumberInput parameter={"yTranslate"} label={"y position"} />
        </div>
        <div>
          <GraphNumberInput parameter={"arcPadding"} />
        </div>
        <div>
          <GraphNumberInput parameter={"radius"} />
        </div>
        <div>
          <GraphNumberInput parameter={"innerRadius"} label={"thickness"} />
        </div>
        <div>
          <GraphNumberInput parameter={"startAngle"} />
        </div>
      </div>
    );
  }
}
