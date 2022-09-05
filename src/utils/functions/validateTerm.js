import { searchProviders } from "../data/commands";

export const validateTerm = (term) => {
    if(term.includes('~[') && term.includes(']~')){
        let localTerm = term.split(']~').pop();
        const array = [];
        searchProviders.forEach(({code, provider}) => {
            if(term.includes(code)){
                array.push({term: localTerm, url: provider})
            }
        });

        return array;
    }
    return [{term, url: ''}];
};