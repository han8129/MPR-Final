import { Dimensions } from "react-native";

export const PLAYER_CONSTANTS = {
    MAX_HEALTH: 100,
    MAX_HAPPINESS: 100,
    MAX_SMARTS: 100,
    MIN_HEALTH: 0,
    MIN_HAPPINESS: 0,
    MIN_SMARTS: 0,
    MIN_MONEY: 0,
    DAY_IN_MONTH: 30,
    DAY_IN_YEAR: 360,
    DAY_INTERVAL: 2000, // 2 seconds = 1 day (720 secs = 1 year)

    // initial values
    INITIAL_HEALTH: 100,
    INITIAL_HAPPINESS: 40,
    INITIAL_SMARTS: 20,
    INITIAL_MONEY: 5,
    INITIAL_TITLE: 'No Title Yet',
    INITIAL_DAY: 0,
    // incremental values
    HEALTH_RATE: 0.5,
    NEW_AGE_VALUE: 5,
    // money values
    MONEY_AT_18: 10000,

    ZERO: 0,

    GOOD_DEED_WEIGHT : 0.75,
    BAD_DEED_WEIGHT : 1.0,
};

export const GAME_TEXT_CONSTANTS = {
    DIE_TITLE: 'You have died',
    DIE_DESC: 'Play again?',
    DIE_YES_TEXT: 'Yes',
    DIE_NO_TEXT: 'No',
};

export const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,
}
