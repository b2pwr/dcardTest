import { combineReducers } from 'redux';

const input = (state = { repos: [] }, action) => {
  switch (action.type) {
    case 'GET_REPOS_SUCCESS':
      return {
        ...state,
        keywords: action.keywords,
        repos: state.repos.concat(action.repos),
        nextPage: action.nextPage + 1,
        isSearching: action.isSearching,
      };
    case 'GET_REPOS_FAILED':
      return {
        ...state,
        error: action.error,
        isSearching: action.isSearching,
      };
    case 'INPUT_CHANGED':
      return {
        ...state,
        keywords: action.keywords,
        nextPage: 1,
        repos: [],
      };
    case 'IS_SEARCHING': 
      return {
        ...state,
        isSearching: action.isSearching,
      };
    default:
      return state;
  }
};

export default combineReducers({
  inputReducer: input,
});
