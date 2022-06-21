import {Socket} from "socket.io-client";
import {Choice, GameResult, Player} from "../models/game";
import socketService from "./socketService";
import {v4 as uuidv4} from "uuid";

type RawConnectedResult = {
    username: string;
}

type RawGameResult = {
    results: {
        username: string;
        choice: Choice;
    }[];
};

class GameService {
    private socket: Socket = null!;
    private readonly _url = 'https://front-task-rps-7.herokuapp.com/';

    async connect(userName: string) {
        const id = uuidv4()
        const mappedName = `${id}:${userName}`
        this.socket = await socketService.connect(this._url, mappedName)
        return id;
    }

    subscribeToOtherPlayerConnected(func: (res: Player) => void) {
        this.socket.on('connected', (player: RawConnectedResult) => {
            const mappedPlayer = getPlayerName(player.username)
            func(mappedPlayer);
        })
    };

    subscribeToOtherPlayerDisconnected(func: (res: Player) => void) {
        this.socket.on('disconnected', (player: RawConnectedResult) => {
            const mappedPlayer = getPlayerName(player.username)
            func(mappedPlayer);
        })
    };

    getPlayers() {
        this.socket.emit('get_players')
    }

    onPlayersReceived(func: (players: Player[]) => void) {
        this.socket.on('players_received', (players: string[]) => {
            const mappedPlayers = players.map(item => getPlayerName(item));
            func(mappedPlayers);
        });
    }

    makeChoice(choice: Choice) {
        this.socket.emit('choose', choice)
    }

    onOpponentMadeChoice(func: (res: Player) => void) {
        this.socket.on('opponent_made_choice', (player: RawConnectedResult) => {
            const mappedPlayer = getPlayerName(player.username)
            func(mappedPlayer);
        })
    }

    onGameFinished(func: (result: GameResult) => void) {
        this.socket.on('game_finished', (res: RawGameResult) => {
            const gameResult = {
                results: res.results.map(i => {
                    const {id, name} = getPlayerName(i.username)
                    return {choice: i.choice, id, username: name}
                })
            } as GameResult;
            func(gameResult);
        })
    }
}

function getPlayerName(username: string) {
    const [id, name] = username.split(':');
    return {id, name}
}

export default new GameService()
