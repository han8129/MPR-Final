import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Color } from '../../constants/Color';

interface BottomNavTextProps {
    title: string;
    text: string;
    onPress: () => void;
}

export const BottomNavText: React.FC<BottomNavTextProps> = ({
    title,
    text,
    onPress,
}) => {
    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.to}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    to: {
        color: Color.black,
        fontWeight: 'bold',
        fontSize: 17,
    },
});
