import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class BriseGarde extends Action {
    name = "Brise garde";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    use = function () {
        this.select();
    };

    select = function () {
        if (this.owner == this.System.game.player) {
            this.System.game.use.set(this, Use);
            this.System.pages.change("Game");
        }
        else {
            let target = undefined;

            for (const card of this.owner.adversary().zone("Terrain").cards) {
                if (target == undefined) {
                    target = card;
                }
            }

            if (target != undefined) {
                this.useEffect(target);
            }
        }
    };

    useEffect = function (target) {
        target.stat("Garde").current = 0;
        target.stat("Garde").step = 0;
        target.stat("Garde").turn = 0;
        this.move("Défausse");
        this.pose();
    };
}