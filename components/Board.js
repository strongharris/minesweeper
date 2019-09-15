import React, { Component } from 'react';
import Row from './Row';
import Desk from './Desk';

class Board extends Component {

  open = square => {
    const { status, handleSquareClick, gameOver, gameBoard } = this.props;

    if (status === 'lost' || status === 'won') {
      return;
    }

    const minesCt = this.findAdjMines(square);
    let current = gameBoard[square.y][square.x];
    
    if (!square.hasFlag && !current.isOpen) {
      handleSquareClick();
      current.isOpen = true;
      current.count = minesCt; 
      
      this.setState({ gameBoard });
      
      if (!current.hansMine && minesCt === 0) {
        this.openAdjSquares(square);
      }

      if (current.hasMine){
        gameOver();
      }
    }
  };

  openAsFlag = square => {
    const { status, gameBoard } = this.props;

    if (status === 'lost' || status === 'won') {
      return;
    }

    square.hasFlag = !square.hasFlag;
    this.setState({ gameBoard });
    this.props.changeFlagCount(square.hasFlag ? -1 : 1)
  }

  findAdjMines = square => {
    const { gameBoard } = this.props;
    let minesCt = 0;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (square.y + row >= 0 && square.x + col >= 0) {
          if (square.y + row < gameBoard.length && square.x + col < gameBoard[0].length) {
            if (gameBoard[square.y + row][square.x + col].hasMine && !(row === 0 && col === 0)) {
              minesCt++;
            }
          }
        }
      }
    }
    return minesCt;
  };

  openAdjSquares = square => {
    const { gameBoard } = this.props;

    for (let row = -1; row <= 1; row++) {
      for (let col = -1; col <= 1; col++) {
        if (square.y + row >= 0 && square.x + col >= 0) {
          if (square.y + row < gameBoard.length && square.x + col < gameBoard[0].length) {
            if (!gameBoard[square.y + row][square.x + col].hasMine && !gameBoard[square.y + row][square.x + col].isOpen) {
              this.open(gameBoard[square.y + row][square.x + col]);
            }
          }
        }
      }
    }
  };

  render() {
    const { size, status, gameBoard } = this.props;
    return (
      <Desk boardSize={size}>
        {
          gameBoard.map((row, i) => 
            <Row 
              key={i} 
              row={row} 
              open={this.open} 
              openAsFlag={this.openAsFlag}
              status={status} 
            />
          ) 
        }
      </Desk>
    );
  }
}


export default Board;

