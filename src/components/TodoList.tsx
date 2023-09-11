import React from 'react';
import './styles.css';
import {Todo} from "../model/model";
import SingleTodo from "./SingleTodo";
import {Actions} from "../reducer/todoReducer";
import {Droppable} from "react-beautiful-dnd";

interface Props{
    todos: Todo[];
    dispatch: React.Dispatch<Actions>;
}

const TodoList = ({todos, dispatch} : Props) => {
    const removedTodos: Todo[] = todos.filter((todo)=>todo.isDone);
    const processTodos: Todo[] = todos.filter((todo)=>!todo.isDone);
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {
                    (provided) => (
                        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">New Tasks</span>
                            {
                                processTodos.map((todo, index)=>(
                                    <SingleTodo
                                        index={index}
                                        todo={todo}
                                        key={todo.id}
                                        dispatch={dispatch}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {
                    (provided) => (
                        <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos__heading">Completed Tasks</span>
                            {
                                removedTodos.map((todo, index)=>(
                                    <SingleTodo
                                        index={index}
                                        todo={todo}
                                        key={todo.id}
                                        dispatch={dispatch}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>

        </div>
    );
};

export default TodoList;