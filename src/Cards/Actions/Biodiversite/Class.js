import { Action } from '../Action.js';
import Text from './Text.svelte';

export class Biodiversite extends Action {
    name = "Biodiversité";

    constructor(System) {
        super(System);

        this.init([["Or", 35], ["Végétal", 35]]);

        this.text = Text;
    };

    use = function () {
        if (this.owner == this.System.game.player || this.owner.zone("Terrain").cards.length > 0) {
            this.useEffect();
        }
    };

    useEffect = function () {
        let list = [];
        let terrain = this.System.copy(this.owner.zone("Terrain").cards);

        for (const card of terrain) {
            for (const famille of card.familles.base) {
                if (!list.includes(famille)) {
                    list.push(famille);
                }
            }
        }

        for (const card of terrain) {
            if (card.type == "Créature") {
                card.stat("Attaque").add += list.length * 5;
                card.stat("Vie").current += list.length * 5;
                card.stat("Vie").add += list.length * 5;
            }
        }

        this.move("Défausse");
        this.pose();
    };
}