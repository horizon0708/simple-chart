import {
  scaleOrdinal,
  schemeCategory10,
  select,
  Selection,
  BaseType
} from "d3";
import { FontWeight, ID3Text, Sort, TextAnchor } from "./models";
import {observable} from "mobx";

export default class LegendModel implements ID3Text {
    @observable draggable: boolean = true;
    @observable visible: boolean = true;
  public svgSelector: string;

  @observable fontSize: number = 14;
    @observable textAnchor: TextAnchor = TextAnchor.start;
    @observable fontWeight: FontWeight | number = FontWeight.normal;
    @observable lineSpacing: number = 1.2;
  public sort: Sort = Sort.ascending;
  //
  public xOffset: number = 0;
  public yOffset: number = 0;
  @observable xTranslate: number = 250;
  @observable yTranslate: number = 250;
  public color: d3.ScaleOrdinal<string, string> = scaleOrdinal(
    schemeCategory10
  );

  constructor(svgSelector: string) {
    this.svgSelector = svgSelector;
  }

  public getSelection(): Selection<BaseType, {}, BaseType, any> {
    return select<SVGElement, {}>(`#${this.svgSelector}`);
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
