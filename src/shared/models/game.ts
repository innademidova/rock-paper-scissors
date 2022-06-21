export type Choice = 'rock' | 'paper' | 'scissors';
export type OutcomeType = 'win' | 'lose' | 'draw' | undefined;
export type GameResult = {
    results: {
        id: string,
        username: string;
        choice: Choice;
    }[];
};

export type Player = {
    id: string;
    name: string;
}
