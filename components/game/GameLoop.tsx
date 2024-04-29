import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/GameContext';
import { NPC, NPCInteraction, Event, Effect } from '../../models/Types';
import { Alert, BackHandler } from 'react-native';
import { getRandomElement, getRandomInt } from '../../utils/random';
import { getData } from '../../services/DataService';
import {
    GAME_TEXT_CONSTANTS,
    PLAYER_CONSTANTS,
} from '../../constants/GameConstants';
import useInterval from '../../hooks/useInterval';

export default function GameLoop() {
    const [events, setEvents] = useState<Event[]>([]); // Initialize events as an empty array
    const context = useContext(GameContext);
    const [npcs, setNpcs] = useState(new Array<NPC>());
    const [interactions, setInteractions] = useState(
        new Array<NPCInteraction>()
    );

    useEffect(() => {
        fetch();
    }, []);

    useInterval(callback, PLAYER_CONSTANTS.DAY_INTERVAL, context.isPause, [
        context.days,
        context.health,
        context.smarts,
        context.happiness,
        context.money,
        context.isPause,
    ]);

    function callback() {
        let days = context.days;
        let dayInMonth = days % PLAYER_CONSTANTS.DAY_IN_MONTH;
        let health = context.health;
        let happiness = context.happiness;
        let smarts = context.smarts;
        let money = context.money;
        let isPause = context.isPause;

        if (days / PLAYER_CONSTANTS.DAY_IN_YEAR == 18) {
            money += PLAYER_CONSTANTS.MONEY_AT_18;
        }

        if (money == PLAYER_CONSTANTS.ZERO) {
            health -= PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (happiness == PLAYER_CONSTANTS.ZERO) {
            health -= PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (smarts == PLAYER_CONSTANTS.ZERO) {
            health -= PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (smarts == PLAYER_CONSTANTS.MAX_SMARTS) {
            health += PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (happiness == PLAYER_CONSTANTS.MAX_HAPPINESS) {
            health += PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (days % PLAYER_CONSTANTS.DAY_IN_YEAR == 0 && days != 0) {
            health += PLAYER_CONSTANTS.NEW_AGE_VALUE;
            happiness += PLAYER_CONSTANTS.NEW_AGE_VALUE;
            smarts += PLAYER_CONSTANTS.NEW_AGE_VALUE;
        }

        if (health > PLAYER_CONSTANTS.MAX_HEALTH) {
            health = PLAYER_CONSTANTS.MAX_HEALTH;
        }

        if (happiness > PLAYER_CONSTANTS.MAX_HAPPINESS) {
            happiness = PLAYER_CONSTANTS.MAX_HAPPINESS;
        }

        if (smarts > PLAYER_CONSTANTS.MAX_SMARTS) {
            smarts = PLAYER_CONSTANTS.MAX_SMARTS;
        }

        if (health <= PLAYER_CONSTANTS.ZERO) {
            isPause = true;
            resetGame();
            return;
        }

        if (happiness < PLAYER_CONSTANTS.ZERO) {
            happiness = PLAYER_CONSTANTS.ZERO;
        }

        if (smarts < PLAYER_CONSTANTS.ZERO) {
            smarts = PLAYER_CONSTANTS.ZERO;
        }

        // Events only occur after the age of 6
        if (days > 6 * PLAYER_CONSTANTS.DAY_IN_YEAR) {
            // Events may occur at the start of the month
            if (dayInMonth > PLAYER_CONSTANTS.DAY_IN_MONTH - 2) {
                // Each month a job will generate money
                for (const job of context.jobs) {
                    money += job.effect.money;
                    health += job.effect.health;
                    happiness += job.effect.happiness;
                    smarts += job.effect.smarts;
                }

                const validJobs = [];

                // force quit job if requirements are not met
                for (const job of context.jobs) {
                    if (
                        health < job.requirement.health ||
                        smarts < job.requirement.smarts
                    ) {
                        Alert.alert(
                            `You have to quit ${job.name} due to health issues'`
                        );

                        continue;
                    }
                    validJobs.push(job);
                }

                context.setJobs(validJobs);
                // generate a random integer from 0 to n -1
                // 20% for an event to happen
                if (
                    [0].includes(
                        getRandomInt({
                            min: 0,
                            max: PLAYER_CONSTANTS.MAX_EVENT_PERCENTAGE,
                        })
                    )
                ) {
                    isPause = true;
                    applyRandomEvent({ health, happiness, smarts, money });
                }
            }

            // prioritise Event over NPC interaction
            if (!isPause) {
                // Extracting this into a standalone function does not work
                // 10% of being approached by someone everyday
                if (
                    [0].includes(
                        getRandomInt({
                            min: 0,
                            max: PLAYER_CONSTANTS.MAX_INTERACTION_PERCENTAGE,
                        })
                    )
                ) {
                    isPause = true;
                    const npc: NPC = getRandomElement(npcs);
                    const npcFavor = getFavor(npc);
                    if (interactions.length < 1) return;

                    const possibleInteractions = interactions.filter(
                        (i) => i.favor < npcFavor
                    );
                    const interaction: NPCInteraction =
                        getRandomElement(possibleInteractions);

                    health += interaction.effect.health;

                    if (health < PLAYER_CONSTANTS.ZERO)
                        health = PLAYER_CONSTANTS.ZERO;
                    if (health > PLAYER_CONSTANTS.MAX_HEALTH)
                        health = PLAYER_CONSTANTS.MAX_HEALTH;

                    happiness += interaction.effect.happiness;

                    if (happiness < PLAYER_CONSTANTS.ZERO)
                        happiness = PLAYER_CONSTANTS.ZERO;
                    if (happiness > PLAYER_CONSTANTS.MAX_HAPPINESS)
                        happiness = PLAYER_CONSTANTS.MAX_HAPPINESS;

                    smarts += interaction.effect.smarts;

                    if (smarts < PLAYER_CONSTANTS.ZERO)
                        smarts = PLAYER_CONSTANTS.ZERO;
                    if (smarts > PLAYER_CONSTANTS.MAX_SMARTS)
                        smarts = PLAYER_CONSTANTS.MAX_SMARTS;

                    context.setHealth(health);
                    context.setHappiness(happiness);
                    context.setSmarts(smarts);
                    context.setMoney(money + interaction.effect.money);

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
            }
        }

        days += 1;

        context.setHealth(health);
        context.setMoney(money);
        context.setHappiness(happiness);
        context.setSmarts(smarts);
        context.setDays(days);
        context.setIsPause(isPause);
    }

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

    async function fetch() {
        try {
            setNpcs(await getData<NPC>('npc'));
            setInteractions(await getData<NPCInteraction>('npc interaction'));
            setEvents(await getData<Event>('event'));
        } catch (error) {
            Alert.alert(
                'We have trouble connecting to the server',
                'Please try later'
            );
        }
    }

    function applyRandomEvent({ health, smarts, money, happiness }: Effect) {
        const randIndex = Math.floor(Math.random() * events.length);
        const event: Event = events[randIndex];
        Alert.alert(
            event.name,
            event.desc,
            event.options.map((option) => ({
                text: option.desc,
                onPress: () => {
                    // Update player stats based on selected option
                    const newHealth = Math.max(
                        PLAYER_CONSTANTS.MIN_HEALTH,
                        Math.min(
                            PLAYER_CONSTANTS.MAX_HEALTH,
                            health + option.effect.health
                        )
                    );
                    const newMoney = Math.max(
                        PLAYER_CONSTANTS.MIN_MONEY,
                        money + option.effect.money
                    );
                    const newHappiness = Math.max(
                        PLAYER_CONSTANTS.MIN_HAPPINESS,
                        Math.min(
                            PLAYER_CONSTANTS.MAX_HAPPINESS,
                            happiness + option.effect.happiness
                        )
                    );
                    const newSmarts = Math.max(
                        PLAYER_CONSTANTS.MIN_SMARTS,
                        Math.min(
                            PLAYER_CONSTANTS.MAX_SMARTS,
                            smarts + option.effect.smarts
                        )
                    );

                    // Update player stats based on selected option
                    context.setHealth(newHealth);
                    context.setMoney(newMoney);
                    context.setHappiness(newHappiness);
                    context.setSmarts(newSmarts);
                    context.setIsPause(false);
                },
            }))
        );
    }

    function resetGame() {
        Alert.alert(
            GAME_TEXT_CONSTANTS.DIE_TITLE,
            GAME_TEXT_CONSTANTS.DIE_DESC,
            [
                {
                    text: GAME_TEXT_CONSTANTS.YES_TEXT,
                    onPress: () => {
                        context.setHealth(PLAYER_CONSTANTS.INITIAL_HEALTH);
                        context.setMoney(PLAYER_CONSTANTS.INITIAL_MONEY);
                        context.setHappiness(
                            PLAYER_CONSTANTS.INITIAL_HAPPINESS
                        );
                        context.setSmarts(PLAYER_CONSTANTS.INITIAL_SMARTS);
                        context.setDays(PLAYER_CONSTANTS.INITIAL_DAY);
                        context.setJobs([]);
                        context.setCoursesTaken([]);
                        context.setActivities([]);
                        context.setIsPause(false);
                        context.setBadDeeds([]);
                        context.setGoodDeeds([]);
                    },
                },
                {
                    text: GAME_TEXT_CONSTANTS.NO_TEXT,
                    onPress: () => {
                        BackHandler.exitApp();
                    },
                },
            ]
        );
    }
    return <></>;
}
