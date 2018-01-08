import {FontWeight, ID3Text, Sort, TextAnchor} from "./models";
import {ScaleOrdinal} from "d3-scale";
import {observable} from "mobx";

export default class TitleModel implements ID3Text{
    @observable title: string = "default title";
    @observable fontSize: number = 14;
    @observable fontWeight: FontWeight | number = FontWeight.bolder;
@observable lineSpacing: number = 1;
@observable svgSelector: string;
@observable draggable: boolean = true;
@observable visible: boolean = true;
@observable sort: Sort;
    xOffset: number;
    yOffset: number;
@observable xTranslate: number = 250;
@observable yTranslate: number = 250;
@observable color: ScaleOrdinal<string, string>;
    @observable textAnchor: TextAnchor = TextAnchor.start;

    constructor(selector: string){
        this.svgSelector = selector;
    }
}