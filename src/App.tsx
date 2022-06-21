import React, {useState} from 'react';
import './App.css';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import {Routes, Route} from 'react-router-dom';

function App() {
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

export default App;
