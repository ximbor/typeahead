import { PostComment } from '../../../models/PostComment';

export class TypeAheadState {

    /** Indicates whether a search request is being performed  */
    searching: boolean;

    /** Text suggested while typing. */
    suggestedText: string;

    /** Text written while searching. */
    searchingText: string;

    /** Indicates whether suggestions list is collapsed. */
    suggestionsCollapsed: boolean;

    /** Items selected by the user while typing. */
    selectedItems: PostComment[];


    static defaultState(): TypeAheadState {
        const state = new TypeAheadState();
        state.searching = false;
        state.searchingText = '';
        state.suggestionsCollapsed = true;
        state.suggestedText = '';
        state.selectedItems = new Array<PostComment>();
        return state;
    }

}
