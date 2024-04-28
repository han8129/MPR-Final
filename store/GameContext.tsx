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

    const context = {
        health: health,
        money: money,
        happiness: happiness,
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
