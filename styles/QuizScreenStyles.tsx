import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';

export const SCREEN = StyleSheet.create({
    questionCont: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    heading: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    option: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        backgroundColor: Color.lightGrey,
    },
    optionText: {
        fontSize: 16,
    },
    progressCont: {
        marginBottom: 20,
        width: '80%',
        height: 20,
    },
});
