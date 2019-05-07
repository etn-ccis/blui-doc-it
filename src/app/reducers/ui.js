import { fromJS } from 'immutable';
import { FETCH_DOC_SUCCESS, FETCH_DOC_PENDING, FETCH_DOC_FAILURE } from '../constants/docs';
import {findTitle} from '../util/findPageTitle';
import { UI_UPDATE_TITLE, SHOW_MOBILE, HIDE_MOBILE, TOGGLE_MOBILE } from '../constants/ui';
import ReactGA from 'react-ga';
import { gaID } from '../../ga.js';

if( gaID ){
  ReactGA.initialize(gaID);
}

const INITIAL_STATE = fromJS({
  surprise: false,
  framework: 'angular',
  pagetitle: null,
  showFooter: false,
  pageURL: null,
  mobileMenuOpen: false
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_DOC_PENDING:
    case FETCH_DOC_FAILURE:
      return state.merge({
        showFooter: false,
        pageURL: '404'
      })
    case FETCH_DOC_SUCCESS:
      if(gaID){ReactGA.pageview((action.payload.path.substr(action.payload.path.lastIndexOf('/')+1).split('.')[0]) || 'Power Xpert Blue');}
      return state.merge({
        pagetitle: findTitle(action.payload.path.substr(action.payload.path.lastIndexOf('/')+1).split('.')[0]) || 'Power Xpert Blue',
        showFooter: true,
        pageURL: action.payload.path
      });
    case UI_UPDATE_TITLE:
      if(gaID){ ReactGA.pageview(window.location.pathname + window.location.search); }
      return state.merge({
        pagetitle: findTitle(window.location.pathname.substr(window.location.pathname.lastIndexOf('/')+1).split('.')[0]) || 'Power Xpert Blue',
        pageURL: window.location.pathname
      });
    case SHOW_MOBILE:
      return state.merge({
        mobileMenuOpen: true
      });
    case HIDE_MOBILE:
      return state.merge({
        mobileMenuOpen: false
      });
    case TOGGLE_MOBILE:
      return state.merge({
        mobileMenuOpen: !state.get('mobileMenuOpen')
      });
    default:
      return state;
  }
};

