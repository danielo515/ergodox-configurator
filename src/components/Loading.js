import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 10,
    opacity: 0.7,
  },
  spinner: {},
});

const Loading = props => {
  return (
    <div className={props.classes.root}>
      <CircularProgress
        className={props.classes.spinner}
        style={{ width: props.spinnerSize || '50px', height: 'initial' }}
        color="primary"
      />
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        {props.message}
      </Typography>
    </div>
  );
};

Loading.propTypes = {
  classes: PropTypes.object,
  message: PropTypes.string,
  spinnerSize: PropTypes.string, // Will be translated to width
};

export default withStyles(styles)(Loading);
