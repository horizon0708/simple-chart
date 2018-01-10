import * as React from "react";
import MoreGenericNumberInput from "../../components/moreGenericNumberInput/moreGenericNumberInput";
import ColorPicker from "../../components/colorPicker/ColorPicker";

interface canvasControlProps {

}

interface canvasControlState {

}

export default class CanvasControl extends React.Component<canvasControlProps, canvasControlState> {
    constructor(props: canvasControlProps){
        super(props);
    }



    render(){
        return(
            <div className={`grid-wrapper`}>
                <MoreGenericNumberInput parameter={"canvasWidth"} label={"width"}/>
                <MoreGenericNumberInput parameter={"canvasHeight"} label={"height"}/>
                <div style={{ paddingBottom:"6px", display: "flex", flexDirection: "column", justifyContent:"flex-end"}}>
                <ColorPicker/>
                </div>
            </div>
        );
    }
}