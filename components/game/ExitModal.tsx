import React from 'react';
import { Text, BackHandler } from 'react-native';
import { Job, Player } from '../../models/Types';
import { savePlayerData } from '../../services/PlayerService';
import { GameContext } from '../../store/GameContext';
import ModalButton from './ModalButton';
import { MODAL_SHARED_STYLE } from '../../styles/ComponentStyles';
import ModalContentWrapper from './ModelContentWrapper';

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
        <ModalContentWrapper
            title='Are you sure you want to exit?'
            closeModal={closeModal}
            isOpened={isOpened}
        >
            <Text style={MODAL_SHARED_STYLE.modalDescription}>
                Stats To Be Saved
            </Text>
            <Text style={MODAL_SHARED_STYLE.detail}>Current Age: {age}</Text>
            <Text style={MODAL_SHARED_STYLE.detail}>
                Current Money: ${context.money}
            </Text>
            <Text style={MODAL_SHARED_STYLE.detail}>
                Current Health: {context.health}%
            </Text>
            <Text style={MODAL_SHARED_STYLE.detail}>
                Current Happiness: {context.happiness}%
            </Text>
            <Text style={MODAL_SHARED_STYLE.detail}>
                Current Smarts: {context.smarts}%
            </Text>
            <Text style={MODAL_SHARED_STYLE.detail}>
                Jobs Done:{' '}
                {context.jobs.length > 0
                    ? context.jobs.map((job: Job) => job.name)
                    : 'None'}
            </Text>
            <Text style={MODAL_SHARED_STYLE.detail}>
                Courses Completed:{' '}
                {context.coursesTaken
                    ? context.coursesTaken.join(', ')
                    : 'None'}
            </Text>
            <Text style={MODAL_SHARED_STYLE.detail}>
                Activities Joined:{' '}
                {context.activities ? context.activities.join(', ') : 'None'}
            </Text>

            <ModalButton onPress={ExitAndSave} buttonText='Save and Exit' />
            <ModalButton onPress={justExit} buttonText='Just Exit' />
        </ModalContentWrapper>
    );
};

export default ExitModal;
