import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { Color } from '../constants/Color';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/game/Header';
import AgeStatus from '../components/game/AgeStatus';
import PlayerStats from '../components/game/PlayerStats';
import { GameContext } from '../store/GameContext';

const image = require("../assets/images/Infant.png");

interface Props {
    navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const context = useContext(GameContext);

    const [health, setHealth] = useState(100);
    const [smarts, setSmarts] = useState(100);
    const [money, setMoney] = useState(100);
    const [title, setTitle] = useState('Student');
    const [username, setUsername] = useState('John Doe');

    useEffect(() => {}, [context.money, context.health, context.days]);
    const age = Math.floor( context.days / 360); // get quotient
    const progress = ( (context.days % 360) / 360 * 100).toFixed(2);

  const { health, smarts, money, age, title, username } = useSelector(
    (state: PlayerState) => state
  );

  useEffect(() => {
    store.dispatch({
      type: "SET_PLAYER_DATA",
      payload: {
        health: player.getHealth(),
        smarts: player.getSmarts(),
        money: player.getMoney(),
        age: player.getAge(),
        title: player.getTitle(),
        username: player.getName(),
      },
    });
  }, []);

    return (
        <>
            <StatusBar hidden={true} />
            <View style={styles.container}>
                <Header
                    username={username}
                    userTitle={title}
                    balance={context.money}
                />
                <AgeStatus age={age} value={progress} color={Color.red} />
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode='contain'
                />
                <PlayerStats health={context.health} smarts={smarts} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: 'center',
    },
    image: {
        flex: 1,
    },
    dailyText: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default HomeScreen;
