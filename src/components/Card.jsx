import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { CARD_STATUS, CARD_SIZE } from '../constants';

const useStyles = makeStyles({
  card: {
    backgroundColor: "cadetblue",
    padding: 5,
    borderRadius: 5,
    height: CARD_SIZE.height,
    width: CARD_SIZE.width,
    border: "black 5px solid",
    position: "relative",
    transition: "all 0.4s linear",
    transformStyle: "preserve-3d",
    margin: "5px 5px 20px 5px",
    "& div": {
      position: "relative",
      backfaceVisibility: "hidden"
    }
  },
  selected: {
    borderColor: "blue",
    transform: "rotateY(180deg)"
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    padding: "5px"
  },
  front: {
    transform: "rotateY(180deg)"
  },
  matched: {
    borderColor: "green",
    backgroundColor: "white",
    transform: "rotateY(180deg)"
  },
  back: {
    transform: "rotateY(180deg)",
    top: "25%",
    left: "35%"
  }
});

const Card = ({ data, handleClick, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { id, label, image, status } = data;
  const classes = useStyles();
  const isSelected = status === CARD_STATUS.SELECTED;
  const isMatched = status === CARD_STATUS.MATCHED;

  const onCardClick = () => {
    if (status === CARD_STATUS.HIDDEN) {
      handleClick(index, id);
    }
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={classnames(classes.card, {
        [classes.selected]: isSelected,
        [classes.matched]: isMatched
      })}
      onClick={onCardClick}
    >
      <div className={classes.front}>
        <img src={process.env.PUBLIC_URL + image} alt="card" onLoad={handleImageLoad} />
        <div className={classes.label}>{label}</div>
      </div>
      <div className={classes.back}>{!isLoaded && "Loading"}</div>
    </div>
  );
};

export default Card;