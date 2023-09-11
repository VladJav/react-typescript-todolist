import {Todo} from "../model/model";

export type Actions =
    | {type: 'add', payload: string}
    | {type: 'remove', payload: number}
    | {type: 'done', payload: number}
    | {type: 'edit', payload: { id: number, content: string}}
    | {type: 'update', payload: { id: number, content: string, isDone: boolean}}

export const TodoReducer = (state: Todo[], action: Actions) => {
    switch (action.type){
        case "add":
            return [...state, {id: Date.now(), content: action.payload, isDone: false}];
        case "done":
            return state.map((todo)=>
                todo.id===action.payload ? {...todo, isDone: !todo.isDone} : todo)
        case "remove":
            return state.filter((todo)=> todo.id!==action.payload);
        case 'edit':
            return state.map((todo) => (
                todo.id===action.payload.id ? {...todo, content: action.payload.content} : todo
            ));
        case 'update':
            return state.map((todo) => (
                todo.id===action.payload.id ? {...todo, isDone: action.payload.isDone, content: action.payload.content} : todo
            ));
        default:
            return state;
    }
};