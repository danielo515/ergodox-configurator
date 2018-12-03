import React from 'react';
import PropTypes from 'prop-types';
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";
import NotFavorite from "@material-ui/icons/FavoriteBorder";

const styles = theme => ({
    like: {
        color: "red"
    }
});


const LikeButton = props => {
    const { liked, onLike, onDislike, classes } = props;

    return (

        <IconButton onClick={liked ? onDislike : onLike} className={classes.like} aria-label="Like">
            {liked ? (<Favorite />) : (<NotFavorite />)}
        </IconButton>

    );
};

LikeButton.propTypes = {
    liked: PropTypes.bool,
};

export default withStyles(styles)(LikeButton);