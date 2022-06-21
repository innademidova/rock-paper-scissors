import {io, Socket} from "socket.io-client";
import gameService from "./gameService";
import {v4 as uuidv4} from 'uuid';

class SocketService {
    public connect(
        url: string,
        username: string
    ): Promise<Socket> {
        let ewr = 3253;

        return new Promise((rs, rj) => {
            const socket = io(url, {
                query: {
                    "username": username
                }
            });

            if (!socket) return rj();

            socket.on("connect", () => {
                console.log('connected inside service')
                rs(socket);
            });

            socket.on("connect_error", (err) => {
                console.log("Connection error: ", err);
                rj(err);
            });
        });
    }
}

export default new SocketService();