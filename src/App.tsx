import React, {useState} from 'react';
import './App.css';
import Main from "./components/Main/Main";
import Game from "./components/Game/Game";

function App() {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [playerName, setPlayerName] = useState<string>('');

    return (
        <div className='container'>
            {!isGameStarted ?
                <Main setIsGameStarted={setIsGameStarted}
                      playerName={playerName} setPlayerName={setPlayerName}/>
                :
                <Game playerName={playerName}/>
            }
        </div>

    );
}

export default App;
