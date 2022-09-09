import { useDispatch, useSelector } from 'react-redux';
import MainBookmarksCreateItem from '../mainBookmarksCreateItem/MainBookmarksCreateItem';
import MainBookmarksItem from '../mainBookmarksItem/MainBookmarksItem';
import ModalCreateMainBookmark from '../modalCreateMainBookmark/ModalCreateMainBookmark';
import ModalUpdateMainBookmark from '../modalUpdateMainBookmark/ModalUpdateMainBookmark';
import './MainBookmarks.scss';
import {Reorder} from 'framer-motion';
import { reorderMainBookmarks } from '../../redux/actions/mainBookmarks';
import { useEffect, useState } from 'react';
function MainBookmarks(props) {

    const dispatch = useDispatch();
    const displayCreateModalMainBookmarks = useSelector(state => state.mainBookmarks.displayCreateModalMainBookmarks);
    const displayUpdateModalMainBookmarks = useSelector(state => state.mainBookmarks.displayUpdateModalMainBookmarks);
    const mainBookmarks = useSelector(state => state.mainBookmarks.mainBookmarks);
    const [localBookmarks, setLocalBookmarks] = useState([]);

    // const RowBookmarks = ({children}) =>{
    //     return (
    //         <Reorder.Group 
    //         as='div' 
    //         axis='x' 
    //         values={localBookmarks ? localBookmarks : [{}]}
    //         onReorder={onReorderBookmarks}  className="row_main_bookmarks">
    //             {children}
    //         </Reorder.Group>
    //     );
    // };

    let elements_main_bookmarks = null;
    if(localBookmarks.length > 0){
        elements_main_bookmarks = localBookmarks.map((item, i) => {
            return <MainBookmarksItem key={item.uid} url={item.url} name={item.name} index={i} item={item}/>
        })
    };

    const onReorderBookmarks = async (arr) => {
        await setLocalBookmarks(arr);
    };

    const initializationLocalBookmarks = async () => {
        await setLocalBookmarks(mainBookmarks);
    }

    useEffect(() => {
        initializationLocalBookmarks();
        // eslint-disable-next-line
    }, [mainBookmarks])

    useEffect(() => {
        if(localBookmarks.length > 0){
            dispatch(reorderMainBookmarks(localBookmarks));
        }
        // eslint-disable-next-line
    }, [localBookmarks])

    return (
        <Reorder.Group 
        as='div' 
        axis='x' 
        values={localBookmarks ? localBookmarks : [{}]}
        onReorder={onReorderBookmarks}  className='homy_main_bookmarks'>
            <Reorder.Group 
            as='div' 
            axis='x' 
            values={localBookmarks ? localBookmarks : [{}]}
            onReorder={onReorderBookmarks} 
            className="homy_main_bookmarks_list">
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
            </Reorder.Group>
        </Reorder.Group>
    );
}

export default MainBookmarks;