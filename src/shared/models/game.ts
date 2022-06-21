export type Choice = 'rock' | 'paper' | 'scissors';
export type OutcomeType = 'win' | 'lose' | 'draw' | undefined;
export type GameResult = {
    results: {
        username: string;
        choice: Choice;
    }[];
};

export type OpponentStatus = 'connected' | 'disconnected' | 'made_choice';