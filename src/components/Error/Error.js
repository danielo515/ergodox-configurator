import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import dead from './dead.svg';

const styles = theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const Error = props => {
  const { message, open, classes } = props;
  return (
    <Dialog
      open={open}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle
        id="error-dialog-title"
        className={classes.header}
        disableTypography
      >
        <img src={dead} alt="dead face" />
        <Typography variant="h6" align="center" color="error">
          Woops!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="error-dialog-description"
          color="textSecondary"
          align="center"
          component="p"
        >
          {message}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default withStyles(styles)(Error);
