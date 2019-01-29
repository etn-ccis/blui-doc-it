import { combineEpics } from 'redux-observable';
import fetchMarkdown from './fetchMarkdown';

export default combineEpics(
  fetchMarkdown,
);