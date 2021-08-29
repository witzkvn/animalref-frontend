import { SearchActionTypes } from "./search-types";

const params = new URL(document.location).searchParams;
const query = params.get("query");
const sort = params.get("sort");
const category = params.get("category")?.split(",");
const page = params.get("page");

const INITIAL_STATE = {
  totalPages: 1,
  currentPage: 1,
  searchParams: {
    searchWords: (query && decodeURI(query)) || "",
    searchOrder: sort || "-createdAt",
    searchCategory: category || [],
    searchPage: page || 1,
  },
  errors: null,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SET_TOTAL_PAGES_RESULTS:
      return {
        ...state,
        totalPages: action.payload,
      };
    case SearchActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SearchActionTypes.SET_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default searchReducer;
