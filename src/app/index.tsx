import React, {useState} from 'react';
import './index.css';
import Home from '../pages/Home/Home';
import Game from '../pages/Game/Game';
import {Routes, Route} from 'react-router-dom';

function Index() {
    const [playerName, setPlayerName] = useState<string>(localStorage.getItem('userName') || '');

    return (
        <div className='container'>
            <Routes>
                <Route path={'/'} element={<Home playerName={playerName} setPlayerName={setPlayerName}/>}/>
                <Route path={'/game'} element={<Game playerName={playerName}/>}/>
            </Routes>
        </div>

    );
}

export default Index;
