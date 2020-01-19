// tslint:disable:component-selector
// tslint:disable:no-string-literal

import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { fromEvent, Observable, throwError , empty, merge} from 'rxjs';
import { map, debounceTime, tap, switchMap, distinctUntilChanged, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { PostComment } from 'src/app/models/PostComment';
import { TypeAheadState } from 'src/app/components/typeahead-field/state/TypeAheadState';
import { Store } from 'src/app/models/Store';
import { StartSearchAction, StopSearchAction, SetItemsAction,
  SetSuggestedTextAction, ShowSuggestionsAction, HideSuggestionsAction, ActionTypes, SetSearchedTextAction, SetSearchedTextAndSearchAction
} from './state/Actions';
import { Action } from 'src/app/models/Action';


@Component({
  selector: 'ta-typeahead-field',
  templateUrl: './typeahead-field.component.html',
  styleUrls: ['./typeahead-field.component.scss']
})
export class TypeaheadFieldComponent implements OnInit, OnDestroy, AfterViewInit {

  private searchStream$: Observable<PostComment[]>;
  private store: Store<TypeAheadState>;

  @Output() selected: EventEmitter<PostComment[]> = new EventEmitter();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.store.dispatch(new HideSuggestionsAction());
  }
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.store = new Store<TypeAheadState>(this.typeAheadReducer, TypeAheadState.defaultState());
  }

  ngOnDestroy() {
  }

  typeAheadReducer(state = TypeAheadState.defaultState(), action: Action) {

    switch (action.type) {

      case ActionTypes.StartSearch:
        return { ...state,
                  suggestionsCollapsed: true,
                  searchingText: action.payload.text,
                  searching: true
        };

      case ActionTypes.SetSearchedText:
        return {
          ...state,
          suggestionsCollapsed: true,
          searchingText: action.payload.text,
          searching: false
        };

      case ActionTypes.StopSearch:
        return { ...state, searching: false };

      case ActionTypes.ShowSuggestions:
        return { ...state, suggestionsCollapsed: false };

      case ActionTypes.HideSuggestions:
        return { ...state, suggestionsCollapsed: true };

      case ActionTypes.SetSearchedTextAndSearch: {

        return { ...state,
          selectedItems: [action.payload.item],
          searchingText: action.payload.text,
          suggestionsCollapsed: true
        };
      }

      case ActionTypes.SetSuggestedText: {
        let suggestedText = '';
        let suggestionsCollapsed = false;
        if (state.selectedItems.length > 0) {
          const comment = state.selectedItems[0];
          const text = state.searchingText.toLowerCase();
          const bodyIndex = PostComment.bodyIndex(comment, text);
          const nameIndex = PostComment.nameIndex(comment, text);
          const emailIndex = PostComment.emailIndex(comment, text);
          if (bodyIndex >= 0 ) {
            suggestedText = comment.body.substring(bodyIndex, bodyIndex + state.searchingText.length + 1);
          }
          if (nameIndex >= 0 ) {
            suggestedText = comment.name.substring(nameIndex, nameIndex + state.searchingText.length + 1);
          }
          if (emailIndex >= 0 ) {
            suggestedText = comment.email.substring(emailIndex, emailIndex + state.searchingText.length + 1);
          }
        }

        if (state.searchingText.length < 4) {
          suggestedText = '';
          suggestionsCollapsed = true;
        }

        return { ...state, suggestedText, suggestionsCollapsed };
      }
      case ActionTypes.SetItems:
        return { ...state,
          selectedItems: action.payload.items
                          .filter(item => PostComment.hasText(item, state.searchingText))
        };

      default:
        return state;
    }

  }

  ngAfterViewInit() {

    const input = document.querySelector('input.type-ahead-field');
    const submit = document.querySelector('button.submit-typed-search');

    const typeStream$ = fromEvent(input, 'input').pipe(
                          map((e: KeyboardEvent) => e.target['value']),
                          debounceTime(100),
                          distinctUntilChanged(),
                          switchMap(text => {
                            this.store.dispatch(new StartSearchAction({text}));
                            return this.apiService.getComments(text, 20);
                          }),
                          catchError((err) => {
                            this.store.dispatch(new StopSearchAction());
                            return throwError(err);
                          }),
                          tap( (items) => {
                            this.store.dispatch(new StopSearchAction());
                            this.store.dispatch(new SetItemsAction({items}));
                            this.store.dispatch(new SetSuggestedTextAction());
                          })
                        );

    const submitStream$ = fromEvent(submit, 'click').pipe(
                            map((e: Event) => {e.preventDefault(); return input['value']; }),
                            switchMap(text => {
                              this.store.dispatch(new StartSearchAction({text}));
                              return this.apiService.getComments(text, 20);
                            }),
                            catchError((err) => {
                              this.store.dispatch(new StopSearchAction());
                              return throwError(err);
                            }),
                            tap( (items) => {
                              this.store.dispatch(new StopSearchAction());
                              this.store.dispatch(new SetItemsAction({items}));
                              this.store.dispatch(new HideSuggestionsAction());
                              this.selected.emit(this.store.getState().selectedItems);
                            })
                          );

    this.searchStream$ = merge(typeStream$, submitStream$);
  }

  setText(suggestion: PostComment) {
    this.store.dispatch(new SetSearchedTextAndSearchAction
        ({item: suggestion, text: this.getSuggestedText(suggestion)}));
  }

  showSuggestionsList() {
    this.store.dispatch(new ShowSuggestionsAction());
  }

  getSuggestedText(comment: PostComment) {

    const text = this.store.getState().searchingText.toLowerCase();
    const bodyIndex = PostComment.bodyIndex(comment, text);
    const nameIndex = PostComment.nameIndex(comment, text);
    const emailIndex = PostComment.emailIndex(comment, text);

    if (bodyIndex >= 0 ) {
      return comment.body.substring(bodyIndex, bodyIndex + 20);
    }

    if (nameIndex >= 0 ) {
      return comment.name.substring(nameIndex, nameIndex + 20);
    }

    if (emailIndex >= 0 ) {
      return comment.email.substring(emailIndex, emailIndex + 20);
    }

    return comment.body;

  }

}
