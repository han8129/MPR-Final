import {View, Text} from 'react-native';
import {GameContext} from '../store/GameContext'
import { useContext, useEffect, useRef } from 'react';

const INTERVAL = 300;
export default function HomeScreen() {
    const context = useContext(GameContext);
    const loop = useRef(setInterval( () => {}, INTERVAL ))
    const month = useRef(0)

    useEffect(() => startLoop(), []);

    function startLoop() {
    clearInterval(loop.current);

    loop.current = setInterval(() => {
        let currentDays = context.days;
        let currentMonth = context.month
      context.setDays(currentDays + 1);

      monthCount.current += 1;
      let currentHealth = health;
      if (context.money <= 0) {
        currentHealth -= MAX_HEALTH * 0.05;
      }

      events.current = events.current.filter(
        (e) => days < e.startDate + e.duration,
      );

      events.current.forEach((e: Event) => {
        currentHealth += e.effect.health;
        money.current += e.effect.money;
        happy.current += e.effect.happy;
      });

      setHealth(currentHealth);
      console.log(currentHealth);
      if (currentHealth <= 0) {
        clearInterval(loop.current);
        alert("You have died");
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
                setHealth((current) => current + event.effect.health);
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
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'steelblue'
        }}>
            <Text style={{
                color: 'white',
                fontSize: 24
            }}>
                You health {context.health}
            </Text>
            <Text style={{
                color: 'white',
                fontSize: 24
            }}>
                Days lived {context.days}
            </Text>
        </View>
    );
}
