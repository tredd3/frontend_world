
//Actions only describe what happened, reducers describe how the application's state changes.
//Action object must contain type key and the remaining is up to you

/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'

/*
 * other constants
 */

// export enum VisibilityFilters {
//     SHOW_ALL,
//     SHOW_COMPLETED,
//     SHOW_ACTIVE
// }

/*
 * action creators
 */

export const addTodo = (text: string) => ({
    type: ADD_TODO,
    text
})
