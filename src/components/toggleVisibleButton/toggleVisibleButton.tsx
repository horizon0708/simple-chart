import * as React from "react";
import {observer} from "mobx-react";
import Store from "../../services/store";
import {container} from "../../constants/inversify.config";
import {ID3Base} from "../../models/models";

interface Props {
    selector: string;
    className?: string;
}

@observer
export default class ToggleVisibleButton extends React.Component<Props,{}>{
    constructor(props: Props){
        super(props);
        this.store = container.get<Store>(Store);
    }

    store: Store;

    getOption(): ID3Base{
        switch(this.props.selector){
            case("chart-svg"): {
                return this.store.chartData[0].graphOption;
            }
            case("legend-svg"): {
                return this.store.chartData[0].legendOption;
            }
            default:
                return this.store.chartData[0].graphOption;
        }
    }

    // ... there has to be a better way of doing this surely.
    handleToggleVisible = () => {
        let option = Object.create(this.getOption());
        option.visible = !this.getOption().visible;
        switch(this.props.selector){
            case("chart-svg"): {
                this.store.chartData[0].graphOption = option;
                break;
            }
            case("legend-svg"): {
                this.store.chartData[0].legendOption = option;
                break;
            }
            default:
                this.store.chartData[0].graphOption = option;
                break;
        }
    };

    render(){
        return (
            <i onClick={this.handleToggleVisible} className={`fa ${this.getOption().visible? "fa-eye": "fa-eye-slash"} ` + this.props.className} aria-hidden="true" />
        )
    }
}