import { useDispatch, useSelector } from 'react-redux';
import { changeDisplaySettingsModal } from '../../redux/actions/settings';
import './Settings.scss';
function Settings(props) {

    const dispatch = useDispatch();
    const displayModal = useSelector(state => state.settings.displayModal);

    return (
        <div className='homy_settings'>
            <button 
            className='homy_settings_btn'
            onClick={() => dispatch(changeDisplaySettingsModal())}>Все настройки</button>
            
            <div className="homy_settings_modal" style={displayModal ? {display: 'block'} : {display: 'none'}}>

            </div>
        </div>
    );
}

export default Settings;