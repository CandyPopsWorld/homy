import { useDispatch } from "react-redux";
import { deleteMainBookmark, forceChangeDisplayUpdateMainBookmarkModal, writeLocalUpdateBookmark } from "../../redux/actions/mainBookmarks";
import {Reorder} from 'framer-motion';
import { useState } from "react";
function MainBookmarksItem({url, name, index, item}) {

    const dispatch = useDispatch();
    const [style, setStyle] = useState({'pointerEvents': 'all', 'cursor': 'pointer'});

    const onTransitionMainBookmarks = () => {
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.click();
        a.remove();
    };

    const onDeleteMainBookmark = (e) => {
        e.stopPropagation();
        dispatch(deleteMainBookmark(index));
    };

    const onUpdateMainBookmark = async (e) => {
        e.stopPropagation();
        await dispatch(writeLocalUpdateBookmark({url, name, index}));
        await dispatch(forceChangeDisplayUpdateMainBookmarkModal(true));
    };

    return (
        <Reorder.Item
        value={item} 
        as="div"
        whileDrag={{
            scale: 1.1
        }}
        onClick={onTransitionMainBookmarks}
        onDragStart={() => {
            setStyle({'pointerEvents': 'none', 'cursor': 'pointer'});
        }}
        onDragEnd={() => {
            setTimeout(() => {
                setStyle({'pointerEvents': 'all', 'cursor': 'pointer'});
            }, 200)
        }}
        style={style}
        className="homy_main_bookmarks_list_item">
            <div className="homy_main_bookmarks_list_item_controls">
                <div className="homy_main_bookmarks_list_item_controls_item homy_main_bookmarks_list_item_controls_update" onClick={onUpdateMainBookmark}>
                    <i className="fa-solid fa-gear"></i>
                </div>
                <div className="homy_main_bookmarks_list_item_controls_item homy_main_bookmarks_list_item_controls_delete" onClick={onDeleteMainBookmark}>
                    <i className="fa-sharp fa-solid fa-circle-xmark"></i>
                </div>
            </div>
            <img height="16" width="16" src={'http://www.google.com/s2/favicons?domain=' + url} alt="logo"/>
            <p>{name.length > 20 ? name.substr(0, 20) + '...' : name}</p>
        </Reorder.Item>
    );
}

export default MainBookmarksItem;