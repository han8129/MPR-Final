import { createContext, useState, useRef, useEffect } from "react";
import { Alert } from "react-native";

export const GameContext = createContext({
  health: 100,
  money: 100000,
  happy: 100,
  events: Array<Event>,
  activities: Array<Activity>,
  days: 1,
    setHealth: () => {},
    setDays: (days: number) => {}
});

const INTERVAL = 200;

export default function GameContextProvider({ children }) {
  const [health, setHealth] = useState(100);
  const money = useRef(10000);
  const happy = useRef(100);
  const events = useRef(new Array<Event>());
  const activities = useRef(new Array<Activity>());
  const loop = useRef(setInterval(() => {}, INTERVAL));
  const [days, setDays] = useState(100);
  const [monthCount, setMonthCount] = useState(0);

  const context = {
    health: health,
    money: money,
    happy: happy,
    events: events.current,
    activities: activities.current,
    days: days,
    setHealth: setHealth,
      setDays: setDays,
      monthCount: monthCount
  };

  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
}

const MAX_HEALTH = 100;

const ALL_EVENTS: Event[] = [
  {
    name: "Depression",
    effect: {
      health: -10,
      money: -5,
      happy: -15,
    },
    startDate: 0,
    duration: 1,
  },
  {
    name: "Getting Fired",
    effect: {
      health: -2,
      money: -100,
      happy: -15,
    },
    startDate: 0,
    duration: 60,
  },
];

export interface Event {
  name: string;
  effect: {
    health: number;
    money: number;
    happy: number;
  };
  startDate: number;
  duration: number;
}

export interface Activity {
  name: string;
  effect: {
    health: number;
    money: number;
    happy: number;
  };
}
