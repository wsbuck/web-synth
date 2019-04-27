import React, { Component } from 'react';

import * as Tone from 'tone';
// import * as mm from '@magenta/music';


class PlaybackButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
    this.synth = new Tone.AMSynth().toMaster();
    this.play = this.play.bind(this);
    this.setupSchedule = this.setupSchedule.bind(this);
  }

  componentWillMount() {
    this.setupSchedule();
  }

  setupSchedule() {
    Tone.Transport.schedule((time) => {
      this.synth.triggerAttackRelease('C2', '8n', time)
    }, 0)

    Tone.Transport.schedule((time) => {
      this.synth.triggerAttackRelease('C2', '8n', time)
    }, 1)

    Tone.Transport.schedule((time) => {
      this.synth.triggerAttackRelease('C2', '8n', time)
    }, 2)

    Tone.Transport.loopEnd = 5.0;
    Tone.Transport.loop = true;
  }

  play() {
    this.setState({ pressed: !this.state.pressed });
    Tone.Transport.toggle();
  }

  render() {

    return (
      <div>
        <button
          onMouseDown={() => this.play()}
          className={this.state.pressed ? "drum-button pressed" : "drum-button"}
        />
      </div>
    )
  }
}

export default PlaybackButton;