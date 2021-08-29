import { DataActionTypes } from "./data-types";

const INITIAL_STATE = {
  clickedData: null,
  datasArray: null,

  errors: null,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DataActionTypes.SET_CLICKED_DATA:
      return {
        ...state,
        clickedData: action.payload,
        errors: null,
      };
    case DataActionTypes.SET_DATAS_ARRAY:
      return {
        ...state,
        datasArray: action.payload,
        errors: null,
      };
    default:
      return state;
  }
};

export default dataReducer;
