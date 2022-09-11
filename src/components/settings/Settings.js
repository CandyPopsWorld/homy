import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeViewMode } from '../../redux/actions/homySettings';
import { changeDisplaySettingsModal } from '../../redux/actions/settings';
import './Settings.scss';
function Settings(props) {

    const dispatch = useDispatch();
    const {settingsBtnBg, settingsBtnColor, settingsBtnHoverBg} = useSelector(state => {
        if(state.homySettings.homySettings){
            return state.homySettings.homySettings.colors;
        }
    });

    const [style, setStyle] = useState({'backgroundColor': settingsBtnBg, 'color': settingsBtnColor});

    return (
        <div className='homy_settings'>
            <button 
            className='homy_settings_btn'
            onClick={() => dispatch(changeDisplaySettingsModal())}
            style={style}
            onMouseEnter={() => setStyle({'backgroundColor': settingsBtnHoverBg, 'color': settingsBtnColor})}
            onMouseLeave={() => setStyle({'backgroundColor': settingsBtnBg, 'color': settingsBtnColor})}>Все настройки</button>
            <SettingsModal/>
        </div>
    );
};

const SettingsModal = () => {
    const dispatch = useDispatch();
    const displayModal = useSelector(state => state.settings.displayModal);
    const viewMode = useSelector(state => state.homySettings.homySettings.view.viewMode);

    const [viewThumbnail, setViewThumbnail] = useState('');

    const viewData = [
        {title: 'Классический',viewMode: 'classicView', id: 1},
        {title: 'Рабочий',viewMode: 'workView', id: 2},
        {title: 'Минимальный',viewMode: 'minView', id: 3},
    ];

    let view_form_elements = viewData.map(item => {
        return (
            <div className="homy_settings_modal_view_wrapper_form_item" key={item.id}>
                <label 
                className='homy_settings_modal_label' 
                htmlFor={item.viewMode}
                onMouseEnter={() => setViewThumbnail(item.viewMode)}
                onMouseLeave={() => setViewThumbnail(viewMode)}>{item.title}</label>
                <input 
                className='homy_settings_modal_radio' 
                type="radio" 
                name='view' 
                id={item.viewMode} 
                value={item.viewMode} 
                onChange={(e) => dispatch(changeViewMode(e.target.value))}
                checked={viewMode === item.viewMode ? 'checked' : ''}/>
            </div>
        )
    })

    useEffect(() => {
        setViewThumbnail(viewMode);
    }, [viewMode])

    return (
        <div className="homy_settings_modal" style={displayModal ? {display: 'block'} : {display: 'none'}}>
            <div className="homy_settings_modal_view">
                <div className="homy_settings_modal_view_header">
                    <h3 className='homy_settings_modal_view_header_text'>Настроить вид первого экрана</h3>
                </div>
                <div className="homy_settings_modal_view_wrapper">
                    <div className="homy_settings_modal_view_wrapper_form">
                        {view_form_elements}
                    </div>

                    <div className="homy_settings_modal_view_wrapper_thumbnail">
                        <img className='homy_settings_modal_thumb' src={viewThumbnail ? require(`../../resources/image/view/${viewThumbnail}.PNG`) : ''} alt="view" />
                    </div>
                </div>
                <div className="homy_settings_modal_view_link">
                    <p className='homy_settings_modal_view_link_text'>Все настройки интерфейса</p>
                </div>
            </div>
            <div className="homy_settings_modal_all_settings">
                <p className="homy_settings_modal_all_settings_link">Все настройки</p>
            </div>
        </div>
    )
};

export default Settings;