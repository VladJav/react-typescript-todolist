import React, {useEffect, useRef, useState} from 'react';
import {Todo} from "../model/model";
import {AiFillDelete, AiFillEdit} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Actions} from "../reducer/todoReducer";
import {Draggable} from "react-beautiful-dnd";

interface Props{
    todo: Todo;
    dispatch: React.Dispatch<Actions>;
    index: number;
}

const SingleTodo = ({todo, dispatch, index} : Props) => {

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [edit, setEdit] = useState<string>(todo.content);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        inputRef.current?.focus();
    }, [isEditing]);

    const handleDone = (id: number) => {
        dispatch({type: 'done', payload: id});
    };

    const handleDelete = (id: number) => {
        dispatch({type: 'remove', payload: id});
    };

    const handleEdit = (e : React.FormEvent) => {
        e.preventDefault();

        const id = todo.id;

        dispatch({type: 'edit', payload: { id, content: edit}});

        setIsEditing(false);
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided)=>(
                    <form className="todos__single" onSubmit={handleEdit} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {
                            isEditing ? (
                                <input ref={inputRef} value={edit} onChange={(e)=>{setEdit(e.target.value)}} className="todos__single--text"/>
                            ) : (
                                todo.isDone ? (
                                    <s className="todos__single--text">{todo.content}</s>
                                ) : (
                                    <span className="todos__single--text">{todo.content}</span>
                                ))
                        }

                        <div>
            <span className="icon"
                  onClick={()=>{
                      if(!isEditing && !todo.isDone){
                          setIsEditing(!isEditing);
                      }
                  }}
            >
                <AiFillEdit/>
            </span>
                            <span className="icon">
                <AiFillDelete onClick={ () => handleDelete(todo.id)}/>
            </span>
                            <span className="icon">
                <MdDone onClick={ () => handleDone(todo.id)}/>
            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
};

export default SingleTodo;