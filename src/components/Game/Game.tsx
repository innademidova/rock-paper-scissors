import {rock, paper, scissors} from '../../accets/images/index'
import React, {useEffect, useState} from 'react';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import {Choice, GameResult, OutcomeType, Player} from '../../shared/models/game';
import classes from './Game.module.css'
import {getChoices, getMyOutcome, getUpdatedScores} from '../../helpers';
import gameService from '../../shared/services/gameService';
import {confirmRefreshPage} from '../../helpers/confirmRefreshPage';

interface Props {
    playerName: string | undefined;
}

const Game = ({playerName}: Props) => {
    useEffect(confirmRefreshPage, []);

    const [opponentName, setOpponentName] = useState<string | undefined>(undefined);

    const [scores, setScores] = useState<[number, number]>([0, 0]);
    const [myChoice, setMyChoice] = useState<Choice | undefined>(undefined);
    const [opponentChoice, setOpponentChoice] = useState<Choice | undefined>(undefined)
    const [gameOutcome, setGameOutcome] = useState<OutcomeType>(undefined);
    const [status, setStatus] = useState<string>('Waiting for another player...')
    const connectSocket = async (currentPlayerName: string) => {
        const id = await gameService.connect(currentPlayerName)
        gameService.getPlayers();
        gameService.subscribeToOtherPlayerConnected((res) => {
                setStatus(`${res.name} connected`);
                setOpponentName(res.name)
            }
        )
        gameService.subscribeToOtherPlayerDisconnected((res) => {
                setStatus(`${res.name} disconnected`);
                setOpponentChoice(undefined);
                setOpponentName(undefined);
                setScores([0, 0]);
            }
        )
        gameService.onPlayersReceived((players: Player[]) => {
            const opponent = players.find(item => item.id !== id)
            if (opponent) {
                setOpponentName(opponent.name)
                setStatus(`${opponent.name} connected`)
            }
        })
        gameService.onOpponentMadeChoice((opponent) => {
            setStatus(`${opponent.name} made choice`)
        })
        gameService.onGameFinished((res: GameResult) => {
            const [myPick, opponentPick] = getChoices(res, currentPlayerName)
            setOpponentChoice(opponentPick);
            const outcome = getMyOutcome(myPick, opponentPick);
            setGameOutcome(outcome);
            const newScores = getUpdatedScores(outcome, scores);
            setScores([...newScores])
        })
    };
    useEffect(() => {
        (async () => {
            if (!playerName) {
                return;
            }

            try {
                await connectSocket(playerName);
            } catch (err) {
                alert('Could not connect to the game. Please refresh page')
            }
        })()
    }, [playerName])

    const setChoice = (choice: Choice) => {
        if (gameOutcome) {
            setMyChoice(undefined)
            setGameOutcome(undefined)
            if (opponentName) {
                setStatus(`${opponentName} connected`)
            } else {
                setStatus('Waiting for another player...')
            }
        }
        setMyChoice(choice);
        gameService.makeChoice(choice)
    };
    return (
        <>
            <ScoreBoard playerName={playerName} opponentName={opponentName}
                        scores={scores}/>
            <div className={classes.game}>
                <div className={classes.status}>{status}</div>
                <div className={classes.elements}>
                    <img className={myChoice === 'rock' ? classes.chosen : ''} alt={'rock'} src={rock}
                         onClick={() => setChoice('rock')}/>
                    <img className={myChoice === 'paper' ? classes.chosen : ''} alt={'paper'} src={paper}
                         onClick={() => setChoice('paper')}/>
                    <img className={myChoice === 'scissors' ? classes.chosen : ''} alt={'scissors'} src={scissors}
                         onClick={() => setChoice('scissors')}/>
                </div>
                <div>
                    {gameOutcome === 'win' && <h2>You Win</h2>}
                    {gameOutcome === 'lose' && <h2>You lose</h2>}
                    {gameOutcome === 'draw' && <h2>Draw</h2>}
                    {gameOutcome &&
                        <>
                            <p> Opponent's choice: </p> <img alt={opponentChoice} src={opponentChoice === 'scissors' ?
                            scissors : opponentChoice === 'rock' ? rock : paper}/>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Game;