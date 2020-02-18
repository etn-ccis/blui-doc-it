import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router';
// import { History } from 'history';
// import { AppActions } from '../actions/actionTypes';

export type AppState = {
    app: CommonState;
}
type CommonState = {
    pageTitle: string;
}
const initialAppState: CommonState = {
    pageTitle: ''
}
const appReducer = (state = initialAppState, action: any): CommonState => {
    switch (action.type) {
        case 'changename':
            return {
                ...state,
                pageTitle: action.payload,
            };
        default:
            return state;
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Reducer = (/*history: History<any>*/): any =>
    combineReducers<AppState>({
        // The following broke in a new version of something related to react-router.
        // Might have been type types file for one of those libraries. It came up
        // when 'npm install' on CI brought in a newer version, and then we upgraded
        // to get the same version because 'yarn install' doesn't work in CI. Using
        // "as any" to get around the type problem. Things seem to work just fine.
        // router: connectRouter(history) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        app: appReducer,
    });