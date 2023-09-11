import React from "react";

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


export {useLocalStorage};