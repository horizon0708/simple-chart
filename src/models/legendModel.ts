import { scaleOrdinal, schemeCategory10, select, Selection, BaseType } from 'd3';
import {FontWeight, ID3Text, Sort, TextAnchor} from "./models";

export default class LegendModel implements ID3Text{
    public svgSelector: string;

    public fontSize: number = 14;
    public textAnchor: TextAnchor = TextAnchor.start;
    public fontWeight: FontWeight | number = FontWeight.normal;
    public lineSpacing: number = 1.2;
    public sort: Sort = Sort.ascending;
    //
    public xOffset: number = 0;
    public yOffset: number = 0;
    public xTranslate: number = 0;
    public yTranslate: number = 0;
    public color: d3.ScaleOrdinal<string, string> = scaleOrdinal(
        schemeCategory10
    );

    constructor(svgSelector: string) {
        this.svgSelector = svgSelector;
    }

    public getSelection(): Selection<BaseType, {}, BaseType, any> {
        return select<SVGElement, {}>(this.svgSelector);
    }

    public getY(
        d: any,
        i: number,
        node: BaseType[] | ArrayLike<BaseType>
    ): number {
        return (
            0 -
            node.length / 3 * this.getYPadding() +
            i * this.getYPadding() +
            this.yOffset
        );
    }

    public getX(): number {
        return this.xOffset;
    }

    public getYPadding(): number {
        return this.fontSize * this.lineSpacing;
    }
}