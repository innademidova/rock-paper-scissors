import React from "react";
import classes from './ScoreBoard.module.css'

interface Props {
    playerName: string | undefined;
    opponentName: string | undefined;
    scores: [number, number];
}

const ScoreBoard = ({playerName, opponentName, scores}: Props) => {

    return (
        <div className={classes['score-board']}>
            <h5>ROCK PAPER SCISSORS</h5>
            <div className={classes.badge}>
                <p className={classes['scoreboard-player-name']}>{playerName || 'Player1'}</p>
                <p className={classes.score}>{scores[0]}</p>
            </div>
            <p>:</p>
            <div className={classes.badge}>
                <p className={classes['scoreboard-player-name']}>{opponentName || 'Player2'}</p>
                <p className={classes.score}>{scores[1]}</p>
            </div>
        </div>)
}

export default ScoreBoard;