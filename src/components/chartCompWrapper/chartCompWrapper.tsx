import {ChartHelper} from "../../services/chartHelper";
import {ChartDatum, ID3Base, KeyToColor} from "../../models/models";
import * as React from "react";
import * as styles from "./chartCompWrapper.css";

interface ChartWrapperProps {
    color: KeyToColor[];
    drawOption: ID3Base;
    data: ChartDatum[];
    selector: string; // this is a bother. since render happens AFTER cdm, I need to give the selector upfront
}


export default class ChartCompWrapper extends React.Component<ChartWrapperProps, {}> {
    componentDidMount() {
        ChartHelper.draw(this.props.drawOption, this.props.data, this.props.color);
        ChartHelper.attachDrag(this.props.drawOption);
    }

    componentDidUpdate(){
        ChartHelper.delete(this.props.drawOption);
        if(this.props.drawOption.visible){
            ChartHelper.draw(this.props.drawOption, this.props.data,this.props.color);
            ChartHelper.attachDrag(this.props.drawOption);
        }

    }

    componentWillUnmount(){
        ChartHelper.delete(this.props.drawOption);
    }

    render(){
        return (
             <g className={styles.wrapper} id={this.props.selector} />
        );
    }
}