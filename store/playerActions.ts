import Player from "../models/Player";
import { PlayerState } from "./playerReducers";

export const SET_PLAYER_DATA = "SET_PLAYER_DATA";

interface SetPlayerDataAction {
  type: typeof SET_PLAYER_DATA;
  payload: PlayerState;
}

export type PlayerAction = SetPlayerDataAction;

export const setPlayerData = (player: Player): SetPlayerDataAction => ({
  type: SET_PLAYER_DATA,
  payload: {
    health: player.getHealth(),
    smarts: player.getSmarts(),
    money: player.getMoney(),
    age: player.getAge(),
    title: player.getTitle(),
    username: player.getName(),
  },
});
