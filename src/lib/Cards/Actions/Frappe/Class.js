import { Action } from '../Action.js';
import Text from './Text.svelte';
import Use from './Use.svelte';

export class Frappe extends Action {
    name = "Frappe";

    constructor(System) {
        super(System);

        this.init([["Or", 25]]);

        this.text = Text;
    };

    select = function () {
        let check = false;

        for (const card of this.owner.zone("Terrain").cards) {
            if (!check && card.type == "Créature") {
                check = true;
            }
        }

        if (check) {
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
        }
    };

    useEffect = function (target) {
        let value = 0;

        for (const card of this.owner.zone("Terrain").cards) {
            if (card.type == "Créature" && value < card.stat("Attaque").value()) {
                value = card.stat("Attaque").value();
            }
        }

        target.damage(value);

        this.move("Défausse");
        this.pose();
    };
}