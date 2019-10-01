import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isWinning={this.props.winningSquares.includes(i)}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // Refactoring - Turning hard coded renderSquare to 2 for loops
    let squares = [];
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(i * 3 + j));
      }
      squares.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return <div> {squares} </div>;
  }
}

export default Board;
