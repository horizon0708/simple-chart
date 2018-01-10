import * as React from "react";
import {container} from "../../constants/inversify.config";
import reactCSS from "reactcss";
import Store from "../../services/store";
import SketchPicker from "react-color/lib/components/sketch/Sketch";

interface modelColorPickerProps {
    color: any;
    onChange: (color:any) => void;
}

interface modelColorPickerState {
    displayColorPicker: boolean;
}

export default class ModelColorPicker extends React.Component<modelColorPickerProps, modelColorPickerState> {
    constructor(props: modelColorPickerProps){
        super(props);
        this.state = {
            displayColorPicker: false,
        };
        this.store = container.get<Store>(Store);
    }
    store:Store;

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    render(){
        const styles = reactCSS({
            'default': {
                color: {
                    width: '24px',
                    height: '24px',
                    borderRadius: '2px',
                    background: `rgba(${ this.props.color.r }, ${ this.props.color.g }, ${ this.props.color.b }, ${ this.props.color.a })`,
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
                    <SketchPicker color={ this.props.color } onChange={this.props.onChange} />
                </div> : null }

            </div>
        )
    }
}