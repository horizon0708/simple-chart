import * as React from "react";
import {observer} from "mobx-react";
import Store from "../../services/store";
import {container} from "../../constants/inversify.config";
import * as style from './moreGenericNumberInput.css';

interface genericNumericalInputProps {
    label?: string;
    parameter: string;
    upperLimit?: number;
    lowerLimit?: number;
}

interface genericNumericalInputState {

}
@observer
export default class MoreGenericNumberInput extends React.Component<genericNumericalInputProps, genericNumericalInputState> {
    constructor(props: genericNumericalInputProps){
        super(props);
        this.store = container.get<Store>(Store);
    }
    public store:Store;

    handleNumericalInput = (event: React.FormEvent<HTMLInputElement>) => {
        let target = event.target as HTMLInputElement;
        if(isNaN(+target.value)) return;
        if(+target.value > (this.props.upperLimit || 1200)){
            this.store[this.props.parameter] = this.props.upperLimit || 1200;
        } else if(+target.value < (this.props.lowerLimit || 0)){
            this.store[this.props.parameter] = this.props.lowerLimit || 0;
        } else {
            this.store[this.props.parameter] = +target.value;
        }
    };

    render(){
        return(
            <div className={`field ${style.container}`}>
                <label className={style.customLabel}>
                    {this.props.label || this.props.parameter}
                </label>
                <div className="control">
                    <input
                        value={this.store[this.props.parameter]}
                        onChange={this.handleNumericalInput}
                        className="customInput"
                        style={{margin: 0, border: "none"}}
                        type="text"
                        placeholder="Text input"
                    />
                </div>
            </div>
        );
    }
}