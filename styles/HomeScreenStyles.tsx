import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';
import { DIMENSIONS } from '../constants/GameContansts';

export const SCREEN_STYLES = StyleSheet.create({
    image: {
        flex: 1,
    },
    button: {
        height: 40,
        width: 80,
        position: 'absolute',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dailyLoginbutton: {
        backgroundColor: Color.red,
        top: 0.57 * DIMENSIONS.HEIGHT,
        right: 30,
    },
    exitButton: {
        backgroundColor: Color.black,
        top: 0.2 * DIMENSIONS.HEIGHT,
        left: 30,
    },
    dailyText: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    skipAge6Button: {
        position: 'absolute',
        top: 0.57 * DIMENSIONS.HEIGHT,
        left: 30,
        backgroundColor: Color.red,
        padding: 10,
        borderRadius: 10,
    },
    skipAge6Text: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: 14,
    },
});