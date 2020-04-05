import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Banner from './components/Banner';
import StartModal from './components/StartModal';
import { createPlayDeck, CardData, CardQuantity } from './Util/GameUtil';
import { GAME_STATUS } from './constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function App() {

  const [deck, setDeck] = useState({});
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.SHUFFLING);
  const [playDeckSize, setPlayDeckSize] = useState(2);
  const [endMessage, setEndMessage] = useState('Too Bad!');
  const cardQuantity = CardQuantity();
  const classes = useStyles();

  const getPlayDeckSize = (numberSelected) => {
    shuffling(numberSelected);
  };

  const shuffling = (numberSelected) => {
    console.log('Shuffling: ', numberSelected);
    setPlayDeckSize(numberSelected);
    const deckSize = numberSelected;
    // Randomized data
    CardData().sort(() => Math.random() - 0.5);
    let tmp = createPlayDeck(CardData(), deckSize);
    setDeck(tmp);
    setGameStatus(GAME_STATUS.CREATING);
  };

  const quitGame = () => {
    setEndMessage('Too Bad!');
    setGameStatus(GAME_STATUS.FINISHED);
  }

  const gameFinished = () => {
    setEndMessage('Winner winner chicken dinner!');
    setGameStatus(GAME_STATUS.FINISHED);
  };

  const resetGame = () => {
    setGameStatus(GAME_STATUS.RESETTING);
    setGameStatus(GAME_STATUS.SHUFFLING);
  };

  const setGameInProgress = () => {
    setGameStatus(GAME_STATUS.IN_PROGRESS);
  };
  return (
    <div>
      <Container fixed>
      <Header className={classes.header} handleClick={quitGame} />
      <div>
        <GameBoard 
          gameStatus={gameStatus}
          handleStart={setGameInProgress}
          handleFinish={gameFinished}
          playDeck={deck}
          playDeckSize={playDeckSize}
        />
        {gameStatus === GAME_STATUS.FINISHED && (
          <div>
            <Banner handleClick={resetGame} endMessage={endMessage} />
          </div>
        )}
        {gameStatus === GAME_STATUS.SHUFFLING && (
          <StartModal 
            gameStatus={gameStatus} 
            getPlayDeckSize={getPlayDeckSize} 
            cardQuantity={cardQuantity} 
          />
        )}
      </div>
      </Container>
    </div>
  );
}

export default App;
