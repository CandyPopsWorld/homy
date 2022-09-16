import { validateUrl } from "./validateUrl";

export const validateProvider = (code, providerName, provider) => {
    let check = 0;
    if(code.length > 0 && code.length < 6 && code.substr(code.length - 1) === '/'){
        check += 1;
    }

    if(providerName.length > 0){
        check += 1;
    }

    if(validateUrl(provider)){
        check += 1;
    }

    if(check === 3){
        return true;
    }
    return false;
};