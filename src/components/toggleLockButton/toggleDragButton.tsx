import * as React from "react";
import Store from "../../services/store";
import {observer} from "mobx-react";
import {container} from "../../constants/inversify.config";
import * as d3 from "d3";
import {ID3Base} from "../../models/models";

interface Props {
    selector: string;
    className?: string;
}

@observer
export default class ToggleDragButton extends React.Component<Props,{enableDrag: boolean}>{
    constructor(props: Props){
        super(props);
        this.store = container.get<Store>(Store);
        this.state = {
            enableDrag: true
        };
    }
    componentDidMount(){
        //this.attachDrag(this.props.selector, this.getOption());
    }
    store: Store;

    getOption(){
        console.log("selector: "+this.props.selector);
        switch(this.props.selector){
            case("chart-svg"): {
                console.log("switched: chart");
                return this.store.chartData[0].graphOption;
            }
            case("svg-legend"): {
                console.log("switched: legend");
                return this.store.chartData[0].legendOption;
            }
            default:
                console.log("default");
                return this.store.chartData[0].graphOption;
        }
    }

    handleToggleDrag = () => {
        this.setState({enableDrag: !this.state.enableDrag});
    };

    attachDrag(selector:string, model:ID3Base){
        console.log("attaching drag");
        d3.select(`#${selector}`).call(
            d3.drag()
                .on("drag", ()=>this.onDragged(selector, model))
                .on("start", ()=>this.onDragStart(selector))
                .on("end",()=>this.onDragEnd(selector))
        );
    }

    onDragStart = (selector: string) => {
        if(!this.state.enableDrag) return;
        d3.select(`#${selector}`)
            .attr("stroke-linejoin", "round").attr("stroke-dasharray", "12,12");
    };

    onDragged = (selector:string, model: ID3Base) => {
        if(!this.state.enableDrag) return;
        //const container = document.getElementById("chart-canvas") as HTMLElement;
        // model.xTranslate = d3.mouse(container)[0];
        // model.yTranslate = d3.mouse(container)[1];
        model.xTranslate += d3.event.dx;
        model.yTranslate += d3.event.dy;
        d3.select(`#${selector}`)
            .attr("transform",`translate(${[model.xTranslate,model.yTranslate]}
        )`)

    };

    onDragEnd = (selector:string) => {
        if(!this.state.enableDrag) return;
        d3.select(`#${selector}`)
        .attr("stroke-linecap","round")
        .attr("stroke-linejoin", "round").attr("stroke-dasharray", "0");
    };

    render(){
        return (
            <i onClick={this.handleToggleDrag} className={`fa ${this.state.enableDrag? "fa-unlock": "fa-lock"} `+this.props.className} aria-hidden="true" />
        )
    }
}