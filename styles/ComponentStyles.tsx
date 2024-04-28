import { StyleSheet } from 'react-native';
import { Color } from '../constants/Color';

export const AGE_STATUS_STYLES = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 16,
        justifyContent: 'center',
        width: '80%',
    },
    ageText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

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
        textAlign: 'center',
    },
    buttonDiv: {
        alignItems: 'center',
    },
});

export const PLAYER_HEADER_STYLES = StyleSheet.create({
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

export const SCROLL_VIEW_STYLES = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    progressText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Color.red,
        position: 'absolute',
        top: -10,
        right: 0,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        marginTop: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: Color.black,
    },
    itemDiv: {
        width: '100%',
    },
});

export const PLAYER_STATS_STYLES = StyleSheet.create({
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

export const SECTION_HEADER_STYLES = StyleSheet.create({
    headerCont: {
        backgroundColor: '#334155',
        width: '100%',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'center',
        color: '#fff',
    },
});