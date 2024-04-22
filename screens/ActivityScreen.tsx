import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
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

export interface Relationship {
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

    const [filteredActivities, setFilteredActivities] = useState<Activity[]>(
        []
    );

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

                const filteredActivities = activitiesData.filter(
                    (activity: Activity) =>
                        activity.ageNeeded <= age &&
                        !context.activities?.includes(activity.name as never)
                );
                setFilteredActivities(filteredActivities);
            } catch (error) {
                console.error('Error fetching activities data:', error);
            }
        };

        // Call the fetchActivitiesData function
        fetchActivitiesData();
    }, [selectedActivity]);

    const handleRelPress = (index: number) => {
        setSelectedRelationship(relationships[index]);
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
                    <SectionHeader heading='Your Parents' />
                    <ListScrollView
                        itemList={relationships}
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
                <ActivityModal
                    act={selectedActivity}
                    closeModal={() => setSelectedActivity(null)}
                    joinActivity={handleJoin}
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
