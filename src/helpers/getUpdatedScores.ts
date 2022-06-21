import {OutcomeType} from '../shared/models/game';

export const getUpdatedScores = (outcome: OutcomeType, scores: [number, number]): [number, number] => {
    if(outcome==='win') {
        scores[0]++
    }
    else if(outcome ==='lose') {
        scores[1]++
    }
    return [...scores]
}