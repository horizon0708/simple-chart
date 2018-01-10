import * as React from "react";
import * as styles from "./style.css";

interface CollapsableBoxState {
  open: boolean;
}

export interface CollapsableBoxProps {
  header: string;
}

export default class CollapsableBox extends React.Component<
  CollapsableBoxProps,
  CollapsableBoxState
> {
  constructor(props: CollapsableBoxProps) {
    super(props);
    this.state = {
      open: true
    };
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  renderContent() {
    if (this.state.open) {
      return (
            <div className={styles.contentBox}>
              <div className={styles.content}>
                {this.props.children}
              </div>
            </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className={styles.box}>
        <div className={this.state.open ? styles.headBox : styles.closed}>
          <div className={styles.heading}>{this.props.header}</div>
          <div>
            <i
              onClick={this.toggleOpen}
              className={`fa ${this.state.open ? "fa-minus" : "fa-plus"} ${styles.icon}`}
              aria-hidden="true"
            />
          </div>
        </div>
        {this.renderContent()}
      </div>
    );
  }
}