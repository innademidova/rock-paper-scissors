import { Socket} from "socket.io-client";
import {Choice, GameResult} from "../models/game";

export type ConnectedResult = {
    username: string;
}

class GameService {
    public socket: Socket = null!;

    subscribeToOtherPlayerConnected(func: (res: ConnectedResult) => void) {
        this.socket.on('connected', func)
    };

    subscribeToOtherPlayerDisconnected(func: (res: ConnectedResult) => void) {
        this.socket.on('disconnected', func)
    };

    getPlayers() {
        this.socket.emit('get_players')
    }

    onPlayersReceived(func: (players: string[]) => void) {
        this.socket.on('players_received', func);
    }
    makeChoice(choice: Choice) {
        this.socket.emit('choose', choice)
    }
    onOpponentMadeChoice(func: (player: ConnectedResult) => void) {
        this.socket.on('opponent_made_choice', func)
    }
    onGameFinished(func: (res: GameResult) => void) {
        this.socket.on('game_finished', func)
    }
}


export default new GameService()
