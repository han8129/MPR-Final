import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Color } from '../constants/Color';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/game/Header';
import SectionHeader from '../components/game/SectionHeader';
import ListScrollView from '../components/game/ListScrollView';
import { Education } from '../models';
import { getEducationData } from '../data';
import { GameContext } from '../store/GameContext';
import EducationModal from '../components/game/EducationalModal';

const EducationScreen: React.FC = () => {
    const context = React.useContext(GameContext);

    const [education, setEducation] = useState<Education[]>([]);

    const age = Math.floor(context.days / 360); 

    const [selectedEducation, setSelectedEducation] =
        useState<Education | null>();

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                // Get the data from Firebase
                const educationData = await getEducationData();
                setEducation(educationData);
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };

        // Call the fetchEducationData function
        fetchEducationData();
    }, []);

    const getAvailableEducation = () => {
        return education.filter(
            (edu) =>
                edu.ageNeeded <= age && !context.coursesTaken?.includes(edu.name as never)
        );
    }

    const availableEducation = getAvailableEducation();

    const handleEduPress = (index: number) => {
        setSelectedEducation(education[index]);
    };

    const handleTake = () => {};

    return (
        <>
            <StatusBar hidden={true} />
            <View style={styles.container}>
                <Header
                    username={context.username}
                    userTitle={context.title}
                    balance={context.money}
                />
                <ScrollView style={{ width: '100%' }}>
                    <SectionHeader heading='Available Education' />
                    <ListScrollView
                        itemList={availableEducation}
                        onPressItem={handleEduPress}
                    />
                </ScrollView>
                <EducationModal
                    education={selectedEducation}
                    closeModal={() => setSelectedEducation(null)}
                    takeCourse={handleTake}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        alignItems: 'center',
    },
});

export default EducationScreen;
