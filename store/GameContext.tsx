import { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { Event, Activity } from '../model/models';
import useInterval from '../hooks/useInterval';

export const GameContext = createContext({
    health: 100,
    money: 100000,
    happy: 100,
    events: Array<Event>,
    activities: Array<Activity>,
    days: 1,
    setEvents: (e: Object) => {},
});

export default function GameContextProvider({ children }) {
    const [health, setHealth] = useState(100);
    const [money, setMoney] = useState(10000);
    const [happy, setHappy] = useState(100);
    const [events, setEvents] = useState(new Array<Object>());
    const [activities, setActivities] = useState(new Array<Object>());
    const [days, setDays] = useState(100);
    const [monthCount, setMonthCount] = useState(0);
    const [isPause, setIsPause] = useState(false);

    useInterval(callback, INTERVAL, isPause, [
        days,
        monthCount,
        health,
        happy,
        money,
    ]);

    function callback() {
        let currentDays = days;
        let currentMonthCount = monthCount;
        let currentHealth = health;

        if (money <= 0) {
            currentHealth -= MAX_HEALTH * 0.05;
        }

        setHealth(currentHealth);

        if (currentHealth <= 0) {
            setIsPause(true);
            alert('You have died');
            return;
        }

        // a random number in range [0, 9]
        // 20% for event
        if (currentMonthCount > 29) {
            if ([0].includes(Math.floor(Math.random() * 2))) {
                setIsPause(true);

                const randIndex = Math.floor(Math.random() * ALL_EVENTS.length);
                const event = ALL_EVENTS[randIndex];
                Alert.alert(`${event.name} happened`, 'What will you do?', [
                    {
                        text: 'A',
                        onPress: () => {
                            currentHealth += event.effect.health;
                            setHealth(currentHealth);
                            console.log('Pick A');
                            setIsPause(false);
                        },
                    },
                    {
                        text: 'B',
                        onPress: () => {
                            setMoney((current) => current + event.effect.money);
                            setHappy((current) => current + event.effect.happy);
                            console.log('Pick B');
                            setIsPause(false);
                        },
                    },
                ]);
            }

            setMonthCount(0);
            currentDays += 1;
            currentMonthCount += 1;
            setDays(currentDays);
            return;
        }

        currentDays += 1;
        currentMonthCount += 1;
        setDays(currentDays);
        setMonthCount(currentMonthCount);
    }

    const context = {
        health: health,
        money: money,
        happy: happy,
        events: events,
        activities: activities,
        days: days,
        setEvents: setEvents,
    };

    return (
        <GameContext.Provider value={context}>{children}</GameContext.Provider>
    );
}

const MAX_HEALTH = 100;
const ALL_EVENTS: Event[] = [
    {
        name: 'Depression',
        effect: {
            health: -10,
            money: -5,
            happy: -15,
        },
        startDate: 0,
        duration: 1,
    },
    {
        name: 'Getting Fired',
        effect: {
            health: -2,
            money: -100,
            happy: -15,
        },
        startDate: 0,
        duration: 60,
    },
];
const INTERVAL = 200;
