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

    const maxCountMainBookmarks = useSelector(state => {
        if(state.homySettings.homySettings){
            return state.homySettings.homySettings.view.maxCountMainBookmarks
        }
    });
    const showMainBookmarks = useSelector(state => {
        if (state.homySettings.homySettings){
            return state.homySettings.homySettings.settings.interface.showMainBookmarks;
        }
    });

    const [localBookmarks, setLocalBookmarks] = useState([]);

    const RowBookmarks = ({children}) =>{
        return (
            <Reorder.Group 
            as='div' 
            axis='x' 
            values={localBookmarks.length > 0 ? localBookmarks : [{}]}
            onReorder={onReorderBookmarks}  className="row_main_bookmarks">
                {children}
            </Reorder.Group>
        );
    };

    let elements_row_bookmarks = [];
    let countRow = localBookmarks.length > 0 ? Math.ceil(localBookmarks.length / 6) : 0;
    if(localBookmarks.length > 0){
        for(let i = 0; i < countRow; i++){
            elements_row_bookmarks.push(
                <RowBookmarks key={i}>
                    {
                        // eslint-disable-next-line
                        localBookmarks.map((item, j) => {
                            if(j < maxCountMainBookmarks){
                                if(i === 0 && (j < 6)){
                                    return <MainBookmarksItem key={item.uid} url={item.url} name={item.name} index={j} item={item}/>;
                                }
                                if(i === 1 && (j > 5 && j < 12)){
                                    return <MainBookmarksItem key={item.uid} url={item.url} name={item.name} index={j} item={item}/>;
                                }
                                if(i === 2 && (j > 11 && j < 18)){
                                    return <MainBookmarksItem key={item.uid} url={item.url} name={item.name} index={j} item={item}/>;
                                }
                            }
                        })

                    }
                </RowBookmarks>
            )
        }
    }

    // let elements_main_bookmarks = null;
    // if(localBookmarks.length > 0){
    //     elements_main_bookmarks = localBookmarks.map((item, i) => {
    //         return <MainBookmarksItem key={item.uid} url={item.url} name={item.name} index={i} item={item}/>
    //     })
    // };

    const onReorderBookmarks = async (arr) => {
        let firstArrElem = await arr[0];
        let index =  await localBookmarks.findIndex(item => item.uid === firstArrElem.uid);
        if(index < 6){
            await setLocalBookmarks(prev => [...arr, ...prev.slice(6)]);
        } else if(index >= 6 && index <= 11){
            await setLocalBookmarks(prev => [...prev.slice(0, 6), ...arr, ...prev.slice(12)]);
        } else if(index >= 12 && index <= 17){
            await setLocalBookmarks(prev => [...prev.slice(0, 6), ...prev.slice(6, 12), ...arr]);
        }
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
        <div className='homy_main_bookmarks' style={showMainBookmarks ? {display: 'flex'} : {display: 'none'}}>
            <div className="homy_main_bookmarks_list">
                {/* {elements_main_bookmarks} */}
                {elements_row_bookmarks}
                {
                    mainBookmarks.length < maxCountMainBookmarks ? <MainBookmarksCreateItem/> : null
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