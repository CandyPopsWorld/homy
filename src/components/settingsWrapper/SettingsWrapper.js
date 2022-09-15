import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceChangeDisplaySettingsWrapper } from '../../redux/actions/homySettings';
import HistoryNavBlock from '../historyNavBlock/HistoryNavBlock';
import SettingsNavBlock from '../settingsNavBlock.js/SettingsNavBlock';
import KeyboardsShortcutsBlock from '../keyboardsShortcutsBlock/KeyboardsShortcutsBlock';
import './SettingsWrapper.scss';
function SettingsWrapper(props) {

    const dispatch = useDispatch();
    const displaySettingsWrapper = useSelector(state => state.homySettings.displaySettingsWrapper);
    
    const [activeNav, setActiveNav] = useState(2);

    const settingsNav = [
        {title: 'История', id: 1},
        {title: 'Настройки', id: 2},
        {title: 'Горячие клавиши', id: 3},
    ];


    let elements_nav = settingsNav.map(({title, active, id}) => {
        const navClass = classNames({
            'homy_settings_wrapper_nav_item': true,
            'active': activeNav === id
        });
        return (
            <div className={navClass} key={id}>
                <button onClick={() => setActiveNav(id)}>{title}</button>
            </div>
        )
    });

    let activeSlide = <SettingsNavBlock/>
    switch(activeNav){
        case 1:
            activeSlide = <HistoryNavBlock/>
            break;
        case 2:
            activeSlide = <SettingsNavBlock/>
            break;
        case 3:
            activeSlide = <KeyboardsShortcutsBlock/>
            break;
        default:
            break;
    };

    return (
        <div className='homy_settings_wrapper' style={displaySettingsWrapper ? {display: 'block'} : {display: 'none'}}>
            <div className="homy_settings_wrapper_back">
                <p onClick={() => dispatch(forceChangeDisplaySettingsWrapper(false))}>Вернуться назад</p>
            </div>
            <div className="homy_settings_wrapper_nav">
                {elements_nav}
            </div>
            <div className="homy_settings_wrapper_nav_block">
                {
                    activeSlide
                }
            </div>
        </div>
    );
};

export default SettingsWrapper;