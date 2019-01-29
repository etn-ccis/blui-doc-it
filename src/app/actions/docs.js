import {
  FETCH_DOC_PENDING,
  FETCH_DOC_SUCCESS,
  FETCH_DOC_FAILURE,
} from '../constants/docs';

export const fetchMarkdown = path => ({
  type: FETCH_DOC_PENDING,
  payload: {
    path,
  }
});

export const fetchMarkdownSuccess = (path, body) => ({
  type: FETCH_DOC_SUCCESS,
  payload: {
    path,
    body,
  }
});

export const fetchMarkdownFailure = (path, error) => ({
  type: FETCH_DOC_FAILURE,
  payload: {
    path,
  },
  error,
});