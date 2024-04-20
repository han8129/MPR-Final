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
    jobs: string[];
    activities: string[];
}

interface Effect {
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
    ageNeeded: number;
    desc: string;
    name: string;
    prerequisite: string;
    effect: Effect;
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
