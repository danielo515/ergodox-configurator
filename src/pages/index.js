import React, { Component } from "react";
import Player from "../components/Player/Player";
import TwoCol from "../components/TwoCol";
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { actionCreators as playerActions } from '../modules/player';
// import { actionCreators as listActions } from '../modules/playList';
// import { actionCreators as apiActions } from '../modules/api';
import { MobilePlaylist } from "../components/PlayList";
import withRoot from "../withRoot";

// MOCKUP
import { songs } from "../../static/songs.json";

const cl = console.log;

// const mapStateToProps = ({ player, playList, api }) => ({
//   playing: player.playing,
//   cover: player.cover,
//   current: playList.current, // TODO: make this a selected prop derived from current idx
//   api,
//   playList,
// });

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     { ...playerActions, ...listActions, ...apiActions },
//     dispatch
//   );

class Index extends Component {
  //   componentDidMount() {
  //     this.props.fetchSongs();
  //   }

  //   //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.current.id !== this.props.current.id) {
  //       this.props.getCoverUrl(nextProps.current.id);
  //     }
  //   }

  render() {
    const props = {
      playList: { current: songs[0] },
      next: cl,
      previous: cl,
      cover: "https://picsum.photos/200/300"
    };
    const { playList } = props;
    return (
      <TwoCol
        left={
          <Player
            song={playList.current}
            next={props.next}
            previous={props.previous}
            cover={props.cover}
          />
        }
        right={
          <MobilePlaylist
            like={console.log}
            onSortChange={console.log}
            onSelect={console.log}
            footer={{
              nextPage: cl,
              prevPage: cl,
              page: 3,
              pages: 12
            }}
            dislike={cl}
            // Static props
            sortBy="artist"
            data={songs}
            favorites={[]}
            selected={"rabo"}
            loading={false}
          />
        }
      />
    );
  }
}

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MediaPlayer);

export default withRoot(Index);
