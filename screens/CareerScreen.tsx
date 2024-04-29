import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header from '../components/game/Header';
import SectionHeader from '../components/game/SectionHeader';
import ListScrollView from '../components/game/ListScrollView';
import { Job } from '../models/Types';
import { getData } from '../services/DataService';
import { GameContext } from '../store/GameContext';
import LoadingScreen from './LoadingScreen';
import { GLOBAL_STYLES } from '../styles/SharedStyles';
import CommonModal from '../components/game/CommonModal';
import { GAME_TEXT_CONSTANTS } from '../constants/GameConstants';

const CareerScreen: React.FC = () => {
    const context = React.useContext(GameContext);
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

    const [selectedJob, setSelectedJob] = useState<Job | null>();

    const age = Math.floor(context.days / 360);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchjobData = async () => {
            try {
                // Get the data from Firebase
                const jobData = await getData<Job>('job');
                const filteredJobs = jobData.filter(
                    (job) => job.ageNeeded <= age
                );
                setFilteredJobs(filteredJobs);
                setIsLoading(false);
            } catch (error) {
                console.error(GAME_TEXT_CONSTANTS.ERROR_FETCHING_DATA, error);
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
            if (validateSelectedJob(selectedJob)) {
                context.setJobs([...(context.jobs || []), selectedJob]);
                context.setTitle(selectedJob.name);

                Alert.alert(
                    GAME_TEXT_CONSTANTS.JOB_TITLE_SUCCESS,
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
                    `You must quit your current ${type} job before you can apply for a new one`
                );

                return false;
            }
        }
        if (
            selectedJob.requirement.education != 'None' &&
            !context.coursesTaken?.includes(
                selectedJob.requirement.education as never
            )
        ) {
            Alert.alert(
                GAME_TEXT_CONSTANTS.JOB_TITLE_FAILED,
                `You must take ${selectedJob.requirement.education} before you can apply for this job`
            );
            return false;
        }

        if (selectedJob.requirement.health > context.health) {
            Alert.alert(
                GAME_TEXT_CONSTANTS.JOB_TITLE_FAILED,
                `You health must be at least ${selectedJob.requirement.health} to apply`
            );

            return false;
        }

        if (selectedJob.requirement.smarts > context.smarts) {
            Alert.alert(
                GAME_TEXT_CONSTANTS.JOB_TITLE_FAILED,
                `You smart must be at least ${selectedJob.requirement.smarts} to apply`
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
                GAME_TEXT_CONSTANTS.JOB_TITLE_QUIT,
                'You have successfully quit the job: ' + selectedJob.name
            );
            setSelectedJob(null);
        }
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
                <ScrollView style={GLOBAL_STYLES.maxWidth}>
                    <SectionHeader heading={GAME_TEXT_CONSTANTS.HEADING_JOB_SECTION} />
                    <ListScrollView
                        itemList={filteredJobs}
                        onPressItem={handleJobPress}
                    />
                </ScrollView>
                <CommonModal
                    modalObject={selectedJob}
                    closeModal={() => setSelectedJob(null)}
                    handlePress={
                        context.jobs.includes(selectedJob as never)
                            ? quitJob
                            : applyJob
                    }
                    buttonText={
                        context.jobs.includes(selectedJob as never)
                            ? GAME_TEXT_CONSTANTS.JOB_QUIT_BUTTON_TEXT
                            : GAME_TEXT_CONSTANTS.JOB_APPLY_BUTTON_TEXT
                    }
                />
            </View>
        </>
    );
};

export default CareerScreen;
