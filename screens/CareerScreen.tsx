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
import { Job } from '../models';
import { getData } from '../data';
import { GameContext } from '../store/GameContext';
import JobModal from '../components/game/JobModal';

const CareerScreen: React.FC = () => {
    const context = React.useContext(GameContext);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

    const [selectedJob, setSelectedJob] = useState<Job | null>();

    const age = Math.floor(context.days / 360);

    useEffect(() => {
        const fetchjobData = async () => {
            try {
                // Get the data from Firebase
                const jobData = await getData<Job>('job');
                const filteredJobs = jobData.filter(
                    (job) => job.ageNeeded <= age
                );
                setFilteredJobs(filteredJobs);
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        // Call the fetchjobData function
        fetchjobData();
    }, [context.days]);

    const handleJobPress = (index: number) => {
        setSelectedJob(filteredJobs[index]);
    };

    const applyJob = () => {
        if (selectedJob) {
            // Check in the context.jobs, this should only contains 1 partime job and 1 fulltime job,
            if (context?.jobs?.length > 0) {
                for (const job of context.jobs) {
                    const j: Job = job;
                    if (
                        j.type === 'Part-time' &&
                        selectedJob.type === 'Part-time'
                    ) {
                        Alert.alert(
                            'You already have a part-time job',
                            'You must quit your current part-time job before you can apply for a new one'
                        );
                        return;
                    }
                    if (
                        j.type === 'Full-time' &&
                        selectedJob.type === 'Full-time'
                    ) {
                        Alert.alert(
                            'You already have a full-time job',
                            'You must quit your current full-time job before you can apply for a new one'
                        );
                        return;
                    }
                }
            }

            if (age < selectedJob.ageNeeded) {
                Alert.alert(
                    'You are not old enough to apply for this job',
                    'You must be at least ' +
                        selectedJob.ageNeeded +
                        ' years old to apply for this job'
                );
                return;
            }

            if (
                selectedJob.prerequisite &&
                !context.coursesTaken?.includes(
                    selectedJob.prerequisite as never
                )
            ) {
                Alert.alert(
                    'You do not have the prerequisite for this job',
                    'You must take ' +
                        selectedJob.prerequisite +
                        ' before you can apply for this job'
                );
                return;
            }

            context.setJobs([...(context.jobs || []), selectedJob]);
            context.setTitle(selectedJob.name);

            Alert.alert(
                'Job Taken',
                'You have successfully taken the job: ' +
                    selectedJob.name +
                    ' and earned $' +
                    selectedJob.effect.money +
                    ' per month.'
            );
            setSelectedJob(null);
        }
    };

    const quitJob = () => {
        if (selectedJob) {
            context.setJobs(
                context.jobs.filter((job: Job) => job.name !== selectedJob.name)
            );
            Alert.alert(
                'Job Quit',
                'You have successfully quit the job: ' + selectedJob.name
            );
            setSelectedJob(null);
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
                    <SectionHeader heading='Available Jobs' />
                    <ListScrollView
                        itemList={filteredJobs}
                        onPressItem={handleJobPress}
                    />
                </ScrollView>
                <JobModal
                    job={selectedJob}
                    closeModal={() => setSelectedJob(null)}
                    applyJob={applyJob}
                    quitJob={quitJob}
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
