import {ChartDatum} from "../models/models";

export class SortHelper {

    static getYUniques(data:ChartDatum[]): string[] {
        let raw = data.map(x => x.y);
        return raw.filter((x, i, ar) => ar.indexOf(x) === i);
    }

    static getUniqueKeys(data: ChartDatum[]): string[] {
        let raw = data.map(item => item.key);
        return raw.filter((x,i,ar)=>ar.indexOf(x) === i);
    }


    static getYCount(data:ChartDatum[]): {key:string, value:number}[] {
        const uniques = SortHelper.getYUniques(data);
        let dict = uniques.map(x=> {return {key: x, value: 0}});
        data.forEach(item=>{
            dict[item.y]++;
        });
        return dict.sort((a,b)=>b.value-a.value);
    }

    static getHighest(data:ChartDatum[]): ChartDatum[]{
        const highest = SortHelper.getYCount(data)[0];
        return data.filter(x=>x.y === highest.key);
    }

    static sortAscending(data:ChartDatum[]): ChartDatum[]{
        return data.sort((a,b)=>a.value-b.value);
    }
}