import React from "react";
import {TodoCounter} from "./TodoCounter";
import {TodoSearch} from "./TodoSearch";
import {TodoList} from "./TodoList";
import {TodoItem} from "./TodoItem";
import {CreateTodoButton} from "./CreateTodoButton";


// const defaultTodos = [
//     {text: 'Cortar cebolla', completed: false},
//     {text: 'Cortar tomate', completed: false},
//     {text: 'Cortar limon', completed: false},
//     {text: 'Cortar naranja', completed: false}
// ];
//
// localStorage.setItem('TODOS_V1', defaultTodos);
// localStorage.removeItem('TODOS_V1');

function useLocalStorage(itemName, initialValue) {
    const localStorageItems = localStorage.getItem(itemName);

    let parsedItems;

    if(!localStorageItems){
        localStorage.setItem(itemName, JSON.stringify(initialValue));
        parsedItems = initialValue;
    }else {
        parsedItems = JSON.parse(localStorageItems);
    }

    const [item, setItem] = React.useState(parsedItems);

    const saveItems = (newItems) => {
        localStorage.setItem(itemName, JSON.stringify(newItems));
        setItem(newItems);
    };

    return [item, saveItems];
}

function App() {


    const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');

    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;

    const searchedTodos = todos.filter(
        (todo) => {
            return todo.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        }
    );



    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
    };

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
            (todo) => todo.text === text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    };

    return (
        <React.Fragment>
            <TodoCounter completed={completedTodos} total={totalTodos}/>
            <TodoSearch
                searchValue = {searchValue}
                setSearchValue = {setSearchValue}
            />
            <TodoList>
                {searchedTodos.map(todo => (
                    <TodoItem
                        key={todo.text}
                        text={todo.text}
                        completed={todo.completed}
                        onComplete={() => completeTodo(todo.text)}
                        onDelete={() => deleteTodo(todo.text)}
                    />
                ))}
            </TodoList>
            <CreateTodoButton/>
        </React.Fragment>
    );
}

export default App;
