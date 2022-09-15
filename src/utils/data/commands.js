import { encryprData } from '../functions/encryprData';
export const searchProviders = [
    {code: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_GOOGLE_CODE), provider: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_GOOGLE), providerName: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_GOOGLE_NAME), role: encryprData('default')},
    {code: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_YANDEX_CODE), provider: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_YANDEX), providerName: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_YANDEX_NAME), role: encryprData('default')},
    {code: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_YOUTUBE_CODE), provider: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_YOUTUBE), providerName: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_YOUTUBE_NAME), role: encryprData('default')},
    {code: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_GITHUB_CODE), provider: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_GITHUB), providerName: encryprData(process.env.REACT_APP_SEARCH_DEFAULT_PROVIDER_GITHUB_NAME), role: encryprData('default')},
];