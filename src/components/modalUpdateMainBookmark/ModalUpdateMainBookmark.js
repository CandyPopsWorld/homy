import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forceChangeDisplayUpdateMainBookmarkModal, updateMainBookmark } from "../../redux/actions/mainBookmarks";
import { validateUrl } from "../../utils/functions/validateUrl";

function ModalUpdateMainBookmark() {

    const dispatch = useDispatch();
    const localUpdateBookmark = useSelector(state => state.mainBookmarks.localUpdateBookmark);
    const [urlLocal, setUrlLocal] = useState(localUpdateBookmark.url);
    const [nameLocal, setNameLocal] = useState(localUpdateBookmark.name);
    
    const onUpdateMainBookmark = async () => {
        if(urlLocal !== '' && validateUrl(urlLocal)){
            await dispatch(updateMainBookmark({url: urlLocal, name: nameLocal, index: localUpdateBookmark.index}));
            await dispatch(forceChangeDisplayUpdateMainBookmarkModal(false));
        }
    };

    return (
        <div className="homy_modal_create_main_bookmark">
            <input 
            className='homy_modal_create_main_bookmark_url' 
            type="url" 
            placeholder='Адрес сайта...'
            value={urlLocal}
            onChange={(e) => setUrlLocal(e.target.value)}/>
            <input 
            type="text" 
            className='homy_modal_create_main_bookmark_name'
            value={nameLocal}
            onChange={(e) => setNameLocal(e.target.value)}
            placeholder='Имя закладки'/>
            <button 
            className='homy_modal_create_main_bookmark_create'
            onClick={onUpdateMainBookmark}>Обновить</button>
        </div>
    );
}

export default ModalUpdateMainBookmark;