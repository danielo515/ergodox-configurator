import React, { PureComponent } from 'react'

import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Volume from "@material-ui/icons/VolumeUp";
import Mute from "@material-ui/icons/VolumeOff";
import { withStyles } from "@material-ui/core/styles";
import Slider from '@material-ui/lab/Slider';

const styles = {
    playIcon: {
        height: 38,
        width: 38
    },
    root: {
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    buttons: {

    },
    sliderContainer: {
        flexGrow: 1,
    },
    slider: {
        padding: '22px 0px',
        width: '90%'
    }
};

/*
By using a pure component instead of a functional one we avoid non necessary renderings.
This component was being rendered each second just because the state of the parent tro reflect
the song progress were changing, something that has nothing to do with the controls.
*/
class Controls extends PureComponent {
    render() {
        const { classes, onPlay, onPause, theme, onVolumeChange, onNext, onPrev, volume = 0, playing, muted, onMuteToggle } = this.props;

        return (<div className={classes.root}>
            <div className={classes.buttons}>
                <IconButton aria-label="Previous" onClick={onPrev}>
                    {theme.direction === "rtl" ? (<SkipNextIcon />) : (<SkipPreviousIcon />)}
                </IconButton>
                <IconButton aria-label={playing ? "Pause" : "Play"} onClick={playing ? onPause : onPlay} >
                    {playing
                        ? <Pause className={classes.playIcon} />
                        : <PlayArrowIcon className={classes.playIcon} />
                    }
                </IconButton>
                <IconButton aria-label="Next" onClick={onNext}>
                    {theme.direction === "rtl" ? (<SkipPreviousIcon />) : (<SkipNextIcon />)}
                </IconButton>
                <IconButton aria-label="mute" onClick={onMuteToggle}>
                    {muted
                        ?
                        <Mute />
                        :
                        <Volume />
                    }
                </IconButton>
            </div>
            <div className={classes.sliderContainer}>
                <Slider classes={{ container: classes.slider }} value={volume} min={0} max={1} onChange={(e, val) => onVolumeChange(val)}></Slider>
            </div>
        </div>);
    }
}


export default withStyles(styles, { withTheme: true })(Controls)