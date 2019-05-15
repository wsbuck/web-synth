import React, { Component } from 'react';

// import * as Tone from 'tone';
// import * as mm from '@magenta/music';

import { PlayArrow } from '@material-ui/icons';


class PlaybackButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  play(e) {
    e.preventDefault();
    this.props.isPlaying();
  }

  render() {
    return (
      <div>
        <button
          disabled={this.props.disabled}
          onMouseDown={(e) => this.play(e)}
          onTouchEnd={(e) => this.play(e)}
          className={this.props.playing ? "synth-button pressed" : "synth-button"}
        >
        <PlayArrow />
        </button>
      </div>
    )
  }
}

export default PlaybackButton;