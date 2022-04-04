import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import commonReducer from "./common.reducer";

const persistConfigAuth = {
  key: "auth",
  storage,
  whitelist: ["isLogin", "user"],
};

const rootReducer = combineReducers({
  common: persistReducer(persistConfigAuth, commonReducer),
});

export default rootReducer;
