import { createSelector } from 'reselect';

export const selectInput = state => {
  return state.inputReducer;
}

export const selectKeywords = createSelector(
  selectInput,
  inputReducer => {
    return inputReducer.keywords || '';
  },
);

export const selectNextPage = createSelector(
  selectInput,
  inputReducer => {
    return inputReducer.nextPage || 1;
  },
);

export const selectRepos = createSelector(
  selectInput,
  inputReducer => {
    return inputReducer.repos || [];
  },
);

export const selectIsSearching = createSelector(
  selectInput,
  inputReducer => {
    return inputReducer.isSearching || false;
  },
);

export const selectError = createSelector(
  selectInput,
  inputReducer => {
    return inputReducer.error || false;
  },
);