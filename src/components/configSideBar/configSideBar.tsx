import * as React from "react";
import {observer} from "mobx-react";
import Store from "../../services/store";
import {container} from "../../constants/inversify.config";
import CollapsableControlBox from "../collapsableControlBox/collapsableControlBox";
import CollapsableBox from "../collapsableBox/collapsableBox";
import PieControl from "../../pages/pieControl/pieControl";
import LegendControl from "../../pages/legendControl/legendControl";
import TitleControl from "../../pages/titleControl/titleControl";
import CanvasControl from "../../pages/canvasControl/canvasControl";

@observer
export default class ConfigSideBar extends React.Component{
    constructor(props: {}){
        super(props);
        this.store = container.get<Store>(Store);
    }
    store: Store;

    render(){
        return(
          <div>
              <CollapsableBox header={"Canvas"}><CanvasControl /></CollapsableBox>
              <CollapsableControlBox model={this.store.chartData[0].graphOption} header={"Chart"}><PieControl /></CollapsableControlBox>
              <CollapsableControlBox model={this.store.chartData[0].titleOption} header={"Title"}><TitleControl /></CollapsableControlBox>
              <CollapsableControlBox model={this.store.chartData[0].legendOption} header={"Legend"}><LegendControl /></CollapsableControlBox>
          </div>
        );
    }
}