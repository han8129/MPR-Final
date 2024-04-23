import { createContext, useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { Event, Job } from '../models';
import useInterval from '../hooks/useInterval';
import { getEventData } from '../data';

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
    const [jobs, setJobs] = useState<Job[]>([]);
    const [username, setUsername] = useState<string>(''); // Initialize username as an empty string
    const [coursesTaken, setCoursesTaken] = useState<string[]>([]);
    const [isTakeDailyLogin, setIsTakeDailyLogin] = useState(false);
    const [title, setTitle] = useState(''); // Initialize title as an empty string
    const [gender, setGender] = useState('');

    const [isPause, setIsPause] = useState(true);

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
        health,
        happiness,
        money,
        smarts,
    ]);

    function callback() {
        let currentDays = days;
        let currentDayInMonth = currentDays % DAY_IN_MONTH;
        let currentHealth = health;
        let currentHappiness = happiness;
        let currentSmarts = smarts;
        let currentMoney = money;

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

        if (currentHealth <= 0) {
            resetGame();
            return;
        }

        if (currentHappiness < 0) {
            currentHappiness = 0;
        }

        if (currentSmarts < 0) {
            currentSmarts = 0;
        }

        // Events only occur after the age of 6
        if (currentDays > 12 * DAY_IN_MONTH) {
            // Events may occur at the start of the month
            if (currentDayInMonth > 28) {
                // Each month a job will generate money
                const total = jobs
                    .map((job) => job.effect.money)
                    .reduce((sum, curr) => sum + curr, 0);

                currentMoney += total;
                // generate a random integer from 0 to n -1
                if (
                    [0].includes(Math.floor(Math.random() * 2)) &&
                    days > 6 * 360
                ) {
                    setIsPause(true);
                    applyRandomEvent();
                }
            }
        }

        currentDays += 1;

        setHealth(currentHealth);
        setMoney(currentMoney);
        setHappiness(currentHappiness);
        setSmarts(currentSmarts);
        setDays(currentDays);
    }

    function resetGame() {
        setIsPause(true);
        setHealth(0);
        Alert.alert('You have died', 'Play again?', [
            {
                text: 'Yes',
                onPress: () => {
                    setHealth(100);
                    setMoney(10);
                    setHappiness(10);
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
                    BackHandler.exitApp();
                },
            },
        ]);
    }

    function applyRandomEvent() {
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
                        Math.min(MAX_HEALTH, health + option.effect.health)
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
                        Math.min(MAX_SMARTS, smarts + option.effect.smarts)
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

const MAX_HEALTH = 100;
const MAX_SMARTS = 100;
const MAX_HAPPINESS = 100;
const MIN_HEALTH = 0;
const MIN_SMARTS = 0;
const MIN_HAPPINESS = 0;
const MIN_MONEY = 0;
const DAY_IN_MONTH = 30;
const INTERVAL = 20;
