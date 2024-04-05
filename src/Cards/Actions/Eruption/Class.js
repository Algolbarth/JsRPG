import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Eruption extends Action {
    name = "Éruption";

    constructor(System) {
        super(System);

        this.init([["Or", 75], ["Feu", 75]]);

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
            if (this.owner.adversary().zone("Terrain").cards.length > 0) {
                this.useEffect(this.owner.adversary().zone("Terrain").cards[0]);
            }
        }
    };

    useEffect = function (target) {
        target.damage(300);
        this.move("Défausse");
        this.pose();
    };
}