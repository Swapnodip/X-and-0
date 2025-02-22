"use client";
import { useState } from "react";

export default function Home() {
  const [gameState, setGameState] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const [XTurn, setXTurn] = useState(true);
  const checkWinner = () => {
    // console.log(gameState);
    for (let i = 0; i < 3; i++) {
      if (
        gameState[i][0] !== " " &&
        gameState[i][0] === gameState[i][1] &&
        gameState[i][1] === gameState[i][2]
      ) {
        return gameState[i][0]; // Return 'X' or 'O' for the winner
      }
    }

    // Check for vertical wins (columns)
    for (let i = 0; i < 3; i++) {
      if (
        gameState[0][i] !== " " &&
        gameState[0][i] === gameState[1][i] &&
        gameState[1][i] === gameState[2][i]
      ) {
        return gameState[0][i]; // Return 'X' or 'O' for the winner
      }
    }

    // Check for diagonal wins
    if (
      gameState[0][0] !== " " &&
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    }
    if (
      gameState[0][2] !== " " &&
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    // Check for draw (i.e., the board is full and no winner)
    const isDraw = gameState.every((row) => row.every((cell) => cell !== " "));
    if (isDraw) {
      return "Draw";
    }

    return " "; // No winner yet
  };
  let winner = checkWinner();
  return (
    <div className="pt-24">
      <div className="text-center text-2xl mb-6">
        {winner == " "
          ? `Current turn: ${XTurn ? "X" : "O"}`
          : winner == "Draw"
          ? "Draw!"
          : `${winner} wins!`}
      </div>
      <div>
        <table className="m-auto border-separate border-spacing-3">
          <tbody>
            {gameState.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    className="bg-slate-700 w-[150px] h-[120px] text-center rounded-lg text-5xl font-bold text-white cursor-pointer"
                    key={j}
                    onClick={() => {
                      if (cell == " " && winner == " ") {
                        setGameState((g) => {
                          g[i][j] = XTurn ? "X" : "O";
                          return g;
                        });
                        setXTurn((e) => !e);
                      }
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="m-auto text-center cursor-pointer text-xl mt-5 border-2 border-slate-700 w-fit px-4 py-2 rounded-lg"
        onClick={() => {
          setGameState([
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
          ]);
          setXTurn(true);
        }}
      >
        Reset
      </div>
    </div>
  );
}
