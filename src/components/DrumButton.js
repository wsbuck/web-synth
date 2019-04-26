import React, { Component } from 'react';

import * as Tone from 'tone';
//import * as mm from '@magenta/music';


class DrumButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
    this.synth = new Tone.AMSynth().toMaster();
    this.playSynth = this.playSynth.bind(this);
    this.stopSynth = this.stopSynth.bind(this);
    this.startTime = null;

  }

  playSynth() {
    this.synth.triggerAttack(this.props.pitch);
    this.startTime = 'now';
  }

  stopSynth() {
    this.synth.triggerRelease();
    this.props.returnNote({
      pitch: this.props.pitch,
      startTime: this.startTime,
      endtime: 'now'
    });
    // this.setState({startTime: null});
  }

  render() {
    (this.state.pressed)
      ? this.playSynth()
      : this.stopSynth()

    return (
      <div>
        <button
          onMouseDown={() => this.setState({ pressed: true })}
          onMouseUp={() => this.setState({ pressed: false })}
          onTouchStart={() => this.setState({ pressed: true })}
          onTouchEnd={() => this.setState({ pressed: false })}
          className={this.state.pressed ? "drum-button pressed" : "drum-button"}
        />
      </div>
    )
  }
}

export default DrumButton;