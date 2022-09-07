export const getItemLocalStorage = (path) => {
    if(localStorage.getItem(path)){
        return JSON.parse(localStorage.getItem(path));
    }
};

export const setItemLocalStorage = (path, data) => {
    localStorage.setItem(path,JSON.stringify(data));
};