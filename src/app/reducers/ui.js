import { fromJS } from 'immutable';
import { FETCH_DOC_SUCCESS, FETCH_DOC_PENDING, FETCH_DOC_FAILURE } from '../constants/docs';
import {findTitle} from '../util/findPageTitle';
import { UI_UPDATE_TITLE } from '../constants/ui';

const INITIAL_STATE = fromJS({
  surprise: false,
  framework: 'angular',
  pagetitle: null,
  showFooter: false
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOC_PENDING:
    case FETCH_DOC_FAILURE:
      return state.merge({
        showFooter: false
      })
    case FETCH_DOC_SUCCESS:
      return state.merge({
        pagetitle: findTitle(action.payload.path.substr(action.payload.path.lastIndexOf('/')+1).split('.')[0]) || 'Power Xpert Blue',
        showFooter: true
      });
    case UI_UPDATE_TITLE:
      return state.merge({
        pagetitle: findTitle(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1).split('.')[0]) || 'Power Xpert Blue'
      });
    default:
      return state;
  }
};

