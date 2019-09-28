import React from "react";
import Board from "./Board";

class Game extends React.Component {
  /* Refactoring state to React 16 */

  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true,
    isAscending: true
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     history: [
  //       {
  //         squares: Array(9).fill(null)
  //       }
  //     ],
  //     stepNumber: 0,
  //     xIsNext: true
  //   };
  // }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const locations = [
      [1, 1],
      [2, 1],
      [3, 1],
      [1, 2],
      [2, 2],
      [3, 2],
      [1, 3],
      [2, 3],
      [3, 3]
    ];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares, location: locations[i] }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  hopTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handleToggle() {
    this.setState({
      isAscending: !this.state.isAscending
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber]; //history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;

    const moves = history.map((step, move) => {
      const desc = move
        ? `Go to step #${move} at C${history[move].location[0]} R
          ${history[move].location[1]}`
        : `Go back to start`;
      const classname =
        move === this.state.stepNumber ? `button-selected-bold` : `button-move`;
      return (
        <li key={move}>
          <button className={`${classname}`} onClick={() => this.hopTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    if (winner) {
      status = "Winner is " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    const isAscending = this.state.isAscending;
    if (!isAscending) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <button className="btn-toggle" onClick={() => this.handleToggle()}>
            Toggle
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
