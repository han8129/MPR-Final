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
import RelationshipModal from '../components/game/RelationshipModal';
import ActivityModal from '../components/game/ActivityModal';
import { Activity } from '../models';
import { getActivitiesData } from '../data';
import { GameContext } from '../store/GameContext';


interface Relationship {
    name: string;
    desc: string;
    maritalStatus: string;
    work: string;
}

const ActivityScreen: React.FC = () => {
    const context = React.useContext(GameContext);

    const [selectedRelationship, setSelectedRelationship] =
        useState<Relationship | null>(null);

    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
        null
    );

    const age = Math.floor(context.days / 360);

    const [activities, setActivities] = useState<Activity[]>([]);

    const relationships: Relationship[] = [
        {
            name: 'Robert Downey Jr.',
            desc: 'Father',
            maritalStatus: 'Married to Scarlett Johansson',
            work: 'Actor for Marvel Studios',
        },
        {
            name: 'Scarlett Johansson',
            desc: 'Mother',
            maritalStatus: 'Married to Robert Downey Jr.',
            work: 'Actress for Marvel Studios',
        },
    ];

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try {
                // Get the data from Firebase
                const activitiesData = await getActivitiesData();
                // Update the state with the fetched data
                setActivities(activitiesData);
            } catch (error) {
                console.error('Error fetching activities data:', error);
            }
        };

        // Call the fetchActivitiesData function
        fetchActivitiesData();
    }, []);

    const handleRelPress = (index: number) => {
        setSelectedRelationship(relationships[index]);
    };

    const getAvailableActivities = () => {
        return activities.filter((activity) => activity.ageNeeded <= age);
    };

    const availableActivities = getAvailableActivities();

    const handleActivityPress = (index: number) => {
        setSelectedActivity(activities[index]);
    };

    const handleApplyActivity = () => {};

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
                    <SectionHeader heading='Your Relationships' />
                    <ListScrollView
                        itemList={relationships}
                        onPressItem={handleRelPress}
                    />
                    <SectionHeader heading='Available Activities' />
                    <ListScrollView
                        itemList={availableActivities}
                        onPressItem={handleActivityPress}
                    />
                </ScrollView>
                <RelationshipModal
                    rel={selectedRelationship}
                    closeModal={() => setSelectedRelationship(null)}
                    handleInteraction={() => {}}
                />
                <ActivityModal
                    act={selectedActivity}
                    closeModal={() => setSelectedActivity(null)}
                    applyActivity={handleApplyActivity}
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

export default ActivityScreen;
