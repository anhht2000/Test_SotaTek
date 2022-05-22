import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import commonReducer from "./common.reducer";
import todoReducer from "./todo.reducer";

const persistConfigTodo = {
  key: "todo",
  storage,
  whitelist: ["todos"],
};

const rootReducer = combineReducers({
  common: commonReducer,
  todo: persistReducer(persistConfigTodo, todoReducer),
});

export default rootReducer;
