import React, { useContext, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    BackHandler,
    Alert,
} from 'react-native';
import { Color } from '../constants/Color';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/game/Header';
import AgeStatus from '../components/game/AgeStatus';
import PlayerStats from '../components/game/PlayerStats';
import { GameContext } from '../store/GameContext';
import CommonButton from '../components/auth/CommonButton';
import { savePlayerData } from '../services/PlayerService';
import { Player } from '../models';
import ExitModal from '../components/game/ExitModal';

const { height } = Dimensions.get('window');

interface Props {
    navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const context = useContext(GameContext);

    const age = Math.floor(context.days / 360); // get quotient
    const progress = Number((((context.days % 360) / 360) * 100).toFixed(2));

    let image;
    let title;

    if (age < 6) {
        image = require(`../assets/images/male0-5.png`);
        if (context.gender === 'female') {
            image = require(`../assets/images/female0-5.png`);
        }
        title = 'Baby';
    } else if (age < 11) {
        image = require('../assets/images/male6-10.png');
        if (context.gender === 'female') {
            image = require('../assets/images/female6-10.png');
        }
        title = 'Child';
    } else if (age < 15) {
        image = require('../assets/images/male11-14.png');
        if (context.gender === 'female') {
            image = require('../assets/images/female11-14.png');
        }
        title = 'Teenager';
    } else if (age < 18) {
        image = require('../assets/images/male15-17.png');
        if (context.gender === 'female') {
            image = require('../assets/images/female15-17.png');
        }
        title = 'Young Adult';
    } else if (age < 22) {
        image = require('../assets/images/male18-21.png');
        if (context.gender === 'female') {
            image = require('../assets/images/female18-21.png');
        }
        title = 'Adult';
    } else if (age < 60) {
        image = require('../assets/images/male22-59.png');
        if (context.gender === 'female') {
            image = require('../assets/images/female22-59.png');
        }
        title = 'Middle Age';
    } else {
        image = require('../assets/images/male60+.png');
        if (context.gender === 'female') {
            image = require('../assets/images/female60+.png');
        }
        title = 'Old Age';
    }

    useEffect(() => {
        context.setTitle(title);
    }, [
        context.money,
        context.health,
        context.days,
        context.happiness,
        context.smarts,
    ]);

    const navigateDailyLogin = () => {
        navigation.navigate('DailyLogin');
    };

    const skipToAge6 = () => {
        context.setDays(6 * 360);
    };

    const closeExitModal = () => {
        setIsExitModalOpened(false);
        context.setIsPause(false);
    };

    const toggleExitModal = () => {
        setIsExitModalOpened(true);
        context.setIsPause(true);
    };

    return (
        <>
            <StatusBar hidden={true} />
            <View style={styles.container}>
                <Header
                    username={context.username}
                    userTitle={title}
                    balance={context.money}
                />
                <AgeStatus age={age} value={progress} color={Color.red} />
                <Image
                    source={image}
                    style={styles.image}
                    resizeMode='contain'
                />
                <TouchableOpacity
                    style={styles.dailyLoginbutton}
                    onPress={navigateDailyLogin}
                >
                    <Text style={styles.dailyText}>Daily Gift</Text>
                </TouchableOpacity>
                {age < 6 && (
                    <TouchableOpacity
                        style={styles.skipAge6Button}
                        onPress={skipToAge6}
                    >
                        <Text style={styles.skipAge6Text}>Skip to Age 6</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={styles.exitButton}
                    onPress={toggleExitModal}
                >
                    <Text style={styles.dailyText}>Exit Game</Text>
                </TouchableOpacity>
                <PlayerStats
                    health={context.health}
                    smarts={context.smarts}
                    happiness={context.happiness}
                />
                <ExitModal
                    isOpened={isExitModalOpened}
                    closeModal={closeExitModal}
                />
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
    dailyLoginbutton: {
        height: 40,
        width: 80,
        backgroundColor: Color.red,
        top: 0.57 * height,
        right: 30,
        position: 'absolute',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exitButton: {
        height: 40,
        width: 80,
        backgroundColor: Color.black,
        top: 0.2 * height,
        left: 30,
        position: 'absolute',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dailyText: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    skipAge6Button: {
        position: 'absolute',
        top: 0.57 * height,
        left: 30,
        backgroundColor: Color.red, // Adjust color as needed
        padding: 10,
        borderRadius: 10,
    },
    skipAge6Text: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default HomeScreen;
