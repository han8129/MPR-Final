import { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Event, Job, Player } from '../models';
import useInterval from '../hooks/useInterval';
import { getEventData } from '../data';
import { savePlayerData } from '../services/PlayerService';

export const GameContext = createContext({
    health: 0,
    money: 0,
    happiness: 0,
    smarts: 0,
    events: [],
    activities: [],
    days: 0,
    jobs: [],
    coursesTaken: [],
    username: '',
    title: '',
    gender: '',
    setGender: (e: string) => {},
    setTitle: (e: string) => {},
    isTakeDailyLogin: false,
    setIsDailyLogin: (e: boolean) => {},
    setUsername: (e: string) => {},
    setJobs: (e: Job[]) => {},
    setCoursesTaken: (e: string[]) => {},
    setDays: (e: number) => {},
    setHealth: (e: number) => {},
    setMoney: (e: number) => {},
    setHappiness: (e: number) => {},
    setSmarts: (e: number) => {},
    setActivities: (e: string[]) => {},
    setEvents: (e: Event[]) => {},
    isPause: true, // login vao game thi false
    setIsPause: (e: boolean) => {},
});

interface Props {
    children: any;
}

export default function GameContextProvider({ children }: Props) {
    const [health, setHealth] = useState(100);
    const [money, setMoney] = useState(10);
    const [happiness, setHappiness] = useState(100);
    const [events, setEvents] = useState<Event[]>([]); // Initialize events as an empty array
    const [activities, setActivities] = useState<string[]>([]); // Initialize activities as an empty array
    const [smarts, setSmarts] = useState(10);
    const [days, setDays] = useState(0);
    const [monthCount, setMonthCount] = useState(0);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [username, setUsername] = useState<string>(''); // Initialize username as an empty string
    const [coursesTaken, setCoursesTaken] = useState<string[]>([]);
    const [isTakeDailyLogin, setIsTakeDailyLogin] = useState(false);
    const [title, setTitle] = useState(''); // Initialize title as an empty string
    const [gender, setGender] = useState('');

    const [isPause, setIsPause] = useState(true);

    const MAX_HEALTH = 100;
    const MAX_SMARTS = 100;
    const MAX_HAPPINESS = 100;
    const MIN_HEALTH = 0;
    const MIN_SMARTS = 0;
    const MIN_HAPPINESS = 0;
    const MIN_MONEY = 0;

    // change this to apply the day interval, 200 ml seconds = 1 day
    const INTERVAL = 20;

    useEffect(() => {
        // Fetch event data when the component mounts
        async function fetchEventData() {
            try {
                const eventData = await getEventData();
                setEvents(eventData); // Update events state with fetched data
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        }

        fetchEventData(); // Call the fetchEventData function
    }, []); // llogin vao game thi false

    useInterval(callback, INTERVAL, isPause, [
        days,
        monthCount,
        health,
        happiness,
        money,
        smarts,
    ]);

    function callback() {
        let currentDays = days;
        let currentMonthCount = monthCount;
        let currentHealth = health;
        let currentHappiness = happiness;
        let currentMoney = money;
        let currentSmarts = smarts;

        if (days / 360 == 18) {
            currentMoney += 10000;
        }

        if (money == 0) {
            currentHealth -= Number((MAX_HEALTH * 0.005).toFixed(2));
        }

        if (happiness == 0) {
            currentHealth -= Number((MAX_HEALTH * 0.005).toFixed(2));
        }

        if (smarts == 0) {
            currentHealth -= Number((MAX_HEALTH * 0.005).toFixed(2));
        }

        if (smarts == 100) {
            currentHealth += Number((MAX_HEALTH * 0.005).toFixed(2));
        }

        if (happiness == 100) {
            currentHealth += Number((MAX_HEALTH * 0.005).toFixed(2));
        }

        if (days % 360 == 0 && days != 0) {
            currentHealth += 5;
            currentHappiness += 5;
            currentSmarts += 5;
        }

        if (currentHealth > 100) {
            currentHealth = 100;
        }

        if (currentHappiness > 100) {
            currentHappiness = 100;
        }

        if (currentSmarts > 100) {
            currentSmarts = 100;
        }

        if (currentHealth < 0) {
            currentHealth = 0;
        }

        if (currentHappiness < 0) {
            currentHappiness = 0;
        }

        if (currentSmarts < 0) {
            currentSmarts = 0;
        }

        setHealth(currentHealth);
        setMoney(currentMoney);
        setHappiness(currentHappiness);
        setSmarts(currentSmarts);

        if (currentHealth <= 0) {
            setIsPause(true);
            setHealth(0);
            Alert.alert('You have died', 'Play again?', [
                {
                    text: 'Yes',
                    onPress: () => {
                        setHealth(100);
                        setMoney(10);
                        setHappiness(100);
                        setSmarts(10);
                        setDays(0);
                        setJobs([]);
                        setCoursesTaken([]);
                        setActivities([]);
                        setIsPause(false);
                    },
                },
                {
                    text: 'No',
                    onPress: () => {
                        setIsPause(true);
                    },
                },
            ]);
            return;
        }

        // a random number in range [0, 9]
        // 20% for event
        // each month checks if player is doing some jobs, then aplly the effect of that job to player stats
        if (currentMonthCount > 29 && currentDays > 6 * 360) {
            if ([0].includes(Math.floor(Math.random() * 10))) {
                setIsPause(true);

                const randIndex = Math.floor(Math.random() * events.length);
                const event = events[randIndex];
                Alert.alert(
                    `${event.name}`,
                    event.desc,
                    event.options.map((option) => ({
                        text: option.desc,
                        onPress: () => {
                            // Update player stats based on selected option
                            const newHealth = Math.max(
                                MIN_HEALTH,
                                Math.min(
                                    MAX_HEALTH,
                                    health + option.effect.health
                                )
                            );
                            const newMoney = Math.max(
                                MIN_MONEY,
                                money + option.effect.money
                            );
                            const newHappiness = Math.max(
                                MIN_HAPPINESS,
                                Math.min(
                                    MAX_HAPPINESS,
                                    happiness + option.effect.happiness
                                )
                            );
                            const newSmarts = Math.max(
                                MIN_SMARTS,
                                Math.min(
                                    MAX_SMARTS,
                                    smarts + option.effect.smarts
                                )
                            );

                            // Update player stats based on selected option
                            setHealth(newHealth);
                            setMoney(newMoney);
                            setHappiness(newHappiness);
                            setSmarts(newSmarts);
                            setIsPause(false);
                        },
                    }))
                );
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
        happiness: happiness,
        events: events,
        activities: activities,
        smarts: smarts,
        days: days,
        jobs: jobs,
        coursesTaken: coursesTaken,
        username: username,
        isTakeDailyLogin: isTakeDailyLogin,
        title: title,
        gender: gender,
        setGender: setGender,
        setTitle: setTitle,
        setIsDailyLogin: setIsTakeDailyLogin,
        setUsername: setUsername,
        setDays: setDays,
        setJobs: setJobs,
        setCoursesTaken: setCoursesTaken,
        setHealth: setHealth,
        setMoney: setMoney,
        setHappiness: setHappiness,
        setSmarts: setSmarts,
        setActivities: setActivities,
        setEvents: setEvents,
        isPause: isPause,
        setIsPause: setIsPause,
    };

    return (
        <GameContext.Provider value={context}>{children}</GameContext.Provider>
    );
}
