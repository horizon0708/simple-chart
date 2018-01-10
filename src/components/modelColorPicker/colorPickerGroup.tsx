import * as React from "react";
import {KeyToColor, RGBA} from "../../models/models";
import ModelColorPicker from "./modelColorPicker";
import {observer} from "mobx-react";
import Store from "../../services/store";
import {container} from "../../constants/inversify.config";

interface colorPickerGroupProps {
    modelName: string;
    arraySize: number;
}

interface colorPickerGroupState {
    colors: RGBA[];
}

function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as string[];
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1
    }

}

function rgb2hex(rgb: RGBA){
    return "#"+ ("0" + rgb.r.toString(16)).slice(-2) +
        ("0" + rgb.g.toString(16)).slice(-2) +
        ("0" + rgb.b.toString(16)).slice(-2);
}

@observer
export default class ColorPickerGroup extends React.Component<colorPickerGroupProps, colorPickerGroupState> {
    constructor(props: colorPickerGroupProps){
        super(props);
        this.state = {
            colors: []
        };
        this.store = container.get<Store>(Store);
    }
    store: Store;

    componentDidMount(){
        let hexs = this.store.chartData[0][this.props.modelName].keyToColorMap
            .map((x:KeyToColor)=>hexToRgb(x.color));
        let output = hexs.slice(0,10-(this.props.arraySize));
        this.setState({colors: output});
    }

    changeColor = (index:number) => (color: any) => {
        let newColors = [...this.state.colors];
        let start = newColors.slice(0,index);
        let end = newColors.slice(index+1);
        let output = [...start, color.rgb, ...end];
        this.setState({colors: output}, ()=>{
            // console.log(output[0].r);
            const hexes = this.state.colors.map(x=>rgb2hex(x));
            console.log(hexes);
            this.store.setColor(this.props.modelName, hexes);
        });
    };


    renderColorPickers() {
        return this.state.colors.map((x,i)=>{
            return <ModelColorPicker color={x} onChange={this.changeColor(i)}/>
        });
    }

    render(){
        return(
            <div>
                {this.renderColorPickers()}
            </div>
        );
    }
}
