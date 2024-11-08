import { Objet } from '../Objet.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Bombe extends Objet {
    name = "Bombe";

    constructor(System) {
        super(System);

        this.init([["Or", 15]]);

        this.text = Text;
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
        target.damage(30);
        this.move("Défausse");
        this.pose();
    };
}