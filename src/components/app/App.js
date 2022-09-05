import { useEffect } from 'react';
import Header from '../header/Header';
import './App.scss';
import { localstorage } from '../../utils/data/localstorage';
import { useDispatch } from 'react-redux';
import { localstorageFetched } from '../../redux/actions';
function App(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        if(!localStorage.getItem('homy')){
            localStorage.setItem('homy', JSON.stringify(localstorage));
            return;
        }

        dispatch(localstorageFetched(JSON.parse(localStorage.getItem('homy'))));
        // eslint-disable-next-line
    }, [])

    return (
        <div className='homy'>
            <Header/>
        </div>
    );
}

export default App;