import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/game/Header';
import SectionHeader from '../components/game/SectionHeader';
import ListScrollView from '../components/game/ListScrollView';
import RelationshipModal from '../components/game/RelationshipModal';
import CommonModal from '../components/game/CommonModal';
import { Activity } from '../models/Types';
import { getData } from '../services/DataService';
import { GameContext } from '../store/GameContext';
import LoadingScreen from './LoadingScreen';
import { GLOBAL_STYLES } from '../styles/SharedStyles';
import { PARENT_INFOS } from '../data/dummy-data';
import { Relationship } from '../models/Types';

const ActivityScreen: React.FC = () => {
    const context = React.useContext(GameContext);

    const [selectedRelationship, setSelectedRelationship] =
        useState<Relationship | null>(null);

    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
        null
    );

    const age = Math.floor(context.days / 360);

    const [filteredActivities, setFilteredActivities] = useState<Activity[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try {
                // Get the data from Firebase
                const activitiesData = await getData<Activity>('activity');

                const filteredActivities = activitiesData.filter(
                    (activity: Activity) =>
                        activity.ageNeeded <= age &&
                        !context.activities?.includes(activity.name as never)
                );
                setFilteredActivities(filteredActivities);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching activities data:', error);
            }
        };

        // Call the fetchActivitiesData function
        fetchActivitiesData();
    }, [selectedActivity]);

    const handleRelPress = (index: number) => {
        setSelectedRelationship(PARENT_INFOS[index]);
    };

    const handleActivityPress = (index: number) => {
        setSelectedActivity(filteredActivities[index]);
    };

    const handleJoin = () => {
        if (selectedActivity) {
            if (age < selectedActivity.ageNeeded) {
                Alert.alert(
                    'You are not old enough to apply for this activity',
                    'You must be at least ' +
                        selectedActivity.ageNeeded +
                        ' years old to apply for this activity'
                );
                return;
            }

            if (context.money < +selectedActivity.effect.money) {
                Alert.alert(
                    'You do not have enough money to apply for this activity',
                    'You need at least $' +
                        selectedActivity.effect.money +
                        ' to apply for this activity'
                );
                return;
            }

            context.setMoney(context.money + selectedActivity.effect.money);
            context.setHealth(context.health + selectedActivity.effect.health);
            context.setHappiness(
                context.happiness + selectedActivity.effect.happiness
            );
            context.setSmarts(context.smarts + selectedActivity.effect.smarts);

            context.setActivities([
                ...(context.activities || []),
                selectedActivity.name as never,
            ]);

            setSelectedActivity(null);
        }
    };

    const handleRelInteraction = () => {
        context.setMoney(context.money + 50);
        setSelectedRelationship(null);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <StatusBar hidden={true} />
            <View style={GLOBAL_STYLES.container}>
                <Header
                    username={context.username}
                    userTitle={context.title}
                    balance={context.money}
                />
                <ScrollView style={{ width: '100%' }}>
                    <SectionHeader heading='Your Parents' />
                    <ListScrollView
                        itemList={PARENT_INFOS}
                        onPressItem={handleRelPress}
                    />
                    <SectionHeader heading='Available Activities' />
                    <ListScrollView
                        itemList={filteredActivities}
                        onPressItem={handleActivityPress}
                    />
                </ScrollView>
                <RelationshipModal
                    rel={selectedRelationship}
                    closeModal={() => setSelectedRelationship(null)}
                    handleInteraction={handleRelInteraction}
                />
                <CommonModal
                    modalObject={selectedActivity}
                    closeModal={() => setSelectedActivity(null)}
                    handlePress={handleJoin}
                    buttonText='Join'
                />
            </View>
        </>
    );
};

export default ActivityScreen;
