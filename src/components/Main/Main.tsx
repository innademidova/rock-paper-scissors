import React from "react";
import classes from './Main.module.css'

interface Props {
setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
setPlayerName: React.Dispatch<React.SetStateAction<string>>;
playerName: string;
}

const Main = ({setIsGameStarted, setPlayerName, playerName}: Props) => {
    return (
            <div className={classes.main}>
                <h1>ROCK PAPER SCISSORS</h1>
                <input placeholder={'Enter your name'} className={classes['player-name']} value={playerName} onChange={(event) => {
                    setPlayerName(event.target.value)
                    localStorage.setItem('userName', event.target.value)

                }}/>
                <button disabled={!playerName} onClick={() => {
                    setIsGameStarted(true)
                }}>LET'S PLAY
                </button>
            </div>

    )
}

export default Main;