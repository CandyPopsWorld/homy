import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uid } from 'uid';
import { createMainBookmark, forceChangeDisplayMainBookmarksModal } from '../../redux/actions/mainBookmarks';
import { validateUrl } from '../../utils/functions/validateUrl';
import './ModalCreateMainBookmark.scss';
function ModalCreateMainBookmark(props) {

    const dispatch = useDispatch();
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');

    const onCreateMainBookmark = async () => {
        if(url !== '' && validateUrl(url)){
            const bookmark = {
                url,
                uid: uid(1000),
                name: name.length > 0 ? name : ''
            };
            await dispatch(createMainBookmark(bookmark));
            await clearForm();
            await dispatch(forceChangeDisplayMainBookmarksModal(false));
        }
    };
    
    const clearForm = () => {
        setUrl('');
    };

    return (
        <div className="homy_modal_create_main_bookmark">
            <input 
            className='homy_modal_create_main_bookmark_url' 
            type="url" 
            placeholder='Введите адрес сайта...'
            value={url}
            onChange={(e) => setUrl(e.target.value)}/>
            <input 
            type="text" 
            className='homy_modal_create_main_bookmark_name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Введите имя закладки(необязательное поле)...'/>
            <button 
            className='homy_modal_create_main_bookmark_create'
            onClick={onCreateMainBookmark}>Создать</button>
        </div>
    );
}

export default ModalCreateMainBookmark;