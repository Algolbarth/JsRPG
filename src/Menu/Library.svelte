<script>
    import Filter from "./Filter.svelte";
    import Dropdown from "./Dropdown.svelte";
    import View from "../View/Main.svelte";
    export let System;

    let filterWindow = false;
    let sortType = "Nom";

    let levelSelect = "Tous";
    let typeSelect = "Tous";
    let familleSelect = "Toutes";
    let elementSelect = "Tous";

    let cardList = [];
    filter();

    function filter() {
        let tab = [];

        for (const card of System.cards.instance) {
            if (
                !card.trait("Rare").value() &&
                (levelSelect == "Tous" || card.level == levelSelect) &&
                (typeSelect == "Tous" || card.type == typeSelect) &&
                (familleSelect == "Toutes" ||
                    card.familles.base.includes(familleSelect)) &&
                (elementSelect == "Tous" ||
                    card.elements.includes(elementSelect))
            ) {
                tab.push(card);
            }
        }

        tab = sort(tab);

        cardList = tab;
    }

    function sort(tab) {
        if (sortType == "Niveau") {
            for (let i = 0; i < tab.length; i++) {
                let j = i;
                while (j > 0 && tab[j].level < tab[j - 1].level) {
                    let swap = tab[j];
                    tab[j] = tab[j - 1];
                    tab[j - 1] = swap;
                    j--;
                }
            }
        }
        return tab;
    }

    function sorting(level, type, famille, element) {
        levelSelect = level;
        typeSelect = type;
        familleSelect = famille;
        elementSelect = element;
        filter();
        close();
    }

    function close() {
        filterWindow = false;
        System.pages.change("Library");
    }
</script>

<button
    class="close"
    on:click={() => {
        System.view.reset();
        System.pages.change("Menu");
    }}>X</button
>
<div id="zone">
    <div style="display:flex;margin-bottom:2%;">
        <div style="transform:translate(0,25%);margin-right:1%;">
            {System.several(cardList.length, "carte")}
            -
            <button
                on:click={() => {
                    filterWindow = true;
                    System.pages.change("Library");
                }}
            >
                Filtrer
            </button>
            - Trier par
        </div>
        <svelte:component
            this={Dropdown}
            array={["Nom", "Niveau"]}
            selected={sortType}
            selecting={function (element) {
                sortType = element;
                filter();
            }}
        />
    </div>
    <div id="list" class="scroll">
        {#each cardList as card}
            <div class="preview">
                <button
                    class="classic"
                    on:click={() => {
                        System.view.card = card;
                        System.pages.change("Library");
                    }}
                    on:mouseenter={() => {
                        System.view.quick = card;
                        System.pages.change("Library");
                    }}
                    on:mouseleave={() => {
                        System.view.quick = undefined;
                        System.pages.change("Library");
                    }}
                >
                    {card.name}</button
                >
            </div>
        {/each}
    </div>
</div>

<div id="view">
    <svelte:component this={View} {System} />
</div>

{#if filterWindow}
    <svelte:component
        this={Filter}
        {System}
        {levelSelect}
        {typeSelect}
        {familleSelect}
        {elementSelect}
        {sorting}
        {close}
    />
{/if}

<style>
    #zone {
        background-color: var(--zone);
        border: solid;
        margin: 1vh;
        padding: 1vh;
        width: 50vw;
        max-height: 85vh;
    }

    #list {
        max-height: 80vh;
    }

    #view {
        position: fixed;
        top: 0%;
        left: 54vw;
    }
</style>
