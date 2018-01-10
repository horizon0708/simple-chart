import * as React from "react";
import GenericNumericalInput from "../../components/genericNumericalInput/genericNumericalInput";
import GenericInput from "../../components/genericInput/genericInput";
import ColorPicker from "../../components/colorPicker/ColorPicker";

interface titleControlProps {

}

interface titleControlState {

}

export default class TitleControl extends React.Component<titleControlProps, titleControlState> {
    constructor(props: titleControlProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={`grid-wrapper`} >
                    <GenericNumericalInput parameter={"xTranslate"} modelName={"titleOption"} label={"x"}/>
                    <GenericNumericalInput parameter={"yTranslate"} modelName={"titleOption"} label={"y"}/>
                    <GenericNumericalInput parameter={"fontSize"} modelName={"titleOption"} label={"size"}/>
                </div>
                <GenericInput parameter={"title"} modelName={"titleOption"}>
                    <ColorPicker modelOption={"titleOption"}/>
                </GenericInput>
            </div>

        );
    }
}