export interface User {
    username: string;
    password: string;
    player: Player;
}

export interface Player {
    gender: string;
    days: number;
    health: number;
    money: number;
    happiness: number;
    smarts: number;
    coursesTaken: string[];
    jobs: Job[];
    activities: string[];
}

export interface Effect {
    health: number;
    happiness: number;
    money: number;
    smarts: number;
}

export interface Option {
    desc: string;
    effect: Effect;
}

export interface Education {
    ageNeeded: number;
    desc: string;
    name: string;
    prerequisite: string;
    effect: Effect;
}

export interface Job {
    desc: string;
    name: string;
    prerequisite: string;
    effect: Effect;
    ageNeeded: number;
    requirement: {
        health: number;
        education: string;
        smarts: number
    }
    type: string;
}

export interface Activity {
    ageNeeded: number;
    desc: string;
    name: string;
    prerequisite: string;
    effect: Effect;
}

export interface Event {
    desc: string;
    name: string;
    options: Option[];
}

export interface NPC {
    name: string;
    desc: string;
    age: number;
    health: number;
    happiness: number;
    smarts: number;
    money: number;
    relationshipType: string;
    maritalStatus?: string;
    work?: string;
    options: Option[];
}
