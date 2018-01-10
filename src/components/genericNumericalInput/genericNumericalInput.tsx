import * as React from "react";
import {observer} from "mobx-react";
import Store from "../../services/store";
import {container} from "../../constants/inversify.config";
import * as style from './genericNumericalInput.css';

interface genericNumericalInputProps {
    label?: string;
    parameter: string;
    modelName: string;
}

interface genericNumericalInputState {

}
@observer
export default class GenericNumericalInput extends React.Component<genericNumericalInputProps, genericNumericalInputState> {
    constructor(props: genericNumericalInputProps){
        super(props);
        this.store = container.get<Store>(Store);
    }
    public store:Store;

    handleNumericalInput = (name: string) => (event: React.FormEvent<HTMLInputElement>) => {
        let target = event.target as HTMLInputElement;
        if(isNaN(+target.value)) return;
        let newGO = Object.create(this.store.chartData[0][this.props.modelName]);
        newGO[name] = +target.value; //+ necessary because i lost type-safety!!!
        this.store.chartData[0][this.props.modelName] = newGO;
    };

    render(){
        return(
            <div className={`field ${style.container}`}>
                <label className={style.customLabel}>
                    {this.props.label || this.props.parameter}
                </label>
                <div className="control">
                    <input
                        value={this.store.chartData[0][this.props.modelName][this.props.parameter]}
                        onChange={this.handleNumericalInput(this.props.parameter)}
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