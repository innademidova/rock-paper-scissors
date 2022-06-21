import React from 'react';
import classes from './Home.module.css'
import {useNavigate} from "react-router-dom";

interface Props {
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    playerName: string;
}

const Home = ({setPlayerName, playerName}: Props) => {
    const navigate= useNavigate();
    return (
        <div className={classes.main}>
            <h1>ROCK PAPER SCISSORS</h1>
            <input placeholder={'Enter your name'} className={classes.playerName} value={playerName}
                   onChange={(event) => {
                       setPlayerName(event.target.value)
                       localStorage.setItem('userName', event.target.value)
                   }}/>
            <button disabled={!playerName} onClick={() => {
                navigate('/game')
            }}>LET'S PLAY
            </button>
        </div>

    )
}

export default Home;