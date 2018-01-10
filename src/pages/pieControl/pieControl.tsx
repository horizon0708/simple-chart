import * as React from "react";
import GraphNumberInput from "../../components/graphNumberInput/graphNumberInput";
import * as styles from "./style.css";

export default class PieControl extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div>
          <GraphNumberInput parameter={"xTranslate"} label={"x"} />
        </div>
        <div>
          <GraphNumberInput parameter={"yTranslate"} label={"y"} />
        </div>
        <div>
          <GraphNumberInput parameter={"arcPadding"} label={"padding"} />
        </div>
        <div>
          <GraphNumberInput parameter={"radius"} />
        </div>
        <div>
          <GraphNumberInput parameter={"innerRadius"} label={"thickness"} />
        </div>
        <div>
          <GraphNumberInput parameter={"startAngle"} label={"rotation"} />
        </div>

      </div>
    );
  }
}
