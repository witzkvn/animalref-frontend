import { combineReducers } from "redux";
import dataReducer from "./data/data-reducer";
import userReducer from "./user/user-reducer";
import layoutReducer from "./layout/layout-reducer";
import searchReducer from "./search/search-reducer";

export default combineReducers({
  user: userReducer,
  datas: dataReducer,
  layout: layoutReducer,
  search: searchReducer,
});
