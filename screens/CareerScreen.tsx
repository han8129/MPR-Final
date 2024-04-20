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
import { Job } from '../models';
import { getJobData } from '../data';
import { GameContext } from '../store/GameContext';
import JobModal from '../components/game/JobModal';

const CareerScreen: React.FC = () => {
    const context = React.useContext(GameContext);

    const [jobs, setJobs] = useState<Job[]>([]);

    const [selectedJob, setSelectedJob] = useState<Job | null>();

    const age = Math.floor(context.days / 360);

    useEffect(() => {
        const fetchjobData = async () => {
            try {
                // Get the data from Firebase
                const jobData = await getJobData();
                // Update the state with the fetched data
                setJobs(jobData);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        // Call the fetchjobData function
        fetchjobData();
    }, []);

    const handleJobPress = (index: number) => {
        setSelectedJob(jobs[index]);
    };

    const getAvailableJobs = () => {
        return jobs.filter((job) => job.ageNeeded <= age);
    };

    const availableJobs = getAvailableJobs();
    const applyJob = () => {};

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
                    <SectionHeader heading='Available Jobs' />
                    <ListScrollView
                        itemList={availableJobs}
                        onPressItem={handleJobPress}
                    />
                </ScrollView>
                <JobModal
                    job={selectedJob}
                    closeModal={() => setSelectedJob(null)}
                    applyJob={applyJob}
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

export default CareerScreen;
