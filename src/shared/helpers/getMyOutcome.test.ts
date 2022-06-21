import {getMyOutcome} from './getMyOutcome';

describe('my game outcome', () => {
  test('rock vs scissors should return win', () => {
    // Arrange
    const expectedResult = 'win';

    // Act
    const result = getMyOutcome('rock', 'scissors')

    // Assert
    expect(result).toBe(expectedResult)
  });
  test('paper vs scissors should return lose', () => {
    // Arrange
    const expectedResult = 'lose';

    // Act
    const result = getMyOutcome('paper', 'scissors')

    // Assert
    expect(result).toBe(expectedResult)
  });
  test('scissors vs scissors should return draw', () => {
    // Arrange
    const expectedResult = 'draw';

    // Act
    const result = getMyOutcome('scissors', 'scissors')

    // Assert
    expect(result).toBe(expectedResult)
  });
})


