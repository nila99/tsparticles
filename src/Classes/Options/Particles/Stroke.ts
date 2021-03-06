import type {IStroke} from "../../../Interfaces/Options/Particles/IStroke";
import type {RecursivePartial} from "../../../Types/RecursivePartial";
import type {IColor} from "../../../Interfaces/Options/Particles/IColor";
import {Color} from "./Color";

export class Stroke implements IStroke {
    public color: IColor;
    public width: number;
    public opacity: number;

    constructor() {
        this.color = new Color();
        this.width = 0;
        this.opacity = 1;

        this.color.value = "#ff0000";
    }

    public load(data?: RecursivePartial<IStroke>): void {
        if (data !== undefined) {
            this.color.load(typeof data.color === "string" ? {value: data.color} : data.color);

            if (data.width !== undefined) {
                this.width = data.width;
            }
        }
    }
}
