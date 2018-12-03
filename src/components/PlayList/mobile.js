import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LikeButton from './LikeButton.js';
import Footer from './Footer';
import Header from './Header';
import Loading from '../Loading';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  body: {
    maxHeight: '50vh',
    minHeight: '50vh',
    overflowY: 'scroll',
  },
  loading: {
    minHeight: '200px',
    top: '33%',
  },
});

function PlayList(props) {
  const {
    classes,
    onSelect,
    data,
    selected,
    favorites = [],
    like,
    loading,
    dislike,
    onSortChange,
    footer,
    sortBy,
  } = props;

  return (
    <div className={classes.root}>
      <List>
        {loading && (
          <Loading
            message="loading songs list"
            spinnerSize="33%"
            classes={{ root: classes.loading }}
          />
        )}
        <Header onSortChange={onSortChange} sortBy={sortBy} />
        <Paper className={classes.body} elevation={0} square>
          {data.map(song => (
            <ListItem
              key={song.id}
              role={undefined}
              dense
              button
              selected={selected === song.title}
              onClick={() => onSelect(song.title)}
            >
              {selected === song.title && <PlayArrowIcon color="primary" />}
              <ListItemText primary={song.title} secondary={song.artist} />
              <ListItemSecondaryAction>
                <LikeButton
                  liked={favorites.includes(song.title)}
                  onLike={_ => like(song.title)}
                  onDislike={_ => dislike(song.title)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </Paper>
        <Footer
          totalSongs={data.length}
          totalFavorites={favorites.length}
          {...footer}
        />
      </List>
    </div>
  );
}

PlayList.propTypes = {
  data: PropTypes.array.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(PlayList);
