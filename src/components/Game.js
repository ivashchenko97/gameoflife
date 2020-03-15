
// @flow
import React, { useState, useCallback, useRef } from "react"; 
import * as _ from 'lodash'
import './styles.css'

const numRows = 50;
const numCols = 50;
const tickTimeout = 400

type NestedArrayOfNumbers = Array<Array<number>>


export const generateGrid = (c: number = numCols, r: number = numRows): NestedArrayOfNumbers => {
  const rows = [];
    for (let i = 0; i < r; i++) {
      rows.push(
        Array.from(Array(c), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }
  return rows
};

export const calculateNewGrid = (g: NestedArrayOfNumbers, numRows: number, numCols: number): NestedArrayOfNumbers => {
  const gridCopy = _.cloneDeep(g)
  const neighborsDirections = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  for (let i = 0; i < numRows; i++) {
    for (let k = 0; k < numCols; k++) {
      let neighbors = 0;
      neighborsDirections.forEach(([x, y]) => {
        const newI = i + x;
        const newK = k + y;
        if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
          neighbors += g[newI][newK];
        }
      });

      if (neighbors < 2 || neighbors > 3) {
        gridCopy[i][k] = 0;
      } else if (g[i][k] === 0 && neighbors === 3) {
        gridCopy[i][k] = 1;
      }
    }
  }
  return gridCopy
}

const Game = ()  => {
  const [grid, setGrid] = useState<NestedArrayOfNumbers>(() => {
    return generateGrid();
  });

  const [running, setRunning] = useState<boolean>(false);

  const runningRef = useRef<boolean>(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid( g => calculateNewGrid(g, numRows, numCols));
    setTimeout(runSimulation, tickTimeout);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <div
        className='boardWrapper'
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              className={`col ${grid[i][k] ? 'active' : 'inactive'}`}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Game;