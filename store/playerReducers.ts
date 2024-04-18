import { PlayerAction, SET_PLAYER_DATA } from "./playerActions";

export interface PlayerState {
  health: number;
  smarts: number;
  money: number;
  age: number;
  title: string;
  username: string;
}

const initialState: PlayerState = {
  health: 0,
  smarts: 0,
  money: 0,
  age: 0,
  title: "",
  username: "",
};

export const playerReducer = (
  state: PlayerState = initialState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case SET_PLAYER_DATA:
      return {  
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
