import { Action } from '../../../models/Action';

export enum ActionTypes {
    StartSearch                 = '[Type ahead] START_SEARCH',
    StopSearch                  = '[Type ahead] STOP_SEARCH',
    SetSuggestedText            = '[Type ahead] SET_SUGGESTED_TEXT',
    SetItems                    = '[Type ahead] SET_ITEMS',
    SetSearchedText             = '[Type ahead] SET_SEARCHED_TEXT',
    ShowSuggestions             = '[Type ahead] SHOW_SUGGESTIONS',
    HideSuggestions             = '[Type ahead] HIDE_SUGGESTIONS',
    SetSearchedTextAndSearch    = '[Type ahead] SET_SEARCHED_TEXT_AND_SEARCH'
}

export class StartSearchAction implements Action {
    readonly type = ActionTypes.StartSearch;

    constructor(public payload: { text: string; }) {}
}

export class SetSearchedTextAction implements Action {
    readonly type = ActionTypes.SetSearchedText;

    constructor(public payload: { text: string; }) {}
}


export class StopSearchAction implements Action {
    readonly type = ActionTypes.StopSearch;

    constructor() {}
}

export class SetSuggestedTextAction implements Action {
    readonly type = ActionTypes.SetSuggestedText;

    constructor() {}
}

export class SetSearchedTextAndSearchAction implements Action {
    readonly type = ActionTypes.SetSearchedTextAndSearch;

    constructor(public payload: { item: any; text: string }) {}
}

export class SetItemsAction implements Action {
    readonly type = ActionTypes.SetItems;

    constructor(public payload: { items: any[] }) {}
}

export class ShowSuggestionsAction implements Action {
    readonly type = ActionTypes.ShowSuggestions;

    constructor() {}
}

export class HideSuggestionsAction implements Action {
    readonly type = ActionTypes.HideSuggestions;

    constructor() {}
}
