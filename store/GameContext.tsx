import { createContext, useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { Event, Job } from '../models/Types';
import useInterval from '../hooks/useInterval';
import { getData } from '../services/DataService';
import {
    PLAYER_CONSTANTS,
    GAME_TEXT_CONSTANTS,
} from '../constants/GameContansts';
import { getRandomInt } from '../utils/random';

export const GameContext = createContext({
    health: PLAYER_CONSTANTS.ZERO,
    money: PLAYER_CONSTANTS.ZERO,
    happiness: PLAYER_CONSTANTS.ZERO,
    smarts: PLAYER_CONSTANTS.ZERO,
    events: [] as Event[],
    activities: [] as string[],
    days: PLAYER_CONSTANTS.ZERO,
    jobs: [] as Job[],
    coursesTaken: [] as string[],
    username: '',
    title: 'No Title Yet',
    gender: '',
    badDeeds: Array<string>(),
    goodDeeds: Array<string>(),
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
    setGoodDeeds: (deeds: string[]) => {},
    setBadDeeds: (deeds: string[]) => {},
});

interface Props {
    children: any;
}
export default function GameContextProvider({ children }: Props) {
    const [health, setHealth] = useState(PLAYER_CONSTANTS.INITIAL_HEALTH);
    const [money, setMoney] = useState(PLAYER_CONSTANTS.INITIAL_MONEY);
    const [happiness, setHappiness] = useState(
        PLAYER_CONSTANTS.INITIAL_HAPPINESS
    );
    const [events, setEvents] = useState<Event[]>([]); // Initialize events as an empty array
    const [activities, setActivities] = useState<string[]>([]); // Initialize activities as an empty array
    const [smarts, setSmarts] = useState(PLAYER_CONSTANTS.INITIAL_SMARTS);
    const [days, setDays] = useState(PLAYER_CONSTANTS.INITIAL_DAY);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [username, setUsername] = useState<string>(''); // Initialize username as an empty string
    const [coursesTaken, setCoursesTaken] = useState<string[]>([]);
    const [isTakeDailyLogin, setIsTakeDailyLogin] = useState(false);
    const [title, setTitle] = useState(''); // Initialize title as an empty string
    const [gender, setGender] = useState('');
    const [goodDeeds, setGoodDeeds] = useState(new Array<string>())
    const [badDeeds, setBadDeeds] = useState(new Array<string>())

    const [isPause, setIsPause] = useState(true);

    useEffect(() => {
        // Fetch event data when the component mounts
        async function fetchEventData() {
            try {
                const eventData = await getData<Event>('event');
                setEvents(eventData); // Update events state with fetched data
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        }

        fetchEventData(); // Call the fetchEventData function
    }, []);

    useInterval(callback, PLAYER_CONSTANTS.DAY_INTERVAL, isPause, [
        days,
    ]);

    function callback() {
        let currentDays = days;
        let currentDayInMonth = currentDays % PLAYER_CONSTANTS.DAY_IN_MONTH;
        let currentHealth = health;
        let currentHappiness = happiness;
        let currentSmarts = smarts;
        let currentMoney = money;

        if (days / PLAYER_CONSTANTS.DAY_IN_YEAR == 18) {
            currentMoney += PLAYER_CONSTANTS.MONEY_AT_18;
        }

        if (money == PLAYER_CONSTANTS.ZERO) {
            currentHealth -= PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (happiness == PLAYER_CONSTANTS.ZERO) {
            currentHealth -= PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (smarts == PLAYER_CONSTANTS.ZERO) {
            currentHealth -= PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (smarts == PLAYER_CONSTANTS.MAX_SMARTS) {
            currentHealth += PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (happiness == PLAYER_CONSTANTS.MAX_HAPPINESS) {
            currentHealth += PLAYER_CONSTANTS.HEALTH_RATE;
        }

        if (days % PLAYER_CONSTANTS.DAY_IN_YEAR == 0 && days != 0) {
            currentHealth += PLAYER_CONSTANTS.NEW_AGE_VALUE;
            currentHappiness += PLAYER_CONSTANTS.NEW_AGE_VALUE;
            currentSmarts += PLAYER_CONSTANTS.NEW_AGE_VALUE;
        }

        if (currentHealth > PLAYER_CONSTANTS.MAX_HEALTH) {
            currentHealth = PLAYER_CONSTANTS.MAX_HEALTH;
        }

        if (currentHappiness > PLAYER_CONSTANTS.MAX_HAPPINESS) {
            currentHappiness = PLAYER_CONSTANTS.MAX_HAPPINESS;
        }

        if (currentSmarts > PLAYER_CONSTANTS.MAX_SMARTS) {
            currentSmarts = PLAYER_CONSTANTS.MAX_SMARTS;
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
        if (currentDays > 6 * PLAYER_CONSTANTS.DAY_IN_YEAR) {
            // Events may occur at the start of the month
            if (currentDayInMonth > PLAYER_CONSTANTS.DAY_IN_MONTH - 2) {
                // Each month a job will generate money
                for (const job of jobs) {
                    currentMoney += job.effect.money;
                    currentHealth += job.effect.health;
                    currentHappiness += job.effect.happiness;
                    currentSmarts += job.effect.smarts;
                }

                const validJobs = [];
                for (const job of jobs) {
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

                setJobs(validJobs);
                // generate a random integer from 0 to n -1
                // 20% for an event to happen
                if ([0].includes(getRandomInt({min: 0, max: 4}))) {
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
        Alert.alert(
            GAME_TEXT_CONSTANTS.DIE_TITLE,
            GAME_TEXT_CONSTANTS.DIE_DESC,
            [
                {
                    text: GAME_TEXT_CONSTANTS.DIE_YES_TEXT,
                    onPress: () => {
                        setHealth(PLAYER_CONSTANTS.INITIAL_HEALTH);
                        setMoney(PLAYER_CONSTANTS.INITIAL_MONEY);
                        setHappiness(PLAYER_CONSTANTS.INITIAL_HAPPINESS);
                        setSmarts(PLAYER_CONSTANTS.INITIAL_SMARTS);
                        setDays(PLAYER_CONSTANTS.INITIAL_DAY);
                        setJobs([]);
                        setCoursesTaken([]);
                        setActivities([]);
                        setIsPause(false);
                    },
                },
                {
                    text: GAME_TEXT_CONSTANTS.DIE_NO_TEXT,
                    onPress: () => {
                        BackHandler.exitApp();
                    },
                },
            ]
        );
    }

    function applyRandomEvent() {
        setIsPause(true);
        const randIndex = Math.floor(Math.random() * events.length);
        const event = events[randIndex];
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
        setGoodDeeds: setGoodDeeds,
        setBadDeeds: setBadDeeds,
        goodDeeds: goodDeeds,
        badDeeds: badDeeds,
    };

    return (
        <GameContext.Provider value={context}>{children}</GameContext.Provider>
    );
}
