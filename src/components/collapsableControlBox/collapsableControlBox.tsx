import * as React from "react";
import * as styles from "./collapsableControlBox.css";
import ToggleDragButton from "../toggleLockButton/toggleDragButton";
import ToggleVisibleButton from "../toggleVisibleButton/toggleVisibleButton";
import {ID3Base} from "../../models/models";


interface ControlBoxProps{
    header: string;
    model: ID3Base;
}

interface CollapsableBoxState {
    open: boolean;
}

export default class CollapsableControlBox extends React.Component<ControlBoxProps, CollapsableBoxState>{
    constructor(props: ControlBoxProps){
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
                        <ToggleVisibleButton  model={this.props.model} className={styles.icon}/>
                        <ToggleDragButton model={this.props.model} className={styles.icon} />
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