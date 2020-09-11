import axios from 'axios';
import { put, all, call, takeEvery } from 'redux-saga/effects'
const BASE_URL = 'https://api.github.com/search/repositories';

function* searchRepo(action) {
  const {
    keywords = '',
    nextPage = 1,
  } = action;

  if(keywords.length > 0) {
    yield put({
      type: 'IS_SEARCHING',
      isSearching: true,
      keywords: action.keywords,
    });
    
    try {
      const data = yield call(axios, {
        url: `${BASE_URL}?q=${keywords}&sort=stars&order=desc&page=${nextPage}`,
        method: "get"
      });
      yield put({
        type: 'GET_REPOS_SUCCESS',
        keywords: action.keywords,
        repos: data.data.items,
        nextPage,
        isSearching: false,
      });
    } catch(error) {
      console.log('get repo failed', error);
      yield put({
        type: 'GET_REPOS_FAILED',
        error,
        isSearching: false,
      })
    }
  }
}

function* watchInput() {
  yield takeEvery('INPUT_CHANGED', searchRepo);
}

function* watchLoadMore() {
  yield takeEvery('LOAD_MORE', searchRepo);
}

export default function* rootSaga() {
  yield all([
    call(watchInput),
    call(watchLoadMore),
  ])
}