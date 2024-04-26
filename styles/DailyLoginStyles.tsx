import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';

export const SCREEN_STYLES = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemCont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
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