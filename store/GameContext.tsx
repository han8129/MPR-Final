import { createContext, useState, useRef, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { Event, Activity } from '../model/models';

export const GameContext = createContext({
    health: 100,
    money: 100000,
    happy: 100,
    events: Array<Event>,
    activities: Array<Activity>,
    days: 1,
    setHealth: (num: number) => {},
    setDays: (days: number) => {},
    monthCount: 0,
    setMonthCount: (num: number) => {},
    setMoney: (num: number) => {},
    setHappy: (num: number) => {},
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
    const [isLooping, setIsLooping] = useState(true);
    const callbackMemo = useRef(callBackHandler);

    function callBackHandler() {
        let currentDays = days;
        let currentMonthCount = monthCount;
        let currentHealth = health;

        if (money <= 0) {
            currentHealth -= MAX_HEALTH * 0.05;
        }

        setHealth(currentHealth);

        if (currentHealth <= 0) {
            setIsLooping(false);
            alert('You have died');
            return;
        }

        // a random number in range [0, 9]
        // 20% for event
        if (currentMonthCount > 29) {
            if ([0].includes(Math.floor(Math.random() * 3))) {
                setIsLooping(false);

                const randIndex = Math.floor(Math.random() * ALL_EVENTS.length);
                const event = ALL_EVENTS[randIndex];
                Alert.alert(`${event.name} happened`, 'What will you do?', [
                    {
                        text: 'A',
                        onPress: () => {
                            currentHealth += event.effect.health;
                            setHealth(currentHealth);
                            console.log('Pick A');
                            setIsLooping(true);
                        },
                    },
                    {
                        text: 'B',
                        onPress: () => {
                            setMoney((current) => current + event.effect.money);
                            setHappy((current) => current + event.effect.happy);
                            console.log('Pick B');
                            setIsLooping(true);
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

    useEffect(() => {
        callbackMemo.current = callBackHandler;
    }, [callBackHandler]);

    useEffect(() => {
        if (isLooping) {
            let loop = setInterval(() => {
                callbackMemo.current();
            }, INTERVAL);
            return () => clearInterval(loop);
        }
    }, [isLooping]);

    function changeMonthCount(num: number) {
        setMonthCount(num);
    }

    const context = {
        health: health,
        money: money,
        happy: happy,
        events: events,
        activities: activities,
        days: days,
        setHealth: setHealth,
        setDays: setDays,
        monthCount: monthCount,
        setMonthCount: changeMonthCount,
        setMoney: setMoney,
        setHappy: setHappy,
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
