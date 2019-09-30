import { fromJS } from 'immutable';
import {
  FETCH_DOC_SUCCESS,
  FETCH_DOC_FAILURE,
} from '../constants/docs';
import {pageRendered} from "../App";

const INITIAL_STATE = fromJS({
  docs: {},
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOC_SUCCESS:
      setTimeout(() => { pageRendered.next() }, 10);
      return state.mergeIn(['docs'], {
        [ action.payload.path ]: action.payload.body
      })
    case FETCH_DOC_FAILURE:
      return state.mergeIn(['docs'], {
        [ action.payload.path ]: '## You seem to have lost access to the file.<br/>Are you still connected to the network?'
      })
    default:
      return state;
  }
};
