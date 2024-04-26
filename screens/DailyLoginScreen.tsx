import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/game/Header';
import { GameContext } from '../store/GameContext';
import ModalButton from '../components/game/ModalButton';
import { SCREEN_STYLES } from '../styles/DailyLoginStyles';

interface Props {
    navigation: any;
}

const DailyLoginScreen: React.FC<Props> = ({ navigation }) => {
    const context = useContext(GameContext);

    const moneyPerDay = 100;

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
        <View style={SCREEN_STYLES.container}>
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
                    style={SCREEN_STYLES.backIcon}
                />
            </TouchableOpacity>
            <View style={SCREEN_STYLES.itemCont}>
                <View style={SCREEN_STYLES.dayItem}>
                    <Text style={SCREEN_STYLES.dayText}>{'Daily Prize'}</Text>
                    <Text style={SCREEN_STYLES.moneyText}>${moneyPerDay}</Text>
                </View>
            </View>

            <ModalButton
                onPress={handleTakeDailyLogin}
                buttonText='Take Daily Login'
            />
        </View>
    );
};

export default DailyLoginScreen;
