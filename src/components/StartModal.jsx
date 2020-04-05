import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  Button,
  Typography
} from '@material-ui/core';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DeckSizeSelect from './DeckSizeSelect';
import { GAME_STATUS } from '../constants';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function StartModal(props) {
  const { gameStatus, getPlayDeckSize, cardQuantity } = props;
  const [open, setOpen] = useState(false);
  const [ playDeckSize, setPlayDeckSize ] = useState(props);

  useEffect(() => {
    setPlayDeckSize(2);
  }, []);
  
  useEffect(() => {
    if (gameStatus === GAME_STATUS.SHUFFLING) {
      setOpen(true);
    };
  }, [gameStatus]);

  const deck = () => {
    return cardQuantity * 2;
  };

  const handleChange = (event, newValue) => {
    setPlayDeckSize(newValue);
  }
  const handleClose = (event) => {
    getPlayDeckSize(playDeckSize);
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Choose the number of cards for game
        </DialogTitle>
        <DialogContent dividers>
          <DeckSizeSelect handleChange={ handleChange } deck={ deck } />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Start Game
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
