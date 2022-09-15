export const mainThemes = {
    darkTheme: {
        mainBg: '#00111c',
        mainBookmarksBg: 'rgba(0, 0, 0, .7)',
        mainBookmarksNameColor: '#ffffff',
        mainBookmarksControlsColor: '#ffffff',
        mainBookmarksControlsHoverColor: 'rebeccapurple',
        searchInputColor: '#ffffff',
        searchInputPlaceholderColor: '#ffffff',
        searchInputBorderColor: '#000000',
        searchHintsModalBg: '#000000',
        searchHintsIconsColor: 'rebeccapurple',
        searchHintsIconsTextColor: '#ffffff',
        searchHintsItemHoverColor: '#00111c',
        searchHintsItemProvidersColor: 'gray',
        searchHintsItemTermColor: '#ffffff',
        settingsBtnBg: 'rgba(0, 0, 0, .5)',
        settingsBtnHoverBg: 'rgba(0, 0, 0, .8)',
        settingsBtnColor: 'gray',
    },
    lightTheme: {
        mainBg: '#ffffff',
        mainBookmarksBg: 'rgba(0, 0, 0, .7)',
        mainBookmarksNameColor: '#ffffff',
        mainBookmarksControlsColor: '#ffffff',
        mainBookmarksControlsHoverColor: 'rebeccapurple',
        searchInputColor: '#ffffff',
        searchInputPlaceholderColor: '#ffffff',
        searchInputBorderColor: '#000000',
        searchHintsModalBg: '#000000',
        searchHintsIconsColor: 'rebeccapurple',
        searchHintsIconsTextColor: '#ffffff',
        searchHintsItemHoverColor: '#00111c',
        searchHintsItemProvidersColor: 'gray',
        searchHintsItemTermColor: '#ffffff',
        settingsBtnBg: 'rgba(0, 0, 0, .5)',
        settingsBtnHoverBg: 'rgba(0, 0, 0, .8)',
        settingsBtnColor: 'gray',
    }
};

export const colorsThemes = {
    orangeredTheme: {
        mainBg: 'orangered',
        mainBookmarksBg: 'rgba(0, 0, 0, .7)',
        mainBookmarksNameColor: '#ffffff',
        mainBookmarksControlsColor: '#ffffff',
        mainBookmarksControlsHoverColor: 'rebeccapurple',
        searchInputColor: '#ffffff',
        searchInputPlaceholderColor: '#ffffff',
        searchInputBorderColor: '#000000',
        searchHintsModalBg: '#000000',
        searchHintsIconsColor: 'rebeccapurple',
        searchHintsIconsTextColor: '#ffffff',
        searchHintsItemHoverColor: '#00111c',
        searchHintsItemProvidersColor: 'gray',
        searchHintsItemTermColor: '#ffffff',
        settingsBtnBg: 'rgba(0, 0, 0, .5)',
        settingsBtnHoverBg: 'rgba(0, 0, 0, .8)',
        settingsBtnColor: 'gray',
    },
    greenTheme: {
        mainBg: 'green',
        mainBookmarksBg: 'rgba(0, 0, 0, .7)',
        mainBookmarksNameColor: '#ffffff',
        mainBookmarksControlsColor: '#ffffff',
        mainBookmarksControlsHoverColor: 'rebeccapurple',
        searchInputColor: '#ffffff',
        searchInputPlaceholderColor: '#ffffff',
        searchInputBorderColor: '#000000',
        searchHintsModalBg: '#000000',
        searchHintsIconsColor: 'rebeccapurple',
        searchHintsIconsTextColor: '#ffffff',
        searchHintsItemHoverColor: '#00111c',
        searchHintsItemProvidersColor: 'gray',
        searchHintsItemTermColor: '#ffffff',
        settingsBtnBg: 'rgba(0, 0, 0, .5)',
        settingsBtnHoverBg: 'rgba(0, 0, 0, .8)',
        settingsBtnColor: 'gray',
    }
};

export const keysThemes = {
    darkTheme: 'darkTheme',
    lightTheme: 'lightTheme',
    orangeredTheme: 'orangeredTheme',
    greenTheme: 'greenTheme'
}

export const mainThemeSchemes = [
    {theme: keysThemes.lightTheme, color: 'white', name: 'Светлая', id: 1, object: mainThemes[keysThemes.lightTheme]},
    {theme: keysThemes.darkTheme, color: 'black', name: 'Темная', id: 2, object: mainThemes[keysThemes.darkTheme]},
];

export const colorsThemesSchemes = [
    {theme: keysThemes.orangeredTheme, color: 'orangered', id: 3, object: colorsThemes[keysThemes.orangeredTheme]},
    {theme: keysThemes.greenTheme, color: 'green', id: 4, object: colorsThemes[keysThemes.greenTheme]},
];