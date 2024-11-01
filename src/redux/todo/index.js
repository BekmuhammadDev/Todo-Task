import { createSlice } from "@reduxjs/toolkit";
import { body } from "framer-motion/client";

const initialState={
    todos: [
        {
            id: 1,
            title: "task-1",
            body:"lorem ipsum dolor sit amet, consectetur adip",
            completed: false,
        },
        {
            id: 2,
            title: "task-2",
            body:"lorem ipsum dolor sit amet, consectetur adip",
            completed: true,
        },
    ],
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
        state.todos=state.todos.filter(todo => todo.id!== action.payload);
        },

        updateTodo: (state, action) => {
            state.todos.forEach((el)=>{
                if(el.id===action.payload){
                   if( el.completed){
                     el.completed=false;
                   }else{
                     el.completed=true;
                   }
                }
            })
        }
        
    },
})

export const { addTodo, deleteTodo,updateTodo } = todoSlice.actions;
export default todoSlice.reducer;