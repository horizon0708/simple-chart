import * as React from "react";
import styles from "./style.css";
interface CollapsableBoxState {
  open: boolean;
}

export default class CollapsableBox extends React.Component<
  {},
  CollapsableBoxState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  renderContent() {
    if (this.state.open) {
      return (
        <div className="card-content">
          <div className="content">{this.props.children}</div>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <div className="card-head">
          <div className="heading">header</div>
          <div className="toggle-open-icon" />
        </div>
      </div>
    );
  }
}
