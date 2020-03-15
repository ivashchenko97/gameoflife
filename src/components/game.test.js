import { generateGrid, calculateNewGrid } from './Game'
import { mockRandom, resetMockRandom } from 'jest-mock-random';

describe('[components/game.test.js]', () => {
    it('should generate initial random grid', () => {
        mockRandom([0.9, 0.2, 0.8, 0.6]);
        expect(generateGrid(2, 2)).toEqual(expect.arrayContaining([[1, 0], [1, 0]]));
        resetMockRandom();
    });


    it('live cell with zero live neighbors dies', () => {
        const grid = [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0]
        ];
        
        const result = calculateNewGrid(grid, 3, 3);
        expect(result[1][1]).toEqual(0);
    });
    
    it('live cell with one live neighbor dies', () => {
        const grid = [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 0]
        ];
        const result = calculateNewGrid(grid, 3, 3);
        expect(result[1][1]).toEqual(0);
    });
    
    it('live cell with two live neighbors lives', () => {
        const grid = [
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 0]
        ];
        const result = calculateNewGrid(grid, 3, 3);
        expect(result[1][1]).toEqual(1);
    });
    
    it('live cell with three live neighbors lives', () => {
        const grid = [
          [0, 0, 0],
          [0, 1, 0],
          [1, 1, 1]
        ];
        const result = calculateNewGrid(grid, 3, 3);
        expect(result[1][1]).toEqual(1);
    });
    
    it('live cell with more than three live neighbors dies', () => {
        const grid = [
          [1, 0, 1],
          [0, 1, 0],
          [1, 0, 1]];
        const result = calculateNewGrid(grid, 3, 3);
        expect(result[1][1]).toEqual(0);
    });
    
    it('dead cell with three live neighbors becomes live cell', () => {
        const grid = [
          [0, 0, 0],
          [1, 0, 1],
          [0, 1, 0]];
        const result = calculateNewGrid(grid, 3, 3);
        expect(result[1][1]).toEqual(1);
    });    
})
