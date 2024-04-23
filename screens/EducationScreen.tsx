import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
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

    const [availableEducation, setAvailableEducation] = useState<Education[]>(
        []
    );

    const age = Math.floor(context.days / 360);

    const [selectedEducation, setSelectedEducation] =
        useState<Education | null>();

    useEffect(() => {
        const fetchEducationData = async () => {
            try {
                // Get the data from Firebase
                const educationData = await getEducationData();

                // Set the education data in the context
                const filteredEdus = educationData.filter(
                    (edu) =>
                        edu.ageNeeded <= age &&
                        !context.coursesTaken?.includes(edu.name as never)
                );
                setAvailableEducation(filteredEdus);
            } catch (error) {
                console.error('Error fetching education data:', error);
            }
        };
        // Call the fetchEducationData function
        fetchEducationData();
    }, [context.days]);

    const handleEduPress = (index: number) => {
        setSelectedEducation(availableEducation[index]);
    };

    const handleTake = () => {
        if (selectedEducation) {
            if (age < selectedEducation.ageNeeded) {
                Alert.alert(
                    'You are not old enough to take this course',
                    'You must be at least ' +
                        selectedEducation.ageNeeded +
                        ' years old to take this course'
                );
                return;
            }

            if (context.money < +selectedEducation.effect.money) {
                Alert.alert(
                    'You do not have enough money to take this course',
                    'You need at least $' +
                        selectedEducation.effect.money +
                        ' to take this course'
                );
                return;
            }

            if (
                selectedEducation.prerequisite &&
                !context.coursesTaken?.includes(
                    selectedEducation.prerequisite as never
                )
            ) {
                Alert.alert(
                    'You do not have the prerequisite for this course',
                    'You must take ' +
                        selectedEducation.prerequisite +
                        ' before you can take this course'
                );
                return;
            }

            context.setMoney(context.money + selectedEducation.effect.money);
            context.setHealth(context.health + selectedEducation.effect.health);
            context.setHappiness(
                context.happiness + selectedEducation.effect.happiness
            );
            context.setSmarts(context.smarts + selectedEducation.effect.smarts);

            context.setCoursesTaken([
                ...(context.coursesTaken || []),
                selectedEducation.name as never,
            ]);

            Alert.alert(
                'Course Taken',
                'You have successfully taken the course: ' +
                    selectedEducation.name
            );
            setSelectedEducation(null);
        }
    };

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
