import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';
import { Color } from '../../constants/Color';

interface PlayerStatsProps {
    health: number;
    smarts: number;
    happiness: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = React.memo(
    ({ health, smarts, happiness }) => {
        return (
            <View style={styles.container}>
                <View style={styles.statCont}>
                    <Stat label='Health' value={health} />
                    <Stat label='Happiness' value={happiness} />
                    <Stat label='Smarts' value={smarts} />
                </View>
            </View>
        );
    }
);

const Stat: React.FC<{ label: string; value: number }> = ({ label, value }) => {
    const [iconName, setIconName] = React.useState<'heart' | 'happy' | 'book'>(
        'book'
    );

    useEffect(() => {
        if (label === 'Health') {
            setIconName('heart');
        } else if (label === 'Happiness') {
            setIconName('happy');
        } else if (label === 'Smarts') {
            setIconName('book');
        }
    }, [label]);

    return (
        <View style={styles.stat}>
            <View style={styles.statRow}>
                <Text style={styles.statLabel}>{label}</Text>
                <Ionicons name={iconName} size={24} color={Color.red} />
            </View>
            <ProgressBar value={value} color={Color.black} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E2E8F0',
    },
    statCont: {
        width: '80%',
        justifyContent: 'center',
        height: '100%',
        marginVertical: 10,
    },
    stat: {
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        height: 55,
    },
    statRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statLabel: {
        fontWeight: 'bold',
        color: Color.red,
    },
});

export default PlayerStats;
