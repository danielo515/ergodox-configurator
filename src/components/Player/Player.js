import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import sad from "./dead.svg";
import ReactAudioPlayer from "react-audio-player";
import Controls from "./Controls";
import Cover from "./Cover";
import Loading from "../Loading";

const styles = {
  media: {},
  // To correctly position the loading absolutely we need to set card to relative
  card: {
    position: "relative"
  },
  // Loading root and spinner are just for the loading overlay
  loadingRoot: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    opacity: 0.7,
    zIndex: 10
  },
  spinner: {
    position: "absolute",
    top: "33%"
  },
  // styles for the progress bar
  progressBar: {
    width: "100%"
  },
  details: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    "min-width": 150
  },
  controls: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  }
};

/**
 * Why not making the Player a fully controlled component connected to redux ? There are several reasons, which must be
 * weighted to see if they make sense or not, but here they are:
 * 1. It requires handling low level DOM APIs like audio. It needs to keep track of the state of the underlying audio tag, get the reference, call native methods.
 * Neither of those are a good fit for a redux store, which must only contain plain serializable objects and reflect the state of the application, and not be tied to an specific component implementation
 * 2. Most of the state of the player is ephemeral and does not need to be shared or persisted: song position, volume, mute status, play status...
 *
 * It may be upgraded to a component with some events that can talk to redux, but for simplicity I'll keep it this way unless strictly necessary.
 */

class Player extends Component {
  state = {
    playing: false,
    autoplay: false,
    muted: false,
    loading: true,
    error: false,
    position: 0,
    volume: 1
  };

  next = () => {
    this.setState({
      autoplay: true,
      error: false
    });
    this.props.next();
  };
  // This is called every time a new song is loaded
  onAbort = () => {
    this.setState({ loading: true, position: 0, error: false });
  };
  onCanPlay = () => {
    this.setState({ loading: false, error: false });
  };

  // This is just a callback to update the UI. Who actually starts playing the song is the play method
  onPlay() {
    this.setState({
      playing: true,
      autoplay: true
    });
  }

  onMute = () => {
    this.setState({
      muted: !this.state.muted
    });
  };

  onVolumeChange = val => {
    this.setState({
      volume: val
    });
  };

  onPause = () => {
    this.setState({
      playing: false,
      autoplay: false
    });
  };

  onError = e => {
    this.setState({
      playing: false,
      loading: false,
      error: true
    });
  };

  play = () => {
    this.player.audioEl.play();
  };

  pause = () => {
    this.player.audioEl.pause();
  };

  setDuration = e => {
    this.setState({ duration: e.srcElement.duration });
  };

  setPosition = value => {
    this.setState({ position: (value * 100) / this.state.duration });
  };

  render() {
    const { classes, song = {}, previous, cover } = this.props;
    // window.document.title = song.title || "Music player"; // ugly ? sure, works ? sure
    return (
      <Card className={classes.card}>
        {this.state.loading && (
          <Loading
            classes={{ root: classes.loadingRoot, spinner: classes.spinner }}
            spinnerSize="33%"
          />
        )}
        <Cover
          title={song.title || "image"}
          cover={this.state.error ? sad : cover}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {song.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {song.artist}
            </Typography>
          </CardContent>
          <LinearProgress
            value={this.state.position}
            variant="determinate"
            className={classes.progressBar}
          />
          <div className={classes.controls}>
            <ReactAudioPlayer
              ref={ref => (this.player = ref)}
              src={song.url}
              autoPlay={this.state.autoplay}
              volume={this.state.volume}
              muted={this.state.muted}
              onEnded={this.next.bind(this)}
              onPlay={this.onPlay.bind(this)}
              onPause={this.onPause}
              onAbort={this.onAbort}
              onCanPlay={this.onCanPlay}
              listenInterval={1000}
              onLoadedMetadata={this.setDuration}
              onListen={this.setPosition}
              onError={this.onError}
            />
            <Controls
              playing={this.state.playing}
              muted={this.state.muted}
              volume={this.state.volume}
              onVolumeChange={this.onVolumeChange}
              onPlay={this.play}
              onPause={this.pause}
              onNext={this.next}
              onPrev={previous}
              onMuteToggle={this.onMute}
            />
          </div>
        </div>
      </Card>
    );
  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired,
  previous: PropTypes.func.isRequired,
  cover: PropTypes.string,
  song: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
    artist: PropTypes.string
  })
};

export default withStyles(styles, { withTheme: true })(Player);
