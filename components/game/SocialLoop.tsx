import { useContext, useEffect } from 'react';
import { GameContext } from '../../store/GameContext';
import { NPC } from '../../models/index';
import { Alert } from 'react-native';
import { getRandomElement } from '../../utils/random';

export default function SocialLoop() {
    const context = useContext(GameContext);

    useEffect(() => {
        // 20% of being approached by someone
        if ([0].includes(Math.floor(Math.random() * 5))) {
            const npc = getRandomElement(NPCs);
            const npcFavor = getFavor(npc);
            const possibleInteractions = INTERACTIONS.filter(
                (i) => i.favor < npcFavor
            );
            const interaction: Interaction =
                getRandomElement(possibleInteractions);

            let health = context.health;
            health += interaction.effect.health;

            if (health < 0) health = 0;
            if (health > 100) health = 100;

            let happiness = context.happiness;
            happiness += interaction.effect.happiness;

            if (happiness < 0) happiness = 0;
            if (happiness > 100) happiness = 100;

            let smarts = context.smarts;
            smarts += interaction.effect.smarts;

            if (smarts < 0) smarts = 0;
            if (smarts > 100) smarts = 100;

            context.setHealth(health);
            context.setHappiness(happiness);
            context.setSmarts(smarts);
            context.setMoney(context.money + interaction.effect.money);

            Alert.alert(
                `${npc.name} ${interaction.name}`,
                '',
                interaction.options.map((option) => ({
                    text: option.desc,
                    onPress: () => {
                        if (option.deed == -1)
                            context.setBadDeeds([...context.badDeeds, npc.name]);
                        if (option.deed == 1) context.setGoodDeeds([...context.goodDeeds, npc.name]);

                        context.setIsPause(false);
                    },
                }))
            );
        }
    }, [context.days]);

    function getFavor(npc: NPC): number {
        // count number of bad deeds done by player to this NPC
        const badDeeds = context.badDeeds.filter((name) => name == npc.name);
        const goodDeeds = context.goodDeeds.filter((name) => name == npc.name);

        // bad deeds will weight more than good, each bad deed will have weight of 1.25 while good deed have weight of 0.75
        return (
            goodDeeds.length * GOOD_DEED_WEIGHT -
            badDeeds.length * BAD_DEED_WEIGHT
        );
    }

    return <></>;
}

interface Interaction {
    name: string;
    favor: number;
    effect: {
        health: number;
        happiness: number;
        smarts: number;
        money: number;
    };
    options: [
        {
            desc: string;
            deed: number; // -1 for bad 0 for neutral 1 for good
        },
    ];
}
const NPCs: NPC[] = [];
const DAY_IN_MONTH = 30;
const INTERACTIONS = new Array<Interaction>();

const GOOD_DEED_WEIGHT = 0.75;
const BAD_DEED_WEIGHT = 1.0;
