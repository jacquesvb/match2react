import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 600,
  },
});
const generateMarks = (numberOfCards) => {
  let marks = []
  for (let i = 2; i <= (numberOfCards); i = i + 2) {
    marks.push({
      "value": i,
      "label": i.toString()
    })
  }
  return marks;
}

export default function DeckSizeSelect({handleChange, deck}) {
  const classes = useStyles();
  const [marks, setMarks] = useState([]);

  const max = deck();

  useEffect(() => {
    setMarks(generateMarks(deck()));
  }, []);

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={2}
        aria-labelledby="discrete-slider-restrict"
        step={2}
        min={2}
        max={max + 2}
        valueLabelDisplay="off"
        marks={marks}
        onChange={handleChange}
      />
    </div>
  );
}