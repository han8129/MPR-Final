import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';

export const MODAL_SHARED_STYLE = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    detail: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: Color.red,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '50%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonDiv: {
        alignItems: 'center',
    },
});

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
