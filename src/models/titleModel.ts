import {FontWeight, ID3Text, Sort, TextAnchor} from "./models";
import {observable} from "mobx";

export default class TitleModel implements ID3Text{
    @observable title: string = "Why I die in a game of PUBG";
    @observable fontSize: number = 36;
    @observable fontWeight: FontWeight | number = FontWeight.bolder;
    @observable lineSpacing: number = 1;
    @observable svgSelector: string;
    @observable draggable: boolean = true;
    @observable visible: boolean = true;
    @observable sort: Sort;
        xOffset: number;
        yOffset: number;
    @observable xTranslate: number = 400;
    @observable yTranslate: number = 70;
    @observable color: string[] = ["#414548"];
        @observable textAnchor: TextAnchor = TextAnchor.middle;

    constructor(selector: string){
        this.svgSelector = selector;
    }
}