import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../constants/Color';
import { Job, Player } from '../../models/Types';
import { savePlayerData } from '../../services/PlayerService';
import { GameContext } from '../../store/GameContext';
import ModalButton from './ModalButton';
import ModalHeader from './ModalHeader';

interface ExitModalProps {
    isOpened: boolean;
    closeModal: () => void;
}

const ExitModal: React.FC<ExitModalProps> = ({ isOpened, closeModal }) => {
    const context = React.useContext(GameContext);
    const age = Math.floor(context.days / 360);

    const ExitAndSave = async () => {
        const res = await savePlayerData(context.username, {
            money: context.money,
            health: context.health,
            happiness: context.happiness,
            smarts: context.smarts,
            days: context.days,
            title: context.title,
            gender: context.gender,
            coursesTaken: context.coursesTaken || [],
            jobs: context.jobs || [],
            activities: context.activities || [],
        } as unknown as Player);

        if (res) {
            // Exit the app
            BackHandler.exitApp();
        } else {
            alert('Failed to save game data');
        }
    };

    const justExit = () => {
        BackHandler.exitApp();
    };

    return (
        <Modal
            visible={isOpened}
            animationType='slide'
            transparent={true}
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader
                        title='Are you sure you want to exit?'
                        closeModal={closeModal}
                    />
                    <Text style={styles.modalDescription}>
                        Stats To Be Saved
                    </Text>
                    <Text style={styles.detail}>Current Age: {age}</Text>
                    <Text style={styles.detail}>
                        Current Money: ${context.money}
                    </Text>
                    <Text style={styles.detail}>
                        Current Health: {context.health}%
                    </Text>
                    <Text style={styles.detail}>
                        Current Happiness: {context.happiness}%
                    </Text>
                    <Text style={styles.detail}>
                        Current Smarts: {context.smarts}%
                    </Text>
                    <Text style={styles.detail}>
                        Jobs Done:{' '}
                        {context.jobs.length > 0
                            ? context.jobs.map((job: Job) => job.name)
                            : 'None'}
                    </Text>
                    <Text style={styles.detail}>
                        Courses Completed:{' '}
                        {context.coursesTaken
                            ? context.coursesTaken.join(', ')
                            : 'None'}
                    </Text>
                    <Text style={styles.detail}>
                        Activities Joined:{' '}
                        {context.activities
                            ? context.activities.join(', ')
                            : 'None'}
                    </Text>
                    <View style={styles.buttonDiv}>
                        <ModalButton
                            onPress={ExitAndSave}
                            buttonText='Save and Exit'
                        />
                        <ModalButton
                            onPress={justExit}
                            buttonText='Just Exit'
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    detail: {
        fontSize: 14,
        marginBottom: 5,
    },
    button: {
        backgroundColor: Color.red,
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '50%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDiv: {
        alignItems: 'center',
    },
});

export default ExitModal;
