import { useDispatch, useSelector } from "react-redux";
import { forceChangeDisplayMainBookmarksModal } from "../../redux/actions/mainBookmarks";

function MainBookmarksCreateItem(props) {

    const displayCreateModalMainBookmarks = useSelector(state => state.mainBookmarks.displayCreateModalMainBookmarks);
    const dispatch = useDispatch();

    return (
        <div className="homy_main_bookmarks_list_create_item" onClick={() => {
            if(!displayCreateModalMainBookmarks){
                dispatch(forceChangeDisplayMainBookmarksModal(true));
            }
        }}>
            <span>+</span>
        </div>
    );
}

export default MainBookmarksCreateItem;