import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
    username: string;
    userTitle: string;
    balance: number;
}

const Header: React.FC<HeaderProps> = ({ username, userTitle, balance }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftCont}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.userTitle}>Title: {userTitle}</Text>
            </View>

            <View style={styles.rightCont}>
                <Text style={styles.balance}>${balance}</Text>
                <Text>Balance</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: '100%',
        backgroundColor: '#E2E8F0',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    leftCont: {
        flexDirection: 'column',
    },
    rightCont: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userTitle: {
        fontSize: 14,
    },
    balance: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;
