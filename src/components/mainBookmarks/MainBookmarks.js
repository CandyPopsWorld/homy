import { useSelector } from 'react-redux';
import MainBookmarksCreateItem from '../mainBookmarksCreateItem/MainBookmarksCreateItem';
import MainBookmarksItem from '../mainBookmarksItem/MainBookmarksItem';
import ModalCreateMainBookmark from '../modalCreateMainBookmark/ModalCreateMainBookmark';
import ModalUpdateMainBookmark from '../modalUpdateMainBookmark/ModalUpdateMainBookmark';
import './MainBookmarks.scss';
function MainBookmarks(props) {

    const displayCreateModalMainBookmarks = useSelector(state => state.mainBookmarks.displayCreateModalMainBookmarks);
    const displayUpdateModalMainBookmarks = useSelector(state => state.mainBookmarks.displayUpdateModalMainBookmarks);
    const mainBookmarks = useSelector(state => state.mainBookmarks.mainBookmarks);

    let elements_main_bookmarks = null;
    if(mainBookmarks.length > 0){
        elements_main_bookmarks = mainBookmarks.map((item, i) => {
            return <MainBookmarksItem key={item.uid} url={item.url} name={item.name} index={i}/>
        })
    }

    return (
        <div className='homy_main_bookmarks'>
            <div className="homy_main_bookmarks_list">
                {elements_main_bookmarks}
                {
                    mainBookmarks.length < 18 ? <MainBookmarksCreateItem/> : null
                }
                {
                    displayCreateModalMainBookmarks ? <ModalCreateMainBookmark/> : null
                }
                {
                    displayUpdateModalMainBookmarks ? <ModalUpdateMainBookmark/> : null
                }
            </div>
        </div>
    );
}

export default MainBookmarks;