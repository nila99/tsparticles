import type {Container} from "../Container";
import {ColorUtils} from "../Utils/ColorUtils";
import {Utils} from "../Utils/Utils";
import {ICoordinates} from "../../Interfaces/ICoordinates";
import {Constants} from "../Utils/Constants";
import type {IParticle} from "../../Interfaces/IParticle";

export class Linker {
    public static link(p1: IParticle, p2: IParticle, container: Container): void {
        const options = container.options;
        const pos1: ICoordinates = {
            x: p1.position.x + p1.offset.x,
            y: p1.position.y + p1.offset.y,
        };
        const pos2: ICoordinates = {
            x: p2.position.x + p2.offset.x,
            y: p2.position.y + p2.offset.y,
        };
        const dist = Utils.getDistanceBetweenCoordinates(pos1, pos2);
        const optOpacity = options.particles.lineLinked.opacity;
        const optDistance = container.retina.lineLinkedDistance;

        /* draw a line between p1 and p2 if the distance between them is under the config distance */
        if (dist <= optDistance) {
            const opacityLine = optOpacity - (dist * optOpacity) / optDistance;

            if (opacityLine > 0) {
                /* style */
                if (!container.particles.lineLinkedColor) {
                    const color = options.particles.lineLinked.color;

                    /* particles.line_linked - convert hex colors to rgb */
                    //  check for the color profile requested and
                    //  then return appropriate value

                    if (color === Constants.randomColorValue) {
                        if (options.particles.lineLinked.consent) {
                            container.particles.lineLinkedColor = ColorUtils.stringToRgb(color);
                        } else if (options.particles.lineLinked.blink) {
                            container.particles.lineLinkedColor = Constants.randomColorValue;
                        } else {
                            container.particles.lineLinkedColor = "mid";
                        }
                    } else {
                        container.particles.lineLinkedColor = typeof color === "string" ?
                            ColorUtils.stringToRgb(color) :
                            ColorUtils.colorToRgb(color);
                    }
                }

                container.canvas.drawLinkedLine(p1, p2, pos1, pos2, opacityLine);
            }
        }
    }
}
