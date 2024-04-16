import { createContext, useState, useRef, useEffect } from "react";

export interface Event {
  name: string;
  effect: {
    health: number;
    money: number;
    happy: number;
  };
}

export interface Activity {
  name: string;
  effect: {
    health: number;
    money: number;
    happy: number;
  };
}

export const GameContext = createContext({
  health: 100,
  money: 100000,
  happy: 100,
  events: Array<Event>,
  activities: Array<Activity>,
  setHealth: () => {},
  setMoney: () => {},
  setHappy: () => {},
  appendEvent: (e: Event) => {},
});

export default function GameContextProvider({ children }: { children: React.ReactNode }) {
  const health = useRef(100);

  const [money, setMoney] = useState(10000);
  const [happy, setHappy] = useState(100);
  const [events, setEvents] = useState<Event[]>([]);
  const [activities, setActivities] = useState(new Array<Activity>());
  const timer = useRef(setInterval(() => {}, 300));

  function appendEvent(e: Event) {
    setEvents((list) => [...list, e]);
  }

  useEffect(() => {
    clearInterval(timer.current);

    timer.current = setInterval(() => {
      // a random number in range [0, 9]
      const randInt = Math.floor(Math.random() * 10);

    timer.current = setInterval(() => {
      // a random number in range [0, 9]
      const randInt = Math.floor(Math.random() * 10);

      console.log(health.current);
      if ([0, 9].includes(randInt)) {
        health.current = health.current - 10;
        console.log("Event Happen");
        const randIndex = Math.floor(Math.random() * events.length);
        const event = events[randIndex];
        if (event == undefined) return;
        // setHealth((current) => current - event.effect.health);
        setMoney((current) => current - event.effect.money);
      }

      if (health.current <= 0) {
        clearInterval(timer.current);
      }

      if (money <= 0) {
        // setHealth((current) => current * 0.9);
      }
    }, 300);
  }, []);

  const context = {
    health: health.current,
    money: money,
    happy: happy,
    appendEvent: appendEvent,
    events: events , // Update the type of the events property
    activities: activities,
    setMoney: setMoney,
    setHappy: setHappy,
    setHealth: () => {},
  };
  return (
    <GameContext.Provider value={context}>{children}</GameContext.Provider>
  );
}
