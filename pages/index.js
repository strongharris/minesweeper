import React, { Component } from 'react';
import Layout from '../components/Layout';
import Board from '../components/Board';
import Mine from '../components/Mine';
import Modal from '../components/Modal';
import Input from '../components/Input';

class Index extends Component {
  state = {
    status: 'idle',
    size: 10,
    flags: 10,
    mines: 10,
    openCells: 0,
    elapsed: 0,
    gameBoard: [],
    scoreBoard: [],
    handleModal: false, 
    settingOpen: false,
    scoreOpen: false,
  }

  componentWillMount() {
    this.setState({
      gameBoard: this.initBoard(this.state.size)
    });
  }

  componentDidUpdate() {
    if (this.state.status === 'active') {
      this.checkGameResult();
    }
  }
  
  initBoard = (size) => {
    let board = [];

    if (size === 0) {
      return [];
    }

    // create board (matrix)
    for (let i = 0; i < size; i++) {
      board.push([]);

      for (let j = 0; j < size; j++) {
        board[i].push({
          x: j, 
          y: i, 
          adjMines: 0, 
          isOpen: false,
          hasMine: false, 
          hasFlag: false, 
        });
      }
    }

    // insert mines
    for (let i = 0; i < size; i++) {
      let randomRow = Math.floor(Math.random() * size);
      let randomColumn = Math.floor(Math.random() * size);
      let square = board[randomRow][randomColumn];

      if (square.hasMine) {
        i--;
      } else {
        square.hasMine = true; 
      }
    }
    return board;     
  };

  inputOnChange = (type, e) => {
    if (type === 'boardSize') {
      const changedValue = e.target.value === '' ? 0 : e.target.value
      this.setState({
        size: Number(changedValue),
        flags: Number(changedValue),
        mines: Number(changedValue),
        status: 'idle',
        openCells: 0,
        timer: 0,
        gameBoard: this.initBoard(changedValue),       
      });
    }
  }

  handleModal = (content) => {
    if (content === 'setting') {
      this.setState({ settingOpen: !this.state.settingOpen });
    }

    if (content === 'scoreBoard') {
      this.setState({ scoreOpen: !this.state.scoreOpen });
    }
  };

  tick = () => {
    const { openCells, status, elapsed } = this.state; 
    if (openCells > 0 && status === 'active') {
      this.setState({ elapsed: (elapsed + 1) });
    }
  };

  startTimer = () => {
    this.timer = setInterval(this.tick, 1000);
  }

  reset = () => {
    this.setState({
      status: 'idle',
      openCells: 0,
      flags: this.state.mines,
      elapsed: 0,
      intervals: [],
      gameBoard: this.initBoard(this.state.size)
    });
    clearInterval(this.timer);
  }

  checkGameResult = () => {
    const { mines, openCells, size, flags, elapsed} = this.state;
    if (mines + openCells >= size * size && flags === 0) {
      this.setState(prevState => {
        const newScore = { size, elapsed }
        const scoreBoard = [...prevState.scoreBoard, newScore];
        return {
          status: 'won',
          scoreBoard,
        }
      });
    }
  }

  gameOver = () => {
    this.setState({
      status: 'lost',
    });
  };

  handleSquareClick = () => {
    const { openCells, status } = this.state;
    if (openCells === 0 && status !== 'active') {
      this.setState({ status: 'active' });
      clearInterval(this.timer);
      this.startTimer();
    }
    
    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 }
    });
  };

  changeFlagCount = (count) => {
    this.setState({ flags: this.state.flags + count });
  };

  render() {
    const { size, mines, status, gameBoard, openCells, settingOpen, scoreOpen, scoreBoard, elapsed } = this.state;

    return (
      <Layout 
        title={<Mine status={status} />} 
        status={status}
        elapsed={elapsed}
        reset={this.reset}
        handleModal={this.handleModal} 
      >
        <Board 
          key={size}
          gameBoard={gameBoard}
          size={size}
          mines={mines} 
          status={status}
          openCells={openCells}
          handleSquareClick={this.handleSquareClick}
          changeFlagCount={this.changeFlagCount}
          initBoard={this.initBoard}
          reset={this.reset}
          gameOver={this.gameOver}
        />
        <Modal 
          open={settingOpen} 
          handleModal={() => this.handleModal('setting')} 
          title='Setting'
        >
          <Input label='Board Size' value={size} onChange={e => this.inputOnChange('boardSize', e)}/>
        </Modal>
        <Modal
          open={scoreOpen}
          handleModal={() => this.handleModal('scoreBoard')}
          title={`High Scores (${size}x${size})`}
        >
          {
            scoreBoard.filter(score => score.size === size)
              .sort((a, b) => a.elapsed - b.elapsed)
              .map((score, i) => <h4 key={i}>{`${i+1}. ${score.elapsed} seconds`}</h4>)
          }
        </Modal>
      </Layout>
    );
  }
}

export default Index;
