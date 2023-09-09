import React from "react";
import {TodoCounter} from "./TodoCounter";
import {TodoSearch} from "./TodoSearch";
import {TodoList} from "./TodoList";
import {TodoItem} from "./TodoItem";
import {CreateTodoButton} from "./CreateTodoButton";


const defaultTodos = [
    {text: 'Cortar cebolla', completed: true},
    {text: 'Cortar tomate', completed: true},
    {text: 'Cortar limon', completed: false},
    {text: 'Cortar naranja', completed: true}
];

function App() {
    const [todos, setTodos] = React.useState(defaultTodos);
    const [searchValue, setSearchValue] = React.useState('');

    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;

    const searchedTodos = todos.filter(
        (todo) => {
            return todo.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        }
    );

    return (
        <React.Fragment>
            <TodoCounter completed={completedTodos} total={totalTodos}/>
            <TodoSearch
                searchValue = {searchValue}
                setSearchValue = {setSearchValue}
            />
            <TodoList>
                {searchedTodos.map(todo => (
                    <TodoItem key={todo.text} text={todo.text} completed={todo.completed}/>
                ))}
            </TodoList>
            <CreateTodoButton/>
        </React.Fragment>
    );
}

export default App;
