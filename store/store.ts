import { createStore } from "redux";
import { playerReducer } from "./playerReducers";

const store = createStore(playerReducer);

export default store;
