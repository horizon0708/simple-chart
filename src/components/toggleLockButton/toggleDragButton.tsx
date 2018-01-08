import * as React from "react";
import {ID3Base} from "../../models/models";
import {observer} from "mobx-react";

interface Props {
    model: ID3Base;
    className?: string;
}

@observer
export default class ToggleDragButton extends React.Component<Props,{}>{
    constructor(props: Props){
        super(props);
    }

    handleToggleDrag = () => {
        this.props.model.draggable = !this.props.model.draggable
    };

    render(){
        return (
            <i onClick={this.handleToggleDrag} className={`fa ${this.props.model.draggable? "fa-unlock": "fa-lock"} `+this.props.className} aria-hidden="true" />
        )
    }
}