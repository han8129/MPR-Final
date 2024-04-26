import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';

export const GLOBAL_STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: 'center',
    },
    maxWidth: {
        width: '100%',
    },
});
