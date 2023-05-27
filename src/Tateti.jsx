import { useState } from "react";

function Tateti() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState();
    const [startingPlayer, setStartingPlayer] = useState(null);
    const [winner, setWinner] = useState(null);
    const handleStart = (selectedPlayer) => {
        setPlayer(selectedPlayer);
        setStartingPlayer(selectedPlayer);
    };
    const handleClick = (index) => {
        if (winner || board[index]) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = player;

        const newPlayer = player === 'X' ? 'O' : 'X';

        const newWinner = calculateWinner(newBoard);

        setBoard(newBoard);
        setPlayer(() => newPlayer);
        setWinner(newWinner);
    };

    const renderSquare = (index) => {
        return (
            <button className="square" onClick={() => handleClick(index)}>
                {board[index]}
            </button>
        );
    };

    const calculateWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return null;
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setPlayer('X');
        setWinner(null);
    };

    let status;
    if (winner) {
        status = `El jugador ${winner} gana!`;
    } else if (board.every((square) => square)) {
        status = "¡Empate pelotudos!";
    } else {
        if (player === undefined) {
            status = `Sigue: Esperando jugador`
        }
        else {
            status = `Sigue: ${player}`
        }
    }
    const renderPlayerSelection = () => {
        if (startingPlayer) {
            return null;
        }
        return (
            <div className="player-selection">
                <button onClick={() => handleStart("X")}>Iniciar con X</button>
                <button onClick={() => handleStart("O")}>Iniciar con O</button>
            </div>
        );
    };
    return (
        <div className="game">
            {renderPlayerSelection()}
            <div className="game-board">
                <div className="status">{status}</div>
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button className="reset-button" onClick={resetGame}>
                Reiniciar juego
            </button>
        </div>
    );
}

export default Tateti;