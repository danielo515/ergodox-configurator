import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Next from '@material-ui/icons/NavigateNext';
import Before from '@material-ui/icons/NavigateBefore';

const styles = theme => ({
  toolbar: {
    alignItems: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Footer extends PureComponent {
  render() {
    const { props } = this;
    const { pages, totalFavorites, classes, nextPage, prevPage, page } = props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar classes={{ root: classes.toolbar }} variant="dense">
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Favorites: {totalFavorites}
            </Typography>
            <div className={classes.pagination}>
              <IconButton onClick={prevPage} disabled={page <= 1}>
                <Before />
              </IconButton>
              <Typography variant="button" gutterBottom>
                {page} / {pages}
              </Typography>
              <IconButton onClick={nextPage} disabled={page >= pages}>
                <Next />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Footer.propTypes = {
  totalFavorites: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
  prevPage: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default withStyles(styles)(Footer);
