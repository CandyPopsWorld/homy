import { useDispatch } from "react-redux";
import { deleteMainBookmark, forceChangeDisplayUpdateMainBookmarkModal, writeLocalUpdateBookmark } from "../../redux/actions/mainBookmarks";

function MainBookmarksItem({url, name, index}) {

    const dispatch = useDispatch();

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

    console.log(index);

    return (
        <div className="homy_main_bookmarks_list_item" onClick={onTransitionMainBookmarks}>
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
        </div>
    );
}

export default MainBookmarksItem;