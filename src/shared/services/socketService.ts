import {io, Socket} from "socket.io-client";

class SocketService {
    public connect(
        url: string,
        username: string
    ): Promise<Socket> {
        return new Promise((rs, rj) => {
            const socket = io(url, {
                query: {
                    "username": username
                }
            });

            if (!socket) return rj();

            socket.on("connect", () => {
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