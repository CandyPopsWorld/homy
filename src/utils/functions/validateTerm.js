import CryptoJS from "crypto-js";
export const validateTerm = (term, searchProviders) => {
    if(term.includes('~[') && term.includes(']~')){
        let localTerm = term.split(']~').pop();
        const array = [];
        searchProviders.forEach(({code, provider, providerName}) => {
            if(term.includes(code)){
                array.push({term: localTerm, url: provider, code, fullTerm: term, providerName: providerName});
            }
        });
        return array;
    };

    let baseCode = null;
    let baseProviderName = null;
    if(localStorage.getItem(process.env.REACT_APP_HOMY_LOCALSTORAGE)){
        const bytes = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem(process.env.REACT_APP_HOMY_LOCALSTORAGE)).baseCode, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        baseCode = originalText;

        const bytesBaseName = CryptoJS.AES.decrypt(JSON.parse(localStorage.getItem(process.env.REACT_APP_HOMY_LOCALSTORAGE)).baseProviderName, process.env.REACT_APP_SECRET_KEY_ENCRYPT);
        const originalBaseNameText = bytesBaseName.toString(CryptoJS.enc.Utf8);
        baseProviderName = originalBaseNameText;
    }

    return [{term, url: '', code: baseCode, fullTerm: term, providerName: baseProviderName}];
};