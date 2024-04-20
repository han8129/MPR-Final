// this file is used to query data from firebase realtime db

// Path: data/index.ts

import { getDatabase, ref, get } from 'firebase/database';

import app from '../config/firebase';
import { Activity, Event, Education, Job } from '../models';

const db = getDatabase(app);

export const getEventData = async (): Promise<Event[]> => {
    // Create a reference to the database
    const evetnRef = ref(db, 'event');
    // Get the data from the database
    const snapshot = await get(evetnRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        console.log('No data available');
    }
	return snapshot.val();
};

export const getActivitiesData = async (): Promise<Activity[]> => {
	// Create a reference to the database
	const activityRef = ref(db, 'activity');
	// Get the data from the database
	const snapshot = await get(activityRef);
	if (snapshot.exists()) {
		return snapshot.val();
	} else {
		console.log('No data available');
	}
	return snapshot.val();
}

export const getEducationData = async (): Promise<Education[]> => {
	// Create a reference to the database
	const educationRef = ref(db, 'education');
	// Get the data from the database
	const snapshot = await get(educationRef);
	if (snapshot.exists()) {
		return snapshot.val();
	} else {
		console.log('No data available');
	}
	return snapshot.val();
}

export const getJobData = async (): Promise<Job[]> => {
	// Create a reference to the database
	const jobRef = ref(db, 'job');
	// Get the data from the database
	const snapshot = await get(jobRef);
	if (snapshot.exists()) {
		return snapshot.val();
	} else {
		console.log('No data available');
	}
	return snapshot.val();
}