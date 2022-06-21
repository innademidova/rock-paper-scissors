import {Choice, GameResult} from '../models/game';

export const getChoices = (gameResults: GameResult, myName: string): [Choice, Choice] => {
    const [firstChoice, secondChoice] = gameResults.results;
    if(firstChoice.username === myName) {
        return [firstChoice.choice, secondChoice.choice]
    }
    return [secondChoice.choice, firstChoice.choice];
}