export const transformNumber = (num) => {
    if(num <= 9){
        return `0${num}`;
    }
    return String(num);
};