import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/game/Header';
import { Color } from '../constants/Color';
import { GameContext } from '../store/GameContext';
import ModalButton from '../components/game/ModalButton';

interface Props {
    navigation: any;
}

const DailyLoginScreen: React.FC<Props> = ({ navigation }) => {
    const context = useContext(GameContext);

    const moneyPerDay = 100; // Assuming each day gives 100 money

    const navigateBack = () => {
        navigation.goBack();
    };

    const handleTakeDailyLogin = () => {
        if (context.isTakeDailyLogin) {
            Alert.alert('You have already taken the daily login money');
        } else {
            context.setMoney(context.money + moneyPerDay);
            context.setIsDailyLogin(true);
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <Header
                username={context.username}
                userTitle={context.title}
                balance={context.money}
            />
            <TouchableOpacity onPress={navigateBack}>
                <Ionicons
                    name='arrow-back'
                    size={24}
                    color='black'
                    style={styles.backIcon}
                />
            </TouchableOpacity>
            <View
                style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 30,
                }}
            >
                <View style={styles.dayItem}>
                    <Text style={styles.dayText}>{'Daily Prize'}</Text>
                    <Text style={styles.moneyText}>${moneyPerDay}</Text>
                </View>
            </View>

            <ModalButton
                onPress={handleTakeDailyLogin}
                buttonText='Take Daily Login'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backIcon: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 100,
        marginBottom: 20,
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    dayItem: {
        alignItems: 'center',
        padding: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    currentDay: {
        backgroundColor: '#94A3B8',
    },
    dayText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    moneyText: {
        fontSize: 20,
        color: Color.red,
    },
    buttonContainer: {
        backgroundColor: Color.red,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default DailyLoginScreen;
