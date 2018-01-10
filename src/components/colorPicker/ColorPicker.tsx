import * as React from "react";
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import {observer} from "mobx-react";
import Store from "../../services/store";
import {container} from "../../constants/inversify.config";
import {ID3Base} from "../../models/models";
import ColorHelper from "../../services/colorHelper";

interface ColorPickerProps {
    modelOption?: string;

}

interface ColorPickerState {
    displayColorPicker: boolean;
    color: any;
}


@observer
export default class ColorPicker extends React.Component<ColorPickerProps, ColorPickerState> {
    constructor(props: ColorPickerProps){
        super(props);
        this.state = {
            displayColorPicker: false,
            color: {
                r: '241',
                g: '112',
                b: '19',
                a: '1',
            },
        };
        this.store = container.get<Store>(Store);
    }
    store:Store;

    componentDidMount(){
        if(this.props.modelOption){
            this.setState({color: ColorHelper.hexToRgb(this.store.chartData[0][this.props.modelOption].color[0])});
        } else {
            this.setState({color: this.store.canvasColor});
        }
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color: any) => {
        this.setState({ color: color.rgb });
        if(this.props.modelOption){
            let output = Object.create(this.store.chartData[0][this.props.modelOption]) as ID3Base;
            output.color[0] = ColorHelper.rgb2hex(color.rgb);
            this.store.chartData[0][this.props.modelOption] = output;
        } else {
            this.store.canvasColor = color.rgb;
        }
    };

    render(){
        const styles = reactCSS({
            'default': {
                color: {
                    width: '24px',
                    height: '24px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
                },
                swatch: {
                    padding: '6px',
                    background: '#fff',
                    borderRadius: '1px',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });


        return (
            <div>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={{position: 'absolute',
                    zIndex: 2}}>
                    <div style={{
                        position: 'fixed',
                        top: '0px',
                        right: '0px',
                        bottom: '0px',
                        left: '0px',
                    }} onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
                </div> : null }

            </div>
        )
    }
}