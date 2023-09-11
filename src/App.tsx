import React, {useReducer, useState} from 'react';
import './App.css';
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import {TodoReducer} from "./reducer/todoReducer";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {Todo} from "./model/model";

const App = () => {

    const [todo, setTodo] = useState<string>('');
    const [state, dispatch] = useReducer(TodoReducer, []);

    const handleAdd = (e: React.FormEvent): void => {
        e.preventDefault();

        if(todo){
            dispatch({type: 'add', payload: todo});
        }

    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if(!destination) return;
        if(destination.droppableId===source.droppableId && destination.index===source.index) return;

        console.log(state[source.index])
        if(destination.droppableId==='TodosList' && source.droppableId!=='TodosList'){
            const removedTodos: Todo[] = state.filter((todo)=>todo.isDone);
            dispatch(({type: 'update', payload: {
                    id: removedTodos[source.index].id,
                    content: removedTodos[source.index].content,
                    isDone: false
                }}));
        }
        else if(destination.droppableId==='TodosRemove' && source.droppableId!=='TodosRemove'){
            const processTodos: Todo[] = state.filter((todo)=>!todo.isDone);
            dispatch(({type: 'update', payload: {
                    id: processTodos[source.index].id,
                    content: processTodos[source.index].content,
                    isDone: true
                }}));
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <div className="heading">
                    Taskify
                </div>
                <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
                <TodoList dispatch={dispatch} todos={state}/>
            </div>
        </DragDropContext>
  );
}

export default App;
