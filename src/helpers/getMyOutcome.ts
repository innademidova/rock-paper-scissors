import {Choice, OutcomeType} from '../shared/models/game';

export const getMyOutcome = (myChoice: Choice, opponentsChoice: Choice): OutcomeType => {
    if ((myChoice === 'rock' && opponentsChoice === 'scissors') ||
        (myChoice === 'scissors' && opponentsChoice === 'paper') ||
        (myChoice === 'paper' && opponentsChoice === 'rock')) {
        return 'win';
    }
    if ((myChoice === 'rock' && opponentsChoice === 'paper') ||
        (myChoice === 'scissors' && opponentsChoice === 'rock') ||
        (myChoice === 'paper' && opponentsChoice === 'scissors')) {
        return 'lose';
    }
    return 'draw';
};