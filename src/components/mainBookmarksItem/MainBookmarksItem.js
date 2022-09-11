import { useDispatch, useSelector } from "react-redux";
import { deleteMainBookmark, forceChangeDisplayUpdateMainBookmarkModal, writeLocalUpdateBookmark } from "../../redux/actions/mainBookmarks";
import {Reorder} from 'framer-motion';
import { useState } from "react";
function MainBookmarksItem({url, name, index, item}) {

    const dispatch = useDispatch();
    const {mainBookmarksBg, mainBookmarksNameColor, mainBookmarksControlsColor, mainBookmarksControlsHoverColor} = useSelector(state => {
        if(state.homySettings.homySettings){
            return state.homySettings.homySettings.colors;
        }
    });

    const [style, setStyle] = useState({'pointerEvents': 'all', 'cursor': 'pointer', 'backgroundColor': mainBookmarksBg});
    const [styleControlsUpdate, setStyleControlsUpdate] = useState({'color': mainBookmarksControlsColor});
    const [styleControlsDelete, setStyleControlsDelete] = useState({'color': mainBookmarksControlsColor});

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
            setStyle({'pointerEvents': 'none', 'cursor': 'pointer', 'backgroundColor': mainBookmarksBg});
        }}
        onDragEnd={() => {
            setTimeout(() => {
                setStyle({'pointerEvents': 'all', 'cursor': 'pointer', 'backgroundColor': mainBookmarksBg});
            }, 200)
        }}
        style={style}
        className="homy_main_bookmarks_list_item">
            <div className="homy_main_bookmarks_list_item_controls">
                <div className="homy_main_bookmarks_list_item_controls_item homy_main_bookmarks_list_item_controls_update" onClick={onUpdateMainBookmark}>
                    <i 
                    className="fa-solid fa-gear" 
                    style={styleControlsUpdate}
                    onMouseEnter={() => setStyleControlsUpdate({'color': mainBookmarksControlsHoverColor})}
                    onMouseLeave={() => setStyleControlsUpdate({'color': mainBookmarksControlsColor})}></i>
                </div>
                <div className="homy_main_bookmarks_list_item_controls_item homy_main_bookmarks_list_item_controls_delete" onClick={onDeleteMainBookmark}>
                    <i 
                    className="fa-sharp fa-solid fa-circle-xmark" 
                    style={styleControlsDelete}
                    onMouseEnter={() => setStyleControlsDelete({'color': mainBookmarksControlsHoverColor})}
                    onMouseLeave={() => setStyleControlsDelete({'color': mainBookmarksControlsColor})}></i>
                </div>
            </div>
            <img height="16" width="16" src={'http://www.google.com/s2/favicons?domain=' + url} alt="logo"/>
            <p style={{color: mainBookmarksNameColor}}>{name.length > 20 ? name.substr(0, 20) + '...' : name}</p>
        </Reorder.Item>
    );
}

export default MainBookmarksItem;