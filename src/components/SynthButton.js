import React, { Component } from 'react';

import * as Tone from 'tone';
//import * as mm from '@magenta/music';


class SynthButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    };
    this.playSynth = this.playSynth.bind(this);
    this.stopSynth = this.stopSynth.bind(this);
    this.checkMouseDown = this.checkMouseDown.bind(this);
    this.touchMove = this.touchMove.bind(this);
  }

  componentWillMount() {
    this.synth = new Tone.Synth({
      envelope: this.props.envelope
    }).toMaster();
    this.startTime = null;
    // console.log(Tone.Frequency('C4').toNote())
    // console.log(Tone.Frequency('C4').toFrequency())
    // console.log(Tone.Frequency('C4').toMidi())
  }

  playSynth(e) {
    e.preventDefault();
    // console.log('play note');
    this.setState({ pressed: true });
    this.synth.triggerAttack(this.props.note);
    this.startTime = Tone.context.currentTime.toFixed(2)
    // this.startTime = Tone.Transport.seconds.toFixed(2);
  }

  stopSynth(e) {
    e.preventDefault();
    this.setState({ pressed: false });
    this.synth.triggerRelease();

    let timeLength = (
      Tone.context.currentTime.toFixed(2) - this.startTime
    ).toFixed(2);
    if (this.startTime !== null && this.props.recording) {
      this.props.returnNote({
        note: this.props.note,
        midi: Tone.Frequency(this.props.note).toMidi(),
        length: timeLength,
        // startTime: this.startTime,
        // endTime: Tone.context.currentTime.toFixed(2)
        // endTime: Tone.Transport.seconds.toFixed(2)
      });
    }
    this.startTime = null;
  }

  checkMouseDown(e) {
    if (e.buttons === 1 || e.buttons === 3) {
      this.playSynth(e);
    } else {
      this.stopSynth(e);
    }
  }

  touchMove(e) {
    console.log(e);
    // console.log(this.props.pitch);
    this.setState({ pressed: true });
  }

  render() {
    return (
      <div>
        <button
          onMouseDown={(e) => this.playSynth(e)}
          onMouseUp={(e) => this.stopSynth(e)}
          onTouchStart={(e) => this.playSynth(e)}
          onTouchEnd={(e) => this.stopSynth(e)}
          onMouseEnter={(e) => this.checkMouseDown(e)}
          onMouseLeave={(e) => this.stopSynth(e)}
          className={this.state.pressed ? "synth-button pressed" : "synth-button"}
        />
      </div>
    )
  }
}

export default SynthButton;