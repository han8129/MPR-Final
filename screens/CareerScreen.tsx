import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
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
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

    const [selectedJob, setSelectedJob] = useState<Job | null>();

    const age = Math.floor(context.days / 360);

    useEffect(() => {
        const fetchjobData = async () => {
            try {
                // Get the data from Firebase
                const jobData = await getJobData();
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
    }, [selectedJob]);

    const handleJobPress = (index: number) => {
        setSelectedJob(filteredJobs[index]);
    };

    const applyJob = () => {
        if (selectedJob) {
            if (validateSelectedJob(selectedJob)) {
                context.setJobs([...(context.jobs || []), selectedJob]);

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
        }
    };

    function validateSelectedJob(selectedJob: Job): boolean {
        // Check in the context.jobs, this should only contains 1 partime job and 1 fulltime job,
        if (context.jobs.length > 0) {
            const type = selectedJob.type;

            const isDuplicated = context.jobs.find((job) => job.type === type);

            if (isDuplicated) {
                Alert.alert(
                    `You already have a ${type} job`,
                    `You must quit your current ${type} job before you can apply for a new one'`
                );

                return false;
            }
        }

        if (
            selectedJob.requirement.education &&
            !context.coursesTaken?.includes(
                selectedJob.requirement.education as never
            )
        ) {
            Alert.alert(
                'You do not have the education for this job',
                'You must take ' +
                    selectedJob.requirement.education +
                    ' before you can apply for this job'
            );
            return false;
        }

        if (selectedJob.requirement.health > context.health) {
            Alert.alert(
                'You are not healthy enough for this job',
                `You health must be at least ${context.health} to apply`
            );

            return false;
        }

        if (selectedJob.requirement.health > context.health) {
            Alert.alert(
                'You are not healthy enough for this job',
                `You health must be at least ${context.health} to apply`
            );

            return false;
        }

        return true;
    }

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
