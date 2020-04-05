import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: "fixed",
    display: "grid",
    top: "30%",
    left: "25%",
    width: "50%",
    height: 200,
    background: "aliceblue",
    justifyItems: "center",
    alignItems: "center"
  },
  button: {
    background: "white",
    border: "solid 1px black",
    padding: "1em 2em"
  }
});

const Banner = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>{props.endMessage}</div>
      <button className={classes.button} onClick={props.handleClick}>
        Play Again
      </button>
    </div>
  );
};

export default Banner;