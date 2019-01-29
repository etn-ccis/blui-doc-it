import { FETCH_DOC_PENDING } from '../constants/docs';
import { fetchMarkdownSuccess, fetchMarkdownFailure } from '../actions/docs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

export default $actions =>
  $actions
    .ofType(FETCH_DOC_PENDING)
    .switchMap(
      action =>
        Observable
          .ajax({ url: action.payload.path, responseType: 'text' })
          .map(xhr => fetchMarkdownSuccess(action.payload.path, xhr.response))
          .catch(err => [fetchMarkdownFailure(action.payload.path, err)])
    )