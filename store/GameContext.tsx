import { createContext, useState, useRef, useEffect } from "react";
import { Alert } from "react-native";

export const GameContext = createContext({
  health: 100,
  money: 100000,
  happy: 100,
  events: Array<Event>,
  activities: Array<Activity>,
    days: 1,
});

const INTERVAL = 200;

export default function GameContextProvider({ children }) {
  const health = useRef(100);
  const money = useRef(10000);
  const happy = useRef(100);
  const events = useRef(new Array<Event>());
  const activities = useRef(new Array<Activity>());
  const loop = useRef(setInterval(() => {}, INTERVAL));
  const [days, setDays] = useState(100);
  const monthCount = useRef(0);

  useEffect(() => startLoop(), []);

  const context = {
    health: health.current,
    money: money,
    happy: happy,
    events: events.current,
    activities: activities.current,
      days: days
    // setHealth: setHealth,
  };

  function startLoop() {
    clearInterval(loop.current);

    loop.current = setInterval(() => {
        console.log(days);
        setDays((current) => current + 1);
      monthCount.current += 1;
      if (money.current <= 0) {
        health.current -= MAX_HEALTH * 0.05;
      }

      events.current = events.current.filter(
        (e) => days < e.startDate + e.duration,
      );

      events.current.forEach((e: Event) => {
        health.current += e.effect.health;
        money.current += e.effect.money;
        happy.current += e.effect.happy;
      });

      if (health.current <= 0) {
        clearInterval(loop.current);
          alert('You have died')
          return;
      }

      // a random number in range [0, 9]
      // 20% for event
      if (monthCount.current > 29) {
        monthCount.current = 0;
        if ([0].includes(Math.floor(Math.random() * 3))) {
          clearInterval(loop.current);
          const randIndex = Math.floor(Math.random() * ALL_EVENTS.length);
          const event = ALL_EVENTS[randIndex];
          Alert.alert(`${event.name} happened`, "What will you do?", [
            {
              text: "A",
              onPress: () => {
                health.current += event.effect.health;
                console.log("Pick A");
                startLoop();
              },
            },
            {
              text: "B",
              onPress: () => {
                money.current += event.effect.money;
                happy.current += event.effect.happy;
                console.log("Pick B");
                startLoop();
              },
            },
          ]);
          event.startDate = days;

          events.current.push(event);
        }
      }
    }, INTERVAL);
  }

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
