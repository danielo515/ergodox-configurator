import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import NotFavorite from "@material-ui/icons/FavoriteBorder";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({
    playing: {
        color: theme.palette.primary.main
    },
    notPlaying: {
        color: theme.palette.action.disabled
    },
    like: {
        color: "red"
    }
});

export const Controls = withStyles(styles)
    (({ playing, play, liked, classes, onLike, onDislike }) =>
        (<TableCell>
            <IconButton onClick={liked ? onDislike : onLike} className={classes.like} aria-label="Like">
                {liked ? (<Favorite />) : (<NotFavorite />)}
            </IconButton>
            <IconButton onClick={play} className={playing ? classes.playing : classes.notPlaying} aria-label="Play">
                <PlayArrowIcon />
            </IconButton>
        </TableCell>));