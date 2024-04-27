import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/GameContext';
import { NPC, NPCInteraction } from '../../models/Types';
import { Alert } from 'react-native';
import { getRandomElement, getRandomInt } from '../../utils/random';
import { getData } from '../../services/DataService';
import {PLAYER_CONSTANTS} from '../../constants/GameContansts'

export default function SocialLoop() {
    const context = useContext(GameContext);
    const [npcs, setNpcs] = useState(new Array<NPC>());
    const [interactions, setInteractions] = useState(
        new Array<NPCInteraction>()
    );

    useEffect(() => {fetch()}, []);

    useEffect(() => {
        // Social Interactions May only happen after 6 yo
        if (context.days < PLAYER_CONSTANTS.DAY_IN_YEAR * 6) return;
        // 10% of being approached by someone everyday
        if ([0].includes(getRandomInt({ min: 0, max: 9 }))) {
            context.setIsPause(true);
            const npc: NPC = getRandomElement(npcs);
            const npcFavor = getFavor(npc);

            if (interactions.length < 1) return;

            const possibleInteractions = interactions.filter(
                (i) => i.favor < npcFavor
            );
            const interaction: NPCInteraction =
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
                interaction.response.map((option) => ({
                    text: option.desc,
                    onPress: () => {
                        if (option.deed == -1)
                            context.setBadDeeds([
                                ...context.badDeeds,
                                npc.name,
                            ]);
                        if (option.deed == 1)
                            context.setGoodDeeds([
                                ...context.goodDeeds,
                                npc.name,
                            ]);

                        context.setIsPause(false);
                    },
                }))
            );
        }
    }, [context.days, npcs, interactions]);

    function getFavor(npc: NPC): number {
        // count number of bad deeds done by player to this NPC
        const badDeeds = context.badDeeds.filter((name) => name == npc.name);
        const goodDeeds = context.goodDeeds.filter((name) => name == npc.name);

        // bad deeds will weight more than good, each bad deed will have weight of 1.25 while good deed have weight of 0.75
        return (
            goodDeeds.length * PLAYER_CONSTANTS.GOOD_DEED_WEIGHT -
            badDeeds.length * PLAYER_CONSTANTS.BAD_DEED_WEIGHT
        );
    }
        async function fetch(){
            try {
                setNpcs(await getData<NPC>('npc'));
                setInteractions(await getData<NPCInteraction>('npc interaction'));
            } catch(error) {
                Alert.alert('We have trouble connecting to the server', 'Please try later')
            }
        };

    return <></>;
}
