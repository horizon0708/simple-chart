import {RGBA} from "../models/models";

export default class ColorHelper {
    static hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) as string[];
        return {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: 1
        }

    }

    static rgb2hex(rgb: RGBA){
        return "#"+ ("0" + rgb.r.toString(16)).slice(-2) +
            ("0" + rgb.g.toString(16)).slice(-2) +
            ("0" + rgb.b.toString(16)).slice(-2);
    }

    //https://stackoverflow.com/questions/1484506/random-color-generator
    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

}