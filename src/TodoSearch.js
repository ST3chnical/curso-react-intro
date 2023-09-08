import React from "react";
import './TodoSearch.css';

function TodoSearch() {
    const [searchValue, setSearchValue] = React.useState('');

    return (
        <input placeholder="Cortar cebolla"
               value={searchValue}
               className='TodoSearch'
               onChange={(event) => {
                   setSearchValue(event.target.value)
               }}
        />
    );
}

export {TodoSearch};
